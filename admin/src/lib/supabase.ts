import { createClient } from "@supabase/supabase-js";

// Same project and public (publishable) key as the current back office; data is protected by row-level security.
export const SUPABASE_URL = "https://akrezmxgtorkuwxxctyk.supabase.co";
const SUPABASE_KEY = "sb_publishable_tL62keD2HdovsMpI8XAkWg_TPdjaUVh";

export const sb = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: { persistSession: true, autoRefreshToken: true },
});
