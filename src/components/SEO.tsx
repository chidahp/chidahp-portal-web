import { createMemo } from "solid-js";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: "website" | "article" | "book" | "video";
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
  structuredData?: any;
}

export default function SEO(props: SEOProps) {
  const seoData = createMemo(() => {
    const baseUrl = "https://www.chidahp.com";
    const defaultImage = "/chidahp.webp";
    const defaultAuthor = "ชี้ดาบ (ธีรนัย โสตถิปิณฑะ)";
    const defaultPublisher = "สำนักพิมพ์ชี้ดาบ";

    return {
      title: props.title || "ชี้ดาบ | สำนักพิมพ์ที่ว่าด้วยการเติบโต",
      description: props.description || "ชี้ดาบ สำนักพิมพ์ที่ว่าด้วยการเติบโต ที่ถ่ายทอดประสบการณ์จริงผ่านหนังสือ เปลี่ยนความเศร้า ความล้มเหลว และการเดินทาง ให้กลายเป็นความเข้าใจชีวิต",
      keywords: props.keywords || "สำนักพิมพ์ชี้ดาบ, หนังสือเดินทาง, แรงบันดาลใจ, พัฒนาตัวเอง, ชีวิตต่างประเทศ, ชี้ดาบ, เจม, Route13, อินเดีย, ญี่ปุ่น, อเมริกา, southdakota18+",
      image: props.image || defaultImage,
      url: props.url || baseUrl,
      type: props.type || "website",
      author: props.author || defaultAuthor,
      publisher: defaultPublisher,
      publishedTime: props.publishedTime,
      modifiedTime: props.modifiedTime,
      section: props.section,
      tags: props.tags || [],
      structuredData: props.structuredData
    };
  });

  return (
    <>
      {/* Basic Meta Tags */}
      <title>{seoData().title}</title>
      <meta name="description" content={seoData().description} />
      <meta name="keywords" content={seoData().keywords} />
      <meta name="author" content={seoData().author} />
      <meta name="publisher" content={seoData().publisher} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={seoData().url} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={seoData().type} />
      <meta property="og:url" content={seoData().url} />
      <meta property="og:title" content={seoData().title} />
      <meta property="og:description" content={seoData().description} />
      <meta property="og:image" content={seoData().image} />
      <meta property="og:site_name" content="ชี้ดาบ" />
      <meta property="og:locale" content="th_TH" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={seoData().url} />
      <meta name="twitter:title" content={seoData().title} />
      <meta name="twitter:description" content={seoData().description} />
      <meta name="twitter:image" content={seoData().image} />
      <meta name="twitter:creator" content="@chidahp" />
      <meta name="twitter:site" content="@chidahp" />
      
      {/* Additional Meta Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <meta name="bingbot" content="index, follow" />
      
      {/* Article specific meta tags */}
      {seoData().type === "article" && (
        <>
          {seoData().publishedTime && (
            <meta property="article:published_time" content={seoData().publishedTime} />
          )}
          {seoData().modifiedTime && (
            <meta property="article:modified_time" content={seoData().modifiedTime} />
          )}
          <meta property="article:author" content={seoData().author} />
          <meta property="article:publisher" content={seoData().publisher} />
          {seoData().section && (
            <meta property="article:section" content={seoData().section} />
          )}
          {seoData().tags.map(tag => (
            <meta property="article:tag" content={tag} />
          ))}
        </>
      )}
      
      {/* Structured Data (JSON-LD) */}
      {seoData().structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(seoData().structuredData)}
        </script>
      )}
    </>
  );
}
