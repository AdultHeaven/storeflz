import "../file.css";
import MirrorList from "../MirrorList";
import AdClickGate from "../../comp/AdClickGate"; // adjust path
import Script from 'next/script';
import AdBanner from "../../comp/AdBanner"; // adjust path
import AdCenter from "../../comp/AdCenter";
import SmartlinkTrigger from "../../comp/SmartlinkTrigger";
import TrafficStarsPush from '../../comp/TrafficStarsPush';
// import AffiliatePop from '../../comp/AffiliatePop';
import CandyVideoOverlay from '../../comp/CandyVideoOverlay';
import StripchatOverlay from '../../comp/stripchatOverlay';
import CreateAiGirlfriendPanel from '../../comp/CreateAiGirlfriendPanel';
import CandyAdBanner from '../../comp/CandyAdBanner';
import NativeAdBanner from '../../comp/NativeAdBanner';
import { notFound } from "next/navigation";
import '../CandyVideoOverlay.css';

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
  process.env.NEXT_PUBLIC_API_BASE ?? "https://wrkr.storeflz.com";

export async function generateMetadata(
  { params }: { params: { id: string } },
  _parent: ResolvingMetadata
): Promise<Metadata> {
  let displayTitle = params.id;

  try {
    const r = await fetch(`${API_BASE}/file/${encodeURIComponent(params.id)}`, {
      // cache for 30 days
      next: { revalidate: 2592000 },
    });
    if (r.ok) {
      const d = await r.json();
      displayTitle = d.title || params.id;
    }
  } catch {
    // ignore – fall back to id
  }

  const title = `Download ${displayTitle} - Mirror Links (Gofile, Pixeldrain) · Storeflz`;
  const description = `Access multiple secure download mirrors for "${displayTitle}". Choose from active hosts like Gofile, Pixeldrain, Mega, and more. Always safe, fast, and online.`;
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
    robots: { index: false, follow: false },
    themeColor: "#0b0e14",
    icons: { icon: "/favicon.ico", apple: "/apple-touch-icon.png" },
    keywords: [
      "storeflz",
      "mirror links",
      "gofile",
      "pixeldrain",
      "download mirrors",
      "safe download",
      "gofile download",
      "pixeldrain download",
      "mega mirror",
      displayTitle,
    ],
  };
}
export const revalidate = 2592000; // Cache page for 30 days

function formatDate(dateStr?: string) {
  if (!dateStr) return null;
  try {
    const isoStr = dateStr.includes("T") ? dateStr : dateStr.replace(" ", "T");
    const d = new Date(isoStr);
    return isNaN(d.getTime()) ? null : d.toLocaleDateString();
  } catch {
    return null;
  }
}

export default async function FileViewPage({ params }: { params: { id: string } }) {
  const res = await fetch(`${API_BASE}/file/${encodeURIComponent(params.id)}`, {
    next: { revalidate: 2592000 },
  }).catch(() => null);

  if (!res || !res.ok) {
    notFound();
  }

  let data: Data;
  try {
    data = (await res.json()) as Data;
  } catch (err) {
    console.error("Failed to parse JSON file data:", err);
    notFound();
  }

  const formattedDate = formatDate(data.created_at);
  const pageUrl = `https://storeflz.com/file/${data.id}`;

  const hostnames = (data.mirrors || []).map((m) => {
    try {
      return new URL(m).hostname.toLowerCase();
    } catch {
      return "";
    }
  });
  const hasGofile = hostnames.some((h) => h.includes("gofile"));
  const hasPixeldrain = hostnames.some((h) => h.includes("pixeldrain"));
  const hasMega = hostnames.some((h) => h.includes("mega"));

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": `Download ${data.title || data.id} - Mirror Links`,
    "description": `Get secure mirror download links for ${data.title || data.id} including Gofile, Pixeldrain, Mega, and other options.`,
    "url": pageUrl,
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
        id="ld-json-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      {/* <AffiliatePop /> */}
      {/* <CandyVideoOverlay /> */}
      {/* <StripchatOverlay /> */}
      {/* <Script
        src="https://roomsmergeshipwreck.com/04/8e/75/048e75c6e0e7d900065b329592f7715f.js"
        strategy="afterInteractive"
      /> */}


      <header className="site-header">
        <div className="container header-wrap">
          <a className="brand" href="/">
            <span className="brand-text">Storeflz</span>
          </a>
          <nav className="nav">
            <a className="nav-link active" href="/">Create</a>
          </nav>
        </div>
      </header>

      <main className="fx-wrap fx-main">
        <section className="fx-card fx-glass">
          <div className="fx-head">
            <div className="fx-status-badge">
              <span className="fx-green-dot"></span>
              <span>Active Mirror Directory</span>
            </div>
            <h1 className="fx-title">{data.title || data.id}</h1>
            <div className="fx-sub-info">
              <span>Select a mirror link below to continue</span>
              {formattedDate && (
                <>
                  <span className="fx-dot-divider">•</span>
                  <span>Added {formattedDate}</span>
                </>
              )}
            </div>
          </div>

          <MirrorList mirrors={data.mirrors || []} pageUrl={pageUrl} />

          {/* Create AI Girlfriend Panel */}
          <CreateAiGirlfriendPanel />

          {/* Banner Ad below Candy (PC 728x90 / Mobile 300x250) */}
          {/* <CandyAdBanner /> */}
          <div
            id="ad-container-300x250"
            style={{
              margin: "20px 0",
              textAlign: "center",
              minHeight: "250px",
            }}
          >
            <Script
              id="high-performance-ad"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
        atOptions = {
          'key' : 'de969ad072620e41fdeb02d6cf68cc07',
          'format' : 'iframe',
          'height' : 250,
          'width' : 300,
          'params' : {}
        };
        (function() {
          var container = document.getElementById('ad-container-300x250');

          if (container && !container.dataset.loaded) {
            container.dataset.loaded = 'true';

            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = "https://roomsmergeshipwreck.com/de969ad072620e41fdeb02d6cf68cc07/invoke.js";

            container.appendChild(script);
          }
        })();
      `,
              }}
            />
          </div>

          <div
            id="native-ad-container"
            style={{
              margin: "20px 0",
              width: "100%",
            }}
          >
            <div id="container-6736fe12ee184733bf2b50f38e703b00" />

            <Script
              id="native-ad-script"
              src="https://roomsmergeshipwreck.com/6736fe12ee184733bf2b50f38e703b00/invoke.js"
              strategy="afterInteractive"
              async
              data-cfasync="false"
            />
          </div>

          {/* Contextual Download Tips (moved below links) */}
          {(hasGofile || hasPixeldrain || hasMega) && (
            <div className="fx-server-tips" style={{ margin: "18px 8px 10px", padding: "12px 14px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "10px" }}>
              <div style={{ fontWeight: "700", color: "var(--muted)", fontSize: "13.5px", marginBottom: "8px", display: "flex", alignItems: "center", gap: "6px" }}>
                <span>💡</span> Helpful Server Instructions:
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "12.5px", color: "var(--muted)", opacity: 0.9 }}>
                {hasGofile && (
                  <div style={{ display: "flex", gap: "8px" }}>
                    <span style={{ color: "var(--muted)" }}>•</span>
                    <span><strong>Gofile mirror:</strong> High-speed server, free downloads, and no registration required. Highly recommended.</span>
                  </div>
                )}
                {hasPixeldrain && (
                  <div style={{ display: "flex", gap: "8px" }}>
                    <span style={{ color: "var(--muted)" }}>•</span>
                    <span><strong>Pixeldrain mirror:</strong> Very fast downloads. If you hit temporary limits, using a VPN can reset your quota.</span>
                  </div>
                )}
                {hasMega && (
                  <div style={{ display: "flex", gap: "8px" }}>
                    <span style={{ color: "var(--muted)" }}>•</span>
                    <span><strong>Mega mirror:</strong> Securely encrypted host. Best compatible with Chrome, Firefox, or the Mega app.</span>
                  </div>
                )}
              </div>
            </div>
          )}
          {/* <a
  href="https://t.acrsmartcam.com/384478/3778/28133?bo=2779,2778,2777,2776,2775&po=6533&aff_sub5=SF_006OG000004lmDN"
  target="_blank"
  rel="nofollow noopener noreferrer"
  className="dev-notice dev-notice-link"
>
  <div className="dev-notice-icon">💖</div>

  <div className="dev-notice-text">
    <strong>Feeling lonely? Not anymore.</strong>
    <p>
  Connect privately with beautiful women and enjoy a personalized, interactive experience like never before.
    </p>
  </div>
</a> */}
          {/* <HilltopAd /> */}

          {/* <AdBanner/> */}



        </section>

      </main>

      {/* <div className="fx-banner-wrap">

  <a
    href="/api/go/jerkmate?plc=strPcBig"
    target="_blank"
    rel="nofollow noopener noreferrer"
    className="fx-banner-desktop"
  >
 <img
    src={random728Banner}
    alt="Candy AI"
    width="970"
          height="90"
  />
  </a>

<a
  href="/api/go/jerkmate?plc=strMblBig"
  target="_blank"
  rel="nofollow noopener noreferrer"
  className="fx-banner-mobile fx-banner-mobile1"
>
  <img
    src={randomJerkmateBanner}
    alt="Candy AI"
     width="300"
          height="100"
  />
</a>

</div>   */}
      {/* <AdCenter/> */}

      {/* <div id="container-6736fe12ee184733bf2b50f38e703b00" />

<Script
  src="https://roomsmergeshipwreck.com/6736fe12ee184733bf2b50f38e703b00/invoke.js"
  strategy="afterInteractive"
  async
  data-cfasync="false"
/> */}
      <footer className="fx-footer">
        <div className="fx-wrap">
          <span>© {new Date().getFullYear()} Storeflz. All rights reserved.</span>
          <span className="fx-muted">Fast & Safe Shareable Link Pages</span>
        </div>
      </footer>
    </>
  );
}
