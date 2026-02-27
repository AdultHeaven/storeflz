export async function GET() {
  // const workerUrl = "https://storeflz-sitemap.ahapi.workers.dev/sitemap.xml";

  // const response = await fetch(workerUrl);
const workerUrl = "https://storeflz-sitemap.ahapi.workers.dev/sitemap.xml";

const response = await fetch(workerUrl, {
  method: "GET",
  cache: "no-store", // tells browser not to use cache
  headers: {
    "Cache-Control": "no-store",
    "Pragma": "no-cache"
  }
});
  const xml = await response.text();

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}