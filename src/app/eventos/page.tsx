import type { Metadata } from "next";
import {
  BookOpen,
  CalendarHeart,
  Gift,
  Handshake,
  LayoutGrid,
  Lightbulb,
  Mail,
  MessagesSquare,
  PackageCheck,
  PenTool,
  Printer,
  Stamp,
  Wine,
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
import { WAButton } from "@/components/landing/WAButton";
import { StudioMapCard } from "@/components/landing/StudioMapCard";
import { WALink } from "@/components/landing/WALink";
import {
  STUDIO_ADDRESS,
  STUDIO_CITY,
  STUDIO_MAPS_URL,
  STUDIO_VISIT_NOTE,
  STUDIO_VISIT_TITLE,
} from "@/lib/constants";
import { getPortfolioEvents } from "@/lib/portfolio";
import { assetPath } from "@/lib/utils";
import { WHATSAPP_MESSAGES, whatsappLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Identidade Festiva",
  description:
    "Identidade visual construída do zero para o seu evento: convite, papelaria, sinalização. Sem pacote pronto, sem template adaptado.",
  openGraph: {
    title: "Identidade Festiva | Eliá Identidade Visual",
    description:
      "Identidade visual construída do zero para o seu evento: convite, papelaria, sinalização. Sem pacote pronto, sem template adaptado.",
  },
};

// ─────────── WhatsApp ───────────
const WA_HREF = whatsappLink(WHATSAPP_MESSAGES.eventos);
const WA_STUDIO = whatsappLink(WHATSAPP_MESSAGES.estudio);

// ─────────── shared class strings ───────────
const EYEBROW = `${FONT_MONO} inline-flex items-center gap-[10px] text-[11px] uppercase tracking-[0.18em] text-[var(--ink-soft)]`;
const HEAD_CENTER =
  "flex flex-col items-center text-center mx-auto max-w-[820px] mb-[clamp(36px,6vw,64px)]";
const H2 = `${FONT_DISPLAY} italic font-medium text-[clamp(32px,5.6vw,60px)] leading-[1.05] tracking-[-0.005em] mt-[16px] text-balance`;
const LEDE_CENTER =
  "text-[var(--ink-soft)] text-[clamp(16px,1.7vw,19px)] leading-[1.6] max-w-[52ch] text-pretty mt-[16px]";

// ─────────── section data ───────────
const PORTFOLIO_BASE = "/images/portfolio";

// Entregáveis (Identidade Visual Festiva). Curtos, máx. 8 palavras.
const INCLUDED_ITEMS = [
  { icon: PenTool, label: "Monograma" },
  { icon: BookOpen, label: "Manual de aplicação" },
  { icon: Mail, label: "Convites impressos e digital" },
  { icon: Wine, label: "Menu de buffet e drinks" },
  { icon: Gift, label: "Brindes personalizados" },
  { icon: Stamp, label: "Estampa exclusiva" },
  { icon: CalendarHeart, label: "Save the date" },
  { icon: Handshake, label: "Consultoria de produção" },
];

// Etapas. Descrição máx. 12 palavras.
const PROCESS_STEPS = [
  { icon: MessagesSquare, title: "Briefing", desc: "Entender o casal, a história e o tom do evento." },
  { icon: Lightbulb, title: "Conceito", desc: "Paleta, tipografia e a razão de cada escolha." },
  { icon: LayoutGrid, title: "Aplicação", desc: "Convite, menu, sinalização e lembrança ganham forma." },
  { icon: Printer, title: "Execução", desc: "Papel e fornecedor definidos, produção acompanhada de perto." },
  { icon: PackageCheck, title: "Entrega", desc: "O material chega na sua mão para o dia." },
];

const EVENT_TYPES = ["Casamento", "15 anos", "Aniversário", "Outro evento social"];

// ─────────── page ───────────
export default function EventosPage() {
  const portfolioEvents = getPortfolioEvents();

  return (
    <div
      style={EDITORIAL_TOKENS}
      className={`${FONT_UI} bg-[var(--bg)] text-[var(--ink)] min-h-[100dvh] overflow-x-clip text-[16px] leading-[1.6] tracking-[0.005em] [scroll-behavior:smooth]`}
    >
      <Topbar
        sections={[
          { label: "Portfólio", href: "#portfolio" },
          { label: "Como funciona", href: "#como-funciona" },
          { label: "Como o projeto acontece", href: "#como-acontece" },
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
                  A sua festa terá{" "}
                  <span className="text-[var(--brand)]">uma personalidade única.</span>
                </h1>
                <p className="text-[var(--ink-soft)] text-[clamp(16px,1.7vw,19px)] leading-[1.55] max-w-[46ch] text-pretty m-0">
                  Identidade visual construída do zero para cada evento, para
                  contar a sua história em cada detalhe.
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
                        project="Lorena e Salomão"
                        type="Convite impresso"
                        src={assetPath("/images/hero/eventos-convite-lorena-salomao.webp")}
                        alt="Convite de casamento impresso ao lado da sacola personalizada do Eliá"
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

        {/* ═══ 2. PORTFÓLIO ═══ Explore por evento. */}
        <section id="portfolio" className="scroll-mt-[clamp(80px,12vw,110px)] pt-[clamp(16px,4vw,48px)]">
          {/* Portfólio por evento: carrossel de capas; clicar abre o álbum no lightbox */}
          <div className={CONTAINER}>
            <Reveal className={HEAD_CENTER}>
              <div className={EYEBROW}>
                <span>Explore por evento</span>
              </div>
              <h2 className={H2}>Uma experiência completa, da entrega do convite à decoração da mesa.</h2>
              <p className={LEDE_CENTER}>
                Toque nas imagens para abrir os álbuns.
              </p>
            </Reveal>
          </div>
          <Reveal variant="photo">
            <EventPortfolio events={portfolioEvents} page="/eventos" />
          </Reveal>
        </section>

        <InlineWA
          section="portfolio"
          waHref={WA_HREF}
          text="Algum dos projetos inspirou você? Entre em contato e vamos conversar."
        />

        {/* ═══ 3. COMO FUNCIONA ═══ O que vem no pacote (entregáveis). */}
        <section
          id="como-funciona"
          className="scroll-mt-[clamp(80px,12vw,110px)] py-[clamp(48px,9vw,104px)]"
        >
          <div className={CONTAINER}>
            <Reveal className={HEAD_CENTER}>
              <div className={EYEBROW}>
                <span>Como funciona</span>
              </div>
              <h2 className={H2}>Sua festa vai além do monograma.</h2>
              <p className={LEDE_CENTER}>
                O que é entregue no pacote da Identidade Festiva.
              </p>
            </Reveal>

            <Reveal variant="photo" className="mx-auto mb-[clamp(28px,4vw,44px)] max-w-[560px]">
              <PhotoPlaceholder
                ratio="r-32"
                project="Caixa Mais um Florescer"
                type="Lembrança entregue"
                src={assetPath(`${PORTFOLIO_BASE}/produtos/caixa-mais-um-florescer.webp`)}
                sizes="(max-width: 640px) 100vw, 560px"
              />
            </Reveal>
            <Reveal className="grid grid-cols-2 gap-x-[clamp(16px,3vw,32px)] gap-y-[clamp(20px,3vw,28px)] sm:grid-cols-4">
              {INCLUDED_ITEMS.map((item, i) => {
                const Icon = item.icon;
                return (
                  <PhotoReveal
                    key={i}
                    label={item.label}
                    className="flex flex-col items-center text-center gap-2.5 rounded-[3px] p-2 transition-colors hover:bg-[var(--surface)]"
                  >
                    <Icon className="text-[var(--brand)] transition-transform duration-200 group-hover:scale-110" size={26} strokeWidth={1.4} aria-hidden="true" />
                    <p className="text-[14.5px] leading-[1.3] text-[var(--ink)] m-0 max-w-[18ch]">
                      {item.label}
                      <PhotoCue className="ml-[4px]" />
                    </p>
                  </PhotoReveal>
                );
              })}
            </Reveal>
          </div>
        </section>

        {/* ═══ 4. COMO O PROJETO ACONTECE ═══ Etapas + Prazos. */}
        <section
          id="como-acontece"
          className="scroll-mt-[clamp(80px,12vw,110px)] bg-[var(--surface)] border-t border-b border-[var(--line)] py-[clamp(48px,9vw,104px)]"
        >
          <div className={CONTAINER}>
            <Reveal className={HEAD_CENTER}>
              <div className={EYEBROW}>
                <span>Como o projeto acontece</span>
              </div>
              <h2 className={H2}>Do briefing ao dia do evento.</h2>
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
              <h2 className={H2}>Conte sobre o evento.</h2>
              <p className={LEDE_CENTER}>
                Briefing curto ao lado, ou direto no WhatsApp.
              </p>
            </Reveal>

            <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-[clamp(40px,5vw,72px)] items-start">
              <Reveal>
                <EditorialLeadForm
                  waHref={WA_HREF}
                  originPage="/eventos"
                  tipoProjetoDefault="evento"
                  projectTypes={EVENT_TYPES}
                  projectTypeLabel="Tipo de evento"
                  defaultProjectType="Casamento"
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
                    page: "/eventos",
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
