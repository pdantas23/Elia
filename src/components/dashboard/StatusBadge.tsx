import { cn } from "@/lib/utils";
import type { LeadStatus } from "@/types/lead";
import { LEAD_STATUS_LABELS } from "@/types/lead";

export const STATUS_COLORS: Record<LeadStatus, string> = {
  novo: "bg-blue-50 text-blue-700",
  contatado: "bg-yellow-50 text-yellow-700",
  qualificado: "bg-purple-50 text-purple-700",
  proposta: "bg-orange-50 text-orange-700",
  fechado: "bg-green-50 text-green-700",
  perdido: "bg-red-50 text-red-700",
};

interface StatusBadgeProps {
  status: LeadStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        STATUS_COLORS[status]
      )}
    >
      {LEAD_STATUS_LABELS[status]}
    </span>
  );
}
