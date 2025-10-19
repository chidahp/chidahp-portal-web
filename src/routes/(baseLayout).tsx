import { RouteSectionProps, useLocation } from "@solidjs/router";
import { createEffect } from "solid-js";
import { Footer } from "~/components/Footer";
import Nav from "~/components/Nav";
import BookHero from "~/components/utils/BookHero";
import ChidahpPodcastHero from "~/components/utils/ChidahpPodcastHero";
import SouthDakotaHero from "~/components/utils/SouthDakotaHero";
import TimelineHero from "~/components/utils/TimelineHero";

// Google Analytics tracking function
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

const GA_TRACKING_ID = "G-K5QP91K4LT";

export default function HomeLayout(props: RouteSectionProps) {
  const location = useLocation();
  let scrollContainer: HTMLDivElement | undefined;

  createEffect(() => {
    location.pathname; // track pathname changes
    if (scrollContainer) {
      scrollContainer.scrollTop = 0;
    }
    
    // Track page views with Google Analytics
    if (globalThis.window !== undefined && globalThis.gtag) {
      globalThis.gtag('config', GA_TRACKING_ID, {
        page_title: document.title,
        page_location: globalThis.location.href,
        page_path: location.pathname
      });
    }
  });

  return (
    <div class="flex flex-col min-h-screen">
      {/* Top Nav */}
      <Nav />
      {location.pathname === '/timeline' && <TimelineHero />}
      {location.pathname === '/home' && <SouthDakotaHero />}
      {location.pathname === '/podcast' && <ChidahpPodcastHero />}
      {location.pathname === '/books' && <BookHero />}
      {/* Main Content (centered horizontally) */}
      <div
        ref={scrollContainer}
        class="flex-1 flex justify-center overflow-auto"
      >
        <div class="w-full max-w-screen-lg px-4 py-6">{props.children}</div>
      </div>

      {/* Footer sticks to bottom */}
      <Footer />
    </div>
  );
}
