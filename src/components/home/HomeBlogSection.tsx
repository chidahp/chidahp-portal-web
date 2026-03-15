import { For, Show } from 'solid-js';
import BlogCard from '../BlogCard';
import SkeletonLoader from '../SkeletonLoader';

interface Author {
  name: string;
  slug: string;
  avatar?: {
    url: string;
  };
  description?: string;
}

interface Category {
  name: string;
  slug: string;
  parentId?: string;
}

export interface Post {
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

const stripHtml = (html: string): string => {
  return html
    .replaceAll(/<[^>]*>/g, '')
    .replaceAll(/&[a-zA-Z0-9#]+;/g, '')
    .replaceAll('[&hellip;]', '')
    .trim();
};

interface HomeBlogSectionProps {
  posts: Post[];
  isInitialLoading: boolean;
}

export default function HomeBlogSection(props: HomeBlogSectionProps) {
  return (
    <>
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
      <Show when={!props.isInitialLoading} fallback={<SkeletonLoader />}>
        <Show when={props.posts.length > 0}>
          <a
            href={`https://playground.chidahp.com/category/chulo-reviewer/${props.posts[0].slug}`}
            class="group block bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200 mb-8 sm:mb-10"
          >
            <div class="grid grid-cols-1 md:grid-cols-2">
              <div class="relative overflow-hidden">
                <img
                  src={props.posts[0].featuredImage?.node.sourceUrl || '/chidahp.webp'}
                  alt={props.posts[0].featuredImage?.node.altText || props.posts[0].title}
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
                  <For each={props.posts[0].categories.nodes}>
                    {(cat) => (
                      <span class="text-xs text-purple-600 font-medium bg-purple-50 px-2.5 py-1 rounded-full">
                        {cat.name}
                      </span>
                    )}
                  </For>
                </div>
                <h2 class="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3 group-hover:text-purple-700 transition-colors leading-snug">
                  {props.posts[0].title}
                </h2>
                <p class="text-gray-600 text-sm md:text-base mb-5 line-clamp-3 leading-relaxed">
                  {stripHtml(props.posts[0].excerpt)}
                </p>
                <div class="flex items-center gap-3">
                  <Show when={props.posts[0].author.node.avatar?.url}>
                    <img
                      src={props.posts[0].author.node.avatar.url}
                      alt={props.posts[0].author.node.name}
                      class="w-9 h-9 rounded-full object-cover"
                    />
                  </Show>
                  <div>
                    <p class="text-sm font-medium text-gray-900">{props.posts[0].author.node.name}</p>
                    <time class="text-xs text-gray-500">
                      {new Date(props.posts[0].date).toLocaleDateString('th-TH', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </time>
                  </div>
                </div>
              </div>
            </div>
          </a>

          {/* Blog Posts Grid (remaining posts) */}
          <Show when={props.posts.length > 1}>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              <For each={props.posts.slice(1)}>
                {(post) => <BlogCard post={post} />}
              </For>
            </div>
          </Show>
        </Show>
      </Show>

      {/* "ดูเพิ่มเติม" Button */}
      <div class="flex justify-center mt-12 sm:mt-16">
        <a
          href="https://playground.chidahp.com/category/chulo-reviewer"
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
    </>
  );
}
