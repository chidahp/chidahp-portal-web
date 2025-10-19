import { Show } from 'solid-js';

interface LazyLoaderProps {
  hasMore: boolean;
  isLoading: boolean;
  onLoadMore: () => void;
}

export default function LazyLoader(props: LazyLoaderProps) {
  const { hasMore, isLoading, onLoadMore } = props;
  
  // Debug log
  console.log('LazyLoader props:', { hasMore, isLoading });

  return (
    <div class="flex flex-col items-center justify-center py-8">
      {/* Loading Indicator */}
      
      <Show when={isLoading}>
        <div class="flex flex-col items-center space-y-4">
          <div class="relative">
            <div class="animate-spin rounded-full h-12 w-12 border-4 border-gray-200"></div>
            <div class="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent absolute top-0 left-0"></div>
          </div>
          <div class="text-center">
            <h3 class="text-lg font-medium text-gray-900 mb-1">กำลังโหลดบทความเพิ่มเติม</h3>
            <p class="text-sm text-gray-500">กรุณารอสักครู่...</p>
          </div>
        </div>
      </Show>

      
    </div>
  );
}
