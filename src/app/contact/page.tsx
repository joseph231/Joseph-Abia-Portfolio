"use client";

import { useState } from "react";
import Link from "next/link";
import { PERSON, SOCIALS } from "@/lib/data";

const T = {
  base:       "#0B1120",
  surface:    "#111827",
  card:       "#1A2235",
  cardHover:  "#1F2A40",
  cyan:       "#00D4FF",
  cyanDim:    "rgba(0,212,255,0.12)",
  cyanBorder: "rgba(0,212,255,0.2)",
  text:       "#E2E8F0",
  muted:      "#94A3B8",
  dim:        "#64748B",
  border:     "rgba(255,255,255,0.07)",
  green:      "#10B981",
  greenDim:   "rgba(16,185,129,0.12)",
  red:        "#EF4444",
  redDim:     "rgba(239,68,68,0.12)",
};

const SERVICES = [
  "Network Architecture & Design",
  "Network Engineering & Deployment",
  "IT Support & Infrastructure",
  "Full-Stack Web Development",
  "Cybersecurity Consultation",
  "Other",
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name:    "",
    email:   "",
    service: "",
    message: "",
  });
  const [errors, setErrors]   = useState<Record<string, string>>({});
  const [sent, setSent]       = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim())    e.name    = "Your name is required";
    if (!form.email.trim())   e.email   = "Your email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email address";
    if (!form.service)        e.service = "Please select a service";
    if (!form.message.trim()) e.message = "Please write a message";
    else if (form.message.trim().length < 20) e.message = "Message must be at least 20 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    // Build WhatsApp message
    const text = [
      `👋 Hello Joseph, I found you through your portfolio.`,
      ``,
      `*Name:* ${form.name}`,
      `*Email:* ${form.email}`,
      `*Service:* ${form.service}`,
      ``,
      `*Message:*`,
      form.message,
    ].join("\n");

    const waNumber = PERSON.whatsapp.replace(/\D/g, "");
    const waUrl    = `https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`;

    window.open(waUrl, "_blank");
    setSent(true);
  };

  const set = (field: string) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    if (errors[field]) setErrors((err) => ({ ...err, [field]: "" }));
  };

  return (
    <div style={{ background: T.base, minHeight: "100vh" }}>

      {/* ── PAGE HEADER ──────────────────────────────────────── */}
      <section style={{
        background: `linear-gradient(135deg, ${T.base} 0%, #0D1929 60%, ${T.base} 100%)`,
        borderBottom: `1px solid ${T.border}`,
        padding: "5rem 0 4rem",
        position: "relative", overflow: "hidden",
      }}>
        <div aria-hidden style={{
          position: "absolute", inset: 0,
          backgroundImage: `radial-gradient(circle, rgba(0,212,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }} />
        <div aria-hidden style={{
          position: "absolute", top: "-20%", right: 0,
          width: "500px", height: "500px",
          background: "radial-gradient(circle, rgba(0,212,255,0.08) 0%, transparent 65%)",
        }} />

        <div className="site-wrap" style={{ position: "relative", zIndex: 1 }}>
          <p style={{ fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.28em", textTransform: "uppercase", color: T.cyan, marginBottom: "0.75rem" }}>
            Get In Touch
          </p>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(2rem, 5vw, 3.5rem)", color: T.text, letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: "1rem" }}>
            Let&apos;s work together
          </h1>
          <div style={{ width: "2.5rem", height: "3px", background: T.cyan, borderRadius: "2px", marginBottom: "1.25rem", boxShadow: `0 0 10px rgba(0,212,255,0.4)` }} />
          <p style={{ fontSize: "0.925rem", color: T.muted, maxWidth: "480px", lineHeight: 1.8, fontWeight: 300 }}>
            Have a project, a network to design, a site to build, or just want to connect?
            Fill in the form and I&apos;ll get back to you promptly.
          </p>
        </div>
      </section>

      {/* ── MAIN CONTENT ─────────────────────────────────────── */}
      <section style={{ padding: "5rem 0" }}>
        <div className="site-wrap">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "5rem", alignItems: "start" }} className="contact-grid">

            {/* ── FORM ──────────────────────────────────────────── */}
            <div>
              {!sent ? (
                <>
                  <div style={{ marginBottom: "2rem" }}>
                    <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.35rem", color: T.text, letterSpacing: "-0.01em", marginBottom: "0.5rem" }}>
                      Send me a message
                    </h2>
                    <p style={{ fontSize: "0.82rem", color: T.dim, fontWeight: 300 }}>
                      Submitting will open WhatsApp with your message pre-filled — fast and direct.
                    </p>
                  </div>

                  {/* Name + Email row */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }} className="form-2col">
                    <Field
                      label="Full Name"
                      required
                      error={errors.name}
                      placeholder="Joseph Smith"
                    >
                      <input
                        value={form.name}
                        onChange={set("name")}
                        placeholder="Joseph Smith"
                        style={inputStyle(!!errors.name)}
                      />
                    </Field>
                    <Field
                      label="Email Address"
                      required
                      error={errors.email}
                    >
                      <input
                        type="email"
                        value={form.email}
                        onChange={set("email")}
                        placeholder="you@company.com"
                        style={inputStyle(!!errors.email)}
                      />
                    </Field>
                  </div>

                  {/* Service */}
                  <div style={{ marginBottom: "1rem" }}>
                    <Field label="Service Needed" required error={errors.service}>
                      <select
                        value={form.service}
                        onChange={set("service")}
                        style={{ ...inputStyle(!!errors.service), color: form.service ? T.text : T.dim }}
                      >
                        <option value="" disabled>Select a service...</option>
                        {SERVICES.map((s) => (
                          <option key={s} value={s} style={{ background: T.card, color: T.text }}>{s}</option>
                        ))}
                      </select>
                    </Field>
                  </div>

                  {/* Message */}
                  <div style={{ marginBottom: "2rem" }}>
                    <Field label="Your Message" required error={errors.message}>
                      <textarea
                        value={form.message}
                        onChange={set("message")}
                        placeholder="Tell me about your project, what you need, timeline, budget — the more detail the better..."
                        rows={6}
                        style={{ ...inputStyle(!!errors.message), resize: "vertical", minHeight: "140px" }}
                      />
                    </Field>
                    <p style={{ fontSize: "0.68rem", color: T.dim, marginTop: "0.375rem" }}>
                      Minimum 20 characters · {form.message.length} typed
                    </p>
                  </div>

                  {/* Submit */}
                  <button
                    onClick={handleSubmit}
                    style={{
                      display: "inline-flex", alignItems: "center", gap: "0.625rem",
                      background: T.cyan, color: "#0B1120",
                      fontFamily: "var(--font-body)", fontSize: "0.75rem", fontWeight: 700,
                      letterSpacing: "0.15em", textTransform: "uppercase",
                      padding: "1rem 2.5rem", borderRadius: "2px", border: "none",
                      cursor: "pointer", transition: "all 0.2s",
                      boxShadow: `0 0 24px rgba(0,212,255,0.25)`,
                      width: "100%", justifyContent: "center",
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = "0.88"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = "1"; }}
                  >
                    <WhatsAppIcon />
                    Send via WhatsApp
                  </button>

                  <p style={{ fontSize: "0.72rem", color: T.dim, textAlign: "center", marginTop: "0.875rem" }}>
                    Opens WhatsApp with your message pre-filled. No account needed on your end.
                  </p>
                </>
              ) : (
                /* SUCCESS STATE */
                <div style={{
                  textAlign: "center", padding: "5rem 2rem",
                  background: T.card, border: `1px solid ${T.cyanBorder}`,
                  borderRadius: "4px",
                }}>
                  <div style={{ fontSize: "3.5rem", marginBottom: "1.25rem" }}>✅</div>
                  <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.75rem", color: T.text, marginBottom: "0.75rem", letterSpacing: "-0.02em" }}>
                    WhatsApp opened!
                  </h2>
                  <p style={{ fontSize: "0.925rem", color: T.muted, maxWidth: "380px", margin: "0 auto 2rem", lineHeight: 1.8, fontWeight: 300 }}>
                    Your message is pre-filled. Just hit Send in WhatsApp and I&apos;ll get back to you as soon as possible.
                  </p>
                  <div style={{ display: "flex", gap: "0.875rem", justifyContent: "center", flexWrap: "wrap" }}>
                    <button
                      onClick={() => { setForm({ name: "", email: "", service: "", message: "" }); setSent(false); }}
                      style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: T.cyanDim, color: T.cyan, fontFamily: "var(--font-body)", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", padding: "0.875rem 1.75rem", borderRadius: "2px", border: `1px solid ${T.cyanBorder}`, cursor: "pointer" }}
                    >
                      Send Another Message
                    </button>
                    <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "transparent", color: T.muted, fontFamily: "var(--font-body)", fontSize: "0.72rem", fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", padding: "0.875rem 1.75rem", borderRadius: "2px", border: `1px solid ${T.border}` }}>
                      Back to Home
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* ── SIDEBAR ───────────────────────────────────────── */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>

              {/* Direct contact cards */}
              {[
                {
                  icon:    <WhatsAppIcon size={20} />,
                  label:   "WhatsApp",
                  value:   PERSON.whatsapp,
                  note:    "Fastest response — usually within the hour",
                  href:    SOCIALS.whatsapp,
                  color:   T.green,
                  colorDim: T.greenDim,
                },
                {
                  icon:    <EmailIcon size={20} />,
                  label:   "Email",
                  value:   PERSON.email,
                  note:    "For formal enquiries and documentation",
                  href:    `mailto:${PERSON.email}`,
                  color:   T.cyan,
                  colorDim: T.cyanDim,
                },
              ].map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  style={{
                    display: "block", padding: "1.5rem",
                    background: T.card, border: `1px solid ${T.border}`,
                    borderRadius: "4px", transition: "all 0.2s", textDecoration: "none",
                  }}
                  onMouseEnter={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = c.color + "44"; el.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = T.border; el.style.transform = "translateY(0)"; }}
                >
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
                    <div style={{ width: "40px", height: "40px", borderRadius: "8px", background: c.colorDim, display: "flex", alignItems: "center", justifyContent: "center", color: c.color, flexShrink: 0 }}>
                      {c.icon}
                    </div>
                    <div>
                      <p style={{ fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: T.dim, marginBottom: "0.2rem" }}>
                        {c.label}
                      </p>
                      <p style={{ fontSize: "0.875rem", color: T.text, fontWeight: 500, marginBottom: "0.3rem" }}>
                        {c.value}
                      </p>
                      <p style={{ fontSize: "0.75rem", color: T.dim, fontWeight: 300 }}>
                        {c.note}
                      </p>
                    </div>
                  </div>
                </a>
              ))}

              {/* Social links */}
              <div style={{ padding: "1.5rem", background: T.card, border: `1px solid ${T.border}`, borderRadius: "4px" }}>
                <p style={{ fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: T.dim, marginBottom: "1rem" }}>
                  Find me online
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {[
                    { label: "LinkedIn",  href: SOCIALS.linkedin,  icon: <LinkedInIcon /> },
                    { label: "GitHub",    href: SOCIALS.github,    icon: <GitHubIcon />   },
                    { label: "Instagram", href: SOCIALS.instagram, icon: <InstaIcon />    },
                  ].map((s) => (
                    <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                      style={{ display: "flex", alignItems: "center", gap: "0.75rem", fontSize: "0.875rem", color: T.muted, transition: "color 0.2s" }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = T.cyan; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = T.muted; }}
                    >
                      <span style={{ color: T.dim }}>{s.icon}</span>
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>

              {/* Availability badge */}
              <div style={{
                padding: "1.25rem 1.5rem",
                background: T.greenDim, border: "1px solid rgba(16,185,129,0.2)",
                borderRadius: "4px", display: "flex", alignItems: "center", gap: "0.875rem",
              }}>
                <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: T.green, flexShrink: 0, animation: "pulse-dot 2s ease-in-out infinite", boxShadow: `0 0 8px ${T.green}` }} />
                <div>
                  <p style={{ fontSize: "0.78rem", fontWeight: 600, color: T.green, marginBottom: "0.15rem" }}>
                    Currently available
                  </p>
                  <p style={{ fontSize: "0.72rem", color: T.dim, fontWeight: 300 }}>
                    Open to new projects and opportunities
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; }
          .form-2col    { grid-template-columns: 1fr !important; }
        }
        select option { background: #1A2235; color: #E2E8F0; }
      `}</style>
    </div>
  );
}

// ── FIELD WRAPPER ─────────────────────────────────────────────────────────────
function Field({ label, required, error, children }: {
  label: string; required?: boolean; error?: string; placeholder?: string; children: React.ReactNode;
}) {
  return (
    <div>
      <label style={{ display: "block", fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "#64748B", marginBottom: "0.5rem" }}>
        {label}{required && <span style={{ color: "#00D4FF", marginLeft: "2px" }}>*</span>}
      </label>
      {children}
      {error && (
        <p style={{ fontSize: "0.72rem", color: "#EF4444", marginTop: "0.35rem", display: "flex", alignItems: "center", gap: "0.3rem" }}>
          ⚠ {error}
        </p>
      )}
    </div>
  );
}

// ── SHARED INPUT STYLE ────────────────────────────────────────────────────────
function inputStyle(hasError: boolean): React.CSSProperties {
  return {
    width: "100%",
    padding: "0.875rem 1rem",
    background: "#1A2235",
    border: `1px solid ${hasError ? "rgba(239,68,68,0.5)" : "rgba(255,255,255,0.07)"}`,
    color: "#E2E8F0",
    fontSize: "0.875rem",
    borderRadius: "4px",
    fontFamily: "var(--font-body)",
    outline: "none",
    transition: "border-color 0.2s, box-shadow 0.2s",
  };
}

// ── ICONS ─────────────────────────────────────────────────────────────────────
function WhatsAppIcon({ size = 15 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>;
}
function EmailIcon({ size = 15 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>;
}
function LinkedInIcon() { return <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>; }
function GitHubIcon()   { return <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>; }
function InstaIcon()    { return <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>; }