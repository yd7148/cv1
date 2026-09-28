/**
 * GitHub Pages 路徑修補
 * -------------------
 * 這個站台部署在 https://yd7148.github.io/<repo>/，是「專案頁」而不是「使用者頁」，
 * 所以所有資源與內部連結前面都要多一段 /<repo>。
 *
 * Astro 的 base 只會自動處理它自己產生的路徑（/_astro/*、圖片 import 等）；
 * 原始碼裡手寫的 href="/zh/"、src="/images/..." 還是根目錄路徑。
 * 與其去改 50 多處模板（風險高、易漏），不如在建置後統一把 dist 的 HTML 改寫一次。
 *
 * 規則：只改「以單一 / 開頭、不是 / 出現兩次以上」的本機路徑；
 *       跳過 http(s):、mailto:、tel:、# 開頭、以及已經有 base 前綴的。
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));
const repo = path.basename(path.join(root, ".."));
// 這支腳本只會在 npm run build（astro build 之後）執行，所以一律加前綴。
// astro dev 不會呼叫它 —— dev 用的 astro.config.mjs base 保持空字串，網址維持根路徑。
const base = "/" + repo + "/";
const dist = path.join(root, "..", "dist");

if (!fs.existsSync(dist)) {
  console.error("[fix-base] 找不到 dist/，請先執行 astro build");
  process.exit(1);
}

/** 已經有 base 前綴就不再加，避免重複執行時變成 /repo/repo/ */
function alreadyPrefixed(url) {
  return url === "/" + repo || url.startsWith(base);
}

/** 改寫後的數量統計用；避免把 script 內的字串也算進來 */
function countAttrs(html) {
  return (html.match(/ (?:href|src|action|poster|data-src)="/g) || []).length;
}

const ATTR = /\s(href|src|action|poster|data-src)="(\/[^"]*)"/g;

function fixHtml(html) {
  return html.replace(ATTR, (whole, attr, url) => {
    if (alreadyPrefixed(url)) return whole;
    if (url.startsWith("//")) return whole; // protocol-relative
    return ` ${attr}="${base + url.slice(1)}"`;
  });
}

let touched = 0;
let urls = 0;

function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const f = path.join(dir, e.name);
    if (e.isDirectory()) {
      walk(f);
    } else if (e.name.endsWith(".html")) {
      const before = fs.readFileSync(f, "utf8");
      const after = fixHtml(before);
      if (after !== before) {
        urls += countAttrs(before);
        fs.writeFileSync(f, after, "utf8");
        touched++;
      }
    }
  }
}

walk(dist);

// robots.txt 的路徑同樣要加 base，否則 Disallow: /zh/resume/ 在
// https://yd7148.github.io/<repo>/ 下永遠不會命中。
const robots = path.join(dist, "robots.txt");
if (fs.existsSync(robots)) {
  const before = fs.readFileSync(robots, "utf8");
  const after = before.replace(
    /^((?:Disallow|Allow):\s*)(\/.*)$/gm,
    (whole, rule, p) => (alreadyPrefixed(p) ? whole : `${rule}${base}${p.slice(1)}`)
  );
  if (after !== before) {
    fs.writeFileSync(robots, after, "utf8");
    console.log("[fix-base] robots.txt 已加 base 前綴");
  }
}

console.log(`[fix-base] base=${base}  改寫 ${touched} 個 HTML，${urls} 個屬性`);
