import { For, createResource, createSignal, createMemo, Show } from "solid-js";
import Seo from "../../../components/SEO";
import { breadcrumbSchema, collectionPageSchema } from "../../../utils/structuredData";

// ✅ ฟังก์ชัน fetch ข้อมูลจาก API
async function fetchBooks() {
  const res = await fetch(
    "https://chidahp-book.playground-chidahp.workers.dev/",
    {
      headers: {
        Accept: "application/json",
      },
    }
  );

  if (!res.ok) {
    throw new Error("ไม่สามารถโหลดข้อมูลหนังสือได้");
  }

  return res.json();
}

export default function BooksPage() {
  const [books] = createResource(fetchBooks);

  // state สำหรับ search
  const [search, setSearch] = createSignal("");
  // state สำหรับ filter select
  const [filter, setFilter] = createSignal("ทั้งหมด");

  // ✅ สร้าง filteredBooks จาก books() + search + filter
  const filteredBooks = createMemo(() => {
    if (!books()) return [];

    let results = books().filter((book: any) => {
      const matchSearch =
        book.title.toLowerCase().includes(search().toLowerCase()) ||
        book.authors.toLowerCase().includes(search().toLowerCase());

      const matchFilter =
        filter() === "ทั้งหมด"
          ? true
          : filter() === "ใหม่ล่าสุด"
          ? book.isNewRelease
          : filter() === "ขายดี"
          ? book.isBestSeller
          : true;

      return matchSearch && matchFilter;
    });

    // ✅ จัดเรียง pinned ให้อยู่บนสุด
    results.sort((a: any, b: any) => {
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;
      return 0;
    });

    return results;
  });

  // Create structured data for this page
  const structuredData = () => {
    const breadcrumbs = breadcrumbSchema([
      { name: "หน้าแรก", url: "https://www.chidahp.com/home" },
      { name: "หนังสือ", url: "https://www.chidahp.com/books" }
    ]);
    
    const collectionData = books() ? collectionPageSchema("หนังสือ", books().map(book => ({
      title: book.title,
      url: book.buylink || `https://www.chidahp.com/books/${book.slug || book.id}`
    }))) : null;
    
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
      <main class="max-w-6xl mx-auto px-4 py-10">
      {/* Search + Filter */}
      <div class="bg-white/70 backdrop-blur-md p-4 rounded-xl shadow-md mb-10 flex flex-col sm:flex-row sm:justify-between items-center gap-4">
        <input
          type="text"
          placeholder="🔍 ค้นหาหนังสือ..."
          class="w-full sm:w-1/2 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
          value={search()}
          onInput={(e) => setSearch(e.currentTarget.value)}
        />
        <select
          class="w-full sm:w-40 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
          value={filter()}
          onInput={(e) => setFilter(e.currentTarget.value)}
        >
          <option>ทั้งหมด</option>
          <option>ใหม่ล่าสุด</option>
          <option>ขายดี</option>
        </select>
      </div>

      {/* ✅ Loading State */}
      <Show when={books.loading}>
        <div class="text-center py-10 text-gray-600 animate-pulse">
          กำลังโหลดหนังสือ... 📚
        </div>
      </Show>

      {/* ✅ Error State */}
      <Show when={books.error}>
        <div class="text-center py-10 text-red-600 font-semibold">
          ❌ เกิดข้อผิดพลาดในการโหลดข้อมูล: {String(books.error)}
        </div>
      </Show>

      {/* Book Grid */}
      <Show when={books() && !books.error}>
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          <For each={filteredBooks()}>
            {(book) => (
              <div class="bg-white rounded-xl shadow-md hover:shadow-2xl transition group overflow-hidden relative">
                {/* Book Cover */}
                <div class="aspect-[3/4] relative overflow-hidden">
                  <img
                    src={book.image}
                    alt={book.title}
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition"></div>

                  {/* ✅ Badges */}
                  <div class="absolute top-2 left-2 flex flex-col gap-1">
                    {book.pinned && (
                      <span class="bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded shadow">
                        📌 หนังสือแนะนำ
                      </span>
                    )}
                    {book.isNewRelease && (
                      <span class="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded shadow">
                        🆕 ใหม่ล่าสุด
                      </span>
                    )}
                    {book.isBestSeller && (
                      <span class="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded shadow">
                        🔥 ขายดี
                      </span>
                    )}
                  </div>
                </div>

                {/* Book Info */}
                <div class="p-4">
                  <h2 class="font-semibold text-sm sm:text-base truncate">
                    {book.title}
                  </h2>
                  <p class="text-gray-500 text-xs sm:text-sm">{book.authors}</p>
                  <a
                    href={book.buylink || undefined}
                    target="_blank"
                    class={`mt-3 inline-block text-center w-full font-bold py-2 rounded-lg shadow transition-transform transform
                      ${
                        book.buylink
                          ? "bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black hover:-translate-y-0.5"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                  >
                    {book.buylink ? "ดูรายละเอียด" : "เร็วๆนี้"}
                  </a>
                </div>
              </div>
            )}
          </For>
        </div>
      </Show>
    </main>
    </>
  );
}
