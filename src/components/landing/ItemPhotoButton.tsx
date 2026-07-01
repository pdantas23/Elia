"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { FONT_DISPLAY } from "@/components/landing/editorial-tokens";
import { PhotoPlaceholder } from "@/components/landing/PhotoPlaceholder";

/**
 * Seta ">" inclinada ao lado do título de um item (etapa ou entregável).
 * Ao clicar, abre uma foto em modal. A foto (`src`) será adicionada depois;
 * enquanto não houver, mostra um placeholder honesto.
 */
export function ItemPhotoButton({
  label,
  src,
}: {
  label: string;
  src?: string;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    // Trava o scroll no <html> (elemento que rola), senão a barra do documento
    // fica visível como uma faixa branca à direita do modal.
    const docEl = document.documentElement;
    const prevOverflow = docEl.style.overflow;
    const prevPadRight = document.body.style.paddingRight;
    const sbw = window.innerWidth - docEl.clientWidth;
    docEl.style.overflow = "hidden";
    if (sbw > 0) document.body.style.paddingRight = `${sbw}px`;
    window.addEventListener("keydown", onKey);
    return () => {
      docEl.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPadRight;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Ver foto: ${label}`}
        className={`${FONT_DISPLAY} text-[var(--brand)] text-[20px] leading-none ml-[5px] inline-flex -rotate-45 align-middle transition-transform duration-200 hover:-translate-y-[2px] cursor-pointer`}
      >
        ›
      </button>

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
