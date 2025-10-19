import { createScriptLoader } from "@solid-primitives/script-loader";
import { onMount } from "solid-js";

const GA_TRACKING_ID = "G-K5QP91K4LT";

// Declare gtag function for TypeScript
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
  var dataLayer: any[];
  var gtag: (...args: any[]) => void;
}

export default function GoogleAnalytics() {
  // Load Google Analytics script
  createScriptLoader({
    src: `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`,
    async: true,
  });

  onMount(() => {
    // Initialize dataLayer and gtag function
    dataLayer = dataLayer || [];
    gtag = function(...args: any[]) {
      dataLayer.push(args);
    };
    
    // Configure Google Analytics
    gtag('js', new Date());
    gtag('config', GA_TRACKING_ID, {
      page_title: document.title,
      page_location: globalThis.location.href,
    });
  });

  return null; // This component doesn't render anything
}
