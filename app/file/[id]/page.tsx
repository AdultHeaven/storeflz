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
    robots: { index: true, follow: true },
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
         <Script
  src="https://roomsmergeshipwreck.com/04/8e/75/048e75c6e0e7d900065b329592f7715f.js"
  strategy="afterInteractive"
/>  


      <header className="fx-header">
        <div className="fx-wrap">
          <a className="fx-brand" href="/"><span className="fx-logo">🪄</span><span>Storeflz</span></a>
          <nav className="fx-nav">
            <a className="fx-nav-link" href="/">Create</a>
            <a className="fx-nav-link" href="https://tofreeporn.com">ToFreePorn</a>
          </nav>
        </div>
      </header>

      <main className="fx-wrap fx-main">
        <section className="fx-card fx-glass">
          <div className="fx-head">
            <h1 className="fx-title">{data.title || data.id}</h1>
            {/* <p className="fx-muted">
              Choose any mirror. If one fails, try another.
{data.created_at ? <> Created on {new Date(data.created_at).toLocaleDateString()}</> : null}
            </p> */}
            <p className="fx-muted">
              Select a link below to continue.
              {formattedDate ? <> Added on {formattedDate}</> : null}
            </p>
          </div>

          <MirrorList mirrors={data.mirrors || []} pageUrl={pageUrl} />

          {/* Create AI Girlfriend Panel */}
          <CreateAiGirlfriendPanel />

          {/* Dynamic Copywriting to avoid thin content (moved below links) */}
          <div className="fx-seo-desc" style={{ marginTop: "24px", padding: "20px 8px 0", fontSize: "14px", lineHeight: "1.6", borderTop: "1px solid var(--stroke)" }}>
            <p style={{ margin: "0 0 10px", color: "var(--muted)", opacity: 0.9 }}>
              Looking for safe and fast download mirrors for <strong>{data.title || data.id}</strong>? Above is a verified directory of mirror server links hosting this file. Mirroring files ensures that if one server becomes congested or goes offline, you can download the contents from another host.
            </p>
            <p style={{ margin: "0", color: "var(--muted)", fontSize: "13px", opacity: 0.7 }}>
              We regularly check the availability of link destinations. Free download options are supported across all active platforms listed above.
            </p>
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

          {/* FAQ Section */}
          <div className="fx-faq-section" style={{ marginTop: "32px", padding: "20px 8px 8px", borderTop: "1px solid var(--stroke)" }}>
            <h2 style={{ fontSize: "16px", fontWeight: "700", marginBottom: "16px", color: "var(--muted)" }}>Download Frequently Asked Questions</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <h3 style={{ fontSize: "13.5px", fontWeight: "600", color: "var(--muted)", opacity: 0.9, marginBottom: "4px" }}>Why are there multiple links for the same file?</h3>
                <p style={{ fontSize: "12.5px", color: "var(--muted)", opacity: 0.7, margin: "0", lineHeight: "1.5" }}>
                  Files shared online are often deleted due to server inactivity, bandwidth limit cap, or hosting timeouts. Providing multiple mirrors ensures you always have an active download link as a backup.
                </p>
              </div>
              <div>
                <h3 style={{ fontSize: "13.5px", fontWeight: "600", color: "var(--muted)", opacity: 0.9, marginBottom: "4px" }}>Which mirror should I use?</h3>
                <p style={{ fontSize: "12.5px", color: "var(--muted)", opacity: 0.7, margin: "0", lineHeight: "1.5" }}>
                  We recommend starting with GoFile or Pixeldrain mirrors if they are listed as "Low Ads" or "High Availability". They generally offer the fastest direct browser downloads.
                </p>
              </div>
              <div>
                <h3 style={{ fontSize: "13.5px", fontWeight: "600", color: "var(--muted)", opacity: 0.9, marginBottom: "4px" }}>Is it safe to download files from these hosts?</h3>
                <p style={{ fontSize: "12.5px", color: "var(--muted)", opacity: 0.7, margin: "0", lineHeight: "1.5" }}>
                  While the host platforms themselves are safe, always ensure you have a running antivirus software and do not run executable (.exe) files from untrusted sources.
                </p>
              </div>
            </div>
          </div>


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
          <span>© {new Date().getFullYear()} Storeflz</span>
          <span className="fx-muted">Fast, Shareable Link Pages</span>
        </div>
      </footer>
    </>
  );
}
