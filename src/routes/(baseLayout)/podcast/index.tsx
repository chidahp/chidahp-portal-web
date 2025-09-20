import {
  createSignal,
  createResource,
  For,
  onMount,
  Show,
  createEffect,
} from "solid-js";
import axios from "axios";
import ChidahpPodcastHero from "~/components/utils/ChidahpPodcastHero";

interface IPodcast {
  id: string;
  title: string;
  thumbnail: string;
  published: string;
}

interface IApiResponse {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  data: IPodcast[];
}

async function fetchPodcast(
  playlistId: string,
  page: number,
  limit: number
): Promise<IApiResponse> {
  const url = `https://chidahp-podcast.playground-chidahp.workers.dev/api/videos?playlist=${playlistId}&page=${page}&limit=${limit}`;
  const { data } = await axios.get<IApiResponse>(url);
  return data;
}

export default function PodcastPage() {
  const playlistId = "PLD51zfrpLJx4aoQGo7UniDRn1olnbiK9o";
  const [currentPage, setCurrentPage] = createSignal(1);
  const [pageSize] = createSignal(9);
  const [allVideos, setAllVideos] = createSignal<IPodcast[]>([]);

  const [podcasts] = createResource(
    () => ({ page: currentPage(), limit: pageSize() }),
    ({ page, limit }) => fetchPodcast(playlistId, page, limit),
    { initialValue: { page: 1, limit: 9, total: 0, totalPages: 1, data: [] } }
  );

  // ✅ Append video ใหม่เข้ากับ state
  createEffect(() => {
    const data = podcasts();
    if (data?.data) {
      setAllVideos((prev) => {
        const ids = new Set(prev.map((v) => v.id));
        const newOnes = data.data.filter((v) => !ids.has(v.id));
        return [...prev, ...newOnes];
      });
    }
  });

  // ✅ IntersectionObserver โหลดเพิ่มเมื่อ scroll ถึงท้าย list
  let loadMoreRef: HTMLDivElement | undefined;
  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (
          entry.isIntersecting &&
          !podcasts.loading &&
          currentPage() < (podcasts()?.totalPages || 1)
        ) {
          setCurrentPage((p) => p + 1);
        }
      },
      { threshold: 1.0 }
    );
    if (loadMoreRef) observer.observe(loadMoreRef);
    return () => observer.disconnect();
  });

  return (
    <div class="p-0">
      {/* 🔹 Video Grid */}
      <div class="p-6 max-w-6xl mx-auto">
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <For each={allVideos()}>
            {(video) => (
              <div class="bg-white rounded-xl overflow-hidden shadow hover:shadow-2xl transition group">
                <div class="relative aspect-video overflow-hidden">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <a
                    href={`https://www.youtube.com/watch?v=${video.id}`}
                    target="_blank"
                    class="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/50 transition"
                  >
                    <svg
                      class="w-14 h-14 text-white opacity-90 group-hover:scale-110 transition"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </a>
                  {/* Overlay Title */}
                  <div class="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent p-3 text-white text-sm">
                    {video.title}
                  </div>
                </div>
                <div class="p-3">
                  <p class="text-sm text-gray-500">
                    {new Date(video.published).toLocaleDateString("th-TH", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            )}
          </For>
        </div>

        {/* 🔹 Loader / End */}
        <div ref={loadMoreRef} class="flex justify-center p-6">
          <Show when={podcasts.loading}>
            <div class="flex items-center gap-2 text-gray-500">
              <svg
                class="w-5 h-5 animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                ></path>
              </svg>
              Loading more...
            </div>
          </Show>

          <Show when={currentPage() >= (podcasts()?.totalPages || 1)}>
            {/* End Banner */}
            <div class="w-full max-w-3xl">
              <div class="rounded-2xl bg-gradient-to-r from-red-600 to-red-500 text-white py-12 px-6 flex flex-col items-center justify-center text-center shadow-xl">
                <h2 class="text-2xl md:text-3xl font-bold mb-3">
                  📌 คุณดูครบแล้ว!
                </h2>
                <p class="mb-6 text-red-100 text-lg">
                  ยังมีวิดีโออีกมากมาย รอคุณอยู่ที่ YouTube Channel @Chidahp
                </p>
                <a
                  href="https://www.youtube.com/@Chidahp"
                  target="_blank"
                  class="inline-flex items-center gap-2 bg-white text-red-600 font-semibold px-6 py-3 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M10 15V9l5 3-5 3z" />
                  </svg>
                  ไปที่ YouTube Channel
                </a>
              </div>
            </div>
          </Show>
        </div>
      </div>
    </div>
  );
}

