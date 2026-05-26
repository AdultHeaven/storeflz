import "../file.css";
import MirrorList from "../MirrorList";
import AdClickGate from "../../comp/AdClickGate"; // adjust path
import Script from 'next/script';
import AdBanner from "../../comp/AdBanner"; // adjust path
import AdCenter from "../../comp/AdCenter";
import SmartlinkTrigger from "../../comp/SmartlinkTrigger";
import TrafficStarsPush from '../../comp/TrafficStarsPush';


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
  const res = await fetch(`${API_BASE}/file/${encodeURIComponent(params.id)}`, { cache: "no-store" });;
const candyBanners = [
  "https://simp6.cuckcapital.cr/images4/300100-5f3fe635dd413b127.jpg",
  "https://simp6.cuckcapital.cr/images4/300100-4471b986b4f1bc68b.jpg",
  "https://simp6.cuckcapital.cr/images4/300100-35bde36595efdd6a0.jpg",
  "https://simp6.cuckcapital.cr/images4/300100-29226fbead031685c.jpg",
  "https://simp6.cuckcapital.cr/images4/300100-1c47dbdf4551df306.jpg",
];

const randomBanner =
  candyBanners[Math.floor(Math.random() * candyBanners.length)];

const candy728Banners = [
  "https://simp6.cuckcapital.cr/images4/Banner_72890-66909ef90d4074888.jpg",
  "https://simp6.cuckcapital.cr/images4/Banner_72890-5453426112b02dac5.jpg",
  "https://simp6.cuckcapital.cr/images4/Banner_72890-4406e85232fae7a48.jpg",
  "https://simp6.cuckcapital.cr/images4/Banner_72890-3126ae477b2005fcc.jpg",
  "https://simp6.cuckcapital.cr/images4/Banner_72890-26744ea5c18837399.jpg",
  "https://simp6.cuckcapital.cr/images4/Banner_72890-14d14ca9c13a6570d.jpg",
];
const random728Banner =
  candy728Banners[Math.floor(Math.random() * candy728Banners.length)];

  
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

         {/* <Script
  src="https://roomsmergeshipwreck.com/04/8e/75/048e75c6e0e7d900065b329592f7715f.js"
  strategy="afterInteractive"
/>  */}


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
            {/* <p className="fx-muted">
              Choose any mirror. If one fails, try another.
{data.created_at ? <> Created on {new Date(data.created_at).toLocaleDateString()}</> : null}
            </p> */}
            <p className="fx-muted">
  Select a link below to continue.
  {data.created_at ? <> Added on {new Date(data.created_at).toLocaleDateString()}</> : null}
</p>

          </div>

          {/* interactive part */}


      <div className="fx-banner-wrap">

  {/* Desktop 728x90 */}
  <a
    href="/api/go/faphouse"
    target="_blank"
    rel="nofollow noopener noreferrer"
    className="fx-banner-desktop"
  >
 <img
    src={random728Banner}
    alt="Candy AI"
    width="728"
    height="90"
  />
  </a>

  {/* Mobile 300x100 */}
<a
  href="/api/go/faphouse"
  target="_blank"
  rel="nofollow noopener noreferrer"
  className="fx-banner-mobile"
>
  <img
    src={randomBanner}
    alt="Candy AI"
    width="300"
    height="100"
  />
</a>

</div>    
          <MirrorList mirrors={data.mirrors} pageUrl={pageUrl} />
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
