"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MessageCircle, Mail, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { StatusBadge } from "./StatusBadge";
import { Dropdown } from "@/components/ui/dropdown";
import { createClient } from "@/lib/supabase/client";
import { originPageLabel, originSectionLabel } from "@/lib/leads-labels";
import { LEAD_STATUSES, LEAD_STATUS_LABELS } from "@/types/lead";
import type { Lead } from "@/types/lead";

interface LeadDetailProps {
  lead: Lead;
  comerciais: { id: string; full_name: string; email: string }[];
}

export function LeadDetail({ lead, comerciais }: LeadDetailProps) {
  const router = useRouter();
  const [notes, setNotes] = useState(lead.comercial_notes ?? "");
  const [saving, setSaving] = useState(false);

  const handleStatusChange = async (newStatus: string) => {
    const supabase = createClient();
    await supabase.from("leads_elia").update({ status: newStatus }).eq("id", lead.id);
    router.refresh();
  };

  const handleNotesBlur = async () => {
    if (notes === (lead.comercial_notes ?? "")) return;
    setSaving(true);
    const supabase = createClient();
    await supabase.from("leads_elia").update({ comercial_notes: notes }).eq("id", lead.id);
    setSaving(false);
    router.refresh();
  };

  const handleAssign = async (userId: string) => {
    const supabase = createClient();
    await supabase.from("leads_elia").update({ assigned_to: userId }).eq("id", lead.id);
    router.refresh();
  };

  const whatsappUrl = `https://wa.me/${lead.whatsapp}?text=${encodeURIComponent(
    `Olá ${lead.nome}, sou do Eliá Identidade Visual. Recebi seu contato pelo site e queria conversar sobre seu projeto.`
  )}`;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link
          href="/dashboard/leads"
          className="rounded-md p-2 hover:bg-muted transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <h1 className="text-2xl font-light tracking-tight">{lead.nome}</h1>
        <StatusBadge status={lead.status} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Lead Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-lg border border-muted bg-white p-5">
            <h2 className="text-lg font-medium mb-4">Dados do Lead</h2>
            <dl className="grid gap-3 sm:grid-cols-2">
              <div>
                <dt className="text-sm text-muted-foreground">WhatsApp</dt>
                <dd className="font-medium">{lead.whatsapp}</dd>
              </div>
              <div>
                <dt className="text-sm text-muted-foreground">Email</dt>
                <dd className="font-medium">{lead.email}</dd>
              </div>
              <div>
                <dt className="text-sm text-muted-foreground">Tipo</dt>
                <dd className="font-medium capitalize">{lead.tipo_projeto}</dd>
              </div>
              <div>
                <dt className="text-sm text-muted-foreground">Prazo</dt>
                <dd className="font-medium">{lead.prazo?.replace("_", " ") ?? "Não informado"}</dd>
              </div>
              <div>
                <dt className="text-sm text-muted-foreground">Orçamento</dt>
                <dd className="font-medium">
                  {lead.orcamento?.replace("_", " ") ?? "Não informado"}
                </dd>
              </div>
              <div>
                <dt className="text-sm text-muted-foreground">Origem</dt>
                <dd className="font-medium">
                  {originPageLabel(lead.origem_pagina)} · {originSectionLabel(lead.origem_secao)}
                </dd>
              </div>
              {lead.utm_source && (
                <div>
                  <dt className="text-sm text-muted-foreground">UTM</dt>
                  <dd className="font-medium">
                    {lead.utm_source} / {lead.utm_medium} / {lead.utm_campaign}
                  </dd>
                </div>
              )}
              {lead.observacao && (
                <div className="sm:col-span-2">
                  <dt className="text-sm text-muted-foreground">Observação</dt>
                  <dd className="font-medium">{lead.observacao}</dd>
                </div>
              )}
            </dl>
          </div>

          {/* Notes */}
          <div className="rounded-lg border border-muted bg-white p-5">
            <h2 className="text-lg font-medium mb-3">
              Notas Comerciais
              {saving && (
                <span className="ml-2 text-sm text-muted-foreground font-normal">
                  Salvando...
                </span>
              )}
            </h2>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              onBlur={handleNotesBlur}
              rows={5}
              placeholder="Adicione notas sobre este lead..."
              className="w-full rounded-md border border-muted bg-background px-4 py-3 text-sm resize-none focus:border-foreground focus:outline-none focus:ring-1 focus:ring-foreground"
            />
          </div>

        </div>

        {/* Sidebar Actions */}
        <div className="space-y-4">
          <div className="rounded-lg border border-muted bg-white p-5 space-y-4">
            <h2 className="text-lg font-medium">Ações</h2>

            <Dropdown
              options={LEAD_STATUSES.map((s) => ({
                value: s,
                label: LEAD_STATUS_LABELS[s],
              }))}
              value={lead.status}
              onChange={(val) => handleStatusChange(val)}
              label="Mudar Status"
            />

            <Dropdown
              options={comerciais.map((c) => ({
                value: c.id,
                label: c.full_name || c.email,
              }))}
              value={lead.assigned_to ?? ""}
              onChange={(val) => handleAssign(val)}
              label="Atribuir a"
              placeholder="Não atribuído"
            />

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-md bg-[#25D366] px-4 py-2.5 text-sm font-medium text-white hover:opacity-90 transition-opacity"
            >
              <MessageCircle className="h-4 w-4" />
              Abrir WhatsApp
            </a>

            <a
              href={`mailto:${lead.email}`}
              className="flex w-full items-center justify-center gap-2 rounded-md border border-muted px-4 py-2.5 text-sm font-medium hover:bg-muted transition-colors"
            >
              <Mail className="h-4 w-4" />
              Enviar Email
            </a>
          </div>

          <div className="rounded-lg border border-muted bg-white p-5">
            <p className="text-xs text-muted-foreground">
              Criado em{" "}
              {new Date(lead.created_at).toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
