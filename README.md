# 個人網站 — 劉士禎 / Shih-Chen Liu

隱私優先的個人檔案網站，作為**應徵時的附件**使用。

- **定位主軸**：SiC 第三代半導體智慧製造與品質管制
- **線上網址**：`https://yd7148.github.io/yd7148/`（GitHub Pages，免費）
- **本機預覽**：`http://localhost:4321/`
- **技術**：Astro 7.3 + Tailwind CSS v4，純靜態、零 JavaScript 套件
- **建置產出**：22 個頁面，總計約 272 KB

---

## 快速開始

```bash
npm install
npm run dev        # http://localhost:4321 → 導向 /zh/
npm run build      # 產生 dist/
npm run check      # TypeScript / Astro 型別檢查
npm run preview    # 本機預覽正式建置
```

## 部署到 GitHub Pages

線上網址：`https://yd7148.github.io/yd7148/`（免費，專案頁）

推送即部署 —— [deploy.yml](.github/workflows/deploy.yml) 會在每次 push 到 `main` 時：

```
npm ci → 產生 .env（個資來自 repository secrets）→ npm run build → npm run verify:build → 上傳 dist
```

首次設定（在 GitHub 網頁介面做一次即可）：

1. repo → **Settings → Pages → Source** 選 **GitHub Actions**
2. repo → **Settings → Secrets and variables → Actions → New repository secret**，新增 7 個：
   `PUBLIC_BIRTH`、`PUBLIC_MOBILE`、`PUBLIC_EMAIL`、`PUBLIC_EMAIL_WORK`、
   `PUBLIC_TEL_OFFICE`、`PUBLIC_ADDRESS_ZH`、`PUBLIC_ADDRESS_EN`
3. 手動觸發一次：Actions → **Deploy to GitHub Pages** → Run workflow

之後日常維護只要：

```bash
git add -A && git commit -m "..." && git push
```

### 為什麼要 scripts/  裡那三支

| 檔案 | 解決什麼問題 |
|---|---|
| `scripts/fix-base.mjs` | GitHub Pages 專案頁在子路徑 `/yd7148/`，所有 `href="/zh/"`、`src="/images/..."` 都缺前綴。建置後統一改寫 `dist` 的 HTML 與 `robots.txt`，比改 50 多處模板安全。 |
| `scripts/pii.cjs` | 提供「個資探針」，讓驗證腳本能在公開頁面上檢查有沒有洩漏；探針本身從 `.env` 讀，**不含真實值**。 |
| `scripts/verify-build.mjs` | 部署前的隱私閘關：確認 `robots.txt` 仍擋住 `/resume/`，且除 `/resume/` 外沒有任何公開頁含個資。不通過就中止部署。 |

### 路徑策略

`astro.config.mjs` 的 `base` 只有在 `NODE_ENV=production` 時才等於 `/yd7148`，
所以 `npm run dev` 的網址維持 `http://localhost:4321/zh/`，不必多打一段。

---

## 環境變數（個資）

個資**不寫在原始碼裡**，改由 `.env` 提供（`.env` 已在 `.gitignore`）。

```bash
cp .env.example .env    # 第一次
npm run build           # 之後只要 .env 有值就能建置
```

影響範圍只有 `/{lang}/resume/`（A4 列印履歷）。換信箱、搬家、換手機號碼時
**只改 `.env`，不用動版控、不用重新 commit**。

## 資訊架構

| 路由 | 內容 | 進搜尋引擎 |
|---|---|---|
| `/` | 302 → `/zh/` | — |
| `/zh/` `/en/` | 首頁：Hero、數字、為什麼是我、精選專案、關鍵字、經歷、學歷、證照、筆記 | ✅ |
| `/{lang}/works/` | 作品集列表 | ✅ |
| `/{lang}/works/{slug}/` | 作品詳情（問題 → 做法 → 成果） | ✅ |
| `/{lang}/notes/` `/notes/{slug}/` | 技術筆記 | ✅ |
| `/{lang}/about/` | 完整履歷 | ✅ |
| `/{lang}/contact/` | Web3Forms 聯絡表單 | ✅ |
| **`/{lang}/resume/`** | **A4 單頁列印版** | ❌ noindex |

## 隱私設計（三層）

```
第 1 層  完全公開       首頁 / 作品 / 關於 / 筆記 —— 零個資
第 2 層  noindex        /resume/ —— 個資遮罩，列印時自動解除
第 3 層  表單後          手機、公司信箱、戶籍地址只在回信中出現
```

實作要點：

- 個資只存在 `src/data/contact.ts`，僅 `ResumeLayout.astro` 引用
- 遮罩用 `.pii`（`color: transparent`），`@media print` 強制還原
- `robots.txt` 擋 `/zh/resume/`、`/en/resume/`
- `sitemap` filter 排除 `resume` 與 `404`
- `/resume/` 有 `<meta name="robots" content="noindex, nofollow, noarchive">`
- 公開頁面不含任何個資（手機、郵箱、分機、完整地址）；可用 `npm run verify:build` 在部署前自動檢查

---

## 內容維護

### 履歷資料（經歷 / 學歷 / 證照 / 關鍵字）

編輯 `src/data/resume.ts`。雙語欄位一律用 `{ zh, en }` 物件：

```ts
{ zh: "廠務高級工程師", en: "Senior Manufacturing Engineer" }
```

這樣翻譯不可能漏掉其中一邊，工作經驗的中英文也永遠一一對應。

### 個人聯絡資料 / 社群連結

編輯 `src/data/contact.ts`（此檔案**不進公開頁面**）。

### 作品集

`src/content/works/{slug}-zh.md` 與 `{slug}-en.md` 兩個檔案成對存在。

frontmatter 欄位：

| 欄位 | 用途 |
|---|---|
| `summary` | 卡片上的一句話 |
| `problem` | 解決什麼問題 |
| `approach` | 怎麼做（陣列） |
| `impact` | **量化成果**（陣列）—— 最重要 |
| `tech` | 技術棧 |
| `links` | 外部連結（如論文永久網址） |
| `todo` | 待補項目，會在頁面上以 ✏️ 標示 |

### 技術筆記

`src/content/notes/{slug}-zh.md` 與 `{slug}-en.md`。

### 介面文字

`src/lib/i18n.ts` 的 `t.zh` / `t.en`，兩邊必須同結構。

---

## 待補項目（頁面上以 ✏️ TODO 標示）

| 位置 | 內容 |
|---|---|
| `src/data/contact.ts` | GitHub / YouTube / LinkedIn 網址 |
| `src/components/Hero.astro` | 放入 `public/photo.jpg` 後把 `hasPhoto` 改為 `true` |
| `src/data/resume.ts` → 經歷 1 | SiC 試驗工廠規模、團隊人數、年度預算量級 |
| `src/data/resume.ts` → 經歷 2 | 綠建材認證的具體產品與市場、成本改善幅度 |
| `src/pages/{zh,en}/contact.astro` | Web3Forms access key（用 `.env` 裡的 `PUBLIC_EMAIL` 那孼郵箱到 [web3forms.com](https://web3forms.com) 申請） |

---

## 驗證

```bash
npm run check                                  # 型別檢查（0 errors）
npm run build                                  # 22 頁
node verify.cjs                                # 截圖 + 溢出 / console / 遮罩檢查
$env:BASE="http://localhost:4500"; node verify.cjs   # 對正式建置跑
```

`verify.cjs` 會檢查：每頁 HTTP 狀態、橫向溢出、console 錯誤、深淺色截圖、手機 375px、**個資遮罩在螢幕與列印下的行為**、並產生 A4 PDF 到 `shots/resume-A4.pdf`。

## 技術決策

| 決策 | 理由 |
|---|---|
| Astro 7 + Tailwind v4 從空白建置（非套用主題） | 履歷優先的版面與部落格主題的結構幾乎不重疊，套用反而要拆掉大部分 |
| 零前端框架 | 純 Astro + 少量 inline script，`dist` 內 0 個 JS 檔 |
| 雙語用分開路由 `/zh` `/en` | SEO 最佳，且中英文內容可各自演進 |
| 履歷資料放 `.ts`、文章放 `.md` | 履歷中英必須嚴格對應（同公司同年）→ 單一物件最安全；文章長度會各自變化 → 分開檔案 |
| 內容檔名用 `-zh` / `-en` 後綴 | Astro 會把檔名中的點號從 slug 移除，`.zh.md` 會變成 `...zh` |
| A4 列印版獨立 layout | 需要與螢幕版不同的排版密度；`is:global` 避免 Astro 的 style scope 讓 `.pii` 規則失效 |

## 授權與隱私提醒

- 網站內容屬本人所有
- 原始履歷附件（PDF / PPTX）**不放在此網站**，僅在 `../01-原始資料/` 與 `../02-TSMC/`
- `.pw-profile/` 等登入憑證與本專案無關，切勿一併提交
