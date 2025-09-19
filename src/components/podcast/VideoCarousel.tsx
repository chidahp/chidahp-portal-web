import { createSignal } from "solid-js";

interface VideoCarouselProps {
  videos: string[]; // YouTube video IDs
}

export default function VideoCarousel(props: VideoCarouselProps) {
  const [current, setCurrent] = createSignal(0);

  const next = () => {
    if (current() < props.videos.length - 1) {
      setCurrent(current() + 1);
    }
  };

  const prev = () => {
    if (current() > 0) {
      setCurrent(current() - 1);
    }
  };

  return (
    <div class="relative w-full max-w-5xl mx-auto">
      {/* Carousel container */}
      <div class="overflow-hidden">
        <div
          class="flex transition-transform duration-500"
          style={{
            transform: `translateX(-${current() * 100}%)`,
          }}
        >
          {props.videos.map((id) => (
            <div class="w-full md:w-1/3 flex-shrink-0 px-2">
              <div class="aspect-video rounded-xl overflow-hidden shadow-lg">
                <iframe
                  class="w-full h-full"
                  src={`https://www.youtube.com/embed/${id}`}
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation arrows */}
      <button
        class="absolute top-1/2 left-2 -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full shadow"
        onClick={prev}
        disabled={current() === 0}
      >
        ◀
      </button>
      <button
        class="absolute top-1/2 right-2 -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full shadow"
        onClick={next}
        disabled={current() === props.videos.length - 1}
      >
        ▶
      </button>
    </div>
  );
}
