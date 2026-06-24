import "./globals.css";

export default function NotFound() {
  return (
    <>
      <header className="site-header">
        <div className="container header-wrap">
          <a className="brand" href="/"><span className="logo">🪄</span><span className="brand-text">Storeflz</span></a>
          <nav className="nav">
            <a className="nav-link" href="/">Create</a>
            <a className="nav-link" href="https://tofreeporn.com">ToFreePorn</a>
          </nav>
        </div>
      </header>

      <main className="container" style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "60vh" }}>
        <section className="card glass" style={{ textAlign: "center", padding: "40px", maxWidth: "480px", borderRadius: "16px" }}>
          <div style={{ fontSize: "56px", marginBottom: "16px" }}>🔍</div>
          <h1 style={{ fontSize: "24px", fontWeight: "800", marginBottom: "8px", color: "var(--text)" }}>Page Not Found</h1>
          <p className="muted" style={{ fontSize: "14px", lineHeight: "1.5", marginBottom: "24px" }}>
            The mirror set directory or page you are looking for does not exist or has been removed due to policy compliance.
          </p>
          <a href="/" className="btn btn-primary" style={{ display: "inline-flex" }}>
            Create Mirror Link Page
          </a>
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
