import { createClient, SupabaseClient } from '@supabase/supabase-js';

let cachedSupabaseClient: SupabaseClient | null = null;

function getSupabaseClient(): SupabaseClient {
  if (cachedSupabaseClient) {
    return cachedSupabaseClient;
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      'As variáveis NEXT_PUBLIC_SUPABASE_URL e/ou NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY não estão configuradas.',
    );
  }

  cachedSupabaseClient = createClient(supabaseUrl, supabaseAnonKey);
  return cachedSupabaseClient;
}

export { getSupabaseClient as supabase };
