#!/usr/bin/env node
// Wraps `npx remotion render` and inserts a timestamp before the file extension
// so successive renders don't overwrite each other.
//
// Usage:
//   npm run render -- <compositionId> <outputPath> [...remotion args]
//
// Example:
//   npm run render -- ConnectionsPromoV5Portrait out/connections-helper/promo-v5-portrait.mp4 --log=error
//   → writes out/connections-helper/promo-v5-portrait--2026-04-21-1705.mp4

import { spawn } from "node:child_process";
import { dirname, extname, basename, join } from "node:path";

const [, , compositionId, outputPath, ...rest] = process.argv;

if (!compositionId || !outputPath) {
  console.error(
    "Usage: npm run render -- <compositionId> <outputPath> [...remotion args]",
  );
  process.exit(1);
}

const d = new Date();
const pad = (n) => String(n).padStart(2, "0");
const stamp =
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}` +
  `-${pad(d.getHours())}${pad(d.getMinutes())}`;

const ext = extname(outputPath);
const base = basename(outputPath, ext);
const dir = dirname(outputPath);
const stamped = join(dir, `${base}--${stamp}${ext}`);

console.log(`→ rendering to ${stamped}`);

const proc = spawn(
  "npx",
  ["remotion", "render", compositionId, stamped, ...rest],
  { stdio: "inherit" },
);
proc.on("exit", (code) => process.exit(code ?? 0));
