"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { Trash2 } from "lucide-react";
import { LEAD_STATUSES, LEAD_STATUS_LABELS } from "@/types/lead";
import { ORIGEM_PAGINA_LABELS } from "@/lib/leads-labels";
import { Dropdown } from "@/components/ui/dropdown";

const STATUS_OPTIONS = LEAD_STATUSES.map((s) => ({
  value: s,
  label: LEAD_STATUS_LABELS[s],
}));

const ORIGEM_OPTIONS = Object.entries(ORIGEM_PAGINA_LABELS).map(
  ([value, label]) => ({ value, label }),
);

const TIPO_OPTIONS = [
  { value: "corporativo", label: "Corporativo" },
  { value: "evento", label: "Evento" },
  { value: "outro", label: "Outro" },
];

export function LeadFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const setParam = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      params.delete("page");
      router.push(`/dashboard/leads?${params.toString()}`);
    },
    [router, searchParams]
  );

  const clearAll = useCallback(() => {
    router.push("/dashboard/leads");
  }, [router]);

  const hasFilters =
    searchParams.get("q") ||
    searchParams.get("status") ||
    searchParams.get("origem") ||
    searchParams.get("tipo");

  return (
    <div className="space-y-3">
      {/* Search + clear — own row */}
      <div className="flex items-stretch gap-3">
        <input
          type="text"
          placeholder="Buscar por nome..."
          defaultValue={searchParams.get("q") ?? ""}
          onChange={(e) => setParam("q", e.target.value)}
          className="h-12 flex-1 rounded-xl border-2 border-muted/80 bg-white px-4 text-sm outline-none transition-all focus:border-foreground"
        />
        <button
          type="button"
          onClick={clearAll}
          disabled={!hasFilters}
          aria-label="Limpar filtros"
          title="Limpar filtros"
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border-2 border-muted/80 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      {/* Dropdowns row — equal width, same line */}
      <div className="grid grid-cols-3 gap-3">
        <Dropdown
          options={STATUS_OPTIONS}
          value={searchParams.get("status") ?? ""}
          onChange={(val) => setParam("status", val)}
          placeholder="Todos os status"
          label="Status"
        />
        <Dropdown
          options={ORIGEM_OPTIONS}
          value={searchParams.get("origem") ?? ""}
          onChange={(val) => setParam("origem", val)}
          placeholder="Todas as origens"
          label="Origem"
        />
        <Dropdown
          options={TIPO_OPTIONS}
          value={searchParams.get("tipo") ?? ""}
          onChange={(val) => setParam("tipo", val)}
          placeholder="Todos os tipos"
          label="Tipo"
        />
      </div>
    </div>
  );
}
