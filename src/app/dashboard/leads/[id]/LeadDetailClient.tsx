"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { LeadDetail } from "@/components/dashboard/LeadDetail";
import type { Lead } from "@/types/lead";

export function LeadDetailClient() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [lead, setLead] = useState<Lead | null>(null);
  const [comerciais, setComerciais] = useState<{ id: string; full_name: string; email: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    async function load() {
      let role: "marketing" | "comercial" = "marketing";

      const supabaseConfigured =
        !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
        !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      if (process.env.NODE_ENV === "development" && !supabaseConfigured) {
        role = "comercial";
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

        role = ((profileData as { role: string } | null)?.role ?? "marketing") as typeof role;
      }

      if (role === "marketing") { router.replace("/dashboard/leads"); return; }

      const [leadRes, comerciaisRes] = await Promise.all([
        supabase.from("leads_elia").select("*").eq("id", id).single(),
        supabase.from("profiles_elia").select("id, full_name, email").eq("role", "comercial"),
      ]);

      if (!leadRes.data) { router.replace("/dashboard/leads"); return; }

      setLead(leadRes.data as Lead);
      setComerciais((comerciaisRes.data ?? []) as { id: string; full_name: string; email: string }[]);
      setLoading(false);
    }

    load().catch(() => {});
  }, [id, router]);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-sm text-muted-foreground">Carregando lead...</p>
      </div>
    );
  }

  if (!lead) return null;

  return <LeadDetail lead={lead} comerciais={comerciais} />;
}
