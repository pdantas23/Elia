import {
  STUDIO_ADDRESS,
  STUDIO_CITY,
  STUDIO_MAPS_EMBED_URL,
} from "@/lib/constants";

/**
 * Card com o mapa do estúdio embutido (Google Maps via iframe, sem API key).
 * Moldura dupla seguindo o padrão editorial das LPs (ver figura da Letícia).
 * Levemente dessaturado para conviver com a paleta; ganha cor no hover.
 */
export function StudioMapCard() {
  return (
    <div className="rounded-[3px] border border-[var(--line)] bg-[var(--bg)] p-[6px]">
      <div className="overflow-hidden rounded-[2px] border border-[var(--line-strong)]">
        <iframe
          src={STUDIO_MAPS_EMBED_URL}
          title={`Mapa do escritório: ${STUDIO_ADDRESS}, ${STUDIO_CITY}`}
          className="block w-full h-[clamp(220px,24vw,280px)] border-0 grayscale-[35%] transition-[filter] duration-300 hover:grayscale-0"
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
}
