import { ImageResponse } from "next/og";
import { site } from "#content";

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * The previous build shipped no og:image at all, so every share to
 * LinkedIn, Slack, or Discord rendered as a bare text link. This is
 * generated at build time and served as a static PNG.
 */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#08080a",
          padding: 80,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 56,
              height: 56,
              borderRadius: 12,
              background: "#8b87f2",
              color: "#0d0b2b",
              fontSize: 24,
              fontWeight: 700,
            }}
          >
            {site.shortName}
          </div>
          <div style={{ display: "flex", fontSize: 24, color: "#8d8d97" }}>{site.name}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 72,
              fontWeight: 700,
              color: "#f5f5f4",
              letterSpacing: -2,
              lineHeight: 1.1,
            }}
          >
            {site.tagline}
          </div>
          <div style={{ display: "flex", marginTop: 28, fontSize: 30, color: "#a8a8b2" }}>
            {site.role} · {site.discipline}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            fontSize: 22,
            color: "#8d8d97",
          }}
        >
          <div style={{ display: "flex", width: 48, height: 3, background: "#8b87f2" }} />
          <div style={{ display: "flex" }}>{site.url.replace("https://", "")}</div>
        </div>
      </div>
    ),
    size,
  );
}
