import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/file/"],
      disallow: ["/api/", "/out", "/api/go/"],
    },
    sitemap: "https://storeflz.com/sitemap.xml",
  };
}
