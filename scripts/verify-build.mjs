/**
 * 部署前的隱私閘關 —— CI 與本機都能跑。
 *
 * 為什麼要有這道閘關：/resume/ 這頁「設計上」就是要印出個資，
 * 但萬一把個人值不小心寫進首頁、作品頁或任何其他公開頁，這裡就會擋下來。
 * 掛掉比部署出一個洩漏個資的網站好。
 *
 * 檢查兩件事：
 *   1. dist 的 robots.txt 仍然擋住 resume
 *   2. 除 /{lang}/resume/ 以外的所有 HTML，都不含 .env 裡的個資片段
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const { piiProbes } = require(path.join(root, "scripts", "pii.cjs"));

const probes = piiProbes();
if (probes.length === 0) {
  console.warn("[verify-build] ⚠ 讀不到 .env，跳過個資檢查（CI 上 secrets 未設定時會這樣）");
}

const problems = [];

/* ---- 1. robots.txt ---- */
const robots = path.join(dist, "robots.txt");
if (fs.existsSync(robots)) {
  const txt = fs.readFileSync(robots, "utf8");
  for (const lang of ["zh", "en"]) {
    const need = new RegExp(`Disallow:\\s*\\S*${lang}/resume/`);
    if (!need.test(txt)) problems.push(`robots.txt 沒有擋住 ${lang}/resume/`);
  }
} else {
  problems.push("dist 內沒有 robots.txt");
}

/* ---- 2. 公開頁面的個資外洩 ---- */
/** /{lang}/resume/ 本來就要有個資，這一頁不列入檢查（路徑先正規化，Windows 是反斜線） */
const isResumePage = (p) => /(^|\/)resume\/index\.html$/.test(p.split(path.sep).join("/"));
let checked = 0;
(function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith(".html")) {
      if (isResumePage(p)) continue;
      checked++;
      const html = fs.readFileSync(p, "utf8");
      for (const probe of probes) {
        if (html.includes(probe)) {
          problems.push(`${path.relative(root, p)} 含個資片段「${probe}」`);
        }
      }
    }
  }
})(dist);

if (problems.length) {
  console.error("[verify-build] ✗ 有問題，未部署：");
  problems.forEach((p) => console.error("   - " + p));
  process.exit(1);
}

console.log(
  `[verify-build] ✓ ${checked} 個公開 HTML 無個資外洩，robots.txt 正常（探針 ${probes.length} 個）`
);
