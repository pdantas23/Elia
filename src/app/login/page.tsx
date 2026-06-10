"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Reveal } from "@/components/landing/Reveal";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.replace("/dashboard");
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center overflow-x-clip px-5">
      <Reveal className="w-full max-w-sm space-y-8">
        <div className="text-center">
          <h1 className="font-display text-3xl font-light tracking-tight">
            Elia Dashboard
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Acesso restrito
          </p>
        </div>

        <form action={handleSubmit} className="space-y-4">
          {error && (
            <div className="rounded-md bg-red-50 p-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium mb-1.5"
            >
              E-mail
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full rounded-md border border-muted bg-white px-4 py-3 text-base focus:border-foreground focus:outline-none focus:ring-1 focus:ring-foreground"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-1.5"
            >
              Senha
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full rounded-md border border-muted bg-white px-4 py-3 text-base focus:border-foreground focus:outline-none focus:ring-1 focus:ring-foreground"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-foreground px-6 py-3 text-base font-medium text-background transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </Reveal>
    </main>
  );
}
