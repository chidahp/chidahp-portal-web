// index.tsx หรือ root entry point สำหรับ SolidStart app

import { createHandler, StartServer } from "@solidjs/start/server";
import Seo from "~/components/SEO";
import { organizationSchema, websiteSchema } from "~/utils/structuredData";

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
          
          {/* Preconnect to external domains for performance */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Thai:wght@100;200;300;400;500;600;700&family=Noto+Sans+Thai:wght@100..900&display=swap"
          />
          <link rel="preconnect" href="https://www.googletagmanager.com" />
          <link rel="preconnect" href="https://pagead2.googlesyndication.com" />
          <link rel="preconnect" href="https://www.youtube.com" />
          <link rel="preconnect" href="https://playground.chidahp.com" crossorigin />
          <link rel="preconnect" href="https://chidahp-book.playground-chidahp.workers.dev" crossorigin />
          <link rel="preconnect" href="https://chidahp-podcast.playground-chidahp.workers.dev" crossorigin />
          
          {/* SEO Component */}
          <Seo 
            structuredData={[organizationSchema, websiteSchema]}
          />
          
          <script>
            {`(function () {
              var run = function () {
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

              if ("requestIdleCallback" in window) {
                window.requestIdleCallback(run, { timeout: 2500 });
              } else {
                window.setTimeout(run, 1200);
              }
            })();`}
          </script>
          
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
