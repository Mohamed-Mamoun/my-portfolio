#!/usr/bin/env node
/**
 * Source-image hygiene.
 *
 * next/image converts and resizes on demand, but the *source* still has
 * to be committed, deployed, and re-encoded on every cache miss. The
 * previous build shipped a 437 KB PNG of a 640px photograph — 43% of
 * total page weight for one portrait.
 *
 * Run after adding images: `npm run optimize:images`
 * Idempotent — already-optimised files are skipped.
 */

import sharp from "sharp";
import { readdir, stat, unlink } from "node:fs/promises";
import { join, extname, basename, dirname } from "node:path";

const TARGETS = [
  { dir: "public/images/profile", maxWidth: 640, quality: 82, toWebp: true },
  { dir: "public/images/projects", maxWidth: 828, quality: 80, toWebp: true },
];

/** Photographs re-encode well; small flat logos often don't. */
const MIN_BYTES_TO_BOTHER = 20 * 1024;

let savedTotal = 0;

for (const { dir, maxWidth, quality, toWebp } of TARGETS) {
  let files;
  try {
    files = await readdir(dir);
  } catch {
    continue;
  }

  for (const file of files) {
    const path = join(dir, file);
    const ext = extname(file).toLowerCase();
    if (![".png", ".jpg", ".jpeg"].includes(ext)) continue;

    const before = (await stat(path)).size;
    if (before < MIN_BYTES_TO_BOTHER) {
      console.log(`  skip  ${path} (${kb(before)}, already small)`);
      continue;
    }

    const image = sharp(path);
    const { width = 0 } = await image.metadata();
    const outPath = toWebp ? join(dirname(path), `${basename(file, ext)}.webp`) : path;

    const buffer = await image
      .resize({ width: Math.min(width, maxWidth), withoutEnlargement: true })
      .webp({ quality })
      .toBuffer();

    if (buffer.length >= before) {
      console.log(`  keep  ${path} (re-encode was larger)`);
      continue;
    }

    await sharp(buffer).toFile(outPath);
    if (outPath !== path) await unlink(path);

    savedTotal += before - buffer.length;
    console.log(`  ✓     ${outPath}  ${kb(before)} → ${kb(buffer.length)}`);
  }
}

console.log(`\nSaved ${kb(savedTotal)} total.\n`);

function kb(bytes) {
  return `${(bytes / 1024).toFixed(0)} KB`;
}
