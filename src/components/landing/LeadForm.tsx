"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState, useCallback } from "react";
import { Send } from "lucide-react";
import { leadFormSchema, type LeadFormData, stripWhatsAppMask } from "@/lib/validators/lead";
import { createClient } from "@/lib/supabase/client";
import { trackEvent } from "@/lib/tracking";
import { getStoredUtms } from "@/lib/tracking/utms";
import { Dropdown } from "@/components/ui/dropdown";
import { cn } from "@/lib/utils";

interface LeadFormProps {
  origemPagina: "/" | "/corporativo" | "/eventos" | "/bio";
  origemSecao: "hero" | "meio" | "final";
  className?: string;
}

const TIPO_OPTIONS = [
  { value: "corporativo", label: "Identidade Corporativa" },
  { value: "evento", label: "Evento / Casamento" },
  { value: "outro", label: "Outro" },
];

const PRAZO_OPTIONS = [
  { value: "urgente", label: "Urgente" },
  { value: "30_dias", label: "Até 30 dias" },
  { value: "60_dias", label: "Até 60 dias" },
  { value: "sem_pressa", label: "Sem pressa" },
];

const ORCAMENTO_OPTIONS = [
  { value: "ate_2k", label: "Até R$ 2.000" },
  { value: "2k_3k", label: "R$ 2.000 – R$ 3.000" },
  { value: "3k_5k", label: "R$ 3.000 – R$ 5.000" },
  { value: "acima_5k", label: "Acima de R$ 5.000" },
  { value: "nao_definido", label: "Ainda não defini" },
];

function applyWhatsAppMask(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits.length ? `(${digits}` : "";
  if (digits.length <= 7)
    return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

export function LeadForm({
  origemPagina,
  origemSecao,
  className,
}: LeadFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadFormSchema),
  });

  const tipoProjeto = watch("tipo_projeto");
  const prazo = watch("prazo");
  const orcamento = watch("orcamento");

  const onSubmit = useCallback(
    async (data: LeadFormData) => {
      setIsSubmitting(true);
      trackEvent({
        name: "form_submit_attempt",
        page: origemPagina,
        section: origemSecao,
      });

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
          observacao: data.observacao?.trim() ?? null,
          origem_pagina: origemPagina,
          origem_secao: origemSecao,
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
          page: origemPagina,
          section: origemSecao,
          error: error?.message ?? "Erro ao salvar",
        });
        setIsSubmitting(false);
      } else {
        trackEvent({
          name: "form_submit_success",
          page: origemPagina,
          section: origemSecao,
          lead_id: (inserted as { id: string }).id,
          tipo_projeto: data.tipo_projeto,
        });
        router.push("/obrigado");
      }
    },
    [origemPagina, origemSecao, router]
  );

  const fieldWrapper = "relative";
  const fieldHeight = "h-[54px]";
  const inputBase = cn(
    "peer w-full rounded-xl border-2 border-muted/80 bg-white px-4 pb-3 pt-6 text-[15px] text-foreground outline-none transition-all placeholder-transparent focus:border-foreground",
    fieldHeight
  );
  const floatingLabel =
    "pointer-events-none absolute left-4 top-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:font-normal peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-focus:top-2 peer-focus:text-[11px] peer-focus:font-medium peer-focus:uppercase peer-focus:tracking-wider peer-focus:text-foreground";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn(
        "w-full max-w-lg space-y-4 rounded-3xl border border-muted/40 bg-white p-6 shadow-xl shadow-black/[0.03] sm:p-8",
        className
      )}
      noValidate
    >
      {/* Nome */}
      <div className={fieldWrapper}>
        <input
          id="nome"
          type="text"
          placeholder="Nome"
          className={inputBase}
          {...register("nome")}
          onFocus={() =>
            trackEvent({ name: "form_field_focus", page: origemPagina, field: "nome" })
          }
        />
        <label htmlFor="nome" className={floatingLabel}>
          Nome
        </label>
        {errors.nome && <p className="mt-1 text-xs text-red-500">{errors.nome.message}</p>}
      </div>

      {/* WhatsApp */}
      <div className={fieldWrapper}>
        <input
          id="whatsapp"
          type="tel"
          placeholder="WhatsApp"
          className={inputBase}
          {...register("whatsapp")}
          onChange={(e) => {
            const masked = applyWhatsAppMask(e.target.value);
            setValue("whatsapp", masked, { shouldValidate: true });
          }}
          onFocus={() =>
            trackEvent({ name: "form_field_focus", page: origemPagina, field: "whatsapp" })
          }
        />
        <label htmlFor="whatsapp" className={floatingLabel}>
          WhatsApp
        </label>
        {errors.whatsapp && (
          <p className="mt-1 text-xs text-red-500">{errors.whatsapp.message}</p>
        )}
      </div>

      {/* Email */}
      <div className={fieldWrapper}>
        <input
          id="email"
          type="email"
          placeholder="E-mail"
          className={inputBase}
          {...register("email")}
          onFocus={() =>
            trackEvent({ name: "form_field_focus", page: origemPagina, field: "email" })
          }
        />
        <label htmlFor="email" className={floatingLabel}>
          E-mail
        </label>
        {errors.email && (
          <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
        )}
      </div>

      {/* Tipo de projeto */}
      <Dropdown
        id="tipo_projeto"
        name="tipo_projeto"
        options={TIPO_OPTIONS}
        value={tipoProjeto}
        onChange={(val) => setValue("tipo_projeto", val as LeadFormData["tipo_projeto"], { shouldValidate: true })}
        label="Tipo de projeto"
        placeholder="Selecione"
        error={errors.tipo_projeto?.message}
      />

      {/* Prazo */}
      <Dropdown
        id="prazo"
        name="prazo"
        options={PRAZO_OPTIONS}
        value={prazo}
        onChange={(val) => setValue("prazo", val as LeadFormData["prazo"], { shouldValidate: true })}
        label="Prazo"
        placeholder="Selecione"
        error={errors.prazo?.message}
      />

      {/* Orcamento */}
      <Dropdown
        id="orcamento"
        name="orcamento"
        options={ORCAMENTO_OPTIONS}
        value={orcamento}
        onChange={(val) => setValue("orcamento", val as LeadFormData["orcamento"], { shouldValidate: true })}
        label="Orçamento (opcional)"
        placeholder="Selecione"
      />

      {/* Observação */}
      <div className={fieldWrapper}>
        <textarea
          id="observacao"
          rows={3}
          placeholder="Observação"
          className={cn(inputBase, "h-auto resize-none")}
          {...register("observacao")}
        />
        <label htmlFor="observacao" className={floatingLabel}>
          Observação <span className="normal-case tracking-normal font-normal">(opcional)</span>
        </label>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="group relative flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-xl bg-foreground px-6 py-4 text-[15px] font-medium text-background transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-50"
      >
        <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        {isSubmitting ? "Enviando..." : "Enviar mensagem"}
      </button>
    </form>
  );
}
