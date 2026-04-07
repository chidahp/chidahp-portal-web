import { lazy, createResource, createSignal, createMemo, Show, Suspense } from "solid-js";
import Seo from "../../../components/SEO";
import { breadcrumbSchema, collectionPageSchema } from "../../../utils/structuredData";
const BooksFullView = lazy(() => import("../../../components/books/BooksFullView"));
const BooksTimelineView = lazy(() => import("../../../components/books/BooksTimelineView"));

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
  [key: string]: unknown;
};

function normalizeBook(book: BookItem): BookItem {
  return {
    ...book,
    title: (book.title ?? "").trim().replaceAll("\n", " "),
    authors: (book.authors ?? "").trim(),
    series: (book.series ?? "").trim(),
    image: (book.image ?? "").trim(),
  };
}

/** ดึงค่า series ทั้งหมดจาก JSON แล้วกรองให้เหลือแบบเดียว (หนึ่งชื่อซีรีส์ = 1 ตัวเลือก) */
function getUniqueSeriesNames(books: BookItem[]): string[] {
  const normalized = books.map(normalizeBook);
  const set = new Set<string>();
  for (const book of normalized) {
    const s = book.series ?? "";
    if (s !== "") set.add(s);
  }
  return Array.from(set).sort((a, b) => a.localeCompare(b, "th"));
}

async function fetchBooks() {
  const res = await fetch(
    "https://chidahp-book.playground-chidahp.workers.dev/",
    { headers: { Accept: "application/json" } }
  );
  if (!res.ok) throw new Error("ไม่สามารถโหลดข้อมูลหนังสือได้");
  return res.json();
}

const FILTER_OPTIONS = [
  { value: "ทั้งหมด", label: "ทั้งหมด" },
  { value: "ใหม่ล่าสุด", label: "ใหม่ล่าสุด" },
  { value: "ขายดี", label: "ขายดี" },
] as const;

const SERIES_ALL = "__all__";
const SERIES_NONE = "__none__"; // ค่าว่าง = ไม่มีซีรีส์

export default function BooksPage() {
  const [books] = createResource(fetchBooks);
  const [search, setSearch] = createSignal("");
  const [filter, setFilter] = createSignal<"ทั้งหมด" | "ใหม่ล่าสุด" | "ขายดี">("ทั้งหมด");
  const [seriesFilter, setSeriesFilter] = createSignal<string>(SERIES_ALL);
  const [viewMode, setViewMode] = createSignal<"full" | "timeline">("timeline");
  const [timelineZoom, setTimelineZoom] = createSignal(1);

  const seriesOptions = createMemo(() => {
    if (!books()) return [];
    return getUniqueSeriesNames(books() as BookItem[]);
  });

  const filteredBooks = createMemo(() => {
    if (!books()) return [];

    const raw = books() as BookItem[];
    let results = raw
      .map(normalizeBook)
      .filter((book) => {
        const q = search().toLowerCase().trim();
        const matchSearch =
          !q ||
          book.title.toLowerCase().includes(q) ||
          (book.authors && book.authors.toLowerCase().includes(q)) ||
          (book.series && book.series.toLowerCase().includes(q));

        const matchFilter =
          filter() === "ทั้งหมด"
            ? true
            : filter() === "ใหม่ล่าสุด"
            ? Boolean(book.isNewRelease)
            : filter() === "ขายดี"
            ? Boolean(book.isBestSeller)
            : true;

        const bookSeries = (book.series ?? "").trim();
        const matchSeries =
          seriesFilter() === SERIES_ALL
            ? true
            : seriesFilter() === SERIES_NONE
            ? bookSeries === ""
            : bookSeries === seriesFilter();

        return matchSearch && matchFilter && matchSeries;
      });

    results.sort((a, b) => {
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;
      return 0;
    });

    return results;
  });

  const structuredData = () => {
    const breadcrumbs = breadcrumbSchema([
      { name: "หน้าแรก", url: "https://www.chidahp.com/home" },
      { name: "หนังสือ", url: "https://www.chidahp.com/books" },
    ]);
    const list = books() as BookItem[] | undefined;
    const collectionData = list?.length
      ? collectionPageSchema(
          "หนังสือ",
          list.map((book) => ({
            title: normalizeBook(book).title,
            url: book.buylink || `https://www.chidahp.com/books`,
          }))
        )
      : null;
    return [breadcrumbs, collectionData].filter(Boolean);
  };

  return (
    <>
      <Seo
        title="หนังสือทั้งหมด | ชี้ดาบ - สำนักพิมพ์ที่ว่าด้วยการเติบโต"
        description="ค้นหาหนังสือทั้งหมดจากชี้ดาบ หนังสือเดินทาง แรงบันดาลใจ และการพัฒนาตัวเอง ที่จะเปลี่ยนชีวิตคุณ"
        keywords="หนังสือชี้ดาบ, หนังสือเดินทาง, แรงบันดาลใจ, พัฒนาตัวเอง, Route13, อินเดีย, ญี่ปุ่น, อเมริกา, เจม"
        url="https://www.chidahp.com/books"
        type="website"
        structuredData={structuredData()}
      />
      <main class="min-h-screen bg-white">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          {/* Page header */}
          <header class="mb-8 sm:mb-10">

            <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              หนังสือทั้งหมด
            </h1>
            <p class="text-gray-600 text-sm sm:text-base max-w-xl">
              ค้นหาหนังสือจากสำนักพิมพ์ชี้ดาบ
            </p>
          </header>

          <div class="mb-6 sm:mb-8">
            <div class="inline-flex rounded-xl border border-gray-200 bg-white p-1 shadow-sm">
              <button
                type="button"
                class="px-4 py-2 rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-1"
                classList={{
                  "bg-amber-500 text-black": viewMode() === "full",
                  "text-gray-700 hover:bg-gray-100": viewMode() !== "full",
                }}
                onClick={() => setViewMode("full")}
              >
                ดูแบบเต็ม
              </button>
              <button
                type="button"
                class="px-4 py-2 rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-1"
                classList={{
                  "bg-amber-500 text-black": viewMode() === "timeline",
                  "text-gray-700 hover:bg-gray-100": viewMode() !== "timeline",
                }}
                onClick={() => setViewMode("timeline")}
              >
                ดูแบบรูปภาพ
              </button>
            </div>
          </div>

          <Show when={viewMode() === "full"}>
            <Suspense fallback={<div class="h-40 animate-pulse rounded-2xl bg-gray-100" />}>
              <BooksFullView
                search={search()}
                setSearch={setSearch}
                filter={filter()}
                setFilter={setFilter}
                seriesFilter={seriesFilter()}
                setSeriesFilter={setSeriesFilter}
                seriesOptions={seriesOptions()}
                filteredBooks={filteredBooks()}
                booksLoading={books.loading}
                booksError={books.error}
                filterOptions={FILTER_OPTIONS}
                seriesAll={SERIES_ALL}
                seriesNone={SERIES_NONE}
              />
            </Suspense>
          </Show>

          <Show when={viewMode() === "timeline"}>
            <Suspense fallback={<div class="h-40 animate-pulse rounded-2xl bg-gray-100" />}>
              <BooksTimelineView
                timelineZoom={timelineZoom()}
                setTimelineZoom={setTimelineZoom}
                setTimelineZoomDirect={setTimelineZoom}
              />
            </Suspense>
          </Show>
        </div>
      </main>
    </>
  );
}
