// Structured Data for SEO

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "ชี้ดาบ",
  "alternateName": "สำนักพิมพ์ชี้ดาบ",
  "url": "https://www.chidahp.com",
  "logo": "https://www.chidahp.com/chidahp.webp",
  "description": "สำนักพิมพ์ที่ว่าด้วยการเติบโต ที่ถ่ายทอดประสบการณ์จริงผ่านหนังสือ เปลี่ยนความเศร้า ความล้มเหลว และการเดินทาง ให้กลายเป็นความเข้าใจชีวิต",
  "founder": {
    "@type": "Person",
    "name": "ธีรนัย โสตถิปิณฑะ",
    "alternateName": "เจม"
  },
  "sameAs": [
    "https://www.youtube.com/@Chidahp",
    "https://www.facebook.com/chidahp",
    "https://www.instagram.com/chidahp"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer service",
    "availableLanguage": "Thai"
  }
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "ชี้ดาบ",
  "url": "https://www.chidahp.com",
  "description": "สำนักพิมพ์ที่ว่าด้วยการเติบโต ที่ถ่ายทอดประสบการณ์จริงผ่านหนังสือ",
  "publisher": {
    "@type": "Organization",
    "name": "ชี้ดาบ"
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://www.chidahp.com/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
};

export const breadcrumbSchema = (items: Array<{name: string, url: string}>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url
  }))
});

export const bookSchema = (book: any) => ({
  "@context": "https://schema.org",
  "@type": "Book",
  "name": book.title,
  "author": {
    "@type": "Person",
    "name": book.authors
  },
  "publisher": {
    "@type": "Organization",
    "name": "ชี้ดาบ"
  },
  "image": book.image,
  "description": book.description || `หนังสือ ${book.title} โดย ${book.authors}`,
  "isbn": book.isbn,
  "datePublished": book.publishedDate,
  "inLanguage": "th",
  "offers": book.buylink ? {
    "@type": "Offer",
    "url": book.buylink,
    "priceCurrency": "THB",
    "availability": "https://schema.org/InStock"
  } : undefined
});

export const videoSchema = (video: any) => ({
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": video.title,
  "description": `วิดีโอ ${video.title} จากช่อง Chidahp`,
  "thumbnailUrl": video.thumbnail,
  "uploadDate": video.published,
  "duration": "PT10M", // 10 minutes default
  "contentUrl": `https://www.youtube.com/watch?v=${video.id}`,
  "embedUrl": `https://www.youtube.com/embed/${video.id}`,
  "publisher": {
    "@type": "Organization",
    "name": "ชี้ดาบ",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.chidahp.com/chidahp.webp"
    }
  }
});

export const articleSchema = (article: any) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": article.title,
  "description": article.excerpt,
  "image": article.featuredImage?.node?.sourceUrl,
  "author": {
    "@type": "Person",
    "name": article.author?.node?.name
  },
  "publisher": {
    "@type": "Organization",
    "name": "ชี้ดาบ",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.chidahp.com/chidahp.webp"
    }
  },
  "datePublished": article.date,
  "dateModified": article.date,
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": `https://www.chidahp.com/blog/${article.slug}`
  }
});

export const collectionPageSchema = (pageType: string, items: any[]) => ({
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": `ชี้ดาบ - ${pageType}`,
  "description": `รวม${pageType}ทั้งหมดจากชี้ดาบ`,
  "url": `https://www.chidahp.com/${pageType.toLowerCase()}`,
  "mainEntity": {
    "@type": "ItemList",
    "numberOfItems": items.length,
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": pageType === "หนังสือ" ? "Book" : pageType === "วิดีโอ" ? "VideoObject" : "Article",
        "name": item.title,
        "url": item.url || item.buylink
      }
    }))
  }
});
