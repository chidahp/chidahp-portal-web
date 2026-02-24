import { useLocation } from "@solidjs/router";
import { FlagTriangleRight, House, LibraryBig, Podcast, Store, Gamepad2 } from "lucide-solid";

const menuItems = [
  { href: "/home", label: "Home", icon: House },
  { href: "/books", label: "Books", icon: LibraryBig },
  { href: "/timeline", label: "Timeline", icon: FlagTriangleRight },
  { href: "/podcast", label: "Podcast", icon: Podcast },
  { href: "https://playground.chidahp.com", external: "https://playground.chidahp.com", label: "Playground", icon: Gamepad2 },
  { href: "/shop", external: "https://chidahp.page365.net/", label: "Shop", icon: Store },
];

export default function Nav() {
  const location = useLocation();

  return (
    <>
      {/* Desktop Top Navbar */}
      <nav class="hidden lg:block relative overflow-hidden bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-300 shadow-[0_4px_20px_-4px_rgba(180,130,20,0.4)]">
        <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.3)_0%,_transparent_70%)]" />
        <div class="container mx-auto px-6 lg:px-10 relative z-10">
          <div class="flex items-center justify-between h-[72px]">
            {/* Brand */}
            <a href="/" class="group flex items-center gap-3.5">
              <div class="relative">
                <div class="absolute -inset-1 rounded-full bg-amber-500/40 blur-sm group-hover:bg-amber-500/60 transition-all duration-500" />
                <img
                  src="/chidahp.webp"
                  width="48"
                  height="48"
                  alt="ChiDahp Logo"
                  class="relative w-11 h-11 rounded-full object-cover ring-2 ring-amber-700/30 shadow-lg group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h1 class="text-2xl lg:text-[1.7rem] font-extrabold text-amber-900 tracking-tight group-hover:text-amber-800 transition-colors duration-300">
                สำนักพิมพ์ชี้ดาบ
              </h1>
            </a>

            {/* Desktop Menu */}
            <ul class="flex items-center gap-1">
              {menuItems.map(({ href, external, label, icon: Icon }) => {
                const isActive = location.pathname === href;
                return (
                  <li>
                    <a
                      href={external ?? href}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noopener noreferrer" : undefined}
                      class={`relative flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-[0.95rem] transition-all duration-300 ${
                        isActive
                          ? "text-amber-950 bg-amber-500/30 shadow-inner"
                          : "text-amber-900/80 hover:text-amber-950 hover:bg-amber-400/20"
                      }`}
                    >
                      <Icon class="w-[18px] h-[18px]" />
                      {label}
                      {isActive && (
                        <span class="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-[3px] rounded-full bg-amber-800" />
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </nav>

      {/* Mobile Top Brand Bar */}
      <div class="lg:hidden relative overflow-hidden bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-300 shadow-[0_2px_12px_-2px_rgba(180,130,20,0.35)]">
        <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.25)_0%,_transparent_70%)]" />
        <div class="relative z-10 flex items-center justify-center h-14 gap-2.5">
          <div class="relative">
            <div class="absolute -inset-0.5 rounded-full bg-amber-500/40 blur-sm" />
            <img
              src="/chidahp.webp"
              width="36"
              height="36"
              alt="ChiDahp Logo"
              class="relative w-8 h-8 rounded-full object-cover ring-2 ring-amber-700/25 shadow-md"
            />
          </div>
          <span class="text-lg font-extrabold text-amber-900 tracking-tight">
            สำนักพิมพ์ชี้ดาบ
          </span>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav class="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200/80 shadow-[0_-4px_20px_-4px_rgba(0,0,0,0.1)] lg:hidden z-50">
        <div class="flex justify-around items-center h-16 px-1">
          {menuItems.map(({ href, external, label, icon: Icon }) => {
            const isActive = location.pathname === href;
            return (
              <a
                href={external ?? href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                class={`relative flex flex-col items-center justify-center gap-0.5 min-w-[3.5rem] py-1 transition-all duration-300 ${
                  isActive
                    ? "text-amber-700"
                    : "text-gray-400 active:text-amber-600"
                }`}
              >
                {isActive && (
                  <span class="absolute -top-px left-1/2 -translate-x-1/2 w-8 h-[3px] rounded-b-full bg-amber-500" />
                )}
                <div
                  class={`p-1.5 rounded-xl transition-all duration-300 ${
                    isActive ? "bg-amber-100 shadow-sm" : ""
                  }`}
                >
                  <Icon
                    class={`transition-all duration-300 ${
                      isActive ? "w-[22px] h-[22px]" : "w-5 h-5"
                    }`}
                  />
                </div>
                <span
                  class={`text-[0.65rem] leading-tight transition-all duration-300 ${
                    isActive ? "font-bold text-amber-800" : "font-medium"
                  }`}
                >
                  {label}
                </span>
              </a>
            );
          })}
        </div>
        <div class="h-[env(safe-area-inset-bottom)] bg-white/95" />
      </nav>
    </>
  );
}
