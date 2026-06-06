import { AppShell } from "@/components/app-shell/app-shell";
import { DashboardHome } from "@/components/dashboard-home";
import { MarketingLanding } from "@/components/marketing-landing";
import { getAuthUser } from "@/lib/supabase/auth";

export default async function Home() {
  const user = await getAuthUser();

  if (!user) {
    return <MarketingLanding user={null} />;
  }

  return (
    <AppShell>
      <DashboardHome user={user} />
    </AppShell>
  );
}
