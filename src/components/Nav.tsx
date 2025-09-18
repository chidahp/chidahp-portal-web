import { useLocation } from "@solidjs/router";
import { createSignal } from "solid-js";

export default function Nav() {
  const location = useLocation();
  const [isOpen, setIsOpen] = createSignal(false);
  
  return (
    <nav class="bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 shadow-2xl border-b-4 border-transparent relative">
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
          <ul class="hidden lg:flex items-center space-x-8">
            <li>
              <a href="/home" class={`font-medium text-lg transition-colors duration-200 ${location.pathname === "/" ? "text-amber-900" : "text-amber-800 hover:text-amber-900"}`}>
                Home
              </a>
            </li>
            <li>
              <a href="/books" class={`font-medium text-lg transition-colors duration-200 ${location.pathname === "/books" ? "text-amber-900" : "text-amber-800 hover:text-amber-900"}`}>
                Books
              </a>
            </li>
            <li>
              <a href="/timeline" class={`font-medium text-lg transition-colors duration-200 ${location.pathname === "/timeline" ? "text-amber-900" : "text-amber-800 hover:text-amber-900"}`}>
                Timeline
              </a>
            </li>
            <li>
              <a href="/podcast" class={`font-medium text-lg transition-colors duration-200 ${location.pathname === "/podcast" ? "text-amber-900" : "text-amber-800 hover:text-amber-900"}`}>
                Podcast
              </a>
            </li>
            <li>
              <a href="https://chidahp.page365.net" class={`font-medium text-lg transition-colors duration-200 ${location.pathname === "/shop" ? "text-amber-900" : "text-amber-800 hover:text-amber-900"}`}>
                Shop
              </a>
            </li>
          </ul>

          {/* Mobile menu button */}
          <div class="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen())}
              class="inline-flex items-center justify-center p-3 rounded-xl bg-amber-800/15 text-amber-900 hover:bg-amber-800/25 hover:text-amber-800 focus:outline-none focus:ring-4 focus:ring-amber-700/40 transition-all duration-300 shadow-lg hover:shadow-xl backdrop-blur-sm"
              aria-expanded={isOpen()}
            >
              <svg
                class={`h-6 w-6 transition-transform duration-200 ${isOpen() ? 'rotate-45' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen() ? (
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div class={`lg:hidden transition-all duration-300 ease-in-out ${isOpen() ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
          <div class="py-4 space-y-2">
            <a
              href="/"
              onClick={() => setIsOpen(false)}
              class={`block px-4 py-2 font-medium text-lg transition-colors duration-200 ${
                location.pathname === "/" 
                  ? "text-amber-900" 
                  : "text-amber-800 hover:text-amber-900"
              }`}
            >
              Home
            </a>
            <a
              href="/books"
              onClick={() => setIsOpen(false)}
              class={`block px-4 py-2 font-medium text-lg transition-colors duration-200 ${
                location.pathname === "/books" 
                  ? "text-amber-900" 
                  : "text-amber-800 hover:text-amber-900"
              }`}
            >
              Books
            </a>
            <a
              href="/timeline"
              onClick={() => setIsOpen(false)}
              class={`block px-4 py-2 font-medium text-lg transition-colors duration-200 ${
                location.pathname === "/timeline" 
                  ? "text-amber-900" 
                  : "text-amber-800 hover:text-amber-900"
              }`}
            >
              Timeline
            </a>
            <a
              href="/podcast"
              onClick={() => setIsOpen(false)}
              class={`block px-4 py-2 font-medium text-lg transition-colors duration-200 ${
                location.pathname === "/podcast" 
                  ? "text-amber-900" 
                  : "text-amber-800 hover:text-amber-900"
              }`}
            >
              Podcast
            </a>
            <a
              href="/shop"
              onClick={() => setIsOpen(false)}
              class={`block px-4 py-2 font-medium text-lg transition-colors duration-200 ${
                location.pathname === "/shop" 
                  ? "text-amber-900" 
                  : "text-amber-800 hover:text-amber-900"
              }`}
            >
              Shop
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
