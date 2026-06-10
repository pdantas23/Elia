"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { LeadsTable } from "@/components/dashboard/LeadsTable";
import { LeadFilters } from "@/components/dashboard/LeadFilters";
import { ExportCSVButton } from "@/components/dashboard/ExportCSVButton";
import type { Lead } from "@/types/lead";

const PAGE_SIZE = 20;

function LeadsPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [role, setRole] = useState<"marketing" | "comercial">("marketing");

  const currentPage = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10));
  const statusFilter = searchParams.get("status") ?? "";
  const origemFilter = searchParams.get("origem") ?? "";
  const tipoFilter = searchParams.get("tipo") ?? "";
  const query = searchParams.get("q") ?? "";

  useEffect(() => {
    const supabase = createClient();

    async function load() {
      let userRole: "marketing" | "comercial" = "marketing";

      const supabaseConfigured =
        !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
        !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      if (process.env.NODE_ENV === "development" && !supabaseConfigured) {
        userRole = "comercial";
      } else {
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        if (authError || !user) {
          await supabase.auth.signOut({ scope: "local" }).catch(() => {});
          router.replace("/login");
          return;
        }

        const { data: profileData } = await supabase
          .from("profiles_elia")
          .select("role")
          .eq("id", user.id)
          .maybeSingle();

        userRole = ((profileData as { role: string } | null)?.role ?? "marketing") as typeof userRole;
      }

      setRole(userRole);

      // Marketing não enxerga comercial_notes nem assigned_to: seleciona só as
      // colunas permitidas. Comercial vê tudo. (Proteção na aplicação; a tabela
      // leads_elia é a fonte única para os dois papéis.)
      const MARKETING_COLUMNS =
        "id, nome, whatsapp, email, tipo_projeto, prazo, orcamento, observacao, origem_pagina, origem_secao, utm_source, utm_medium, utm_campaign, utm_content, utm_term, referrer, status, created_at, updated_at";

      const { data } = await supabase
        .from("leads_elia")
        .select(userRole === "comercial" ? "*" : MARKETING_COLUMNS)
        .order("created_at", { ascending: false });

      const all = (data as Lead[] | null) ?? [];
      const filtered = all.filter((l) => {
        if (statusFilter && l.status !== statusFilter) return false;
        if (origemFilter && l.origem_pagina !== origemFilter) return false;
        if (tipoFilter && l.tipo_projeto !== tipoFilter) return false;
        if (query && !l.nome.toLowerCase().includes(query.toLowerCase())) return false;
        return true;
      });

      setTotalPages(Math.ceil(filtered.length / PAGE_SIZE));
      const from = (currentPage - 1) * PAGE_SIZE;
      setLeads(filtered.slice(from, from + PAGE_SIZE));
    }

    load().catch(() => {});
  }, [currentPage, statusFilter, origemFilter, tipoFilter, query, router]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-light tracking-tight">Leads</h1>
        <ExportCSVButton />
      </div>
      <LeadFilters />
      <div className="rounded-lg border border-muted bg-white">
        <LeadsTable leads={leads} role={role} page={currentPage} totalPages={totalPages} />
      </div>
    </div>
  );
}

export default function LeadsPage() {
  return (
    <Suspense fallback={<div className="p-8 text-sm text-muted-foreground">Carregando leads...</div>}>
      <LeadsPageInner />
    </Suspense>
  );
}
