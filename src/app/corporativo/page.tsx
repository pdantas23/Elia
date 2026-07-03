import type { Metadata } from "next";

import {
  BookOpen,
  FileImage,
  Gift,
  Handshake,
  LayoutGrid,
  Lightbulb,
  MessagesSquare,
  PackageCheck,
  Palette,
  Printer,
} from "lucide-react";

import { CTAButton } from "@/components/landing/CTAButton";
import {
  CONTAINER,
  EDITORIAL_TOKENS,
  FONT_DISPLAY,
  FONT_MONO,
  FONT_UI,
} from "@/components/landing/editorial-tokens";
import { EditorialFooter } from "@/components/landing/EditorialFooter";
import { EditorialLeadForm } from "@/components/landing/EditorialLeadForm";
import { EventPortfolio } from "@/components/landing/EventPortfolio";
import { FloatingWA } from "@/components/landing/FloatingWA";
import { InlineWA } from "@/components/landing/InlineWA";
import { PhotoCue, PhotoReveal } from "@/components/landing/PhotoReveal";
import { PhotoPlaceholder } from "@/components/landing/PhotoPlaceholder";
import { Reveal } from "@/components/landing/Reveal";
import { TrackedLink } from "@/components/landing/TrackedLink";
import { Topbar } from "@/components/landing/Topbar";
import { StudioMapCard } from "@/components/landing/StudioMapCard";
import { WAButton } from "@/components/landing/WAButton";
import { WALink } from "@/components/landing/WALink";
import {
  STUDIO_ADDRESS,
  STUDIO_CITY,
  STUDIO_MAPS_URL,
  STUDIO_VISIT_NOTE,
  STUDIO_VISIT_TITLE,
} from "@/lib/constants";
import { getCorporateProjects } from "@/lib/portfolio";
import { assetPath } from "@/lib/utils";
import { WHATSAPP_MESSAGES, whatsappLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Identidade Corporativa",
  description:
    "Sistema visual para empresas: marca, papelaria, sinalização e embalagem aplicados com o mesmo padrão. Do cartão à fachada, com acompanhamento de produção.",
  openGraph: {
    title: "Identidade Corporativa | Eliá Identidade Visual",
    description:
      "Sistema visual para empresas: marca, papelaria, sinalização e embalagem. Do cartão à fachada.",
  },
};

// ─────────── WhatsApp ───────────
const WA_HREF = whatsappLink(WHATSAPP_MESSAGES.corporativo);
const WA_STUDIO = whatsappLink(WHATSAPP_MESSAGES.estudio);

// ─────────── shared class strings ───────────
const EYEBROW = `${FONT_MONO} inline-flex items-center gap-[10px] text-[11px] uppercase tracking-[0.18em] text-[var(--ink-soft)]`;
const HEAD_CENTER =
  "flex flex-col items-center text-center mx-auto max-w-[820px] mb-[clamp(36px,6vw,64px)]";
const H2 = `${FONT_DISPLAY} italic font-medium text-[clamp(32px,5.6vw,60px)] leading-[1.05] tracking-[-0.005em] mt-[16px] text-balance`;
const LEDE_CENTER =
  "text-[var(--ink-soft)] text-[clamp(16px,1.7vw,19px)] leading-[1.6] max-w-[52ch] text-pretty mt-[16px]";

// ─────────── section data ───────────
// Entregáveis (Identidade Visual Corporativa). Curtos, máx. 8 palavras.
const INCLUDED_ITEMS = [
  { icon: FileImage, label: "Logotipo em PNG e PDF", src: "/images/entregaveis/logotipo-moodboard.webp" },
  { icon: Palette, label: "Estudo de cores e tipografias", src: "/images/entregaveis/estudo-cores-tipografias.webp" },
  { icon: BookOpen, label: "Manual de aplicação", src: "/images/entregaveis/manual-aplicacao.webp" },
  { icon: Gift, label: "Três aplicações cortesia", src: "/images/entregaveis/tres-aplicacoes-valflores.webp" },
  { icon: Handshake, label: "Consultoria de produção", src: "/images/entregaveis/consultoria-producao-joulou.webp" },
];

// Etapas. Descrição máx. 12 palavras.
const PROCESS_STEPS = [
  { icon: MessagesSquare, title: "Briefing", desc: "Entender o negócio, o público e os pontos de contato.", src: "/images/processo/briefing-postits.webp" },
  { icon: Lightbulb, title: "Conceito", desc: "Direção visual com fundamento estratégico e desdobramentos previstos.", src: "/images/processo/conceito-paleta-azul.webp" },
  { icon: LayoutGrid, title: "Aplicação", desc: "Papelaria, sinalização, embalagem e digital num só sistema.", src: "/images/processo/aplicacao-almofadas.webp" },
  { icon: Printer, title: "Execução", desc: "Gráfica e instalador definidos, produção supervisionada de perto.", src: "/images/processo/execucao-flatlay.webp" },
  { icon: PackageCheck, title: "Entrega", desc: "Arquivos finais e manual para a equipe aplicar.", src: "/images/processo/entrega-leticia-caixa.webp" },
];

const PROJECT_TYPES = ["Marca nova", "Rebranding", "Aplicações", "Outro"];

// ─────────── page ───────────
export default function CorporativoPage() {
  const corporateProjects = getCorporateProjects();

  return (
    <div
      style={EDITORIAL_TOKENS}
      className={`${FONT_UI} bg-[var(--bg)] text-[var(--ink)] min-h-[100dvh] overflow-x-clip text-[16px] leading-[1.6] tracking-[0.005em] [scroll-behavior:smooth]`}
    >
      <Topbar
        sections={[
          { label: "Portfólio", href: "#portfolio" },
          { label: "Como funciona", href: "#como-funciona" },
          { label: "O que você recebe", href: "#entregaveis" },
          { label: "Contato", href: "#contato" },
        ]}
      />
      <main>
        {/* ═══ 1. HERO ═══ Texto + botões centralizados; card de foto. Empilha no mobile. */}
        <section className="bg-[var(--surface)] border-b border-[var(--line)] py-[clamp(40px,7vw,96px)]">
          <div className={CONTAINER}>
            <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-[clamp(32px,5vw,72px)] items-center">
              <Reveal className="flex flex-col items-center text-center gap-[clamp(18px,2.4vw,26px)]">
                <h1
                  className={`${FONT_DISPLAY} italic font-medium text-[clamp(34px,5.8vw,68px)] leading-[1.04] tracking-[-0.012em] m-0 text-balance`}
                >
                  Uma marca consistente,{" "}
                  <span className="text-[var(--brand)]">do conceito ao material entregue.</span>
                </h1>
                <p className="text-[var(--ink-soft)] text-[clamp(16px,1.7vw,19px)] leading-[1.55] max-w-[48ch] text-pretty m-0">
                  O Eliá constrói uma identidade visual que conversa com o
                  público da sua marca e auxilia na ativação para que cada
                  experiência seja única.
                </p>
                <div className="flex flex-wrap justify-center gap-[10px] mt-1">
                  <WAButton href={WA_HREF} section="hero" />
                  <CTAButton
                    href="#contato"
                    label="Solicitar orçamento"
                    destination="form"
                    section="hero"
                  />
                </div>
              </Reveal>

              <Reveal
                variant="photo"
                className="w-full max-w-[440px] mx-auto lg:mx-0 lg:ml-auto"
              >
                <figure className="m-0 rounded-[2px] bg-[var(--bg)] border border-[var(--line)]">
                  <div className="m-[clamp(10px,1.4vw,16px)] border border-[var(--line-strong)] p-[clamp(10px,1.4vw,16px)]">
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <PhotoPlaceholder
                        project="Ótica Brasileira"
                        type="Papelaria e brindes"
                        src={assetPath("/images/hero/corporativo-otica-brasileira.webp")}
                        alt="Sacola e brindes personalizados da Ótica Brasileira sobre uma mesa"
                        priority
                        sizes="(max-width: 1024px) 100vw, 440px"
                      />
                    </div>
                  </div>
                </figure>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ═══ 2. PORTFÓLIO ═══ Explore por projeto. Aparece quando há fotos nas pastas. */}
        {corporateProjects.length > 0 ? (
          <section id="portfolio" className="scroll-mt-[clamp(80px,12vw,110px)] pt-[clamp(16px,4vw,48px)]">
            {/* Portfólio por projeto: carrossel de capas; clicar abre o álbum no lightbox */}
            <div className={CONTAINER}>
              <Reveal className={HEAD_CENTER}>
                <div className={EYEBROW}>
                  <span>Explore por projeto</span>
                </div>
                <h2 className={H2}>Nossos projetos: marcas que elevaram as expectativas.</h2>
                <p className={LEDE_CENTER}>
                  Toque nas imagens para abrir os álbuns.
                </p>
              </Reveal>
            </div>
            <Reveal variant="photo">
              <EventPortfolio events={corporateProjects} page="/corporativo" />
            </Reveal>
          </section>
        ) : null}

        <InlineWA
          section="portfolio"
          waHref={WA_HREF}
          text="Algum dos projetos inspirou você? Entre em contato e vamos conversar."
        />

        {/* ═══ 3. COMO FUNCIONA ═══ Etapas do processo + prazos. */}
        <section
          id="como-funciona"
          className="scroll-mt-[clamp(80px,12vw,110px)] py-[clamp(48px,9vw,104px)]"
        >
          <div className={CONTAINER}>
            <Reveal className={HEAD_CENTER}>
              <div className={EYEBROW}>
                <span>Como funciona</span>
              </div>
              <h2 className={H2}>Do briefing ao material entregue.</h2>
              <p className={LEDE_CENTER}>
                Como o projeto acontece, desde o primeiro contato.
              </p>
            </Reveal>

            <Reveal>
              <ol className="grid grid-cols-1 gap-[2px] list-none p-0 m-0 sm:grid-cols-5">
                {PROCESS_STEPS.map((s, i) => {
                  const Icon = s.icon;
                  return (
                    <li
                      key={i}
                      className="border-t border-[var(--line)] sm:border-t-[var(--line-strong)]"
                    >
                      <PhotoReveal
                        label={s.title}
                        src={assetPath(s.src)}
                        className="flex h-full w-full flex-col items-center text-center gap-2 px-3 py-[clamp(18px,2.5vw,26px)] transition-colors hover:bg-[var(--surface)]"
                      >
                        <Icon className="text-[var(--brand)] transition-transform duration-200 group-hover:scale-110" size={26} strokeWidth={1.5} aria-hidden="true" />
                        <div className="font-semibold text-[14.5px] tracking-[0.02em] text-[var(--ink)]">
                          {s.title}
                          <PhotoCue className="ml-[5px]" />
                        </div>
                        <p className="text-[13px] leading-[1.45] text-[var(--ink-soft)] m-0 max-w-[24ch]">
                          {s.desc}
                        </p>
                      </PhotoReveal>
                    </li>
                  );
                })}
              </ol>
            </Reveal>

            {/* Prazos (linha discreta) */}
            <Reveal className="mt-[clamp(36px,5vw,56px)] text-center">
              <p className={`${FONT_MONO} text-[11.5px] tracking-[0.08em] uppercase text-[var(--ink-quiet)] m-0`}>
                Identidade: 10 dias úteis. Aplicações: 10 dias úteis após
                aprovação. Orçamento válido por 30 dias.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ═══ 4. O QUE VOCÊ RECEBE ═══ Entregáveis (carrossel). */}
        <section
          id="entregaveis"
          className="scroll-mt-[clamp(80px,12vw,110px)] bg-[var(--surface)] border-t border-b border-[var(--line)] py-[clamp(48px,9vw,104px)]"
        >
          <div className={CONTAINER}>
            <Reveal className={HEAD_CENTER}>
              <div className={EYEBROW}>
                <span>O que você recebe</span>
              </div>
              <h2 className={H2}>Tudo que sai do projeto.</h2>
              <p className={LEDE_CENTER}>
                O que é entregue no pacote de Identidade Corporativa.
              </p>
            </Reveal>
            <Reveal className="mx-auto flex max-w-[460px] flex-col">
              {INCLUDED_ITEMS.map((item, i) => {
                const Icon = item.icon;
                return (
                  <PhotoReveal
                    key={i}
                    label={item.label}
                    src={assetPath(item.src)}
                    className="flex w-full items-center gap-[14px] border-b border-[var(--line)] last:border-b-0 px-2 py-[clamp(14px,2vw,18px)] transition-colors hover:bg-[var(--surface)]"
                  >
                    <Icon className="shrink-0 text-[var(--brand)] transition-transform duration-200 group-hover:scale-110" size={26} strokeWidth={1.4} aria-hidden="true" />
                    <span className="text-left text-[15px] leading-[1.3] text-[var(--ink)]">
                      {item.label}
                    </span>
                    <PhotoCue className="ml-auto" />
                  </PhotoReveal>
                );
              })}
            </Reveal>
          </div>
        </section>

        {/* ═══ 5. CONTATO ═══ Formulário + Estúdio fundidos. */}
        <section
          id="contato"
          className="scroll-mt-[clamp(80px,12vw,110px)] bg-[var(--surface)] border-t border-b border-[var(--line)] py-[clamp(56px,10vw,120px)]"
        >
          <div className={CONTAINER}>
            <Reveal className={HEAD_CENTER}>
              <div className={EYEBROW}>
                <span>Contato</span>
              </div>
              <h2 className={H2}>Conte sobre a empresa.</h2>
              <p className={LEDE_CENTER}>
                Briefing curto ao lado, ou direto no WhatsApp.
              </p>
            </Reveal>

            <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-[clamp(40px,5vw,72px)] items-start">
              <Reveal>
                <EditorialLeadForm
                  waHref={WA_HREF}
                  originPage="/corporativo"
                  tipoProjetoDefault="corporativo"
                  projectTypes={PROJECT_TYPES}
                  projectTypeLabel="Tipo de projeto"
                  defaultProjectType="Marca nova"
                  showDateField={false}
                  showBudgetField={false}
                  showNotesField={false}
                />
              </Reveal>

              <Reveal delayMs={120} className="flex flex-col gap-[clamp(18px,2.4vw,26px)] lg:pt-2">
                <div className={EYEBROW}>
                  <span>Escritório</span>
                </div>
                <h3 className={`${FONT_DISPLAY} italic font-medium text-[clamp(22px,2.6vw,30px)] leading-[1.15] m-0 text-balance`}>
                  {STUDIO_VISIT_TITLE}
                </h3>
                <TrackedLink
                  href={STUDIO_MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  trackingEvent={{
                    name: "cta_click",
                    page: "/corporativo",
                    section: "contato",
                    button_label: "Endereço no mapa",
                    destination: "external",
                  }}
                  className="group flex flex-col gap-1 border-t border-[var(--line-strong)] pt-4 transition-opacity hover:opacity-70"
                >
                  <span className={`${FONT_DISPLAY} italic text-[22px] inline-flex items-baseline gap-2`}>
                    {STUDIO_ADDRESS}
                    <span aria-hidden="true" className="text-[15px] not-italic transition-transform duration-200 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]">
                      ↗
                    </span>
                  </span>
                  <span className="text-[15px] text-[var(--ink-soft)]">{STUDIO_CITY}</span>
                </TrackedLink>
                <StudioMapCard />
                <p className="text-[14.5px] leading-[1.55] text-[var(--ink)] m-0">
                  {STUDIO_VISIT_NOTE}
                </p>
                <div className="flex flex-col gap-2.5 pt-1">
                  <WALink
                    href={WA_STUDIO}
                    location="estudio"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center justify-center gap-[10px] rounded-[5px] min-h-[52px] px-[22px] py-[14px] text-[14.5px] font-medium tracking-[0.02em] bg-[var(--ink)] text-[var(--surface)] transition-colors duration-200 hover:bg-[#0F0D0B]"
                  >
                    Agendar visita
                    <span aria-hidden="true" className={`${FONT_DISPLAY} text-[18px] leading-none transition-transform duration-200 group-hover:translate-x-[3px]`}>
                      →
                    </span>
                  </WALink>
                  <WAButton href={WA_HREF} section="contato" variant="secondary" />
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      </main>

      <EditorialFooter />
      <FloatingWA href={WA_HREF} />
    </div>
  );
}
