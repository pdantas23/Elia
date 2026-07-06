import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

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
import { FloatingWA } from "@/components/landing/FloatingWA";
import { InlineWA } from "@/components/landing/InlineWA";
import { PhotoPlaceholder } from "@/components/landing/PhotoPlaceholder";
import { QuemAssina } from "@/components/landing/QuemAssina";
import { Reveal } from "@/components/landing/Reveal";
import { StudioMapCard } from "@/components/landing/StudioMapCard";
import { Topbar } from "@/components/landing/Topbar";
import { TrackedLink } from "@/components/landing/TrackedLink";
import { WAButton } from "@/components/landing/WAButton";
import { WALink } from "@/components/landing/WALink";
import {
  STUDIO_ADDRESS,
  STUDIO_CITY,
  STUDIO_MAPS_URL,
  STUDIO_VISIT_NOTE,
  STUDIO_VISIT_TITLE,
} from "@/lib/constants";
import { assetPath } from "@/lib/utils";
import { WHATSAPP_MESSAGES, whatsappLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Eliá Identidade Visual",
  description:
    "Escritório de identidade visual com domínio de produção gráfica. Atende empresas e eventos com o mesmo critério: o projeto só termina quando o material chega na mão do cliente, e funciona em uso.",
  openGraph: {
    title: "Eliá Identidade Visual",
    description:
      "Identidade visual aplicada. Do conceito ao material entregue. Empresas e eventos.",
  },
};

// ─────────── WhatsApp ───────────
const WA_HREF = whatsappLink(WHATSAPP_MESSAGES.default);
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
const LOGOS_BASE = `${PORTFOLIO_BASE}/logos`;

const TWO_PATHS: Array<{
  title: string;
  desc: string;
  href: string;
  project: string;
  type: string;
  slug: string;
  src?: string;
}> = [
  {
    title: "Identidade corporativa",
    desc: "Marca, papelaria, sinalização. Da fachada ao impresso.",
    href: "/corporativo",
    project: "Montevita",
    type: "Projeto corporativo",
    slug: "/corporativo",
    src: assetPath(`${LOGOS_BASE}/montevita.webp`),
  },
  {
    title: "Identidade festiva",
    desc: "Convite, save the date, menu, sinalização do dia, lembrancinhas. Material físico pensado para gerar uma experiência única.",
    href: "/eventos",
    project: "Convite entregue ao convidado",
    type: "Projeto evento",
    slug: "/eventos",
    src: assetPath(`${PORTFOLIO_BASE}/produtos/convite-nadia-e-daniel.webp`),
  },
];

const PROJECT_OPTIONS = ["Corporativo", "Evento", "Outro", "Ainda não sei"];

// ─────────── page ───────────
export default function HomePage() {
  return (
    <div
      id="top"
      style={EDITORIAL_TOKENS}
      className={`${FONT_UI} bg-[var(--bg)] text-[var(--ink)] min-h-[100dvh] overflow-x-clip text-[16px] leading-[1.6] tracking-[0.005em] [scroll-behavior:smooth]`}
    >
      <Topbar
        homeHref="/"
        sections={[
          { label: "Quem assina", href: "#quem" },
          { label: "Por onde começar", href: "#caminhos" },
          { label: "Contato", href: "#contato" },
        ]}
      />
      <main>
        {/* ═══ 1. HERO ═══ Texto + botões à esquerda; card de foto à direita. Empilha no mobile. */}
        <section className="bg-[var(--surface)] border-b border-[var(--line)] py-[clamp(40px,7vw,96px)]">
          <div className={CONTAINER}>
            <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-[clamp(32px,5vw,72px)] items-center">
              <Reveal className="flex flex-col items-center text-center gap-[clamp(18px,2.4vw,26px)]">
                <h1
                  className={`${FONT_DISPLAY} italic font-medium text-[clamp(36px,5.6vw,72px)] leading-[1.03] tracking-[-0.012em] m-0 text-balance`}
                >
                  Identidade visual{" "}
                  <span className="text-[var(--brand)]">aplicada.</span> Do conceito
                  ao material entregue.
                </h1>
                <p className="text-[var(--ink-soft)] text-[clamp(16px,1.7vw,19px)] leading-[1.55] max-w-[46ch] text-pretty m-0">
                  Domínio de produção gráfica para empresas e eventos.
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
                      <Image
                        src={assetPath("/images/decor/home-materiais-elia.webp")}
                        alt="Materiais impressos do Eliá sobre a mesa: agenda em couro com as iniciais LA e cartões com a assinatura Eliá"
                        fill
                        priority
                        sizes="(max-width: 1024px) 100vw, 440px"
                        className="object-cover [object-position:center_58%]"
                      />
                    </div>
                  </div>
                </figure>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ═══ 2. QUEM ASSINA ═══ Navegação Eliá / Letícia (Eliá primeiro). */}
        <section id="quem" className="scroll-mt-[clamp(80px,12vw,110px)] py-[clamp(48px,9vw,104px)]">
          <div className={CONTAINER}>
            <Reveal className={HEAD_CENTER}>
              <div className={EYEBROW}>
                <span>Quem assina</span>
              </div>
              <h2 className={H2}>Criando experiências além da expectativa.</h2>
            </Reveal>
            <QuemAssina />
          </div>
        </section>

        {/* ═══ 3. POR ONDE COMEÇAR ═══ Dois caminhos. */}
        <section id="caminhos" className="scroll-mt-[clamp(80px,12vw,110px)] py-[clamp(48px,9vw,104px)]">
          <div className={CONTAINER}>
            <Reveal className={HEAD_CENTER}>
              <div className={EYEBROW}>
                <span>Por onde começar</span>
              </div>
              <h2 className={H2}>
                Dois caminhos.
                <br />
                O mesmo critério em ambos.
              </h2>
              <p className={LEDE_CENTER}>
                O Eliá atende dois universos com o mesmo nível de cuidado e domínio técnico: o
                universo Corporativo, onde sua marca se destaca; e a área Festiva, elevando as
                expectativas do seu evento.
              </p>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-[clamp(20px,3vw,32px)]">
              {TWO_PATHS.map((p) => (
                <Reveal key={p.slug} variant="photo" className="h-full">
                  <Link
                    href={p.href}
                    aria-label={`Conhecer: ${p.title}`}
                    className="group h-full flex flex-col items-center text-center gap-4 bg-[var(--surface)] border border-[var(--line)] rounded-[3px] p-[clamp(20px,2.5vw,28px)] transition-transform duration-[360ms] hover:-translate-y-[3px] hover:border-[var(--line-strong)]"
                  >
                    <div className="w-full aspect-[4/3]">
                      <PhotoPlaceholder project={p.project} type={p.type} src={p.src} />
                    </div>
                    <h3 className={`${FONT_DISPLAY} italic font-medium text-[clamp(24px,3vw,32px)] leading-[1.1] m-0`}>
                      {p.title}
                    </h3>
                    <p className="text-[var(--ink-soft)] text-[15.5px] leading-[1.6] m-0 max-w-[40ch]">
                      {p.desc}
                    </p>
                    <span className={`${FONT_DISPLAY} italic text-[var(--ink)] text-[17px] inline-flex items-center gap-2 pt-2 mt-auto`}>
                      Conhecer
                      <span className="transition-transform duration-200 group-hover:translate-x-[3px]">→</span>
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>

            <Reveal className="mt-[clamp(28px,4vw,44px)] text-center">
              <p className="text-[15.5px] leading-[1.6] text-[var(--ink-soft)] m-0">
                Não tem certeza ainda?{" "}
                <TrackedLink
                  href="#contato"
                  trackingEvent={{
                    name: "cta_click",
                    page: "/",
                    section: "caminhos",
                    button_label: "Entre em contato conosco",
                    destination: "form",
                  }}
                  className="text-[var(--ink)] underline underline-offset-4 decoration-[var(--line-strong)] transition-opacity hover:opacity-70"
                >
                  Entre em contato conosco e orientamos você em cada passo.
                </TrackedLink>
              </p>
            </Reveal>
          </div>
        </section>

        <InlineWA
          section="portfolio"
          waHref={WA_HREF}
          text="Algum dos projetos inspirou você? Entre em contato e vamos conversar."
        />

        {/* ═══ 4. CONTATO ═══ Formulário enxuto + Estúdio. */}
        <section
          id="contato"
          className="scroll-mt-[clamp(80px,12vw,110px)] bg-[var(--surface)] border-t border-b border-[var(--line)] py-[clamp(56px,10vw,120px)]"
        >
          <div className={CONTAINER}>
            <Reveal className={HEAD_CENTER}>
              <div className={EYEBROW}>
                <span>Contato</span>
              </div>
              <h2 className={H2}>Empresa ou evento, o primeiro passo é o mesmo.</h2>
              <p className={LEDE_CENTER}>Briefing curto ao lado, ou direto no WhatsApp.</p>
            </Reveal>

            <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-[clamp(40px,5vw,72px)] items-start">
              <Reveal>
                <EditorialLeadForm
                  waHref={WA_HREF}
                  originPage="/"
                  tipoProjetoMap={{
                    Corporativo: "corporativo",
                    Evento: "evento",
                    Outro: "outro",
                    "Ainda não sei": "outro",
                  }}
                  projectTypes={PROJECT_OPTIONS}
                  projectTypeLabel="Tipo de projeto"
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
                    page: "/",
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
