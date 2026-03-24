"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { supabase, type Project } from "@/lib/supabase";

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
  red:        "#EF4444",
  redDim:     "rgba(239,68,68,0.12)",
  green:      "#10B981",
  greenDim:   "rgba(16,185,129,0.12)",
};

const BLANK = {
  title:           "",
  category:        "Web Dev" as Project["category"],
  description:     "",
  cover_image_url: null as string | null,
  images:          [] as string[],
  live_url:        null as string | null,
  tags:            [] as string[],
  featured:        false,
  order:           0,
};

export default function AdminProjectsPage() {
  const [projects, setProjects]     = useState<Project[]>([]);
  const [loading, setLoading]       = useState(true);
  const [form, setForm]             = useState(BLANK);
  const [editingId, setEditingId]   = useState<string | null>(null);
  const [saving, setSaving]         = useState(false);
  const [uploading, setUploading]   = useState(false);
  const [tagInput, setTagInput]     = useState("");
  const [toast, setToast]           = useState<{ msg: string; type: "success" | "error" } | null>(null);
  const [deleteId, setDeleteId]     = useState<string | null>(null);
  const [showForm, setShowForm]     = useState(false);
  const fileRef                     = useRef<HTMLInputElement>(null);
  const galleryRef                  = useRef<HTMLInputElement>(null);

  const showToast = (msg: string, type: "success" | "error" = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const fetchProjects = async () => {
    const { data } = await supabase.from("projects").select("*").order("order", { ascending: true });
    setProjects((data as Project[]) || []);
    setLoading(false);
  };

  useEffect(() => { fetchProjects(); }, []);

  // ── Upload cover image ───────────────────────────────────
  const uploadCover = async (file: File) => {
    setUploading(true);
    const ext  = file.name.split(".").pop();
    const path = `projects/${Date.now()}-cover.${ext}`;
    const { error } = await supabase.storage.from("project-images").upload(path, file);
    if (error) { showToast("Upload failed: " + error.message, "error"); setUploading(false); return; }
    const { data } = supabase.storage.from("project-images").getPublicUrl(path);
    setForm((f) => ({ ...f, cover_image_url: data.publicUrl }));
    setUploading(false);
    showToast("Cover image uploaded ✓");
  };

  // ── Upload gallery images ────────────────────────────────
  const uploadGallery = async (files: FileList) => {
    setUploading(true);
    const urls: string[] = [];
    for (const file of Array.from(files)) {
      const ext  = file.name.split(".").pop();
      const path = `projects/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error } = await supabase.storage.from("project-images").upload(path, file);
      if (!error) {
        const { data } = supabase.storage.from("project-images").getPublicUrl(path);
        urls.push(data.publicUrl);
      }
    }
    setForm((f) => ({ ...f, images: [...f.images, ...urls] }));
    setUploading(false);
    showToast(`${urls.length} image(s) uploaded ✓`);
  };

  // ── Save project ─────────────────────────────────────────
  const save = async () => {
    if (!form.title || !form.description) { showToast("Title and description required", "error"); return; }
    setSaving(true);
    const payload = { ...form };
    let error;
    if (editingId) {
      ({ error } = await supabase.from("projects").update(payload).eq("id", editingId));
    } else {
      ({ error } = await supabase.from("projects").insert([payload]));
    }
    setSaving(false);
    if (error) { showToast(error.message, "error"); return; }
    showToast(editingId ? "Project updated ✓" : "Project added ✓");
    setForm(BLANK); setEditingId(null); setShowForm(false); setTagInput("");
    fetchProjects();
  };

  // ── Edit project ─────────────────────────────────────────
  const startEdit = (p: Project) => {
    setForm({
      title:           p.title,
      category:        p.category,
      description:     p.description,
      cover_image_url: p.cover_image_url,
      images:          p.images || [],
      live_url:        p.live_url,
      tags:            p.tags || [],
      featured:        p.featured,
      order:           p.order,
    });
    setEditingId(p.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ── Delete project ───────────────────────────────────────
  const confirmDelete = async () => {
    if (!deleteId) return;
    await supabase.from("projects").delete().eq("id", deleteId);
    setDeleteId(null);
    showToast("Project deleted");
    fetchProjects();
  };

  // ── Tag helpers ──────────────────────────────────────────
  const addTag = () => {
    const t = tagInput.trim();
    if (t && !form.tags.includes(t)) setForm((f) => ({ ...f, tags: [...f.tags, t] }));
    setTagInput("");
  };
  const removeTag = (tag: string) => setForm((f) => ({ ...f, tags: f.tags.filter((t) => t !== tag) }));

  const inp = (field: string) => ({
    value: (form as Record<string, unknown>)[field] as string ?? "",
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value })),
    style: {
      width: "100%", padding: "0.75rem 1rem",
      background: T.surface, border: `1px solid ${T.border}`,
      color: T.text, fontSize: "0.875rem", borderRadius: "4px",
      fontFamily: "var(--font-body)", outline: "none",
    } as React.CSSProperties,
  });

  return (
    <div style={{ background: T.base, minHeight: "100vh", padding: "4rem 0 4rem" }}>
      <div className="site-wrap" style={{ maxWidth: "900px" }}>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "2.5rem", gap: "1rem", flexWrap: "wrap" }}>
          <div>
            <p style={{ fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.28em", textTransform: "uppercase", color: T.cyan, marginBottom: "0.25rem" }}>Admin</p>
            <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "2rem", color: T.text, letterSpacing: "-0.02em" }}>
              Manage Projects
            </h1>
          </div>
          <button
            onClick={() => { setForm(BLANK); setEditingId(null); setTagInput(""); setShowForm(!showForm); }}
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              background: showForm ? T.surface : T.cyan,
              color: showForm ? T.muted : "#0B1120",
              fontFamily: "var(--font-body)", fontSize: "0.72rem", fontWeight: 700,
              letterSpacing: "0.15em", textTransform: "uppercase",
              padding: "0.75rem 1.5rem", borderRadius: "2px",
              border: `1px solid ${showForm ? T.border : "transparent"}`,
              cursor: "pointer", transition: "all 0.2s",
            }}
          >
            {showForm ? "✕ Cancel" : "+ Add Project"}
          </button>
        </div>

        {/* ── FORM ───────────────────────────────────────────── */}
        {showForm && (
          <div style={{ background: T.card, border: `1px solid ${T.cyanBorder}`, borderRadius: "6px", padding: "2rem", marginBottom: "2.5rem" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.1rem", color: T.text, marginBottom: "1.75rem" }}>
              {editingId ? "Edit Project" : "Add New Project"}
            </h2>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }} className="form-2col">
              {/* Title */}
              <div>
                <label style={labelStyle}>Project Title *</label>
                <input {...inp("title")} placeholder="e.g. Enterprise Network Redesign" />
              </div>
              {/* Category */}
              <div>
                <label style={labelStyle}>Category *</label>
                <select {...inp("category")}>
                  <option>Web Dev</option>
                  <option>Network</option>
                  <option>IT Support</option>
                  <option>Cybersecurity</option>
                </select>
              </div>
            </div>

            {/* Description */}
            <div style={{ marginBottom: "1rem" }}>
              <label style={labelStyle}>Description *</label>
              <textarea {...inp("description")} placeholder="Describe what you built, the challenge, and the outcome..." rows={4} style={{ ...inp("description").style, resize: "vertical" }} />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }} className="form-2col">
              {/* Live URL */}
              <div>
                <label style={labelStyle}>Live Site URL</label>
                <input {...inp("live_url")} placeholder="https://yourproject.com" />
              </div>
              {/* Order */}
              <div>
                <label style={labelStyle}>Display Order</label>
                <input {...inp("order")} type="number" placeholder="0 = first" />
              </div>
            </div>

            {/* Tags */}
            <div style={{ marginBottom: "1rem" }}>
              <label style={labelStyle}>Tags / Tech Stack</label>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <input
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                  placeholder="Type tag and press Enter or Add"
                  style={{ flex: 1, padding: "0.75rem 1rem", background: T.surface, border: `1px solid ${T.border}`, color: T.text, fontSize: "0.875rem", borderRadius: "4px", fontFamily: "var(--font-body)", outline: "none" }}
                />
                <button onClick={addTag} style={{ padding: "0.75rem 1.25rem", background: T.cyanDim, border: `1px solid ${T.cyanBorder}`, color: T.cyan, borderRadius: "4px", cursor: "pointer", fontSize: "0.82rem", fontWeight: 600 }}>
                  Add
                </button>
              </div>
              {form.tags.length > 0 && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginTop: "0.625rem" }}>
                  {form.tags.map((tag) => (
                    <span key={tag} style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", fontSize: "0.72rem", fontWeight: 600, padding: "0.25rem 0.625rem", background: T.cyanDim, color: T.cyan, border: `1px solid ${T.cyanBorder}`, borderRadius: "100px" }}>
                      {tag}
                      <button onClick={() => removeTag(tag)} style={{ background: "none", border: "none", color: T.cyan, cursor: "pointer", lineHeight: 1, fontSize: "0.9rem" }}>×</button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Cover image upload */}
            <div style={{ marginBottom: "1rem" }}>
              <label style={labelStyle}>Cover Image</label>
              <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                <button
                  onClick={() => fileRef.current?.click()}
                  style={{ padding: "0.75rem 1.25rem", background: T.surface, border: `1px solid ${T.border}`, color: T.muted, borderRadius: "4px", cursor: "pointer", fontSize: "0.82rem", whiteSpace: "nowrap" }}
                >
                  {uploading ? "Uploading..." : "📁 Choose Image"}
                </button>
                <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => e.target.files?.[0] && uploadCover(e.target.files[0])} />
                {form.cover_image_url && (
                  <div style={{ position: "relative", width: "80px", height: "52px", borderRadius: "4px", overflow: "hidden", border: `1px solid ${T.border}` }}>
                    <Image src={form.cover_image_url} alt="cover" fill style={{ objectFit: "cover" }} />
                  </div>
                )}
              </div>
            </div>

            {/* Gallery images upload */}
            <div style={{ marginBottom: "1.5rem" }}>
              <label style={labelStyle}>Gallery Images</label>
              <button
                onClick={() => galleryRef.current?.click()}
                style={{ padding: "0.75rem 1.25rem", background: T.surface, border: `1px solid ${T.border}`, color: T.muted, borderRadius: "4px", cursor: "pointer", fontSize: "0.82rem" }}
              >
                {uploading ? "Uploading..." : "📁 Add Gallery Images (multiple)"}
              </button>
              <input ref={galleryRef} type="file" accept="image/*" multiple style={{ display: "none" }} onChange={(e) => e.target.files && uploadGallery(e.target.files)} />
              {form.images.length > 0 && (
                <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginTop: "0.75rem" }}>
                  {form.images.map((url, i) => (
                    <div key={i} style={{ position: "relative" }}>
                      <div style={{ width: "70px", height: "48px", borderRadius: "3px", overflow: "hidden", border: `1px solid ${T.border}`, position: "relative" }}>
                        <Image src={url} alt={`gallery-${i}`} fill style={{ objectFit: "cover" }} />
                      </div>
                      <button
                        onClick={() => setForm((f) => ({ ...f, images: f.images.filter((_, j) => j !== i) }))}
                        style={{ position: "absolute", top: "-6px", right: "-6px", width: "18px", height: "18px", borderRadius: "50%", background: T.red, border: "none", color: "white", cursor: "pointer", fontSize: "0.6rem", display: "flex", alignItems: "center", justifyContent: "center" }}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Featured toggle */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.75rem" }}>
              <button
                onClick={() => setForm((f) => ({ ...f, featured: !f.featured }))}
                style={{
                  width: "44px", height: "24px", borderRadius: "100px",
                  background: form.featured ? T.cyan : T.surface,
                  border: `1px solid ${form.featured ? T.cyan : T.border}`,
                  position: "relative", cursor: "pointer", transition: "all 0.2s",
                }}
              >
                <span style={{
                  position: "absolute", top: "3px",
                  left: form.featured ? "22px" : "3px",
                  width: "16px", height: "16px", borderRadius: "50%",
                  background: form.featured ? "#0B1120" : T.muted,
                  transition: "left 0.2s",
                }} />
              </button>
              <span style={{ fontSize: "0.875rem", color: T.muted }}>Mark as Featured Project</span>
            </div>

            {/* Save button */}
            <div style={{ display: "flex", gap: "0.75rem" }}>
              <button
                onClick={save}
                disabled={saving}
                style={{
                  display: "inline-flex", alignItems: "center", gap: "0.5rem",
                  background: saving ? T.cyanDim : T.cyan,
                  color: saving ? T.cyan : "#0B1120",
                  fontFamily: "var(--font-body)", fontSize: "0.72rem", fontWeight: 700,
                  letterSpacing: "0.15em", textTransform: "uppercase",
                  padding: "0.875rem 2rem", borderRadius: "2px",
                  border: `1px solid ${saving ? T.cyanBorder : "transparent"}`,
                  cursor: saving ? "not-allowed" : "pointer", transition: "all 0.2s",
                }}
              >
                {saving ? "Saving..." : editingId ? "Update Project" : "Save Project"}
              </button>
              <button
                onClick={() => { setForm(BLANK); setEditingId(null); setShowForm(false); }}
                style={{ padding: "0.875rem 1.5rem", background: "transparent", border: `1px solid ${T.border}`, color: T.muted, borderRadius: "2px", cursor: "pointer", fontSize: "0.72rem", letterSpacing: "0.15em", textTransform: "uppercase" }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* ── PROJECT LIST ─────────────────────────────────────── */}
        <div>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1rem", color: T.muted, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1.25rem" }}>
            All Projects ({projects.length})
          </h2>

          {loading && (
            <p style={{ color: T.dim, fontSize: "0.875rem" }}>Loading...</p>
          )}

          {!loading && projects.length === 0 && (
            <div style={{ textAlign: "center", padding: "4rem", background: T.card, border: `1px solid ${T.border}`, borderRadius: "4px" }}>
              <p style={{ color: T.dim, fontSize: "0.875rem" }}>No projects yet. Add your first one above.</p>
            </div>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {projects.map((p) => (
              <div key={p.id} style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: "4px", padding: "1.25rem 1.5rem", display: "flex", gap: "1rem", alignItems: "center" }}>
                {/* Thumb */}
                <div style={{ width: "64px", height: "44px", borderRadius: "3px", overflow: "hidden", background: T.surface, flexShrink: 0, position: "relative" }}>
                  {p.cover_image_url
                    ? <Image src={p.cover_image_url} alt={p.title} fill style={{ objectFit: "cover" }} />
                    : <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ fontSize: "1.25rem", opacity: 0.3 }}>📁</span></div>
                  }
                </div>
                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.2rem" }}>
                    <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.95rem", color: T.text, letterSpacing: "-0.01em" }}>
                      {p.title}
                    </h3>
                    {p.featured && <span style={{ fontSize: "0.6rem", background: "rgba(245,158,11,0.15)", color: "#F59E0B", padding: "0.15rem 0.5rem", borderRadius: "100px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>Featured</span>}
                  </div>
                  <span style={{ fontSize: "0.72rem", color: T.dim }}>{p.category} · {p.tags.slice(0, 3).join(", ")}</span>
                </div>
                {/* Actions */}
                <div style={{ display: "flex", gap: "0.5rem", flexShrink: 0 }}>
                  <button onClick={() => startEdit(p)} style={{ padding: "0.4rem 0.875rem", background: T.cyanDim, border: `1px solid ${T.cyanBorder}`, color: T.cyan, borderRadius: "3px", cursor: "pointer", fontSize: "0.72rem", fontWeight: 600 }}>
                    Edit
                  </button>
                  <button onClick={() => setDeleteId(p.id)} style={{ padding: "0.4rem 0.875rem", background: T.redDim, border: `1px solid rgba(239,68,68,0.2)`, color: T.red, borderRadius: "3px", cursor: "pointer", fontSize: "0.72rem", fontWeight: 600 }}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── DELETE CONFIRM MODAL ─────────────────────────────── */}
      {deleteId && (
        <div style={{ position: "fixed", inset: 0, zIndex: 1000, background: "rgba(11,17,32,0.9)", display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem" }}>
          <div style={{ background: T.card, border: `1px solid rgba(239,68,68,0.3)`, borderRadius: "6px", padding: "2rem", maxWidth: "420px", width: "100%" }}>
            <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.1rem", color: T.text, marginBottom: "0.75rem" }}>Delete this project?</h3>
            <p style={{ fontSize: "0.875rem", color: T.muted, marginBottom: "1.5rem" }}>This action cannot be undone. The project will be permanently removed.</p>
            <div style={{ display: "flex", gap: "0.75rem" }}>
              <button onClick={confirmDelete} style={{ flex: 1, padding: "0.75rem", background: T.red, color: "white", border: "none", borderRadius: "2px", cursor: "pointer", fontSize: "0.82rem", fontWeight: 700 }}>Delete</button>
              <button onClick={() => setDeleteId(null)} style={{ flex: 1, padding: "0.75rem", background: "transparent", color: T.muted, border: `1px solid ${T.border}`, borderRadius: "2px", cursor: "pointer", fontSize: "0.82rem" }}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* ── TOAST ────────────────────────────────────────────── */}
      {toast && (
        <div style={{
          position: "fixed", bottom: "2rem", right: "2rem", zIndex: 2000,
          padding: "0.875rem 1.5rem", borderRadius: "4px",
          background: toast.type === "success" ? T.greenDim : T.redDim,
          border: `1px solid ${toast.type === "success" ? "rgba(16,185,129,0.3)" : "rgba(239,68,68,0.3)"}`,
          color: toast.type === "success" ? T.green : T.red,
          fontSize: "0.875rem", fontWeight: 500,
          animation: "slideDown 0.3s ease",
          boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
        }}>
          {toast.msg}
        </div>
      )}

      <style>{`
        @media (max-width: 640px) { .form-2col { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "0.68rem", fontWeight: 600,
  letterSpacing: "0.12em", textTransform: "uppercase",
  color: "#64748B", marginBottom: "0.5rem",
};