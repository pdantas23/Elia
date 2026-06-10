"use client";

import {
  BTN_PRIMARY,
  BTN_SECONDARY,
} from "@/components/landing/editorial-tokens";
import { trackWhatsAppClick } from "@/lib/tracking";
import { cn } from "@/lib/utils";

type WAButtonProps = {
  /** Pre-built WhatsApp URL (e.g. https://wa.me/55...?text=...). */
  href: string;
  variant?: "primary" | "secondary";
  label?: string;
  /** Identifier used in tracking + as data attribute on the anchor. */
  section?: string;
  onClick?: () => void;
  /** Extra classes merged on top of the variant (use for color overrides). */
  className?: string;
};

function WAIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="w-4 h-4 shrink-0">
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

export function WAButton({
  href,
  variant = "primary",
  label = "Falar no WhatsApp",
  section,
  onClick,
  className,
}: WAButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(variant === "primary" ? BTN_PRIMARY : BTN_SECONDARY, className)}
      data-tracking-section={section}
      onClick={(e) => {
        trackWhatsAppClick(section ?? "unknown", href);
        onClick?.();
      }}
    >
      <WAIcon />
      <span>{label}</span>
    </a>
  );
}
