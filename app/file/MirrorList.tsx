// "use client";

// function host(u: string) {
//   try { return new URL(u).hostname.replace(/^www\./, ""); } catch { return "link"; }
// }
// function favicon(u: string) {
//   try { const d = new URL(u).origin; return `https://www.google.com/s2/favicons?sz=64&domain_url=${encodeURIComponent(d)}`; }
//   catch { return ""; }
// }

// const mirrorMeta = {
//   "pixeldrain.com": { ads: "low", reliability: "medium" },
//   "gofile.io": { ads: "low", reliability: "medium" },
//   "bunkr.ru": { ads: "high", reliability: "high" },
//   "turbo.cr": { ads: "high", reliability: "high" },
// };

// export default function MirrorList({ mirrors, pageUrl }: { mirrors: string[]; pageUrl: string }) {
//   return (
//     <>
//       <ul className="fx-list">
//         {mirrors.map((url, i) => (
//           <li key={i} className="fx-row">
//             <div className="fx-left">
//               <span className="fx-num">{i + 1}</span>
//               <img className="fx-ico" src={favicon(url)} alt="" loading="lazy" />
//               <div className="fx-texts">
//                 <div className="fx-host">{host(url)}</div>
                
//                 <div className="fx-url" title={url}>{url}</div>
//               </div>
//             </div>
//             <div className="fx-actions">
//               <a className="fx-btn fx-primary" href={url} target="_blank" rel="noopener noreferrer">Open</a>
//               <button
//                 className="fx-btn fx-ghost"
//                 onClick={async (e) => {
//                   await navigator.clipboard.writeText(url);
//                   const btn = e.currentTarget;
//                   const old = btn.textContent;
//                   btn.textContent = "Copied";
//                   setTimeout(() => (btn.textContent = old || "Copy"), 900);
//                 }}
//               >
//                 Copy
//               </button>
//             </div>
//           </li>
//         ))}
//       </ul>

//       <div className="fx-bottom">
//         <a href="/" className="fx-btn fx-lite">← Create another</a>
//         <div className="fx-share">
//           <input className="fx-input" readOnly value={pageUrl} />
//           <button className="fx-btn fx-ghost" onClick={() => navigator.clipboard.writeText(pageUrl)}>Copy page URL</button>
//         </div>
//       </div>
//     </>
//   );
// }
"use client";
import { useState } from "react";

function host(u: string) {
  try {
    return new URL(u).hostname.replace(/^www\./, "");
  } catch {
    return "link";
  }
}

function favicon(u: string) {
  try {
    const d = new URL(u).origin;
    return `https://www.google.com/s2/favicons?sz=64&domain_url=${encodeURIComponent(d)}`;
  } catch {
    return "";
  }
}

const mirrorMeta: Record<
  string,
  { ads: "less" | "medium" | "high"; reliability: "low" | "medium" | "high" }
> = {
  "pixeldrain": { ads: "less", reliability: "medium" },
  "gofile": { ads: "less", reliability: "low" },
  "mega": { ads: "less", reliability: "low" },
  "small": { ads: "less", reliability: "high" },
  "bunkr": { ads: "high", reliability: "high" },
  "turbo": { ads: "high", reliability: "high" },
  "filester": { ads: "high", reliability: "high" },
};

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export default function MirrorList({
  mirrors,
  pageUrl,
}: {
  mirrors: string[];
  pageUrl: string;
}) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copiedPage, setCopiedPage] = useState(false);

  return (
    <>
      <ul className="fx-list">
        {mirrors.map((url, i) => {
const domain = host(url);

const metaEntry = Object.entries(mirrorMeta).find(([key]) =>
  domain.includes(key)
);

const meta = metaEntry?.[1];
          return (
            <li key={i} className="fx-row">
              <div className="fx-left">
                <span className="fx-num">{i + 1}</span>

                <img
                  className="fx-ico"
                  src={favicon(url)}
                  alt={`${domain} mirror source`}
                  loading="lazy"
                />

                <div className="fx-texts">
                  <div className="fx-host">{domain}</div>


                  <div className="fx-url" title={url}>
                    {url}
                  </div>
                </div>
              </div>

                  {/* ✅ Metadata badges */}
                  {meta && (
                    <div className="fx-meta">
                      <span className={`badge ads-${meta.ads}`}>
                        {capitalize(meta.ads)} Ads
                      </span>
                      <span className={`badge rel-${meta.reliability}`}>
                        {capitalize(meta.reliability)} Availabily
                      </span>
                    </div>
                  )}
              <div className="fx-actions">
                <a
                  className="fx-btn fx-primary"
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open
                </a>

                <button
                  className={`fx-btn fx-ghost fx-copy-btn ${copiedIndex === i ? "copied" : ""}`}
                  onClick={async () => {
                    await navigator.clipboard.writeText(url);
                    setCopiedIndex(i);
                    setTimeout(() => {
                      setCopiedIndex(null);
                    }, 1200);
                  }}
                  title="Copy link to clipboard"
                >
                  <span className="fx-btn-icon-wrapper">
                    {copiedIndex === i ? (
                      <svg className="fx-icon-check" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#18c37a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    ) : (
                      <svg className="fx-icon-copy" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                      </svg>
                    )}
                  </span>
                  <span className="fx-btn-text">{copiedIndex === i ? "Copied" : "Copy"}</span>
                </button>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="fx-bottom">
        <div className="fx-share">
          <input className="fx-input" readOnly value={pageUrl} />
          <button
            className={`fx-btn fx-ghost fx-copy-btn ${copiedPage ? "copied" : ""}`}
            onClick={async () => {
              await navigator.clipboard.writeText(pageUrl);
              setCopiedPage(true);
              setTimeout(() => {
                setCopiedPage(false);
              }, 1200);
            }}
          >
            <span className="fx-btn-icon-wrapper">
              {copiedPage ? (
                <svg className="fx-icon-check" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#18c37a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              ) : (
                <svg className="fx-icon-copy" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
              )}
            </span>
            <span className="fx-btn-text">{copiedPage ? "Copied" : "Copy page URL"}</span>
          </button>
        </div>
      </div>
    </>
  );
}