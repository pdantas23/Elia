"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { leadFormSchema, stripWhatsAppMask } from "@/lib/validators/lead";
import type { LeadInsert, LeadStatus } from "@/types/lead";

interface CreateLeadInput {
  formData: Record<string, unknown>;
  origem_pagina: string;
  origem_secao: string;
  utm_source?: string | null;
  utm_medium?: string | null;
  utm_campaign?: string | null;
  utm_content?: string | null;
  utm_term?: string | null;
  referrer?: string | null;
}

export async function createLead(input: CreateLeadInput) {
  const parsed = leadFormSchema.safeParse(input.formData);
  if (!parsed.success) {
    return { success: false as const, error: "Dados inválidos" };
  }

  const data = parsed.data;
  const supabase = createAdminClient();

  const lead: LeadInsert = {
    nome: data.nome.trim(),
    whatsapp: stripWhatsAppMask(data.whatsapp),
    email: data.email.trim().toLowerCase(),
    tipo_projeto: data.tipo_projeto,
    prazo: null,
    orcamento: data.orcamento ?? null,
    observacao: data.observacao?.trim() ?? null,
    origem_pagina: input.origem_pagina as LeadInsert["origem_pagina"],
    origem_secao: input.origem_secao as LeadInsert["origem_secao"],
    utm_source: input.utm_source ?? null,
    utm_medium: input.utm_medium ?? null,
    utm_campaign: input.utm_campaign ?? null,
    utm_content: input.utm_content ?? null,
    utm_term: input.utm_term ?? null,
    referrer: input.referrer ?? null,
  };

  const { data: inserted, error } = await supabase
    .from("leads_elia")
    .insert(lead)
    .select("id")
    .single();

  const insertedRecord = inserted as { id: string } | null;
  if (error || !insertedRecord) {
    return { success: false as const, error: "Erro ao salvar lead" };
  }

  return { success: true as const, lead_id: insertedRecord.id };
}

export async function updateLeadStatus(
  leadId: string,
  status: LeadStatus
) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("leads_elia")
    .update({ status })
    .eq("id", leadId);

  if (error) {
    return { success: false as const, error: error.message };
  }
  return { success: true as const };
}

export async function updateLeadNotes(leadId: string, notes: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("leads_elia")
    .update({ comercial_notes: notes })
    .eq("id", leadId);

  if (error) {
    return { success: false as const, error: error.message };
  }
  return { success: true as const };
}

export async function assignLead(leadId: string, userId: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("leads_elia")
    .update({ assigned_to: userId })
    .eq("id", leadId);

  if (error) {
    return { success: false as const, error: error.message };
  }
  return { success: true as const };
}
