"use client";

import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/**
 * Galeria com parallax em colunas (efeito "Olivier Larose").
 * Cada coluna translada em velocidade diferente conforme a rolagem.
 *
 * Correcoes de estabilidade (o original depende de Lenis):
 * - `useSpring` suaviza o valor de scroll, eliminando o tremor sem sequestrar
 *   a rolagem global da pagina.
 * - O resize ignora mudancas que sao SO de altura (a barra de endereco do
 *   mobile recolhe ao rolar e dispara resize, o que fazia as colunas pularem).
 * - `will-change`/`transform-gpu` para compositar na GPU.
 * - Respeita `prefers-reduced-motion`: cai para um grid estatico.
 * Ref: blog.olivierlarose.com (smooth-parallax-scroll).
 */

type ParallaxPhoto = {
  /** Ja resolvido via assetPath. */
  src?: string;
  project: string;
  type: string;
};

const SPRING = { stiffness: 90, damping: 22, mass: 0.4 } as const;

export function OliverParallax({ images }: { images: ParallaxPhoto[] }) {
  const gallery = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const [reduced, setReduced] = useState(false);

  const { scrollYProgress } = useScroll({
    target: gallery,
    offset: ["start end", "end start"],
  });

  // Suaviza o progresso da rolagem (substitui o Lenis do original).
  const smooth = useSpring(scrollYProgress, SPRING);

  const y = useTransform(smooth, [0, 1], [0, height * 2]);
  const y2 = useTransform(smooth, [0, 1], [0, height * 3.3]);
  const y3 = useTransform(smooth, [0, 1], [0, height * 1.25]);
  const y4 = useTransform(smooth, [0, 1], [0, height * 3]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const applyMotion = () => setReduced(mq.matches);
    mq.addEventListener("change", applyMotion);

    let lastWidth = window.innerWidth;
    const measure = () => setHeight(window.innerHeight);
    const resize = () => {
      // Ignora resize que mexe so na altura (barra de endereco do mobile).
      if (window.innerWidth === lastWidth) return;
      lastWidth = window.innerWidth;
      measure();
    };
    window.addEventListener("resize", resize);

    // Leitura inicial no proximo frame (evita setState sincrono no efeito).
    const raf = requestAnimationFrame(() => {
      applyMotion();
      measure();
    });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      mq.removeEventListener("change", applyMotion);
    };
  }, []);

  if (images.length === 0) return null;

  // 12 posicoes (4 colunas x 3), preenchidas ciclando as fotos reais.
  const slot = (i: number) => images[i % images.length]!;

  // ── Fallback estatico (reduced motion / acessibilidade) ──
  if (reduced) {
    return (
      <div className="grid grid-cols-2 gap-2 px-[clamp(20px,5vw,56px)] sm:grid-cols-3 lg:grid-cols-4">
        {images.map((p, i) => (
          <Frame key={i} photo={p} />
        ))}
      </div>
    );
  }

  const columns: Array<{
    items: ParallaxPhoto[];
    y: MotionValue<number>;
    top: string;
  }> = [
    { items: [slot(0), slot(1), slot(2)], y, top: "-45%" },
    { items: [slot(3), slot(4), slot(5)], y: y2, top: "-95%" },
    { items: [slot(6), slot(7), slot(8)], y: y3, top: "-45%" },
    { items: [slot(9), slot(10), slot(11)], y: y4, top: "-75%" },
  ];

  return (
    <div
      ref={gallery}
      className="relative box-border flex h-[175vh] gap-[2vw] overflow-hidden bg-[var(--surface-2)] p-[2vw]"
    >
      {columns.map((col, ci) => (
        <motion.div
          key={ci}
          style={{ y: col.y, top: col.top }}
          className={`${ci >= 2 ? "hidden md:flex" : "flex"} relative h-full w-1/2 flex-col gap-[2vw] transform-gpu will-change-transform md:w-1/4`}
        >
          {col.items.map((p, i) => (
            <Frame key={i} photo={p} fill />
          ))}
        </motion.div>
      ))}
    </div>
  );
}

function Frame({ photo, fill }: { photo: ParallaxPhoto; fill?: boolean }) {
  return (
    <div
      className={`relative w-full overflow-hidden rounded-[1vw] ${fill ? "h-full" : "aspect-[4/5]"}`}
    >
      {photo.src ? (
        <Image
          src={photo.src}
          alt={`${photo.project}, ${photo.type}`}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-[var(--surface)] text-[10px] uppercase tracking-[0.16em] text-[var(--ink-quiet)]">
          Foto real a inserir
        </div>
      )}
    </div>
  );
}
