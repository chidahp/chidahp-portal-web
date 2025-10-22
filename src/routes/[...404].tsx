import { A } from "@solidjs/router";
import { House, LibraryBig, FlagTriangleRight, Podcast, ArrowLeft } from "lucide-solid";

export default function NotFound() {
  return (
    <div class="min-h-screen bg-gradient-to-br from-yellow-50 via-amber-50 to-yellow-100 flex items-center justify-center px-4">
      <div class="max-w-2xl mx-auto text-center">
        {/* Logo */}
        <div class="mb-8 animate-fade-in">
          <img
            src="/chidahp.webp"
            width="80"
            height="80"
            alt="ChiDahp Logo"
            class="w-16 h-16 rounded-full object-cover mx-auto mb-4 shadow-lg"
          />
          <h1 class="text-2xl font-bold text-amber-900 mb-2">สำนักพิมพ์ชี้ดาบ</h1>
        </div>

        {/* 404 Error */}
        <div class="mb-12 animate-slide-up">
          <div class="relative">
            <h1 class="text-8xl md:text-9xl font-bold text-amber-600 mb-4 opacity-20">404</h1>
            <div class="absolute inset-0 flex items-center justify-center">
              <h2 class="text-3xl md:text-4xl font-bold text-amber-900">ไม่พบหน้าที่คุณต้องการ</h2>
            </div>
          </div>
          <p class="text-lg text-amber-800 mt-6 leading-relaxed">
            ขออภัย หน้าที่คุณกำลังมองหาอาจถูกลบหรือย้ายไปที่อื่นแล้ว
          </p>
        </div>

        {/* Navigation Links */}
        <div class="mb-8 animate-zoom-in">
          <h3 class="text-xl font-semibold text-amber-900 mb-6">ไปที่หน้าหลัก</h3>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <A 
              href="/home" 
              class="group flex flex-col items-center p-4 bg-white/70 hover:bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              <House class="w-8 h-8 text-amber-600 group-hover:text-amber-700 mb-2" />
              <span class="text-sm font-medium text-amber-900">หน้าแรก</span>
            </A>
            
            <A 
              href="/books" 
              class="group flex flex-col items-center p-4 bg-white/70 hover:bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              <LibraryBig class="w-8 h-8 text-amber-600 group-hover:text-amber-700 mb-2" />
              <span class="text-sm font-medium text-amber-900">หนังสือ</span>
            </A>
            
            <A 
              href="/timeline" 
              class="group flex flex-col items-center p-4 bg-white/70 hover:bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              <FlagTriangleRight class="w-8 h-8 text-amber-600 group-hover:text-amber-700 mb-2" />
              <span class="text-sm font-medium text-amber-900">ไทม์ไลน์</span>
            </A>
            
            <A 
              href="/podcast" 
              class="group flex flex-col items-center p-4 bg-white/70 hover:bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              <Podcast class="w-8 h-8 text-amber-600 group-hover:text-amber-700 mb-2" />
              <span class="text-sm font-medium text-amber-900">พอดแคสต์</span>
            </A>
          </div>
        </div>

        {/* Back to Home Button */}
        <div class="animate-fade-in-delay">
          <A 
            href="/home" 
            class="group inline-flex items-center justify-center bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <ArrowLeft class="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
            กลับไปหน้าแรก
          </A>
        </div>

        {/* Additional Links */}
        <div class="mt-8 text-sm text-amber-700 animate-fade-in-delay-2">
          <p class="mb-2">หรือเยี่ยมชม</p>
          <div class="flex justify-center space-x-6">
            <a 
              href="https://playground.chidahp.com" 
              target="_blank" 
              rel="noopener noreferrer"
              class="hover:text-amber-900 hover:underline transition-colors duration-300"
            >
              Playground
            </a>
            <a 
              href="https://chidahp.page365.net/" 
              target="_blank" 
              rel="noopener noreferrer"
              class="hover:text-amber-900 hover:underline transition-colors duration-300"
            >
              ร้านค้า
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
