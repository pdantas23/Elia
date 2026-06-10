import type { TrackingEvent } from "./events";
import { gtmPush, pushToDataLayer } from "./gtm";
import { trackPixelEvent } from "./pixel";

export type { TrackingEvent } from "./events";

export function trackEvent(event: TrackingEvent) {
  pushToDataLayer(event);
  trackPixelEvent(event);
}

/** Extrai a mensagem pré-preenchida (`?text=`) de uma URL wa.me. */
function messageFromWaHref(href: string): string {
  try {
    return new URL(href).searchParams.get("text") ?? "";
  } catch {
    return "";
  }
}

/**
 * Padrão único de tracking do WhatsApp (idêntico ao projeto Forma):
 * empurra `whatsapp_click` ao dataLayer com `{ location, message }`.
 * Só dataLayer: GA4 e Meta Pixel disparam pelas tags do GTM.
 */
export function trackWhatsAppClick(location: string, href: string) {
  gtmPush("whatsapp_click", { location, message: messageFromWaHref(href) });
}
