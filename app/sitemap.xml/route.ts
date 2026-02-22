export async function GET() {
  const workerUrl = "https://storeflz-sitemap.ahapi.workers.dev/sitemap.xml";

  const response = await fetch(workerUrl, {
    next: { revalidate: 3600 }, // 1 hour cache
  });

  const xml = await response.text();

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}