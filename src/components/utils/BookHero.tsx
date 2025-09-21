export default function BookHero() {
  return (
    <section class="relative bg-gradient-to-r from-yellow-400 to-orange-400 py-16 md:py-24">
      {/* Simple background decoration */}
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-16 right-16 w-24 h-24 bg-white rounded-full blur-lg"></div>
        <div class="absolute bottom-16 left-16 w-16 h-16 bg-white rounded-full blur-md"></div>
      </div>
      
      {/* Content */}
      <div class="relative px-6 max-w-3xl mx-auto text-center">
        <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
          หนังสือจากสำนักพิมพ์ชี้ดาบ
        </h1>
      </div>
    </section>
  );
}