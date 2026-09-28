export type Loc = { zh: string; en: string };

export const identity = {
  name: { zh: "劉士禎", en: "Shih-Chen Liu" },
  currentTitle: {
    zh: "廠務高級工程師",
    en: "Senior Manufacturing Engineer",
  },
  kicker: {
    zh: "第三代半導體（SiC）智慧製造與品質管制",
    en: "Smart Manufacturing & Quality Control for SiC Power Devices",
  },
  lead: {
    zh: "我在做的是：讓碳化矽晶圓的品質管制從人工目視，變成 YOLO 自動檢測。",
    en: "I am replacing manual visual inspection of silicon carbide wafers with YOLO-based automated detection.",
  },
  body: {
    zh: "2023 年起在台化直屬總經理室數位及能源轉型專案組，協助 SiC 試驗工廠建立；並以碩士論文完成 SiC 晶圓表面缺陷自動檢測系統，比較 YOLOv8／v10／v11／v12 後確認 v12 為最佳模型。",
    en: "Since Aug 2023 I have supported the SiC pilot-fab build-out in FCFC's Digital & Energy Transition Group, and completed an MSc thesis delivering a YOLO defect-detection system for SiC wafer surfaces — v12 gave the best precision, recall and mAP across v8/v10/v11.",
  },
  location: { zh: "桃園龜山", en: "Guishan, Taoyuan" },
  availability: {
    zh: "可赴台中／新竹，願意配合出差",
    en: "Open to Taichung / Hsinchu, willing to travel",
  },
  summary: {
    zh: "生物學訓練出身，卻在紡織與化學纖維產業的產線上待了 12 年；30 歲時跨域攻讀資訊電機碩士，把深度學習帶回工廠。現職於台化數位及能源轉型專案組，專注 SiC 第三代半導體的試驗產線建立與品質管制自動化。",
    en: "Trained as a biologist, then spent 12 years on production lines in textile and chemical-fibre manufacturing. At 30 I switched fields to complete an MSc in Information & Electrical Engineering, bringing deep learning back to the factory floor. I now work in FCFC's Digital & Energy Transition Group on SiC pilot-line build-out and quality-control automation.",
  },
} as const;

export const experience = [
  {
    company: { zh: "台灣化學纖維股份有限公司", en: "Formosa Chemicals and Fibre Corporation" },
    dept: { zh: "直屬總經理室 數位及能源轉型專案組／高溫材料組", en: "Office of the President — Digital & Energy Transition Group / High-Temperature Materials" },
    title: { zh: "廠務高級工程師", en: "Senior Manufacturing Engineer" },
    period: "2023/08 – ",
    location: { zh: "桃園龜山", en: "Guishan, Taoyuan" },
    bullets: [
      { zh: "協助 SiC（碳化矽）試驗工廠建立，負責技術評估、跨領域專案整合與廠務執行", en: "Supported the build-out of the SiC (silicon carbide) pilot fab — technical evaluation, cross-functional coordination and manufacturing engineering execution" },
      { zh: "導入機器學習（YOLO）於品質檢測應用，搭配 COMSOL 多物理量模擬進行熱場分析", en: "Introduced machine learning (YOLO) for quality inspection, supported by COMSOL multiphysics thermal-field simulation" },
      { zh: "年度預算編列、費用報銷（技術費、授權金）、資材請購與檢驗", en: "Annual budgeting, expense control (licensing fees), material requisition and incoming inspection" },
      { zh: "環保作業：水污染許可、廢清書變更、廠登申請；投資抵減協助與委外託工管理", en: "Environmental compliance: water permits, waste-clearance amendments, factory registration filings; investment tax-credit support and outsourcing management" },
      { zh: "人員調動、工作規範編修、教育訓練（含委外）、資安與資訊設備管理、出入廠作業管理", en: "Staffing, work-standard authoring, training (including outsourced), IT security and device management, factory access control" },
    ],
    todo: ["TODO: 產線數／團隊人數／年度預算量級", "TODO: SiC 試驗工廠規模（廠房面積／設備數／投資額／時程）"],
  },
  {
    company: { zh: "台化地毯股份有限公司", en: "Formosa FCFC Arpet Corporation" },
    dept: { zh: "營業部／工廠", en: "Sales Department / Plant" },
    title: { zh: "廠務高級工程師 · 銷售管理師 · 品管工程師", en: "Senior Costing Engineer · Sales Manager · Quality Engineer" },
    period: "2014/04 – 2023/07",
    location: { zh: "台北（營業部）／桃園龜山（工廠）", en: "Taipei (Sales) / Guishan, Taoyuan (Plant)" },
    bullets: [
      { zh: "廠務高工師：成本估算、每月損益預估、月經營績效分析（單位成本）", en: "Costing: cost estimation, monthly P&L forecasting, monthly per-unit cost performance review" },
      { zh: "銷售管理師：外銷新客戶開發、客訴處理、展場規劃、樣品準備、產品開發", en: "Sales management: export new-business development, complaint handling, trade-fair planning, sample preparation, product development" },
      { zh: "品管工程師：配方改善、檢測規範建立", en: "Quality engineering: formulation improvement, inspection-standard authoring" },
      { zh: "協助產品通過美國綠建材認證（Green Building / low-emission 類）", en: "Supported product certification for US green-building requirements" },
    ],
    todo: ["TODO: 年度外銷客戶數／綠建材認證具體產品與市場", "TODO: 成本改善幅度"],
  },
  {
    company: { zh: "國立臺灣大學醫學院附設醫院", en: "National Taiwan University Hospital" },
    dept: { zh: "莊立民實驗室", en: "Chuang Li-Ming Laboratory" },
    title: { zh: "研究助理", en: "Research Assistant" },
    period: "2013/12 – 2014/03",
    location: { zh: "台北市", en: "Taipei" },
    bullets: [
      { zh: "分生實驗、細胞養殖與小鼠組織收集", en: "Cell culture, cell isolation and mouse tissue collection" },
    ],
    todo: [],
  },
] as const;

export const education = [
  {
    school: { zh: "私立逢甲大學", en: "Feng Chia University" },
    degree: { zh: "資訊電機工程 碩士在職學位學程", en: "MSc in Information & Electrical Engineering (Professional Master's Program)" },
    period: "2023/09 – 2025/06",
    thesis: {
      title: {
        zh: "應用目標檢測神經網路（YOLO）在碳化矽晶圓表面之瑕疵檢測",
        en: "The Application of Object Detection Neural Networks (YOLO) in Defect Detection of Wafer Surface of Silicon Carbide",
      },
      advisor: { zh: "李企桓 教授", en: "Prof. Chi-Hung Lee" },
      committee: { zh: "口試委員：李企桓、陳德請、黃宣瑜", en: "Committee: Chi-Hung Lee, Der-Chin Chen, Syuan-Yu Huang" },
      oral: { zh: "口試 2025-06-19 · 代替論文（技術報告）· 103 頁", en: "Oral defence 2025-06-19 · Technical report (applied technology) · 103 pp." },
      url: "https://hdl.handle.net/11296/197078",
    },
  },
  {
    school: { zh: "國立臺灣大學", en: "National Taiwan University" },
    degree: { zh: "生命科學系 碩士班", en: "MSc in Life Sciences" },
    period: "2010/09 – 2013/11",
    thesis: {
      title: {
        zh: "從中草藥萃取物庫中篩選具調控細胞自噬作用的調節劑",
        en: "Screening for autophagy modulators from an herbal extract library",
      },
      advisor: { zh: "潘建源 教授", en: "Prof. Chien-Yuan Pan" },
      committee: { zh: "口試委員：齊肖琪、廖永豐", en: "Committee: Shau-Chi Chi, Yung-Feng Liao" },
      oral: { zh: "口試 2013-08-30 · 學術論文 · 45 頁", en: "Oral defence 2013-08-30 · Academic thesis · 45 pp." },
      url: "https://hdl.handle.net/11296/138193",
    },
  },
  {
    school: { zh: "國立中興大學", en: "National Chung Hsing University" },
    degree: { zh: "生命科學系 學士", en: "BS in Life Sciences" },
    period: "2004/09 – 2008/06",
    thesis: null,
  },
  {
    school: { zh: "私立明道高級中學", en: "Ming Dao High School" },
    degree: { zh: "高中部", en: "Senior High" },
    period: "– 2008/04",
    thesis: null,
  },
] as const;

export const certifications = [
  {
    icon: "🤖",
    name: { zh: "NVIDIA Jetson 開發人工智慧應用證書", en: "NVIDIA Jetson AI Application Development Certificate" },
    issuer: { zh: "勞動部勞動力發展署 iT 職訓局", en: "Workforce Development Agency, Ministry of Labour (iTVET)" },
    date: "2026-04-14",
  },
  {
    icon: "🗣️",
    name: { zh: "TOEIC 語言能力測驗 825 分", en: "TOEIC 825" },
    issuer: { zh: "台灣國際交流基金會", en: "Taiwan Foundation for Democracy (IICF)" },
    date: "2018-06-10",
  },
  {
    icon: "🧠",
    name: { zh: "生成式 AI 認證", en: "Generative AI Certified" },
    issuer: { zh: "勞動部勞動力發展署 桃園分署", en: "WDA Taoyuan Branch" },
    date: "2026-03-15",
  },
  {
    icon: "🔥",
    name: { zh: "防火管理人", en: "Certified Fire Prevention Manager" },
    issuer: { zh: "消防主管機關", en: "Fire authority" },
    date: "",
  },
  {
    icon: "🛡️",
    name: { zh: "保安監督人", en: "Certified Security Supervisor" },
    issuer: { zh: "警察主管機關", en: "Police authority" },
    date: "",
  },
  {
    icon: "🔧",
    name: { zh: "動力機械職類在職訓練（多梯次）", en: "Power Machinery in-service Training (multiple cohorts)" },
    issuer: { zh: "勞動部勞動力發展署 iT 職訓局", en: "WDA iTVET" },
    date: "2025 – 2026",
  },
] as const;

export const keywords = {
  zh: [
    "碳化矽 SiC", "第三代半導體", "半導體製造", "廠務工程", "製程改善",
    "YOLO", "缺陷檢測", "機器視覺", "深度學習", "邊緣 AI",
    "NVIDIA Jetson", "COMSOL 熱場模擬", "良率分析", "品質保證", "專案管理",
  ],
  en: [
    "Silicon Carbide", "Semiconductor Manufacturing", "Process Engineering",
    "Manufacturing Engineering", "YOLO", "Defect Detection", "Machine Vision",
    "Deep Learning", "Edge AI", "NVIDIA Jetson", "COMSOL Simulation",
    "Yield Analysis", "Quality Assurance", "Project Management",
  ],
} as const;
