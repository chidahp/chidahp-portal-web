import { createSignal } from "solid-js";

interface VideoCarouselProps {
  videos: {
    id: string;
    title: string;
    thumbnail: string;
    published: string;
  }[];
}

export default function VideoCarousel(props: VideoCarouselProps) {
  const [activeVideo, setActiveVideo] = createSignal<string | null>(null);

  return (
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-6xl mx-auto px-4">
      {props.videos.map((video) => (
        <div
          class="bg-white rounded-xl shadow hover:shadow-xl transition overflow-hidden"
        >
          <div class="relative aspect-video">
            {activeVideo() === video.id ? (
              <iframe
                class="w-full h-full"
                src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            ) : (
              <button
                class="w-full h-full relative group"
                onClick={() => setActiveVideo(video.id)}
              >
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  class="w-full h-full object-cover"
                />
                {/* play button overlay */}
                <div class="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/50 transition">
                  <svg
                    class="w-16 h-16 text-white opacity-90 group-hover:scale-110 transition"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </button>
            )}
          </div>
          <div class="p-3">
            <h3 class="font-semibold text-gray-800 line-clamp-2">{video.title}</h3>
            <p class="text-sm text-gray-500">
              {new Date(video.published).toLocaleDateString("th-TH", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
