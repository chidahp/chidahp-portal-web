import { createResource } from 'solid-js';
import Seo from '../../../components/SEO';
import HomeBlogSection from '../../../components/home/HomeBlogSection';
import LatestBookSection from '../../../components/home/LatestBookSection';
import LatestPodcastSection from '../../../components/home/LatestPodcastSection';
import { breadcrumbSchema, collectionPageSchema } from '../../../utils/structuredData';

interface Author {
  name: string;
  slug: string;
  avatar: {
    url: string;
  };
  description?: string;
}

interface Category {
  name: string;
  slug: string;
  parentId?: string;
}

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  featuredImage?: {
    node: {
      sourceUrl: string;
      altText: string;
    };
  };
  author: {
    node: Author;
  };
  categories: {
    nodes: Category[];
  };
}

interface ApiResponse {
  success: boolean;
  data: {
    posts: Post[];
    pagination: {
      hasNextPage: boolean;
      endCursor: string;
    };
    meta: {
      category: string;
      total: number;
      limit: number;
    };
  };
}

async function fetchPosts(): Promise<Post[]> {
  try {
    const response = await fetch('https://playground.chidahp.com/api/book-reviewer?limit=7', {
      headers: { Accept: 'application/json' }
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data: ApiResponse = await response.json();
    return data.success ? data.data.posts : [];
  } catch {
    return [];
  }
}

async function fetchLatestBooks() {
  try {
    const res = await fetch('https://chidahp-book.playground-chidahp.workers.dev/', {
      headers: { Accept: 'application/json' }
    });
    if (!res.ok) return [];
    const books = await res.json();
    return books
      .sort((a: any, b: any) => {
        if (a.pinned && !b.pinned) return -1;
        if (!a.pinned && b.pinned) return 1;
        if (a.isNewRelease && !b.isNewRelease) return -1;
        if (!a.isNewRelease && b.isNewRelease) return 1;
        return 0;
      })
      .slice(0, 16);
  } catch {
    return [];
  }
}

async function fetchLatestPodcasts() {
  try {
    const res = await fetch(
      'https://chidahp-podcast.playground-chidahp.workers.dev/api/videos?playlist=PLD51zfrpLJx4aoQGo7UniDRn1olnbiK9o&page=1&limit=3'
    );
    if (!res.ok) return [];
    const data = await res.json();
    return data.data || [];
  } catch {
    return [];
  }
}

export default function Home() {
  const [postsResource] = createResource(fetchPosts);
  const [latestBooks] = createResource(fetchLatestBooks);
  const [latestPodcasts] = createResource(fetchLatestPodcasts);

  const posts = () => postsResource() ?? [];
  const isInitialLoading = () => postsResource.state === 'pending';

  const structuredData = () => {
    const breadcrumbs = breadcrumbSchema([
      { name: "หน้าแรก", url: "https://www.chidahp.com/home" },
      { name: "บล็อกและบทความ", url: "https://www.chidahp.com/home" }
    ]);
    const list = posts();
    const collectionData = list.length > 0 ? collectionPageSchema("บทความ", list.map(post => ({
      title: post.title,
      url: `https://playground.chidahp.com/${post.slug}`
    }))) : null;
    return [breadcrumbs, collectionData].filter(Boolean);
  };

  return (
    <>
      <Seo
        title="บล็อกและบทความ | ชี้ดาบ - รีวิวหนังสือและแรงบันดาลใจ"
        description="อ่านบทความและรีวิวหนังสือจากชาวชูโล่ เรื่องราวการเดินทาง แรงบันดาลใจ และการเติบโตในชีวิต"
        keywords="รีวิวหนังสือ, บทความ, แรงบันดาลใจ, การเดินทาง, ชี้ดาบ, ชาวชูโล่, พัฒนาตัวเอง"
        url="https://www.chidahp.com/home"
        type="website"
        structuredData={structuredData()}
      />
      <main class="container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div class="max-w-6xl mx-auto">
          <LatestBookSection books={latestBooks()} />
          <LatestPodcastSection videos={latestPodcasts()} />
          <HomeBlogSection posts={posts()} isInitialLoading={isInitialLoading()} />
        </div>
      </main>
    </>
  );
}
