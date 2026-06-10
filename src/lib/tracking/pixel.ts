import type { TrackingEvent } from "./events";

declare global {
  interface Window {
    fbq: (...args: unknown[]) => void;
  }
}

const STANDARD_EVENT_MAP: Partial<Record<TrackingEvent["name"], string>> = {
  whatsapp_click: "Contact",
  form_submit_success: "Lead",
  portfolio_item_click: "ViewContent",
};

export function trackPixelEvent(event: TrackingEvent) {
  if (typeof window === "undefined" || !window.fbq) return;

  const standardEvent = STANDARD_EVENT_MAP[event.name];
  if (standardEvent) {
    window.fbq("track", standardEvent, event);
  }

  window.fbq("trackCustom", event.name, event);
}
