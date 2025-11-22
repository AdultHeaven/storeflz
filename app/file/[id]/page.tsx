import "../file.css";
import MirrorList from "../MirrorList";
import AdClickGate from "../../comp/AdClickGate"; // adjust path
import Script from 'next/script';
import AdBanner from "../../comp/AdBanner"; // adjust path
import AdCenter from "../../comp/AdCenter";

// data shape from your worker
type Data = {
  id: string;
  title?: string;
  mirrors: string[];
  created_at?: string;
};
import type { Metadata, ResolvingMetadata } from "next";

const SITE = "https://storeflz.com";
const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE ?? "https://postgres-storelinkcreate.ahapi.workers.dev";

export async function generateMetadata(
  { params }: { params: { id: string } },
  _parent: ResolvingMetadata
): Promise<Metadata> {
  let displayTitle = params.id;

  try {
    const r = await fetch(`${API_BASE}/file/${encodeURIComponent(params.id)}`, {
      // cache a bit so bots don’t hammer the API
      next: { revalidate: 300 },
    });
    if (r.ok) {
      const d = await r.json();
      displayTitle = d.title || params.id;
    }
  } catch {
    // ignore – fall back to id
  }

  const title = `${displayTitle} · Storeflz`;
  const description = `Mirror links for “${displayTitle}”. Choose any mirror; if one fails, try another.`;
  const canonical = `/file/${params.id}`;
  const absoluteUrl = `${SITE}${canonical}`;
  const ogImage = `${SITE}/og/storeflz.png`; // put a 1200x630 image at /public/og/storeflz.png

  return {
    metadataBase: new URL(SITE),
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: absoluteUrl,
      siteName: "Storeflz",
      type: "website",
      locale: "en_US",
      images: [{ url: ogImage, width: 1200, height: 630, alt: displayTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    robots: { index: true, follow: true },
    themeColor: "#0b0e14",
    icons: { icon: "/favicon.ico", apple: "/apple-touch-icon.png" },
    keywords: [
      "storeflz",
      "mirror links",
      "gofile",
      "pixeldrain",
      "download mirrors",
      displayTitle,
    ],
  };
}

export const dynamic = "force-dynamic";

export default async function FileViewPage({ params }: { params: { id: string } }) {
  const res = await fetch(`${API_BASE}/file/${encodeURIComponent(params.id)}`, { cache: "no-store" });

  if (!res.ok) {
    return (
      <>
        <header className="fx-header">
          <div className="fx-wrap">
            <a className="fx-brand" href="/"><span className="fx-logo">🪄</span><span>Storeflz</span></a>
            <nav className="fx-nav"><a className="fx-nav-link" href="/">Create</a></nav>
          </div>
        </header>
        <main className="fx-wrap fx-main">
          <section className="fx-card">
            <h1 className="fx-title">Not found</h1>
            <p className="fx-muted">We couldn’t find a mirror set with id: {params.id}</p>
          </section>
        </main>
        <footer className="fx-footer"><div className="fx-wrap"><span>© {new Date().getFullYear()} Storeflz</span><span className="fx-muted">Fast, simple mirror pages.</span></div></footer>
      </>
    );
  }

  const data = (await res.json()) as Data;
  const pageUrl = `https://storeflz.com/file/${data.id}`;

  return (
    <>
        {/* <AdClickGate
        className="ads-class"
      /> */}
     {/* <Script
        src="/mobilepopup.js"
        strategy="afterInteractive" // Ensures it runs after hydration
      /> */}

      <header className="fx-header">
        <div className="fx-wrap">
          <a className="fx-brand" href="/"><span className="fx-logo">🪄</span><span>Storeflz</span></a>
          <nav className="fx-nav"><a className="fx-nav-link" href="/">Create</a></nav>
        </div>
      </header>

      <main className="fx-wrap fx-main">
        <section className="fx-card fx-glass">
          <div className="fx-head">
            <h1 className="fx-title">{data.title || data.id}</h1>
            <p className="fx-muted">
              Choose any mirror. If one fails, try another.
{data.created_at ? <> Created on {new Date(data.created_at).toLocaleDateString()}</> : null}
            </p>
          </div>

          {/* interactive part */}
          <MirrorList mirrors={data.mirrors} pageUrl={pageUrl} />
        </section>
      </main>
      <AdCenter/>
<AdBanner/>
      <footer className="fx-footer">
        <div className="fx-wrap">
          <span>© {new Date().getFullYear()} Storeflz</span>
          <span className="fx-muted">Fast, simple mirror pages.</span>
        </div>
      </footer>
    </>
  );
}
