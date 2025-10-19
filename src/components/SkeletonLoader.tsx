export default function SkeletonLoader() {
  return (
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: 6 }).map((_, index) => (
        <div class="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
          {/* Image skeleton */}
          <div class="h-48 bg-gray-200"></div>
          
          {/* Content skeleton */}
          <div class="p-6">
            {/* Title skeleton */}
            <div class="h-6 bg-gray-200 rounded mb-3"></div>
            <div class="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
            
            {/* Excerpt skeleton */}
            <div class="space-y-2 mb-4">
              <div class="h-4 bg-gray-200 rounded"></div>
              <div class="h-4 bg-gray-200 rounded"></div>
              <div class="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
            
            {/* Author and date skeleton */}
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-3">
                <div class="w-8 h-8 bg-gray-200 rounded-full"></div>
                <div class="h-4 bg-gray-200 rounded w-20"></div>
              </div>
              <div class="h-4 bg-gray-200 rounded w-16"></div>
            </div>
            
            {/* Category skeleton */}
            <div class="mt-4">
              <div class="h-6 bg-gray-200 rounded w-24"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
