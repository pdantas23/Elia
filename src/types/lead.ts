import type { Database } from "./database";

export type Lead = Database["public"]["Tables"]["leads_elia"]["Row"];
export type LeadInsert = Database["public"]["Tables"]["leads_elia"]["Insert"];
export type LeadUpdate = Database["public"]["Tables"]["leads_elia"]["Update"];
export type LeadMarketing = Omit<Lead, "comercial_notes" | "assigned_to">;

export type LeadStatus = Lead["status"];
export type TipoProjeto = Lead["tipo_projeto"];
export type Prazo = Lead["prazo"];
export type Orcamento = NonNullable<Lead["orcamento"]>;
export type OrigemPagina = Lead["origem_pagina"];
export type OrigemSecao = Lead["origem_secao"];

export const LEAD_STATUSES: LeadStatus[] = [
  "novo",
  "contatado",
  "qualificado",
  "proposta",
  "fechado",
  "perdido",
];

export const LEAD_STATUS_LABELS: Record<LeadStatus, string> = {
  novo: "Novo",
  contatado: "Contatado",
  qualificado: "Qualificado",
  proposta: "Proposta",
  fechado: "Fechado",
  perdido: "Perdido",
};
