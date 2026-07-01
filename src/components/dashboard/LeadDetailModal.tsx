"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X, MessageCircle, Mail } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { originPageLabel, originSectionLabel } from "@/lib/leads-labels";
import { Dropdown } from "@/components/ui/dropdown";
import { StatusBadge } from "./StatusBadge";
import {
  LEAD_STATUSES,
  LEAD_STATUS_LABELS,
  type Lead,
  type LeadMarketing,
  type LeadStatus,
} from "@/types/lead";

interface LeadDetailModalProps {
  lead: Lead | LeadMarketing;
  role: "marketing" | "comercial";
  open: boolean;
  onClose: () => void;
  onStatusChange?: (id: string, status: LeadStatus) => void;
}

const ORCAMENTO_LABELS: Record<string, string> = {
  ate_2k: "Até R$ 2.000",
  "2k_3k": "R$ 2.000 – 3.000",
  "3k_5k": "R$ 3.000 – 5.000",
  acima_5k: "Acima de R$ 5.000",
  nao_definido: "Não definido",
};

const PRAZO_LABELS: Record<string, string> = {
  urgente: "Urgente",
  "30_dias": "30 dias",
  "60_dias": "60 dias",
  sem_pressa: "Sem pressa",
};

function formatWhatsApp(num: string) {
  const digits = (num ?? "").replace(/\D/g, "");
  if (digits.length === 13) {
    return `+${digits.slice(0, 2)} (${digits.slice(2, 4)}) ${digits.slice(4, 9)}-${digits.slice(9)}`;
  }
  if (digits.length === 12) {
    return `+${digits.slice(0, 2)} (${digits.slice(2, 4)}) ${digits.slice(4, 8)}-${digits.slice(8)}`;
  }
  return num;
}

export function LeadDetailModal({
  lead,
  role,
  open,
  onClose,
  onStatusChange,
}: LeadDetailModalProps) {
  const [mounted, setMounted] = useState(false);
  const [notes, setNotes] = useState(
    "comercial_notes" in lead ? lead.comercial_notes ?? "" : ""
  );
  const [savingNotes, setSavingNotes] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  useEffect(() => {
    if (open && "comercial_notes" in lead) {
      setNotes(lead.comercial_notes ?? "");
    }
  }, [open, lead]);

  if (!open || !mounted) return null;

  const handleStatusChange = (status: string) => {
    onStatusChange?.(lead.id, status as LeadStatus);
  };

  const handleNotesBlur = async () => {
    if (!("comercial_notes" in lead)) return;
    if (notes === (lead.comercial_notes ?? "")) return;
    setSavingNotes(true);
    const supabase = createClient();
    await supabase
      .from("leads_elia")
      .update({ comercial_notes: notes })
      .eq("id", lead.id);
    setSavingNotes(false);
  };

  const whatsappUrl = `https://wa.me/${lead.whatsapp}?text=${encodeURIComponent(
    `Olá ${lead.nome}, sou do Eliá Identidade Visual. Recebi seu contato pelo site e queria conversar sobre seu projeto.`
  )}`;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Fechar"
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      />

      <div
        role="dialog"
        aria-modal="true"
        className="relative z-10 flex max-h-[90vh] w-full max-w-xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-muted px-6 py-4">
          <div className="min-w-0">
            <h2 className="truncate text-lg font-medium">{lead.nome}</h2>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {new Date(lead.created_at).toLocaleString("pt-BR", {
                day: "2-digit",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <StatusBadge status={lead.status} />
            <button
              type="button"
              onClick={onClose}
              aria-label="Fechar"
              className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 space-y-5 overflow-y-auto px-6 py-5 text-sm">
          {role === "marketing" ? (
            <MarketingBody lead={lead} />
          ) : (
            <ComercialBody
              lead={lead as Lead}
              notes={notes}
              setNotes={setNotes}
              onNotesBlur={handleNotesBlur}
              savingNotes={savingNotes}
              onStatusChange={handleStatusChange}
            />
          )}
        </div>

        {/* Footer actions */}
        <div className="flex flex-col gap-2 border-t border-muted px-6 py-4 sm:flex-row">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center gap-2 rounded-md bg-[#25D366] px-4 py-2.5 text-sm font-medium text-white hover:opacity-90 transition-opacity"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </a>
          <a
            href={`mailto:${lead.email}`}
            className="flex flex-1 items-center justify-center gap-2 rounded-md border border-muted px-4 py-2.5 text-sm font-medium hover:bg-muted transition-colors"
          >
            <Mail className="h-4 w-4" />
            Email
          </a>
        </div>
      </div>
    </div>,
    document.body
  );
}

function Field({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <dt className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </dt>
      <dd className="mt-0.5 break-words font-medium text-foreground">
        {value ?? <span className="text-muted-foreground">Não informado</span>}
      </dd>
    </div>
  );
}

function MarketingBody({ lead }: { lead: Lead | LeadMarketing }) {
  const hasUtms =
    lead.utm_source ||
    lead.utm_medium ||
    lead.utm_campaign ||
    lead.utm_content ||
    lead.utm_term;

  return (
    <>
      <section>
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Origem
        </h3>
        <dl className="grid gap-3">
          <Field label="Página" value={originPageLabel(lead.origem_pagina)} />
          <Field label="Seção" value={originSectionLabel(lead.origem_secao)} />
          <Field
            label="Tipo de projeto"
            value={<span className="capitalize">{lead.tipo_projeto}</span>}
          />
          <Field
            label="Referrer"
            value={lead.referrer || <span className="text-muted-foreground">Não informado</span>}
          />
        </dl>
      </section>

      <section>
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          UTMs
        </h3>
        {hasUtms ? (
          <dl className="grid gap-3">
            <Field label="Source" value={lead.utm_source} />
            <Field label="Medium" value={lead.utm_medium} />
            <Field label="Campaign" value={lead.utm_campaign} />
            <Field label="Content" value={lead.utm_content} />
            <Field label="Term" value={lead.utm_term} />
          </dl>
        ) : (
          <p className="text-sm text-muted-foreground">Nenhum UTM registrado.</p>
        )}
      </section>
    </>
  );
}

function ComercialBody({
  lead,
  notes,
  setNotes,
  onNotesBlur,
  savingNotes,
  onStatusChange,
}: {
  lead: Lead;
  notes: string;
  setNotes: (v: string) => void;
  onNotesBlur: () => void;
  savingNotes: boolean;
  onStatusChange: (status: string) => void;
}) {
  return (
    <>
      <section>
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Contato
        </h3>
        <dl className="grid gap-3">
          <Field
            label="WhatsApp"
            value={
              <a
                href={`https://wa.me/${lead.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:text-[#25D366]"
              >
                {formatWhatsApp(lead.whatsapp)}
              </a>
            }
          />
          <Field
            label="Email"
            value={
              <a
                href={`mailto:${lead.email}`}
                className="underline underline-offset-2"
              >
                {lead.email}
              </a>
            }
          />
        </dl>
      </section>

      <section>
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Projeto
        </h3>
        <dl className="grid gap-3">
          <Field
            label="Tipo"
            value={<span className="capitalize">{lead.tipo_projeto}</span>}
          />
          <Field
            label="Prazo"
            value={lead.prazo ? PRAZO_LABELS[lead.prazo] ?? lead.prazo : "Não informado"}
          />
          <Field
            label="Orçamento"
            value={
              lead.orcamento
                ? ORCAMENTO_LABELS[lead.orcamento] ?? lead.orcamento
                : null
            }
          />
          <Field label="Origem" value={`${originPageLabel(lead.origem_pagina)} · ${originSectionLabel(lead.origem_secao)}`} />
        </dl>
        {lead.observacao && (
          <div className="mt-3">
            <Field label="Observação do cliente" value={lead.observacao} />
          </div>
        )}
      </section>

      <section>
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Status
        </h3>
        <Dropdown
          options={LEAD_STATUSES.map((s) => ({ value: s, label: LEAD_STATUS_LABELS[s] }))}
          value={lead.status}
          onChange={onStatusChange}
        />
      </section>

      <section>
        <h3 className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Notas comerciais
          {savingNotes && (
            <span className="text-[10px] font-normal normal-case text-muted-foreground">
              salvando...
            </span>
          )}
        </h3>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          onBlur={onNotesBlur}
          rows={4}
          placeholder="Adicione notas sobre este lead..."
          className="w-full resize-none rounded-md border border-muted bg-background px-4 py-3 text-sm focus:border-foreground focus:outline-none focus:ring-1 focus:ring-foreground"
        />
      </section>
    </>
  );
}
