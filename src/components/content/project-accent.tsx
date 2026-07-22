/* eslint-disable react/forbid-dom-props --
   The project hue is per-project content, not a design-token value, so
   it cannot be expressed as a static utility class. This file is the
   only place in the app allowed to set an inline style for that reason;
   keeping it isolated is what stops the exception from spreading. */

/**
 * Ambient accent wash for a case-study hero. Hue comes from the
 * project; saturation and lightness are fixed here so every project
 * reads at the same perceived weight — the previous site's four
 * hand-picked hex accents varied wildly and two failed contrast.
 */
export function ProjectAccent({ hue }: { hue: number }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 -top-32 mx-auto h-96 w-full max-w-4xl rounded-full opacity-20 blur-3xl"
      style={{ background: `hsl(${hue} 80% 60%)` }}
    />
  );
}
