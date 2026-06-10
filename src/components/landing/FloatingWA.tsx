"use client";

import { trackWhatsAppClick } from "@/lib/tracking";

type FloatingWAProps = {
  href: string;
  section?: string;
};

function WAIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="w-[18px] h-[18px] shrink-0"
    >
      <path
        d="M3.5 20.5l1.4-4.6A8 8 0 1 1 8 19.4l-4.5 1.1z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M9 9.5c.4 1.6 1.9 3.1 3.5 3.5l1.1-1.2c.2-.2.5-.3.8-.2l2 .8c.3.1.5.4.5.7v1.5c0 .4-.3.7-.7.8a6.6 6.6 0 0 1-7-2 6.6 6.6 0 0 1-2-7c.1-.4.4-.7.8-.7H9c.3 0 .6.2.7.5l.8 2c.1.3 0 .6-.2.8L9 9.5z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function FloatingWA({ href, section = "floating" }: FloatingWAProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-tracking-section={section}
      onClick={() => trackWhatsAppClick(section ?? "floating", href)}
      aria-label="Falar no WhatsApp"
      className="fixed right-[clamp(16px,3vw,28px)] bottom-[clamp(16px,3vw,28px)] z-[90] bg-[var(--ink)] text-[var(--surface)] border border-[var(--ink)] rounded-full pl-[14px] pr-[18px] py-3 flex items-center gap-[10px] text-[13px] font-medium tracking-[0.02em] shadow-[0_10px_32px_rgba(20,18,16,0.18)] cursor-pointer transition-[background-color] duration-200 hover:bg-[#0F0D0B] max-sm:px-3"
    >
      <WAIcon />
      <span className="max-sm:hidden">WhatsApp</span>
    </a>
  );
}
