import type { TrackingEvent } from "./events";

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

export function pushToDataLayer(event: TrackingEvent) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: event.name,
    ...event,
  });
}

/**
 * Push genérico ao dataLayer, no mesmo formato do projeto Forma (padrão RoyalHub):
 * `dataLayer.push({ event, ...params })`. As tags do GTM (GA4, Meta Pixel)
 * disparam a partir desse evento.
 */
export function gtmPush(event: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
}
