import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";

const base = "D:/256gbtemp/01-Project/2026-09-CV/04-Pages";
const repos = process.argv.slice(2);
const tmpRoot = path.join(os.tmpdir(), "ghpages-build");
fs.mkdirSync(tmpRoot, { recursive: true });

for (const repo of repos) {
  const dir = path.join(base, repo);
  const wt = path.join(tmpRoot, repo);
  const wg = (c) =>
    execSync(c, { cwd: wt, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }).trim();

  console.log("=== " + repo + " ===");
  fs.rmSync(wt, { recursive: true, force: true });

  // 從 GitHub 自己的 clone（不用本地當 origin，避免推不出去）
  execSync(`git clone -q --no-checkout --branch main "https://github.com/yd7148/${repo}.git" "${wt}"`, {
    stdio: ["ignore", "pipe", "pipe"]
  });
  wg("git config user.name yd7148");
  wg("git config user.email yd7148@hotmail.com.tw");
  wg("git checkout -q --orphan gh-pages");
  wg("git reset -q");

  // orphan + reset 只清掉 index，main 的檔案還在工作樹裡 —— 全部刪掉再放 dist
  for (const e of fs.readdirSync(wt)) {
    if (e === ".git") continue;
    fs.rmSync(path.join(wt, e), { recursive: true, force: true });
  }

  fs.cpSync(path.join(dir, "dist"), wt, { recursive: true });

  // 沒有這個檔，GitHub Pages 會用 Jekyll 建置，而 Jekyll 會安靜地丟掉
  // 所有底線開頭的資料夾 —— 也就是 Astro 的 /_astro/ 全部 CSS/JS。
  fs.writeFileSync(path.join(wt, ".nojekyll"), "");

  wg("git add -A -f .");
  wg('git commit -q -m "deploy: publish dist snapshot to gh-pages"');
  wg("git push -f origin gh-pages");
  const files = wg("git ls-files").split("\n").filter(Boolean).length;

  fs.rmSync(wt, { recursive: true, force: true });
  console.log("  gh-pages 推送完成，" + files + " 個檔案");
}
