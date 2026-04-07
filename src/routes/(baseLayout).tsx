import { RouteSectionProps, useLocation } from "@solidjs/router";
import { createEffect, lazy, Suspense } from "solid-js";
import { Footer } from "~/components/Footer";
import Nav from "~/components/Nav";
import type { SlideItem } from "~/components/utils/HomeResponsiveSlider";

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
      <Suspense fallback={<div class="h-[260px] sm:h-[320px] md:h-[360px] bg-gradient-to-br from-slate-200 to-slate-300 animate-pulse" />}>
        {location.pathname === "/timeline" && <TimelineHero />}
        {location.pathname === "/home" && <HomeResponsiveSlider slides={homeSlides} />}
        {location.pathname === "/podcast" && <ChidahpPodcastHero />}
        {location.pathname === "/books" && <BookHero />}
      </Suspense>
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
