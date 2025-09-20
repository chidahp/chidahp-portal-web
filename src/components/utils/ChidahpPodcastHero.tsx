interface PodcastHeroProps {
  title?: string;
  subtitle?: string;
}

export default function ChidahpPodcastHero(props: PodcastHeroProps) {
  return (
    <section class="relative overflow-hidden">
      {/* Background gradient */}
      <div class="absolute inset-0 bg-gradient-to-r from-yellow-400 via-yellow-500 to-black"></div>
      {/* Texture overlay */}
      <div class="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.08)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.08)_50%,rgba(255,255,255,0.08)_75%,transparent_75%,transparent)] opacity-10 bg-[length:40px_40px]"></div>

      {/* Content */}
      <div class="relative z-10 text-center py-12 px-4 md:py-16">
        {/* Icon */}
        <div class="flex justify-center mb-3 md:mb-4">
          <span class="text-4xl md:text-5xl drop-shadow-lg">🎙️</span>
        </div>

        {/* Title */}
        <h1 class="text-2xl md:text-5xl font-extrabold mb-2 md:mb-3 text-black drop-shadow-sm">
          {props.title ?? "Chidahp Podcast"}
        </h1>

        {/* Subtitle (desktop only) */}
        <p class="hidden md:block text-base md:text-lg text-gray-900/80 max-w-2xl mx-auto mb-6">
          {props.subtitle ??
            "ฟังเรื่องราว บทสัมภาษณ์ และวิดีโอล่าสุดจากช่อง YouTube ของชี้ดาบ"}
        </p>
      </div>
    </section>
  );
}