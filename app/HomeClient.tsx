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
      const res = await fetch(`${API_BASE}/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: title.trim(), mirrors })
      });
      const j = await res.json();
      if (!res.ok) throw new Error(j?.error || "Failed to create link");
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
              <input className="input readonly" type="text" value={shareUrl} readOnly />
              <button
                className="btn btn-ghost"
                type="button"
                onClick={async()=>{ await navigator.clipboard.writeText(shareUrl); }}
              >
                Copy
              </button>
            </div>
            <div className="quick-open" style={{marginTop:12}}>
              <a className="btn btn-primary" href={shareUrl} target="_blank" rel="noopener">Open</a>
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
