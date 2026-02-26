import { createSignal, For, onCleanup, onMount, Show } from 'solid-js';

const AUTO_PLAY_INTERVAL_MS = 5000;

const BOOKS_PER_SLIDE = 4;

export interface LatestBook {
  image: string;
  title: string;
  authors: string;
  buylink?: string;
  isNewRelease?: boolean;
  isBestSeller?: boolean;
}

interface LatestBookSectionProps {
  books: LatestBook[] | undefined;
}

function chunk<T>(arr: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}

export default function LatestBookSection(props: LatestBookSectionProps) {
  const [currentSlide, setCurrentSlide] = createSignal(0);
  const slides = () => (props.books ? chunk(props.books, BOOKS_PER_SLIDE) : []);
  const totalSlides = () => slides().length;
  const hasMultipleSlides = () => totalSlides() > 1;

  const goPrev = () => setCurrentSlide((i) => (i <= 0 ? totalSlides() - 1 : i - 1));
  const goNext = () => setCurrentSlide((i) => (i >= totalSlides() - 1 ? 0 : i + 1));

  onMount(() => {
    if (!hasMultipleSlides()) return;
    const id = setInterval(() => {
      setCurrentSlide((i) => (i >= totalSlides() - 1 ? 0 : i + 1));
    }, AUTO_PLAY_INTERVAL_MS);
    onCleanup(() => clearInterval(id));
  });

  return (
    <Show when={props.books && props.books.length > 0}>
      <section class="mb-16 sm:mb-20">
        <div class="flex items-end justify-between mb-8">
          <div>
            <span class="text-xs font-semibold tracking-widest uppercase text-yellow-600 mb-1 block">
              From Our Publisher
            </span>
            <h2 class="text-xl sm:text-2xl font-bold text-gray-900">
              หนังสือจากสำนักพิมพ์ชี้ดาบ
            </h2>
          </div>
          <div class="flex items-center gap-3">
            <Show when={hasMultipleSlides()}>
              <div class="flex items-center gap-1">
                <button
                  type="button"
                  aria-label="ก่อนหน้า"
                  onclick={goPrev}
                  class="w-9 h-9 rounded-full border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 hover:border-gray-300 flex items-center justify-center transition-colors shrink-0"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  type="button"
                  aria-label="ถัดไป"
                  onclick={goNext}
                  class="w-9 h-9 rounded-full border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 hover:border-gray-300 flex items-center justify-center transition-colors shrink-0"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </Show>
            <a href="/books" class="text-sm font-medium text-purple-600 hover:text-purple-700 flex items-center gap-1 group shrink-0">
              ดูทั้งหมด
              <svg class="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>

        <div class="relative overflow-hidden w-full">
          <div
            class="flex transition-transform duration-300 ease-out"
            style={{
              width: `${totalSlides() * 100}%`,
              transform: `translateX(-${currentSlide() * (100 / totalSlides())}%)`
            }}
          >
            <For each={slides()}>
              {(slideBooks) => (
                <div
                  class="shrink-0"
                  style={{ width: `${100 / totalSlides()}%` }}
                >
                  <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
                    <For each={slideBooks}>
                      {(book) => (
                        <a
                          href={book.buylink || undefined}
                          target="_blank"
                          rel="noopener noreferrer"
                          class="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200 hover:-translate-y-1"
                        >
                          <div class="aspect-[3/4] overflow-hidden relative">
                            <img
                              src={book.image}
                              alt={book.title}
                              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div class="absolute top-2 left-2 flex flex-col gap-1">
                              <Show when={book.isNewRelease}>
                                <span class="bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
                                  ใหม่
                                </span>
                              </Show>
                              <Show when={book.isBestSeller}>
                                <span class="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
                                  ขายดี
                                </span>
                              </Show>
                            </div>
                          </div>
                          <div class="p-3 sm:p-4">
                            <h3 class="font-semibold text-sm truncate text-gray-900 group-hover:text-purple-700 transition-colors">
                              {book.title}
                            </h3>
                            <p class="text-xs text-gray-500 mt-1 truncate">{book.authors}</p>
                          </div>
                        </a>
                      )}
                    </For>
                  </div>
                </div>
              )}
            </For>
          </div>
        </div>

        <Show when={hasMultipleSlides()}>
          <div class="flex justify-center gap-2 mt-6">
            <For each={slides()}>
              {(_, index) => (
                <button
                  type="button"
                  aria-label={`สไลด์ ${index() + 1}`}
                  onclick={() => setCurrentSlide(index())}
                  class="w-2 h-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-1"
                  classList={{
                    'bg-purple-600': currentSlide() === index(),
                    'bg-gray-300 hover:bg-gray-400': currentSlide() !== index()
                  }}
                />
              )}
            </For>
          </div>
        </Show>
      </section>
    </Show>
  );
}
