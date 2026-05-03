import { createSignal, onMount, Show } from "solid-js";

const CONSENT_STORAGE_KEY = "cookieConsent";

export default function CookieConsent() {
  const [showPopup, setShowPopup] = createSignal(false);
  const [closing, setClosing] = createSignal(false);

  onMount(() => {
    if (typeof window === "undefined") return;

    let consent: string | null = null;
    try {
      consent = localStorage.getItem(CONSENT_STORAGE_KEY);
    } catch {
      // localStorage may be blocked (Safari private mode, etc.) — treat as
      // "not yet decided" and just show the popup.
      consent = null;
    }

    if (consent === null) {
      // Defer slightly so it doesn't compete with hero / above-the-fold
      // first paint.
      window.setTimeout(() => setShowPopup(true), 1500);
    }
  });

  const dismiss = () => {
    setClosing(true);
    // Match the slideDownToBottom animation duration in app.css (0.3s).
    window.setTimeout(() => {
      setShowPopup(false);
      setClosing(false);
    }, 300);
  };

  const persist = (value: "accepted" | "declined") => {
    try {
      localStorage.setItem(CONSENT_STORAGE_KEY, value);
    } catch {
      // Storage may be unavailable; consent will simply re-prompt next visit.
    }
  };

  const acceptCookies = () => {
    persist("accepted");
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("consent", "update", { analytics_storage: "granted" });
    }
    dismiss();
  };

  const declineCookies = () => {
    persist("declined");
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("consent", "update", { analytics_storage: "denied" });
    }
    dismiss();
  };

  return (
    <Show when={showPopup()}>
      <div
        class="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
        classList={{
          "cookie-popup-enter": !closing(),
          "cookie-popup-exit": closing(),
        }}
        aria-hidden="true"
      />
      <div
        class="fixed bottom-6 left-6 right-6 sm:left-auto sm:right-6 sm:max-w-md z-50"
        classList={{
          "cookie-popup-enter": !closing(),
          "cookie-popup-exit": closing(),
        }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-consent-title"
      >
        <div class="bg-white rounded-2xl shadow-2xl border border-gray-100 p-6">
          <div class="flex items-center gap-3 mb-4">
            <span class="text-3xl animate-bounce-soft" aria-hidden="true">🍪</span>
            <h3 id="cookie-consent-title" class="text-xl font-bold text-gray-800">
              คุกกี้
            </h3>
          </div>
          <p class="text-gray-600 leading-relaxed mb-6">
            เราใช้คุกกี้เพื่อวิเคราะห์การใช้งานเว็บไซต์ เพื่อปรับปรุงประสบการณ์ของคุณ
            <br />
            <a
              href="/privacy-policy"
              class="text-blue-600 hover:text-blue-800 underline transition-colors duration-200 text-sm"
            >
              อ่านนโยบายความเป็นส่วนตัว
            </a>
          </p>
          <div class="flex gap-3">
            <button
              type="button"
              onClick={declineCookies}
              class="flex-1 px-4 py-3 text-sm font-medium text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors duration-200"
            >
              ปฏิเสธ
            </button>
            <button
              type="button"
              onClick={acceptCookies}
              class="flex-1 px-4 py-3 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors duration-200 shadow-lg"
            >
              ยอมรับ
            </button>
          </div>
        </div>
      </div>
    </Show>
  );
}
