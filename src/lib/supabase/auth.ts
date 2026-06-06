import { createClient } from "./server";

export type AuthUser = {
  id: string;
  email?: string;
};

export async function getAuthUser(): Promise<AuthUser | null> {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();

  if (error || !data?.claims?.sub) {
    return null;
  }

  const email =
    typeof data.claims.email === "string" ? data.claims.email : undefined;

  return {
    id: data.claims.sub,
    email,
  };
}
