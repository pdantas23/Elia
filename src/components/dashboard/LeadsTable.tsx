"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Eye } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { originPageLabel } from "@/lib/leads-labels";
import {
  LEAD_STATUSES,
  LEAD_STATUS_LABELS,
  type Lead,
  type LeadMarketing,
  type LeadStatus,
} from "@/types/lead";
import { Dropdown } from "@/components/ui/dropdown";
import { StatusBadge, STATUS_COLORS } from "./StatusBadge";
import { LeadDetailModal } from "./LeadDetailModal";

const STATUS_OPTIONS = LEAD_STATUSES.map((s) => ({
  value: s,
  label: LEAD_STATUS_LABELS[s],
}));

interface LeadsTableProps {
  leads: (Lead | LeadMarketing)[];
  role: "marketing" | "comercial";
  page: number;
  totalPages: number;
}

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

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.198-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.15-.174.198-.298.297-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.273.297-1.04 1.016-1.04 2.479 0 1.463 1.065 2.876 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.695.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

export function LeadsTable({ leads, role, page, totalPages }: LeadsTableProps) {
  const [localLeads, setLocalLeads] = useState(leads);
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    setLocalLeads(leads);
  }, [leads]);

  const canEditStatus = role === "comercial";

  async function changeStatus(id: string, newStatus: LeadStatus) {
    setLocalLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status: newStatus } : l))
    );
    const supabase = createClient();
    await supabase.from("leads_elia").update({ status: newStatus }).eq("id", id);
  }

  const selectedLead = openId ? localLeads.find((l) => l.id === openId) : null;

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead>
            <tr className="border-b border-muted text-muted-foreground">
              <th className="px-3 py-3 font-medium whitespace-nowrap">Data</th>
              <th className="px-3 py-3 font-medium">Nome</th>
              <th className="px-3 py-3 font-medium whitespace-nowrap">WhatsApp</th>
              <th className="px-3 py-3 font-medium whitespace-nowrap">Origem</th>
              <th className="px-3 py-3 font-medium">Tipo</th>
              <th className="px-3 py-3 font-medium">Status</th>
              <th className="px-3 py-3 font-medium w-10 text-right" aria-label="Ações" />
            </tr>
          </thead>
          <tbody>
            {localLeads.map((lead) => (
              <tr
                key={lead.id}
                className="border-b border-muted/50 hover:bg-muted/30 transition-colors"
              >
                <td className="px-3 py-3 whitespace-nowrap">
                  {new Date(lead.created_at).toLocaleDateString("pt-BR")}
                </td>
                <td className="px-3 py-3 font-medium">{lead.nome}</td>
                <td className="px-3 py-3 whitespace-nowrap">
                  <a
                    href={`https://wa.me/${lead.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-foreground hover:text-[#25D366] transition-colors"
                    title="Abrir no WhatsApp"
                  >
                    <WhatsAppIcon className="h-4 w-4 text-[#25D366]" />
                    {formatWhatsApp(lead.whatsapp)}
                  </a>
                </td>
                <td className="px-3 py-3 whitespace-nowrap">{originPageLabel(lead.origem_pagina)}</td>
                <td className="px-3 py-3 capitalize">{lead.tipo_projeto}</td>
                <td className="px-3 py-3 whitespace-nowrap">
                  {canEditStatus ? (
                    <Dropdown
                      compact
                      options={STATUS_OPTIONS}
                      value={lead.status}
                      onChange={(val) => changeStatus(lead.id, val as LeadStatus)}
                      triggerClassName={STATUS_COLORS[lead.status]}
                    />
                  ) : (
                    <StatusBadge status={lead.status} />
                  )}
                </td>
                <td className="px-3 py-3 text-right">
                  <button
                    type="button"
                    onClick={() => setOpenId(lead.id)}
                    aria-label={`Ver detalhes de ${lead.nome}`}
                    title="Ver detalhes"
                    className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
            {localLeads.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="px-3 py-8 text-center text-muted-foreground"
                >
                  Nenhum lead encontrado
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-muted px-3 py-3">
          <p className="text-sm text-muted-foreground">
            Página {page} de {totalPages}
          </p>
          <div className="flex gap-2">
            {page > 1 && (
              <Link
                href={`?page=${page - 1}`}
                className="rounded-md border border-muted px-3 py-1.5 text-sm hover:bg-muted"
              >
                Anterior
              </Link>
            )}
            {page < totalPages && (
              <Link
                href={`?page=${page + 1}`}
                className="rounded-md border border-muted px-3 py-1.5 text-sm hover:bg-muted"
              >
                Próxima
              </Link>
            )}
          </div>
        </div>
      )}

      {selectedLead && (
        <LeadDetailModal
          lead={selectedLead}
          role={role}
          open={openId !== null}
          onClose={() => setOpenId(null)}
          onStatusChange={canEditStatus ? changeStatus : undefined}
        />
      )}
    </>
  );
}
