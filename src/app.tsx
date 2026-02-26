import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { ErrorBoundary, Suspense } from "solid-js";
import "./app.css";

function ErrorFallback(props: { error: Error; reset: () => void }) {
  const isDev = import.meta.env.DEV;
  return (
    <div class="min-h-screen bg-gradient-to-br from-red-50 via-amber-50 to-orange-50 flex items-center justify-center px-4">
      <div class="max-w-2xl w-full bg-white/90 rounded-2xl shadow-xl p-8 border border-red-100">
        <div class="text-center mb-6">
          <span class="text-6xl" aria-hidden="true">⚠️</span>
          <h1 class="text-2xl font-bold text-red-800 mt-4">เกิดข้อผิดพลาด</h1>
          <p class="text-red-700 mt-2">Something went wrong</p>
        </div>
        <div class="bg-red-50 rounded-xl p-4 text-left border border-red-100">
          <p class="font-semibold text-red-900 mb-1">ข้อความ:</p>
          <p class="text-red-800 font-mono text-sm break-words">{props.error.message}</p>
          {isDev && props.error.stack && (
            <details class="mt-4">
              <summary class="cursor-pointer text-sm font-medium text-red-700 hover:text-red-900">
                แสดง stack trace (โหมดพัฒนา)
              </summary>
              <pre class="mt-2 p-3 bg-red-100 rounded text-xs text-red-900 overflow-auto max-h-48 whitespace-pre-wrap break-all font-mono">
                {props.error.stack}
              </pre>
            </details>
          )}
        </div>
        <div class="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
          <button
            type="button"
            onClick={props.reset}
            class="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-xl transition-colors"
          >
            ลองอีกครั้ง
          </button>
          <a
            href="/home"
            class="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-xl transition-colors text-center"
          >
            กลับหน้าแรก
          </a>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router
      root={props => (
        <ErrorBoundary
          fallback={(err, reset) => <ErrorFallback error={err} reset={reset} />}
        >
          <Suspense>{props.children}</Suspense>
        </ErrorBoundary>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
