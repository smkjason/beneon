import type { SupabaseClient } from "@supabase/supabase-js";

import type { Database } from "./database.types";

type Client = SupabaseClient<Database>;

export async function ensureProfile(
  supabase: Client,
  userId: string,
  displayName?: string,
) {
  const { data: existing } = await supabase
    .from("profiles")
    .select("id")
    .eq("id", userId)
    .maybeSingle();

  if (existing) {
    return { error: null };
  }

  return supabase.from("profiles").insert({
    id: userId,
    display_name: displayName ?? null,
  });
}
