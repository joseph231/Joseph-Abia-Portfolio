export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Admin indicator bar */}
      <div style={{
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
      }}>
        <span style={{
          width: "6px", height: "6px", borderRadius: "50%",
          background: "#00D4FF", flexShrink: 0,
        }} />
        <span style={{
          fontSize: "0.65rem", fontWeight: 700,
          letterSpacing: "0.2em", textTransform: "uppercase",
          color: "#00D4FF",
        }}>
          Admin Panel — Private
        </span>
        <a
          href="/"
          style={{
            marginLeft: "auto",
            fontSize: "0.65rem", fontWeight: 600,
            letterSpacing: "0.12em", textTransform: "uppercase",
            color: "#64748B",
          }}
        >
          ← Back to site
        </a>
      </div>

      {/* Extra top padding to clear both navbar + admin bar */}
      <div style={{ paddingTop: "2.5rem" }}>
        {children}
      </div>
    </>
  );
}