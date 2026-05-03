import { RouteSectionProps, useLocation } from "@solidjs/router";
import { createEffect, lazy, Suspense } from "solid-js";
import { Footer } from "~/components/Footer";
import Nav from "~/components/Nav";
// BookfeedWaitlistHero is the primary hero on the most-visited route (/home)
// and contains the Turnstile widget bootstrap. Lazy-loading it caused: a
// chunk waterfall on first visit, a Suspense fallback flash (visible jank),
// CLS when the placeholder height didn't match the rendered hero, and
// delayed Turnstile bootstrap. Inline import avoids all of that.
import BookfeedWaitlistHero from "~/components/utils/BookfeedWaitlistHero";

const BookHero = lazy(() => import("~/components/utils/BookHero"));
const ChidahpPodcastHero = lazy(() => import("~/components/utils/ChidahpPodcastHero"));
// const HomeResponsiveSlider = lazy(() => import("~/components/utils/HomeResponsiveSlider"));
const TimelineHero = lazy(() => import("~/components/utils/TimelineHero"));

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
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("config", GA_TRACKING_ID, {
        page_title: document.title,
        page_location: window.location.href,
        page_path: location.pathname,
      });
    }
  });

  return (
    <div class="flex flex-col min-h-screen">
      {/* Top Nav */}
      <Nav />
      {location.pathname === "/timeline" && (
        <Suspense
          fallback={
            <div class="min-h-[220px] md:min-h-[260px] bg-gradient-to-r from-yellow-400 via-yellow-500 to-black" />
          }
        >
          <TimelineHero />
        </Suspense>
      )}
      {location.pathname === "/home" && <BookfeedWaitlistHero />}
      {location.pathname === "/podcast" && (
        <Suspense
          fallback={
            <div class="min-h-[220px] md:min-h-[280px] bg-gradient-to-r from-yellow-400 via-yellow-500 to-black" />
          }
        >
          <ChidahpPodcastHero />
        </Suspense>
      )}
      {location.pathname === "/books" && (
        <Suspense
          fallback={
            <div class="min-h-[200px] md:min-h-[260px] bg-gradient-to-r from-yellow-400 to-orange-400" />
          }
        >
          <BookHero />
        </Suspense>
      )}
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
