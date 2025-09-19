import { useLocation } from "@solidjs/router";
import { FlagTriangleRight, House, LibraryBig, Podcast, Store } from "lucide-solid";

export default function Nav() {
  const location = useLocation();

  return (
    <>
      {/* 🔹 Desktop Top Navbar */}
      <nav class="hidden lg:block bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 shadow-2xl border-b-4 border-transparent relative">
        <div class="absolute inset-0 bg-gradient-to-r from-yellow-200/20 via-transparent to-yellow-200/20"></div>
        <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div class="flex items-center justify-between h-20">
            {/* Brand */}
            <div class="flex-shrink-0">
              <a href="/" class="group flex items-center space-x-4">
                <div class="relative">
                  <img
                    src="/chidahp.webp"
                    width="60px"
                    height="60px"
                    alt="ChiDahp Logo"
                    class="w-10 h-10 rounded-full object-cover"
                  />
                </div>
                <div class="flex flex-col">
                  <h1 class="text-2xl lg:text-3xl font-bold text-amber-900 group-hover:text-amber-800 transition-colors duration-300 drop-shadow-sm">
                    สำนักพิมพ์ชี้ดาบ
                  </h1>
                </div>
              </a>
            </div>

            {/* Desktop Menu */}
            <ul class="flex items-center space-x-8">
              <li>
                <a
                  href="/home"
                  class={`font-medium text-lg transition-colors duration-200 ${
                    location.pathname === "/home"
                      ? "text-amber-900"
                      : "text-amber-800 hover:text-amber-900"
                  }`}
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/books"
                  class={`font-medium text-lg transition-colors duration-200 ${
                    location.pathname === "/books"
                      ? "text-amber-900"
                      : "text-amber-800 hover:text-amber-900"
                  }`}
                >
                  Books
                </a>
              </li>
              <li>
                <a
                  href="/timeline"
                  class={`font-medium text-lg transition-colors duration-200 ${
                    location.pathname === "/timeline"
                      ? "text-amber-900"
                      : "text-amber-800 hover:text-amber-900"
                  }`}
                >
                  Timeline
                </a>
              </li>
              <li>
                <a
                  href="/podcast"
                  class={`font-medium text-lg transition-colors duration-200 ${
                    location.pathname === "/podcast"
                      ? "text-amber-900"
                      : "text-amber-800 hover:text-amber-900"
                  }`}
                >
                  Podcast
                </a>
              </li>
              <li>
                <a
                  href="/shop"
                  class={`font-medium text-lg transition-colors duration-200 ${
                    location.pathname === "/shop"
                      ? "text-amber-900"
                      : "text-amber-800 hover:text-amber-900"
                  }`}
                >
                  Shop
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* 🔹 Mobile Top Brand Bar */}
      <div class="lg:hidden bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 shadow-md border-b border-amber-200">
        <div class="flex items-center justify-center h-14 space-x-2">
          <img
            src="/chidahp.webp"
            width="40"
            height="40"
            alt="ChiDahp Logo"
            class="w-8 h-8 rounded-full object-cover"
          />
          <span class="text-lg font-bold text-amber-900">สำนักพิมพ์ชี้ดาบ</span>
        </div>
      </div>

      {/* 🔹 Mobile Bottom Navigation */}
      <nav class="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg lg:hidden z-50">
        <div class="flex justify-around items-center h-14">
          <a
            href="/home"
            class={`flex flex-col items-center ${
              location.pathname === "/home"
                ? "text-amber-900 font-bold"
                : "text-gray-600"
            }`}
          >
            <House class="w-5 h-5" />
            <span class="text-xs">Home</span>
          </a>

          <a
            href="/books"
            class={`flex flex-col items-center ${
              location.pathname === "/books"
                ? "text-amber-900 font-bold"
                : "text-gray-600"
            }`}
          >
            <LibraryBig class="w-5 h-5" />
            <span class="text-xs">Books</span>
          </a>

          <a
            href="/timeline"
            class={`flex flex-col items-center ${
              location.pathname === "/timeline"
                ? "text-amber-900 font-bold"
                : "text-gray-600"
            }`}
          >
            <FlagTriangleRight class="w-5 h-5" />
            <span class="text-xs">Timeline</span>
          </a>

          <a
            href="/podcast"
            class={`flex flex-col items-center ${
              location.pathname === "/podcast"
                ? "text-amber-900 font-bold"
                : "text-gray-600"
            }`}
          >
            <Podcast class="w-5 h-5" />
            <span class="text-xs">Podcast</span>
          </a>

          <a
            href="https://chidahp.page365.net/"
            class={`flex flex-col items-center ${
              location.pathname === "/shop"
                ? "text-amber-900 font-bold"
                : "text-gray-600"
            }`}
          >
            <Store class="w-5 h-5" />
            <span class="text-xs">Shop</span>
          </a>
        </div>
      </nav>
    </>
  );
}
