import { useEffect, useState } from "react";
import { SECTIONS } from "../data/portfolio";

export default function Nav({ active, onNavigate }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Scroll state lives here so the rest of the tree never re-renders
  // on scroll.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const go = (key) => {
    setMenuOpen(false);
    onNavigate(key);
  };

  return (
    <>
      <nav className={`nav ${scrolled ? "scrolled" : ""}`} aria-label="Primary">
        <div className="container nav-inner">
          <button
            onClick={() => go("hero")}
            aria-label="Back to top"
            className="mono"
            style={{
              background: "none",
              border: "none",
              color: "var(--gold)",
              fontSize: 22,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            {"</>"}
          </button>

          <div className="nav-links">
            {SECTIONS.map((s) => (
              <button
                key={s.key}
                className={`nav-link ${active === s.key ? "active" : ""}`}
                onClick={() => go(s.key)}
              >
                {s.label}
              </button>
            ))}
          </div>

          <button
            className="btn-primary nav-cta"
            style={{ padding: "10px 22px", fontSize: 13 }}
            onClick={() => go("contact")}
          >
            Hire Me
          </button>

          <button
            className="nav-burger"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="mobile-menu">
          {SECTIONS.map((s) => (
            <button
              key={s.key}
              className={`nav-link ${active === s.key ? "active" : ""}`}
              onClick={() => go(s.key)}
            >
              {s.label}
            </button>
          ))}
        </div>
      )}
    </>
  );
}
