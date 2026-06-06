import { type EmailOtpType } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import { type NextRequest } from "next/server";

import { createClient } from "@/lib/supabase/server";
import { ensureProfile } from "@/lib/supabase/profiles";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const tokenHash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const next = searchParams.get("next") ?? "/";

  if (!tokenHash || !type) {
    redirect("/login?error=Invalid confirmation link.");
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.verifyOtp({
    type,
    token_hash: tokenHash,
  });

  if (error) {
    redirect("/login?error=Could not confirm your email. Try signing in again.");
  }

  if (data.user) {
    await ensureProfile(
      supabase,
      data.user.id,
      data.user.email?.split("@")[0],
    );
  }

  redirect(next);
}
