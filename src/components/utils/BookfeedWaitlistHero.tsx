import { createSignal, onCleanup, onMount } from "solid-js";

type TurnstileRenderOptions = {
  sitekey: string;
  theme?: "light" | "dark" | "auto";
  callback?: (token: string) => void;
  "expired-callback"?: () => void;
  "error-callback"?: () => void;
};

type WaitlistErrorResponse = {
  error?: string;
  details?: unknown;
};

declare global {
  interface Window {
    turnstile?: {
      render: (container: HTMLElement, options: TurnstileRenderOptions) => string;
      remove: (widgetId: string) => void;
      reset?: (widgetId?: string) => void;
    };
  }
}

const TURNSTILE_SCRIPT_SRC =
  "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
const TURNSTILE_SCRIPT_ID = "cloudflare-turnstile-script";
const DEFAULT_WAITLIST_ENDPOINT = "https://api-invitation-bookfeed.chulolab.space/";
const EMAIL_REGEX = /\S+@\S+\.\S+/;

const FEATURE_ITEMS = [
  {
    title: "Curated by readers",
    description: "Discover books from people with real taste, not algorithm tricks.",
  },
  {
    title: "Built for thoughtful takes",
    description: "Share notes, mini reviews, and honest opinions that matter.",
  },
  {
    title: "Early access for insiders",
    description: "Be first to join the beta and shape the community from day one.",
  },
] as const;

function FeatureItem(props: { title: string; description: string }) {
  return (
    <div class="flex items-start gap-3">
      <span class="mt-1 h-2.5 w-2.5 rounded-full bg-[#FBBF24]" />
      <div>
        <p class="font-semibold text-white">{props.title}</p>
        <p class="text-sm text-[#9CA3AF]">{props.description}</p>
      </div>
    </div>
  );
}

export default function BookfeedWaitlistHero() {
  let turnstileContainer: HTMLDivElement | undefined;
  let widgetId: string | undefined;
  let existingScriptLoadHandler: (() => void) | undefined;

  const [email, setEmail] = createSignal("");
  const [turnstileToken, setTurnstileToken] = createSignal("");
  const [turnstileReady, setTurnstileReady] = createSignal(false);
  const [isSubmitting, setIsSubmitting] = createSignal(false);
  const [submitMessage, setSubmitMessage] = createSignal("");
  const [submitError, setSubmitError] = createSignal(false);
  const [turnstileLoadError, setTurnstileLoadError] = createSignal("");

  const turnstileSiteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY;
  const waitlistEndpoint =
    import.meta.env.VITE_BOOKFEED_WAITLIST_ENDPOINT || DEFAULT_WAITLIST_ENDPOINT;

  const isValidEmail = (value: string) => EMAIL_REGEX.test(value.trim());

  const clearTurnstileState = () => {
    setTurnstileToken("");
    setTurnstileReady(false);
  };

  const applySubmitError = (message: string) => {
    setSubmitMessage(message);
    setSubmitError(true);
  };

  const applySubmitSuccess = (message: string) => {
    setSubmitMessage(message);
    setSubmitError(false);
  };

  const getReadableErrorMessage = (payload?: WaitlistErrorResponse) => {
    const errorText = payload?.error?.trim().toLowerCase();
    if (!errorText) return "";
    if (errorText.includes("too many")) {
      return "Too many attempts. Please wait a minute and try again.";
    }
    if (errorText.includes("invalid email")) {
      return "Please enter a valid email address.";
    }
    if (errorText.includes("bot") || errorText.includes("turnstile")) {
      return "Security check failed. Please retry the Turnstile challenge.";
    }
    return payload?.error?.trim() || "";
  };

  const renderTurnstileWidget = () => {
    if (!window.turnstile || !turnstileContainer || widgetId) return;
    widgetId = window.turnstile.render(turnstileContainer, {
      sitekey: turnstileSiteKey,
      theme: "dark",
      callback: (token) => {
        setTurnstileToken(token);
        setTurnstileReady(true);
      },
      "expired-callback": clearTurnstileState,
      "error-callback": clearTurnstileState,
    });
  };

  const bootstrapTurnstile = (containerRetry = 0) => {
    if (!turnstileSiteKey || typeof window === "undefined") return;

    if (!turnstileContainer) {
      if (containerRetry < 12) {
        requestAnimationFrame(() => bootstrapTurnstile(containerRetry + 1));
      }
      return;
    }

    if (window.turnstile) {
      renderTurnstileWidget();
      return;
    }

    const existingScript = document.getElementById(
      TURNSTILE_SCRIPT_ID
    ) as HTMLScriptElement | null;

    if (existingScript) {
      const onExistingScriptReady = () => {
        setTurnstileLoadError("");
        renderTurnstileWidget();
      };
      existingScriptLoadHandler = onExistingScriptReady;
      existingScript.addEventListener("load", onExistingScriptReady);
      existingScript.addEventListener("error", () => {
        setTurnstileLoadError("Unable to load Turnstile widget.");
      });
      // If the script finished loading before this listener was attached, `load` never fires again.
      queueMicrotask(() => {
        if (window.turnstile) onExistingScriptReady();
      });
      return;
    }

    const script = document.createElement("script");
    script.id = TURNSTILE_SCRIPT_ID;
    script.src = TURNSTILE_SCRIPT_SRC;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      setTurnstileLoadError("");
      renderTurnstileWidget();
    };
    script.onerror = () => {
      setTurnstileLoadError("Unable to load Turnstile widget.");
    };
    document.head.appendChild(script);
  };

  onMount(() => {
    if (!turnstileSiteKey || typeof window === "undefined") return;
    // Defer past ref attachment (lazy/Suspense) and past any in-flight script execution.
    queueMicrotask(() => bootstrapTurnstile());
  });

  onCleanup(() => {
    if (widgetId && window.turnstile) {
      window.turnstile.remove(widgetId);
    }
    widgetId = undefined;
    const existingScript = document.getElementById(
      TURNSTILE_SCRIPT_ID
    ) as HTMLScriptElement | null;
    if (existingScript && existingScriptLoadHandler) {
      existingScript.removeEventListener("load", existingScriptLoadHandler);
      existingScriptLoadHandler = undefined;
    }
  });

  const handleSubmit = async (event: SubmitEvent) => {
    event.preventDefault();
    setSubmitMessage("");
    setSubmitError(false);

    const trimmedEmail = email().trim();
    if (!isValidEmail(trimmedEmail)) {
      applySubmitError("Please enter a valid email address.");
      return;
    }

    if (!turnstileToken()) {
      applySubmitError("Please complete the security check first.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(waitlistEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: trimmedEmail,
          token: turnstileToken(),
          turnstileToken: turnstileToken(),
          "cf-turnstile-response": turnstileToken(),
        }),
      });

      if (!response.ok) {
        let errorPayload: WaitlistErrorResponse | undefined;
        try {
          errorPayload = (await response.json()) as WaitlistErrorResponse;
        } catch {
          errorPayload = undefined;
        }

        const messageFromApi = getReadableErrorMessage(errorPayload);
        if (messageFromApi) {
          applySubmitError(messageFromApi);
          return;
        }

        console.error("Waitlist request failed", {
          status: response.status,
          payload: errorPayload,
        });
        throw new Error(`HTTP ${response.status}`);
      }

      applySubmitSuccess("You're on the list. We'll send your invite soon.");
      setEmail("");
      clearTurnstileState();
      if (window.turnstile?.reset) {
        window.turnstile.reset(widgetId);
      }
    } catch (error) {
      console.error("Waitlist submit error", error);
      applySubmitError("Unable to join right now. Please try again in a moment.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section class="relative w-full overflow-hidden bg-[#060606]">
      <div class="pointer-events-none absolute inset-0">
        <div class="absolute -top-28 left-[-2%] h-80 w-80 rounded-full bg-amber-500/20 blur-3xl animate-pulse" />
        <div class="absolute top-1/3 right-[-8%] h-96 w-96 rounded-full bg-orange-400/10 blur-3xl animate-pulse [animation-delay:700ms]" />
        <div class="absolute -bottom-24 left-1/3 h-72 w-72 rounded-full bg-yellow-300/10 blur-3xl animate-pulse [animation-delay:1200ms]" />
        <div class="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:42px_42px]" />
        <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(251,191,36,0.22),transparent_50%)]" />
        <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(245,158,11,0.12),transparent_55%)]" />
      </div>

      <div class="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <div class="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
          <div class="max-w-2xl">
            <p class="text-2xl font-extrabold leading-tight text-[#FBBF24] sm:text-5xl">
              Social media, but make it literary.
            </p>
            <h1 class="mt-2 text-3xl font-extrabold leading-tight text-white sm:text-5xl">
              bookfeed by Chidahp
            </h1>
            <p class="mt-6 max-w-xl text-base text-[#9CA3AF] sm:text-lg">
              A home for readers who mean it. Follow real people, share honest
              takes, find your next obsession - no noise, no algorithm games.
            </p>

            <div class="mt-8 space-y-4">
              {FEATURE_ITEMS.map((feature) => (
                <FeatureItem title={feature.title} description={feature.description} />
              ))}
            </div>
          </div>

          <div class="rounded-2xl border border-white/10 bg-white/[0.03] p-5 shadow-[0_18px_60px_-24px_rgba(251,191,36,0.55)] backdrop-blur-xl sm:p-7">
            <p class="text-sm font-semibold uppercase tracking-[0.2em] text-[#FBBF24]">
              Launch Waitlist
            </p>
            <h2 class="mt-2 text-2xl font-bold text-white">
              Join the Reading List
            </h2>
            <p class="mt-2 text-sm text-[#9CA3AF]">
              Get early access and product updates before public launch.
            </p>

            <form class="mt-6" onSubmit={handleSubmit}>
              <div class="flex w-full items-center gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email()}
                  onInput={(event) => setEmail(event.currentTarget.value)}
                  class="h-11 flex-1 rounded-md border border-[#333333] bg-[#1F1F1F] px-4 text-sm text-white placeholder:text-gray-500 focus:border-[#FBBF24] focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={isSubmitting()}
                  class="h-11 rounded-md bg-[#FBBF24] px-4 text-sm font-semibold text-black transition-colors hover:bg-[#F59E0B] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting() ? "Joining..." : "Join the Reading List"}
                </button>
              </div>
            </form>
            <div class="mt-3">
              <div ref={(el) => (turnstileContainer = el)} />
              <input type="hidden" name="cf-turnstile-response" value={turnstileToken()} />
              {!turnstileSiteKey && (
                <p class="mt-2 text-xs text-amber-300">
                  Missing `VITE_TURNSTILE_SITE_KEY` in environment.
                </p>
              )}
              {turnstileLoadError() && (
                <p class="mt-2 text-xs text-rose-300">{turnstileLoadError()}</p>
              )}
              {!turnstileReady() && turnstileSiteKey && !turnstileLoadError() && (
                <p class="mt-2 text-xs text-[#9CA3AF]">
                  Complete the security check to enable submit.
                </p>
              )}
            </div>
            {submitMessage() && (
              <p
                class="mt-3 text-sm"
                classList={{
                  "text-emerald-300": !submitError(),
                  "text-rose-300": submitError(),
                }}
              >
                {submitMessage()}
              </p>
            )}

            <p class="mt-3 text-xs text-[#6B7280]">
              No spam. Only launch updates and early beta invitations.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
