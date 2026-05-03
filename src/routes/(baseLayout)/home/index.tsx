import { createResource, createSignal, onMount } from "solid-js";
import Seo from '../../../components/SEO';
import LatestBookSection from '../../../components/home/LatestBookSection';
import LatestPodcastSection from '../../../components/home/LatestPodcastSection';
import HomeBlogSection, { type Post } from "../../../components/home/HomeBlogSection";
import { breadcrumbSchema, collectionPageSchema } from '../../../utils/structuredData';
// Previously these two sections were `lazy()`, which caused their entire
// area on the page to stay blank while the JS chunk downloaded — and the
// Suspense fallback flashed in/out. Each section already shows its own
// in-place skeleton via the `isLoading` prop, so eager-importing them is
// strictly better for perceived speed on the most-visited route.

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
  const [shouldLoadDeferred, setShouldLoadDeferred] = createSignal(false);
  const [postsResource] = createResource(shouldLoadDeferred, (ready) => (ready ? fetchPosts() : []));
  // Always skip SSR for the book fetch — `chidahp-book.playground-chidahp.workers.dev`
  // can cold-start in seconds, and we don't want the HTML response held
  // hostage by it. Books load client-side as soon as the document is
  // interactive, which is fast because the data is small.
  const [booksReady, setBooksReady] = createSignal(false);
  const [latestBooks] = createResource(booksReady, (ready) =>
    ready ? fetchLatestBooks() : Promise.resolve([])
  );
  const [latestPodcasts] = createResource(shouldLoadDeferred, (ready) =>
    ready ? fetchLatestPodcasts() : []
  );

  onMount(() => {
    // Books are first paint content — kick off immediately, but on the
    // client only so we don't block SSR.
    setBooksReady(true);

    const activateDeferred = () => setShouldLoadDeferred(true);
    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(activateDeferred, { timeout: 1200 });
      return;
    }
    setTimeout(activateDeferred, 300);
  });

  const posts = () => postsResource() ?? [];
  // "Loading" means: we don't have a successful response yet. This covers
  // every pre-data state (unresolved during SSR + before client activation,
  // pending while fetching, refreshing on subsequent loads). It also
  // ensures the SSR'd HTML contains the skeleton, so the user sees the
  // skeleton instantly on first paint instead of an empty area.
  const isInitialLoading = () =>
    postsResource.state !== 'ready' && postsResource.state !== 'errored';
  const isBooksLoading = () =>
    latestBooks.state !== 'ready' && latestBooks.state !== 'errored';
  const isPodcastsLoading = () =>
    latestPodcasts.state !== 'ready' && latestPodcasts.state !== 'errored';

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
          <LatestBookSection books={latestBooks()} isLoading={isBooksLoading()} />
          <LatestPodcastSection
            videos={latestPodcasts()}
            isLoading={isPodcastsLoading()}
          />
          <HomeBlogSection posts={posts()} isInitialLoading={isInitialLoading()} />
        </div>
      </main>
    </>
  );
}
