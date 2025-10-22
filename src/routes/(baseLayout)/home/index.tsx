
import { createSignal, createEffect, For, Show } from 'solid-js';
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

// Server action for fetching posts
export const fetchPostsAction = action(async (formData: FormData) => {
  "use server";
  try {
    const cursor = formData.get('cursor') as string;
    const url = cursor
      ? `https://playground.chidahp.com/api/book-reviewer?limit=6&after=${cursor}`
      : 'https://playground.chidahp.com/api/book-reviewer?limit=6';

    const response = await fetch(url, {
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
      return {
        posts: data.data.posts,
        hasNextPage: data.data.pagination.hasNextPage,
        endCursor: data.data.pagination.endCursor,
        error: null
      };
    } else {
      throw new Error('เกิดข้อผิดพลาดในการโหลดข้อมูล');
    }
  } catch (err) {
    return {
      posts: [],
      hasNextPage: false,
      endCursor: null,
      error: 'ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้'
    };
  }
});

export default function Home() {
  const fetchPosts = useAction(fetchPostsAction);
  const [posts, setPosts] = createSignal<Post[]>([]);
  const [hasMore, setHasMore] = createSignal(false);
  const [endCursor, setEndCursor] = createSignal<string | null>(null);
  const [isLoading, setIsLoading] = createSignal(false);
  const [isInitialLoading, setIsInitialLoading] = createSignal(true);

  // Load initial posts
  createEffect(async () => {
    setIsInitialLoading(true);
    const formData = new FormData();
    const result = await fetchPosts(formData);
    setPosts(result.posts);
    setHasMore(result.hasNextPage);
    setEndCursor(result.endCursor);
    setIsInitialLoading(false);
  });

  // Load more posts (lazy loading)
  const loadMorePosts = async () => {
    if (!hasMore() || isLoading()) return;

    setIsLoading(true);
    const currentCursor = endCursor();

    const formData = new FormData();
    formData.append('cursor', currentCursor || '');
    const result = await fetchPosts(formData);

    // Append new posts to existing ones
    setPosts(prev => [...prev, ...result.posts]);
    setHasMore(result.hasNextPage);
    setEndCursor(result.endCursor);
    setIsLoading(false);
  };

  // Create structured data for this page
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
      {/* AMP Ad Section */}
      <div class="mb-8">
        {`
        <amp-ad width="100vw" height="320"
              type="adsense"
              data-ad-client="ca-pub-8360416910031647"
              data-ad-slot="6891985672"
              data-auto-format="mcrspv"
              data-full-width="">
          <div overflow=""></div>
        </amp-ad>`}
      </div>
      <main class="container mx-auto px-4 py-8">
        <div class="max-w-6xl mx-auto">
          {/* Header Section */}
          <div class="text-center mb-12">
            <h1 class="text-2xl sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-12 px-4">
              บล็อกและบทความ X รีวิวหนังสือจากชาวชูโล่
            </h1>


          {/* Blog Posts Grid */}
          <Show when={!isInitialLoading()} fallback={<SkeletonLoader />}>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <For each={posts()}>
                {(post) => (
                  <BlogCard post={post} />
                )}
              </For>
            </div>
          </Show>

           {/* Chidahp Book Reviewer Button */}
           <div class="flex justify-center mb-8 mt-16">
             <div class="relative group">
               {/* Background Glow Effect */}
               <div class="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 rounded-3xl blur opacity-30 group-hover:opacity-60 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
               
               {/* Main Button */}
               <a 
                 href="https://playground.chidahp.com/category/chidahp-book-reviewer"
                 target="_blank"
                 rel="noopener noreferrer"
                 class="relative inline-flex items-center justify-center bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 hover:from-purple-500 hover:via-pink-500 hover:to-purple-500 text-white font-bold py-5 px-10 rounded-3xl transition-all duration-500 transform hover:scale-110 hover:-translate-y-1 shadow-2xl hover:shadow-purple-500/25 border-2 border-white/20 backdrop-blur-sm"
               >
                 {/* Animated Background Pattern */}
                 <div class="absolute inset-0 rounded-3xl bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                 
                 {/* Content */}
                 <div class="relative flex items-center space-x-3">
                   {/* Book Icon with Animation */}
                   <div class="relative">
                     <svg class="w-6 h-6 group-hover:rotate-12 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                     </svg>
                     {/* Sparkle Effect */}
                     <div class="absolute -top-1 -right-1 w-2 h-2 bg-yellow-300 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity duration-500"></div>
                   </div>
                   
                   {/* Text with Gradient */}
                   <span class="text-xl bg-gradient-to-r from-white to-yellow-100 bg-clip-text text-transparent font-extrabold tracking-wide">
                     ดูเพิ่มเติม
                   </span>
                   
                   {/* Arrow Icon with Bounce */}
                   <div class="relative">
                     <svg class="w-5 h-5 group-hover:translate-x-2 group-hover:scale-110 transition-all duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                     </svg>
                     {/* Trail Effect */}
                     <div class="absolute inset-0 w-5 h-5 opacity-0 group-hover:opacity-50 group-hover:translate-x-3 transition-all duration-500">
                       <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                       </svg>
                     </div>
                   </div>
                 </div>
                 
                 {/* Shimmer Effect */}
                 <div class="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
               </a>
             </div>
           </div>
        </div>
      </div>
    </main>
    </>
  );
}
