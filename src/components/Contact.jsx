import { useState } from "react";
import { DATA } from "../data/portfolio";
import useInView from "../hooks/useInView";

const ICONS = {
  GitHub: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  ),
  LinkedIn: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
};

export default function Contact({ sectionRef }) {
  const [ref, vis] = useInView();
  const [formState, setFormState] = useState("idle");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [formError, setFormError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setFormError("Please fill in all fields.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setFormError("Please enter a valid email address.");
      return;
    }

    setFormState("sending");
    try {
      const res = await fetch("https://formspree.io/f/mlgowzqe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setFormState("sent");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setFormState("idle"), 4000);
      } else {
        setFormError("Something went wrong. Please try again.");
        setFormState("idle");
      }
    } catch {
      setFormError("Network error. Please check your connection.");
      setFormState("idle");
    }
  };

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
      data-section="contact"
      className="section"
      aria-labelledby="contact-heading"
    >
      <div className="container container--narrow">
        <div {...reveal(0)} style={{ textAlign: "center", marginBottom: "var(--sp-7)" }}>
          <div className="section-label" style={{ justifyContent: "center" }}>
            Contact
          </div>
          <h2 id="contact-heading" className="serif h2">
            Let's build something
          </h2>
          <p className="text-2" style={{ marginTop: "var(--sp-3)" }}>
            {DATA.email} · {DATA.location}
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "var(--sp-3)", marginTop: "var(--sp-4)" }}>
            {DATA.socials.map((s) => (
              <a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${DATA.name} on ${s.label}`}
                className="card"
                style={{
                  width: 44,
                  height: 44,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "var(--r-sm)",
                  color: "var(--text-2)",
                }}
              >
                {ICONS[s.label]}
              </a>
            ))}
          </div>
        </div>

        <div {...reveal(0.15)} style={{ "--rd": "0.15s" }}>
          {formState === "sent" ? (
            <div className="card" style={{ padding: "var(--sp-7)", textAlign: "center" }} role="status">
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  background: "var(--gold)",
                  color: "var(--bg)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto var(--sp-4)",
                  fontSize: 24,
                }}
                aria-hidden="true"
              >
                ✓
              </div>
              <div className="serif h3" style={{ marginBottom: "var(--sp-2)" }}>
                Message Sent!
              </div>
              <div className="text-2">Thanks for reaching out. I'll get back to you soon.</div>
            </div>
          ) : (
            <form className="card" style={{ padding: "var(--sp-6)" }} onSubmit={handleSubmit} noValidate>
              <div className="serif h3" style={{ marginBottom: "var(--sp-5)" }}>
                Send a message
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "var(--sp-4)" }}>
                <label>
                  <span className="text-3" style={{ fontSize: "var(--t-caption)", display: "block", marginBottom: "var(--sp-1)" }}>
                    Name
                  </span>
                  <input
                    name="name"
                    autoComplete="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData((d) => ({ ...d, name: e.target.value }))}
                  />
                </label>
                <label>
                  <span className="text-3" style={{ fontSize: "var(--t-caption)", display: "block", marginBottom: "var(--sp-1)" }}>
                    Email
                  </span>
                  <input
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={(e) => setFormData((d) => ({ ...d, email: e.target.value }))}
                  />
                </label>
                <label>
                  <span className="text-3" style={{ fontSize: "var(--t-caption)", display: "block", marginBottom: "var(--sp-1)" }}>
                    Message
                  </span>
                  <textarea
                    name="message"
                    placeholder="Tell me about your project..."
                    value={formData.message}
                    onChange={(e) => setFormData((d) => ({ ...d, message: e.target.value }))}
                  />
                </label>
                {formError && (
                  <div className="form-error" role="alert">
                    {formError}
                  </div>
                )}
                <button
                  type="submit"
                  className="btn-primary"
                  style={{ width: "100%" }}
                  disabled={formState === "sending"}
                >
                  {formState === "sending" ? "Sending..." : "Send Message →"}
                </button>
              </div>
            </form>
          )}
        </div>

        <footer
          style={{
            marginTop: "var(--sp-9)",
            textAlign: "center",
            paddingTop: "var(--sp-6)",
            borderTop: "1px solid var(--border)",
          }}
        >
          <div className="text-3" style={{ fontSize: "var(--t-small)" }}>
            Designed & built with <span style={{ color: "var(--gold)" }}>♥</span> — Flutter craft, on the web
          </div>
          <div className="text-3" style={{ fontSize: "var(--t-caption)", marginTop: "var(--sp-2)" }}>
            © {new Date().getFullYear()} {DATA.name}
          </div>
        </footer>
      </div>
    </section>
  );
}
