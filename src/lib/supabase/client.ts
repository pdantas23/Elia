import {
  createClient as createSupabaseClient,
  type SupabaseClient,
} from "@supabase/supabase-js";

// Duração máxima da sessão guardada no navegador: 1 dia.
const SESSION_TTL_MS = 24 * 60 * 60 * 1000;

/**
 * Storage em localStorage com expiração fixa de 1 dia a partir do login.
 *
 * O app é estático (`output: export`), sem servidor/middleware para renovar a
 * sessão. Persistir em localStorage garante que o token seja guardado e
 * sobreviva a reloads e a ações como mudar o status de um lead.
 *
 * A expiração é definida UMA vez (no primeiro write após o login) e não é
 * estendida pelos refreshes automáticos, então a sessão dura exatamente 1 dia.
 * No signOut o Supabase chama removeItem, zerando também o carimbo de expiração.
 */
function createTTLStorage(ttlMs: number) {
  const expKey = (key: string) => `${key}::exp`;
  return {
    getItem(key: string): string | null {
      try {
        const expRaw = window.localStorage.getItem(expKey(key));
        if (expRaw) {
          const exp = Number(expRaw);
          if (Number.isFinite(exp) && Date.now() > exp) {
            window.localStorage.removeItem(key);
            window.localStorage.removeItem(expKey(key));
            return null;
          }
        }
        return window.localStorage.getItem(key);
      } catch {
        return null;
      }
    },
    setItem(key: string, value: string): void {
      try {
        window.localStorage.setItem(key, value);
        if (!window.localStorage.getItem(expKey(key))) {
          window.localStorage.setItem(expKey(key), String(Date.now() + ttlMs));
        }
      } catch {
        // localStorage indisponível (modo privado, etc.): ignora.
      }
    },
    removeItem(key: string): void {
      try {
        window.localStorage.removeItem(key);
        window.localStorage.removeItem(expKey(key));
      } catch {
        // ignora
      }
    },
  };
}

let browserClient: SupabaseClient | undefined;

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  // Fora do navegador (build/SSR): cliente efêmero, sem persistir sessão.
  if (typeof window === "undefined") {
    return createSupabaseClient(url, anon, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }

  // Singleton no navegador: evita múltiplas instâncias de auth.
  if (!browserClient) {
    browserClient = createSupabaseClient(url, anon, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
        storageKey: "elia-dashboard-auth",
        storage: createTTLStorage(SESSION_TTL_MS),
      },
    });
  }
  return browserClient;
}
