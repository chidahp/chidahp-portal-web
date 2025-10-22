// File: src/routes/robots.txt.ts
import type { APIEvent } from "@solidjs/start/server";

export async function GET(_event: APIEvent) {
  const robotsTxt = `User-agent: *
Allow: /

# Sitemap
Sitemap: https://www.chidahp.com/sitemap.xml

# Crawl-delay
Crawl-delay: 1

# Disallow admin or private areas (if any)
# Disallow: /admin/
# Disallow: /private/

# Allow all search engines
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Slurp
Allow: /`;

  return new Response(robotsTxt, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400", // 24 hours cache
    },
  });
}
