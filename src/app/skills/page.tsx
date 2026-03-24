"use client";

import { useState } from "react";
import { SKILL_GROUPS } from "@/lib/data";

const T = {
  base:       "#0B1120",
  surface:    "#111827",
  card:       "#1A2235",
  cardHover:  "#1F2A40",
  cyan:       "#00D4FF",
  cyanDim:    "rgba(0,212,255,0.12)",
  cyanBorder: "rgba(0,212,255,0.2)",
  blue:       "#0EA5E9",
  blueDim:    "rgba(14,165,233,0.12)",
  text:       "#E2E8F0",
  muted:      "#94A3B8",
  dim:        "#64748B",
  border:     "rgba(255,255,255,0.07)",
  green:      "#10B981",
  greenDim:   "rgba(16,185,129,0.12)",
  amber:      "#F59E0B",
  amberDim:   "rgba(245,158,11,0.12)",
};

const CATEGORIES = ["All", "Network", "Web Dev", "IT Support", "Cybersecurity"];

const CATEGORY_MAP: Record<string, string> = {
  "Network Architecture":       "Network",
  "IT Support & Infrastructure":"IT Support",
  "Web Development":            "Web Dev",
  "Cybersecurity":              "Cybersecurity",
};

const TOOLS = [
  { name: "Cisco Packet Tracer", cat: "Network",       icon: "🌐" },
  { name: "Wireshark",           cat: "Cybersecurity", icon: "🔍" },
  { name: "Nmap",                cat: "Cybersecurity", icon: "🔐" },
  { name: "IBM QRadar",          cat: "Cybersecurity", icon: "🛡️" },
  { name: "Next.js",             cat: "Web Dev",       icon: "💻" },
  { name: "Supabase",            cat: "Web Dev",       icon: "🗄️" },
  { name: "VS Code",             cat: "Web Dev",       icon: "⚡" },
  { name: "Windows Server",      cat: "IT Support",    icon: "🖥️" },
  { name: "Active Directory",    cat: "IT Support",    icon: "👥" },
  { name: "VMware",              cat: "IT Support",    icon: "☁️" },
  { name: "Git / GitHub",        cat: "Web Dev",       icon: "🐙" },
  { name: "Postman",             cat: "Web Dev",       icon: "📡" },
  { name: "GNS3",                cat: "Network",       icon: "🔧" },
  { name: "pfSense",             cat: "Network",       icon: "🔥" },
  { name: "Linux (Ubuntu)",      cat: "IT Support",    icon: "🐧" },
  { name: "Metasploit",          cat: "Cybersecurity", icon: "💀" },
];

export default function SkillsPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredSkills = SKILL_GROUPS.filter((g) =>
    activeFilter === "All" || CATEGORY_MAP[g.category] === activeFilter
  );

  const filteredTools = TOOLS.filter((t) =>
    activeFilter === "All" || t.cat === activeFilter
  );

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
            Skills & Expertise
          </p>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(2rem, 5vw, 3.5rem)", color: T.text, letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: "1rem" }}>
            My technical toolkit
          </h1>
          <div style={{ width: "2.5rem", height: "3px", background: T.cyan, borderRadius: "2px", marginBottom: "1.25rem", boxShadow: `0 0 10px rgba(0,212,255,0.4)` }} />
          <p style={{ fontSize: "0.925rem", color: T.muted, maxWidth: "500px", lineHeight: 1.8, fontWeight: 300 }}>
            A cross-disciplinary skill set built across networking, web development,
            IT infrastructure and cybersecurity.
          </p>
        </div>
      </section>

      {/* ── FILTER TABS ──────────────────────────────────────── */}
      <div style={{ background: T.surface, borderBottom: `1px solid ${T.border}`, position: "sticky", top: "72px", zIndex: 50 }}>
        <div className="site-wrap">
          <div style={{ display: "flex", gap: "0.25rem", padding: "0.75rem 0", overflowX: "auto" }} className="hide-scrollbar">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                style={{
                  padding: "0.45rem 1.1rem",
                  borderRadius: "100px",
                  fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase",
                  border: `1px solid ${activeFilter === cat ? T.cyanBorder : T.border}`,
                  background: activeFilter === cat ? T.cyanDim : "transparent",
                  color: activeFilter === cat ? T.cyan : T.muted,
                  transition: "all 0.2s", cursor: "pointer", whiteSpace: "nowrap",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── SKILL GROUPS ─────────────────────────────────────── */}
      <section style={{ padding: "4rem 0", background: T.base }}>
        <div className="site-wrap">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1.25rem" }} className="skills-grid">
            {filteredSkills.map((group) => (
              <div
                key={group.category}
                style={{
                  background: T.card, border: `1px solid ${T.border}`,
                  borderRadius: "4px", overflow: "hidden", transition: "all 0.25s",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.borderColor = T.cyanBorder;
                  el.style.boxShadow = `0 8px 32px rgba(0,212,255,0.07)`;
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.borderColor = T.border;
                  el.style.boxShadow = "none";
                }}
              >
                {/* Card header */}
                <div style={{
                  padding: "1.5rem 1.75rem",
                  borderBottom: `1px solid ${T.border}`,
                  background: `linear-gradient(135deg, ${T.cardHover}, ${T.card})`,
                  display: "flex", alignItems: "center", gap: "0.875rem",
                }}>
                  <div style={{
                    width: "42px", height: "42px",
                    background: T.cyanDim, border: `1px solid ${T.cyanBorder}`,
                    borderRadius: "10px", display: "flex", alignItems: "center",
                    justifyContent: "center", fontSize: "1.25rem", flexShrink: 0,
                  }}>
                    {group.icon}
                  </div>
                  <div>
                    <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.95rem", color: T.text, letterSpacing: "-0.01em" }}>
                      {group.category}
                    </h3>
                    <p style={{ fontSize: "0.7rem", color: T.dim, marginTop: "0.15rem" }}>
                      {group.items.length} skills
                    </p>
                  </div>
                </div>

                {/* Skill items */}
                <div style={{ padding: "1.5rem 1.75rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {group.items.map((skill, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      <span style={{
                        width: "5px", height: "5px", borderRadius: "50%",
                        background: T.cyan, flexShrink: 0,
                        boxShadow: `0 0 6px rgba(0,212,255,0.5)`,
                      }} />
                      <span style={{ fontSize: "0.875rem", color: T.muted, fontWeight: 300 }}>
                        {skill}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {filteredSkills.length === 0 && (
            <div style={{ textAlign: "center", padding: "4rem", color: T.dim }}>
              <p style={{ fontSize: "0.925rem" }}>No skills in this category yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* ── TOOLS & SOFTWARE ─────────────────────────────────── */}
      <section style={{ padding: "4rem 0", background: T.surface, borderTop: `1px solid ${T.border}` }}>
        <div className="site-wrap">
          <div style={{ marginBottom: "2.5rem" }}>
            <p style={{ fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.28em", textTransform: "uppercase", color: T.cyan, marginBottom: "0.75rem" }}>
              Tools & Software
            </p>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.5rem, 3vw, 2.25rem)", color: T.text, letterSpacing: "-0.02em" }}>
              What I work with
            </h2>
            <div style={{ width: "2.5rem", height: "3px", background: T.cyan, borderRadius: "2px", marginTop: "0.875rem", boxShadow: `0 0 10px rgba(0,212,255,0.4)` }} />
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
            {filteredTools.map((tool) => (
              <div
                key={tool.name}
                style={{
                  display: "inline-flex", alignItems: "center", gap: "0.5rem",
                  padding: "0.625rem 1.1rem",
                  background: T.card, border: `1px solid ${T.border}`,
                  borderRadius: "6px", transition: "all 0.2s", cursor: "default",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.borderColor = T.cyanBorder;
                  el.style.background = T.cyanDim;
                  el.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.borderColor = T.border;
                  el.style.background = T.card;
                  el.style.transform = "translateY(0)";
                }}
              >
                <span style={{ fontSize: "1rem" }}>{tool.icon}</span>
                <span style={{ fontSize: "0.82rem", color: T.muted, fontWeight: 400, whiteSpace: "nowrap" }}>
                  {tool.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CURRENTLY LEARNING ───────────────────────────────── */}
      <section style={{ padding: "4rem 0", background: T.base, borderTop: `1px solid ${T.border}` }}>
        <div className="site-wrap">
          <div style={{ marginBottom: "2.5rem" }}>
            <p style={{ fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.28em", textTransform: "uppercase", color: T.amber, marginBottom: "0.75rem" }}>
              Currently Learning
            </p>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.5rem, 3vw, 2.25rem)", color: T.text, letterSpacing: "-0.02em" }}>
              What&apos;s next on my radar
            </h2>
            <div style={{ width: "2.5rem", height: "3px", background: T.amber, borderRadius: "2px", marginTop: "0.875rem" }} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.25rem" }} className="learning-grid">
            {CURRENTLY_LEARNING.map((item) => (
              <div key={item.title} style={{
                padding: "1.75rem", background: T.card,
                border: `1px solid ${T.border}`, borderRadius: "4px",
                position: "relative", overflow: "hidden",
              }}>
                {/* Amber top line */}
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: `linear-gradient(90deg, ${T.amber}, transparent)` }} />

                <div style={{ fontSize: "1.75rem", marginBottom: "1rem" }}>{item.icon}</div>
                <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.95rem", color: T.text, marginBottom: "0.5rem" }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: "0.82rem", color: T.muted, lineHeight: 1.7, fontWeight: 300, marginBottom: "1.25rem" }}>
                  {item.desc}
                </p>
                {/* Progress indicator */}
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.4rem" }}>
                    <span style={{ fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase", color: T.dim }}>Progress</span>
                    <span style={{ fontSize: "0.65rem", fontWeight: 600, color: T.amber }}>{item.progress}%</span>
                  </div>
                  <div style={{ height: "3px", background: T.border, borderRadius: "2px", overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${item.progress}%`, background: `linear-gradient(90deg, ${T.amber}, #FBBF24)`, borderRadius: "2px", transition: "width 1s ease" }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .skills-grid   { grid-template-columns: 1fr !important; }
          .learning-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

const CURRENTLY_LEARNING = [
  { icon: "🛡️", title: "IBM Cybersecurity Analyst", desc: "Completing the full professional certificate at University of the People — covering threat intelligence, SIEM, and incident response.", progress: 65 },
  { icon: "☁️", title: "Cloud Networking (AWS)",    desc: "Learning AWS VPC, security groups, route tables and hybrid cloud connectivity to extend network skills to the cloud.", progress: 30 },
  { icon: "🐍", title: "Python for Automation",    desc: "Writing Python scripts to automate network tasks, parse logs and build security tooling — bridging networking and development.", progress: 45 },
];