"use client";

import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

import { FONT_DISPLAY } from "@/components/landing/editorial-tokens";
import { PhotoPlaceholder } from "@/components/landing/PhotoPlaceholder";

/**
 * Item clicável (etapa ou entregável) que abre uma foto em modal.
 * O item inteiro é o gatilho (ícone + texto + seta). A foto (`src`) será
 * adicionada depois; sem ela, mostra um placeholder honesto.
 * A pista visual de que é clicável é a seta ↗ (PhotoCue) que reage no hover,
 * mais o cursor e o leve realce do grupo, sem precisar de texto.
 */
export function PhotoReveal({
  label,
  src,
  className = "",
  children,
}: {
  label: string;
  src?: string;
  className?: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    // Trava o scroll no html E no body: dependendo do layout, a barra do
    // documento fica num ou no outro. Sem isso, ela aparece como faixa à
    // direita do modal. Sem padding-right (que também viraria faixa).
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
  }, [open]);

  return (
    <>
      <div
        role="button"
        tabIndex={0}
        onClick={() => setOpen(true)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setOpen(true);
          }
        }}
        aria-label={`Ver foto: ${label}`}
        className={`group cursor-pointer ${className}`}
      >
        {children}
      </div>

      {open
        ? createPortal(
            <div
              role="dialog"
              aria-modal="true"
              aria-label={`Foto: ${label}`}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[200] flex items-center justify-center p-[clamp(16px,4vw,56px)] bg-black/85"
            >
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Fechar"
                className="absolute top-[clamp(12px,2vw,24px)] right-[clamp(12px,2vw,24px)] z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white text-[22px] leading-none transition-colors hover:bg-white/20"
              >
                ×
              </button>

              <figure
                onClick={(e) => e.stopPropagation()}
                className="relative z-10 m-0 w-[min(92vw,520px)]"
              >
                <div className="relative aspect-[4/5]">
                  {src ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={src}
                      alt={label}
                      className="absolute inset-0 h-full w-full rounded-[2px] object-cover"
                    />
                  ) : (
                    <PhotoPlaceholder project={label} type="Foto a inserir" />
                  )}
                </div>
                <figcaption
                  className={`${FONT_DISPLAY} italic font-medium text-white text-center text-[clamp(18px,2.2vw,24px)] mt-3`}
                >
                  {label}
                </figcaption>
              </figure>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}

/**
 * Seta "›" inclinada a 45° para cima, ao lado do título do item.
 * Indicadora de que o item abre uma foto; anima no hover do grupo (`group`).
 */
export function PhotoCue({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`${FONT_DISPLAY} inline-flex -rotate-45 align-middle text-[var(--brand)] text-[20px] leading-none transition-transform duration-200 group-hover:-translate-y-[2px] group-hover:translate-x-[1px] ${className}`}
    >
      ›
    </span>
  );
}
