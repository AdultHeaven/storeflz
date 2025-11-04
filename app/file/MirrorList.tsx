"use client";

function host(u: string) {
  try { return new URL(u).hostname.replace(/^www\./, ""); } catch { return "link"; }
}
function favicon(u: string) {
  try { const d = new URL(u).origin; return `https://www.google.com/s2/favicons?sz=64&domain_url=${encodeURIComponent(d)}`; }
  catch { return ""; }
}

export default function MirrorList({ mirrors, pageUrl }: { mirrors: string[]; pageUrl: string }) {
  return (
    <>
      <ul className="fx-list">
        {mirrors.map((url, i) => (
          <li key={i} className="fx-row">
            <div className="fx-left">
              <span className="fx-num">{i + 1}</span>
              <img className="fx-ico" src={favicon(url)} alt="" loading="lazy" />
              <div className="fx-texts">
                <div className="fx-host">{host(url)}</div>
                <div className="fx-url" title={url}>{url}</div>
              </div>
            </div>
            <div className="fx-actions">
              <a className="fx-btn fx-primary" href={url} target="_blank" rel="noopener noreferrer">Open</a>
              <button
                className="fx-btn fx-ghost"
                onClick={async (e) => {
                  await navigator.clipboard.writeText(url);
                  const btn = e.currentTarget;
                  const old = btn.textContent;
                  btn.textContent = "Copied";
                  setTimeout(() => (btn.textContent = old || "Copy"), 900);
                }}
              >
                Copy
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="fx-bottom">
        <a href="/" className="fx-btn fx-lite">← Create another</a>
        <div className="fx-share">
          <input className="fx-input" readOnly value={pageUrl} />
          <button className="fx-btn fx-ghost" onClick={() => navigator.clipboard.writeText(pageUrl)}>Copy page URL</button>
        </div>
      </div>
    </>
  );
}
