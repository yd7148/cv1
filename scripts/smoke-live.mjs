import { chromium } from "playwright";

const SITES = [
  ["v1", "https://yd7148.github.io/yd7148/"],
  ["v2", "https://yd7148.github.io/yd7148-v2/"],
  ["v3", "https://yd7148.github.io/yd7148-v3/"]
];

const ROUTES = ["", "zh/", "en/", "zh/works/", "zh/works/sic-wafer-yolo/", "zh/about/", "zh/notes/edge-vs-cloud/", "zh/contact/", "zh/resume/", "robots.txt", "sitemap-0.xml"];

const browser = await chromium.launch();
const rows = [];

for (const [name, base] of SITES) {
  for (const r of ROUTES) {
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
    const page = await ctx.newPage();
    const bad = [];
    page.on("response", (x) => {
      if (x.status() >= 400) bad.push(x.status() + " " + x.url());
    });
    page.on("pageerror", (e) => bad.push("JS:" + e.message));
    const res = await page.goto(base + r, { waitUntil: "networkidle", timeout: 45000 }).catch((e) => null);
    await page.waitForTimeout(400);
    const over = /html$/.test(r) || r === ""
      ? await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
      : 0;
    rows.push({
      站台: name,
      路由: "/" + r,
      狀態: res ? res.status() : "ERR",
      溢出: over,
      失敗: bad.length
    });
    if (bad.length) console.log(name, r, "->", bad.slice(0, 3));
    await ctx.close();
  }
}

console.table(rows);
const bad = rows.filter((r) => r.狀態 !== 200 || r.失敗 > 0 || r.溢出 > 0);
console.log(bad.length ? "有問題: " + JSON.stringify(bad) : "三個站台全部 11 個路由 = 200，0 失敗請求，0 橫向溢出");
await browser.close();
