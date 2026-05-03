import { RouteSectionProps, useLocation } from "@solidjs/router";
import { createEffect, lazy, Suspense } from "solid-js";
import { Footer } from "~/components/Footer";
import Nav from "~/components/Nav";
import { SlideItem } from "~/components/utils/HomeResponsiveSlider";

const homeSlides: SlideItem[] = [
  {
    title: "สำนักพิมพ์ที่ว่าด้วยการเติบโต",
    description: "ทุกหน้าคือแรงบันดาลใจเล็กๆ ที่พาคุณก้าวไปไกลกว่าเมื่อวาน",
    ctaLabel: "เริ่มต้นการเติบโต",
    gradientClass: "from-sky-600 via-blue-700 to-indigo-800",
  },
  {
    title: "รวมหนังสือชี้ดาบทั้งหมด",
    description: "ค้นหาหนังสือใหม่ล่าสุด และหนังสือขายดีในที่เดียว",
    ctaLabel: "ไปหน้าหนังสือ",
    href: "/books",
    image: "/timeline-chidahp-books.webp",
    imageAlt: "ไทม์ไลน์หนังสือชี้ดาบ",
    fullImage: false,
    gradientClass: "from-amber-500 via-orange-500 to-rose-500",
  },
  {
    title: "ฟังพอดแคสต์ชี้ดาบ",
    description: "เติมไฟให้ทุกวัน ด้วยบทสนทนาที่ปลุกพลังใจและพาไปต่ออย่างมั่นคง",
    ctaLabel: "ไปหน้าพอดแคสต์",
    href: "/podcast",
    gradientClass: "from-fuchsia-600 via-violet-600 to-indigo-700",
  },
];

const BookHero = lazy(() => import("~/components/utils/BookHero"));
const ChidahpPodcastHero = lazy(() => import("~/components/utils/ChidahpPodcastHero"));
const HomeResponsiveSlider = lazy(() => import("~/components/utils/HomeResponsiveSlider"));
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
      {location.pathname === "/home" && <HomeResponsiveSlider slides={homeSlides} />}
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
