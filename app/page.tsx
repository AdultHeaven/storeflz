"use client";

import { useEffect, useState } from "react";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE ?? "https://postgres-storelinkcreate.ahapi.workers.dev";
const SITE_BASE =
  process.env.NEXT_PUBLIC_SITE_BASE ?? "https://storeflz.com";

export default function HomePage() {
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
            <a className="nav-link" href="/file/demo">Example</a>
          </nav>
        </div>
      </header>

      <main className="container">
        <section className="hero">
          <h1>Create &amp; Share Mirrors</h1>
          <p className="muted">Add a title and as many links as you want. We’ll return a short share URL.</p>
        </section>

        <section className="card glass">
          <form className="form" onSubmit={onSubmit}>
            <div className="field">
              <label className="label" htmlFor="title">Title</label>
              <input id="title" className="input" value={title}
                     onChange={(e)=>setTitle(e.target.value)}
                     placeholder="e.g., Movie Name, Tutorial Pack" maxLength={120} required />
            </div>

            <div className="links-header">
              <div className="label">Links</div>
              <button type="button" className="btn btn-secondary" onClick={addRow}>Add link</button>
            </div>

            <div className="links-list">
              {links.map((v, i) => (
                <div key={i} className="link-row">
                  <button type="button" className="icon-btn drag" title="Drag">↕</button>
                  <input
                    className="input"
                    type="url"
                    placeholder="https://gofile.io/d/..."
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
      </main>

      <footer className="site-footer">
        <div className="container footer-wrap">
          <div className="foot-left">© {new Date().getFullYear()} Storeflz</div>
          <div className="foot-right muted">Fast, simple mirror pages.</div>
        </div>
      </footer>
    </>
  );
}
