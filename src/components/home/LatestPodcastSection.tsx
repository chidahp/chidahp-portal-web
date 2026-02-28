import { createSignal, For, onMount, Show } from 'solid-js';

export interface LatestPodcastVideo {
  id: string;
  title: string;
  thumbnail: string;
  published: string;
}

interface LatestPodcastSectionProps {
  videos: LatestPodcastVideo[] | undefined;
}

export default function LatestPodcastSection(props: LatestPodcastSectionProps) {
  const [mounted, setMounted] = createSignal(false);
  onMount(() => setMounted(true));

  return (
    <Show when={props.videos && props.videos.length > 0}>
      <section class="mb-16 sm:mb-20">
        <div class="flex items-end justify-between mb-8">
          <div>
            <span class="text-xs font-semibold tracking-widest uppercase text-red-500 mb-1 block">
              Chidahp Podcast
            </span>
            <h2 class="text-xl sm:text-2xl font-bold text-gray-900">
              วิดีโอ & พอดแคสต์ล่าสุด
            </h2>
          </div>
          <a href="/podcast" class="text-sm font-medium text-purple-600 hover:text-purple-700 flex items-center gap-1 group shrink-0">
            ดูทั้งหมด
            <svg class="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6">
          <For each={props.videos}>
            {(video, index) => (
              <a
                href={`https://www.youtube.com/watch?v=${video.id}`}
                target="_blank"
                rel="noopener noreferrer"
                class="group block bg-white rounded-2xl shadow-md hover:shadow-xl overflow-hidden border border-gray-100 hover:border-purple-100 hover:-translate-y-1.5 hover:ring-2 hover:ring-purple-100 transition-all duration-500 ease-out"
                classList={{
                  'opacity-0 translate-y-4': !mounted(),
                  'opacity-100 translate-y-0': mounted(),
                }}
                style={{ 'transition-delay': `${index() * 80}ms` }}
              >
                <div class="relative aspect-video overflow-hidden bg-gray-100">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div class="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/50 via-black/20 to-transparent group-hover:from-black/60 group-hover:via-black/30 transition-colors duration-300">
                    <div class="w-14 h-14 rounded-full flex items-center justify-center bg-red-600 shadow-xl ring-4 ring-white/20 group-hover:scale-110 group-hover:ring-white/40 transition-all duration-300">
                      <svg class="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                  {index() === 0 && (
                    <span class="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold bg-red-500 text-white shadow-md">
                      ล่าสุด
                    </span>
                  )}
                </div>
                <div class="p-4 sm:p-5">
                  <h3 class="font-semibold text-sm text-gray-900 line-clamp-2 leading-snug mb-2 group-hover:text-purple-700 transition-colors duration-200">
                    {video.title}
                  </h3>
                  <time class="text-xs text-gray-500 tabular-nums">
                    {new Date(video.published).toLocaleDateString('th-TH', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </time>
                </div>
              </a>
            )}
          </For>
        </div>
      </section>
    </Show>
  );
}
