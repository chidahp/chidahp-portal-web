import { For, Show } from "solid-js";

type BookItem = {
  title: string;
  authors: string;
  series?: string;
  releaseYear?: number | string;
  isNewRelease?: boolean | string;
  pinned?: boolean;
  isBestSeller?: boolean | string;
  buylink?: string;
  image: string;
};

type FilterOption = {
  value: "ทั้งหมด" | "ใหม่ล่าสุด" | "ขายดี";
  label: string;
};

type BooksFullViewProps = {
  search: string;
  setSearch: (value: string) => void;
  filter: "ทั้งหมด" | "ใหม่ล่าสุด" | "ขายดี";
  setFilter: (value: "ทั้งหมด" | "ใหม่ล่าสุด" | "ขายดี") => void;
  seriesFilter: string;
  setSeriesFilter: (value: string) => void;
  seriesOptions: string[];
  filteredBooks: BookItem[];
  booksLoading: boolean;
  booksError: unknown;
  filterOptions: readonly FilterOption[];
  seriesAll: string;
  seriesNone: string;
};

export default function BooksFullView(props: BooksFullViewProps) {
  return (
    <>
      <div class="bg-gray-50 border border-gray-100 rounded-2xl p-4 sm:p-5 mb-8">
        <div class="flex flex-col gap-4">
          <div class="flex flex-col sm:flex-row sm:items-center gap-4">
            <div class="relative flex-1">
              <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden="true">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
              <input
                type="search"
                placeholder="ค้นหาชื่อหนังสือ หรือผู้เขียน..."
                class="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-amber-400/60 focus:border-amber-400 transition text-gray-900 placeholder-gray-400"
                value={props.search}
                onInput={(e) => props.setSearch(e.currentTarget.value)}
                aria-label="ค้นหาหนังสือ"
              />
            </div>
            <div class="flex flex-wrap items-center gap-2 sm:gap-3">
              <span class="text-sm text-gray-500 hidden sm:inline">สถานะ:</span>
              <For each={props.filterOptions}>
                {(opt) => (
                  <button
                    type="button"
                    class="px-4 py-2 rounded-xl text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-1"
                    classList={{
                      "bg-amber-500 text-black shadow-sm": props.filter === opt.value,
                      "bg-white border border-gray-200 text-gray-700 hover:bg-gray-100": props.filter !== opt.value,
                    }}
                    onClick={() => props.setFilter(opt.value)}
                  >
                    {opt.label}
                  </button>
                )}
              </For>
            </div>
          </div>
          <div class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <label for="series-filter" class="text-sm text-gray-600 font-medium shrink-0">
              ซีรีส์:
            </label>
            <select
              id="series-filter"
              class="w-full sm:w-56 px-3 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-400/60 focus:border-amber-400 transition cursor-pointer"
              value={props.seriesFilter}
              onChange={(e) => props.setSeriesFilter(e.currentTarget.value)}
              aria-label="กรองตามซีรีส์"
            >
              <option value={props.seriesAll}>ทั้งหมด</option>
              <option value={props.seriesNone}>ทั่วไป (ไม่มีซีรีส์)</option>
              <For each={props.seriesOptions}>
                {(name) => <option value={name}>{name}</option>}
              </For>
            </select>
          </div>
        </div>
        <Show when={!props.booksLoading && !props.booksError}>
          <p class="mt-3 text-sm text-gray-500">
            แสดง <span class="font-semibold text-gray-700">{props.filteredBooks.length}</span> เล่ม
          </p>
        </Show>
      </div>

      <Show when={props.booksLoading}>
        <div class="flex flex-col items-center justify-center py-16 text-gray-500">
          <div class="w-10 h-10 border-2 border-amber-400 border-t-transparent rounded-full animate-spin mb-4" />
          <p class="text-sm font-medium">กำลังโหลดหนังสือ...</p>
        </div>
      </Show>

      <Show when={props.booksError}>
        <div class="rounded-2xl bg-red-50 border border-red-100 p-6 text-center">
          <p class="text-red-700 font-medium">เกิดข้อผิดพลาดในการโหลดข้อมูล</p>
          <p class="text-red-600 text-sm mt-1">{String(props.booksError)}</p>
        </div>
      </Show>

      <Show when={!props.booksError && props.filteredBooks.length === 0 && !props.booksLoading}>
        <div class="rounded-2xl bg-gray-50 border border-gray-100 p-10 text-center">
          <p class="text-gray-600 font-medium">ไม่พบหนังสือที่ตรงกับคำค้นหรือตัวกรอง</p>
          <p class="text-gray-500 text-sm mt-1">ลองเปลี่ยนคำค้น ตัวกรองสถานะ หรือซีรีส์ «ทั้งหมด»</p>
        </div>
      </Show>

      <Show when={!props.booksError && props.filteredBooks.length > 0}>
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          <For each={props.filteredBooks}>
            {(book) => (
              <article
                class="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-amber-100 transition-all duration-300 overflow-hidden flex flex-col"
              >
                <div class="aspect-[3/4] relative overflow-hidden bg-gray-100">
                  <img
                    src={book.image}
                    alt={book.title}
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    decoding="async"
                    width="480"
                    height="640"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                  <div class="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div class="absolute top-2 left-2 flex flex-wrap gap-1">
                    {book.pinned && (
                      <span class="bg-amber-500 text-black text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-lg shadow">
                        แนะนำ
                      </span>
                    )}
                    {Boolean(book.isNewRelease) && (
                      <span class="bg-emerald-500 text-white text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-lg shadow">
                        ใหม่
                      </span>
                    )}
                    {Boolean(book.isBestSeller) && (
                      <span class="bg-rose-500 text-white text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-lg shadow">
                        ขายดี
                      </span>
                    )}
                    {book.title.toUpperCase().includes("PRE-ORDER") && (
                      <span class="bg-violet-500 text-white text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-lg shadow">
                        Pre-order
                      </span>
                    )}
                  </div>
                </div>
                <div class="p-3 sm:p-4 flex flex-col flex-1">
                  <h2 class="font-semibold text-sm sm:text-base text-gray-900 line-clamp-2 min-h-[2.5em] leading-snug">
                    {book.title}
                  </h2>
                  <p class="text-gray-500 text-xs sm:text-sm mt-1 truncate">{book.authors}</p>
                  <Show when={book.series || book.releaseYear}>
                    <p class="text-gray-400 text-xs mt-1 truncate">
                      {[book.series, book.releaseYear ? `พ.ศ. ${book.releaseYear}` : ""]
                        .filter(Boolean)
                        .join(" · ")}
                    </p>
                  </Show>
                  {book.buylink ? (
                    <a
                      href={book.buylink}
                      target="_blank"
                      rel="noopener noreferrer"
                      class="mt-3 sm:mt-4 inline-flex items-center justify-center font-bold py-2.5 rounded-xl text-sm bg-amber-500 hover:bg-amber-600 text-black hover:-translate-y-0.5 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2"
                    >
                      ดูรายละเอียด / สั่งซื้อ
                    </a>
                  ) : (
                    <span class="mt-3 sm:mt-4 inline-flex items-center justify-center font-bold py-2.5 rounded-xl text-sm bg-gray-200 text-gray-500 cursor-not-allowed">
                      เร็วๆ นี้
                    </span>
                  )}
                </div>
              </article>
            )}
          </For>
        </div>
      </Show>
    </>
  );
}
