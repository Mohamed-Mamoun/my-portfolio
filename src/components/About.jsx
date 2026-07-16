import { DATA } from "../data/portfolio";
import useInView from "../hooks/useInView";

export default function About({ sectionRef }) {
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
      data-section="about"
      className="section"
      aria-labelledby="about-heading"
    >
      <div className="container">
        <div {...reveal(0)}>
          <div className="section-label">About Me</div>
          <h2 id="about-heading" className="serif h2" style={{ marginBottom: "var(--sp-7)" }}>
            Turning vision into working software
          </h2>
        </div>

        <div
          style={{
            display: "flex",
            gap: "var(--sp-8)",
            flexWrap: "wrap",
            marginBottom: "var(--sp-8)",
          }}
        >
          <div {...reveal(0.1)} style={{ "--rd": "0.1s", flex: "1 1 420px" }}>
            <p className="measure text-2" style={{ marginBottom: "var(--sp-5)" }}>
              {DATA.bio}
            </p>
            <p className="measure text-2">{DATA.longBio}</p>
          </div>

          <div {...reveal(0.2)} style={{ "--rd": "0.2s", flex: "0 1 300px", alignSelf: "center" }}>
            <dl>
            {DATA.stats.map((s, i) => (
              <div
                key={s.label}
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: "var(--sp-4)",
                  padding: "var(--sp-4) 0",
                  borderTop: i === 0 ? "none" : "1px solid var(--border)",
                }}
              >
                <dt className="serif" style={{ fontSize: "var(--t-h2)", color: "var(--gold)", minWidth: 96 }}>
                  {s.value}
                </dt>
                <dd className="text-2" style={{ fontSize: "var(--t-small)" }}>
                  {s.label}
                </dd>
              </div>
            ))}
            </dl>
          </div>
        </div>

        <div {...reveal(0.25)} style={{ "--rd": "0.25s" }}>
          <h3 className="serif h3" style={{ marginBottom: "var(--sp-6)" }}>
            My Journey
          </h3>
          <ol style={{ listStyle: "none" }}>
            {DATA.timeline.map((t, i) => (
              <li key={`${t.year}-${t.role}`} className="timeline-item">
                <div className="timeline-rail" aria-hidden="true">
                  <div className={`timeline-dot ${i === 0 ? "current" : ""}`} />
                  {i < DATA.timeline.length - 1 && <div className="timeline-line" />}
                </div>
                <div style={{ flex: 1, paddingBottom: "var(--sp-6)" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "var(--sp-3)",
                      flexWrap: "wrap",
                      marginBottom: "var(--sp-1)",
                    }}
                  >
                    <span
                      className="mono"
                      style={{
                        fontSize: "var(--t-caption)",
                        color: "var(--gold)",
                        background: "var(--gold-faint)",
                        padding: "3px 10px",
                        borderRadius: 6,
                      }}
                    >
                      {t.year}
                    </span>
                    <span className="text-3" style={{ fontSize: "var(--t-small)" }}>
                      {t.company}
                    </span>
                  </div>
                  <div style={{ fontWeight: 500 }}>{t.role}</div>
                  <div className="text-2" style={{ fontSize: "var(--t-small)" }}>
                    {t.desc}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
