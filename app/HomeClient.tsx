"use client";

import { useEffect, useState } from "react";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE ?? "https://wrkr.storeflz.com";
const SITE_BASE =
  process.env.NEXT_PUBLIC_SITE_BASE ?? "https://storeflz.com";

function detectHostName(url: string): string | null {
  if (!url.trim()) return null;
  try {
    const hostname = new URL(url).hostname.toLowerCase();
    if (hostname.includes("gofile")) return "Gofile";
    if (hostname.includes("pixeldrain")) return "Pixeldrain";
    if (hostname.includes("mega")) return "Mega.nz";
    if (hostname.includes("mediafire")) return "Mediafire";
    if (hostname.includes("bunkr")) return "Bunkr";
    if (hostname.includes("turbo")) return "Turbo";
    return hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
}

export default function HomeClient() {
  const [title, setTitle] = useState("");
  const [links, setLinks] = useState<string[]>(["", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [shareUrl, setShareUrl] = useState("");
  const [copied, setCopied] = useState(false);

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
      if (!title.trim()) throw new Error("Please enter a title for your mirror set.");
      if (mirrors.length === 0) throw new Error("Please add at least one download mirror link.");

      let res: Response | null = null;
      let lastErr: any = null;
      const maxRetries = 2;

      for (let attempt = 0; attempt <= maxRetries; attempt++) {
        try {
          res = await fetch(`${API_BASE}/add`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title: title.trim(), mirrors }),
          });
          if (res.ok) break;

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
      {/* Header */}
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

      {/* Main Container */}
      <main className="container">
        {/* Hero Section */}
        <section className="hero">
          <div className="hero-tag">
            <span>• Unlimited Mirror Link Organizer</span>
          </div>

          <h1>Organize & Share All Your File Mirrors</h1>

          <p>
            Combine multiple download links into a single, clean safelink page.
          </p>

          <div className="host-pills">
            <span className="host-badge">
              <span className="badge-dot" /> 100% Free
            </span>
            <span className="host-badge">
              <span className="badge-dot" /> Instant Setup
            </span>
            <span className="host-badge">
              <span className="badge-dot" /> Mirror Redundancy
            </span>
            <span className="host-badge">
              <span className="badge-dot" /> No Signup Needed
            </span>
          </div>
        </section>

        {/* Creator Workspace Form Card */}
        <section className="card-panel">
          <form onSubmit={onSubmit}>
            {/* Title Field */}
            <div className="form-group">
              <div className="form-label">
                <span>Mirror Set Title</span>
                <span className="char-counter">{title.length}/120</span>
              </div>
              <input
                id="title"
                className="input-field"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Movie Name, Software Pack, Tutorial PDF"
                maxLength={120}
                required
              />
            </div>

            {/* Mirror Links Header Row with Inline + Add Link Button */}
            <div className="links-header-row">
              <div className="form-label" style={{ margin: 0 }}>
                <span>
                  Mirror Server Links <span className="count-badge">{links.length}</span>
                </span>
              </div>
              <button type="button" className="btn-add-inline" onClick={addRow}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                <span>Add Link</span>
              </button>
            </div>

            {/* Mirror Links List */}
            <div className="link-list">
              {links.map((v, i) => {
                const detectedHost = detectHostName(v);
                return (
                  <div key={i} className="link-item-row">
                    <span className="row-num">{i + 1}</span>

                    <div className="input-rel-wrap">
                      <input
                        className="row-input-seamless"
                        type="url"
                        placeholder="Paste mirror link..."
                        value={v}
                        onChange={(e) => updateRow(i, e.target.value)}
                        required={i === 0}
                      />
                    </div>

                    {detectedHost && (
                      <span className="host-tag">{detectedHost}</span>
                    )}

                    <button
                      type="button"
                      className="delete-btn-seamless"
                      onClick={() => removeRow(i)}
                      disabled={links.length <= 1}
                      title="Remove mirror"
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Primary Submit CTA Button */}
            <div className="submit-row-bar">
              <button type="submit" className="btn-submit" disabled={loading}>
                {loading ? (
                  <span>Creating...</span>
                ) : (
                  <>
                    <span>Create</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </>
                )}
              </button>
            </div>

            {error && <p className="error-msg">{error}</p>}
          </form>
        </section>

        {/* Result Card */}
        {shareUrl && (
          <section className="result-card">
            <div className="result-header">
              Shareable Link Page Created
            </div>
            <div className="result-row">
              <input className="input-field" type="text" value={shareUrl} readOnly onClick={(e) => (e.target as HTMLInputElement).select()} />
              <button
                className="nav-link"
                type="button"
                style={{ background: "#ffffff", color: "#09090b", border: "none", fontWeight: "700" }}
                onClick={async () => {
                  await navigator.clipboard.writeText(shareUrl);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
              >
                {copied ? "Copied!" : "Copy Link"}
              </button>
              <a className="nav-link" href={shareUrl} target="_blank" rel="noopener noreferrer">
                Open →
              </a>
            </div>
          </section>
        )}

        {/* Features Grid */}
        <section className="features-grid">
          <div className="feature-box">
            <h3>Multiple Backup Hosts</h3>
            <p>
              Organize backup mirrors across Gofile, Pixeldrain, Mega, and Mediafire. If one host goes down, users access alternate mirrors.
            </p>
          </div>

          <div className="feature-box">
            <h3>Instant Safelinks</h3>
            <p>
              Clean, short, fast-loading link pages in milliseconds. Perfect for forums, social media, and download groups.
            </p>
          </div>

          <div className="feature-box">
            <h3>Protected Links</h3>
            <p>
              Group download locations within a single page. Keeps original destinations safe from crawler scraping and premature link deletion.
            </p>
          </div>
        </section>

        {/* Steps Section */}
        <section className="steps-section">
          <h2 className="steps-title">How Storeflz Works</h2>
          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">1</div>
              <h4>Input Set Title</h4>
              <p>Enter a title for your link collection (e.g. movie name, game title, or file version).</p>
            </div>

            <div className="step-card">
              <div className="step-number">2</div>
              <h4>Add Mirror Links</h4>
              <p>Paste download mirror links (Gofile, Pixeldrain, Mega, etc.). Add as many as needed.</p>
            </div>

            <div className="step-card">
              <div className="step-number">3</div>
              <h4>Share Your Page</h4>
              <p>Copy your generated Storeflz link page and share it with your users instantly.</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="site-footer">
        <div className="container footer-wrap">
          <div>© {new Date().getFullYear()} Storeflz. All rights reserved.</div>
          <div>Fast & Safe Mirror Link Pages</div>
        </div>
      </footer>
    </>
  );
}
