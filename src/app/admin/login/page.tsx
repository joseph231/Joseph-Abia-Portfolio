"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

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
};

function LoginForm() {
  const router       = useRouter();
  const searchParams = useSearchParams();
  const from         = searchParams.get("from") || "/admin/projects";

  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);

  const handleSubmit = async () => {
    if (!password) { setError("Password is required"); return; }
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin-auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push(from);
      router.refresh();
    } else {
      setError("Incorrect password. Access denied.");
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh", background: T.base,
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "2rem", position: "relative", overflow: "hidden",
    }}>
      {/* Background dot grid */}
      <div aria-hidden style={{
        position: "absolute", inset: 0,
        backgroundImage: `radial-gradient(circle, rgba(0,212,255,0.08) 1px, transparent 1px)`,
        backgroundSize: "28px 28px",
      }} />
      <div aria-hidden style={{
        position: "absolute", top: "20%", right: "10%",
        width: "400px", height: "400px",
        background: "radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 65%)",
      }} />

      <div style={{
        width: "100%", maxWidth: "400px",
        background: T.card, border: `1px solid ${T.cyanBorder}`,
        borderRadius: "8px", padding: "2.5rem",
        position: "relative", zIndex: 1,
        boxShadow: "0 24px 80px rgba(0,0,0,0.5), 0 0 40px rgba(0,212,255,0.05)",
      }}>
        {/* Icon */}
        <div style={{
          width: "52px", height: "52px",
          background: T.cyanDim, border: `1px solid ${T.cyanBorder}`,
          borderRadius: "12px", display: "flex", alignItems: "center",
          justifyContent: "center", fontSize: "1.5rem", marginBottom: "1.5rem",
        }}>
          🔐
        </div>

        <p style={{ fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.28em", textTransform: "uppercase", color: T.cyan, marginBottom: "0.5rem" }}>
          Admin Access
        </p>
        <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.5rem", color: T.text, letterSpacing: "-0.02em", marginBottom: "0.5rem" }}>
          Restricted Area
        </h1>
        <p style={{ fontSize: "0.82rem", color: T.dim, marginBottom: "2rem", fontWeight: 300 }}>
          This page is for site administrators only.
        </p>

        {/* Password input */}
        <div style={{ marginBottom: "1.25rem" }}>
          <label style={{ display: "block", fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: T.dim, marginBottom: "0.5rem" }}>
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError(""); }}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            placeholder="Enter admin password"
            autoFocus
            style={{
              width: "100%", padding: "0.875rem 1rem",
              background: T.surface,
              border: `1px solid ${error ? "rgba(239,68,68,0.5)" : T.border}`,
              color: T.text, fontSize: "0.9rem",
              borderRadius: "4px", fontFamily: "var(--font-body)", outline: "none",
              transition: "border-color 0.2s",
            }}
          />
          {error && (
            <p style={{ fontSize: "0.75rem", color: T.red, marginTop: "0.4rem", display: "flex", alignItems: "center", gap: "0.3rem" }}>
              ⚠ {error}
            </p>
          )}
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{
            width: "100%",
            display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem",
            background: loading ? T.cyanDim : T.cyan,
            color: loading ? T.cyan : "#0B1120",
            fontFamily: "var(--font-body)", fontSize: "0.75rem", fontWeight: 700,
            letterSpacing: "0.15em", textTransform: "uppercase",
            padding: "0.9rem", borderRadius: "2px", border: "none",
            cursor: loading ? "not-allowed" : "pointer",
            transition: "all 0.2s",
          }}
        >
          {loading ? "Verifying..." : "Access Admin Panel"}
        </button>

        <p style={{ fontSize: "0.72rem", color: T.dim, textAlign: "center", marginTop: "1.25rem" }}>
          Unauthorised access attempts are logged.
        </p>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}