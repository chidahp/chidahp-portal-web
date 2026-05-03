import { defineConfig } from "@solidjs/start/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    server: {
      warmup: {
        clientFiles: [
          "./src/routes/(baseLayout).tsx",
          "./src/routes/(baseLayout)/home/index.tsx",
          "./src/components/utils/BookfeedWaitlistHero.tsx",
        ],
      },
    },
  },
  middleware: "./src/middleware.ts",
});
