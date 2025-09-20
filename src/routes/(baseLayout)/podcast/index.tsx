import { createSignal, onMount, Show, For } from "solid-js";
import axios from "axios";

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
  const url = `https://chidahp-podcast.playground-chidahp.workers.dev/api/videos?playlist=${playlistId}&page=${page}&limit=${limit}&_t=${Date.now()}`;
  const { data } = await axios.get<IApiResponse>(url);
  return data;
}

export default function PodcastPage() {
  const playlistId = "PLD51zfrpLJx4aoQGo7UniDRn1olnbiK9o";
  const [allVideos, setAllVideos] = createSignal<IPodcast[]>([]);
  const [currentPage, setCurrentPage] = createSignal(1);
  const [totalPages, setTotalPages] = createSignal(1);
  const [loading, setLoading] = createSignal(false);

  // โหลดหน้าแรก
  const [error, setError] = createSignal<string | null>(null);

  const loadPodcasts = async (page = 1) => {
    if (loading()) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetchPodcast(playlistId, page, 10);
      setAllVideos((prev) => [...prev, ...res.data]);
      setTotalPages(res.totalPages);
    } catch (err) {
      console.error("Load failed", err);
      setError("ไม่สามารถโหลดข้อมูลได้ 🥲");
    } finally {
      setLoading(false);
    }
  };

  onMount(() => {
    loadPodcasts(1); // โหลดตอนเริ่มต้น

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (
          entry.isIntersecting &&
          !loading() &&
          currentPage() < totalPages()
        ) {
          const next = currentPage() + 1;
          setCurrentPage(next);
          loadPodcasts(next);
        }
      },
      { threshold: 0.5 }
    );

    const el = document.getElementById("loadMoreRef");
    if (el) observer.observe(el);

    return () => observer.disconnect();
  });

  return (
    <div class="p-0">
      <div class="p-6 max-w-6xl mx-auto">
        <Show when={error()}>
          <div class="w-full max-w-3xl mx-auto mt-6 bg-red-100 text-red-700 p-4 rounded-xl text-center">
            <p>{error()}</p>
            <a
              href="https://www.youtube.com/@Chidahp"
              target="_blank"
              class="mt-2 inline-block bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition"
            >
              ไปที่ YouTube Channel ตรงๆเลยดีกว่า คลิกเลย 💪
            </a>
          </div>
        </Show>

        {/* 🔹 Video Grid */}
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <For each={allVideos()}>
            {(video, i) => (
              <div class="bg-white rounded-xl overflow-hidden shadow hover:shadow-2xl transition group relative">
                {/* 🔹 Latest Tag */}
                <Show when={i() === 0}>
                  <span class="absolute top-2 left-2 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-md shadow z-10">
                    🔥 วิดีโอล่าสุด !!
                  </span>
                </Show>


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
        <div id="loadMoreRef" class="flex justify-center mt-6 mb-6">
          <Show when={loading()}>
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

          <Show when={!loading() && allVideos().length > 0 && currentPage() >= totalPages()}>
            <div class="w-full">
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


