import { createMiddleware } from "@solidjs/start/middleware";

export default createMiddleware({
  onRequest: [
    (event) => {
      const url = new URL(event.request.url);
      const isMaintenanceMode = process.env.VITE_SITE_MAINTENANCE === "true";
      // Skip redirect for internal routes and assets
      if (url.pathname.startsWith("/_") || 
          url.pathname.startsWith("/api/") ||
          url.pathname.includes(".")) {
        return;
      }
      
      if (isMaintenanceMode) {
        // Allow access to maintenance page only when maintenance mode is enabled
        if (url.pathname === "/maintenance") {
          return;
        }
        // Redirect all other pages to maintenance
        return Response.redirect(new URL("/maintenance", event.request.url), 302);
      } else {
        // When maintenance mode is disabled, redirect maintenance page to home
        if (url.pathname === "/maintenance") {
          return Response.redirect(new URL("/", event.request.url), 302);
        }
      }
    }
  ]
});