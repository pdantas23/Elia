"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import {
  FONT_DISPLAY,
  FONT_MONO,
} from "@/components/landing/editorial-tokens";
import { PhotoPlaceholder } from "@/components/landing/PhotoPlaceholder";

type CarouselPhoto = {
  project: string;
  type: string;
  /** Already resolved via assetPath. */
  src?: string;
};

/**
 * Carrossel automático de fotos com transição suave e contínua.
 * - Pausa ao passar o mouse, ao focar um item E enquanto o modal está aberto.
 * - Fotos com `src` são clicáveis: abrem um lightbox (modal) com a imagem.
 * - Respeita `prefers-reduced-motion` (vira faixa rolável, ver globals.css).
 */
export function PhotoCarousel({
  items,
  durationSec = 48,
}: {
  items: CarouselPhoto[];
  durationSec?: number;
}) {
  const [active, setActive] = useState<CarouselPhoto | null>(null);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    const prevOverflow = document.body.style.overflow;
    const prevPadRight = document.body.style.paddingRight;
    // Compensa a barra de rolagem que some ao travar o scroll: sem isso a página
    // (e o overlay) deslocam, deixando uma faixa clara na borda direita.
    const sbw = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (sbw > 0) document.body.style.paddingRight = `${sbw}px`;
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPadRight;
      window.removeEventListener("keydown", onKey);
    };
  }, [active]);

  if (items.length === 0) return null;

  // Lista duplicada: o translateX(-50%) cria um loop perfeito e sem corte.
  const loop = [...items, ...items];
  // Pausa via estilo inline (vence qualquer regra de stylesheet, com ou sem layer).
  // Só `active` (modal) e `hovering`: NÃO usar foco aqui. O modal é um portal e
  // os eventos de foco do portal sobem pela árvore React até o carrossel, o que
  // prendia o estado de foco e impedia o play de voltar ao fechar.
  const paused = active !== null || hovering;

  return (
    <div
      className="elia-carousel relative overflow-hidden"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      style={{
        WebkitMaskImage:
          "linear-gradient(to right, transparent, #000 5%, #000 95%, transparent)",
        maskImage:
          "linear-gradient(to right, transparent, #000 5%, #000 95%, transparent)",
      }}
    >
      <ul
        className="elia-carousel-track m-0 flex items-center w-max list-none p-0 h-[clamp(300px,38vw,460px)]"
        style={
          {
            "--carousel-duration": `${durationSec}s`,
            animationPlayState: paused ? "paused" : "running",
          } as CSSProperties
        }
      >
        {loop.map((p, i) => {
          const isClone = i >= items.length;
          const photo = (
            <PhotoPlaceholder
              project={p.project}
              type={p.type}
              src={p.src}
              sizes="(max-width: 640px) 70vw, 30vw"
            />
          );
          return (
            <li
              key={i}
              aria-hidden={isClone ? true : undefined}
              className="h-[94%] w-[clamp(240px,30vw,380px)] shrink-0 pr-[6px] sm:pr-3"
            >
              {p.src ? (
                <button
                  type="button"
                  tabIndex={isClone ? -1 : undefined}
                  onClick={() => {
                    // Zera hover ao abrir: o overlay fixo nem sempre dispara
                    // mouseleave, e sem isso o carrossel ficaria pausado ao fechar.
                    setHovering(false);
                    setActive(p);
                  }}
                  aria-label={`Ampliar foto: ${p.project}`}
                  className="group block h-full w-full cursor-pointer text-left transition-transform duration-[450ms] ease-out hover:scale-[1.05] transform-gpu"
                >
                  {photo}
                </button>
              ) : (
                <div className="group block h-full w-full transition-transform duration-[450ms] ease-out hover:scale-[1.05] transform-gpu">
                  {photo}
                </div>
              )}
            </li>
          );
        })}
      </ul>

      {active?.src
        ? createPortal(
            <CarouselLightbox photo={active} onClose={() => setActive(null)} />,
            document.body,
          )
        : null}
    </div>
  );
}

function CarouselLightbox({
  photo,
  onClose,
}: {
  photo: CarouselPhoto;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const caption = photo.type ? `${photo.project}, ${photo.type}` : photo.project;

  // Move o foco para o modal (e para fora do carrossel) ao abrir. Isso libera
  // o estado `focused` do carrossel, garantindo que ele volte a rodar ao fechar.
  useEffect(() => {
    closeRef.current?.focus();
  }, []);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Foto ampliada: ${photo.project}`}
      onClick={onClose}
      className="fixed inset-0 z-[200] flex items-center justify-center p-[clamp(16px,4vw,56px)] bg-black/85"
    >
      {/* Fundo é o próprio background do modal (sem camada separada nem
          backdrop-filter): a imagem fica por cima, nítida e sem escurecer, e
          não há costura clara nas bordas. */}
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
        className="relative z-10 m-0 flex max-h-full max-w-full flex-col items-center gap-[clamp(12px,2vw,20px)]"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photo.src}
          alt={caption}
          className="block h-auto w-auto max-h-[75vh] max-w-[92vw] rounded-[2px] object-contain"
        />
        <figcaption className="text-center">
          <div className={`${FONT_DISPLAY} italic font-medium text-white text-[clamp(18px,2.2vw,24px)] leading-[1.2]`}>
            {photo.project}
          </div>
          {photo.type ? (
            <div className={`${FONT_MONO} mt-1 text-[11px] uppercase tracking-[0.16em] text-white/70`}>
              {photo.type}
            </div>
          ) : null}
        </figcaption>
      </figure>
    </div>
  );
}
