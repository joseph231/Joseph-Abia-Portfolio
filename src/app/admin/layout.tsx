"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const logout = async () => {
    await fetch("/api/admin-logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <>
      {/* Admin bar */}
      <div style={{
        position: "fixed", top: "72px", left: 0, right: 0, zIndex: 90,
        background: "rgba(0,212,255,0.08)",
        borderBottom: "1px solid rgba(0,212,255,0.2)",
        padding: "0.4rem 1.5rem",
        display: "flex", alignItems: "center", gap: "0.5rem",
      }}>
        <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#00D4FF", flexShrink: 0 }} />
        <span style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#00D4FF" }}>
          Admin Panel — Private
        </span>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "1rem" }}>
          <Link href="/admin/projects" style={{ fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#64748B" }}>
                Projects
              </Link>
              <Link href="/admin/badges" style={{ fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#64748B" }}>
                Badges
              </Link>
              <Link href="/" style={{ fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#64748B" }}>
                ← Site
              </Link>
          <button
            onClick={logout}
            style={{
              fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase",
              color: "#EF4444", background: "rgba(239,68,68,0.1)",
              border: "1px solid rgba(239,68,68,0.2)", borderRadius: "3px",
              padding: "0.25rem 0.75rem", cursor: "pointer",
            }}
          >
            Logout
          </button>
        </div>
      </div>
      <div style={{ paddingTop: "2.5rem" }}>
        {children}
      </div>
    </>
  );
}