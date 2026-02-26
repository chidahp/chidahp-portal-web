import { For, Show } from 'solid-js';

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
            {(video) => (
              <a
                href={`https://www.youtube.com/watch?v=${video.id}`}
                target="_blank"
                rel="noopener noreferrer"
                class="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200 hover:-translate-y-1"
              >
                <div class="relative aspect-video overflow-hidden">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div class="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition">
                    <div class="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <svg class="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div class="p-4">
                  <h3 class="font-medium text-sm text-gray-900 line-clamp-2 leading-snug mb-2 group-hover:text-purple-700 transition-colors">
                    {video.title}
                  </h3>
                  <time class="text-xs text-gray-500">
                    {new Date(video.published).toLocaleDateString('th-TH', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
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
