import type { Metadata } from "next";

import { CTAButton } from "@/components/landing/CTAButton";
import { DeliverablesCarousel } from "@/components/landing/DeliverablesCarousel";
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
import { Reveal } from "@/components/landing/Reveal";
import { TrackedLink } from "@/components/landing/TrackedLink";
import { Topbar } from "@/components/landing/Topbar";
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
// Marcas corporativas reais executadas pelo Eliá (extraídas do book de logotipos).
// Carrossel do hero e parallax do portfólio usam CONJUNTOS DISTINTOS (sem repetir marca).
const LOGOS_BASE = "/images/portfolio/logos";
type Brand = { project: string; type: string; src?: string };
const logo = (project: string, type: string, file: string): Brand => ({
  project,
  type,
  src: assetPath(`${LOGOS_BASE}/${file}.webp`),
});

// Hero (carrossel automático). 13 marcas.
const CAROUSEL_ITEMS: Brand[] = [
  logo("Raeda Veículos", "Concessionária", "raeda-veiculos"),
  logo("Zurich", "Cafés e biscoitos", "zurich-cafes"),
  logo("Cardio 086", "Clínica cardiológica", "cardio-086"),
  logo("LP Auto Peças", "Autopeças", "lp-auto-pecas"),
  logo("EvoluAuto", "Assistência automotiva", "evoluauto"),
  logo("CivicBox", "Analytics", "civicbox"),
  logo("Montevita", "Assistência em saúde", "montevita"),
  logo("Eco Travels", "Turismo", "eco-travels"),
  logo("QG Fashion", "Moda", "qg-fashion"),
  logo("Piauí Autos", "Manutenção automotiva", "piaui-autos"),
  logo("RAV Motors", "Concessionária", "rav-motors"),
  logo("Mercado do Pão", "Padaria", "mercado-do-pao"),
  logo("Conecta Piauí", "Site de notícias", "conecta-piaui"),
];

// Portfólio (parallax em colunas). 12 marcas, diferentes do carrossel.
const PORTFOLIO_ITEMS: Brand[] = [
  logo("ArtConcept", "Odontologia", "artconcept"),
  logo("Geórgia Lau", "Ortodontia", "georgia-lau"),
  logo("Odonto Fan", "Odontologia", "odonto-fan"),
  logo("Alef França", "Instituto odontológico", "alef-franca"),
  logo("Onda Laranja", "Marca", "onda-laranja"),
  logo("Graziela", "Marca", "graziela"),
  logo("Solutta", "Lavanderia", "solutta"),
  logo("Silas TV", "Comunicação", "silas-tv"),
  logo("Mózzi", "Gastronomia", "mozzi"),
  logo("Contar", "Contabilidade", "contar"),
  logo("Jedilog", "Logística", "jedilog"),
  logo("Grupo LSÁ", "Empreendimentos", "grupo-lsa"),
];

// Entregáveis (Identidade Visual Corporativa). Curtos, máx. 8 palavras.
const INCLUDED_ITEMS = [
  "Logotipo em PNG e PDF",
  "Estudo de cores e tipografias",
  "Manual de aplicação",
  "Três aplicações cortesia",
  "Consultoria de produção",
];

// Etapas. Descrição máx. 12 palavras.
const PROCESS_STEPS = [
  { title: "Briefing", desc: "Entender o negócio, o público e os pontos de contato." },
  { title: "Conceito", desc: "Direção visual com fundamento estratégico e desdobramentos previstos." },
  { title: "Aplicação", desc: "Papelaria, sinalização, embalagem e digital num só sistema." },
  { title: "Execução", desc: "Gráfica e instalador definidos, produção supervisionada de perto." },
  { title: "Entrega", desc: "Arquivos finais e manual para a equipe aplicar." },
];

const PROJECT_TYPES = ["Marca nova", "Rebranding", "Aplicações", "Outro"];

// ─────────── page ───────────
export default function CorporativoPage() {
  return (
    <div
      style={EDITORIAL_TOKENS}
      className={`${FONT_UI} bg-[var(--bg)] text-[var(--ink)] min-h-[100dvh] overflow-x-clip text-[16px] leading-[1.6] tracking-[0.005em] [scroll-behavior:smooth]`}
    >
      <Topbar />
      <main>
        {/* ═══ 1. HERO ═══ Carrossel + parallax sutil. Carrossel por último (mobile e desktop). */}
        <section className="relative bg-[var(--surface)] overflow-x-clip pt-[clamp(32px,4vw,44px)] pb-[clamp(48px,7vw,96px)] flex flex-col gap-[clamp(32px,5vw,60px)]">
          <div className={`${CONTAINER} relative w-full`}>
            <Reveal className="flex flex-col items-center text-center gap-[clamp(16px,2vw,24px)] max-w-[900px] mx-auto">
              <h1
                className={`${FONT_DISPLAY} italic font-medium text-[clamp(34px,5.8vw,68px)] leading-[1.04] tracking-[-0.012em] m-0 text-balance`}
              >
                Uma marca consistente,{" "}
                <span className="text-[var(--brand)]">do cartão à fachada.</span>
              </h1>
              <p className="text-[var(--ink-soft)] text-[clamp(16px,1.7vw,19px)] leading-[1.55] max-w-[48ch] text-pretty m-0">
                Sem sistema, a empresa parece três empresas. O Eliá constrói o
                padrão e acompanha a produção.
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
              <PhotoCarousel items={CAROUSEL_ITEMS} />
            </ParallaxY>
          </Reveal>
        </section>

        {/* ═══ 2. PORTFÓLIO ═══ Protagonista. Parallax em colunas. */}
        <section id="portfolio" className="pt-[clamp(16px,4vw,48px)]">
          <div className={CONTAINER}>
            <Reveal className={HEAD_CENTER}>
              <div className={EYEBROW}>
                <span>Projetos executados</span>
              </div>
              <h2 className={H2}>Na rua, no balcão e na mão do cliente.</h2>
              <p className={LEDE_CENTER}>
                Projetos corporativos com aplicação real.
              </p>
            </Reveal>
          </div>

          <OliverParallax images={PORTFOLIO_ITEMS} />
        </section>

        <InlineWA
          section="portfolio"
          waHref={WA_HREF}
          text="Algum dos projetos inspirou você? Entre em contato e vamos conversar."
        />

        {/* ═══ 3. COMO FUNCIONA ═══ Etapas primeiro, depois "O que você recebe" (carrossel). */}
        <section className="py-[clamp(48px,9vw,104px)]">
          <div className={CONTAINER}>
            <Reveal className={HEAD_CENTER}>
              <div className={EYEBROW}>
                <span>Como funciona</span>
              </div>
              <h2 className={H2}>Do briefing ao material pronto.</h2>
              <p className={LEDE_CENTER}>
                Como o projeto acontece e o que fica com você.
              </p>
            </Reveal>

            {/* Bloco 1: Etapas (stepper). Mais direto, vem primeiro. */}
            <Reveal>
              <div className={`${EYEBROW} mx-auto w-full justify-center mb-[clamp(20px,3vw,32px)]`}>
                <span>Como o projeto acontece</span>
              </div>
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

            {/* Bloco 2: O que você recebe (entregáveis, carrossel manual). */}
            <Reveal className="mt-[clamp(48px,7vw,80px)]">
              <div className={`${EYEBROW} mx-auto w-full justify-center mb-[clamp(20px,3vw,32px)]`}>
                <span>O que você recebe</span>
              </div>
              <DeliverablesCarousel items={INCLUDED_ITEMS} />
            </Reveal>

            {/* Bloco 3: Prazos (linha discreta) */}
            <Reveal className="mt-[clamp(36px,5vw,56px)] text-center">
              <p className={`${FONT_MONO} text-[11.5px] tracking-[0.08em] uppercase text-[var(--ink-quiet)] m-0`}>
                Identidade: 10 dias úteis. Aplicações: 10 dias úteis após
                aprovação. Orçamento válido por 30 dias.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ═══ 4. CONTATO ═══ Formulário + Estúdio fundidos. */}
        <section
          id="contato"
          className="bg-[var(--surface)] border-t border-b border-[var(--line)] py-[clamp(56px,10vw,120px)]"
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
