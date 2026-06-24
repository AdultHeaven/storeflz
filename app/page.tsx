import type { Metadata } from "next";
import HomeClient from "./HomeClient";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Free Download Mirror Link Organizer & Safelink Aggregator · Storeflz",
  description: "Combine all your download mirrors into a single short link page. Protect original links from expiration and scraping with instant, clean catalogs.",
  keywords: [
    "storeflz",
    "mirror links",
    "shareable link page",
    "gofile download mirror",
    "pixeldrain link manager",
    "download mirror aggregator",
    "safelink generator",
    "multiple mirrors",
    "gofile download",
    "pixeldrain download"
  ],
  alternates: {
    canonical: "https://storeflz.com"
  },
  themeColor: "#09090b",
  openGraph: {
    title: "Free Download Mirror Link Organizer & Safelink Aggregator · Storeflz",
    description: "Combine all your download mirrors into a single short link page. Protect original links from expiration and scraping with instant, clean catalogs.",
    url: "https://storeflz.com",
    siteName: "Storeflz",
    type: "website",
    locale: "en_US",
    images: [{ url: "https://storeflz.com/og/storeflz.png", width: 1200, height: 630, alt: "Storeflz Mirror Links" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Download Mirror Link Organizer & Safelink Aggregator · Storeflz",
    description: "Combine all your download mirrors into a single short link page. Protect original links from expiration and scraping with instant, clean catalogs.",
    images: ["https://storeflz.com/og/storeflz.png"],
  }
};

export default function HomePage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Storeflz",
    "url": "https://storeflz.com",
    "description": "Create a shareable link aggregator page for download mirrors in seconds.",
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "All",
    "publisher": {
      "@type": "Organization",
      "name": "Storeflz",
      "logo": {
        "@type": "ImageObject",
        "url": "https://storeflz.com/favicon.ico"
      }
    }
  };

  return (
    <>
      <Script
        id="home-ld-json"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <HomeClient />
    </>
  );
}
