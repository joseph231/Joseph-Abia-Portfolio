"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const logout = async () => {
    await fetch("/api/admin-logout", { method: "POST" });
    router.replace("/admin/login");
  };

  // Styles
  const containerStyle: React.CSSProperties = {
    position: "fixed",
    top: "72px",
    left: 0,
    right: 0,
    zIndex: 90,
    background: "rgba(0,212,255,0.08)",
    borderBottom: "1px solid rgba(0,212,255,0.2)",
    padding: "0.4rem 1.5rem",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  };

  const badgeStyle: React.CSSProperties = {
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    background: "#00D4FF",
    flexShrink: 0,
  };

  const titleStyle: React.CSSProperties = {
    fontSize: "0.65rem",
    fontWeight: 700,
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    color: "#00D4FF",
  };

  const rightSectionStyle: React.CSSProperties = {
    marginLeft: "auto",
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  };

  const linkStyle: React.CSSProperties = {
    fontSize: "0.65rem",
    fontWeight: 600,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: "#64748B",
    textDecoration: "none",
  };

  const buttonStyle: React.CSSProperties = {
    fontSize: "0.65rem",
    fontWeight: 600,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: "#EF4444",
    background: "rgba(239,68,68,0.1)",
    border: "1px solid rgba(239,68,68,0.2)",
    borderRadius: "3px",
    padding: "0.25rem 0.75rem",
    cursor: "pointer",
  };

  return (
    <>
      {/* Admin Bar */}
      <div style={containerStyle}>
        <span style={badgeStyle} />

        <span style={titleStyle}>
          Admin Panel — Private
        </span>

        <div style={rightSectionStyle}>
          <Link href="/" style={linkStyle}>
            ← Back to site
          </Link>

          <button onClick={logout} style={buttonStyle}>
            Logout
          </button>
        </div>
      </div>

      {/* Page Content */}
      <div style={{ paddingTop: "2.5rem" }}>
        {children}
      </div>
    </>
  );
}