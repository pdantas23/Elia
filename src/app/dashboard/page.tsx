"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { originPageLabel } from "@/lib/leads-labels";
import { KPICards } from "@/components/dashboard/KPICards";

export default function DashboardPage() {
  const [cards, setCards] = useState([
    { title: "Total de Leads", value: 0 },
    { title: "Leads Hoje", value: 0 },
    { title: "Novos (a contatar)", value: 0 },
    { title: "Fechados", value: 0 },
  ]);
  const [originCounts, setOriginCounts] = useState<Record<string, number>>({});
  const [totalLeads, setTotalLeads] = useState(0);

  useEffect(() => {
    const supabase = createClient();

    async function load() {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const [total, todayCount, novos, fechados, byOrigin] = await Promise.all([
        supabase.from("leads_elia").select("*", { count: "exact", head: true }),
        supabase.from("leads_elia").select("*", { count: "exact", head: true }).gte("created_at", today.toISOString()),
        supabase.from("leads_elia").select("*", { count: "exact", head: true }).eq("status", "novo"),
        supabase.from("leads_elia").select("*", { count: "exact", head: true }).eq("status", "fechado"),
        supabase.from("leads_elia").select("origem_pagina"),
      ]);

      const t = total.count ?? 0;
      setTotalLeads(t);
      setCards([
        { title: "Total de Leads", value: t },
        { title: "Leads Hoje", value: todayCount.count ?? 0 },
        { title: "Novos (a contatar)", value: novos.count ?? 0 },
        { title: "Fechados", value: fechados.count ?? 0 },
      ]);

      const counts: Record<string, number> = {};
      for (const l of (byOrigin.data ?? []) as { origem_pagina: string }[]) {
        const key = l.origem_pagina ?? "desconhecido";
        counts[key] = (counts[key] ?? 0) + 1;
      }
      setOriginCounts(counts);
    }

    load().catch(() => {});
  }, []);

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-light tracking-tight">Visão Geral</h1>
      <KPICards cards={cards} />

      <div className="rounded-lg border border-muted bg-white p-5">
        <h2 className="text-lg font-medium mb-4">Leads por Origem</h2>
        <div className="space-y-3">
          {Object.entries(originCounts).map(([origin, count]) => (
            <div key={origin} className="flex items-center gap-3">
              <span className="w-32 text-sm text-muted-foreground truncate">{originPageLabel(origin)}</span>
              <div className="flex-1 h-6 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-foreground rounded-full transition-all"
                  style={{ width: `${((count / (totalLeads || 1)) * 100).toFixed(0)}%` }}
                />
              </div>
              <span className="text-sm font-medium w-8 text-right">{count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
