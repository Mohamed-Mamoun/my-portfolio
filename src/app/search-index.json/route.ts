import { buildSearchIndex } from "@/lib/search";

export const dynamic = "force-static";

/**
 * Static JSON so the command menu can fetch the index on first open
 * rather than shipping it in every page's payload.
 */
export function GET() {
  return Response.json(buildSearchIndex(), {
    headers: { "Cache-Control": "public, max-age=3600, s-maxage=86400" },
  });
}
