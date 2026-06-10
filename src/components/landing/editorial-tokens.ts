import type { CSSProperties } from "react";

/**
 * Editorial design tokens used by /eventos and the upcoming editorial pages.
 * Applied as inline style on a wrapper div so descendants can use `var(--brand)` etc.
 */
export const EDITORIAL_TOKENS: CSSProperties & Record<string, string> = {
  ["--brand"]: "#A5A1A1",
  ["--brand-soft"]: "#C7C4C2",
  ["--bg"]: "#F4F0EB",
  ["--surface"]: "#FAF7F2",
  ["--surface-2"]: "#EFEAE3",
  ["--ink"]: "#2A2622",
  ["--ink-soft"]: "#6B6660",
  ["--ink-quiet"]: "#948E88",
  ["--line"]: "rgba(42, 38, 34, 0.10)",
  ["--line-strong"]: "rgba(42, 38, 34, 0.22)",
};

export const FONT_DISPLAY = "font-[var(--font-cormorant-garamond)]";
export const FONT_UI = "font-[var(--font-manrope)]";
export const FONT_MONO = "font-[var(--font-jetbrains-mono)]";

export const CONTAINER = "max-w-[1240px] mx-auto px-[clamp(20px,5vw,56px)]";

export const BTN_BASE =
  "group inline-flex items-center justify-center gap-[10px] rounded-[5px] min-h-[52px] px-[22px] py-[14px] text-[14.5px] font-medium tracking-[0.02em] whitespace-nowrap cursor-pointer border border-transparent transition-[background-color,border-color,color,transform] duration-200 ease-out focus-visible:outline focus-visible:outline-1 focus-visible:outline-[var(--ink)] focus-visible:outline-offset-[3px]";

export const BTN_PRIMARY = `${BTN_BASE} bg-[var(--ink)] text-[var(--surface)] border-[var(--ink)] hover:bg-[#0F0D0B]`;

export const BTN_SECONDARY = `${BTN_BASE} bg-transparent text-[var(--ink)] border-[var(--line-strong)] hover:border-[var(--ink)] hover:bg-[var(--surface)]`;

export const ARROW_CLS = `${FONT_DISPLAY} text-[18px] leading-none transition-transform duration-[220ms] group-hover:translate-x-[3px]`;
