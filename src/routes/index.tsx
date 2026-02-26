import { useNavigate } from "@solidjs/router";
import { onMount } from "solid-js";

export default function IndexRedirect() {
  const navigate = useNavigate();

  onMount(() => {
    navigate("/home", { replace: true });
  });

  // Must return a stable DOM node so Solid's reconciler doesn't hit null.nextSibling
  return (
    <div class="flex min-h-[40vh] flex-col items-center justify-center gap-4">
      <div
        class="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-amber-500"
        aria-hidden="true"
      />
    </div>
  );
}
