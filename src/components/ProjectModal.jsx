import { useEffect, useRef } from "react";
import PhoneFrame from "./PhoneFrame";

export default function ProjectModal({ project: p, onClose }) {
  const panelRef = useRef(null);
  const closeRef = useRef(null);

  useEffect(() => {
    const opener = document.activeElement;
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";

    const onKey = (e) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      // Focus trap: cycle within the dialog.
      const focusables = panelRef.current?.querySelectorAll(
        'button, a[href], [tabindex]:not([tabindex="-1"])'
      );
      if (!focusables?.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      opener?.focus?.();
    };
  }, [onClose]);

  const caseSection = (label, text) => (
    <div style={{ marginBottom: "var(--sp-6)" }}>
      <h3
        style={{
          fontSize: "var(--t-caption)",
          letterSpacing: 2,
          textTransform: "uppercase",
          color: p.color,
          marginBottom: "var(--sp-2)",
        }}
      >
        {label}
      </h3>
      <p className="text-2" style={{ fontSize: "var(--t-body)" }}>
        {text}
      </p>
    </div>
  );

  return (
    <div
      className="modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="modal-panel"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <button ref={closeRef} className="modal-close" onClick={onClose} aria-label="Close case study">
          ✕
        </button>

        <div
          style={{
            display: "inline-block",
            padding: "5px 14px",
            borderRadius: 100,
            background: `${p.color}1f`,
            border: `1px solid ${p.color}30`,
            fontSize: 11,
            letterSpacing: 2,
            textTransform: "uppercase",
            color: p.color,
            marginBottom: "var(--sp-4)",
          }}
        >
          {p.subtitle}
        </div>

        <h2 id="modal-title" className="serif" style={{ fontSize: "var(--t-h2)", marginBottom: "var(--sp-4)" }}>
          {p.title}
        </h2>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--sp-2)", marginBottom: "var(--sp-6)" }}>
          {p.stack.map((t) => (
            <span key={t} className="chip">
              {t}
            </span>
          ))}
        </div>

        {caseSection("The problem", p.problem)}
        {caseSection("The approach", p.approach)}
        {caseSection("The outcome", p.outcome)}

        {p.screens ? (
          <div style={{ marginBottom: "var(--sp-6)" }}>
            <h3 className="serif h3" style={{ marginBottom: "var(--sp-4)" }}>
              The screens
            </h3>
            <div className="case-screens">
              {p.screens.map((s) => (
                <div key={s.img} className="phone">
                  <img src={s.img} alt={s.alt} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
              ))}
            </div>
          </div>
        ) : (
          p.logo && (
            <div
              className="card"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "var(--sp-7)",
                marginBottom: "var(--sp-6)",
                background: `linear-gradient(180deg, ${p.color}0d, transparent)`,
              }}
            >
              <img src={p.logo} alt={`${p.title} logo`} style={{ width: 120, borderRadius: "var(--r-md)" }} />
            </div>
          )
        )}

        {p.demo && (
          <a href={p.demo} target="_blank" rel="noopener noreferrer" className="btn-primary">
            View on Google Play <span aria-hidden="true">→</span>
          </a>
        )}

        <div style={{ height: "var(--sp-8)" }} />
      </div>
    </div>
  );
}
