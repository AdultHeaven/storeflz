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

                  {/* ✅ Metadata badges */}
                  {meta && (
                    <div className="fx-meta">
                      <span className={`badge ads-${meta.ads}`}>
                        {capitalize(meta.ads)} Ads
                      </span>
                      <span className={`badge rel-${meta.reliability}`}>
                        {capitalize(meta.reliability)} Availability
                      </span>
                    </div>
                  )}
                </div>
              </div>
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

      <div className="fx-bottom" style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "stretch", width: "100%" }}>
        <div className="fx-share">
          <input className="fx-input" readOnly value={pageUrl} onClick={(e) => (e.target as HTMLInputElement).select()} />
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
            <span className="fx-btn-text">{copiedPage ? "Copied" : "Copy URL"}</span>
          </button>
        </div>

        {/* Quick Social & Web Share Actions */}
        <div className="fx-social-share">
          <button
            className="fx-social-btn share-native"
            type="button"
            onClick={async () => {
              if (navigator.share) {
                try {
                  await navigator.share({
                    title: document.title || "Storeflz Mirror Links",
                    url: pageUrl
                  });
                } catch (err) {}
              } else {
                await navigator.clipboard.writeText(pageUrl);
                alert("Link copied!");
              }
            }}
            title="Share Page"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="18" cy="5" r="3"></circle>
              <circle cx="6" cy="12" r="3"></circle>
              <circle cx="18" cy="19" r="3"></circle>
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
            </svg>
          </button>

          {/* Telegram */}
          <a
            className="fx-social-btn telegram"
            href={`https://t.me/share/url?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent("Download mirrors for " + (typeof document !== 'undefined' ? document.title : "files"))}`}
            target="_blank"
            rel="noopener noreferrer"
            title="Share on Telegram"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.96 1.24-5.54 3.65-.52.36-.99.54-1.4.53-.46-.01-1.34-.26-1.99-.47-.8-.26-1.43-.4-1.37-.85.03-.23.35-.47.96-.72 3.76-1.63 6.27-2.71 7.53-3.23 3.58-1.48 4.32-1.74 4.81-1.75.11 0 .35.03.5.16.13.1.17.25.19.35-.01.07-.01.2-.02.26z"/>
            </svg>
          </a>

          {/* WhatsApp */}
          <a
            className="fx-social-btn whatsapp"
            href={`https://api.whatsapp.com/send?text=${encodeURIComponent(pageUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            title="Share on WhatsApp"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.81 9.81 0 0 0 12.04 2zm5.79 13.91c-.24.67-1.18 1.24-1.65 1.29-.46.05-.91.07-1.55-.13-.39-.12-1.02-.36-1.89-.74-3.69-1.59-6.07-5.32-6.26-5.57-.18-.25-1.51-2.01-1.51-3.83 0-1.82.95-2.72 1.29-3.08.34-.36.74-.45.99-.45.24 0 .48.01.69.02.22.01.52-.08.81.62.3.72 1.02 2.5 1.11 2.68.09.18.15.39.03.63-.12.24-.18.39-.36.6-.18.21-.38.47-.54.63-.18.18-.37.38-.16.74.21.36.93 1.53 1.99 2.48 1.36 1.22 2.51 1.6 2.87 1.78.36.18.57.15.79-.09.21-.24.93-1.08 1.17-1.45.24-.37.49-.31.82-.19.33.12 2.1 1.02 2.46 1.2.36.18.6.27.69.42.09.15.09.87-.15 1.54z"/>
            </svg>
          </a>

          {/* Twitter / X */}
          <a
            className="fx-social-btn twitter"
            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent("Download mirrors for " + (typeof document !== 'undefined' ? document.title : "files"))}`}
            target="_blank"
            rel="noopener noreferrer"
            title="Share on X"
          >
            <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>
        </div>
      </div>
    </>
  );
}