/**
 * 個資 —— 僅 /resume/ 列印版使用，螢幕上預設遮罩
 *
 * ⚠️ 隱私：手機、信箱、分機、完整地址、出生年月不再寫在這支檔案裡，
 * 改由環境變數提供（見 .env.example）。原因有二：
 *   1. 這個 repo 會是 public 的，寫死等於把個資公開並永久留在 git 歷程。
 *   2. 換信箱／搬家時只要改 .env，不用動版控。
 *
 * 本機：把 .env.example 複製成 .env 填值。
 * CI：同名變數設在 GitHub Actions secrets（見 .github/workflows/deploy.yml）。
 */

const env = (import.meta.env ?? {}) as Record<string, string | undefined>;
const v = (k: string) => (env[k] ?? "").trim();

export const contact = {
  name: { zh: "劉士禎", en: "Shih-Chen Liu" },
  nameZh: "劉士禎",
  nameAlt: "Silver Liu",
  birth: v("PUBLIC_BIRTH"),
  mobile: v("PUBLIC_MOBILE"),
  email: v("PUBLIC_EMAIL"),
  emailWork: v("PUBLIC_EMAIL_WORK"),
  telOffice: v("PUBLIC_TEL_OFFICE"),
  company: {
    zh: "台灣化學纖維股份有限公司",
    en: "Formosa Chemicals and Fibre Corporation (FCFC)",
  },
  companyDept: {
    zh: "直屬總經理室 數位及能源轉型專案組",
    en: "Office of the President — Digital & Energy Transition Group",
  },
  addressFull: {
    zh: v("PUBLIC_ADDRESS_ZH"),
    en: v("PUBLIC_ADDRESS_EN"),
  },
  addressOffice: {
    zh: "桃園市龜山區文明路 15 號",
    en: "No. 15, Wuming Rd., Guishan Dist., Taoyuan, Taiwan",
  },
  city: { zh: "桃園市龜山區", en: "Guishan, Taoyuan" },
  links: {
    github: "TODO",
    youtube: "TODO",
    linkedin: "TODO",
  },
  availability: {
    zh: "現居桃園龜山 · 可赴台中／新竹 · 願意配合出差",
    en: "Based in Guishan, Taoyuan · Open to Taichung / Hsinchu · Willing to travel",
  },
} as const;

export const socials = [
  { key: "github", icon: "", label: "GitHub", href: contact.links.github, todo: true },
  { key: "youtube", icon: "", label: "YouTube", href: contact.links.youtube, todo: true },
  { key: "linkedin", icon: "in", label: "LinkedIn", href: contact.links.linkedin, todo: true },
] as const;
