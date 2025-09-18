"use client";
import { createSignal, onMount, onCleanup } from "solid-js";
import { A } from "@solidjs/router";
import { SolidTyper } from "solid-typer";


export default function SouthDakotaHero() {
  const [offsetY, setOffsetY] = createSignal(0);

  onMount(() => {
    const handleScroll = () => setOffsetY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    onCleanup(() => window.removeEventListener("scroll", handleScroll));
  });

  return (
    <section class="relative flex flex-col items-center justify-center min-h-[60vh] overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800 text-center px-2 pt-20">
      {/* Parallax Background */}
      <div
        class="absolute inset-0 bg-cover bg-center transition-transform duration-700"
        style={{
          "background-image": "url('/sd-background.png')",
          transform: `translateY(${offsetY() * 0.3}px) scale(1.1)`,
          opacity: 0.15,
        }}
      />

      {/* Animated Gradient Overlay */}
      <div class="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-purple-900/60 to-transparent" />

      {/* Neon Floating Glow */}
      <div class="absolute -top-40 -left-32 h-96 w-96 rounded-full bg-pink-600/20 blur-3xl animate-pulse" />
      <div class="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-purple-500/10 blur-2xl animate-pulse" />

      <img
        src="/southdakota.png"
        alt="South Dakota Logo"
        width={300}
        height={100}
        style={{
          transform: `translateY(${offsetY() * 0.15}px)`,
        }}
        class="relative z-10 drop-shadow-[0_0_40px_rgba(236,72,153,0.5)] transition-transform duration-1000 hover:scale-105 animate-zoom-fade"
      />

      {/* Main Content */}
      <div class="relative z-10 max-w-4xl mx-auto text-center">
        {/* Subtitle with Typewriter Effect */}
        <div
          style={{
            transform: `translateY(${offsetY() * 0.25}px)`,
          }}
          class="mb-8 text-lg md:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed animate-fade-in delay-700"
        >

          <SolidTyper
            text={[
              "เมื่ออิสรภาพและความฝัน แลกมาด้วยความพัง และความจริง...",
            ]}
            backspaceSpeed={30}
            typingSpeed={100}
          />
        </div>

        {/* CTA Buttons */}
        <div
          style={{
            transform: `translateY(${offsetY() * 0.2}px)`,
          }}
          class="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in delay-1000"
        >
          <A href="https://playground.chidahp.com/southdakota">
            <button class="group relative bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-400/50 hover:border-pink-300 hover:from-purple-600/30 hover:to-pink-600/30 transform hover:scale-105 transition-all duration-300 text-white px-8 py-4 rounded-full font-semibold flex items-center text-center space-x-3 backdrop-blur-sm cursor-pointer mb-6 animate-pulse hover:animate-none shadow-lg hover:shadow-pink-500/25">
              <span class="ml-3 text-xs md:text-sm group-hover:scale-110 transition-transform duration-200">
                🌟 เริ่มต้นการผจญภัย 🌟
              </span>
              <div class="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400/20 to-pink-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
            </button>
          </A>
        </div>
      </div>

      {/* Floating Center Glow */}
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-pink-500/10 blur-[140px] animate-pulse"></div>
    </section>
  );
}
