"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Manrope, Cormorant_Garamond } from "next/font/google";
import { leadFormSchema, type LeadFormData, stripWhatsAppMask } from "@/lib/validators/lead";
import { createClient } from "@/lib/supabase/client";
import { trackEvent, trackWhatsAppClick } from "@/lib/tracking";
import { getStoredUtms } from "@/lib/tracking/utms";
import { assetPath } from "@/lib/utils";
import { WHATSAPP_MESSAGES, whatsappLink } from "@/lib/whatsapp";
import {
  PINTEREST_URL,
  STUDIO_ADDRESS,
  STUDIO_CITY,
} from "@/lib/constants";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
  variable: "--bio-font-ui",
});

const cormorantBio = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--bio-font-display",
});

const WHATSAPP_URL = whatsappLink(WHATSAPP_MESSAGES.default);

type LinkItem = {
  key: "home" | "corporativo" | "eventos" | "whatsapp" | "orcamento" | "pinterest";
  label: string;
  meta: string;
  href?: string;
  external?: boolean;
  isAction?: boolean;
};

const LINKS: LinkItem[] = [
  {
    key: "home",
    label: "Página inicial",
    meta: "Conhecer a Eliá",
    href: "/",
  },
  {
    key: "corporativo",
    label: "Identidade corporativa",
    meta: "Marcas, papelaria, sistemas visuais",
    href: "/corporativo",
  },
  {
    key: "eventos",
    label: "Identidade para eventos",
    meta: "Casamentos, eventos sociais",
    href: "/eventos",
  },
  {
    key: "pinterest",
    label: "Pinterest da Letícia",
    meta: "Referências e projetos",
    href: PINTEREST_URL,
    external: true,
  },
  {
    key: "whatsapp",
    label: "Falar no WhatsApp",
    meta: "Atendimento direto",
    href: WHATSAPP_URL,
    external: true,
  },
  {
    key: "orcamento",
    label: "Solicitar orçamento",
    meta: "Briefing rápido. Resposta em até 24h.",
    isAction: true,
  },
];

const PRIMARY_CTA: LinkItem["key"] = "orcamento";

export default function BioPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalKey, setModalKey] = useState(0);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModalOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = modalOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [modalOpen]);

  const openModal = () => {
    setModalKey((k) => k + 1);
    setModalOpen(true);
  };

  const onLinkClick = (key: LinkItem["key"]) => {
    trackEvent({ name: "bio_link_click", destination: key });
    if (key === "whatsapp") {
      trackWhatsAppClick("links", WHATSAPP_URL);
    }
  };

  return (
    <div className={`${manrope.variable} ${cormorantBio.variable}`}>
      <style>{BIO_CSS}</style>

      <main className="bio-shell">
        <section className="bio-card">
          <div className="bio-top">
            <Image
              src={assetPath("/images/brand/elia-logotipo.png")}
              alt="Eliá Identidade Visual"
              className="bio-logo bio-rise"
              style={{ animationDelay: "120ms" }}
              width={1261}
              height={531}
              priority
            />
            <p
              className="bio-tagline bio-rise"
              style={{ animationDelay: "240ms" }}
            >
              Identidade visual aplicada.
              <br />
              Do conceito ao material entregue.
            </p>
          </div>

          <hr className="bio-divider bio-rise" style={{ animationDelay: "360ms" }} />

          <nav className="bio-links" aria-label="Acessos principais">
            {LINKS.map((it, i) => {
              const filled = PRIMARY_CTA === it.key;
              const className = "bio-link bio-rise" + (filled ? " filled" : "");
              const style = { animationDelay: 420 + i * 80 + "ms" };
              const inner = (
                <>
                  <span>
                    {it.label}
                    <span className="bio-link-meta">{it.meta}</span>
                  </span>
                  <span className="bio-arrow" aria-hidden="true">
                    {it.external ? "↗" : "→"}
                  </span>
                </>
              );

              if (it.isAction) {
                return (
                  <button
                    key={it.key}
                    type="button"
                    className={className}
                    style={style}
                    onClick={() => {
                      onLinkClick(it.key);
                      openModal();
                    }}
                  >
                    {inner}
                  </button>
                );
              }

              if (it.external) {
                return (
                  <a
                    key={it.key}
                    className={className}
                    style={style}
                    href={it.href}
                    onClick={() => onLinkClick(it.key)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {inner}
                  </a>
                );
              }

              return (
                <Link
                  key={it.key}
                  className={className}
                  style={style}
                  href={it.href!}
                  onClick={() => onLinkClick(it.key)}
                >
                  {inner}
                </Link>
              );
            })}
          </nav>

          <div
            className="bio-studio bio-rise"
            style={{ animationDelay: "740ms" }}
          >
            <p className="bio-studio-text">
              {STUDIO_ADDRESS} · {STUDIO_CITY}
              <br />
              Atendimento presencial mediante agendamento prévio.
            </p>
            <a
              className="bio-link"
              href={whatsappLink(WHATSAPP_MESSAGES.estudio)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackWhatsAppClick(
                  "estudio",
                  whatsappLink(WHATSAPP_MESSAGES.estudio),
                )
              }
            >
              <span>
                Agendar visita
                <span className="bio-link-meta">Estúdio em Teresina, PI</span>
              </span>
              <span className="bio-arrow" aria-hidden="true">
                ↗
              </span>
            </a>
          </div>

          <footer
            className="bio-footer bio-rise"
            style={{ animationDelay: "820ms" }}
          >
            <div className="bio-footer-row">
              <span className="bio-dot" />
              <span>© {new Date().getFullYear()}</span>
              <span className="bio-dot" />
            </div>
            <div className="bio-brandline">Eliá Identidade Visual</div>
            <div className="bio-footer-loc">{STUDIO_CITY} · Atendimento mediante agendamento</div>
          </footer>
        </section>
      </main>

      <BudgetModal
        key={modalKey}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}

// ───────────────────────────── Modal ─────────────────────────────

function maskPhone(v: string): string {
  const d = v.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : "";
  if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

const PROJETO_OPTIONS: Array<{ value: LeadFormData["tipo_projeto"]; label: string }> = [
  { value: "corporativo", label: "Corporativo" },
  { value: "evento", label: "Evento" },
  { value: "outro", label: "Outro" },
];

const PRAZO_OPTIONS: Array<{ value: LeadFormData["prazo"]; label: string }> = [
  { value: "urgente", label: "Urgente" },
  { value: "30_dias", label: "Em 30 dias" },
  { value: "60_dias", label: "Em 60 dias" },
  { value: "sem_pressa", label: "Sem pressa" },
];

const ORCAMENTO_OPTIONS: Array<{
  value: NonNullable<LeadFormData["orcamento"]>;
  label: string;
}> = [
  { value: "ate_2k", label: "Até R$ 2.000" },
  { value: "2k_3k", label: "R$ 2.000 – R$ 3.000" },
  { value: "3k_5k", label: "R$ 3.000 – R$ 5.000" },
  { value: "acima_5k", label: "Acima de R$ 5.000" },
  { value: "nao_definido", label: "Ainda não defini" },
];

function BudgetModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [sent, setSent] = useState(false);
  const [submittedName, setSubmittedName] = useState("");
  const firstInput = useRef<HTMLInputElement | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadFormSchema),
  });

  const { ref: registerNomeRef, ...registerNomeRest } = register("nome");

  useEffect(() => {
    if (!open) return;
    const id = window.setTimeout(() => firstInput.current?.focus(), 240);
    trackEvent({ name: "form_view", page: "/links", section: "final" });
    return () => window.clearTimeout(id);
  }, [open]);

  const onSubmit = useCallback(
    async (data: LeadFormData) => {
      trackEvent({ name: "form_submit_attempt", page: "/bio", section: "final" });
      const utms = getStoredUtms();
      const supabase = createClient();
      const { data: inserted, error } = await supabase
        .from("leads_elia")
        .insert({
          nome: data.nome.trim(),
          whatsapp: stripWhatsAppMask(data.whatsapp),
          email: data.email.trim().toLowerCase(),
          tipo_projeto: data.tipo_projeto,
          prazo: data.prazo,
          orcamento: data.orcamento ?? null,
          observacao: undefined,
          origem_pagina: "/bio",
          origem_secao: "final",
          utm_source: utms.utm_source ?? null,
          utm_medium: utms.utm_medium ?? null,
          utm_campaign: utms.utm_campaign ?? null,
          utm_content: utms.utm_content ?? null,
          utm_term: utms.utm_term ?? null,
          referrer: typeof document !== "undefined" ? document.referrer : null,
        })
        .select("id")
        .single();
      if (error || !inserted) {
        trackEvent({
          name: "form_submit_error",
          page: "/bio",
          section: "final",
          error: error?.message ?? "Erro ao salvar",
        });
      } else {
        trackEvent({
          name: "form_submit_success",
          page: "/bio",
          section: "final",
          lead_id: (inserted as { id: string }).id,
          tipo_projeto: data.tipo_projeto,
        });
        setSubmittedName(data.nome);
        setSent(true);
      }
    },
    []
  );

  return (
    <div
      className={"bio-modal-scrim" + (open ? " open" : "")}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="presentation"
    >
      <div
        className="bio-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="bio-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bio-grabber" />

        {!sent ? (
          <>
            <div className="bio-modal-head">
              <div>
                <h2 id="bio-modal-title" className="bio-modal-title">
                  Solicitar orçamento
                </h2>
                <div className="bio-modal-sub">
                  Conta o essencial. Respondo em até 24h.
                </div>
              </div>
              <button
                type="button"
                className="bio-modal-close"
                onClick={onClose}
                aria-label="Fechar"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
                  <path
                    d="M1 1l12 12M13 1L1 13"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
              </button>
            </div>

            <form className="bio-form" onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className={"bio-field" + (errors.nome ? " error" : "")}>
                <label className="bio-label" htmlFor="bio-nome">
                  Nome
                </label>
                <input
                  id="bio-nome"
                  className="bio-input"
                  type="text"
                  autoComplete="name"
                  {...registerNomeRest}
                  ref={(el) => {
                    registerNomeRef(el);
                    firstInput.current = el;
                  }}
                />
                {errors.nome && <span className="bio-err">{errors.nome.message}</span>}
              </div>

              <div className="bio-field-row">
                <div className={"bio-field" + (errors.whatsapp ? " error" : "")}>
                  <label className="bio-label" htmlFor="bio-whats">
                    WhatsApp
                  </label>
                  <input
                    id="bio-whats"
                    className="bio-input"
                    type="tel"
                    inputMode="numeric"
                    placeholder="(86) 99999-9999"
                    autoComplete="tel"
                    {...register("whatsapp")}
                    onChange={(e) => {
                      setValue("whatsapp", maskPhone(e.target.value), {
                        shouldValidate: true,
                      });
                    }}
                  />
                  {errors.whatsapp && (
                    <span className="bio-err">{errors.whatsapp.message}</span>
                  )}
                </div>
                <div className={"bio-field" + (errors.email ? " error" : "")}>
                  <label className="bio-label" htmlFor="bio-email">
                    E-mail
                  </label>
                  <input
                    id="bio-email"
                    className="bio-input"
                    type="email"
                    autoComplete="email"
                    {...register("email")}
                  />
                  {errors.email && (
                    <span className="bio-err">{errors.email.message}</span>
                  )}
                </div>
              </div>

              <div className="bio-field-row">
                <div className={"bio-field" + (errors.tipo_projeto ? " error" : "")}>
                  <label className="bio-label" htmlFor="bio-proj">
                    Tipo de projeto
                  </label>
                  <select
                    id="bio-proj"
                    className="bio-select"
                    defaultValue=""
                    {...register("tipo_projeto")}
                  >
                    <option value="" disabled>
                      Selecionar
                    </option>
                    {PROJETO_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                  {errors.tipo_projeto && (
                    <span className="bio-err">{errors.tipo_projeto.message}</span>
                  )}
                </div>
                <div className={"bio-field" + (errors.prazo ? " error" : "")}>
                  <label className="bio-label" htmlFor="bio-prazo">
                    Prazo
                  </label>
                  <select
                    id="bio-prazo"
                    className="bio-select"
                    defaultValue=""
                    {...register("prazo")}
                  >
                    <option value="" disabled>
                      Selecionar
                    </option>
                    {PRAZO_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                  {errors.prazo && (
                    <span className="bio-err">{errors.prazo.message}</span>
                  )}
                </div>
              </div>

              <div className="bio-field">
                <label className="bio-label" htmlFor="bio-orc">
                  Orçamento <span className="bio-opt">opcional</span>
                </label>
                <select
                  id="bio-orc"
                  className="bio-select"
                  defaultValue=""
                  {...register("orcamento")}
                >
                  <option value="">Prefiro não dizer</option>
                  {ORCAMENTO_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="bio-field">
                <label className="bio-label" htmlFor="bio-obs">
                  Observação <span className="bio-opt">opcional</span>
                </label>
                <textarea
                  id="bio-obs"
                  className="bio-textarea"
                  rows={3}
                  placeholder="Conta um pouco sobre o projeto, referências, datas-chave…"
                  {...register("observacao")}
                />
              </div>

              <button className="bio-submit" type="submit" disabled={isSubmitting}>
                <span>{isSubmitting ? "Enviando…" : "Enviar"}</span>
                <span className="bio-arrow" aria-hidden="true">
                  →
                </span>
              </button>
              <p className="bio-legal">
                Ao enviar, você concorda em receber um retorno por WhatsApp ou e-mail.
                Seus dados ficam só comigo.
              </p>
            </form>
          </>
        ) : (
          <div className="bio-success">
            <div className="bio-mark" aria-hidden="true">
              e
            </div>
            <h3>Recebido, {submittedName.split(" ")[0] || "obrigada"}.</h3>
            <p>
              Vou ler com calma e te respondo em até 24h. Se preferir agilizar, podemos
              seguir pelo WhatsApp.
            </p>
            <div className="bio-success-actions">
              <a
                className="bio-link filled"
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick("form-success", WHATSAPP_URL)}
              >
                <span>
                  Falar no WhatsApp agora
                  <span className="bio-link-meta">Atendimento direto</span>
                </span>
                <span className="bio-arrow" aria-hidden="true">
                  ↗
                </span>
              </a>
              <button className="bio-link" type="button" onClick={onClose}>
                <span>
                  Voltar
                  <span className="bio-link-meta">Fechar esta janela</span>
                </span>
                <span className="bio-arrow" aria-hidden="true">
                  →
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ───────────────────────────── Styles ─────────────────────────────
// Inlined from the Elia_Link_Bio prototype so the page renders identically
// to the design exploration. Class names are prefixed (bio-*) so they don't
// collide with the rest of the app.

const BIO_CSS = `
:root{
  --bio-brand: #A5A1A1;
  --bio-brand-soft: #C7C4C2;
  --bio-bg: #F4F0EB;
  --bio-surface: #FAF7F2;
  --bio-ink: #2A2622;
  --bio-ink-soft: #6B6660;
  --bio-line: rgba(42,38,34,0.10);
  --bio-line-strong: rgba(42,38,34,0.22);
  --bio-radius: 5px;
  --bio-tap: 52px;
}

.bio-shell, .bio-shell *, .bio-modal-scrim, .bio-modal-scrim * {
  box-sizing: border-box;
}

.bio-shell{
  font-family: var(--bio-font-ui), ui-sans-serif, system-ui, sans-serif;
  background: var(--bio-bg);
  color: var(--bio-ink);
  min-height: 100dvh;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: clamp(28px, 6vw, 64px) 20px clamp(32px, 8vw, 96px);
  font-size: 15px;
  line-height: 1.5;
  letter-spacing: 0.005em;
  background-image: radial-gradient(rgba(42,38,34,0.022) 1px, transparent 1px);
  background-size: 3px 3px;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}

.bio-card{
  width: 100%;
  max-width: 380px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 28px;
}

@media (min-width: 720px){
  .bio-shell{ align-items: center; }
  .bio-card{ max-width: 440px; gap: 32px; }
}

@keyframes bio-rise {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}
.bio-rise{ opacity: 0; animation: bio-rise 700ms cubic-bezier(.2,.7,.2,1) forwards; }

.bio-logo{
  width: clamp(160px, 46vw, 220px);
  height: auto;
  display: block;
}

.bio-top{
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 22px;
}

.bio-tagline{
  font-family: var(--bio-font-display), 'Times New Roman', serif;
  font-style: italic;
  font-weight: 400;
  color: var(--bio-ink);
  font-size: clamp(17px, 4.4vw, 19px);
  line-height: 1.4;
  max-width: 28ch;
  margin: 0;
}

.bio-divider{
  width: 36px;
  height: 1px;
  background: var(--bio-line-strong);
  border: 0;
  margin: 0;
}

.bio-links{
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.bio-link{
  appearance: none;
  background: transparent;
  border: 1px solid var(--bio-line-strong);
  border-radius: var(--bio-radius);
  color: var(--bio-ink);
  min-height: var(--bio-tap);
  padding: 14px 20px;
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  text-align: left;
  font-size: 14.5px;
  font-weight: 500;
  letter-spacing: 0.01em;
  cursor: pointer;
  transition: background-color 180ms ease, border-color 180ms ease, color 180ms ease, transform 200ms ease;
  width: 100%;
  text-decoration: none;
  font-family: inherit;
}

.bio-link .bio-arrow{
  color: var(--bio-ink-soft);
  font-family: var(--bio-font-display), serif;
  font-size: 18px;
  line-height: 1;
  transition: transform 200ms ease, color 180ms ease;
}

.bio-link:hover{
  background: var(--bio-surface);
  border-color: var(--bio-ink);
}
.bio-link:hover .bio-arrow{ transform: translateX(3px); color: var(--bio-ink); }
.bio-link:focus-visible{ outline: 1px solid var(--bio-ink); outline-offset: 2px; }

.bio-link-meta{
  display: block;
  font-size: 11px;
  font-weight: 400;
  color: var(--bio-ink-soft);
  letter-spacing: 0.04em;
  margin-top: 2px;
}

.bio-link.filled{
  background: var(--bio-ink);
  color: var(--bio-surface);
  border-color: var(--bio-ink);
}
.bio-link.filled .bio-arrow,
.bio-link.filled .bio-link-meta{ color: rgba(250,247,242,0.65); }
.bio-link.filled:hover{ background: #0F0D0B; }
.bio-link.filled:hover .bio-arrow{ color: var(--bio-surface); }

.bio-studio{
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  padding-top: 24px;
  margin-top: 4px;
  border-top: 1px solid var(--bio-line);
}
.bio-studio-text{
  margin: 0;
  font-size: 12.5px;
  line-height: 1.6;
  letter-spacing: 0.02em;
  color: var(--bio-ink-soft);
  max-width: 30ch;
}
.bio-studio .bio-link{ width: 100%; }

.bio-footer{
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  margin-top: 8px;
  width: 100%;
}
.bio-footer-loc{
  font-size: 11px;
  letter-spacing: 0.04em;
  color: var(--bio-ink-soft);
}
.bio-footer-row{
  display: flex;
  align-items: center;
  gap: 18px;
  font-size: 11.5px;
  color: var(--bio-ink-soft);
  letter-spacing: 0.06em;
}
.bio-dot{
  width: 3px; height: 3px; border-radius: 999px;
  background: var(--bio-line-strong);
}
.bio-brandline{
  font-family: var(--bio-font-display), serif;
  font-style: italic;
  font-size: 13px;
  color: var(--bio-ink-soft);
}

/* Modal */
.bio-modal-scrim{
  position: fixed; inset: 0;
  background: rgba(20,18,16,0.42);
  -webkit-backdrop-filter: blur(2px);
  backdrop-filter: blur(2px);
  z-index: 1000;
  opacity: 0; pointer-events: none;
  transition: opacity 220ms ease;
  display: flex; align-items: flex-end; justify-content: center;
  font-family: var(--bio-font-ui), ui-sans-serif, system-ui, sans-serif;
  color: var(--bio-ink);
}
.bio-modal-scrim.open{ opacity: 1; pointer-events: auto; }

.bio-modal{
  background: var(--bio-surface);
  width: 100%;
  max-width: 480px;
  border-radius: 18px 18px 0 0;
  padding: 22px 22px max(28px, env(safe-area-inset-bottom));
  transform: translateY(24px);
  transition: transform 260ms cubic-bezier(.2,.7,.2,1);
  max-height: 92dvh;
  overflow-y: auto;
  box-shadow: 0 -16px 60px rgba(20,18,16,0.22);
}
.bio-modal-scrim.open .bio-modal{ transform: translateY(0); }

@media (min-width: 720px){
  .bio-modal-scrim{ align-items: center; padding: 32px; }
  .bio-modal{ border-radius: 8px; padding: 32px; max-width: 520px; transform: scale(.98); }
  .bio-modal-scrim.open .bio-modal{ transform: scale(1); }
}

.bio-grabber{
  width: 36px; height: 4px; border-radius: 999px;
  background: var(--bio-line-strong);
  margin: 0 auto 16px;
}
@media (min-width: 720px){ .bio-grabber{ display: none; } }

.bio-modal-head{
  display: flex; align-items: flex-start; justify-content: space-between; gap: 16px;
  margin-bottom: 18px;
}
.bio-modal-title{
  font-family: var(--bio-font-display), serif;
  font-style: italic;
  font-size: 26px;
  line-height: 1.1;
  margin: 0;
  font-weight: 500;
}
.bio-modal-sub{
  font-size: 12.5px;
  color: var(--bio-ink-soft);
  letter-spacing: 0.04em;
  margin-top: 6px;
}
.bio-modal-close{
  appearance: none; border: 0; background: transparent;
  width: 32px; height: 32px; border-radius: 999px;
  display: flex; align-items: center; justify-content: center;
  color: var(--bio-ink-soft); cursor: pointer; flex-shrink: 0;
  transition: background-color 180ms ease, color 180ms ease;
}
.bio-modal-close:hover{ background: var(--bio-bg); color: var(--bio-ink); }

.bio-form{ display: flex; flex-direction: column; gap: 14px; }
.bio-field{ display: flex; flex-direction: column; gap: 6px; }
.bio-field-row{ display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
@media (max-width: 480px){ .bio-field-row{ grid-template-columns: 1fr; } }

.bio-label{
  font-size: 11px;
  color: var(--bio-ink-soft);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-weight: 500;
}
.bio-opt{
  color: var(--bio-brand-soft);
  text-transform: none;
  letter-spacing: 0.04em;
  font-style: italic;
  font-family: var(--bio-font-display), serif;
  font-size: 12px;
  margin-left: 6px;
}

.bio-input, .bio-select, .bio-textarea{
  width: 100%;
  background: transparent;
  border: 0;
  border-bottom: 1px solid var(--bio-line-strong);
  border-radius: 0;
  padding: 10px 0;
  min-height: 44px;
  color: var(--bio-ink);
  font: inherit;
  font-size: 15px;
  transition: border-color 180ms ease;
}
.bio-input:focus, .bio-select:focus, .bio-textarea:focus{
  outline: none;
  border-bottom-color: var(--bio-ink);
}
.bio-textarea{ resize: vertical; min-height: 72px; }
.bio-select{
  appearance: none;
  background-image: linear-gradient(45deg, transparent 50%, var(--bio-ink-soft) 50%),
                    linear-gradient(135deg, var(--bio-ink-soft) 50%, transparent 50%);
  background-position: calc(100% - 14px) 50%, calc(100% - 9px) 50%;
  background-size: 5px 5px, 5px 5px;
  background-repeat: no-repeat;
  padding-right: 24px;
}
.bio-field.error .bio-input,
.bio-field.error .bio-select{ border-bottom-color: #B0524A; }
.bio-err{ color: #B0524A; font-size: 11px; letter-spacing: 0.04em; }

.bio-submit{
  margin-top: 12px;
  appearance: none; border: 0;
  background: var(--bio-ink); color: var(--bio-surface);
  border-radius: var(--bio-radius);
  min-height: var(--bio-tap);
  padding: 14px 20px;
  font-size: 14.5px;
  font-weight: 500;
  letter-spacing: 0.04em;
  cursor: pointer;
  display: flex; align-items: center; justify-content: space-between;
  transition: background-color 180ms ease, transform 220ms ease;
  font-family: inherit;
}
.bio-submit:hover{ background: #0F0D0B; }
.bio-submit:active{ transform: scale(0.99); }
.bio-submit:disabled{ opacity: 0.6; cursor: not-allowed; }
.bio-submit .bio-arrow{
  font-family: var(--bio-font-display), serif;
  font-size: 18px;
  color: rgba(250,247,242,0.85);
}

.bio-legal{
  font-size: 11px;
  color: var(--bio-ink-soft);
  line-height: 1.55;
  margin: 6px 0 0;
}

.bio-success{
  display: flex; flex-direction: column; align-items: center; text-align: center;
  padding: 18px 8px 8px; gap: 18px;
}
.bio-mark{
  width: 56px; height: 56px; border-radius: 999px;
  border: 1px solid var(--bio-line-strong);
  display: flex; align-items: center; justify-content: center;
  color: var(--bio-brand);
  font-family: var(--bio-font-display), serif;
  font-size: 28px;
  font-style: italic;
}
.bio-success h3{
  font-family: var(--bio-font-display), serif;
  font-style: italic;
  font-weight: 500;
  font-size: 26px;
  line-height: 1.15;
  margin: 0;
}
.bio-success p{
  color: var(--bio-ink-soft);
  margin: 0;
  max-width: 32ch;
  font-size: 14px;
}
.bio-success-actions{
  display: flex; flex-direction: column; gap: 8px; width: 100%; margin-top: 6px;
}
`;
