"use client";

import type { CSSProperties } from "react";
import { useState } from "react";

import { PhotoPlaceholder } from "@/components/landing/PhotoPlaceholder";

type CarouselPhoto = {
  project: string;
  type: string;
  /** Already resolved via assetPath. */
  src?: string;
};

/** Quantas imagens originais carregam com prioridade (pré-carregadas). */
const PRIORITY_COUNT = 4;

/**
 * Carrossel automático de fotos com transição suave e contínua.
 * - Pausa ao passar o mouse. Respeita `prefers-reduced-motion` (vira faixa rolável).
 * - As fotos NÃO são clicáveis: o carrossel é apenas exibição.
 * - As primeiras carregam com prioridade e as demais de forma eager, para o
 *   carrossel não aparecer em branco enquanto rola.
 */
export function PhotoCarousel({
  items,
  durationSec = 48,
}: {
  items: CarouselPhoto[];
  durationSec?: number;
}) {
  const [hovering, setHovering] = useState(false);

  if (items.length === 0) return null;

  // Lista duplicada: o translateX(-50%) cria um loop perfeito e sem corte.
  const loop = [...items, ...items];

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
            animationPlayState: hovering ? "paused" : "running",
          } as CSSProperties
        }
      >
        {loop.map((p, i) => {
          const isClone = i >= items.length;
          const isPriority = !isClone && i < PRIORITY_COUNT;
          return (
            <li
              key={i}
              aria-hidden={isClone ? true : undefined}
              className="h-[94%] w-[clamp(240px,30vw,380px)] shrink-0 pr-[6px] sm:pr-3"
            >
              <div className="group block h-full w-full transform-gpu transition-transform duration-[450ms] ease-out">
                <PhotoPlaceholder
                  project={p.project}
                  type={p.type}
                  src={p.src}
                  sizes="(max-width: 640px) 70vw, 30vw"
                  priority={isPriority}
                  loading={isPriority ? undefined : isClone ? "lazy" : "eager"}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
