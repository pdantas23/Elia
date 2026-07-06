"use client";

import Image from "next/image";
import { useState } from "react";

import {
  FONT_DISPLAY,
  FONT_MONO,
} from "@/components/landing/editorial-tokens";
import { assetPath } from "@/lib/utils";

type Subject = "elia" | "leticia";

const TABS: { id: Subject; label: string }[] = [
  { id: "elia", label: "Eliá" },
  { id: "leticia", label: "Letícia" },
];

/**
 * Bloco "Quem assina" com navegação entre Eliá e Letícia (Eliá é o padrão).
 * Ao alternar, muda apenas a foto do card e o texto ao lado.
 * O texto institucional do Eliá será inserido depois (placeholder por ora).
 */
export function QuemAssina() {
  const [active, setActive] = useState<Subject>("elia");
  const isLeticia = active === "leticia";

  return (
    <div>
      {/* Navegação Eliá | Letícia */}
      <div
        role="tablist"
        aria-label="Eliá ou Letícia"
        className="flex justify-center gap-[8px] mb-[clamp(28px,4vw,48px)]"
      >
        {TABS.map((t) => {
          const on = active === t.id;
          return (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={on}
              onClick={() => setActive(t.id)}
              className={`${FONT_MONO} cursor-pointer rounded-[5px] border px-[20px] py-[10px] text-[11px] uppercase tracking-[0.18em] transition-colors duration-200 ${
                on
                  ? "border-[var(--ink)] bg-[var(--ink)] text-[var(--surface)]"
                  : "border-[var(--line-strong)] bg-transparent text-[var(--ink-soft)] hover:border-[var(--ink)] hover:text-[var(--ink)]"
              }`}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-[clamp(40px,6vw,96px)] items-start">
        {/* Card (muda só a foto e a legenda) */}
        <figure className="m-0 rounded-[2px] bg-[var(--surface)] border border-[var(--line)]">
          <div className="m-[clamp(10px,1.4vw,16px)] flex flex-col gap-[clamp(16px,2vw,24px)] border border-[var(--line-strong)] p-[clamp(10px,1.4vw,16px)]">
            <div className="relative aspect-[4/5] overflow-hidden">
              {isLeticia ? (
                <Image
                  src={assetPath("/images/leticia/leticia.webp")}
                  alt="Letícia Aguiar, Diretora de Criação do Eliá"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              ) : (
                <Image
                  src={assetPath("/images/decor/elia-estudio-parede.webp")}
                  alt="Assinatura Eliá aplicada na parede do escritório em Teresina, sobre a mesa de trabalho"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover [object-position:center_42%]"
                />
              )}
            </div>
            <figcaption className="text-center pb-[clamp(4px,0.8vw,10px)]">
              <div
                className={`${FONT_DISPLAY} text-[clamp(18px,2vw,24px)] uppercase tracking-[0.22em] text-[var(--ink)]`}
              >
                {isLeticia ? "Letícia Aguiar" : "Eliá"}
              </div>
              <div
                className={`${FONT_MONO} text-[10px] uppercase tracking-[0.22em] mt-2 text-[var(--ink-quiet)]`}
              >
                {isLeticia ? "Diretora de Criação do Eliá" : "Identidade Visual"}
              </div>
            </figcaption>
          </div>
        </figure>

        {/* Texto */}
        <div className="flex flex-col gap-[18px] max-w-[60ch]">
          {isLeticia ? (
            <>
              <p className="text-[16.5px] leading-[1.7] text-[var(--ink)] m-0">
                Letícia Aguiar é Diretora de Criação do Eliá. Publicitária com 25 anos de
                experiência em ativação de marcas, especialista em marketing, foi sócia de uma
                agência de publicidade por 12 anos antes de criar seu escritório. O nome Eliá vem
                da composição do próprio nome: L de Letícia, A de Aguiar.
              </p>
              <p className="text-[16.5px] leading-[1.7] text-[var(--ink)] m-0">
                Diretora de arte, redatora, diretora de criação e coordenadora de marketing ao
                longo da trajetória, hoje conduz o escritório com a mesma premissa: traduzir a
                expectativa do cliente em uma experiência real, sempre além do que se esperava.
              </p>
              <p className="text-[16.5px] leading-[1.7] text-[var(--ink-soft)] m-0">
                O Eliá trabalha com identidade visual aplicada, com atenção específica à produção
                gráfica: papel, gramatura, acabamento, fornecedor. Empresa ou evento, o
                acompanhamento continua mesmo após a identidade ser aprovada.
              </p>
            </>
          ) : (
            <p className="text-[16.5px] leading-[1.7] text-[var(--ink-soft)] m-0">
              O texto de apresentação do Eliá será inserido em breve.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
