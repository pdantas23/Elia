"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { FONT_DISPLAY } from "@/components/landing/editorial-tokens";

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={`h-[15px] w-[15px] ${dir === "left" ? "rotate-180" : ""}`}
    >
      <path
        d="M9 5l7 7-7 7"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Carrossel NÃO automático dos entregáveis. O usuário navega por arrasto,
 * teclado (setas) ou pelos botões nas extremidades. Snap por item, scrollbar
 * oculta. Sem card e sem fundo: o texto fica direto sobre o fundo da seção.
 * Sem animação automática: nada se move sem ação do usuário.
 */
export function DeliverablesCarousel({ items }: { items: string[] }) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const updateEdges = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setAtStart(el.scrollLeft <= 2);
    setAtEnd(el.scrollLeft >= max - 2);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    updateEdges();
    el.addEventListener("scroll", updateEdges, { passive: true });
    window.addEventListener("resize", updateEdges);
    return () => {
      el.removeEventListener("scroll", updateEdges);
      window.removeEventListener("resize", updateEdges);
    };
  }, [updateEdges]);

  const scrollByCard = useCallback((dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const item = el.querySelector<HTMLElement>("[data-card]");
    const gap = 24;
    const step = item ? item.offsetWidth + gap : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  }, []);

  const arrowBtn =
    "absolute top-1/2 -translate-y-1/2 z-10 flex h-[34px] w-[34px] items-center justify-center rounded-full border border-[var(--line)] text-[var(--ink-soft)] transition-[opacity,color,border-color,transform] duration-200 ease-out hover:text-[var(--ink)] hover:border-[var(--line-strong)] active:scale-95 disabled:opacity-0 disabled:cursor-default";

  return (
    <div className="relative">
      <button
        type="button"
        aria-label="Anterior"
        onClick={() => scrollByCard(-1)}
        disabled={atStart}
        className={`${arrowBtn} left-0 sm:-left-1`}
      >
        <Chevron dir="left" />
      </button>

      <ul
        ref={trackRef}
        tabIndex={0}
        aria-label="Entregáveis do projeto"
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") {
            e.preventDefault();
            scrollByCard(1);
          } else if (e.key === "ArrowLeft") {
            e.preventDefault();
            scrollByCard(-1);
          }
        }}
        className="flex list-none gap-[24px] m-0 px-[clamp(40px,6vw,56px)] py-1 overflow-x-auto scroll-smooth snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden outline-none rounded-[10px]"
      >
        {items.map((item, i) => (
          <li
            key={i}
            data-card
            className="snap-center shrink-0 basis-[100%] sm:basis-[50%] lg:basis-[33.333%] flex flex-col items-center text-center gap-[clamp(10px,1.5vw,16px)]"
          >
            <span className={`${FONT_DISPLAY} italic font-medium text-[var(--brand)] text-[clamp(40px,5vw,56px)] leading-none`}>
              0{i + 1}
            </span>
            <p className="text-[clamp(16px,1.7vw,18px)] leading-[1.35] text-[var(--ink)] m-0 max-w-[20ch]">
              {item}
            </p>
          </li>
        ))}
      </ul>

      <button
        type="button"
        aria-label="Próximo"
        onClick={() => scrollByCard(1)}
        disabled={atEnd}
        className={`${arrowBtn} right-0 sm:-right-1`}
      >
        <Chevron dir="right" />
      </button>
    </div>
  );
}
