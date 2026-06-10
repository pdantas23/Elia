"use client";

import { MessageCircle } from "lucide-react";
import { whatsappLinkForPath } from "@/lib/whatsapp";
import { trackWhatsAppClick } from "@/lib/tracking";
import { cn } from "@/lib/utils";

interface WhatsAppButtonProps {
  variant: "floating" | "hero" | "inline";
  page?: string;
  section?: string;
  label?: string;
  className?: string;
}

export function WhatsAppButton({
  variant,
  page = "/",
  section = "hero",
  label = "Falar no WhatsApp",
  className,
}: WhatsAppButtonProps) {
  const url = whatsappLinkForPath(page);

  const handleClick = () => {
    trackWhatsAppClick(section, url);
  };

  if (variant === "floating") {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        aria-label="Falar no WhatsApp"
        className={cn(
          "fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105",
          className
        )}
      >
        <MessageCircle className="h-6 w-6" />
      </a>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md px-6 py-3 text-base font-medium transition-opacity hover:opacity-90",
        variant === "hero"
          ? "bg-[#25D366] text-white"
          : "border border-[#25D366] text-[#25D366]",
        className
      )}
    >
      <MessageCircle className="h-5 w-5" />
      {label}
    </a>
  );
}
