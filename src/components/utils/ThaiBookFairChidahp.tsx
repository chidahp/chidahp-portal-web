import { createSignal, onMount, onCleanup } from "solid-js";

export default function ThaiBookFairChidahp() {
  const [offsetY, setOffsetY] = createSignal(0);
  const [isVisible, setIsVisible] = createSignal(false);

  onMount(() => {
    setIsVisible(true);
    const handleScroll = () => setOffsetY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    onCleanup(() => window.removeEventListener("scroll", handleScroll));
  });

  return (
    <section class="relative overflow-hidden bg-gradient-to-br from-sky-600 via-blue-700 to-indigo-800 text-white">
      {/* Poster background with parallax */}
      <div
        class="absolute inset-0 bg-cover bg-center transition-transform duration-700"
        style={{
          "background-image": "url('/book-fair-2026.png')",
          transform: `translateY(${offsetY() * 0.2}px) scale(1.15)`,
          opacity: 0.12,
        }}
      />

      {/* Gradient overlays */}
      <div class="absolute inset-0 bg-gradient-to-t from-blue-900/95 via-blue-800/70 to-sky-600/40" />
      <div class="absolute inset-0 bg-gradient-to-r from-indigo-900/40 via-transparent to-sky-700/30" />

      {/* Decorative elements */}
      <div class="absolute -top-20 -right-20 w-64 h-64 sm:w-96 sm:h-96 rounded-full bg-yellow-400/10 blur-3xl animate-pulse" />
      <div class="absolute -bottom-16 -left-16 w-48 h-48 sm:w-72 sm:h-72 rounded-full bg-sky-400/15 blur-2xl animate-pulse" />
      <div class="absolute top-1/3 right-1/4 w-32 h-32 rounded-full bg-amber-300/8 blur-xl" />

      {/* Floating book sparkles */}
      <div class="absolute top-8 left-[15%] text-2xl sm:text-3xl animate-bounce opacity-40" style={{ "animation-delay": "0.2s" }}>
        ✦
      </div>
      <div class="absolute top-16 right-[20%] text-xl sm:text-2xl animate-bounce opacity-30" style={{ "animation-delay": "0.8s" }}>
        ✦
      </div>
      <div class="absolute bottom-12 left-[25%] text-lg animate-bounce opacity-25" style={{ "animation-delay": "1.2s" }}>
        ✦
      </div>

      {/* Main content */}
      <div class="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 md:py-16">
        <div class="flex flex-col md:flex-row items-center gap-6 md:gap-10">

          {/* Poster image */}
          <div
            class={`flex-shrink-0 transition-all duration-1000 ${isVisible() ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}
            style={{ transform: `translateY(${offsetY() * 0.1}px)` }}
          >
            <div class="relative group">
              <div class="absolute -inset-2 sm:-inset-3 rounded-2xl bg-gradient-to-br from-yellow-400/30 via-amber-400/20 to-orange-400/30 blur-lg group-hover:blur-xl transition-all duration-500 opacity-80 group-hover:opacity-100" />
              <img
                src="/book-fair-2026.png"
                alt="สัปดาห์หนังสือแห่งชาติ ครั้งที่ 54"
                class="relative w-[160px] sm:w-[200px] md:w-[220px] rounded-xl shadow-2xl ring-1 ring-white/20 group-hover:scale-[1.03] transition-transform duration-500"
              />
            </div>
          </div>

          {/* Text content */}
          <div
            class={`flex-1 text-center md:text-left transition-all duration-1000 delay-200 ${isVisible() ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          >
            {/* Heading */}
            <h2 class="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight mb-3">
              <span class="bg-gradient-to-r from-yellow-300 via-amber-200 to-yellow-300 bg-clip-text text-transparent">
                ชี้ดาบ
              </span>
              <br />
              <span class="text-white/90 text-xl sm:text-2xl md:text-3xl font-bold">
                ไปงานหนังสือด้วยนะ! มาพบกันที่...
              </span>
            </h2>

            {/* <p class="text-blue-100/80 text-sm sm:text-base leading-relaxed mb-5 max-w-lg mx-auto md:mx-0">
              มาพบกันที่บูทชี้ดาบ พร้อมหนังสือใหม่และของพิเศษมากมาย
            </p> */}

            {/* Info cards */}
            <div class="flex flex-wrap justify-center md:justify-start gap-3 mb-6">
              {/* Booth */}
              <div class="flex items-center gap-2.5 bg-white/10 backdrop-blur-sm border border-white/15 rounded-xl px-4 py-2.5 hover:bg-white/15 transition-colors">
                <div class="w-9 h-9 rounded-lg bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center shadow-lg shadow-yellow-500/20">
                  <svg class="w-5 h-5 text-yellow-900" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                </div>
                <div>
                  <div class="text-[10px] sm:text-xs text-blue-200/70 font-medium">บูท</div>
                  <div class="text-sm sm:text-base font-bold text-white">Q10</div>
                </div>
              </div>

              {/* Date */}
              <div class="flex items-center gap-2.5 bg-white/10 backdrop-blur-sm border border-white/15 rounded-xl px-4 py-2.5 hover:bg-white/15 transition-colors">
                <div class="w-9 h-9 rounded-lg bg-gradient-to-br from-sky-400 to-blue-500 flex items-center justify-center shadow-lg shadow-sky-500/20">
                  <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                  </svg>
                </div>
                <div>
                  <div class="text-[10px] sm:text-xs text-blue-200/70 font-medium">วันที่</div>
                  <div class="text-sm sm:text-base font-bold text-white">26 มี.ค. – 6 เม.ย. 69</div>
                </div>
              </div>

              {/* Time */}
              <div class="flex items-center gap-2.5 bg-white/10 backdrop-blur-sm border border-white/15 rounded-xl px-4 py-2.5 hover:bg-white/15 transition-colors">
                <div class="w-9 h-9 rounded-lg bg-gradient-to-br from-purple-400 to-indigo-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
                  <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <div class="text-[10px] sm:text-xs text-blue-200/70 font-medium">เวลา</div>
                  <div class="text-sm sm:text-base font-bold text-white">10.00 – 21.00 น.</div>
                </div>
              </div>
            </div>

            {/* Location */}
            <div class="flex items-start gap-2 justify-center md:justify-start text-blue-200/70 text-xs sm:text-sm">
              <svg class="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3H21m-3.75 3H21" />
              </svg>
              <span>ฮอลล์ 5–8 ชั้น LG ศูนย์การประชุมแห่งชาติสิริกิติ์ (QSNCC)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div class="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 48" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-6 sm:h-8">
          <path d="M0 48h1440V24c-240-32-480-32-720 0s-480 32-720 0v24z" fill="white" fill-opacity="0.05" />
        </svg>
      </div>
    </section>
  );
}
