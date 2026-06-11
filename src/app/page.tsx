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
import { OliverParallax } from "@/components/landing/OliverParallax";
import { ParallaxY } from "@/components/landing/ParallaxY";
import { PhotoCarousel } from "@/components/landing/PhotoCarousel";
import { PhotoPlaceholder } from "@/components/landing/PhotoPlaceholder";
import { Reveal } from "@/components/landing/Reveal";
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
const PORTFOLIO_ITEMS: Array<{ project: string; type: string; src?: string }> = [
  { project: "Zurich", type: "Cafés e biscoitos", src: assetPath(`${LOGOS_BASE}/zurich-cafes.webp`) },
  { project: "Andressa e Rafael", type: "Casamento", src: assetPath(`${PORTFOLIO_BASE}/casamentos/andressa-e-rafael.webp`) },
  { project: "Cardio 086", type: "Clínica cardiológica", src: assetPath(`${LOGOS_BASE}/cardio-086.webp`) },
  { project: "Lícia, 40 anos", type: "Aniversário", src: assetPath(`${PORTFOLIO_BASE}/aniversarios/licia-40.webp`) },
  { project: "ArtConcept", type: "Odontologia", src: assetPath(`${LOGOS_BASE}/artconcept.webp`) },
  { project: "Gilian e Caíque", type: "Casamento", src: assetPath(`${PORTFOLIO_BASE}/casamentos/gilian-e-caique.webp`) },
  { project: "Raeda Veículos", type: "Concessionária", src: assetPath(`${LOGOS_BASE}/raeda-veiculos.webp`) },
  { project: "Laís e Carlos", type: "Casamento", src: assetPath(`${PORTFOLIO_BASE}/casamentos/lais-e-carlos.webp`) },
  { project: "Felipe", type: "Batizado", src: assetPath(`${PORTFOLIO_BASE}/batizados/felipe.webp`) },
  { project: "Nádia e Daniel", type: "Convite · Papelaria", src: assetPath(`${PORTFOLIO_BASE}/produtos/convite-nadia-e-daniel.webp`) },
  { project: "Geórgia Lau", type: "Ortodontia", src: assetPath(`${LOGOS_BASE}/georgia-lau.webp`) },
  { project: "Nádia e Daniel", type: "Casamento", src: assetPath(`${PORTFOLIO_BASE}/casamentos/nadia-e-daniel.webp`) },
];

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
    title: "Identidade para eventos",
    desc: "Convite, save the date, menu, sinalização do dia, lembrancinhas. Material físico pensado para gerar uma experiência única.",
    href: "/eventos",
    project: "Convite entregue ao convidado",
    type: "Projeto evento",
    slug: "/eventos",
    src: assetPath(`${PORTFOLIO_BASE}/produtos/convite-nadia-e-daniel.webp`),
  },
];

// Etapas. Copy aprovada pela cliente (jun/2026).
const PROCESS_STEPS = [
  {
    title: "Briefing",
    desc: "Uma conversa para entender o que está sendo construído e quem é o rosto por trás daquela identidade visual.",
  },
  {
    title: "Conceito",
    desc: "A direção visual ganha forma: paleta, tipografia, referências e a razão de cada escolha.",
  },
  {
    title: "Aplicação",
    desc: "A identidade se transforma nos materiais que o projeto pede, do impresso ao ambiente.",
  },
  {
    title: "Execução",
    desc: "Gráfica e fornecedor definidos, especificação fechada e produção acompanhada de perto.",
  },
  {
    title: "Entrega",
    desc: "O material chega pronto para usar, com orientação para as próximas aplicações.",
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
      <Topbar homeHref="/" />
      <main>
        {/* ═══ 1. HERO ═══ Carrossel + parallax sutil. Carrossel por último (mobile e desktop). */}
        <section className="relative bg-[var(--surface)] overflow-x-clip pt-[clamp(32px,4vw,44px)] pb-[clamp(48px,7vw,96px)] flex flex-col gap-[clamp(32px,5vw,60px)]">
          <div className={`${CONTAINER} relative w-full`}>
            <Reveal className="flex flex-col items-center text-center gap-[clamp(16px,2vw,24px)] max-w-[940px] mx-auto">
              <h1
                className={`${FONT_DISPLAY} italic font-medium text-[clamp(36px,6vw,74px)] leading-[1.03] tracking-[-0.012em] m-0 text-balance`}
              >
                Identidade visual{" "}
                <span className="text-[var(--brand)]">aplicada.</span> Do conceito
                ao material entregue.
              </h1>
              <p className="text-[var(--ink-soft)] text-[clamp(16px,1.7vw,19px)] leading-[1.55] max-w-[48ch] text-pretty m-0">
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
          </div>

          <Reveal variant="photo">
            <ParallaxY offset={40}>
              <PhotoCarousel items={PORTFOLIO_ITEMS} />
            </ParallaxY>
          </Reveal>
        </section>

        {/* ═══ 2. DOIS CAMINHOS ═══ */}
        <section id="caminhos" className="py-[clamp(48px,9vw,104px)]">
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

        {/* ═══ 3. PORTFÓLIO MIX ═══ Protagonista. Parallax em colunas. */}
        <section id="portfolio" className="pt-[clamp(16px,4vw,48px)]">
          <div className={CONTAINER}>
            <Reveal className={HEAD_CENTER}>
              <div className={EYEBROW}>
                <span>Projetos executados</span>
              </div>
              <h2 className={H2}>Experiências marcantes exploram todos os sentidos.</h2>
              <p className={LEDE_CENTER}>
                Amamos compartilhar os projetos que depositaram sua confiança no Eliá.
                Cada momento vivido foi único, indo do olhar ao toque.
              </p>
            </Reveal>
          </div>

          <OliverParallax images={PORTFOLIO_ITEMS} />

          <div className={`${CONTAINER} mt-[clamp(32px,4vw,56px)]`}>
            <Reveal className="flex flex-col items-center sm:flex-row sm:justify-center gap-2.5">
              <CTAButton href="/corporativo" label="Ver corporativos" destination="internal" section="portfolio" className="w-full sm:w-auto" />
              <CTAButton href="/eventos" label="Ver eventos" destination="internal" section="portfolio" className="w-full sm:w-auto" />
            </Reveal>
          </div>
        </section>

        <InlineWA
          section="portfolio"
          waHref={WA_HREF}
          text="Algum dos projetos inspirou você? Entre em contato e vamos conversar."
        />

        {/* ═══ 4. QUEM É LETÍCIA ═══ (card mantido, foto vazando) */}
        <section className="pt-[clamp(48px,9vw,104px)] pb-[clamp(56px,10vw,120px)]">
          <div className={CONTAINER}>
            <Reveal className={HEAD_CENTER}>
              <div className={EYEBROW}>
                <span>Quem assina</span>
              </div>
              <h2 className={H2}>Criando experiências além da expectativa.</h2>
            </Reveal>

            <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-[clamp(40px,6vw,96px)] items-start">
              <Reveal variant="photo">
                <figure className="m-0 rounded-[2px] bg-[var(--surface)] border border-[var(--line)]">
                  <div className="m-[clamp(10px,1.4vw,16px)] flex flex-col gap-[clamp(16px,2vw,24px)] border border-[var(--line-strong)] p-[clamp(10px,1.4vw,16px)]">
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <Image
                        src={assetPath("/images/leticia/leticia.webp")}
                        alt="Letícia Aguiar, Diretora de Criação do Eliá"
                        fill
                        sizes="(max-width: 1024px) 100vw, 40vw"
                        className="object-cover"
                      />
                    </div>
                    <figcaption className="text-center pb-[clamp(4px,0.8vw,10px)]">
                      <div className={`${FONT_DISPLAY} text-[clamp(18px,2vw,24px)] uppercase tracking-[0.22em] text-[var(--ink)]`}>
                        Letícia Aguiar
                      </div>
                      <div className={`${FONT_MONO} text-[10px] uppercase tracking-[0.22em] mt-2 text-[var(--ink-quiet)]`}>
                        Diretora de Criação do Eliá
                      </div>
                    </figcaption>
                  </div>
                </figure>
              </Reveal>

              <Reveal delayMs={120} className="flex flex-col gap-[18px] max-w-[60ch]">
                <p className="text-[16.5px] leading-[1.7] text-[var(--ink)] m-0">
                  Letícia Aguiar é Diretora de Criação do Eliá. Publicitária com 25 anos de experiência em
                  ativação de marcas, especialista em marketing, foi sócia de uma agência de publicidade por
                  12 anos antes de criar seu escritório. O nome Eliá vem da composição do próprio nome: L
                  de Letícia, A de Aguiar.
                </p>
                <p className="text-[16.5px] leading-[1.7] text-[var(--ink)] m-0">
                  Diretora de arte, redatora, diretora de criação e coordenadora de marketing ao longo da
                  trajetória, hoje conduz o estúdio com a mesma premissa: traduzir a expectativa do cliente
                  em uma experiência real, sempre além do que se esperava.
                </p>
                <p className="text-[16.5px] leading-[1.7] text-[var(--ink-soft)] m-0">
                  O Eliá trabalha com identidade visual aplicada, com atenção específica à produção gráfica:
                  papel, gramatura, acabamento, fornecedor. Empresa ou evento, o acompanhamento
                  continua mesmo após a identidade ser aprovada.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ═══ 5. MANIFESTO ═══ Respiro contemplativo no meio. (mantido) */}
        <section className="py-[clamp(64px,11vw,128px)] bg-[var(--surface)] border-t border-b border-[var(--line)]">
          <div className={CONTAINER}>
            <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-[clamp(32px,5vw,80px)] items-center">
              <Reveal variant="photo">
                <PhotoPlaceholder
                  ratio="r-43"
                  project="Laís e Carlos"
                  type="Identidade aplicada"
                  src={assetPath(`${PORTFOLIO_BASE}/casamentos/lais-e-carlos.webp`)}
                  sizes="(max-width: 1024px) 100vw, 48vw"
                />
              </Reveal>
              <Reveal delayMs={120} className="flex flex-col gap-5">
                <div className={EYEBROW}>
                  <span>A expectativa vira experiência</span>
                </div>
                <p className={`${FONT_DISPLAY} italic font-medium text-[clamp(26px,3.6vw,46px)] leading-[1.16] tracking-[-0.005em] text-[var(--ink)] m-0 text-balance`}>
                  A expectativa é traduzir todo o espírito da sua marca em um
                  projeto de identidade visual único e marcante.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ═══ 6. COMO FUNCIONA ═══ Etapas + Prazos, comprimido. */}
        <section className="pt-[clamp(48px,9vw,104px)] pb-[clamp(56px,11vw,128px)]">
          <div className={CONTAINER}>
            <Reveal className={HEAD_CENTER}>
              <div className={EYEBROW}>
                <span>Como funciona</span>
              </div>
              <h2 className={H2}>Cinco etapas fundamentais.</h2>
              <p className={LEDE_CENTER}>
                O processo é o mesmo para empresas e para eventos, tornando a entrega mais
                assertiva.
              </p>
            </Reveal>

            <Reveal>
              <ol className="grid grid-cols-1 gap-[2px] list-none p-0 m-0 sm:grid-cols-5">
                {PROCESS_STEPS.map((s, i) => (
                  <li
                    key={i}
                    className="flex flex-col items-center text-center gap-2 px-3 py-[clamp(18px,2.5vw,26px)] border-t border-[var(--line)] sm:border-t-[var(--line-strong)]"
                  >
                    <div className={`${FONT_DISPLAY} italic font-medium text-[var(--brand)] text-[28px] leading-none`}>
                      0{i + 1}
                    </div>
                    <div className="font-semibold text-[14.5px] tracking-[0.02em] text-[var(--ink)]">
                      {s.title}
                    </div>
                    <p className="text-[13px] leading-[1.45] text-[var(--ink-soft)] m-0 max-w-[24ch]">
                      {s.desc}
                    </p>
                  </li>
                ))}
              </ol>
            </Reveal>

            <Reveal className="mt-[clamp(36px,5vw,56px)] text-center">
              <p className={`${FONT_MONO} text-[11.5px] tracking-[0.08em] uppercase text-[var(--ink-quiet)] m-0`}>
                Identidade: 10 dias úteis. Aplicações: 10 dias úteis após
                aprovação. Orçamento válido por 30 dias.
              </p>
            </Reveal>

            {/* Sub-bloco: Acompanhamento completo (copy aprovada pela cliente, jun/2026). */}
            <div className="mt-[clamp(48px,7vw,88px)] grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-[clamp(32px,5vw,72px)] items-center">
              <Reveal variant="photo">
                <PhotoPlaceholder
                  ratio="r-43"
                  project="Caixa e tags"
                  type="Material entregue"
                  src={assetPath(`${PORTFOLIO_BASE}/produtos/caixa-e-tags/foto-01.webp`)}
                  sizes="(max-width: 1024px) 100vw, 48vw"
                />
              </Reveal>
              <Reveal delayMs={120} className="flex flex-col gap-[18px]">
                <h3 className={`${FONT_DISPLAY} italic font-medium text-[clamp(28px,3.8vw,44px)] leading-[1.1] tracking-[-0.005em] m-0 text-balance`}>
                  Acompanhamento completo.
                </h3>
                <p className="text-[var(--ink-soft)] text-[clamp(16px,1.7vw,19px)] leading-[1.6] text-pretty m-0">
                  Antes e após a Identidade Visual ser aprovada, você não fica perdido.
                </p>
                <p className="text-[16.5px] leading-[1.7] text-[var(--ink)] m-0">
                  Com o logotipo definido, você receberá os arquivos da sua identidade e as
                  melhores dicas de como executá-la. Será orientado a respeito dos tipos de
                  papéis e acabamentos, com indicação dos melhores fornecedores para dar vida
                  ao projeto.
                </p>
                <p className="text-[16.5px] leading-[1.7] text-[var(--ink)] m-0">
                  Uma identidade visual bem construída deve conversar entre si em todos os
                  locais de contato, do Instagram à decoração do espaço físico e o material
                  impresso.
                </p>
                <p className="text-[16.5px] leading-[1.7] text-[var(--ink)] m-0">
                  O Eliá entende a importância desse acompanhamento e garante que a sua
                  experiência será vivida da melhor forma.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ═══ 7. CONTATO ═══ Formulário + Estúdio fundidos. */}
        <section
          id="contato"
          className="bg-[var(--surface)] border-t border-b border-[var(--line)] py-[clamp(56px,10vw,120px)]"
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
                />
              </Reveal>

              <Reveal delayMs={120} className="flex flex-col gap-[clamp(18px,2.4vw,26px)] lg:pt-2">
                <div className={EYEBROW}>
                  <span>Estúdio</span>
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
