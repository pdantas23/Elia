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
  /** Plural (mantido por compatibilidade). */
  filterLabel: string;
  /** Já resolvidas via assetPath, em ordem. */
  photos: string[];
};

/**
 * Portfólio em carrossel automático: rola sozinho (scroll nativo + requestAnimationFrame),
 * com loop contínuo via lista duplicada. Pausa no hover, no toque e enquanto o
 * lightbox está aberto; o usuário também pode arrastar/deslizar. Clicar numa capa
 * abre o álbum daquele evento / identidade corporativa no lightbox.
 * Scroll nativo garante que o lazy-load do next/image funcione sem sumir/trocar fotos.
 * Respeita `prefers-reduced-motion` (sem auto-rolagem; segue rolável à mão).
 */
export function EventPortfolio({
  events,
  page,
}: {
  events: PortfolioEvent[];
  page: string;
}) {
  const [active, setActive] = useState<PortfolioEvent | null>(null);
  const scrollRef = useRef<HTMLUListElement>(null);
  const pausedRef = useRef(false);
  // Acumulador em float: somar <1px direto no scrollLeft (inteiro em alguns
  // navegadores) trava o avanço. Mantemos a posição aqui e escrevemos no scroll.
  const posRef = useRef(0);

  // Pausa o avanço automático enquanto o lightbox está aberto.
  useEffect(() => {
    pausedRef.current = active !== null;
  }, [active]);

  // Avanço automático contínuo. Ao passar da metade (lista duplicada), volta
  // sem corte, pois as duas metades são idênticas.
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const step = () => {
      if (el.scrollWidth > el.clientWidth) {
        if (pausedRef.current) {
          // Mantém o acumulador sincronizado com o scroll manual do usuário.
          posRef.current = el.scrollLeft;
        } else {
          const half = el.scrollWidth / 2;
          posRef.current += 0.8;
          if (posRef.current >= half) posRef.current -= half;
          el.scrollLeft = posRef.current;
        }
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  if (events.length === 0) return null;

  // Lista duplicada para o loop contínuo e sem corte.
  const loop = [...events, ...events];
  const pause = () => {
    pausedRef.current = true;
  };
  const resume = () => {
    pausedRef.current = active !== null;
  };

  return (
    <div className="relative">
      <ul
        ref={scrollRef}
        onMouseEnter={pause}
        onMouseLeave={resume}
        onTouchStart={pause}
        onTouchEnd={resume}
        className="m-0 flex items-stretch list-none p-0 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        style={{
          WebkitMaskImage:
            "linear-gradient(to right, transparent, #000 4%, #000 96%, transparent)",
          maskImage:
            "linear-gradient(to right, transparent, #000 4%, #000 96%, transparent)",
        }}
      >
        {loop.map((event, i) => {
          const isClone = i >= events.length;
          const count = event.photos.length;
          return (
            <li
              key={i}
              aria-hidden={isClone || undefined}
              className="shrink-0 w-[clamp(280px,80vw,440px)] pr-[clamp(12px,1.6vw,20px)]"
            >
              <button
                type="button"
                tabIndex={isClone ? -1 : undefined}
                onClick={() => {
                  trackEvent({
                    name: "portfolio_item_click",
                    page,
                    item_id: event.slug,
                  });
                  setActive(event);
                }}
                aria-label={`Ver as ${count} fotos de ${event.name}`}
                className="group block w-full cursor-pointer text-left transform-gpu transition-transform duration-[450ms] ease-out hover:scale-[1.02]"
              >
                <div className="relative aspect-[4/5]">
                  <PhotoPlaceholder
                    project={event.name}
                    type={`${event.categoryLabel} · ${count} fotos`}
                    src={event.photos[0]}
                    alt={`${event.name}, ${event.categoryLabel}`}
                    sizes="(max-width: 640px) 80vw, 440px"
                    loading={!isClone && i < 6 ? "eager" : "lazy"}
                  />
                </div>
              </button>
            </li>
          );
        })}
      </ul>

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
    // Trava o scroll no html E no body (a barra do documento pode estar em
    // qualquer um deles); sem padding-right, que também viraria faixa branca.
    const html = document.documentElement;
    const body = document.body;
    const prevHtml = html.style.overflow;
    const prevBody = body.style.overflow;
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      html.style.overflow = prevHtml;
      body.style.overflow = prevBody;
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

        {/* Pré-carrega vizinhas para a navegação manual não piscar.
            Dedup + guarda de count: com 1 foto, os vizinhos seriam [0, 0]. */}
        <div aria-hidden="true" className="hidden">
          {Array.from(
            new Set(count > 1 ? [(idx + 1) % count, (idx - 1 + count) % count] : []),
          ).map((n) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={n} src={event.photos[n]} alt="" />
          ))}
        </div>
      </figure>
    </div>
  );
}
