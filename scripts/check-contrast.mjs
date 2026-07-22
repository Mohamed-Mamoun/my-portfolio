#!/usr/bin/env node
/**
 * WCAG AA contrast gate.
 *
 * Parses the semantic tokens out of src/styles/globals.css and verifies
 * every foreground/background pair the design actually uses, in BOTH
 * themes. The previous build shipped four measured AA failures purely
 * because nothing checked. This checks.
 *
 * Exits non-zero on failure so CI can block the merge.
 */

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const css = readFileSync(resolve(root, "src/styles/globals.css"), "utf8");

/** Pull `--name: #hex;` declarations out of a given selector block. */
function parseBlock(selector) {
  const re = new RegExp(`${selector}\\s*\\{([\\s\\S]*?)\\n\\}`, "m");
  const body = css.match(re)?.[1];
  if (!body) throw new Error(`Could not find "${selector}" block in globals.css`);

  const tokens = {};
  for (const [, name, value] of body.matchAll(/--([\w-]+):\s*(#[0-9a-fA-F]{3,8})\s*;/g)) {
    tokens[name] = value;
  }
  return tokens;
}

const themes = {
  light: parseBlock(":root"),
  dark: parseBlock("\\.dark"),
};

// ── Colour maths ────────────────────────────────────────────────────

function toRgb(hex) {
  let h = hex.replace("#", "");
  if (h.length === 3) h = [...h].map((c) => c + c).join("");
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);
}

const channel = (c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);

function luminance(hex) {
  const [r, g, b] = toRgb(hex).map(channel);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(a, b) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

// ── What to check ───────────────────────────────────────────────────

const SURFACES = ["surface-base", "surface-subtle", "surface-raised", "surface-overlay"];

/** [foreground, backgrounds, minimum ratio, note] */
const PAIRS = [
  ["text-primary", SURFACES, 4.5],
  ["text-secondary", SURFACES, 4.5],
  ["text-tertiary", SURFACES, 4.5, "was 3.96:1 in the old palette"],
  ["accent-text", SURFACES, 4.5],
  ["success", SURFACES, 4.5],
  ["warning", SURFACES, 4.5],
  ["danger", SURFACES, 4.5],
  ["info", SURFACES, 4.5],
  // Text on a filled accent surface (primary button).
  ["accent-contrast", ["accent"], 4.5, "button label on accent fill"],
  ["text-inverse", ["text-primary"], 4.5, "inverted button"],
  // Non-text contrast (WCAG 1.4.11) — borders and focus rings need 3:1.
  ["border-strong", SURFACES, 3, "non-text (1.4.11)"],
  ["ring", SURFACES, 3, "focus ring (1.4.11)"],
  ["accent", SURFACES, 3, "accent as a UI surface (1.4.11)"],
];

// ── Run ─────────────────────────────────────────────────────────────

let failures = 0;
let checks = 0;

for (const [theme, tokens] of Object.entries(themes)) {
  const rows = [];

  for (const [fg, bgs, min, note] of PAIRS) {
    const fgHex = tokens[fg];
    if (!fgHex) {
      console.error(`  ✗ ${theme}: token --${fg} not found`);
      failures++;
      continue;
    }

    for (const bg of bgs) {
      const bgHex = tokens[bg];
      if (!bgHex) continue;

      const ratio = contrast(fgHex, bgHex);
      const pass = ratio >= min;
      checks++;
      if (!pass) failures++;

      if (!pass || process.env.VERBOSE) {
        rows.push({
          pair: `${fg} on ${bg}`,
          ratio: ratio.toFixed(2),
          min: min.toFixed(1),
          status: pass ? "pass" : "FAIL",
          note: note ?? "",
        });
      }
    }
  }

  if (rows.length) {
    console.log(`\n${theme.toUpperCase()}`);
    for (const r of rows) {
      const mark = r.status === "FAIL" ? "✗" : "·";
      console.log(
        `  ${mark} ${r.pair.padEnd(38)} ${r.ratio.padStart(6)} (need ${r.min})  ${r.note}`,
      );
    }
  }
}

console.log("");
if (failures > 0) {
  console.error(`✗ ${failures} of ${checks} contrast checks failed.\n`);
  process.exit(1);
}
console.log(`✓ All ${checks} contrast checks pass (WCAG AA, both themes).\n`);
