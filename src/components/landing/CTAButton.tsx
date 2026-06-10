"use client";

import {
  ARROW_CLS,
  BTN_PRIMARY,
  BTN_SECONDARY,
} from "@/components/landing/editorial-tokens";
import { cn } from "@/lib/utils";

type CTAButtonProps = {
  href: string;
  label: string;
  variant?: "primary" | "secondary";
  /** Anchor link (#orcamento) sets `internal`; external `↗` arrow uses `external`. */
  arrow?: "internal" | "external" | "none";
  /** Where the button leads — used by parent for tracking metadata. */
  destination?: "whatsapp" | "form" | "internal";
  /** Section identifier kept on the anchor as data attribute. */
  section?: string;
  onClick?: () => void;
  /** Extra classes merged on top of the variant (use for color overrides). */
  className?: string;
};

export function CTAButton({
  href,
  label,
  variant = "secondary",
  arrow = "internal",
  destination,
  section,
  onClick,
  className,
}: CTAButtonProps) {
  const isExternal = href.startsWith("http");
  return (
    <a
      href={href}
      className={cn(variant === "primary" ? BTN_PRIMARY : BTN_SECONDARY, className)}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      data-destination={destination}
      data-tracking-section={section}
      onClick={onClick}
    >
      <span>{label}</span>
      {arrow !== "none" && (
        <span aria-hidden="true" className={ARROW_CLS}>
          {arrow === "external" ? "↗" : "→"}
        </span>
      )}
    </a>
  );
}
