/**
 * Utility functions for mirror link handling.
 */

/**
 * Transforms mirror URLs.
 * If the link is from Fileditch or Embedditch (e.g. fileditchfiles.st, embedditch.st, fileditch.com, fileditchfiles.me, etc.)
 * AND the target file ends with .mp4,
 * converts it into the Walkfiles embed proxy format:
 * https://walkfiles.com/e/embedditch.st/<path>
 *
 * If it does not end with .mp4 (or is any other mirror), it returns the original URL untouched.
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
      // If fileditch has a query parameter like ?f=/path/to/file.mp4
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

      // Check if target file ends with .mp4 (excluding query parameters and hashes)
      const cleanPath = subPath.split(/[?#]/)[0];
      const isMp4 = cleanPath.toLowerCase().endsWith(".mp4");

      // Only transform if it ends with .mp4
      if (isMp4 && subPath && subPath !== "/") {
        return `https://walkfiles.com/e/embedditch.st${subPath}`;
      }
    }
  } catch {
    // If not a valid URL, return original
  }

  return trimmed;
}
