"use client";

import { useState } from "react";

export default function ReportClient() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [reason, setReason] = useState("");
  const [details, setDetails] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API request submission
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <>
      <header className="site-header">
        <div className="container header-wrap">
          <a className="brand" href="/"><span className="logo">🪄</span><span className="brand-text">Storeflz</span></a>
          <nav className="nav">
            <a className="nav-link" href="/">Create</a>
            <a className="nav-link active" href="/report">Report Abuse</a>
          </nav>
        </div>
      </header>

      <main className="container" style={{ maxWidth: "680px", margin: "40px auto" }}>
        <section className="hero" style={{ textAlign: "center", marginBottom: "28px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "800" }}>Report Content / DMCA</h1>
          <p className="muted" style={{ fontSize: "14px", marginTop: "6px" }}>
            Storeflz is a link indexer and hosting mirror sharing utility. We respect intellectual property and content safety policies.
          </p>
        </section>

        <section className="card glass" style={{ padding: "28px", borderRadius: "16px" }}>
          {submitted ? (
            <div style={{ textAlign: "center", padding: "20px 0" }}>
              <div style={{ fontSize: "48px", marginBottom: "12px" }}>✅</div>
              <h3 style={{ fontSize: "18px", fontWeight: "700", marginBottom: "8px" }}>Abuse Report Submitted</h3>
              <p className="muted" style={{ fontSize: "14px", lineHeight: "1.5" }}>
                Thank you for reporting. Our safety team reviews abuse complaints within 24–48 hours and will take action on non-compliant link folders.
              </p>
              <button 
                type="button" 
                className="btn btn-secondary" 
                style={{ marginTop: "20px" }} 
                onClick={() => {
                  setSubmitted(false);
                  setName("");
                  setEmail("");
                  setFileUrl("");
                  setReason("");
                  setDetails("");
                }}
              >
                Submit Another Report
              </button>
            </div>
          ) : (
            <form className="form" onSubmit={handleSubmit}>
              <div className="field">
                <label className="label" htmlFor="report-name">Your Name</label>
                <input 
                  id="report-name" 
                  className="input" 
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  placeholder="John Doe" 
                  required 
                />
              </div>

              <div className="field">
                <label className="label" htmlFor="report-email">Your Email Address</label>
                <input 
                  id="report-email" 
                  className="input" 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  placeholder="contact@domain.com" 
                  required 
                />
              </div>

              <div className="field">
                <label className="label" htmlFor="report-url">Storeflz File/Folder Link URL</label>
                <input 
                  id="report-url" 
                  className="input" 
                  type="url" 
                  value={fileUrl} 
                  onChange={(e) => setFileUrl(e.target.value)} 
                  placeholder="https://storeflz.com/file/..." 
                  required 
                />
              </div>

              <div className="field">
                <label className="label" htmlFor="report-reason">Reason for Report</label>
                <select 
                  id="report-reason" 
                  className="input" 
                  value={reason} 
                  onChange={(e) => setReason(e.target.value)} 
                  style={{ background: "#0f1320", color: "var(--text)" }}
                  required
                >
                  <option value="" disabled>Select a reason...</option>
                  <option value="copyright">Copyright Infringement (DMCA Takedown)</option>
                  <option value="harmful">Malware / Harmful Software links</option>
                  <option value="illegal">Illegal / Prohibited content</option>
                  <option value="spam">Spam / Phishing</option>
                  <option value="other">Other Violation</option>
                </select>
              </div>

              <div className="field">
                <label className="label" htmlFor="report-details">Additional Details & Evidence</label>
                <textarea 
                  id="report-details" 
                  className="input" 
                  value={details} 
                  onChange={(e) => setDetails(e.target.value)} 
                  placeholder="Please provide copyright proof or detailed description of harmful links..." 
                  rows={5} 
                  style={{ resize: "vertical", fontFamily: "inherit" }}
                  required 
                />
              </div>

              <div className="actions" style={{ marginTop: "10px" }}>
                <button 
                  type="submit" 
                  className={`btn btn-primary ${loading ? "loading" : ""}`} 
                  disabled={loading}
                  style={{ width: "100%" }}
                >
                  <span className="btn-label">{loading ? "Submitting..." : "Submit Abuse Report"}</span>
                  <span className="spinner" aria-hidden="true"></span>
                </button>
              </div>
            </form>
          )}
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
