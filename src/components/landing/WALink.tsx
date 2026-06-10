"use client";

import { type AnchorHTMLAttributes } from "react";

import { trackWhatsAppClick } from "@/lib/tracking";
import { cn } from "@/lib/utils";

interface WALinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /** URL wa.me. */
  href: string;
  /** Local do clique (vira `location` no dataLayer). */
  location: string;
}

/**
 * Link de WhatsApp estilizado que dispara o tracking padrão (whatsapp_click,
 * formato Forma). Usado quando o markup não é o WAButton padrão (ex.: o botão
 * "Agendar visita" do estúdio), inclusive dentro de Server Components.
 */
export function WALink({
  href,
  location,
  onClick,
  className,
  children,
  ...props
}: WALinkProps) {
  return (
    <a
      href={href}
      className={cn(className)}
      onClick={(e) => {
        trackWhatsAppClick(location, href);
        onClick?.(e);
      }}
      {...props}
    >
      {children}
    </a>
  );
}
