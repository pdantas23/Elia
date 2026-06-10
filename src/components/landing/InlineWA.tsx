"use client";

import {
  CONTAINER,
  FONT_DISPLAY,
} from "@/components/landing/editorial-tokens";
import { Reveal } from "@/components/landing/Reveal";
import { WAButton } from "@/components/landing/WAButton";

type InlineWAProps = {
  text: string;
  section: string;
  /** WhatsApp URL — typically computed once per page. */
  waHref: string;
};

export function InlineWA({ text, section, waHref }: InlineWAProps) {
  return (
    <section className="py-[clamp(8px,2vw,24px)]">
      <div className={CONTAINER}>
        <Reveal className="flex flex-wrap items-center justify-between gap-5 py-[clamp(20px,3vw,28px)] border-t border-b border-[var(--line)]">
          <p
            className={`${FONT_DISPLAY} italic font-medium text-[clamp(18px,2.2vw,22px)] text-[var(--ink)] m-0 max-w-[52ch]`}
          >
            {text}
          </p>
          <WAButton href={waHref} section={section} variant="secondary" />
        </Reveal>
      </div>
    </section>
  );
}
