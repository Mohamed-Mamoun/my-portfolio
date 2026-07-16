import { DATA } from "../data/portfolio";
import useInView from "../hooks/useInView";
import PhoneFrame from "./PhoneFrame";

export default function Projects({ sectionRef, onSelect }) {
  const [ref, vis] = useInView(0.08);
  const flagship = DATA.projects.find((p) => p.flagship);
  const rest = DATA.projects.filter((p) => !p.flagship);

  const reveal = (delay) => ({
    className: `reveal ${vis ? "in" : ""}`,
    style: { "--rd": `${delay}s` },
  });

  return (
    <section
      ref={(el) => {
        sectionRef(el);
        ref.current = el;
      }}
      data-section="projects"
      className="section section--airy"
      aria-labelledby="projects-heading"
    >
      <div className="container">
        <div {...reveal(0)}>
          <div className="section-label">Projects</div>
          <h2 id="projects-heading" className="serif h2" style={{ marginBottom: "var(--sp-7)" }}>
            Built for the hand, shown in the hand
          </h2>
        </div>

        {/* Flagship */}
        <div {...reveal(0.1)} style={{ "--rd": "0.1s", marginBottom: "var(--sp-6)" }}>
          <article
            className="flagship"
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "var(--sp-7)",
              padding: "var(--sp-7)",
              alignItems: "center",
            }}
          >
            <div style={{ flex: "1 1 380px" }}>
              <div
                style={{
                  fontSize: "var(--t-caption)",
                  letterSpacing: 2,
                  textTransform: "uppercase",
                  color: "var(--gold)",
                  marginBottom: "var(--sp-3)",
                }}
              >
                Flagship — {flagship.subtitle}
              </div>
              <h3 className="serif" style={{ fontSize: "var(--t-h2)", marginBottom: "var(--sp-4)" }}>
                {flagship.title}
              </h3>
              <p className="text-2 measure" style={{ marginBottom: "var(--sp-4)" }}>
                {flagship.problem}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--sp-2)", marginBottom: "var(--sp-5)" }}>
                {flagship.stack.map((t) => (
                  <span key={t} className="chip">
                    {t}
                  </span>
                ))}
              </div>
              <button className="btn-primary" onClick={() => onSelect(flagship)}>
                Read the case study <span aria-hidden="true">→</span>
              </button>
            </div>
            <div style={{ flex: "0 1 250px", minWidth: 210, marginInline: "auto" }}>
              <PhoneFrame screens={flagship.screens} label={`${flagship.title} screenshots`} />
            </div>
          </article>
        </div>

        {/* Supporting projects — neutral in the grid; per-project color
            appears only inside each detail view */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 300px), 1fr))",
            gap: "var(--sp-5)",
          }}
        >
          {rest.map((p, i) => (
            <div key={p.id} {...reveal(0.15 + 0.08 * i)} style={{ "--rd": `${0.15 + 0.08 * i}s` }}>
              <button
                type="button"
                className="card card--interactive"
                style={{ padding: 0, overflow: "hidden", height: "100%" }}
                onClick={() => onSelect(p)}
                aria-label={`Open ${p.title} case study`}
              >
                <div className="brand-tile" style={{ background: "var(--surface)" }}>
                  {p.logo ? (
                    <img src={p.logo} alt="" />
                  ) : (
                    <span
                      className="serif"
                      aria-hidden="true"
                      style={{
                        fontSize: 44,
                        color: "var(--text-3)",
                        border: "1px solid var(--border)",
                        borderRadius: "var(--r-md)",
                        width: 96,
                        height: 96,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {p.monogram}
                    </span>
                  )}
                </div>
                <div style={{ padding: "var(--sp-5)" }}>
                  <div
                    style={{
                      fontSize: "var(--t-caption)",
                      letterSpacing: 2,
                      textTransform: "uppercase",
                      color: "var(--text-3)",
                      marginBottom: "var(--sp-2)",
                    }}
                  >
                    {p.subtitle}
                  </div>
                  <div className="serif" style={{ fontSize: "var(--t-h3)", marginBottom: "var(--sp-2)" }}>
                    {p.title}
                  </div>
                  <p className="text-2" style={{ fontSize: "var(--t-small)", marginBottom: "var(--sp-4)" }}>
                    {p.desc}
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--sp-2)" }}>
                    {p.stack.map((t) => (
                      <span key={t} className="chip" style={{ fontSize: "var(--t-caption)", padding: "3px 10px" }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
