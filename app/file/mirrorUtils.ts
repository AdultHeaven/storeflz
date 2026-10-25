/**
 * Utility functions for mirror link handling.
 */

/**
 * Transforms mirror URLs.
 * If the link is from Fileditch (e.g. fileditchfiles.st, embedditch.st, fileditch.com, fileditchfiles.me, etc.),
 * converts it into the Walkfiles embed proxy format:
 * https://walkfiles.com/e/embedditch.st/<path>
 */
export function transformMirrorUrl(url: string): string {
  if (!url || typeof url !== "string") return url;
  const trimmed = url.trim();
  if (!trimmed) return trimmed;

  try {
    const formatted = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
    const parsed = new URL(formatted);
    const host = parsed.hostname.toLowerCase();

    // Already a walkfiles embed URL or walkfiles proxy
    if (host.includes("walkfiles") && parsed.pathname.startsWith("/e/")) {
      return trimmed;
    }

    // Check if it's fileditch or embedditch
    if (host.includes("fileditch") || host.includes("embedditch")) {
      // If fileditch has a query parameter like ?f=/path/to/file
      const fParam = parsed.searchParams.get("f");
      let subPath = "";
      if (fParam) {
        subPath = fParam;
      } else {
        subPath = `${parsed.pathname}${parsed.search}${parsed.hash}`;
      }

      // Ensure subPath starts with a single slash
      subPath = subPath.replace(/^\/+/, "/");
      if (!subPath.startsWith("/")) {
        subPath = `/${subPath}`;
      }

      // Only transform if there is an actual path
      if (subPath && subPath !== "/") {
        return `https://walkfiles.com/e/embedditch.st${subPath}`;
      }
    }
  } catch {
    // If not a valid URL, return original
  }

  return trimmed;
}
