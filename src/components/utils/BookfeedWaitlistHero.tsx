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
    /** Cloudflare Turnstile `&onload=` entry — set before injecting the script tag. */
    __chidahp_turnstile_onload?: () => void;
    /** Persistent subscriber list so SPA remount doesn't lose the load callback. */
    __chidahp_turnstile_subs?: Array<() => void>;
  }
}

const TURNSTILE_SCRIPT_ID = "cloudflare-turnstile-script";
const TURNSTILE_ONLOAD_GLOBAL = "__chidahp_turnstile_onload" as const;

function turnstileScriptSrc() {
  return `https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit&onload=${TURNSTILE_ONLOAD_GLOBAL}`;
}

/**
 * Install a stable, tab-lifetime onload entry that fans out to subscribers.
 * The matching declaration is also rendered inline by entry-server.tsx so
 * the global exists from the moment the parser hits that tag — long
 * before this component's JS bundle has loaded. This belt-and-braces copy
 * handles the (rare) case where the inline script was missed (e.g. hot
 * reload, old cached HTML). Critical invariant: the Turnstile script
 * reads the function name from the `onload=` URL param ONCE at execute
 * time, so the global must never be deleted; subscribers come and go.
 */
function installTurnstileGlobalOnce() {
  if (typeof window === "undefined") return;
  if (!window.__chidahp_turnstile_subs) {
    window.__chidahp_turnstile_subs = [];
  }
  if (!window.__chidahp_turnstile_onload) {
    window.__chidahp_turnstile_onload = () => {
      const subs = window.__chidahp_turnstile_subs;
      if (!subs) return;
      // Snapshot before iterating in case a subscriber removes itself.
      [...subs].forEach((fn) => {
        try {
          fn();
        } catch (err) {
          console.error("Turnstile subscriber failed", err);
        }
      });
    };
  }
}

function afterNextPaint(fn: () => void) {
  requestAnimationFrame(() => {
    requestAnimationFrame(fn);
  });
}
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
  let onloadSubscriber: (() => void) | undefined;
  /** Prevents Turnstile callbacks / retries after unmount (SPA navigation). */
  let mountAlive = true;
  /** Guards against double-bootstrap from ref callback + onMount running together. */
  let bootstrapStarted = false;

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

  /** Renders widget once API + container are ready; returns true when done or already rendered. */
  const renderTurnstileWidget = (): boolean => {
    if (!mountAlive || typeof document === "undefined" || !turnstileContainer || widgetId) return true;
    if (!window.turnstile) return false;
    try {
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
      return true;
    } catch {
      return false;
    }
  };

  const scheduleRenderWidget = () => {
    if (!mountAlive) return;
    setTurnstileLoadError("");
    afterNextPaint(() => {
      // Poll for up to ~10s while waiting on slow networks. The persistent
      // global onload subscriber will also kick this off the moment the
      // script finishes loading, so this is a defensive backstop.
      let attempts = 0;
      const tick = () => {
        if (!mountAlive || widgetId || attempts++ > 100) return;
        if (renderTurnstileWidget()) return;
        window.setTimeout(tick, 100);
      };
      tick();
    });
  };

  const bootstrapTurnstile = (containerRetry = 0) => {
    if (!mountAlive || !turnstileSiteKey || typeof document === "undefined" || typeof window === "undefined")
      return;

    if (!turnstileContainer) {
      if (containerRetry < 120) {
        requestAnimationFrame(() => bootstrapTurnstile(containerRetry + 1));
      }
      return;
    }

    // Always register a persistent subscriber. This survives unmount/remount
    // cycles and ensures we never miss the script's onload.
    installTurnstileGlobalOnce();
    if (!onloadSubscriber) {
      onloadSubscriber = () => {
        if (!mountAlive) return;
        scheduleRenderWidget();
      };
      window.__chidahp_turnstile_subs!.push(onloadSubscriber);
    }

    if (window.turnstile) {
      scheduleRenderWidget();
      return;
    }

    const existingScript = document.getElementById(
      TURNSTILE_SCRIPT_ID
    ) as HTMLScriptElement | null;

    if (existingScript) {
      // Script tag already present (likely from a previous mount). The
      // subscriber above will handle the load event. Also try once on next
      // microtask in case window.turnstile became available between checks.
      queueMicrotask(() => {
        if (window.turnstile) scheduleRenderWidget();
      });
      return;
    }

    const script = document.createElement("script");
    script.id = TURNSTILE_SCRIPT_ID;
    script.src = turnstileScriptSrc();
    script.async = true;
    script.onerror = () => {
      if (mountAlive) setTurnstileLoadError("Unable to load Turnstile widget.");
    };
    document.head.appendChild(script);
  };

  const queueBootstrap = () => {
    if (bootstrapStarted) return;
    if (!turnstileSiteKey || typeof document === "undefined") return;
    bootstrapStarted = true;
    queueMicrotask(() => bootstrapTurnstile());
  };

  onMount(() => {
    queueBootstrap();
  });

  onCleanup(() => {
    mountAlive = false;
    if (typeof document === "undefined" || typeof window === "undefined") {
      widgetId = undefined;
      return;
    }
    // Detach our subscriber but leave the global onload entry in place — the
    // Turnstile script binds to its name once at execute time.
    if (onloadSubscriber && window.__chidahp_turnstile_subs) {
      const idx = window.__chidahp_turnstile_subs.indexOf(onloadSubscriber);
      if (idx >= 0) window.__chidahp_turnstile_subs.splice(idx, 1);
      onloadSubscriber = undefined;
    }
    if (widgetId && window.turnstile) {
      window.turnstile.remove(widgetId);
    }
    widgetId = undefined;
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
    <section
      class="relative w-full overflow-hidden bg-[#060606]"
      style={{ contain: "paint" }}
    >
      {/* Decorative background — flattened to two cheap radial gradients +
          one grid overlay. The previous version used 3 blur-3xl orbs which
          forced large compositor layers and caused jank on mobile. */}
      <div
        class="pointer-events-none absolute inset-0"
        style={{
          "background-image":
            "radial-gradient(ellipse at top, rgba(251,191,36,0.22), transparent 50%), radial-gradient(ellipse at bottom, rgba(245,158,11,0.12), transparent 55%), linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)",
          "background-size": "100% 100%, 100% 100%, 42px 42px, 42px 42px",
        }}
      />

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

          {/* Removed backdrop-blur — backdrop filters are extremely
              expensive on mobile and stack badly with sibling animations. */}
          <div class="rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-[0_18px_60px_-24px_rgba(251,191,36,0.55)] sm:p-7">
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
              <div
                class="min-h-[70px] w-full overflow-hidden"
                ref={(el) => {
                  turnstileContainer = el;
                  // queueBootstrap is idempotent — onMount also calls it.
                  if (el) queueBootstrap();
                }}
              />
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
