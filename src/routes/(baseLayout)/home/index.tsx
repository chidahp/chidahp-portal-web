import { createResource } from 'solid-js';
import Seo from '../../../components/SEO';
import HomeBlogSection, { type Post } from '../../../components/home/HomeBlogSection';
import LatestBookSection from '../../../components/home/LatestBookSection';
import LatestPodcastSection from '../../../components/home/LatestPodcastSection';
import { breadcrumbSchema, collectionPageSchema } from '../../../utils/structuredData';

/** API response from playground.chidahp.com/api/v1/categories/chulo-reviewer/posts */
interface ChuloReviewerApiPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  featured_image: null | { url: string; alt: string };
  published_at: string;
  view_count: number;
  reading_time: number;
  url: string;
  author: { name: string; slug: string; avatar_url: string | null };
}

interface ChuloReviewerApiResponse {
  category: { slug: string; name: string };
  posts: ChuloReviewerApiPost[];
  pagination: { page: number; limit: number; total: number; hasMore: boolean };
}

function mapChuloReviewerPostToPost(apiPost: ChuloReviewerApiPost, category: { name: string; slug: string }): Post {
  return {
    id: apiPost.id,
    title: apiPost.title,
    slug: apiPost.slug,
    excerpt: apiPost.excerpt,
    date: apiPost.published_at,
    featuredImage: apiPost.featured_image
      ? { node: { sourceUrl: apiPost.featured_image.url, altText: apiPost.featured_image.alt } }
      : undefined,
    author: {
      node: {
        name: apiPost.author.name,
        slug: apiPost.author.slug,
        ...(apiPost.author.avatar_url && { avatar: { url: apiPost.author.avatar_url } })
      }
    },
    categories: { nodes: [category] }
  };
}

const CHULO_REVIEWER_API = 'https://playground.chidahp.com/api/v1/categories/chulo-reviewer/posts';

async function fetchPosts(): Promise<Post[]> {
  try {
    const apiKey = import.meta.env.VITE_PLAYGROUND_API_KEY;
    const headers: HeadersInit = { Accept: 'application/json' };
    if (apiKey) headers['Authorization'] = `Bearer ${apiKey}`;

    const response = await fetch(`${CHULO_REVIEWER_API}?page=1`, { headers });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data: ChuloReviewerApiResponse = await response.json();

    const category = data.category ?? { name: 'Chulo Reviewer', slug: 'chulo-reviewer' };
    return (data.posts ?? []).map((p) => mapChuloReviewerPostToPost(p, category));
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
