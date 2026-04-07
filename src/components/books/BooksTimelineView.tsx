type BooksTimelineViewProps = {
  timelineZoom: number;
  setTimelineZoom: (updater: (z: number) => number) => void;
  setTimelineZoomDirect: (value: number) => void;
};

export default function BooksTimelineView(props: BooksTimelineViewProps) {
  return (
    <section class="w-full">
      <div class="mb-3 flex items-center justify-between gap-2">
        <p class="text-sm text-gray-500">แตะปุ่ม + / - เพื่อขยายรูปบนมือถือ</p>
        <div class="inline-flex items-center gap-1 rounded-xl border border-gray-200 bg-white p-1 shadow-sm">
          <button
            type="button"
            class="w-8 h-8 rounded-lg text-lg font-semibold text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-amber-400"
            onClick={() => props.setTimelineZoom((z) => Math.max(1, +(z - 0.25).toFixed(2)))}
            aria-label="ย่อรูป"
          >
            -
          </button>
          <button
            type="button"
            class="px-2 h-8 rounded-lg text-xs font-semibold text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-amber-400"
            onClick={() => props.setTimelineZoomDirect(1)}
            aria-label="รีเซ็ตขนาดรูป"
          >
            {Math.round(props.timelineZoom * 100)}%
          </button>
          <button
            type="button"
            class="w-8 h-8 rounded-lg text-lg font-semibold text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-amber-400"
            onClick={() => props.setTimelineZoom((z) => Math.min(3, +(z + 0.25).toFixed(2)))}
            aria-label="ขยายรูป"
          >
            +
          </button>
        </div>
      </div>
      <div class="rounded-2xl border border-gray-100 bg-white shadow-sm p-2 sm:p-4">
        <div class="overflow-auto rounded-xl">
          <img
            src="/timeline-chidahp-books.webp"
            alt="ไทม์ไลน์หนังสือชี้ดาบ"
            class="block h-auto max-w-none rounded-xl"
            loading="eager"
            fetchpriority="high"
            decoding="async"
            width="2147"
            height="1518"
            sizes="100vw"
            srcset="/timeline-chidahp-books.webp 2147w"
            style={{ width: `${props.timelineZoom * 100}%` }}
          />
        </div>
      </div>
    </section>
  );
}
