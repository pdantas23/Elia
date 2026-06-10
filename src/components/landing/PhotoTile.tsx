"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import {
  FONT_DISPLAY,
  FONT_MONO,
} from "@/components/landing/editorial-tokens";
import { PhotoPlaceholder } from "@/components/landing/PhotoPlaceholder";

type PhotoTileProps = {
  project: string;
  type: string;
  /** Real image source (already resolved via assetPath). */
  src?: string;
  alt?: string;
  priority?: boolean;
};

/**
 * Tile de portfólio. Com foto real, o clique abre um lightbox (modal) com a
 * imagem ampliada. Sem foto, renderiza o placeholder, sem ação de clique.
 */
export function PhotoTile({ project, type, src, alt, priority }: PhotoTileProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Sem foto real: placeholder não clicável.
  if (!src) {
    return (
      <div className="h-full">
        <PhotoPlaceholder project={project} type={type} />
      </div>
    );
  }

  const caption = alt ?? (type ? `${project}, ${type}` : project);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Ampliar foto: ${project}`}
        className="group block h-full w-full cursor-pointer text-left"
      >
        <div className="h-full transition-transform duration-[360ms] group-hover:-translate-y-[3px]">
          <PhotoPlaceholder project={project} type={type} src={src} priority={priority} />
        </div>
      </button>

      {open
        ? createPortal(
            <div
              role="dialog"
              aria-modal="true"
              aria-label={`Foto ampliada: ${project}`}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[200] flex items-center justify-center p-[clamp(16px,4vw,56px)] bg-black/80 backdrop-blur-[2px]"
            >
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Fechar"
                className="fixed top-[clamp(12px,2vw,24px)] right-[clamp(12px,2vw,24px)] z-[1] flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white text-[22px] leading-none transition-colors hover:bg-white/20"
              >
                ×
              </button>

              <figure
                onClick={(e) => e.stopPropagation()}
                className="m-0 flex max-h-full max-w-full flex-col items-center gap-[clamp(12px,2vw,20px)]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt={caption}
                  className="block h-auto w-auto max-h-[75vh] max-w-[92vw] rounded-[2px] object-contain"
                />
                <figcaption className="text-center">
                  <div
                    className={`${FONT_DISPLAY} italic font-medium text-white text-[clamp(18px,2.2vw,24px)] leading-[1.2]`}
                  >
                    {project}
                  </div>
                  {type ? (
                    <div
                      className={`${FONT_MONO} mt-1 text-[11px] uppercase tracking-[0.16em] text-white/70`}
                    >
                      {type}
                    </div>
                  ) : null}
                </figcaption>
              </figure>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
