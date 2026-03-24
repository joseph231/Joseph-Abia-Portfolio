"use client";

import { SKILL_GROUPS, PERSON, SOCIALS } from "@/lib/data";

const T = {
  base:       "#0B1120",
  surface:    "#111827",
  card:       "#1A2235",
  cardHover:  "#1F2A40",
  cyan:       "#00D4FF",
  cyanDim:    "rgba(0,212,255,0.12)",
  cyanBorder: "rgba(0,212,255,0.2)",
  blue:       "#0EA5E9",
  text:       "#E2E8F0",
  muted:      "#94A3B8",
  dim:        "#64748B",
  border:     "rgba(255,255,255,0.07)",
  green:      "#10B981",
  greenDim:   "rgba(16,185,129,0.12)",
  amber:      "#F59E0B",
  amberDim:   "rgba(245,158,11,0.12)",
};

export default function ResumePage() {
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
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1.5rem" }}>
            <div>
              <p style={{ fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.28em", textTransform: "uppercase", color: T.cyan, marginBottom: "0.75rem" }}>
                Resume & Cover Letter
              </p>
              <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(2rem, 5vw, 3.5rem)", color: T.text, letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: "1rem" }}>
                {PERSON.name}
              </h1>
              <div style={{ width: "2.5rem", height: "3px", background: T.cyan, borderRadius: "2px", marginBottom: "1.25rem", boxShadow: `0 0 10px rgba(0,212,255,0.4)` }} />
              <p style={{ fontSize: "0.925rem", color: T.muted, maxWidth: "480px", lineHeight: 1.8, fontWeight: 300 }}>
                Network Architect · Web Developer · IT Support Specialist · Cybersecurity Analyst (in progress)
              </p>
            </div>

            {/* Actions */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", alignItems: "flex-end" }}>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex", alignItems: "center", gap: "0.5rem",
                  background: T.cyan, color: "#0B1120",
                  fontFamily: "var(--font-body)", fontSize: "0.72rem", fontWeight: 700,
                  letterSpacing: "0.15em", textTransform: "uppercase",
                  padding: "0.875rem 1.75rem", borderRadius: "2px",
                  boxShadow: `0 0 20px rgba(0,212,255,0.2)`,
                  transition: "opacity 0.2s",
                }}
              >
                <DownloadIcon /> Download Full CV (PDF)
              </a>
              <p style={{ fontSize: "0.72rem", color: T.dim, textAlign: "right" }}>
                Full work history & education in the PDF
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="site-wrap" style={{ padding: "4rem 3rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: "4rem", alignItems: "start" }} className="resume-grid">

          {/* ── LEFT — COVER LETTER + TIMELINE NOTE ──────────── */}
          <div>

            {/* COVER LETTER */}
            <div style={{ marginBottom: "3.5rem" }}>
              <SectionHead label="Cover Letter" icon="✉️" />

              <div style={{
                background: T.card,
                border: `1px solid ${T.border}`,
                borderRadius: "4px",
                overflow: "hidden",
              }}>
                {/* Letter header */}
                <div style={{
                  padding: "2rem 2.25rem 1.5rem",
                  borderBottom: `1px solid ${T.border}`,
                  background: `linear-gradient(135deg, ${T.cardHover}, ${T.card})`,
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem", marginBottom: "1.5rem" }}>
                    <div>
                      <p style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.25rem", color: T.text, letterSpacing: "-0.01em" }}>
                        {PERSON.name}
                      </p>
                      <p style={{ fontSize: "0.78rem", color: T.cyan, marginTop: "0.2rem", fontWeight: 500 }}>
                        Network Architect · Web Developer · Cybersecurity Analyst
                      </p>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <p style={{ fontSize: "0.75rem", color: T.dim, marginBottom: "0.2rem" }}>{PERSON.email}</p>
                      <p style={{ fontSize: "0.75rem", color: T.dim, marginBottom: "0.2rem" }}>{PERSON.whatsapp}</p>
                      <p style={{ fontSize: "0.75rem", color: T.dim }}>{PERSON.location} · Remote · Worldwide</p>
                    </div>
                  </div>

                  {/* Divider line */}
                  <div style={{ height: "1px", background: `linear-gradient(90deg, ${T.cyan}, transparent)`, opacity: 0.3 }} />
                </div>

                {/* Letter body */}
                <div style={{ padding: "2.25rem" }}>
                  <p style={{ fontSize: "0.875rem", color: T.muted, marginBottom: "1.5rem", lineHeight: 1.9, fontWeight: 300 }}>
                    Dear Hiring Manager,
                  </p>

                  <p style={{ fontSize: "0.875rem", color: T.muted, marginBottom: "1.25rem", lineHeight: 1.9, fontWeight: 300 }}>
                    I am a multi-disciplinary technology professional with over five years of hands-on experience
                    spanning network architecture, IT infrastructure, full-stack web development, and cybersecurity.
                    I bring a rare combination of deep networking expertise and modern software development skills
                    that allows me to design, build, and secure complete digital infrastructure — from the physical
                    cable layer all the way to the application layer.
                  </p>

                  <p style={{ fontSize: "0.875rem", color: T.muted, marginBottom: "1.25rem", lineHeight: 1.9, fontWeight: 300 }}>
                    As a <strong style={{ color: T.text, fontWeight: 600 }}>Network Architect and Engineer</strong>, I have
                    designed and deployed enterprise-grade networks for multiple organizations, implementing
                    OSPF routing, VLAN segmentation, firewall policies, and SD-WAN solutions using Cisco
                    infrastructure. Every network I deliver comes with thorough documentation and handover
                    packages to ensure long-term maintainability.
                  </p>

                  <p style={{ fontSize: "0.875rem", color: T.muted, marginBottom: "1.25rem", lineHeight: 1.9, fontWeight: 300 }}>
                    As a <strong style={{ color: T.text, fontWeight: 600 }}>Full-Stack Web Developer</strong>, I have built
                    and launched production-grade web applications including e-commerce platforms with integrated
                    payment gateways, admin dashboards, authentication systems, and real-time data management.
                    My development stack centers around Next.js, TypeScript, Supabase (PostgreSQL), and Tailwind CSS —
                    technologies I apply with professional-level proficiency.
                  </p>

                  <p style={{ fontSize: "0.875rem", color: T.muted, marginBottom: "1.25rem", lineHeight: 1.9, fontWeight: 300 }}>
                    As an <strong style={{ color: T.text, fontWeight: 600 }}>IT Support Specialist</strong>, I have provided
                    Tier 1–2 technical support across Windows Server environments, managing Active Directory,
                    DHCP, DNS, and endpoint configurations for SME clients. I operate with an ITIL-aligned
                    approach, prioritizing clear communication and minimal downtime.
                  </p>

                  <p style={{ fontSize: "0.875rem", color: T.muted, marginBottom: "1.25rem", lineHeight: 1.9, fontWeight: 300 }}>
                    I am currently completing the{" "}
                    <strong style={{ color: T.text, fontWeight: 600 }}>IBM Cybersecurity Analyst Professional Certificate
                    through University of the People</strong>, where I am gaining formal proficiency in
                    vulnerability assessment, SIEM analysis using IBM QRadar, network security, and
                    incident response. This completes my profile as a full-spectrum infrastructure professional
                    who can build systems, run them efficiently, and protect them from threat actors.
                  </p>

                  <p style={{ fontSize: "0.875rem", color: T.muted, marginBottom: "1.25rem", lineHeight: 1.9, fontWeight: 300 }}>
                    What sets me apart is my ability to think across every layer of a technology stack.
                    Most developers do not understand the network layer. Most network engineers cannot build
                    a production web application. I do both — and that cross-disciplinary perspective allows
                    me to solve problems that specialists operating in silos often miss entirely.
                  </p>

                  <p style={{ fontSize: "0.875rem", color: T.muted, marginBottom: "1.25rem", lineHeight: 1.9, fontWeight: 300 }}>
                    I am available for remote and on-site engagements, contract and full-time roles,
                    and am open to opportunities worldwide. I bring strong communication skills,
                    a disciplined work ethic, and a genuine passion for building infrastructure that works.
                  </p>

                  <p style={{ fontSize: "0.875rem", color: T.muted, marginBottom: "2rem", lineHeight: 1.9, fontWeight: 300 }}>
                    I would welcome the opportunity to discuss how my skills and experience align with your
                    organization&apos;s needs. Please find my full CV attached, and feel free to reach out
                    via email or WhatsApp at your convenience.
                  </p>

                  {/* Signature */}
                  <div style={{ borderTop: `1px solid ${T.border}`, paddingTop: "1.5rem" }}>
                    <p style={{ fontSize: "0.875rem", color: T.muted, marginBottom: "1rem", fontWeight: 300 }}>
                      Yours sincerely,
                    </p>
                    <p style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.5rem", color: T.text, letterSpacing: "-0.02em", marginBottom: "0.25rem" }}>
                      {PERSON.name}
                    </p>
                    <p style={{ fontSize: "0.78rem", color: T.cyan, fontWeight: 500, marginBottom: "1.25rem" }}>
                      Network Architect · Web Developer · Cybersecurity Analyst
                    </p>
                    <div style={{ display: "flex", gap: "0.625rem", flexWrap: "wrap" }}>
                      <a href={`mailto:${PERSON.email}`} style={{ fontSize: "0.72rem", color: T.dim, display: "flex", alignItems: "center", gap: "0.3rem" }}>
                        <EmailIcon /> {PERSON.email}
                      </a>
                      <span style={{ color: T.border }}>·</span>
                      <a href={SOCIALS.linkedin} target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.72rem", color: T.dim, display: "flex", alignItems: "center", gap: "0.3rem" }}>
                        <LinkedInIcon /> LinkedIn
                      </a>
                      <span style={{ color: T.border }}>·</span>
                      <a href={SOCIALS.github} target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.72rem", color: T.dim, display: "flex", alignItems: "center", gap: "0.3rem" }}>
                        <GitHubIcon /> GitHub
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* EXPERIENCE & EDUCATION NOTE */}
            <div style={{
              padding: "1.5rem 1.75rem",
              background: T.cyanDim,
              border: `1px solid ${T.cyanBorder}`,
              borderRadius: "4px",
              display: "flex", gap: "1rem", alignItems: "flex-start",
            }}>
              <span style={{ fontSize: "1.25rem", flexShrink: 0 }}>📄</span>
              <div>
                <p style={{ fontSize: "0.875rem", fontWeight: 600, color: T.text, marginBottom: "0.375rem" }}>
                  Full Work History & Education
                </p>
                <p style={{ fontSize: "0.82rem", color: T.muted, lineHeight: 1.7, fontWeight: 300, marginBottom: "1rem" }}>
                  Complete employment history, educational background, references, and detailed project
                  descriptions are included in the downloadable CV PDF.
                </p>
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "0.5rem",
                    background: T.cyan, color: "#0B1120",
                    fontFamily: "var(--font-body)", fontSize: "0.68rem", fontWeight: 700,
                    letterSpacing: "0.15em", textTransform: "uppercase",
                    padding: "0.625rem 1.25rem", borderRadius: "2px",
                  }}
                >
                  <DownloadIcon /> Download Full CV
                </a>
              </div>
            </div>
          </div>

          {/* ── RIGHT SIDEBAR ────────────────────────────────── */}
          <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>

            {/* CONTACT */}
            <div>
              <SectionHead label="Contact" icon="📬" />
              <div style={{ display: "flex", flexDirection: "column" }}>
                {[
                  { label: "Email",        value: PERSON.email,    href: `mailto:${PERSON.email}`                                      },
                  { label: "WhatsApp",     value: PERSON.whatsapp, href: `https://wa.me/${PERSON.whatsapp.replace(/\D/g,"")}`           },
                  { label: "LinkedIn",     value: "josephabia",    href: SOCIALS.linkedin                                               },
                  { label: "GitHub",       value: "joseph231",     href: SOCIALS.github                                                 },
                  { label: "Location",     value: PERSON.location, href: null                                                           },
                  { label: "Availability", value: "Remote · Worldwide", href: null                                                      },
                ].map((item) => (
                  <div key={item.label} style={{ padding: "0.75rem 0", borderBottom: `1px solid ${T.border}` }}>
                    <p style={{ fontSize: "0.62rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: T.dim, marginBottom: "0.2rem" }}>
                      {item.label}
                    </p>
                    {item.href
                      ? <a href={item.href} target={item.href.startsWith("mailto") ? undefined : "_blank"} rel="noopener noreferrer" style={{ fontSize: "0.8rem", color: T.cyan, fontWeight: 500 }}>{item.value}</a>
                      : <p style={{ fontSize: "0.8rem", color: T.muted }}>{item.value}</p>
                    }
                  </div>
                ))}
              </div>
            </div>

            {/* CORE SKILLS */}
            <div>
              <SectionHead label="Core Skills" icon="⚡" />
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                {SKILL_GROUPS.map((group) => (
                  <div key={group.category}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                      <span style={{ fontSize: "0.875rem" }}>{group.icon}</span>
                      <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: T.text }}>
                        {group.category}
                      </p>
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
                      {group.items.slice(0, 5).map((skill) => (
                        <span key={skill} style={{
                          fontSize: "0.62rem", fontWeight: 500,
                          padding: "0.2rem 0.625rem", borderRadius: "100px",
                          background: "rgba(255,255,255,0.04)", color: T.muted,
                          border: `1px solid ${T.border}`,
                        }}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* LANGUAGES */}
            <div>
              <SectionHead label="Languages" icon="🌍" />
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {[
                  { lang: "English", level: "Fluent",   pct: 95, color: T.cyan  },
                  { lang: "Igbo",    level: "Native",   pct: 100, color: T.green },
                  { lang: "German",  level: "Learning", pct: 20,  color: T.amber },
                ].map((l) => (
                  <div key={l.lang}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.35rem" }}>
                      <span style={{ fontSize: "0.82rem", color: T.text, fontWeight: 500 }}>{l.lang}</span>
                      <span style={{ fontSize: "0.68rem", color: T.dim, letterSpacing: "0.08em" }}>{l.level}</span>
                    </div>
                    <div style={{ height: "3px", background: T.border, borderRadius: "2px" }}>
                      <div style={{ height: "100%", width: `${l.pct}%`, background: l.color, borderRadius: "2px", transition: "width 1s ease", boxShadow: `0 0 6px ${l.color}40` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* INTERESTS */}
            <div>
              <SectionHead label="Interests" icon="🎯" />
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                {["Network Security", "Cloud Infrastructure", "Open Source", "Tech Education", "Automation", "CTF Challenges", "Python Scripting", "Web Performance"].map((item) => (
                  <span key={item} style={{
                    fontSize: "0.65rem", fontWeight: 500,
                    padding: "0.3rem 0.75rem", borderRadius: "100px",
                    background: T.cyanDim, color: T.cyan,
                    border: `1px solid ${T.cyanBorder}`,
                  }}>
                    {item}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .resume-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

// ── HELPERS ───────────────────────────────────────────────────────────────────
function SectionHead({ label, icon }: { label: string; icon: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", marginBottom: "1.25rem", paddingBottom: "0.875rem", borderBottom: `1px solid rgba(0,212,255,0.15)` }}>
      <span style={{ fontSize: "1rem" }}>{icon}</span>
      <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.82rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#00D4FF" }}>
        {label}
      </h2>
    </div>
  );
}

function DownloadIcon() { return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>; }
function EmailIcon()    { return <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>; }
function LinkedInIcon() { return <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>; }
function GitHubIcon()   { return <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>; }