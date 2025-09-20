import { For } from "solid-js";

const books = [
  {
    id: 1,
    title: "South Dakota 18+",
    author: "Chidahp",
    cover: "/covers/sd18.webp",
  },
  {
    id: 2,
    title: "James is Back",
    author: "Chidahp",
    cover: "/covers/james.webp",
  },
];

export default function BooksPage() {
  return (
    <main class="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <h1 class="text-2xl font-bold text-center mb-6">📚 หนังสือจากสำนักพิมพ์ชี้ดาบ</h1>

      {/* Search + Filter */}
      <div class="flex flex-col sm:flex-row sm:justify-between items-center gap-3 mb-6">
        <input
          type="text"
          placeholder="ค้นหาหนังสือ..."
          class="w-full sm:w-1/2 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
        <select class="w-full sm:w-40 px-3 py-2 border rounded-lg shadow-sm">
          <option>ทั้งหมด</option>
          <option>ใหม่ล่าสุด</option>
          <option>ขายดี</option>
        </select>
      </div>

      {/* Book Grid */}
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        <For each={books}>
          {(book) => (
            <div class="bg-white rounded-xl shadow hover:shadow-xl transition group overflow-hidden">
              <div class="aspect-[3/4] overflow-hidden">
                <img
                  src={book.cover}
                  alt={book.title}
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div class="p-3">
                <h2 class="font-semibold text-sm sm:text-base truncate">{book.title}</h2>
                <p class="text-gray-500 text-xs sm:text-sm">{book.author}</p>
                <a
                  href={`/books/${book.id}`}
                  class="mt-2 inline-block text-center w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 rounded-lg transition"
                >
                  ดูรายละเอียด
                </a>
              </div>
            </div>
          )}
        </For>
      </div>
    </main>
  );
}
