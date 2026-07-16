import { useEffect, useState } from "react";
import { DATA } from "../data/portfolio";

export default function Hero({ sectionRef, onNavigate }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const reveal = (delay) => ({
    className: `reveal ${ready ? "in" : ""}`,
    style: { "--rd": `${delay}s` },
  });

  return (
    <section
      ref={sectionRef}
      data-section="hero"
      aria-label="Introduction"
      style={{
        minHeight: "100svh",
        display: "flex",
        alignItems: "center",
        paddingTop: 68,
      }}
    >
      <div
        className="container"
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: "var(--sp-8)",
          flexWrap: "wrap",
          paddingBlock: "var(--sp-8)",
        }}
      >
        <div style={{ flex: "1 1 460px" }}>
          <div {...reveal(0)} style={{ "--rd": "0s", marginBottom: "var(--sp-5)" }}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                padding: "8px 18px",
                borderRadius: 100,
                background: "var(--gold-soft)",
                border: "1px solid var(--gold-border)",
              }}
            >
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: "var(--ok)",
                  animation: "pulse 2s infinite",
                }}
                aria-hidden="true"
              />
              <span className="mono" style={{ fontSize: 12, color: "var(--gold)", letterSpacing: 1 }}>
                Available for work
              </span>
            </span>
          </div>

          <h1 {...reveal(0.08)} className={`display reveal ${ready ? "in" : ""}`}>
            <span
              style={{
                display: "block",
                color: "var(--text-2)",
                fontSize: "clamp(15px, 2vw, 19px)",
                letterSpacing: 3,
                textTransform: "uppercase",
                marginBottom: "var(--sp-3)",
              }}
            >
              Hello, I'm
            </span>
            <span className="serif gold-gradient">{DATA.name}</span>
          </h1>

          <p
            {...reveal(0.16)}
            className={`serif reveal ${ready ? "in" : ""}`}
            style={{
              "--rd": "0.16s",
              fontStyle: "italic",
              fontSize: "var(--t-h3)",
              marginTop: "var(--sp-2)",
              marginBottom: "var(--sp-4)",
            }}
          >
            {DATA.role}
          </p>

          <p
            {...reveal(0.24)}
            className={`measure text-2 reveal ${ready ? "in" : ""}`}
            style={{ "--rd": "0.24s", marginBottom: "var(--sp-6)", maxWidth: "48ch" }}
          >
            {DATA.bio}
          </p>

          <div {...reveal(0.32)} style={{ "--rd": "0.32s", display: "flex", gap: "var(--sp-4)", flexWrap: "wrap" }}>
            <button className="btn-primary" onClick={() => onNavigate("projects")}>
              View Projects <span aria-hidden="true">→</span>
            </button>
            <button className="btn-outline" onClick={() => onNavigate("contact")}>
              Get in Touch
            </button>
          </div>
        </div>

        <div
          {...reveal(0.4)}
          style={{
            "--rd": "0.4s",
            flex: "0 1 320px",
            minWidth: 240,
            marginInline: "auto",
          }}
        >
          <div style={{ position: "relative", maxWidth: 320, marginInline: "auto" }}>
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: -24,
                borderRadius: "50%",
                background: "radial-gradient(circle, var(--gold-faint) 0%, transparent 70%)",
              }}
            />
            <img
              src={DATA.avatar}
              alt={`Portrait of ${DATA.name}`}
              style={{
                position: "relative",
                width: "100%",
                borderRadius: "50%",
                border: "2px solid var(--gold-border)",
                padding: 8,
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
