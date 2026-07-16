import { DATA } from "../data/portfolio";
import useInView from "../hooks/useInView";

export default function Skills({ sectionRef }) {
  const [ref, vis] = useInView();

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
      data-section="skills"
      className="section section--band"
      aria-labelledby="skills-heading"
    >
      <div className="container">
        <div {...reveal(0)}>
          <div className="section-label">Skills</div>
          <h2 id="skills-heading" className="serif h2" style={{ marginBottom: "var(--sp-3)" }}>
            What I'm trusted with
          </h2>
          <p className="text-2 measure" style={{ marginBottom: "var(--sp-7)" }}>
            No self-assigned percentages — each of these is backed by the shipped work below.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))",
            gap: "var(--sp-5)",
          }}
        >
          {DATA.competencies.map((c, i) => (
            <div
              key={c.title}
              {...reveal(0.08 * (i + 1))}
              style={{ "--rd": `${0.08 * (i + 1)}s` }}
            >
              <div className="card" style={{ padding: "var(--sp-6)", height: "100%" }}>
                <h3 className="serif h3" style={{ marginBottom: "var(--sp-3)" }}>
                  {c.title}
                </h3>
                <p className="text-2" style={{ fontSize: "var(--t-small)", marginBottom: "var(--sp-4)" }}>
                  {c.blurb}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--sp-2)", marginBottom: "var(--sp-4)" }}>
                  {c.tools.map((t) => (
                    <span key={t} className="chip">
                      {t}
                    </span>
                  ))}
                </div>
                <p style={{ fontSize: "var(--t-caption)", letterSpacing: 1, textTransform: "uppercase", color: "var(--text-3)" }}>
                  Proven in{" "}
                  <span style={{ color: "var(--gold)" }}>{c.provenIn.join(" · ")}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
