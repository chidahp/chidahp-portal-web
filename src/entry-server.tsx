// index.tsx หรือ root entry point สำหรับ SolidStart app

import { createHandler, StartServer } from "@solidjs/start/server";
import Seo from "~/components/SEO";
import { organizationSchema, websiteSchema } from "~/utils/structuredData";

const isProd = import.meta.env.PROD;

export default createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => (
      <html lang="th">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#7c3aed" />
          {/* Performance & Security Headers */}
          <meta name="referrer" content="strict-origin-when-cross-origin" />

          {/* System-font fallback while web fonts load — prevents FOIT and
              keeps first paint readable in both dev and prod. */}
          <style>
            {"body{font-family:'IBM Plex Sans Thai','Noto Sans Thai',system-ui,Segoe UI,sans-serif}"}
          </style>
          {isProd ? (
            <>
              <link rel="preconnect" href="https://fonts.googleapis.com" />
              <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
              {/* Non-render-blocking Google Fonts using the `media="print"`
                  trick. The `preload` primes the cache; the stylesheet is
                  initially `media="print"` (so it doesn't block render),
                  then a tiny inline script flips it to `all` once loaded.
                  Slimmed font weights — only those actually used in the
                  UI: IBM Plex Sans Thai 300/400/500/600/700, Noto Sans
                  Thai 400/500/700/800. */}
              <link
                rel="preload"
                as="style"
                href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Thai:wght@300;400;500;600;700&family=Noto+Sans+Thai:wght@400;500;700;800&display=swap"
              />
              <link
                id="google-fonts"
                rel="stylesheet"
                href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Thai:wght@300;400;500;600;700&family=Noto+Sans+Thai:wght@400;500;700;800&display=swap"
                media="print"
              />
              <script>
                {`(function(){var l=document.getElementById('google-fonts');if(l){l.addEventListener('load',function(){l.media='all';},{once:true});}})();`}
              </script>
              <noscript>
                <link
                  rel="stylesheet"
                  href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Thai:wght@300;400;500;600;700&family=Noto+Sans+Thai:wght@400;500;700;800&display=swap"
                />
              </noscript>
              <link rel="preconnect" href="https://www.googletagmanager.com" />
              <link rel="preconnect" href="https://pagead2.googlesyndication.com" />
            </>
          ) : null}
          <link rel="preconnect" href="https://www.youtube.com" />
          <link rel="preconnect" href="https://playground.chidahp.com" crossorigin="anonymous" />
          <link rel="preconnect" href="https://chidahp-book.playground-chidahp.workers.dev" crossorigin="anonymous" />
          <link rel="preconnect" href="https://chidahp-podcast.playground-chidahp.workers.dev" crossorigin="anonymous" />
          {/* Preconnect (not preload) — the actual request URL includes a
              query string set at runtime by BookfeedWaitlistHero, so a
              `<link rel="preload">` with the bare api.js URL would not be
              reused and would just waste bandwidth on non-home pages. The
              preconnect still saves the DNS + TLS roundtrip (~150–400ms on
              cold cache). */}
          <link rel="preconnect" href="https://challenges.cloudflare.com" crossorigin="anonymous" />

          {/* SEO Component */}
          <Seo structuredData={[organizationSchema, websiteSchema]} />

          {isProd ? (
            <script>
              {`(function () {
              // Defer GA + AdSense until either: (a) the user interacts
              // with the page (scroll / pointer / keystroke), or (b) the
              // browser is genuinely idle. AdSense in particular runs a
              // long task during init that causes visible jank on first
              // load. Waiting for first interaction means the long task
              // never competes with the initial render.
              var fired = false;
              var run = function () {
                if (fired) return;
                fired = true;
                cleanup();

                var ga = document.createElement("script");
                ga.async = true;
                ga.src = "https://www.googletagmanager.com/gtag/js?id=G-K5QP91K4LT";
                document.head.appendChild(ga);

                window.dataLayer = window.dataLayer || [];
                window.gtag = function () { window.dataLayer.push(arguments); };
                window.gtag("js", new Date());
                window.gtag("config", "G-K5QP91K4LT");

                var ads = document.createElement("script");
                ads.async = true;
                ads.crossOrigin = "anonymous";
                ads.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8360416910031647";
                document.head.appendChild(ads);
              };

              var events = ["scroll", "pointerdown", "keydown", "touchstart"];
              var cleanup = function () {
                events.forEach(function (ev) {
                  window.removeEventListener(ev, run, { passive: true });
                });
              };
              events.forEach(function (ev) {
                window.addEventListener(ev, run, { passive: true, once: true });
              });

              // Backstop: still fire eventually if the user is idle, but
              // give the page a long head start (8s) so it never competes
              // with first paint, hydration, or interaction.
              if ("requestIdleCallback" in window) {
                window.requestIdleCallback(run, { timeout: 8000 });
              } else {
                window.setTimeout(run, 5000);
              }
            })();`}
            </script>
          ) : null}
          
          {/* Favicon and Icons */}
          <link rel="icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" href="/chidahp.webp" />
          
          {assets}
        </head>
        <body data-theme="light">
          <div id="app">{children}</div>
          {scripts}
        </body>
      </html>
    )}
  />
));
