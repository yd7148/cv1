import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

/**
 * 模擬 GitHub Pages：以 /<repo>/ 掛在根目錄下提供 dist，
 * 確認前綴改寫後各頁都能載入、資源不 404、內部連結可點。
 *
 * 用法：node scripts/smoke-pages.mjs [repo 名稱]
 */
const repo = process.argv[2] || path.basename(path.resolve("."));
const root = path.resolve("dist");
const base = "/" + repo + "/";
const PORT = 4600 + (Number(process.env.SMOKE_PORT_OFFSET) || 0);

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css",
  ".js": "text/javascript",
  ".svg": "image/svg+xml",
  ".xml": "application/xml",
  ".txt": "text/plain; charset=utf-8",
  ".json": "application/json",
  ".woff2": "font/woff2",
  ".pdf": "application/pdf"
};

const server = http.createServer((req, res) => {
  const p = decodeURIComponent(req.url.split("?")[0]);
  if (!p.startsWith(base)) {
    // GitHub Pages 對專案頁根路徑的行為：302 進子路徑
    res.writeHead(302, { location: base });
    return res.end();
  }
  let f = path.join(root, p.slice(base.length));
  if (p.endsWith("/")) f = path.join(f, "index.html");
  if (fs.existsSync(f) && fs.statSync(f).isDirectory()) f = path.join(f, "index.html");
  if (!fs.existsSync(f)) {
    res.writeHead(404, { "content-type": "text/plain" });
    return res.end("404 " + p);
  }
  res.writeHead(200, { "content-type": TYPES[path.extname(f)] || "application/octet-stream" });
  fs.createReadStream(f).pipe(res);
});

await new Promise((r) => server.listen(PORT, r));
const origin = `http://localhost:${PORT}${base}`;

const PAGES = [
  ["根頁", ""],
  ["中文首頁", "zh/"],
  ["英文首頁", "en/"],
  ["作品集", "zh/works/"],
  ["專案詳情", "zh/works/sic-wafer-yolo/"],
  ["學歷頁", "zh/about/"],
  ["技術筆記", "zh/notes/edge-vs-cloud/"],
  ["聯絡表單", "zh/contact/"],
  ["A4 履歷", "zh/resume/"],
  ["robots.txt", "robots.txt"],
  ["sitemap", "sitemap-0.xml"]
];

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
const page = await ctx.newPage();

const bad = [];
page.on("response", (r) => {
  if (r.status() >= 400) bad.push(r.status() + " " + r.url().replace(origin, base));
});
page.on("pageerror", (e) => bad.push("JS " + e.message));

let rows = [];
for (const [label, p] of PAGES) {
  const url = origin + p;
  bad.length = 0;
  const res = await page.goto(url, { waitUntil: "networkidle" }).catch(() => null);
  await page.waitForTimeout(p.endsWith(".html") || p === "" ? 500 : 0);
  const over = p.endsWith(".html") || p === ""
    ? await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth
      )
    : 0;
  const shown = p.endsWith(".html") || p === "" ? (await page.title()).slice(0, 24) : "";
  rows.push({
    頁面: label,
    狀態: res ? res.status() : "ERR",
    溢出: over,
    失敗請求: bad.length,
    標題: shown
  });
}

// 首頁上的內部連結能不能點
bad.length = 0;
await page.goto(origin + "zh/", { waitUntil: "networkidle" });
await page.waitForTimeout(600);
const linkCheck = await page.evaluate(() => {
  const out = [];
  for (const a of document.querySelectorAll('a[href^="/"]')) {
    const href = a.getAttribute("href");
    if (href && !href.startsWith("/" + location.pathname.split("/")[1] + "/")) {
      out.push(href);
    }
  }
  return [...new Set(out)];
});

console.log("\n=== " + repo + " 於 " + base + " 模擬 Pages ===");
console.table(rows);
console.log("首頁未加 base 前綴的內部連結: " + (linkCheck.length ? linkCheck.join(", ") : "無"));
console.log("整輪失敗請求: " + (bad.length ? bad.join("\n  ") : "無"));

await browser.close();
server.close();
