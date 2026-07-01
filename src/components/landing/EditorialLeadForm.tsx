"use client";

import {
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";

import {
  ARROW_CLS,
  BTN_PRIMARY,
  FONT_DISPLAY,
  FONT_MONO,
} from "@/components/landing/editorial-tokens";
import { WAButton } from "@/components/landing/WAButton";
import { createClient } from "@/lib/supabase/client";
import { trackEvent } from "@/lib/tracking";
import { getStoredUtms } from "@/lib/tracking/utms";

type OriginPage = "/" | "/corporativo" | "/eventos" | "/bio";
type TipoProjeto = "corporativo" | "evento" | "outro";

type EditorialLeadFormProps = {
  /** WhatsApp URL used by the success-state WAButton. */
  waHref: string;
  /** Página de origem gravada no lead (origem_pagina). */
  originPage: OriginPage;
  /** Seção de origem gravada no lead (origem_secao). Default "final". */
  originSection?: "hero" | "meio" | "final";
  /** Mapa (serializável) do rótulo do select para o enum tipo_projeto. */
  tipoProjetoMap?: Record<string, TipoProjeto>;
  /** Enum tipo_projeto usado quando o rótulo não está no mapa. Default "outro". */
  tipoProjetoDefault?: TipoProjeto;
  /** Options for the "Tipo de projeto" / "Tipo de evento" select. */
  projectTypes: string[];
  /** Label used on the project type field. */
  projectTypeLabel?: string;
  /** Optional preset for the project type (defaults to first option). */
  defaultProjectType?: string;
  /** Show the optional date field. Default true. */
  showDateField?: boolean;
  /** Show the optional "Orçamento" field. Default true. */
  showBudgetField?: boolean;
  /** Show the optional "Observação" field. Default true. */
  showNotesField?: boolean;
};

const BUDGET_OPTIONS = [
  "Até R$ 2.000",
  "R$ 2.000 – R$ 3.000",
  "R$ 3.000 – R$ 5.000",
  "Acima de R$ 5.000",
  "Ainda não defini",
];

// Mapas de rótulo (UI) para os valores do enum em leads_elia.
const BUDGET_MAP: Record<
  string,
  "ate_2k" | "2k_3k" | "3k_5k" | "acima_5k" | "nao_definido"
> = {
  "Até R$ 2.000": "ate_2k",
  "R$ 2.000 – R$ 3.000": "2k_3k",
  "R$ 3.000 – R$ 5.000": "3k_5k",
  "Acima de R$ 5.000": "acima_5k",
  "Ainda não defini": "nao_definido",
};

function maskPhone(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : "";
  if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

function validEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}

type FormData = {
  nome: string;
  whatsapp: string;
  email: string;
  projeto: string;
  dataEvento: string;
  orcamento: string;
  obs: string;
};

type FormErrors = Partial<Record<keyof FormData, string | null>>;

const INPUT_BASE =
  "w-full bg-transparent border-0 border-b border-[var(--line-strong)] rounded-none py-3 min-h-[48px] text-[var(--ink)] transition-[border-color] duration-[180ms] focus:outline-none focus:border-b-[var(--ink)]";
const SELECT_BASE = `${INPUT_BASE} pr-6 appearance-none bg-[image:linear-gradient(45deg,transparent_50%,var(--ink-soft)_50%),linear-gradient(135deg,var(--ink-soft)_50%,transparent_50%)] bg-[length:5px_5px,5px_5px] bg-[position:calc(100%-14px)_50%,calc(100%-9px)_50%] bg-no-repeat`;
const LABEL_BASE = `${FONT_MONO} text-[11px] tracking-[0.14em] uppercase font-normal text-[var(--ink-soft)]`;

export function EditorialLeadForm({
  waHref,
  originPage,
  originSection = "final",
  tipoProjetoMap,
  tipoProjetoDefault = "outro",
  projectTypes,
  projectTypeLabel = "Tipo de projeto",
  defaultProjectType,
  showDateField = true,
  showBudgetField = true,
  showNotesField = true,
}: EditorialLeadFormProps) {
  const [data, setData] = useState<FormData>({
    nome: "",
    whatsapp: "",
    email: "",
    projeto: defaultProjectType ?? projectTypes[0] ?? "",
    dataEvento: "",
    orcamento: "",
    obs: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const update =
    (k: keyof FormData) =>
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      let v = e.target.value;
      if (k === "whatsapp") v = maskPhone(v);
      setData((d) => ({ ...d, [k]: v }));
      if (errors[k]) setErrors((err) => ({ ...err, [k]: null }));
    };

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errs: FormErrors = {};
    if (!data.nome.trim()) errs.nome = "Digite seu nome.";
    if (data.whatsapp.replace(/\D/g, "").length < 10) errs.whatsapp = "WhatsApp incompleto.";
    if (!validEmail(data.email)) errs.email = "E-mail inválido.";
    if (!data.projeto) errs.projeto = "Selecione um tipo.";
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setSubmitting(true);
    setSubmitError(null);
    trackEvent({ name: "form_submit_attempt", page: originPage, section: originSection });

    const tipoProjeto: TipoProjeto =
      tipoProjetoMap?.[data.projeto] ?? tipoProjetoDefault;

    // Preserva o subtipo de projeto e a data do evento (que não têm coluna própria).
    const extras = [
      data.projeto ? `Projeto: ${data.projeto}` : null,
      data.dataEvento ? `Data do evento: ${data.dataEvento}` : null,
      data.obs.trim() || null,
    ].filter(Boolean);
    const observacao = extras.length ? extras.join("\n") : null;

    const utms = getStoredUtms();
    const supabase = createClient();
    const { data: inserted, error } = await supabase
      .from("leads_elia")
      .insert({
        nome: data.nome.trim(),
        whatsapp: data.whatsapp.replace(/\D/g, ""),
        email: data.email.trim().toLowerCase(),
        tipo_projeto: tipoProjeto,
        prazo: null,
        orcamento: BUDGET_MAP[data.orcamento] ?? null,
        observacao,
        origem_pagina: originPage,
        origem_secao: originSection,
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
        page: originPage,
        section: originSection,
        error: error?.message ?? "Erro ao salvar",
      });
      setSubmitError(
        "Não consegui enviar agora. Tente de novo ou fale comigo no WhatsApp.",
      );
      setSubmitting(false);
      return;
    }

    trackEvent({
      name: "form_submit_success",
      page: originPage,
      section: originSection,
      lead_id: (inserted as { id: string }).id,
      tipo_projeto: tipoProjeto,
    });
    setSubmitting(false);
    setSent(true);
  };

  const fieldErrCls = (k: keyof FormData) =>
    errors[k] ? "[&_.input]:border-b-[#B0524A] [&_select]:border-b-[#B0524A]" : "";

  if (sent) {
    return (
      <div className="py-6 flex flex-col items-start gap-[18px]">
        <div
          className={`${FONT_MONO} inline-flex items-center gap-[10px] text-[11px] uppercase tracking-[0.18em] text-[var(--ink-soft)]`}
        >
          <span
            className={`${FONT_DISPLAY} italic text-[14px] tracking-normal text-[var(--brand)]`}
          >
            →
          </span>
          <span>Recebido</span>
        </div>
        <h3 className={`${FONT_DISPLAY} italic font-medium text-[28px] m-0`}>
          Obrigada, {data.nome.split(" ")[0] || "obrigada"}.
        </h3>
        <p className="text-[var(--ink-soft)] m-0 max-w-[44ch]">
          Vou ler com calma e te respondo em até 24h úteis. Se preferir agilizar,
          podemos seguir pelo WhatsApp agora.
        </p>
        <WAButton href={waHref} section="cta-final-success" />
      </div>
    );
  }

  return (
    <form className="flex flex-col gap-[18px]" onSubmit={submit} noValidate>
      <div className={`flex flex-col gap-[6px] ${fieldErrCls("nome")}`}>
        <label htmlFor="f-nome" className={LABEL_BASE}>
          Nome
        </label>
        <input
          id="f-nome"
          className={`${INPUT_BASE} input`}
          type="text"
          value={data.nome}
          onChange={update("nome")}
          autoComplete="name"
          required
        />
        {errors.nome && (
          <span className="text-[#B0524A] text-[11.5px] tracking-[0.04em]">
            {errors.nome}
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-[18px]">
        <div className={`flex flex-col gap-[6px] ${fieldErrCls("whatsapp")}`}>
          <label htmlFor="f-wh" className={LABEL_BASE}>
            WhatsApp
          </label>
          <input
            id="f-wh"
            className={`${INPUT_BASE} input`}
            type="tel"
            inputMode="numeric"
            placeholder="(86) 99999-9999"
            value={data.whatsapp}
            onChange={update("whatsapp")}
            autoComplete="tel"
            required
          />
          {errors.whatsapp && (
            <span className="text-[#B0524A] text-[11.5px] tracking-[0.04em]">
              {errors.whatsapp}
            </span>
          )}
        </div>
        <div className={`flex flex-col gap-[6px] ${fieldErrCls("email")}`}>
          <label htmlFor="f-em" className={LABEL_BASE}>
            E-mail
          </label>
          <input
            id="f-em"
            className={`${INPUT_BASE} input`}
            type="email"
            value={data.email}
            onChange={update("email")}
            autoComplete="email"
            required
          />
          {errors.email && (
            <span className="text-[#B0524A] text-[11.5px] tracking-[0.04em]">
              {errors.email}
            </span>
          )}
        </div>
      </div>

      <div className={showDateField ? "grid grid-cols-1 sm:grid-cols-2 gap-[18px]" : ""}>
        <div className={`flex flex-col gap-[6px] ${fieldErrCls("projeto")}`}>
          <label htmlFor="f-pr" className={LABEL_BASE}>
            {projectTypeLabel}
          </label>
          <select
            id="f-pr"
            className={SELECT_BASE}
            value={data.projeto}
            onChange={update("projeto")}
            required
          >
            {projectTypes.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
          {errors.projeto && (
            <span className="text-[#B0524A] text-[11.5px] tracking-[0.04em]">
              {errors.projeto}
            </span>
          )}
        </div>
        {showDateField && (
          <div className="flex flex-col gap-[6px]">
            <label htmlFor="f-data" className={LABEL_BASE}>
              Data do evento{" "}
              <span
                className={`${FONT_DISPLAY} italic normal-case tracking-[0.04em] text-[13px] text-[var(--ink-quiet)] ml-[6px]`}
              >
                opcional
              </span>
            </label>
            <input
              id="f-data"
              className={`${INPUT_BASE} input`}
              type="date"
              value={data.dataEvento}
              onChange={update("dataEvento")}
              min={new Date().toISOString().slice(0, 10)}
              suppressHydrationWarning
            />
          </div>
        )}
      </div>

      {showBudgetField && (
        <div className="flex flex-col gap-[6px]">
          <label htmlFor="f-or" className={LABEL_BASE}>
            Orçamento{" "}
            <span
              className={`${FONT_DISPLAY} italic normal-case tracking-[0.04em] text-[13px] text-[var(--ink-quiet)] ml-[6px]`}
            >
              opcional
            </span>
          </label>
          <select
            id="f-or"
            className={SELECT_BASE}
            value={data.orcamento}
            onChange={update("orcamento")}
          >
            <option value="">Prefiro não dizer</option>
            {BUDGET_OPTIONS.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </div>
      )}

      {showNotesField && (
        <div className="flex flex-col gap-[6px]">
          <label htmlFor="f-ob" className={LABEL_BASE}>
            Observação{" "}
            <span
              className={`${FONT_DISPLAY} italic normal-case tracking-[0.04em] text-[13px] text-[var(--ink-quiet)] ml-[6px]`}
            >
              opcional
            </span>
          </label>
          <textarea
            id="f-ob"
            className={`${INPUT_BASE} resize-y min-h-[96px]`}
            rows={4}
            value={data.obs}
            onChange={update("obs")}
            placeholder="Conte um pouco sobre o evento, o tom que imagina, materiais que tem em mente…"
          />
        </div>
      )}

      {submitError && (
        <p className="text-[#B0524A] text-[13px] leading-[1.5] m-0">{submitError}</p>
      )}

      <div className="flex flex-wrap gap-3 items-center mt-3">
        <button type="submit" disabled={submitting} className={`${BTN_PRIMARY} group disabled:opacity-60`}>
          {submitting ? "Enviando…" : "Enviar briefing"}{" "}
          <span aria-hidden="true" className={ARROW_CLS}>
            →
          </span>
        </button>
        <p className="text-[12px] text-[var(--ink-quiet)] mt-1 max-w-[52ch] leading-[1.55] m-0">
          Ao enviar, você concorda em receber um retorno por WhatsApp ou e-mail.
          Seus dados ficam só comigo.
        </p>
      </div>
    </form>
  );
}
