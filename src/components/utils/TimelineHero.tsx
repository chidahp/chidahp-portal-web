export default function TimelineHero() {
  return (
    <section class="relative flex flex-col items-center justify-center text-center overflow-hidden bg-gradient-to-r from-yellow-400 via-yellow-500 to-black py-16 md:py-20">
      {/* Overlay Texture */}
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.15),transparent_70%)]"></div>

      {/* Content */}
      <div class="relative z-10 px-6 max-w-3xl">
        <h1 class="text-3xl md:text-5xl font-extrabold text-white drop-shadow-lg">
          ชี้ดาบ | TIMELINE
        </h1>
        <p class="mt-3 text-base md:text-lg text-yellow-100 font-light">
          เรื่องราวการเดินทางกว่า 10 ปี — จากนักเรียนแลกเปลี่ยน สู่สำนักพิมพ์อิสระ
        </p>
      </div>

      {/* Bottom Shape */}
      <div class="absolute bottom-0 left-0 right-0 h-10 md:h-12 bg-white rounded-t-[2rem] shadow-inner"></div>
    </section>
  );
}
