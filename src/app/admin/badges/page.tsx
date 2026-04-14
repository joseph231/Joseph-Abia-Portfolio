"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { supabase, type CourseBadge } from "@/lib/supabase";

const T = {
  base:       "#0B1120",
  surface:    "#111827",
  card:       "#1A2235",
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
  amber:      "#F59E0B",
  amberDim:   "rgba(245,158,11,0.12)",
};

const BLANK = {
  name:         "",
  issuer:       "IBM / Credly",
  parent_cert:  "IBM",
  badge_url:    "",
  image_url:    null as string | null,
  completed_at: "",
  order:        0,
};

export default function AdminBadgesPage() {
  const [badges, setBadges]     = useState<CourseBadge[]>([]);
  const [loading, setLoading]   = useState(true);
  const [form, setForm]         = useState(BLANK);
  const [editingId, setEditing] = useState<string | null>(null);
  const [saving, setSaving]     = useState(false);
  const [uploading, setUploading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [toast, setToast]       = useState<{ msg: string; type: "success" | "error" } | null>(null);
  const fileRef                 = useRef<HTMLInputElement>(null);

  const showToast = (msg: string, type: "success" | "error" = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const fetchBadges = async () => {
    const { data } = await supabase
      .from("course_badges")
      .select("*")
      .order("order", { ascending: true });
    setBadges((data as CourseBadge[]) || []);
    setLoading(false);
  };

  useEffect(() => {
  fetchBadges();
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

  const uploadImage = async (file: File) => {
    setUploading(true);
    const ext  = file.name.split(".").pop();
    const path = `badges/${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from("project-images").upload(path, file);
    if (error) { showToast("Upload failed: " + error.message, "error"); setUploading(false); return; }
    const { data } = supabase.storage.from("project-images").getPublicUrl(path);
    setForm((f) => ({ ...f, image_url: data.publicUrl }));
    setUploading(false);
    showToast("Badge image uploaded ✓");
  };

  const save = async () => {
    if (!form.name.trim()) { showToast("Badge name is required", "error"); return; }
    setSaving(true);
    const payload = { ...form, badge_url: form.badge_url || null, completed_at: form.completed_at || null };
    let error;
    if (editingId) {
      ({ error } = await supabase.from("course_badges").update(payload).eq("id", editingId));
    } else {
      ({ error } = await supabase.from("course_badges").insert([payload]));
    }
    setSaving(false);
    if (error) { showToast(error.message, "error"); return; }
    showToast(editingId ? "Badge updated ✓" : "Badge added ✓");
    setForm(BLANK); setEditing(null); setShowForm(false);
    fetchBadges();
  };

  const startEdit = (b: CourseBadge) => {
    setForm({
      name:         b.name,
      issuer:       b.issuer,
      parent_cert:  b.parent_cert,
      badge_url:    b.badge_url || "",
      image_url:    b.image_url,
      completed_at: b.completed_at || "",
      order:        b.order,
    });
    setEditing(b.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    await supabase.from("course_badges").delete().eq("id", deleteId);
    setDeleteId(null);
    showToast("Badge deleted");
    fetchBadges();
  };

  const inp = (field: string) => ({
    value: (form as Record<string, unknown>)[field] as string ?? "",
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value })),
    style: {
      width: "100%", padding: "0.75rem 1rem",
      background: T.surface, border: `1px solid ${T.border}`,
      color: T.text, fontSize: "0.875rem", borderRadius: "4px",
      fontFamily: "var(--font-body)", outline: "none",
    } as React.CSSProperties,
  });

  return (
    <div style={{ background: T.base, minHeight: "100vh", padding: "4rem 0" }}>
      <div className="site-wrap" style={{ maxWidth: "900px" }}>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "2.5rem", gap: "1rem", flexWrap: "wrap" }}>
          <div>
            <p style={{ fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.28em", textTransform: "uppercase", color: T.cyan, marginBottom: "0.25rem" }}>Admin</p>
            <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "2rem", color: T.text, letterSpacing: "-0.02em" }}>
              Course Badges
            </h1>
            <p style={{ fontSize: "0.82rem", color: T.dim, marginTop: "0.25rem" }}>
              Manage your IBM Credly course completion badges
            </p>
          </div>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <a href="/admin/projects" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", padding: "0.625rem 1.1rem", background: "transparent", border: `1px solid ${T.border}`, color: T.muted, borderRadius: "2px", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>
              ← Projects
            </a>
            <button
              onClick={() => { setForm(BLANK); setEditing(null); setShowForm(!showForm); }}
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.5rem",
                background: showForm ? T.surface : T.cyan,
                color: showForm ? T.muted : "#0B1120",
                fontFamily: "var(--font-body)", fontSize: "0.72rem", fontWeight: 700,
                letterSpacing: "0.15em", textTransform: "uppercase",
                padding: "0.625rem 1.25rem", borderRadius: "2px",
                border: `1px solid ${showForm ? T.border : "transparent"}`,
                cursor: "pointer", transition: "all 0.2s",
              }}
            >
              {showForm ? "✕ Cancel" : "+ Add Badge"}
            </button>
          </div>
        </div>

        {/* ── FORM ───────────────────────────────────────────── */}
        {showForm && (
          <div style={{ background: T.card, border: `1px solid ${T.cyanBorder}`, borderRadius: "6px", padding: "2rem", marginBottom: "2.5rem" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.1rem", color: T.text, marginBottom: "1.75rem" }}>
              {editingId ? "Edit Badge" : "Add New Badge"}
            </h2>

            {/* Name + Issuer */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }} className="form-2col">
              <div>
                <label style={labelStyle}>Course / Badge Name *</label>
                <input {...inp("name")} placeholder="e.g. Introduction to Cybersecurity" />
              </div>
              <div>
                <label style={labelStyle}>Issuer</label>
                <input {...inp("issuer")} placeholder="IBM / Credly" />
              </div>
            </div>

            {/* Parent cert + completed date */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }} className="form-2col">
              <div>
                <label style={labelStyle}>Parent Certification</label>
                <select {...inp("parent_cert")}>
                  <option value="IBM">IBM Cybersecurity Analyst</option>
                  <option value="Cisco">Cisco CCNA</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>Completion Date</label>
                <input {...inp("completed_at")} placeholder="e.g. March 2025" />
              </div>
            </div>

            {/* Credly link + order */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }} className="form-2col">
              <div>
                <label style={labelStyle}>Credly Badge URL</label>
                <input {...inp("badge_url")} placeholder="https://credly.com/badges/..." />
              </div>
              <div>
                <label style={labelStyle}>Display Order</label>
                <input {...inp("order")} type="number" placeholder="0 = first" />
              </div>
            </div>

            {/* Badge image upload */}
            <div style={{ marginBottom: "1.5rem" }}>
              <label style={labelStyle}>Badge Image (from Credly)</label>
              <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                <button
                  onClick={() => fileRef.current?.click()}
                  style={{ padding: "0.75rem 1.25rem", background: T.surface, border: `1px solid ${T.border}`, color: T.muted, borderRadius: "4px", cursor: "pointer", fontSize: "0.82rem", whiteSpace: "nowrap" }}
                >
                  {uploading ? "Uploading..." : "📁 Upload Badge Image"}
                </button>
                <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => e.target.files?.[0] && uploadImage(e.target.files[0])} />
                {form.image_url && (
                  <div style={{ position: "relative", width: "56px", height: "56px", borderRadius: "8px", overflow: "hidden", border: `1px solid ${T.border}`, flexShrink: 0 }}>
                    <Image src={form.image_url} alt="badge" fill style={{ objectFit: "cover" }} />
                  </div>
                )}
                {form.badge_url && !form.image_url && (
                  <p style={{ fontSize: "0.75rem", color: T.dim }}>
                    Or just add the Credly link above — the badge will show as a verified link.
                  </p>
                )}
              </div>
            </div>

            {/* Save */}
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
                  cursor: saving ? "not-allowed" : "pointer",
                }}
              >
                {saving ? "Saving..." : editingId ? "Update Badge" : "Save Badge"}
              </button>
              <button
                onClick={() => { setForm(BLANK); setEditing(null); setShowForm(false); }}
                style={{ padding: "0.875rem 1.5rem", background: "transparent", border: `1px solid ${T.border}`, color: T.muted, borderRadius: "2px", cursor: "pointer", fontSize: "0.72rem", letterSpacing: "0.15em", textTransform: "uppercase" }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* ── BADGE LIST ────────────────────────────────────────── */}
        <div>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.9rem", color: T.muted, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1.25rem" }}>
            All Badges ({badges.length})
          </h2>

          {loading && <p style={{ color: T.dim, fontSize: "0.875rem" }}>Loading...</p>}

          {!loading && badges.length === 0 && (
            <div style={{ textAlign: "center", padding: "4rem", background: T.card, border: `1px solid ${T.border}`, borderRadius: "4px" }}>
              <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>🏅</div>
              <p style={{ color: T.dim, fontSize: "0.875rem" }}>No badges yet. Add your first IBM course badge above.</p>
            </div>
          )}

          {/* Group by parent cert */}
          {!loading && badges.length > 0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
              {["IBM", "Cisco", "Other"].map((parent) => {
                const group = badges.filter((b) => b.parent_cert === parent);
                if (group.length === 0) return null;
                return (
                  <div key={parent}>
                    <p style={{ fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: T.cyan, marginBottom: "0.875rem", paddingBottom: "0.5rem", borderBottom: `1px solid ${T.cyanBorder}` }}>
                      {parent === "IBM" ? "IBM Cybersecurity Analyst" : parent === "Cisco" ? "Cisco CCNA" : "Other"} — {group.length} badge{group.length !== 1 ? "s" : ""}
                    </p>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                      {group.map((badge) => (
                        <div key={badge.id} style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: "4px", padding: "1rem 1.25rem", display: "flex", gap: "1rem", alignItems: "center" }}>
                          {/* Badge image */}
                          <div style={{ width: "44px", height: "44px", borderRadius: "8px", overflow: "hidden", background: T.surface, flexShrink: 0, position: "relative" }}>
                            {badge.image_url
                              ? <Image src={badge.image_url} alt={badge.name} fill style={{ objectFit: "cover" }} />
                              : <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.25rem" }}>🏅</div>
                            }
                          </div>
                          {/* Info */}
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <p style={{ fontSize: "0.9rem", fontWeight: 600, color: T.text, marginBottom: "0.15rem" }}>{badge.name}</p>
                            <div style={{ display: "flex", gap: "0.75rem", alignItems: "center", flexWrap: "wrap" }}>
                              <span style={{ fontSize: "0.72rem", color: T.dim }}>{badge.issuer}</span>
                              {badge.completed_at && (
                                <span style={{ fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.08em", padding: "0.15rem 0.5rem", background: T.greenDim, color: T.green, borderRadius: "100px", border: "1px solid rgba(16,185,129,0.2)" }}>
                                  ✓ {badge.completed_at}
                                </span>
                              )}
                              {badge.badge_url && (
                                <a href={badge.badge_url} target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.65rem", color: T.cyan, fontWeight: 600 }}>
                                  Credly ↗
                                </a>
                              )}
                            </div>
                          </div>
                          {/* Actions */}
                          <div style={{ display: "flex", gap: "0.5rem", flexShrink: 0 }}>
                            <button onClick={() => startEdit(badge)} style={{ padding: "0.35rem 0.75rem", background: T.cyanDim, border: `1px solid ${T.cyanBorder}`, color: T.cyan, borderRadius: "3px", cursor: "pointer", fontSize: "0.68rem", fontWeight: 600 }}>
                              Edit
                            </button>
                            <button onClick={() => setDeleteId(badge.id)} style={{ padding: "0.35rem 0.75rem", background: T.redDim, border: `1px solid rgba(239,68,68,0.2)`, color: T.red, borderRadius: "3px", cursor: "pointer", fontSize: "0.68rem", fontWeight: 600 }}>
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Delete confirm */}
      {deleteId && (
        <div style={{ position: "fixed", inset: 0, zIndex: 1000, background: "rgba(11,17,32,0.9)", display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem" }}>
          <div style={{ background: T.card, border: `1px solid rgba(239,68,68,0.3)`, borderRadius: "6px", padding: "2rem", maxWidth: "380px", width: "100%" }}>
            <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.1rem", color: T.text, marginBottom: "0.75rem" }}>Delete this badge?</h3>
            <p style={{ fontSize: "0.875rem", color: T.muted, marginBottom: "1.5rem" }}>This cannot be undone.</p>
            <div style={{ display: "flex", gap: "0.75rem" }}>
              <button onClick={confirmDelete} style={{ flex: 1, padding: "0.75rem", background: T.red, color: "white", border: "none", borderRadius: "2px", cursor: "pointer", fontSize: "0.82rem", fontWeight: 700 }}>Delete</button>
              <button onClick={() => setDeleteId(null)} style={{ flex: 1, padding: "0.75rem", background: "transparent", color: T.muted, border: `1px solid ${T.border}`, borderRadius: "2px", cursor: "pointer", fontSize: "0.82rem" }}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div style={{ position: "fixed", bottom: "2rem", right: "2rem", zIndex: 2000, padding: "0.875rem 1.5rem", borderRadius: "4px", background: toast.type === "success" ? T.greenDim : T.redDim, border: `1px solid ${toast.type === "success" ? "rgba(16,185,129,0.3)" : "rgba(239,68,68,0.3)"}`, color: toast.type === "success" ? T.green : T.red, fontSize: "0.875rem", fontWeight: 500, animation: "slideDown 0.3s ease" }}>
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
  display: "block", fontSize: "0.68rem", fontWeight: 600,
  letterSpacing: "0.12em", textTransform: "uppercase",
  color: "#64748B", marginBottom: "0.5rem",
};