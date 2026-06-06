type PlaceholderPageProps = {
  title: string;
  description: string;
  eyebrow?: string;
};

export function PlaceholderPage({
  title,
  description,
  eyebrow,
}: PlaceholderPageProps) {
  return (
    <div className="flex flex-1 flex-col">
      {eyebrow ? (
        <p className="mb-2 text-xs font-medium tracking-[0.2em] text-zinc-500 uppercase dark:text-zinc-400">
          {eyebrow}
        </p>
      ) : null}
      <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl dark:text-zinc-50">
        {title}
      </h1>
      <p className="mt-3 max-w-xl text-base leading-7 text-zinc-600 dark:text-zinc-400">
        {description}
      </p>
      <div className="mt-8 flex flex-1 items-center justify-center rounded-2xl border border-dashed border-zinc-300 bg-white/60 px-6 py-16 text-center text-sm text-zinc-500 dark:border-zinc-700 dark:bg-zinc-900/40 dark:text-zinc-400">
        Coming soon — this area will be built in a future update.
      </div>
    </div>
  );
}
