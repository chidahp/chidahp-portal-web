import { For, onCleanup, onMount, createSignal } from "solid-js";
import { A } from "@solidjs/router";

export type SlideItem = {
  title?: string;
  description?: string;
  ctaLabel?: string;
  href?: string;
  image?: string;
  imageAlt?: string;
  gradientClass?: string;
  fullImage?: boolean;
};

type HomeResponsiveSliderProps = {
  slides: SlideItem[];
  intervalMs?: number;
};

export default function HomeResponsiveSlider(props: HomeResponsiveSliderProps) {
  const [index, setIndex] = createSignal(0);
  const isSlideNearby = (i: number) => {
    const total = props.slides.length;
    const current = index();
    const prev = (current - 1 + total) % total;
    const next = (current + 1) % total;
    return i === current || i === prev || i === next;
  };

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % props.slides.length);
  };

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + props.slides.length) % props.slides.length);
  };

  onMount(() => {
    const timer = setInterval(nextSlide, props.intervalMs ?? 5000);
    onCleanup(() => clearInterval(timer));
  });

  return (
    <section class="relative overflow-hidden">
      <div class="relative h-[260px] sm:h-[320px] md:h-[360px]">
        <For each={props.slides}>
          {(slide, i) => (
            <div
              class={`absolute inset-0 transition-opacity duration-500 ${
                index() === i() ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              {/*
                fullImage defaults to true when only image is provided,
                so caller can pass just { image: "/..." }.
              */}
              {(() => {
                const isFullImage =
                  slide.fullImage ?? Boolean(slide.image && !slide.title && !slide.description);
                const hasTextContent = Boolean(slide.title || slide.description || (slide.href && slide.ctaLabel));
                const shouldRenderMedia = isSlideNearby(i());
                const isActive = index() === i();

                return (
              <div
                class={`h-full w-full ${
                  isFullImage && slide.image
                    ? "bg-slate-900"
                    : `bg-gradient-to-br ${slide.gradientClass ?? "from-sky-600 via-blue-700 to-indigo-800"}`
                }`}
              >
                {isFullImage && slide.image && shouldRenderMedia && (
                  <img
                    src={slide.image}
                    alt={slide.imageAlt ?? slide.title ?? "slider image"}
                    class="absolute inset-0 h-full w-full object-cover"
                    width="1600"
                    height="900"
                    loading={isActive ? "eager" : "lazy"}
                    fetchpriority={isActive ? "high" : "auto"}
                    decoding="async"
                  />
                )}
                <div class={`absolute inset-0 ${hasTextContent ? "bg-black/20" : "bg-black/10"}`} />
                <div class="relative z-10 mx-auto flex h-full max-w-screen-lg items-center gap-4 px-4 sm:px-6">
                  {slide.image && !isFullImage && shouldRenderMedia && (
                    <img
                      src={slide.image}
                      alt={slide.imageAlt ?? slide.title ?? "slider image"}
                      class="hidden sm:block h-[190px] md:h-[220px] w-auto rounded-xl object-cover shadow-xl ring-1 ring-white/20"
                      width="520"
                      height="720"
                      loading={isActive ? "eager" : "lazy"}
                      fetchpriority={isActive ? "high" : "auto"}
                      decoding="async"
                    />
                  )}
                  {hasTextContent && (
                    <div class="text-white">
                      {slide.title && (
                        <h2 class="text-xl sm:text-2xl md:text-3xl font-extrabold leading-tight">
                          {slide.title}
                        </h2>
                      )}
                      {slide.description && (
                        <p class="mt-2 max-w-xl text-sm sm:text-base text-white/90">
                          {slide.description}
                        </p>
                      )}
                      {slide.href && slide.ctaLabel && (
                        <A
                          href={slide.href}
                          class="mt-4 inline-flex items-center rounded-xl bg-white/95 px-4 py-2 text-sm font-bold text-slate-900 hover:bg-white transition-colors"
                        >
                          {slide.ctaLabel}
                        </A>
                      )}
                    </div>
                  )}
                </div>
              </div>
                );
              })()}
            </div>
          )}
        </For>
      </div>

      <button
        type="button"
        aria-label="สไลด์ก่อนหน้า"
        onClick={prevSlide}
        class="absolute left-3 top-1/2 -translate-y-1/2 z-20 h-9 w-9 rounded-full bg-black/35 text-white hover:bg-black/50 transition-colors"
      >
        ‹
      </button>
      <button
        type="button"
        aria-label="สไลด์ถัดไป"
        onClick={nextSlide}
        class="absolute right-3 top-1/2 -translate-y-1/2 z-20 h-9 w-9 rounded-full bg-black/35 text-white hover:bg-black/50 transition-colors"
      >
        ›
      </button>

      <div class="absolute bottom-3 left-1/2 z-20 -translate-x-1/2 flex gap-2">
        <For each={props.slides}>
          {(_, i) => (
            <button
              type="button"
              aria-label={`ไปสไลด์ที่ ${i() + 1}`}
              onClick={() => setIndex(i())}
              class={`h-2.5 rounded-full transition-all ${
                index() === i() ? "w-6 bg-white" : "w-2.5 bg-white/60"
              }`}
            />
          )}
        </For>
      </div>
    </section>
  );
}
