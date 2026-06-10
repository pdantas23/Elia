"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { DashboardShell } from "@/components/dashboard/DashboardShell";

interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  role: "marketing" | "comercial";
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [accessError, setAccessError] = useState<string | null>(null);

  useEffect(() => {
    // Dev bypass: só usa o perfil mockado em desenvolvimento E quando o Supabase
    // NÃO está configurado. Havendo credenciais, usa a sessão real (login atual).
    const supabaseConfigured =
      !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
      !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (process.env.NODE_ENV === "development" && !supabaseConfigured) {
      setProfile({
        id: "dev-user",
        email: "dev@local",
        full_name: "Dev User",
        role: "comercial",
      });
      setLoading(false);
      return;
    }

    let active = true;
    const supabase = createClient();

    (async () => {
      try {
        const {
          data: { user },
          error: authErr,
        } = await supabase.auth.getUser();

        // Sem sessão válida: volta para o login.
        if (authErr || !user) {
          await supabase.auth.signOut({ scope: "local" }).catch(() => {});
          router.replace("/login");
          return;
        }

        const { data, error: profErr } = await supabase
          .from("profiles_elia")
          .select("*")
          .eq("id", user.id)
          .maybeSingle();

        if (!active) return;

        // Falha ao consultar o perfil (rede, RLS, etc.).
        if (profErr) {
          setAccessError(
            "Não foi possível verificar seu acesso agora. Tente recarregar.",
          );
          setLoading(false);
          return;
        }

        // Autenticado, mas sem perfil/role atribuído: não fica em loop de login.
        if (!data) {
          setAccessError(
            "Sua conta está autenticada, mas ainda não tem acesso ao painel. Fale com o administrador.",
          );
          setLoading(false);
          return;
        }

        setProfile(data as unknown as UserProfile);
        setLoading(false);
      } catch {
        if (!active) return;
        setAccessError(
          "Erro de conexão ao verificar o acesso. Verifique sua internet e tente novamente.",
        );
        setLoading(false);
      }
    })();

    return () => {
      active = false;
    };
  }, [router]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-muted-foreground text-sm">Verificando acesso...</p>
      </div>
    );
  }

  if (accessError) {
    return (
      <div className="flex h-screen items-center justify-center px-6">
        <div className="flex max-w-md flex-col items-center gap-4 text-center">
          <p className="text-sm text-muted-foreground">{accessError}</p>
          <div className="flex gap-3">
            <button
              onClick={() => window.location.reload()}
              className="rounded-md border border-muted px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
            >
              Recarregar
            </button>
            <button
              onClick={async () => {
                await createClient().auth.signOut().catch(() => {});
                router.replace("/login");
              }}
              className="rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90"
            >
              Entrar de novo
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!profile) return null;

  return (
    <DashboardShell
      user={{
        id: profile.id,
        email: profile.email,
        fullName: profile.full_name,
        role: profile.role,
      }}
    >
      {children}
    </DashboardShell>
  );
}
