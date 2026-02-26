import { useNavigate } from "@solidjs/router";
import { onMount } from "solid-js";

export default function IndexRedirect() {
  const navigate = useNavigate();

  onMount(() => {
    navigate("/home", { replace: true });
  });

  // Must return a stable DOM node so Solid's reconciler doesn't hit null.nextSibling
  return (
    <div class="flex min-h-[40vh] items-center justify-center">
      <p class="text-gray-500">...</p>
    </div>
  );
}
