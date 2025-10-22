import { createSignal, onMount, createEffect } from "solid-js";

export default function CookieConsent() {
  const [showPopup, setShowPopup] = createSignal(false);

  onMount(() => {
    if (typeof window === 'undefined') return;
    
    const cookieConsent = localStorage.getItem('cookieConsent');
    console.log('Cookie consent status:', cookieConsent);
    
    if (cookieConsent === null) {
      console.log('No cookie consent found, will show popup');
      setTimeout(() => {
        console.log('Setting popup to visible');
        setShowPopup(true);
      }, 1500);
    } else {
      console.log('Cookie consent already exists, not showing popup');
    }
  });

  const acceptCookies = () => {
    console.log('Accept cookies clicked');
    localStorage.setItem('cookieConsent', 'accepted');
    
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', { 'analytics_storage': 'granted' });
    }
    
    // Reload page to hide popup
    window.location.reload();
  };

  const declineCookies = () => {
    localStorage.setItem('cookieConsent', 'declined');
    
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', { 'analytics_storage': 'denied' });
    }
    
    // Reload page to hide popup
    window.location.reload();
  };

  // Test function to reset and show popup again
  const resetCookieConsent = () => {
    localStorage.removeItem('cookieConsent');
    setShowPopup(true);
    console.log('Cookie consent reset - popup should show');
  };

  // Watch for state changes
  createEffect(() => {
    console.log('showPopup changed to:', showPopup());
  });

  // Debug logs
  console.log('CookieConsent render - showPopup:', showPopup());
  
  // Don't render if not visible
  if (!showPopup()) {
    console.log('Not rendering popup - showPopup is false');
    return null;
  }
  
  console.log('Rendering cookie popup');
  

  return (
    <>
      <div class="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 cookie-popup-enter" />
      <div class="fixed bottom-6 left-6 right-6 sm:left-auto sm:right-6 sm:max-w-md z-50 cookie-popup-enter">
        <div class="bg-white rounded-2xl shadow-2xl border border-gray-100 p-6">
          <div class="flex items-center gap-3 mb-4">
            <span class="text-3xl animate-bounce-soft">🍪</span>
            <h3 class="text-xl font-bold text-gray-800">คุกกี้</h3>
          </div>
          <p class="text-gray-600 leading-relaxed mb-6">
            เราใช้คุกกี้เพื่อวิเคราะห์การใช้งานเว็บไซต์ เพื่อปรับปรุงประสบการณ์ของคุณ
            <br />
            <a href="/privacy-policy" class="text-blue-600 hover:text-blue-800 underline transition-colors duration-200 text-sm">
              อ่านนโยบายความเป็นส่วนตัว
            </a>
          </p>
          <div class="flex gap-3">
            <button
              onClick={declineCookies}
              class="flex-1 px-4 py-3 text-sm font-medium text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95"
            >
              ปฏิเสธ
            </button>
            <button
              onClick={acceptCookies}
              class="flex-1 px-4 py-3 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
            >
              ยอมรับ
            </button>
          </div>
          
          {/* Test button - remove this in production */}
          <div class="mt-3 pt-3 border-t border-gray-100">
            <button
              onClick={resetCookieConsent}
              class="w-full px-3 py-2 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-all duration-200"
            >
              🔄 Reset Cookie Consent (Test)
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
