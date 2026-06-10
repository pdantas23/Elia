import { CONTACT_PHONE_E164 } from "@/lib/constants";

export function whatsappLink(message: string, number?: string): string {
  const phone =
    number ?? process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? CONTACT_PHONE_E164;
  if (!phone) throw new Error("WhatsApp number missing");
  const cleaned = phone.replace(/\D/g, "");
  return `https://wa.me/${cleaned}?text=${encodeURIComponent(message)}`;
}

export const WHATSAPP_MESSAGES = {
  default: "Olá, vim pelo site e quero entender melhor sobre identidade visual.",
  corporativo:
    "Olá, vim pela página corporativa e quero entender melhor sobre identidade visual para minha empresa.",
  eventos:
    "Olá, vim pela página de eventos e quero entender melhor sobre identidade para meu evento.",
  estudio: "Olá, gostaria de agendar uma visita ao estúdio do Eliá.",
} as const;

export type WhatsAppMessageKey = keyof typeof WHATSAPP_MESSAGES;

const PATH_TO_MESSAGE: Record<string, WhatsAppMessageKey> = {
  "/corporativo": "corporativo",
  "/eventos": "eventos",
};

/** Convenience for components that only know the current page path. */
export function whatsappLinkForPath(page?: string): string {
  const key: WhatsAppMessageKey =
    (page ? PATH_TO_MESSAGE[page] : undefined) ?? "default";
  return whatsappLink(WHATSAPP_MESSAGES[key]);
}
