import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Service Role client — server-only, bypasses RLS
// NEVER import this file from client components
// Using untyped client since service role bypasses schema validation anyway
export function createAdminClient(): SupabaseClient {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}
