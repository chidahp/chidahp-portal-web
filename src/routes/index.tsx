import { useNavigate } from "@solidjs/router";
import { onMount } from "solid-js";

/**
 * In-app visit to `/` (middleware 301 only applies to full document requests).
 * Do not use `<Navigate>` here — it runs `navigate()` on every render and can
 * deadlock the router / hydration.
 */
export default function IndexRedirect() {
  const navigate = useNavigate();

  onMount(() => {
    navigate("/home", { replace: true });
  });

  return (
    <div class="flex min-h-[40vh] items-center justify-center" aria-busy="true">
      <p class="text-gray-500 text-sm">กำลังไปหน้าแรก…</p>
    </div>
  );
}
