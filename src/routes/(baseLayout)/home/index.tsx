
import { createSignal, createEffect, createResource, For, Show } from 'solid-js';
import { action, useAction } from '@solidjs/router';
import BlogCard from '../../../components/BlogCard';
import SkeletonLoader from '../../../components/SkeletonLoader';
import Seo from '../../../components/SEO';
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

export const fetchPostsAction = action(async (formData: FormData) => {
  "use server";
  try {
    const response = await fetch('https://playground.chidahp.com/api/book-reviewer?limit=7', {
      headers: {
        'Accept': 'application/json',
        'Cache-Control': 'no-cache'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: ApiResponse = await response.json();

    if (data.success) {
      return { posts: data.data.posts, error: null };
    } else {
      throw new Error('เกิดข้อผิดพลาดในการโหลดข้อมูล');
    }
  } catch (err) {
    return { posts: [], error: 'ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้' };
  }
});

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
      .slice(0, 4);
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

const stripHtml = (html: string): string => {
  return html
    .replaceAll(/<[^>]*>/g, '')
    .replaceAll(/&[a-zA-Z0-9#]+;/g, '')
    .replaceAll('[&hellip;]', '')
    .trim();
};

export default function Home() {
  const fetchPosts = useAction(fetchPostsAction);
  const [posts, setPosts] = createSignal<Post[]>([]);
  const [isInitialLoading, setIsInitialLoading] = createSignal(true);
  const [latestBooks] = createResource(fetchLatestBooks);
  const [latestPodcasts] = createResource(fetchLatestPodcasts);

  createEffect(async () => {
    setIsInitialLoading(true);
    const formData = new FormData();
    const result = await fetchPosts(formData);
    setPosts(result.posts);
    setIsInitialLoading(false);
  });

  const structuredData = () => {
    const breadcrumbs = breadcrumbSchema([
      { name: "หน้าแรก", url: "https://www.chidahp.com" },
      { name: "บล็อกและบทความ", url: "https://www.chidahp.com/home" }
    ]);

    const collectionData = posts().length > 0 ? collectionPageSchema("บทความ", posts().map(post => ({
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

          {/* Header Section */}
          <div class="text-center mb-10 sm:mb-14 animate-fade-in">
            <span class="inline-block text-xs sm:text-sm font-semibold tracking-widest uppercase text-purple-600 mb-3">
              Chidahp Book Reviewer
            </span>
            <h1 class="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 px-2 leading-tight">
              บล็อกและบทความ X รีวิวหนังสือจากชาวชูโล่
            </h1>
            <p class="text-sm sm:text-base text-gray-500 max-w-xl mx-auto leading-relaxed px-4">
              รวมบทความ รีวิวหนังสือ เรื่องราวแรงบันดาลใจ และการเดินทางจากชาวชูโล่
            </p>
            <div class="mt-6 mx-auto w-16 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
          </div>

          {/* Featured Post */}
          <Show when={!isInitialLoading()} fallback={<SkeletonLoader />}>
            <Show when={posts().length > 0}>
              <a
                href={`https://playground.chidahp.com/category/chidahp-book-reviewer/${posts()[0].slug}`}
                class="group block bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200 mb-8 sm:mb-10"
              >
                <div class="grid grid-cols-1 md:grid-cols-2">
                  <div class="relative overflow-hidden">
                    <img
                      src={posts()[0].featuredImage?.node.sourceUrl || '/chidahp.webp'}
                      alt={posts()[0].featuredImage?.node.altText || posts()[0].title}
                      class="w-full h-56 md:h-full min-h-[280px] object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div class="absolute top-4 left-4">
                      <span class="bg-purple-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-md">
                        บทความล่าสุด
                      </span>
                    </div>
                  </div>
                  <div class="p-6 sm:p-8 flex flex-col justify-center">
                    <div class="flex flex-wrap items-center gap-2 mb-3">
                      <For each={posts()[0].categories.nodes}>
                        {(cat) => (
                          <span class="text-xs text-purple-600 font-medium bg-purple-50 px-2.5 py-1 rounded-full">
                            {cat.name}
                          </span>
                        )}
                      </For>
                    </div>
                    <h2 class="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3 group-hover:text-purple-700 transition-colors leading-snug">
                      {posts()[0].title}
                    </h2>
                    <p class="text-gray-600 text-sm md:text-base mb-5 line-clamp-3 leading-relaxed">
                      {stripHtml(posts()[0].excerpt)}
                    </p>
                    <div class="flex items-center gap-3">
                      <Show when={posts()[0].author.node.avatar}>
                        <img
                          src={posts()[0].author.node.avatar.url}
                          alt={posts()[0].author.node.name}
                          class="w-9 h-9 rounded-full object-cover"
                        />
                      </Show>
                      <div>
                        <p class="text-sm font-medium text-gray-900">{posts()[0].author.node.name}</p>
                        <time class="text-xs text-gray-500">
                          {new Date(posts()[0].date).toLocaleDateString('th-TH', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </time>
                      </div>
                    </div>
                  </div>
                </div>
              </a>

              {/* Blog Posts Grid (remaining posts) */}
              <Show when={posts().length > 1}>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  <For each={posts().slice(1)}>
                    {(post) => <BlogCard post={post} />}
                  </For>
                </div>
              </Show>
            </Show>
          </Show>

          {/* "ดูเพิ่มเติม" Button */}
          <div class="flex justify-center mt-12 sm:mt-16">
            <a
              href="https://playground.chidahp.com/category/chidahp-book-reviewer"
              target="_blank"
              rel="noopener noreferrer"
              class="group relative inline-flex items-center gap-3 bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3.5 px-8 sm:py-4 sm:px-10 rounded-full transition-all duration-300 transform hover:scale-105 hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
            >
              <svg class="w-5 h-5 flex-shrink-0 group-hover:rotate-6 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <span class="text-sm sm:text-base">อ่านบทความทั้งหมด</span>
              <svg class="w-4 h-4 flex-shrink-0 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>

          {/* Divider */}
          <div class="my-16 sm:my-20 border-t border-gray-100" />

          {/* Latest Books Section */}
          <Show when={latestBooks() && latestBooks()!.length > 0}>
            <section class="mb-16 sm:mb-20">
              <div class="flex items-end justify-between mb-8">
                <div>
                  <span class="text-xs font-semibold tracking-widest uppercase text-yellow-600 mb-1 block">
                    From Our Publisher
                  </span>
                  <h2 class="text-xl sm:text-2xl font-bold text-gray-900">
                    หนังสือจากสำนักพิมพ์ชี้ดาบ
                  </h2>
                </div>
                <a href="/books" class="text-sm font-medium text-purple-600 hover:text-purple-700 flex items-center gap-1 group shrink-0">
                  ดูทั้งหมด
                  <svg class="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
              <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
                <For each={latestBooks()}>
                  {(book: any) => (
                    <a
                      href={book.buylink || undefined}
                      target="_blank"
                      rel="noopener noreferrer"
                      class="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200 hover:-translate-y-1"
                    >
                      <div class="aspect-[3/4] overflow-hidden relative">
                        <img
                          src={book.image}
                          alt={book.title}
                          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div class="absolute top-2 left-2 flex flex-col gap-1">
                          <Show when={book.isNewRelease}>
                            <span class="bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
                              ใหม่
                            </span>
                          </Show>
                          <Show when={book.isBestSeller}>
                            <span class="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
                              ขายดี
                            </span>
                          </Show>
                        </div>
                      </div>
                      <div class="p-3 sm:p-4">
                        <h3 class="font-semibold text-sm truncate text-gray-900 group-hover:text-purple-700 transition-colors">
                          {book.title}
                        </h3>
                        <p class="text-xs text-gray-500 mt-1 truncate">{book.authors}</p>
                      </div>
                    </a>
                  )}
                </For>
              </div>
            </section>
          </Show>

          {/* Latest Podcast Section */}
          <Show when={latestPodcasts() && latestPodcasts()!.length > 0}>
            <section class="mb-16 sm:mb-20">
              <div class="flex items-end justify-between mb-8">
                <div>
                  <span class="text-xs font-semibold tracking-widest uppercase text-red-500 mb-1 block">
                    Chidahp Podcast
                  </span>
                  <h2 class="text-xl sm:text-2xl font-bold text-gray-900">
                    วิดีโอ & พอดแคสต์ล่าสุด
                  </h2>
                </div>
                <a href="/podcast" class="text-sm font-medium text-purple-600 hover:text-purple-700 flex items-center gap-1 group shrink-0">
                  ดูทั้งหมด
                  <svg class="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6">
                <For each={latestPodcasts()}>
                  {(video: any) => (
                    <a
                      href={`https://www.youtube.com/watch?v=${video.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      class="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200 hover:-translate-y-1"
                    >
                      <div class="relative aspect-video overflow-hidden">
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div class="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition">
                          <div class="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                            <svg class="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div class="p-4">
                        <h3 class="font-medium text-sm text-gray-900 line-clamp-2 leading-snug mb-2 group-hover:text-purple-700 transition-colors">
                          {video.title}
                        </h3>
                        <time class="text-xs text-gray-500">
                          {new Date(video.published).toLocaleDateString('th-TH', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </time>
                      </div>
                    </a>
                  )}
                </For>
              </div>
            </section>
          </Show>


        </div>
      </main>
    </>
  );
}
