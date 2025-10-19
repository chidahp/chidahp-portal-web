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
          
          {/* Performance & Security Headers */}
          <meta name="referrer" content="strict-origin-when-cross-origin" />
          
          {/* Preconnect to external domains for performance */}
          <link rel="preconnect" href="https://www.googletagmanager.com" />
          <link rel="preconnect" href="https://pagead2.googlesyndication.com" />
          <link rel="preconnect" href="https://www.youtube.com" />
          <link rel="dns-prefetch" href="https://playground.chidahp.com" />
          <link rel="dns-prefetch" href="https://chidahp-book.playground-chidahp.workers.dev" />
          <link rel="dns-prefetch" href="https://chidahp-podcast.playground-chidahp.workers.dev" />
          
          {/* Google AdSense */}
          <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8360416910031647" crossorigin="anonymous"></script>
          
          {/* SEO Component */}
          <Seo 
            structuredData={[organizationSchema, websiteSchema]}
          />
          
          {/* Google Analytics */}
          <script async src="https://www.googletagmanager.com/gtag/js?id=G-K5QP91K4LT"></script>
          <script>
            {`window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-K5QP91K4LT');`}
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
