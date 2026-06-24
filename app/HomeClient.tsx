"use client";

import { useEffect, useState } from "react";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE ?? "https://wrkr.storeflz.com";
const SITE_BASE =
  process.env.NEXT_PUBLIC_SITE_BASE ?? "https://storeflz.com";

export default function HomeClient() {
  const [title, setTitle] = useState("");
  const [links, setLinks] = useState<string[]>(["", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [shareUrl, setShareUrl] = useState("");

  useEffect(() => {
    // reset “copied” state text on change
  }, [shareUrl]);

  const addRow = () => setLinks((l) => [...l, ""]);
  const removeRow = (idx: number) => setLinks((l) => l.filter((_, i) => i !== idx));
  const updateRow = (idx: number, val: string) =>
    setLinks((l) => l.map((v, i) => (i === idx ? val : v)));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setShareUrl("");
    setLoading(true);
    try {
      const mirrors = links.map((s) => s.trim()).filter(Boolean);
      if (!title.trim()) throw new Error("Please enter a title.");
      if (mirrors.length === 0) throw new Error("Add at least one link.");
      
      // Retry logic for transient database connection / server errors
      let res: Response | null = null;
      let lastErr: any = null;
      const maxRetries = 2;

      for (let attempt = 0; attempt <= maxRetries; attempt++) {
        try {
          res = await fetch(`${API_BASE}/add`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title: title.trim(), mirrors })
          });
          if (res.ok) break; // success!
          
          const errorJson = await res.json().catch(() => ({}));
          lastErr = new Error(errorJson?.error || `Server returned status ${res.status}`);
        } catch (fetchErr: any) {
          lastErr = fetchErr;
        }

        if (attempt < maxRetries) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
      }

      if (!res || !res.ok) {
        throw lastErr || new Error("Failed to create link");
      }

      const j = await res.json();
      const url = `${SITE_BASE}/file/${encodeURIComponent(j.id)}`;
      setShareUrl(url);
    } catch (err: any) {
      setError(err.message || String(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <header className="site-header">
        <div className="container header-wrap">
          <a className="brand" href="/"><span className="logo">🪄</span><span className="brand-text">Storeflz</span></a>
          <nav className="nav">
            <a className="nav-link active" href="/">Create</a>
            <a className="nav-link" href="https://tofreeporn.com">ToFreePorn</a>
          </nav>
        </div>
      </header>

      <main className="container">
        <section className="hero" style={{ textAlign: "center", paddingBottom: "24px" }}>
          <h1>Create Shareable Link Pages</h1>
          <p className="muted">Create a shareable page to organize all your download mirrors in one safe place.</p>
        </section>

        <section className="card glass">
          <form className="form" onSubmit={onSubmit}>
            <div className="field">
              <label className="label" htmlFor="title">Mirror Set Title</label>
              <input id="title" className="input" value={title}
                     onChange={(e)=>setTitle(e.target.value)}
                     placeholder="e.g., Movie Name, Software Pack, Tutorial PDF" maxLength={120} required />
            </div>

            <div className="links-header">
              <div className="label">Mirror Links</div>
              <button type="button" className="btn btn-secondary" onClick={addRow}>Add link</button>
            </div>

            <div className="links-list">
              {links.map((v, i) => (
                <div key={i} className="link-row">
                  <button type="button" className="icon-btn drag" title="Drag">↕</button>
                  <input
                    className="input"
                    type="url"
                    placeholder="https://gofile.io/d/... or https://pixeldrain.com/u/..."
                    value={v}
                    onChange={(e)=>updateRow(i, e.target.value)}
                  />
                  <button type="button" className="icon-btn danger" onClick={()=>removeRow(i)} title="Remove">✕</button>
                </div>
              ))}
            </div>

            <div className="actions">
              <button type="submit" id="submitBtn" className={`btn btn-primary ${loading ? "loading" : ""}`} disabled={loading}>
                <span className="btn-label">{loading ? "Creating..." : "Create Share Link"}</span>
                <span className="spinner" aria-hidden="true"></span>
              </button>
            </div>

            {error && <p className="error">{error}</p>}
          </form>
        </section>

        {shareUrl && (
          <section className="card success">
            <div className="result-title">Share link created</div>
            <div className="result-url-row">
              <input className="input readonly" type="text" value={shareUrl} readOnly onClick={(e) => (e.target as HTMLInputElement).select()} />
              <button
                className="btn btn-ghost"
                type="button"
                onClick={async(e)=>{
                  await navigator.clipboard.writeText(shareUrl);
                  const btn = e.currentTarget;
                  const oldText = btn.textContent;
                  btn.textContent = "Copied";
                  setTimeout(() => btn.textContent = oldText, 1200);
                }}
              >
                Copy
              </button>
            </div>
            
            <div className="fx-share-actions-row" style={{ display: "flex", gap: "10px", marginTop: "16px", alignItems: "center", justifyContent: "center", flexWrap: "wrap" }}>
              <a className="btn btn-primary" href={shareUrl} target="_blank" rel="noopener">
                Open Link
              </a>
              
              <button
                className="fx-social-btn share-native"
                type="button"
                onClick={async () => {
                  if (navigator.share) {
                    try {
                      await navigator.share({
                        title: title || "Storeflz Mirror Links",
                        url: shareUrl
                      });
                    } catch (err) {}
                  } else {
                    await navigator.clipboard.writeText(shareUrl);
                    alert("Link copied!");
                  }
                }}
                title="Share Link"
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
                href={`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent("Download mirrors for " + (title || "files"))}`}
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
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(shareUrl)}`}
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
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent("Download mirrors for " + (title || "files"))}`}
                target="_blank"
                rel="noopener noreferrer"
                title="Share on X"
              >
                <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </section>
        )}

        {/* Feature Highlights Grid */}
        <section className="features-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px", marginTop: "40px" }}>
          <div className="card glass" style={{ padding: "20px", borderRadius: "12px", border: "1px solid var(--stroke)" }}>
            <h3 style={{ fontSize: "16px", fontWeight: "700", marginBottom: "8px", color: "var(--text)", display: "flex", alignItems: "center", gap: "8px" }}>
              <span>🔗</span> Multiple Mirror Hosts
            </h3>
            <p style={{ fontSize: "13.5px", color: "var(--muted)", margin: "0", lineHeight: "1.5" }}>
              Organize backup mirrors across cloud services including Gofile, Pixeldrain, Mega, and Mediafire. If one host goes down, others remain online.
            </p>
          </div>
          <div className="card glass" style={{ padding: "20px", borderRadius: "12px", border: "1px solid var(--stroke)" }}>
            <h3 style={{ fontSize: "16px", fontWeight: "700", marginBottom: "8px", color: "var(--text)", display: "flex", alignItems: "center", gap: "8px" }}>
              <span>⚡</span> Instant Link Pages
            </h3>
            <p style={{ fontSize: "13.5px", color: "var(--muted)", margin: "0", lineHeight: "1.5" }}>
              Generate clean, short safelinks in seconds. Perfect for forums, social media, or groups to share dynamic directories.
            </p>
          </div>
          <div className="card glass" style={{ padding: "20px", borderRadius: "12px", border: "1px solid var(--stroke)" }}>
            <h3 style={{ fontSize: "16px", fontWeight: "700", marginBottom: "8px", color: "var(--text)", display: "flex", alignItems: "center", gap: "8px" }}>
              <span>🛡️</span> Protected Links
            </h3>
            <p style={{ fontSize: "13.5px", color: "var(--muted)", margin: "0", lineHeight: "1.5" }}>
              Group download locations within a single page. Keeps original destinations safe from crawler scraping, forum spam, and fast link deletion.
            </p>
          </div>
        </section>

        {/* Step by Step tutorial */}
        <section className="how-it-works" style={{ marginTop: "50px", borderTop: "1px solid var(--stroke)", paddingTop: "40px" }}>
          <h2 style={{ fontSize: "22px", fontWeight: "800", textAlign: "center", marginBottom: "30px" }}>How It Works</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "30px", textAlign: "center" }}>
            <div>
              <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px", fontWeight: "700" }}>1</div>
              <h4 style={{ fontSize: "15px", fontWeight: "700", marginBottom: "6px" }}>Input Folder Title</h4>
              <p style={{ fontSize: "13px", color: "var(--muted)", margin: "0", lineHeight: "1.4" }}>Give your mirror set a descriptive title like a movie name, game title, or file version.</p>
            </div>
            <div>
              <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px", fontWeight: "700" }}>2</div>
              <h4 style={{ fontSize: "15px", fontWeight: "700", marginBottom: "6px" }}>Add Mirror Server Links</h4>
              <p style={{ fontSize: "13px", color: "var(--muted)", margin: "0", lineHeight: "1.4" }}>Paste your active download mirror URLs (Gofile, Pixeldrain, Mega, etc.). Add as many as needed.</p>
            </div>
            <div>
              <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px", fontWeight: "700" }}>3</div>
              <h4 style={{ fontSize: "15px", fontWeight: "700", marginBottom: "6px" }}>Get Your Shareable Page</h4>
              <p style={{ fontSize: "13px", color: "var(--muted)", margin: "0", lineHeight: "1.4" }}>Generate and copy your Storeflz link page. Share the catalog page instantly.</p>
            </div>
          </div>
        </section>

        {/* SEO Wording Content */}
        <section className="seo-content" style={{ marginTop: "60px", padding: "30px 24px", background: "rgba(255,255,255,0.01)", border: "1px solid var(--stroke)", borderRadius: "16px", fontSize: "14px", lineHeight: "1.6" }}>
          <h2 style={{ fontSize: "18px", fontWeight: "700", marginBottom: "12px", color: "var(--text)" }}>Why Storeflz is the Premium Mirror Link Organizing Platform</h2>
          <p style={{ margin: "0 0 12px", color: "var(--muted)" }}>
            Storeflz is a free online tool built for file uploaders, content creators, and internet users who need to share links safely. 
            When sharing large files online, relying on a single host like <strong>Gofile</strong> or <strong>Pixeldrain</strong> is risky because links frequently expire or hit bandwidth caps. 
            By grouping all download locations into a single, clean Storeflz page, downloaders can easily switch to a backup server if the primary link goes offline.
          </p>
          <p style={{ margin: "0 0 12px", color: "var(--muted)" }}>
            Our optimized, lightweight link page design is fully compatible with both mobile devices and desktop computers. 
            Unlike cluttered link shorteners, Storeflz features zero intrusive tracking and renders dynamic reliability stats for supported file hosts, 
            helping search engine crawlers catalog resources while giving downloaders complete peace of mind.
          </p>
          <p style={{ margin: "0", color: "var(--muted)" }}>
            Try Storeflz today to create a safelink catalog, secure your links, and optimize your download distribution.
          </p>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-wrap">
          <div className="foot-left">© {new Date().getFullYear()} Storeflz</div>
          <div className="foot-right muted">Fast, Shareable Link Pages</div>
        </div>
      </footer>
    </>
  );
}
