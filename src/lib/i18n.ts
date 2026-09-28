export type Locale = "zh" | "en";

export const LOCALES: Locale[] = ["zh", "en"];
export const DEFAULT_LOCALE: Locale = "zh";
export const SITE_URL = "https://yd7148.workers.dev";

/** 對應語言的 pathname，不含前導 / */
export function altPath(pathname: string, to: Locale): string {
  const clean = pathname.replace(/^\/(zh|en)(\/|$)/, "/");
  const rest = clean === "/" || clean === "" ? "/" : clean;
  return `/${to}${rest === "/" ? "/" : rest}`;
}

export const t = {
  zh: {
    nav: { home: "首頁", works: "作品集", resume: "履歷", notes: "技術筆記", contact: "聯絡" },
    hero: {
      role: "廠務高級工程師",
      kicker: "第三代半導體（SiC）智慧製造",
      line2: "12 年工廠實務 · 1 篇 SiC 缺陷檢測碩士論文",
      lead: "我在做的是：讓碳化矽晶圓的品質管制從人工目視，變成 YOLO 自動檢測。",
      body: "2023 年起在台化直屬總經理室數位及能源轉型專案組，協助 SiC 試驗工廠建立；並以碩士論文完成 SiC 晶圓表面缺陷自動檢測系統（YOLOv12 為最佳模型）。",
      ctaResume: "查看 A4 履歷",
      ctaContact: "聯絡我",
      privacyNote: "本站不公開聯絡方式，請透過「聯絡我」表單與我聯繫。",
    },
    stats: [
      { value: "12", unit: "年", label: "工廠現場實務" },
      { value: "3", unit: "學位", label: "含 2 篇碩士論文" },
      { value: "1", unit: "篇", label: "SiC 缺陷檢測論文" },
      { value: "825", unit: "分", label: "TOEIC（2018）" },
    ],
    sections: { why: "為什麼是我", works: "精選專案", exp: "工作經歷", edu: "學歷與論文", cert: "證照與進修", notes: "技術筆記" },
    why: [
      { icon: "🎓", t: "生物學訓練的實驗室方法學", d: "對照實驗、重複性、數據判讀 —— 這套嚴謹的思考習慣，同樣適用於製程參數與缺陷判讀。" },
      { icon: "🏭", t: "12 年不離產線", d: "從台化地毯的廠務與品管，到台化數位及能源轉型專案組的 SiC 試驗工廠建立，我懂現場不是靠讀書，是靠蹲產線。" },
      { icon: "🧠", t: "AI 真的用在生產上", d: "不是上過課而已。碩士論文完整走過資料標註、YOLOv8/v10/v11/v12 訓練比較、Precision/Recall/mAP 評估，並搭配 COMSOL 熱場模擬。" },
      { icon: "🌍", t: "9 年外銷與國際溝通", d: "台化地毯期間負責外銷新客戶開發、客訴處理與展場規劃，TOEIC 825。跨國溝通對我來說是日常。" },
    ],
    resume: { hint: "此頁專為列印最佳化，列印後即可存成 PDF 當作履歷附件使用。", reveal: "顯示聯絡資訊", print: "列印 / 存成 PDF", notice: "本頁含個人聯絡資訊，僅供求職評估使用，請勿散佈或轉載。" },
    contact: { title: "與我聯絡", lead: "本站刻意不公開電話與信箱。若你正在評估我的背景，請填寫下方表單，我會親自回覆。", name: "你的姓名", company: "公司／單位", role: "職稱", reason: "想了解什麼", message: "留言", submit: "送出", privacy: "送出後訊息會寄到我的信箱，網站不會保存你的資料。" },
    foot: { built: "本站為純靜態網站，架設於 Cloudflare Workers，無追蹤 cookie。", rights: "內容版權所有。" },
    common: { present: "現在", loadMore: "更多", backHome: "回首頁", readMore: "閱讀全文", source: "論文永久網址", printPdf: "列印成 PDF" },
  },
  en: {
    nav: { home: "Home", works: "Projects", resume: "Résumé", notes: "Notes", contact: "Contact" },
    hero: {
      role: "Senior Manufacturing Engineer",
      kicker: "Smart Manufacturing for SiC Power Devices",
      line2: "12 years on the factory floor · MSc thesis on SiC wafer defect detection",
      lead: "I am replacing manual visual inspection of silicon carbide wafers with YOLO-based automated detection.",
      body: "Since Aug 2023 I have supported the SiC pilot-fab build-out in FCFC's Digital & Energy Transition Group, and completed an MSc thesis delivering a YOLO defect-detection system for SiC wafer surfaces (v12 achieving the best precision, recall and mAP).",
      ctaResume: "View printable résumé",
      ctaContact: "Contact me",
      privacyNote: "Contact details are deliberately not published here — please use the contact form.",
    },
    stats: [
      { value: "12", unit: "yrs", label: "Manufacturing experience" },
      { value: "3", unit: "degrees", label: "incl. 2 MSc theses" },
      { value: "1", unit: "thesis", label: "on SiC wafer defect detection" },
      { value: "825", unit: "pts", label: "TOEIC (2018)" },
    ],
    sections: { why: "Why me", works: "Selected projects", exp: "Experience", edu: "Education & theses", cert: "Certifications", notes: "Technical notes" },
    why: [
      { icon: "🎓", t: "Wet-lab method from biology", d: "Controls, replicates, reading data honestly. That discipline transfers directly to process parameters and defect triage." },
      { icon: "🏭", t: "12 years never off the floor", d: "From cost and quality roles at Formosa FCFC Arpet to the SiC pilot-fab build-out. I know the line because I lived on it." },
      { icon: "🧠", t: "AI actually in production", d: "Not just coursework. The thesis ran the full path: annotation, YOLOv8/v10/v11/v12 comparison, precision/recall/mAP evaluation, plus COMSOL thermal simulation." },
      { icon: "🌍", t: "9 years of export work", d: "New overseas customer development, complaint handling and trade-fair planning at FCFC Arpet. TOEIC 825." },
    ],
    resume: { hint: "This page is optimised for printing. Print it and save as PDF to use as a CV attachment.", reveal: "Reveal contact details", print: "Print / Save as PDF", notice: "This page contains personal contact details, for recruitment assessment only. Please do not redistribute." },
    contact: { title: "Get in touch", lead: "Phone and email are deliberately not published. If you are evaluating my background, use the form below and I will reply personally.", name: "Your name", company: "Company / Organisation", role: "Your role", reason: "What you would like to know", message: "Message", submit: "Send", privacy: "Your message is emailed to me directly. Nothing is stored on this site." },
    foot: { built: "A fully static site on Cloudflare Workers. No tracking cookies.", rights: "All content rights reserved." },
    common: { present: "Present", loadMore: "More", backHome: "Back home", readMore: "Read more", source: "Permanent thesis URL", printPdf: "Print as PDF" },
  },
} as const;

export function useT(locale: Locale) {
  return t[locale] ?? t.zh;
}
