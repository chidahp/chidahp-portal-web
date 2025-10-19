import { For } from 'solid-js';

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

interface BlogCardProps {
  post: Post;
}

export default function BlogCard(props: BlogCardProps) {
  const { post } = props;

  // Function to strip HTML tags and entities from text
  const stripHtml = (html: string): string => {
    return html
      .replaceAll(/<[^>]*>/g, '') // Remove HTML tags
      .replaceAll(/&[a-zA-Z0-9#]+;/g, '') // Remove HTML entities like &hellip;
      .replaceAll('[&hellip;]', '') // Remove [&hellip;] specifically
      .trim();
  };

  return (
    <a 
      href={`https://playground.chidahp.com/category/chidahp-book-reviewer/${post.slug}`}
      class="block group bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200 hover:-translate-y-1"
    >
      {/* Clean Image */}
      <div class="relative overflow-hidden">
        {post.featuredImage ? (
          <img 
            src={post.featuredImage.node.sourceUrl} 
            alt={post.featuredImage.node.altText || post.title}
            class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <img 
            src="/chidahp.webp" 
            alt={post.title}
            class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
          />
        )}
        
        {/* Minimal Category Badge */}
        <div class="absolute top-3 left-3">
          <For each={post.categories.nodes}>
            {(category) => (
              <span class="inline-block bg-white/95 backdrop-blur-sm text-gray-700 text-xs px-3 py-1 rounded-full font-medium shadow-sm">
                {category.name}
              </span>
            )}
          </For>
        </div>
      </div>
      
      {/* Clean Content */}
      <div class="p-6">
        {/* Clean Title */}
        <h2 class="text-lg font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-gray-700 transition-colors duration-200 leading-snug">
          {post.title}
        </h2>
        
        {/* Clean Excerpt */}
        <p class="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
          {stripHtml(post.excerpt)}
        </p>
        
        {/* Clean Author & Date */}
        <div class="flex items-center justify-between pt-3 border-t border-gray-50">
          <div class="flex items-center space-x-3">
            <div class="relative flex-shrink-0">
              {post.author.node.avatar ? (
                <img 
                  src={post.author.node.avatar.url} 
                  alt={post.author.node.name}
                  class="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <div class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                  <span class="text-gray-600 text-xs font-medium">
                    {post.author.node.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
            </div>
            <div>
              <p class="text-sm font-medium text-gray-900">{post.author.node.name}</p>
            </div>
          </div>
          
          <div class="text-right">
            <time class="text-xs text-gray-500">
              {new Date(post.date).toLocaleDateString('th-TH', {
                month: 'short',
                day: 'numeric'
              })}
            </time>
          </div>
        </div>
      </div>
    </a>
  );
}
