"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import {
  FONT_DISPLAY,
  FONT_MONO,
} from "@/components/landing/editorial-tokens";
import { PhotoPlaceholder } from "@/components/landing/PhotoPlaceholder";
import { trackEvent } from "@/lib/tracking";

export type PortfolioEvent = {
  /** Ex.: "casamentos/andressa-e-rafael". */
  slug: string;
  name: string;
  category: string;
  /** Singular, vai no card (ex.: "Casamento"). */
  categoryLabel: string;
  /** Plural, vai no chip de filtro (ex.: "Casamentos"). */
  filterLabel: string;
  /** Já resolvidas via assetPath, em ordem. */
  photos: string[];
};

/**
 * Portfólio por evento com filtro de categoria.
 * - Cards no mesmo estilo do carrossel do hero (PhotoPlaceholder), maiores.
 * - Grid de 12 colunas com spans variados (antissimetria) mas gap e largura
 *   total de cada linha fixos: cards da mesma linha compartilham a altura.
 * - Clique no card abre um carrossel manual com as fotos do evento.
 */

// Linhas do padrão assimétrico (somam 12). Cicladas conforme a lista filtrada.
const DESKTOP_ROWS = [[7, 5], [4, 8], [6, 6], [8, 4], [5, 7], [4, 4, 4]] as const;
const MOBILE_ROWS = [[12], [7, 5], [12], [5, 7]] as const;

const SPAN_DESKTOP: Record<number, string> = {
  4: "sm:col-span-4",
  5: "sm:col-span-5",
  6: "sm:col-span-6",
  7: "sm:col-span-7",
  8: "sm:col-span-8",
  12: "sm:col-span-12",
};
const SPAN_MOBILE: Record<number, string> = {
  5: "col-span-5",
  7: "col-span-7",
  12: "col-span-12",
};

// Altura por linha (alterna duas variantes). Mesma linha = mesma altura.
const HEIGHT_DESKTOP = [
  "sm:h-[clamp(300px,32vw,460px)]",
  "sm:h-[clamp(340px,37vw,530px)]",
] as const;
const HEIGHT_MOBILE = [
  "h-[clamp(220px,58vw,330px)]",
  "h-[clamp(190px,48vw,280px)]",
] as const;

type CellLayout = { span: number; row: number };

/** Distribui os cards pelas linhas do padrão; a última linha sempre fecha em 12. */
function layoutCells(count: number, rows: ReadonlyArray<readonly number[]>): CellLayout[] {
  const cells: CellLayout[] = [];
  let i = 0;
  let rowIdx = 0;
  while (i < count) {
    const remaining = count - i;
    let row: readonly number[] = rows[rowIdx % rows.length] ?? [12];
    if (remaining < row.length) row = remaining === 1 ? [12] : [7, 5];
    for (const span of row.slice(0, remaining)) {
      cells.push({ span, row: rowIdx });
      i++;
    }
    rowIdx++;
  }
  return cells;
}

export function EventPortfolio({
  events,
  page,
}: {
  events: PortfolioEvent[];
  page: string;
}) {
  const [filter, setFilter] = useState<string | null>(null);
  const [active, setActive] = useState<PortfolioEvent | null>(null);

  const filters = events.reduce<Array<{ category: string; label: string }>>(
    (acc, e) =>
      acc.some((f) => f.category === e.category)
        ? acc
        : [...acc, { category: e.category, label: e.filterLabel }],
    [],
  );
  const visible = filter ? events.filter((e) => e.category === filter) : events;
  const mobile = layoutCells(visible.length, MOBILE_ROWS);
  const desktop = layoutCells(visible.length, DESKTOP_ROWS);

  if (events.length === 0) return null;

  return (
    <div>
      {/* ─── Filtro ─── */}
      <div
        role="group"
        aria-label="Filtrar portfólio por tipo de evento"
        className="flex flex-wrap justify-center gap-[8px] mb-[clamp(24px,3.5vw,40px)]"
      >
        {[{ category: null as string | null, label: "Todos" }, ...filters].map((f) => {
          const isActive = filter === f.category;
          return (
            <button
              key={f.label}
              type="button"
              aria-pressed={isActive}
              onClick={() => setFilter(f.category)}
              className={`${FONT_MONO} cursor-pointer rounded-[5px] border px-[14px] py-[9px] text-[11px] uppercase tracking-[0.16em] transition-colors duration-200 ${
                isActive
                  ? "border-[var(--ink)] bg-[var(--ink)] text-[var(--surface)]"
                  : "border-[var(--line-strong)] bg-transparent text-[var(--ink-soft)] hover:border-[var(--ink)] hover:text-[var(--ink)]"
              }`}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      {/* ─── Grid assimétrico ─── */}
      <div className="grid grid-cols-12 gap-[10px] sm:gap-3">
        {visible.map((event, i) => {
          const m = mobile[i] ?? { span: 12, row: 0 };
          const d = desktop[i] ?? { span: 12, row: 0 };
          const count = event.photos.length;
          return (
            <button
              key={event.slug}
              type="button"
              onClick={() => {
                trackEvent({
                  name: "portfolio_item_click",
                  page,
                  item_id: event.slug,
                });
                setActive(event);
              }}
              aria-label={`Ver as ${count} fotos de ${event.name}`}
              className={`group block w-full cursor-pointer text-left transform-gpu transition-transform duration-[360ms] ease-out hover:-translate-y-[3px] ${SPAN_MOBILE[m.span] ?? "col-span-12"} ${HEIGHT_MOBILE[m.row % 2]} ${SPAN_DESKTOP[d.span] ?? "sm:col-span-12"} ${HEIGHT_DESKTOP[d.row % 2]}`}
            >
              <PhotoPlaceholder
                project={event.name}
                type={`${event.categoryLabel} · ${count} fotos`}
                src={event.photos[0]}
                alt={`${event.name}, ${event.categoryLabel}`}
                sizes="(max-width: 640px) 100vw, (max-width: 1280px) 60vw, 740px"
              />
            </button>
          );
        })}
      </div>

      {active
        ? createPortal(
            <EventLightbox event={active} onClose={() => setActive(null)} />,
            document.body,
          )
        : null}
    </div>
  );
}

// ─── Carrossel manual (lightbox) ───
function EventLightbox({
  event,
  onClose,
}: {
  event: PortfolioEvent;
  onClose: () => void;
}) {
  const [idx, setIdx] = useState(0);
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchX = useRef<number | null>(null);
  const count = event.photos.length;

  const prev = () => setIdx((i) => (i - 1 + count) % count);
  const next = () => setIdx((i) => (i + 1) % count);

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") setIdx((i) => (i - 1 + count) % count);
      if (e.key === "ArrowRight") setIdx((i) => (i + 1) % count);
    };
    const prevOverflow = document.body.style.overflow;
    const prevPadRight = document.body.style.paddingRight;
    // Compensa a barra de rolagem que some ao travar o scroll (ver PhotoCarousel).
    const sbw = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (sbw > 0) document.body.style.paddingRight = `${sbw}px`;
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPadRight;
      window.removeEventListener("keydown", onKey);
    };
  }, [count, onClose]);

  const src = event.photos[idx];
  const navBtn =
    "flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10 text-white text-[26px] leading-none transition-colors hover:bg-white/20 cursor-pointer";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Fotos de ${event.name}`}
      onClick={onClose}
      className="fixed inset-0 z-[200] flex items-center justify-center p-[clamp(12px,3vw,48px)] bg-black/85"
    >
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label="Fechar"
        className="absolute top-[clamp(12px,2vw,24px)] right-[clamp(12px,2vw,24px)] z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white text-[22px] leading-none transition-colors hover:bg-white/20"
      >
        ×
      </button>

      <figure
        onClick={(e) => e.stopPropagation()}
        onTouchStart={(e) => {
          touchX.current = e.touches[0]?.clientX ?? null;
        }}
        onTouchEnd={(e) => {
          if (touchX.current === null) return;
          const dx = (e.changedTouches[0]?.clientX ?? touchX.current) - touchX.current;
          if (Math.abs(dx) > 40) (dx > 0 ? prev : next)();
          touchX.current = null;
        }}
        className="relative z-10 m-0 flex max-h-full max-w-full flex-col items-center gap-[clamp(10px,1.6vw,16px)]"
      >
        <div className="flex items-center gap-[clamp(8px,2vw,20px)]">
          <button type="button" onClick={prev} aria-label="Foto anterior" className={navBtn}>
            ‹
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            key={src}
            src={src}
            alt={`${event.name}, foto ${idx + 1} de ${count}`}
            className="block h-auto w-auto max-h-[70vh] max-w-[min(78vw,1100px)] rounded-[2px] object-contain"
          />
          <button type="button" onClick={next} aria-label="Próxima foto" className={navBtn}>
            ›
          </button>
        </div>

        <figcaption className="text-center">
          <div
            className={`${FONT_DISPLAY} italic font-medium text-white text-[clamp(18px,2.2vw,24px)] leading-[1.2]`}
          >
            {event.name}
          </div>
          <div
            className={`${FONT_MONO} mt-1 text-[11px] uppercase tracking-[0.16em] text-white/70`}
          >
            {event.categoryLabel} · {String(idx + 1).padStart(2, "0")} /{" "}
            {String(count).padStart(2, "0")}
          </div>
        </figcaption>

        {/* Pré-carrega vizinhas para a navegação manual não piscar. */}
        <div aria-hidden="true" className="hidden">
          {[(idx + 1) % count, (idx - 1 + count) % count].map((n) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={n} src={event.photos[n]} alt="" />
          ))}
        </div>
      </figure>
    </div>
  );
}
