import { A } from "@solidjs/router";

export interface BookfeedWaitlistAdProps {
  /** Waitlist / landing URL. Defaults to in-app `/bookfeed` waitlist page. */
  ctaHref?: string;
}

export default function BookfeedWaitlistAd(props: BookfeedWaitlistAdProps) {
  const href = () => "https://bookfeed.club/waitlist?utm_source=chidahp&utm_medium=in_app_ad&utm_campaign=bookfeed_waitlist";

  return (
    <section
      class="group/bookfeed-ad relative mb-10 overflow-hidden rounded-3xl border border-white/[0.07] bg-[#08080a] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.15),0_24px_48px_-12px_rgba(0,0,0,0.45),inset_0_1px_0_0_rgba(255,255,255,0.04)] transition-[border-color,box-shadow,transform] duration-500 motion-reduce:transition-none sm:mb-12 hover:border-amber-400/20 hover:shadow-[0_4px_6px_-1px_rgba(0,0,0,0.12),0_28px_56px_-16px_rgba(251,191,36,0.12),inset_0_1px_0_0_rgba(255,255,255,0.06)] motion-reduce:hover:transform-none"
      aria-labelledby="bookfeed-waitlist-ad-heading"
    >
      {/* Top accent — thin warm line */}
      <div
        class="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-400/50 to-transparent opacity-80"
        aria-hidden="true"
      />

      {/* Ambient glows */}
      <div
        class="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full bg-amber-400/[0.14] blur-3xl transition-opacity duration-500 group-hover/bookfeed-ad:bg-amber-400/[0.22] motion-reduce:transition-none"
        aria-hidden="true"
      />
      <div
        class="pointer-events-none absolute -bottom-32 -left-20 h-64 w-64 rounded-full bg-amber-600/[0.06] blur-3xl"
        aria-hidden="true"
      />

      {/* Fine grid */}
      <div
        class="pointer-events-none absolute inset-0 opacity-[0.4]"
        style={{
          "background-image":
            "linear-gradient(to right, rgba(255,255,255,0.028) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.028) 1px, transparent 1px)",
          "background-size": "36px 36px",
        }}
        aria-hidden="true"
      />

      <div class="relative flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:justify-between sm:gap-10 sm:p-8 md:p-9">
        <div class="flex min-w-0 flex-1 flex-col gap-5 sm:flex-row sm:items-center sm:gap-6 md:gap-8">
          {/* Logo mark — light surface so black logo reads on dark card */}
          <div class="relative shrink-0 self-start sm:self-center">
            <div
              class="absolute -inset-1 rounded-2xl bg-gradient-to-br from-amber-400/25 via-amber-500/10 to-transparent opacity-0 blur-md transition-opacity duration-500 group-hover/bookfeed-ad:opacity-100 motion-reduce:transition-none"
              aria-hidden="true"
            />
              <img
                src="/bookfeed-logo-black-transparent.png"
                alt="bookfeed"
                width={128}
                height={42}
                class="h-9 w-auto max-w-[8rem] object-contain sm:h-10"
                loading="lazy"
                decoding="async"
              />
          </div>

          <div class="min-w-0 space-y-2">
            <p class="text-[10px] font-semibold uppercase  text-amber-400/90 sm:text-[11px]">
              bookfeed
            </p>
            <p
              id="bookfeed-waitlist-ad-heading"
              class="text-lg font-bold leading-snug tracking-tight text-white sm:text-xl md:text-2xl md:leading-tight"
            >
              Register{" "}
              <span class="bg-gradient-to-r from-amber-200 via-amber-300 to-amber-400 bg-clip-text text-transparent">
                Bookfeed
              </span>{" "}
              Social Media
            </p>
            <p class="max-w-xl text-sm leading-relaxed text-neutral-400 sm:text-[0.9375rem]">
              BookFeed คือแพลตฟอร์มโซเชียลสำหรับนักอ่าน ที่ช่วยให้ผู้คนค้นพบหนังสือ แบ่งปันประสบการณ์การอ่าน และเชื่อมต่อกับคนที่รักหนังสือเหมือนกัน
            </p>
          </div>
        </div>

        <div class="flex shrink-0 sm:items-center sm:pl-2">
          <A
            href={href()}
            class="group/btn relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-b from-[#FCD34D] to-[#F59E0B] px-6 py-3.5 text-center text-sm font-bold text-neutral-900 shadow-[0_2px_0_0_rgba(180,83,9,0.35),0_12px_28px_-6px_rgba(245,158,11,0.55)] ring-1 ring-amber-200/50 transition-[transform,box-shadow,filter] duration-300 hover:-translate-y-0.5 hover:shadow-[0_2px_0_0_rgba(180,83,9,0.4),0_16px_36px_-6px_rgba(245,158,11,0.65)] hover:brightness-[1.02] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300 active:translate-y-0 active:shadow-[0_1px_0_0_rgba(180,83,9,0.45),0_8px_20px_-6px_rgba(245,158,11,0.45)] motion-reduce:hover:translate-y-0 motion-reduce:active:translate-y-0 sm:w-auto sm:min-w-[11rem] sm:px-7"
          >
            <span class="relative z-[1]">เข้าใช้งาน</span>
            <svg
              class="relative z-[1] h-4 w-4 shrink-0 opacity-90 transition-transform duration-300 group-hover/btn:translate-x-0.5 motion-reduce:transition-none"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                clip-rule="evenodd"
              />
            </svg>
            <span
              class="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 transition-opacity duration-300 group-hover/btn:opacity-100 motion-reduce:transition-none"
              aria-hidden="true"
            />
          </A>
        </div>
      </div>
    </section>
  );
}
