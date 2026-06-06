import { createClient } from "./server";
import { isSupabaseConfigured } from "./env";

export type SupabaseStatus = {
  configured: boolean;
  connected: boolean;
  message: string;
};

export async function getSupabaseStatus(): Promise<SupabaseStatus> {
  if (!isSupabaseConfigured()) {
    return {
      configured: false,
      connected: false,
      message: "Add Supabase env vars to .env.local (see .env.example).",
    };
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.getClaims();

    if (error) {
      return {
        configured: true,
        connected: false,
        message: error.message,
      };
    }

    return {
      configured: true,
      connected: true,
      message: "Connected to Supabase.",
    };
  } catch (error) {
    return {
      configured: true,
      connected: false,
      message:
        error instanceof Error ? error.message : "Failed to reach Supabase.",
    };
  }
}
