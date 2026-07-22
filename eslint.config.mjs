import coreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const config = [
  { ignores: [".next/**", "node_modules/**", ".velite/**", "out/**", "next-env.d.ts"] },
  ...coreWebVitals,
  ...nextTypescript,
  {
    rules: {
      // The design system is the only way to express a value. Inline
      // styles bypass it — that's how the previous build ended up with
      // ~800 lines of style={{}} shadowing a perfectly good token set.
      "react/forbid-dom-props": ["error", { forbid: ["style"] }],
    },
  },
  {
    // next/og renders through Satori, which supports inline styles only —
    // no class names, no Tailwind. The exception is unavoidable and is
    // scoped to image routes so it can't leak into the app.
    files: ["**/opengraph-image.tsx", "**/twitter-image.tsx"],
    rules: { "react/forbid-dom-props": "off" },
  },
];

export default config;
