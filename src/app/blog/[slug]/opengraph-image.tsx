import { ImageResponse } from "next/og";
import { site } from "#content";
import { getPost, getPosts } from "@/lib/content";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getPosts().map((post) => ({ slug: post.slug }));
}

export default async function PostOpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);

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
        <div style={{ display: "flex", fontSize: 24, color: "#a5a1f7", letterSpacing: 2 }}>
          {post?.series ? post.series.toUpperCase() : "WRITING"}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 64,
              fontWeight: 700,
              color: "#f5f5f4",
              letterSpacing: -2,
              lineHeight: 1.15,
            }}
          >
            {post?.title ?? "Writing"}
          </div>
          {post ? (
            <div style={{ display: "flex", marginTop: 24, fontSize: 26, color: "#a8a8b2" }}>
              {post.metadata.readingTime} min read
            </div>
          ) : null}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 48,
              height: 48,
              borderRadius: 10,
              background: "#8b87f2",
              color: "#0d0b2b",
              fontSize: 20,
              fontWeight: 700,
            }}
          >
            {site.shortName}
          </div>
          <div style={{ display: "flex", fontSize: 24, color: "#8d8d97" }}>
            {site.name} · {site.url.replace("https://", "")}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
