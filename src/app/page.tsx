import { getSupabaseStatus } from "@/lib/supabase/status";

export default async function Home() {
  const supabaseStatus = await getSupabaseStatus();

  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-zinc-50 px-6 py-24 dark:bg-zinc-950">
      <main className="w-full max-w-lg text-center">
        <p className="mb-3 text-sm font-medium tracking-wide text-zinc-500 uppercase">
          Welcome to
        </p>
        <h1 className="mb-4 text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          beneon
        </h1>
        <p className="mb-8 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
          A conversational guide for Bible readings, prayer time, and
          community.
        </p>
        <div
          className={`inline-flex rounded-full border px-4 py-2 text-sm ${
            supabaseStatus.connected
              ? "border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-300"
              : "border-zinc-200 bg-white text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400"
          }`}
        >
          Supabase: {supabaseStatus.message}
        </div>
      </main>
    </div>
  );
}
