// Rótulos amigáveis para origem do lead, usados em todo o dashboard.
// Os valores crus (paths e chaves) vêm de leads_elia.origem_pagina / origem_secao.

export const ORIGEM_PAGINA_LABELS: Record<string, string> = {
  "/": "Página inicial",
  "/corporativo": "Corporativo",
  "/eventos": "Eventos",
  "/bio": "Bio / Links",
};

export function originPageLabel(value?: string | null): string {
  if (!value) return "Desconhecida";
  return ORIGEM_PAGINA_LABELS[value] ?? value;
}

export const ORIGEM_SECAO_LABELS: Record<string, string> = {
  hero: "Topo",
  meio: "Meio",
  final: "Final",
  whatsapp: "WhatsApp",
};

export function originSectionLabel(value?: string | null): string {
  if (!value) return "Não informada";
  return ORIGEM_SECAO_LABELS[value] ?? value;
}
