import React, { useState } from "react";

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400;500&family=Inter:wght@400;500;600;700;800&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    background: #0a0a14;
    color: #e8eaf0;
    font-family: 'Inter', system-ui, sans-serif;
    min-height: 100vh;
    -webkit-font-smoothing: antialiased;
  }

  .wrap {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 32px 20px;
    position: relative;
    overflow: hidden;
  }

  /* Indigo glow */
  .wrap::before {
    content: '';
    position: absolute;
    width: 600px; height: 600px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%);
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
  }

  /* Dot grid */
  .wrap::after {
    content: '';
    position: absolute; inset: 0;
    background-image: radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px);
    background-size: 28px 28px;
    pointer-events: none;
  }

  .card {
    position: relative; z-index: 1;
    width: 100%; max-width: 480px;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 16px;
    padding: 40px 36px;
    backdrop-filter: blur(12px);
  }

  .logo {
    width: 48px; height: 48px; border-radius: 12px;
    background: linear-gradient(135deg, #6366f1, #818cf8);
    display: flex; align-items: center; justify-content: center;
    font-family: 'Geist Mono', monospace;
    font-size: 18px; font-weight: 700; color: #fff;
    margin-bottom: 28px;
    box-shadow: 0 0 24px rgba(99,102,241,0.35);
  }

  .badge {
    display: inline-flex; align-items: center; gap: 7px;
    background: rgba(99,102,241,0.12);
    border: 1px solid rgba(99,102,241,0.25);
    border-radius: 20px;
    padding: 5px 12px;
    font-size: 11px; font-weight: 600;
    color: #a5b4fc;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    margin-bottom: 20px;
  }

  .badge-dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: #6366f1;
    box-shadow: 0 0 6px #6366f1;
    animation: pulse 2s ease infinite;
  }

  @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }

  h1 {
    font-size: 28px; font-weight: 800;
    color: #fff; letter-spacing: -0.03em;
    line-height: 1.15; margin-bottom: 12px;
  }

  .sub {
    font-size: 14px; line-height: 1.7;
    color: rgba(255,255,255,0.45);
    margin-bottom: 32px;
  }

  .divider {
    height: 1px;
    background: rgba(255,255,255,0.07);
    margin: 28px 0;
  }

  .section-label {
    font-size: 10px; font-weight: 600;
    color: rgba(255,255,255,0.25);
    letter-spacing: 0.14em;
    text-transform: uppercase;
    margin-bottom: 14px;
    font-family: 'Geist Mono', monospace;
  }

  .input {
    width: 100%;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.09);
    border-radius: 8px;
    padding: 11px 14px;
    font-size: 13px; font-family: inherit;
    color: #e8eaf0;
    outline: none;
    transition: border-color 0.15s, box-shadow 0.15s;
    margin-bottom: 10px;
  }

  .input::placeholder { color: rgba(255,255,255,0.2); }

  .input:focus {
    border-color: rgba(99,102,241,0.5);
    box-shadow: 0 0 0 3px rgba(99,102,241,0.1);
  }

  textarea.input {
    min-height: 90px; resize: vertical;
    line-height: 1.6;
  }

  .btn {
    width: 100%;
    background: #6366f1;
    color: #fff;
    border: none; border-radius: 8px;
    padding: 12px;
    font-size: 13px; font-weight: 600;
    font-family: inherit;
    cursor: pointer;
    transition: all 0.15s;
    margin-top: 4px;
    letter-spacing: 0.01em;
  }

  .btn:hover { background: #818cf8; transform: translateY(-1px); box-shadow: 0 4px 16px rgba(99,102,241,0.3); }
  .btn:active { transform: translateY(0); }
  .btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; box-shadow: none; }

  .email-link {
    display: flex; align-items: center; gap: 10px;
    padding: 12px 14px;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 8px;
    text-decoration: none;
    color: rgba(255,255,255,0.6);
    font-size: 13px;
    transition: all 0.15s;
  }

  .email-link:hover {
    border-color: rgba(99,102,241,0.3);
    color: #a5b4fc;
    background: rgba(99,102,241,0.06);
  }

  .email-icon {
    width: 32px; height: 32px; border-radius: 8px;
    background: rgba(99,102,241,0.15);
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }

  .success {
    text-align: center; padding: 20px 0;
    animation: fadeIn 0.4s ease;
  }

  @keyframes fadeIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }

  .success-icon {
    font-size: 36px; margin-bottom: 12px;
  }

  .footer {
    position: relative; z-index: 1;
    margin-top: 24px;
    font-size: 11px;
    color: rgba(255,255,255,0.18);
    font-family: 'Geist Mono', monospace;
    letter-spacing: 0.04em;
  }

  @media (max-width: 520px) {
    .card { padding: 28px 22px; }
    h1 { font-size: 24px; }
  }
`;

export default function MaintenancePage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !message) return;
    setSending(true);
    // Simulate send — replace with real endpoint if needed
    await new Promise(r => setTimeout(r, 1200));
    setSending(false);
    setSent(true);
  };

  return (
    <>
      <style>{CSS}</style>
      <div className="wrap">
        <div className="card">
          <div className="logo">UT</div>

          <div className="badge">
            <span className="badge-dot" />
            Maintenance in Progress
          </div>

          <h1>We're upgrading<br />Universal Toolbox</h1>

          <p className="sub">
            We're working hard to improve your experience — new features, better performance, and a fresh look. We'll be back very soon. Thank you for your patience.
          </p>

          <div className="divider" />

          {/* Email contact */}
          <div className="section-label">Direct Contact</div>
          <a href="mailto:alphariansamuel@gmail.com" className="email-link">
            <div className="email-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#a5b4fc" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            </div>
            <div>
              <div style={{ fontWeight: 600, fontSize: 12, color: "#e8eaf0", marginBottom: 1 }}>Email Samuel</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>alphariansamuel@gmail.com</div>
            </div>
          </a>

          <div className="divider" />

          {/* Enquiry form */}
          <div className="section-label">Leave a Message</div>

          {sent ? (
            <div className="success">
              <div className="success-icon">✅</div>
              <div style={{ fontWeight: 700, fontSize: 15, color: "#fff", marginBottom: 6 }}>Message received!</div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)" }}>We'll get back to you as soon as possible.</div>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <input
                className="input"
                type="text"
                placeholder="Your name (optional)"
                value={name}
                onChange={e => setName(e.target.value)}
              />
              <input
                className="input"
                type="email"
                placeholder="Your email address *"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
              <textarea
                className="input"
                placeholder="Your message or enquiry *"
                value={message}
                onChange={e => setMessage(e.target.value)}
                required
              />
              <button className="btn" type="submit" disabled={sending}>
                {sending ? "Sending…" : "Send Message →"}
              </button>
            </form>
          )}
        </div>

        <div className="footer">
          Universal Toolbox · Built by Samuel Mensah · alpha-1-design
        </div>
      </div>
    </>
  );
}
