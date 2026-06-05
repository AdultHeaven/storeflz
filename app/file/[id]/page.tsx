import "../file.css";
import MirrorList from "../MirrorList";
import AdClickGate from "../../comp/AdClickGate"; // adjust path
import Script from 'next/script';
import AdBanner from "../../comp/AdBanner"; // adjust path
import AdCenter from "../../comp/AdCenter";
import SmartlinkTrigger from "../../comp/SmartlinkTrigger";
import TrafficStarsPush from '../../comp/TrafficStarsPush';
import AffiliatePop from '../../comp/AffiliatePop';
import CandyVideoOverlay from '../../comp/CandyVideoOverlay';
import StripchatOverlay from '../../comp/stripchatOverlay';
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

//   const mobileBanners = [
//   'https://www.imglnkx.com/9022/CandyAI_202507_Cartoon-Hentai_300x250_Hasset5.gif',
//   'https://www.imglnkx.com/9022/CandyAI_202507_Cartoon-Hentai_300x250_Hasset6.gif',
//   'https://www.imglnkx.com/9022/300x250-SFW-banner-03.jpg',
//   'https://www.imglnkx.com/9022/300x250-SFW-banner-01.jpg',
//   'https://www.imglnkx.com/9022/CandyAI_202507_Realistic_EN_02_300x250_video_banner_candy_05.jpg',
//   'https://www.imglnkx.com/9022/CandyAI_202507_Realistic_EN_03_300x250_video_banner_candy_02.jpg',
//   'https://www.imglnkx.com/9022/CandyAI_202507_Realistic_300x250_C_07.jpg',
// ];
const mobileCandiBanners = [
  'https://www.imglnkx.com/9022/CandyAI_202507_Realistic_300x100_banner_01.gif',
  'https://www.imglnkx.com/9022/CandyAI_202507_Realistic_300x100_banner_02.gif',
  'https://ads.storeflz.com/EN_02_300x100_video_banner_candy_06.mp4',
  'https://ads.storeflz.com/EN_03_300x100_video_banner_candy_03.mp4'

];

// const mobileCandiBanners = [
//   'https://video.mavrtracktor.com/b/465ce5e1.gif',
//   'https://video.mavrtracktor.com/b/454a0a9a.gif',
//   'https://video.mavrtracktor.com/b/758f1d7a.png',
// ];
  const mobileJerkMateBanners = [
  'https://www.imglnkx.com/8780/000110F_JRKM_18_ALL_EN_64_L.gif',

];
const randomJerkmateBanner =
  mobileJerkMateBanners[Math.floor(Math.random() * mobileJerkMateBanners.length)];

  const randomCandiBanner =
  mobileCandiBanners[Math.floor(Math.random() * mobileCandiBanners.length)];
  const isVideo = randomCandiBanner.endsWith('.mp4');

const desktopBanners = [

  'https://www.imglnkx.com/8780/000110AH_JRKM_18_ALL_EN_22646_L.jpg',
    'https://www.imglnkx.com/8780/000110AI_JRKM_18_ALL_EN_22646_L.jpg',
  'https://www.imglnkx.com/8780/009195A_JRKM_18_ALL_EN_22646_L.jpg'
];
// const desktopBanners = [
//   'https://www.imglnkx.com/9022/728x90-SFW-banner-03.jpg',
//   'https://www.imglnkx.com/9022/728x90-SFW-banner-01.jpg',
//   'https://www.imglnkx.com/9022/728x90-SFW-banner-02.jpg',
//   'https://www.imglnkx.com/9022/CandyAI-20251216_728x90-SFW-banner-02.jpg',
//   'https://www.imglnkx.com/9022/CandyAI-20251216_728x90-SFW-banner-01.jpg',
//   'https://www.imglnkx.com/9022/CandyAI-20251216_728x90-SFW-banner-03.jpg',
//   'https://www.imglnkx.com/9022/CandyAI_202507_Cartoon-Hentai_728x90_b3h2_728x90_09_cmai.gif',
//   'https://www.imglnkx.com/9022/CandyAI_202507_Cartoon-Hentai_728x90_b2h1_728x90_04_cmai.gif',
//   'https://www.imglnkx.com/9022/CandyAI_202507_Cartoon-Hentai_728x90_b3h1_728x90_06_cmai.gif',
//   'https://www.imglnkx.com/9022/CandyAI_202507_Realistic_tired_of_porn_728x90_banner_08.gif',
// ];

const random728Banner =
  desktopBanners[Math.floor(Math.random() * desktopBanners.length)];


  const desktopCandiBanners = [
  'https://www.imglnkx.com/9022/CandyAI_202507_Realistic_tired_of_porn_728x90_banner_08.gif',
  'https://www.imglnkx.com/9022/CandyAI-20251216_728x90-SFW-banner-02.jpg',
];

//   const desktopCandiBanners = [
//   'https://video.mavrtracktor.com/b/0e9778e1.gif',
//   'https://video.mavrtracktor.com/b/56d288b5.png',
// ];
const random728CandiBanner =
  desktopCandiBanners[Math.floor(Math.random() * desktopCandiBanners.length)];

  
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

  <a
    href="https://t.vlmai-1.com/384478/9022/38565?aff_sub5=SF_006OG000004lmDN"
    target="_blank"
    rel="nofollow noopener noreferrer"
    className="fx-banner-desktop"
  >
 <img
    src={random728CandiBanner}
    alt="Candy AI"
    width="728"
          height="90"
  />
  </a>

<a
  href="https://t.vlmai-1.com/384478/9022/38565?aff_sub5=SF_006OG000004lmDN"
  target="_blank"
  rel="nofollow noopener noreferrer"
  className="fx-banner-mobile"
>
  

  {isVideo ? (
  <video
    autoPlay
    muted
    loop
    playsInline
    width="300"
    height="100"
  >
    <source src={randomCandiBanner} type="video/mp4" />
  </video>
) : (
  <img
    src={randomCandiBanner}
    alt="Candy AI"
    width="300"
    height="100"
  />
)}
</a>

</div>  
 {/*
                      <div className="fx-banner-wrap">

  <a
    href="https://t.acrsmartcam.com/384478/3778/8996?po=6533&aff_sub5=SF_006OG000004lmDN"
    target="_blank"
    rel="nofollow noopener noreferrer"
    className="fx-banner-desktop"
  >
 <img
    src={random728CandiBanner}
    alt="Candy AI"
    width="728"
          height="90"
  />
  </a>

<a
  href="https://t.acrsmartcam.com/384478/3778/8996?po=6533&aff_sub5=SF_006OG000004lmDN"
  target="_blank"
  rel="nofollow noopener noreferrer"
  className="fx-banner-mobile"
>
  

  {isVideo ? (
  <video
    autoPlay
    muted
    loop
    playsInline
    width="300"
    height="100"
  >
    <source src={randomCandiBanner} type="video/mp4" />
  </video>
) : (
  <img
    src={randomCandiBanner}
    alt="Candy AI"
    width="300"
    height="100"
  />
)}
</a>

</div>
  */}
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
