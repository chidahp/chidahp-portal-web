// File: src/routes/sitemap.xml.ts
import { APIEvent } from "@solidjs/start/server";

export async function GET({ request }: APIEvent) {
  const baseUrl = "https://www.chidahp.com";
  const currentDate = new Date().toISOString();

  const pages = [
    {
      url: `${baseUrl}/`,
      priority: "1.0",
      changefreq: "weekly",
    },
    {
      url: `${baseUrl}/home`,
      priority: "0.9",
      changefreq: "daily",
    },
    {
      url: `${baseUrl}/books`,
      priority: "0.9",
      changefreq: "weekly",
    },
    {
      url: `${baseUrl}/podcast`,
      priority: "0.8",
      changefreq: "daily",
    },
    {
      url: `${baseUrl}/timeline`,
      priority: "0.7",
      changefreq: "monthly",
    },
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (page) => `  <url>
    <loc>${page.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join("\n")}
  <url>
    <loc>https://playground.chidahp.com/sitemap.xml</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>
</urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
      "X-Robots-Tag": "index, follow",
    },
  });
}
