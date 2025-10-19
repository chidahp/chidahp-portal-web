
import { createSignal, createEffect, onMount } from 'solid-js';

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

export default function Home() {
  const [posts, setPosts] = createSignal<Post[]>([]);
  const [loading, setLoading] = createSignal(true);
  const [loadingMore, setLoadingMore] = createSignal(false);
  const [hasNextPage, setHasNextPage] = createSignal(false);
  const [endCursor, setEndCursor] = createSignal<string | null>(null);
  const [error, setError] = createSignal<string | null>(null);

  const fetchPosts = async (cursor?: string, isLoadMore = false) => {
    try {
      if (isLoadMore) {
        setLoadingMore(true);
      } else {
        setLoading(true);
      }
      
      const url = cursor 
        ? `https://playground.chidahp.com/api/book-reviewer?limit=10&after=${cursor}`
        : 'https://playground.chidahp.com/api/book-reviewer?limit=10';
      
      // Add timeout and abort controller for better performance
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
      
      const response = await fetch(url, {
        signal: controller.signal,
        headers: {
          'Accept': 'application/json',
          'Cache-Control': 'no-cache'
        }
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: ApiResponse = await response.json();
      
      if (data.success) {
        if (isLoadMore) {
          setPosts(prev => [...prev, ...data.data.posts]);
        } else {
          console.log(data.data.posts);
          setPosts(data.data.posts);
        }
        setHasNextPage(data.data.pagination.hasNextPage);
        setEndCursor(data.data.pagination.endCursor);
        setError(null);
      } else {
        setError('เกิดข้อผิดพลาดในการโหลดข้อมูล');
      }
    } catch (err) {
        setError('ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้');
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  onMount(() => {
    fetchPosts();
  });

  const handleLoadMore = () => {
    if (endCursor() && hasNextPage()) {
      fetchPosts(endCursor()!, true);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const stripHtml = (html: string) => {
    return html.replace(/<[^>]*>/g, '').replace(/&hellip;/g, '...');
  };

  // Loading Skeleton Component
  const LoadingSkeleton = () => (
    <div class="animate-pulse">
      {/* Featured Post Skeleton */}
      <div class="mb-12">
        <div class="bg-gray-300 rounded-lg p-8 h-64"></div>
      </div>
      
      {/* Blog Grid Skeleton */}
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} class="bg-white rounded-lg shadow-md overflow-hidden">
            <div class="h-48 bg-gray-300"></div>
            <div class="p-6">
              <div class="flex items-center mb-3">
                <div class="bg-gray-300 h-6 w-20 rounded"></div>
                <div class="bg-gray-300 h-4 w-16 ml-2 rounded"></div>
              </div>
              <div class="bg-gray-300 h-6 w-full mb-2 rounded"></div>
              <div class="bg-gray-300 h-6 w-3/4 mb-4 rounded"></div>
              <div class="bg-gray-300 h-4 w-full mb-2 rounded"></div>
              <div class="bg-gray-300 h-4 w-2/3 mb-4 rounded"></div>
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <div class="bg-gray-300 h-6 w-6 rounded-full mr-2"></div>
                  <div class="bg-gray-300 h-4 w-20 rounded"></div>
                </div>
                <div class="bg-gray-300 h-4 w-16 rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  if (loading()) {
    return (
      <main class="container mx-auto px-4 py-8">
        <div class="max-w-6xl mx-auto">
          {/* Header Section */}
          <div class="text-center mb-12">
            <h1 class="text-4xl font-bold text-gray-900 mb-4">
              บล็อกและบทความ X รีวิวหนังสือจากชาวชูโล่
            </h1>
          </div>
          <LoadingSkeleton />
        </div>
      </main>
    );
  }

  if (error()) {
    return (
      <main class="container mx-auto px-4 py-8">
        <div class="max-w-6xl mx-auto">
          <div class="text-center">
            <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error()}
            </div>
            <button 
              onClick={() => fetchPosts()} 
              class="bg-yellow-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-yellow-600 transition-colors"
            >
              ลองใหม่
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main class="container mx-auto px-4 py-8">
      <div class="max-w-6xl mx-auto">
        {/* Header Section */}
        <div class="text-center mb-12">
          <h1 class="text-4xl font-bold text-gray-900 mb-4">
            บล็อกและบทความ X รีวิวหนังสือจากชาวชูโล่
          </h1>
        </div>

        {/* Featured Post */}
        {posts().length > 0 && (
          <div class="mb-12">
            <div class="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg p-8 text-white">
              <div class="flex items-center mb-4">
                <span class="bg-white/20 px-3 py-1 rounded-full text-sm">
                  {posts()[0].categories.nodes[0]?.name || 'บทความ'}
                </span>
                <span class="ml-4 text-sm opacity-90">
                  {formatDate(posts()[0].date)}
                </span>
              </div>
              <h2 class="text-3xl font-bold mb-4">
                {posts()[0].title}
              </h2>
              <p class="text-lg opacity-90 mb-6">
                {stripHtml(posts()[0].excerpt)}
              </p>
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <img 
                    src={posts()[0].author.node.avatar.url} 
                    alt={posts()[0].author.node.name}
                    class="w-8 h-8 rounded-full mr-2"
                    loading="lazy"
                    decoding="async"
                  />
                  <span class="text-sm opacity-80">โดย {posts()[0].author.node.name}</span>
                </div>
                <button class="bg-white text-yellow-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  อ่านต่อ
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Blog Grid */}
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts().slice(1).map((post) => (
            <article class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              {post.featuredImage ? (
                <img 
                  src={post.featuredImage.node.sourceUrl} 
                  alt={post.featuredImage.node.altText || post.title}
                  class="w-full h-48 object-cover"
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                <div class="h-48 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                  <span class="text-gray-500 text-sm">ไม่มีรูปภาพ</span>
                </div>
              )}
              <div class="p-6">
                <div class="flex items-center mb-3">
                  <span class="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-medium">
                    {post.categories.nodes[0]?.name || 'บทความ'}
                  </span>
                  <span class="ml-2 text-gray-500 text-sm">
                    {formatDate(post.date)}
                  </span>
                </div>
                <h3 class="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                  {post.title}
                </h3>
                <p class="text-gray-600 mb-4 line-clamp-3">
                  {stripHtml(post.excerpt)}
                </p>
                <div class="flex items-center justify-between">
                  <div class="flex items-center text-sm text-gray-500">
                    <img 
                      src={post.author.node.avatar.url} 
                      alt={post.author.node.name}
                      class="w-6 h-6 rounded-full mr-2"
                      loading="lazy"
                      decoding="async"
                    />
                    <span>{post.author.node.name}</span>
                  </div>
                  <button class="text-yellow-600 hover:text-yellow-800 font-medium text-sm">
                    อ่านต่อ →
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Load More Button */}
        {hasNextPage() && (
          <div class="text-center mt-12">
            <button 
              onClick={handleLoadMore}
              disabled={loadingMore()}
              class="bg-yellow-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-yellow-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loadingMore() ? (
                <div class="flex items-center">
                  <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  กำลังโหลด...
                </div>
              ) : (
                'โหลดบทความเพิ่มเติม'
              )}
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
