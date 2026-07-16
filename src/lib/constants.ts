/**
 * Constantes de contato e estúdio do Eliá.
 *
 * Fonte: material oficial da Letícia (apresentações de orçamento).
 * Itens marcados como PENDENTE devem ser confirmados com a Letícia antes do
 * deploy. Mantidos aqui em um único lugar para facilitar a atualização.
 */

// ─────────── Contato ───────────
/** Telefone/WhatsApp em formato de exibição (DDD 86, Teresina). */
export const CONTACT_PHONE = "(86) 98872-7016";
/** Mesmo número em formato E.164 para deeplinks do WhatsApp. */
export const CONTACT_PHONE_E164 = "5586988727016";

export const INSTAGRAM_HANDLE = "@eliaidentidadevisual";
export const INSTAGRAM_URL = "https://instagram.com/eliaidentidadevisual";

/** PENDENTE: confirmar a URL da página da Letícia no Pinterest. */
export const PINTEREST_URL = "https://br.pinterest.com/eliaidentidadevisual";

export const CONTACT_EMAIL = "aguiarleticia@hotmail.com";

// ─────────── Estúdio (Teresina, PI) ───────────
export const STUDIO_ADDRESS = "Rua das Orquídeas, 781";
export const STUDIO_CITY = "Teresina, PI";
/** Link do Google Maps derivado do endereço, fonte única para todas as LPs. */
export const STUDIO_MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${STUDIO_ADDRESS}, ${STUDIO_CITY}`,
)}`;
/** URL de embed do Google Maps (iframe, sem chave de API). */
export const STUDIO_MAPS_EMBED_URL = `https://www.google.com/maps?q=${encodeURIComponent(
  `${STUDIO_ADDRESS}, ${STUDIO_CITY}`,
)}&z=16&output=embed`;
export const STUDIO_SCHEDULING_NOTE =
  "Atendimento presencial mediante agendamento prévio.";
/** Texto aprovado pela cliente para o bloco Estúdio das LPs (jun/2026). */
export const STUDIO_VISIT_TITLE = "Em Teresina. Agende uma visita.";
export const STUDIO_VISIT_NOTE =
  "O atendimento presencial acontece com hora marcada, para que cada projeto tenha o tempo e a atenção que merece. Para personalizar uma solução, entre em contato e agende uma visita.";
/** Linha curta usada nos rodapés das LPs. */
export const STUDIO_FOOTER_LINE = "Teresina, PI · Atendimento mediante agendamento";
