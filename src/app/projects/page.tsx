"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { getProjects, type Project } from "@/lib/supabase";

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
  amber:      "#F59E0B",
  amberDim:   "rgba(245,158,11,0.12)",
};

const CATEGORIES = ["All", "Network", "Web Dev", "IT Support", "Cybersecurity"];

export default function ProjectsPage() {
  const [projects, setProjects]     = useState<Project[]>([]);
  const [loading, setLoading]       = useState(true);
  const [activeFilter, setFilter]   = useState("All");
  const [selected, setSelected]     = useState<Project | null>(null);
  const [galleryIndex, setGallery]  = useState(0);

  useEffect(() => {
    getProjects().then((data) => {
      setProjects(data);
      setLoading(false);
    });
  }, []);

  const filtered = projects.filter(
    (p) => activeFilter === "All" || p.category === activeFilter
  );

  // Close modal on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Lock scroll when modal open
  useEffect(() => {
    document.body.style.overflow = selected ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [selected]);

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
            Portfolio
          </p>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(2rem, 5vw, 3.5rem)", color: T.text, letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: "1rem" }}>
            Projects & work
          </h1>
          <div style={{ width: "2.5rem", height: "3px", background: T.cyan, borderRadius: "2px", marginBottom: "1.25rem", boxShadow: `0 0 10px rgba(0,212,255,0.4)` }} />
          <p style={{ fontSize: "0.925rem", color: T.muted, maxWidth: "500px", lineHeight: 1.8, fontWeight: 300 }}>
            A live showcase of networks designed, applications built, and infrastructure delivered.
            Updated as new work is completed.
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
                onClick={() => setFilter(cat)}
                style={{
                  padding: "0.45rem 1.1rem", borderRadius: "100px",
                  fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase",
                  border: `1px solid ${activeFilter === cat ? T.cyanBorder : T.border}`,
                  background: activeFilter === cat ? T.cyanDim : "transparent",
                  color: activeFilter === cat ? T.cyan : T.muted,
                  transition: "all 0.2s", cursor: "pointer", whiteSpace: "nowrap",
                }}
              >
                {cat}
                {cat !== "All" && (
                  <span style={{ marginLeft: "0.4rem", fontSize: "0.6rem", opacity: 0.7 }}>
                    ({projects.filter(p => p.category === cat).length})
                  </span>
                )}
              </button>
            ))}
            {/* Total count */}
            <span style={{ marginLeft: "auto", fontSize: "0.72rem", color: T.dim, alignSelf: "center", whiteSpace: "nowrap", paddingRight: "0.5rem" }}>
              {filtered.length} project{filtered.length !== 1 ? "s" : ""}
            </span>
          </div>
        </div>
      </div>

      {/* ── PROJECT GRID ─────────────────────────────────────── */}
      <section style={{ padding: "4rem 0" }}>
        <div className="site-wrap">

          {/* Loading skeleton */}
          {loading && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1.25rem" }} className="proj-grid">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: "4px", overflow: "hidden" }}>
                  <div className="skeleton" style={{ width: "100%", aspectRatio: "16/9" }} />
                  <div style={{ padding: "1.75rem" }}>
                    <div className="skeleton" style={{ height: "14px", width: "60%", marginBottom: "0.75rem" }} />
                    <div className="skeleton" style={{ height: "20px", width: "80%", marginBottom: "0.5rem" }} />
                    <div className="skeleton" style={{ height: "14px", width: "100%", marginBottom: "0.25rem" }} />
                    <div className="skeleton" style={{ height: "14px", width: "75%" }} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty state */}
          {!loading && filtered.length === 0 && (
            <div style={{ textAlign: "center", padding: "6rem 2rem" }}>
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📂</div>
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.25rem", color: T.text, marginBottom: "0.625rem" }}>
                No projects yet
              </h3>
              <p style={{ fontSize: "0.875rem", color: T.muted }}>
                {activeFilter === "All"
                  ? "Projects are being added — check back soon."
                  : `No ${activeFilter} projects added yet. Check back soon.`}
              </p>
            </div>
          )}

          {/* Project cards */}
          {!loading && filtered.length > 0 && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1.25rem" }} className="proj-grid">
              {filtered.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onClick={() => { setSelected(project); setGallery(0); }}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── PROJECT MODAL ────────────────────────────────────── */}
      {selected && (
        <div
          style={{
            position: "fixed", inset: 0, zIndex: 1000,
            background: "rgba(11,17,32,0.92)",
            backdropFilter: "blur(12px)",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: "1.5rem",
            animation: "fadeIn 0.2s ease",
          }}
          onClick={() => setSelected(null)}
        >
          <div
            style={{
              background: T.card, border: `1px solid ${T.cyanBorder}`,
              borderRadius: "6px", width: "100%", maxWidth: "780px",
              maxHeight: "90vh", overflowY: "auto",
              boxShadow: `0 24px 80px rgba(0,0,0,0.6), 0 0 40px rgba(0,212,255,0.06)`,
            }}
            onClick={(e) => e.stopPropagation()}
            className="hide-scrollbar"
          >
            {/* Image gallery */}
            <div style={{ position: "relative", width: "100%", aspectRatio: "16/9", background: T.surface, overflow: "hidden" }}>
              {selected.cover_image_url || selected.images?.[galleryIndex] ? (
                <Image
                  src={selected.images?.[galleryIndex] || selected.cover_image_url!}
                  alt={selected.title}
                  fill
                  style={{ objectFit: "cover" }}
                />
              ) : (
                <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: "3rem", marginBottom: "0.5rem" }}>🖼️</div>
                    <p style={{ fontSize: "0.75rem", color: T.dim }}>No images yet</p>
                  </div>
                </div>
              )}

              {/* Gallery dots */}
              {selected.images && selected.images.length > 1 && (
                <div style={{
                  position: "absolute", bottom: "1rem", left: "50%", transform: "translateX(-50%)",
                  display: "flex", gap: "0.4rem",
                }}>
                  {selected.images.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setGallery(i)}
                      style={{
                        width: "8px", height: "8px", borderRadius: "50%",
                        background: i === galleryIndex ? T.cyan : "rgba(255,255,255,0.4)",
                        border: "none", cursor: "pointer", transition: "all 0.2s",
                        boxShadow: i === galleryIndex ? `0 0 8px ${T.cyan}` : "none",
                      }}
                    />
                  ))}
                </div>
              )}

              {/* Gallery arrows */}
              {selected.images && selected.images.length > 1 && (
                <>
                  <button onClick={() => setGallery((g) => Math.max(0, g - 1))}
                    style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", width: "36px", height: "36px", borderRadius: "50%", background: "rgba(11,17,32,0.8)", border: `1px solid ${T.border}`, color: T.text, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", opacity: galleryIndex === 0 ? 0.3 : 1 }}>
                    ‹
                  </button>
                  <button onClick={() => setGallery((g) => Math.min(selected.images.length - 1, g + 1))}
                    style={{ position: "absolute", right: "0.75rem", top: "50%", transform: "translateY(-50%)", width: "36px", height: "36px", borderRadius: "50%", background: "rgba(11,17,32,0.8)", border: `1px solid ${T.border}`, color: T.text, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", opacity: galleryIndex === selected.images.length - 1 ? 0.3 : 1 }}>
                    ›
                  </button>
                </>
              )}

              {/* Close button */}
              <button
                onClick={() => setSelected(null)}
                style={{
                  position: "absolute", top: "0.75rem", right: "0.75rem",
                  width: "32px", height: "32px", borderRadius: "50%",
                  background: "rgba(11,17,32,0.85)", border: `1px solid ${T.border}`,
                  color: T.muted, display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer", fontSize: "1rem",
                }}
              >
                ✕
              </button>

              {/* Category badge */}
              <div style={{ position: "absolute", top: "0.75rem", left: "0.75rem" }}>
                <span style={{
                  fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase",
                  padding: "0.25rem 0.625rem", borderRadius: "100px",
                  background: T.cyanDim, color: T.cyan, border: `1px solid ${T.cyanBorder}`,
                }}>
                  {selected.category}
                </span>
              </div>
            </div>

            {/* Modal body */}
            <div style={{ padding: "2rem" }}>
              {selected.featured && (
                <div style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", marginBottom: "0.875rem", fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: T.amber, padding: "0.25rem 0.625rem", background: T.amberDim, border: `1px solid rgba(245,158,11,0.2)`, borderRadius: "100px" }}>
                  ⭐ Featured Project
                </div>
              )}

              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.5rem", color: T.text, letterSpacing: "-0.02em", marginBottom: "0.875rem" }}>
                {selected.title}
              </h2>

              <p style={{ fontSize: "0.9rem", color: T.muted, lineHeight: 1.8, fontWeight: 300, marginBottom: "1.5rem" }}>
                {selected.description}
              </p>

              {/* Tags */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1.75rem" }}>
                {selected.tags.map((tag) => (
                  <span key={tag} style={{
                    fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase",
                    padding: "0.3rem 0.75rem", borderRadius: "100px",
                    background: "rgba(255,255,255,0.04)", color: T.dim, border: `1px solid ${T.border}`,
                  }}>
                    {tag}
                  </span>
                ))}
              </div>

              {/* Action buttons */}
              <div style={{ display: "flex", gap: "0.875rem", flexWrap: "wrap" }}>
                {selected.live_url && (
                  <a
                    href={selected.live_url} target="_blank" rel="noopener noreferrer"
                    style={{
                      display: "inline-flex", alignItems: "center", gap: "0.5rem",
                      background: T.cyan, color: "#0B1120",
                      fontFamily: "var(--font-body)", fontSize: "0.72rem", fontWeight: 700,
                      letterSpacing: "0.15em", textTransform: "uppercase",
                      padding: "0.75rem 1.75rem", borderRadius: "2px",
                      boxShadow: `0 0 20px rgba(0,212,255,0.2)`,
                    }}
                  >
                    <ExternalIcon /> View Live Site
                  </a>
                )}
                <button
                  onClick={() => setSelected(null)}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "0.5rem",
                    background: "transparent", color: T.muted,
                    fontFamily: "var(--font-body)", fontSize: "0.72rem", fontWeight: 500,
                    letterSpacing: "0.15em", textTransform: "uppercase",
                    padding: "0.75rem 1.75rem", borderRadius: "2px",
                    border: `1px solid ${T.border}`, cursor: "pointer",
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .proj-grid { grid-template-columns: 1fr !important; }
        }
        .skeleton {
          background: linear-gradient(90deg, #1A2235 25%, #1F2A40 50%, #1A2235 75%);
          background-size: 200% 100%;
          animation: shimmer 1.8s infinite;
          border-radius: 2px;
        }
      `}</style>
    </div>
  );
}

// ── PROJECT CARD ──────────────────────────────────────────────────────────────
function ProjectCard({ project, onClick }: { project: Project; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: T.card, border: `1px solid ${hovered ? T.cyanBorder : T.border}`,
        borderRadius: "4px", overflow: "hidden", cursor: "pointer",
        transition: "all 0.25s",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        boxShadow: hovered ? `0 12px 40px rgba(0,0,0,0.4), 0 0 0 1px ${T.cyanBorder}` : "none",
      }}
    >
      {/* Cover image */}
      <div style={{ position: "relative", width: "100%", aspectRatio: "16/9", background: T.surface, overflow: "hidden" }}>
        {project.cover_image_url ? (
          <Image
            src={project.cover_image_url}
            alt={project.title}
            fill
            style={{ objectFit: "cover", transition: "transform 0.4s ease", transform: hovered ? "scale(1.04)" : "scale(1)" }}
          />
        ) : (
          <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: `linear-gradient(135deg, ${T.card}, #0D1929)` }}>
            <span style={{ fontSize: "2.5rem", opacity: 0.4 }}>📁</span>
          </div>
        )}

        {/* Overlay on hover */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(11,17,32,0.7), transparent)",
          opacity: hovered ? 1 : 0, transition: "opacity 0.3s",
          display: "flex", alignItems: "flex-end", padding: "1rem",
        }}>
          <span style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: T.cyan }}>
            Click to view →
          </span>
        </div>

        {/* Top badges */}
        <div style={{ position: "absolute", top: "0.75rem", left: "0.75rem", display: "flex", gap: "0.4rem" }}>
          <span style={{
            fontSize: "0.62rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase",
            padding: "0.2rem 0.6rem", borderRadius: "100px",
            background: T.cyanDim, color: T.cyan, border: `1px solid ${T.cyanBorder}`,
          }}>
            {project.category}
          </span>
          {project.featured && (
            <span style={{
              fontSize: "0.62rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase",
              padding: "0.2rem 0.6rem", borderRadius: "100px",
              background: "rgba(245,158,11,0.15)", color: "#F59E0B", border: "1px solid rgba(245,158,11,0.2)",
            }}>
              ⭐ Featured
            </span>
          )}
        </div>

        {/* Image count */}
        {project.images && project.images.length > 1 && (
          <span style={{
            position: "absolute", top: "0.75rem", right: "0.75rem",
            fontSize: "0.62rem", fontWeight: 600, color: T.muted,
            padding: "0.2rem 0.6rem", background: "rgba(11,17,32,0.8)",
            border: `1px solid ${T.border}`, borderRadius: "100px",
          }}>
            🖼 {project.images.length}
          </span>
        )}
      </div>

      {/* Card body */}
      <div style={{ padding: "1.5rem" }}>
        <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.05rem", color: T.text, marginBottom: "0.5rem", letterSpacing: "-0.01em" }}>
          {project.title}
        </h3>
        <p style={{ fontSize: "0.845rem", color: T.muted, lineHeight: 1.7, fontWeight: 300, marginBottom: "1.25rem", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
          {project.description}
        </p>

        {/* Tags row */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem", marginBottom: "1.25rem" }}>
          {project.tags.slice(0, 4).map((tag) => (
            <span key={tag} style={{
              fontSize: "0.62rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase",
              padding: "0.2rem 0.6rem", borderRadius: "100px",
              background: "rgba(255,255,255,0.04)", color: T.dim, border: `1px solid ${T.border}`,
            }}>
              {tag}
            </span>
          ))}
          {project.tags.length > 4 && (
            <span style={{ fontSize: "0.62rem", color: T.dim, alignSelf: "center" }}>
              +{project.tags.length - 4} more
            </span>
          )}
        </div>

        {/* Footer */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "1rem", borderTop: `1px solid ${T.border}` }}>
          <span style={{ fontSize: "0.7rem", color: T.cyan, fontWeight: 600, letterSpacing: "0.05em" }}>
            View details →
          </span>
          {project.live_url && (
            <a
              href={project.live_url} target="_blank" rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              style={{ fontSize: "0.68rem", color: T.dim, display: "flex", alignItems: "center", gap: "0.3rem" }}
            >
              <ExternalIcon /> Live
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

const T_amber = "rgba(245,158,11,0.12)";
const T_amberDim = "rgba(245,158,11,0.12)";
// suppress unused warning
void T_amber; void T_amberDim;

function ExternalIcon() {
  return <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/></svg>;
}