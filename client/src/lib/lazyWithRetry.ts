import { lazy, type ComponentType } from "react";

/**
 * React.lazy wrapper that force-reloads the page once if a chunk fails to
 * load (e.g. a stale reference to a chunk hash removed by a new deploy).
 */
export function lazyWithRetry<T extends ComponentType<any>>(
  importer: () => Promise<{ default: T }>,
  key: string
) {
  return lazy(async () => {
    try {
      const mod = await importer();
      if (typeof window !== "undefined") {
        window.sessionStorage.removeItem(`lazy-retry:${key}`);
      }
      return mod;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      const isChunkLoadError =
        message.includes("Failed to fetch dynamically imported module") ||
        message.includes("Importing a module script failed");

      if (typeof window !== "undefined" && isChunkLoadError) {
        const retryFlag = `lazy-retry:${key}`;
        const hasRetried = window.sessionStorage.getItem(retryFlag) === "1";

        if (!hasRetried) {
          window.sessionStorage.setItem(retryFlag, "1");
          window.location.reload();
        }
      }

      throw error;
    }
  });
}
