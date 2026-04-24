#!/usr/bin/env node
// Tiny static server for the audio auditioner.
// Serves tools/audio-auditioner/* at /, and maps /audio/* -> public/audio/*.

import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..", "..");
const toolDir = __dirname;
const publicDir = path.join(repoRoot, "public");
const port = Number(process.env.AUDITION_PORT || 4321);

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".mjs": "application/javascript",
  ".js": "application/javascript",
  ".json": "application/json",
  ".css": "text/css",
  ".mp3": "audio/mpeg",
  ".wav": "audio/wav",
  ".ogg": "audio/ogg",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".ico": "image/x-icon",
};

const server = http.createServer((req, res) => {
  try {
    let urlPath = decodeURIComponent(req.url.split("?")[0]);
    if (urlPath === "/") urlPath = "/index.html";

    let filePath;
    if (urlPath.startsWith("/audio/")) {
      filePath = path.join(publicDir, urlPath);
    } else {
      filePath = path.join(toolDir, urlPath);
    }

    // Prevent escaping allowed roots
    if (!filePath.startsWith(toolDir) && !filePath.startsWith(publicDir)) {
      res.writeHead(403);
      res.end("forbidden");
      return;
    }

    fs.stat(filePath, (err, stat) => {
      if (err || !stat.isFile()) {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("not found: " + urlPath);
        return;
      }
      const ct = MIME[path.extname(filePath)] || "application/octet-stream";
      res.writeHead(200, {
        "Content-Type": ct,
        "Cache-Control": "no-store",
        "Accept-Ranges": "bytes",
      });
      fs.createReadStream(filePath).pipe(res);
    });
  } catch (e) {
    res.writeHead(500);
    res.end(String(e));
  }
});

server.listen(port, () => {
  const url = `http://localhost:${port}/`;
  console.log(`\n  audio-auditioner ready → ${url}\n`);
  console.log("  Space = play next • Enter = replay • B = toggle BG music • S = stop");
  // Try to open the page automatically on macOS
  if (process.platform === "darwin") {
    import("node:child_process").then(({ spawn }) => {
      spawn("open", [url], { stdio: "ignore", detached: true }).unref();
    });
  }
});
