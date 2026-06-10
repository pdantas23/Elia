const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;

export type UtmParams = Partial<Record<(typeof UTM_KEYS)[number], string>>;

export function captureUtms(): UtmParams {
  if (typeof window === "undefined") return {};

  const params = new URLSearchParams(window.location.search);
  const utms: UtmParams = {};
  let hasAny = false;

  for (const key of UTM_KEYS) {
    const value = params.get(key);
    if (value) {
      utms[key] = value;
      hasAny = true;
    }
  }

  if (hasAny) {
    sessionStorage.setItem("elia_utms", JSON.stringify(utms));
  }

  return utms;
}

export function getStoredUtms(): UtmParams {
  if (typeof window === "undefined") return {};
  try {
    const raw = sessionStorage.getItem("elia_utms");
    return raw ? (JSON.parse(raw) as UtmParams) : {};
  } catch {
    return {};
  }
}
