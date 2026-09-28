const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

const OUT = path.join(__dirname, "shots");
const BASE = process.env.BASE || "http://localhost:4321";

const targets = [
  { slug: "zh-home", url: "/zh/", full: true },
  { slug: "en-home", url: "/en/", full: true },
  { slug: "zh-works", url: "/zh/works/", full: false },
  { slug: "zh-work-detail", url: "/zh/works/sic-wafer-yolo/", full: true },
  { slug: "zh-resume", url: "/zh/resume/", full: true },
  { slug: "zh-about", url: "/zh/about/", full: false },
  { slug: "zh-notes", url: "/zh/notes/", full: false },
  { slug: "zh-note-detail", url: "/zh/notes/edge-vs-cloud/", full: false },
  { slug: "zh-contact", url: "/zh/contact/", full: false },
];

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch();
  const report = [];

  for (const t of targets) {
    for (const scheme of ["light", "dark"]) {
      if (t.full && scheme === "dark") continue; // 精簡：只對首頁做深色
      const ctx = await browser.newContext({
        viewport: { width: 1280, height: 900 },
        colorScheme: scheme,
        locale: "zh-TW",
      });
      const page = await ctx.newPage();
      const errors = [];
      page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
      page.on("pageerror", (e) => errors.push(String(e)));

      const resp = await page.goto(BASE + t.url, { waitUntil: "networkidle" });
      await page.waitForTimeout(400);

      const name = scheme === "light" ? t.slug : t.slug + "-dark";
      await page.screenshot({
        path: path.join(OUT, name + ".png"),
        fullPage: t.full,
        scale: "css",
      });

      const hOverflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth
      );
      report.push({
        page: t.url,
        scheme,
        status: resp.status(),
        hOverflowPx: hOverflow,
        consoleErrors: errors.length,
        firstError: errors[0] || null,
      });
      await ctx.close();
    }
  }

  // 手機版
  const mctx = await browser.newContext({ viewport: { width: 375, height: 780 }, locale: "zh-TW" });
  const mp = await mctx.newPage();
  await mp.goto(BASE + "/zh/", { waitUntil: "networkidle" });
  await mp.waitForTimeout(300);
  await mp.screenshot({ path: path.join(OUT, "zh-home-mobile.png"), fullPage: true, scale: "css" });
  const mOverflow = await mp.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth
  );
  report.push({ page: "/zh/ (375px)", scheme: "light", hOverflowPx: mOverflow });
  await mctx.close();

  // A4 列印 PDF 實測
  const pctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const pp = await pctx.newPage();
  await pp.goto(BASE + "/zh/resume/", { waitUntil: "networkidle" });
  await pp.pdf({
    path: path.join(OUT, "resume-A4.pdf"),
    format: "A4",
    printBackground: true,
  });
  await pctx.close();

  // 列印時個資是否解除
  const vctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const vp = await vctx.newPage();
  await vp.goto(BASE + "/zh/resume/", { waitUntil: "networkidle" });
  const before = await vp.evaluate(() => {
    const el = document.querySelector("[data-pii]");
    return getComputedStyle(el).color;
  });
  await vp.emulateMedia({ media: "print" });
  const after = await vp.evaluate(() => {
    const el = document.querySelector("[data-pii]");
    return getComputedStyle(el).color;
  });
  await vp.emulateMedia({ media: "screen" });
  await vp.screenshot({ path: path.join(OUT, "resume-print-emulation.png"), scale: "css" });
  await vctx.close();

  await browser.close();
  console.log(JSON.stringify({ report, piiScreenColor: before, piiPrintColor: after }, null, 2));
})();
