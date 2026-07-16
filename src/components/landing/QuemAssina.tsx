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
                Publicitária (CEUT, 2002), especialista em Marketing (UFPI, 2003), com
                experiência em marcas há 25 anos, professora universitária, palestrante, esposa do
                Maurício e mãe do Gabriel.
              </p>
              <p className="text-[16.5px] leading-[1.7] text-[var(--ink)] m-0">
                Letícia cresceu rodeada por criatividade, convivendo com familiares que faziam da
                arte a sua profissão. Publicitário, jornalista, escritor, cantora, professora de
                dança, modelo e até miss, são alguns dos exemplos que moldaram o seu mundo.
              </p>
              <p className="text-[16.5px] leading-[1.7] text-[var(--ink)] m-0">
                Após sua formação universitária, atuou como diretora de arte, redatora, diretora de
                criação e coordenadora de marketing em diversas agências de publicidade e empresas.
                Com vasta experiência na área, fundou sua própria agência e permaneceu sócia por 12
                anos, até resolver trilhar ‘carreira solo’ criando um escritório de design que hoje
                é seu filho profissional predileto.
              </p>
              <p className="text-[16.5px] leading-[1.7] text-[var(--ink-soft)] m-0">
                Da extração da essência dessa trajetória, nasceu o Eliá. Com ‘L’ de Letícia e ‘A’ de
                Aguiar.
              </p>
            </>
          ) : (
            <>
              <p className="text-[16.5px] leading-[1.7] text-[var(--ink)] m-0">
                O Eliá desenvolve soluções visuais para eventos e empresas. A expectativa é
                traduzir toda a essência da sua festa ou do seu negócio em um projeto de identidade
                visual único e marcante.
              </p>
              <p className="text-[16.5px] leading-[1.7] text-[var(--ink)] m-0">
                No pacote Festivo, o monograma, convite, estampa, papelaria e brindes
                personalizados são alguns dos produtos visuais criados para tornar a sua festa
                memorável e além do esperado.
              </p>
              <p className="text-[16.5px] leading-[1.7] text-[var(--ink)] m-0">
                Já no pacote Corporativo, o logotipo, papelaria, comunicação visual e embalagens
                personalizadas são trabalhados para fortalecer os valores da sua marca e
                proporcionar experiências únicas aos seus clientes.
              </p>
              <p className="text-[16.5px] leading-[1.7] text-[var(--ink-soft)] m-0">
                Seja qual for o objetivo, o Eliá está pronto para alinhar as etapas e fornecer todo
                o suporte necessário, acompanhando cada detalhe e dando as melhores orientações
                quanto aos materiais e ao design.
              </p>
              <p className={`${FONT_DISPLAY} italic text-[clamp(18px,2vw,22px)] leading-[1.4] text-[var(--ink)] m-0`}>
                Eliá Identidade Visual, além da expectativa.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
