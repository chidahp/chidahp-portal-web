import { RouteSectionProps, useLocation } from "@solidjs/router";
import { createEffect } from "solid-js";
import { Footer } from "~/components/Footer";
import Nav from "~/components/Nav";
import SouthDakotaHero from "~/components/utils/SouthDakotaHero";

export default function HomeLayout(props: RouteSectionProps) {
  const location = useLocation();
  let scrollContainer: HTMLDivElement | undefined;

  createEffect(() => {
    location.pathname; // track pathname changes
    if (scrollContainer) {
      scrollContainer.scrollTop = 0;
    }
  });

  return (
    <div class="flex flex-col min-h-screen">
      {/* Top Nav */}
      <Nav />

      {location.pathname === '/home' && <SouthDakotaHero />}
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
