<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# beneon — Agent Guide

Christian app for Scripture, prayer, community, and character formation. **Read [MISSION.md](MISSION.md) first** — product vision and standards. See [REVIEW.md](REVIEW.md) for project status.

## Repo layout

| Path | Purpose |
|------|---------|
| `src/app/` | Next.js App Router — **primary work area** |
| `src/` | Future `components/`, `lib/`, etc. |
| `public/` | Static assets (stays at repo root) |
| `ios/` | SwiftUI app — **paused; do not touch unless asked** |
| Config files | `next.config.ts`, `tsconfig.json`, etc. at repo root |

Use `@/*` imports (`tsconfig` paths → `./src/*`).

## Next.js 16 specifics

**Always consult** `node_modules/next/dist/docs/` before implementing. Key docs:

| Topic | Path |
|-------|------|
| v16 upgrade / breaking changes | `01-app/02-guides/upgrading/version-16.md` |
| App Router structure | `01-app/03-api-reference/03-file-conventions/` |
| `use client` / `use server` | `01-app/03-api-reference/01-directives/` |
| Async request APIs | `cookies`, `headers`, `params`, `searchParams` — **must be awaited** |
| Tailwind v4 | Project uses `@import "tailwindcss"` + `@theme inline` in `globals.css` |

### Breaking changes that matter here

- **Turbopack is default** — no `--turbopack` flag needed; use `--webpack` to opt out
- **Async request APIs** — `cookies()`, `headers()`, `params`, `searchParams` are async only; use `PageProps` / `LayoutProps` from `npx next typegen`
- **`middleware` → `proxy`** — rename file and export; `proxy` uses Node.js runtime (not Edge)
- **`next lint` removed** — run `npm run lint` (ESLint CLI); `next build` does not lint
- **Caching** — `revalidateTag(tag, profile)` requires second arg; `cacheLife` / `cacheTag` are stable (no `unstable_` prefix)
- **Runtime config removed** — use `process.env` / `NEXT_PUBLIC_*` instead of `serverRuntimeConfig`
- **Dev output** — `next dev` writes to `.next/dev`; dev and build can run concurrently
- **Node.js 20.9+** required; Node 18 unsupported

## Commands

```bash
npm install          # Install dependencies
npm run dev          # Dev server → http://localhost:3000
npm run build        # Production build
npm run start        # Run production server
npm run lint         # ESLint (flat config)
```

Do not commit `node_modules/`, `.next/`, or `.env*` files.

## Git workflow

Solo project — not productionized yet. **Commit and push directly to `main`** unless the user asks otherwise. Feature branches and PRs are not required for now.

Still never commit secrets (see Security below).

## Coding conventions

Match existing code in `src/app/`:

- **TypeScript** strict mode; explicit `Metadata` type for layout metadata
- **Components** — Server Components default; `'use client'` only at interactive entry points
- **Pages** — `export default function Name()` (sync OK when no dynamic APIs)
- **Styling** — Tailwind utilities; zinc palette; `dark:` variants; CSS variables in `globals.css`
- **Fonts** — `next/font/google` with CSS variables (`--font-geist-sans`, `--font-geist-mono`)
- **Quotes** — double quotes; semicolons; trailing commas in multiline objects
- **Scope** — minimal diffs; no drive-by refactors; reuse patterns from surrounding files

### File organization (as app grows)

```
src/
├── app/           # Routes, layouts, route handlers
├── components/    # Shared UI (client or server)
└── lib/           # Utilities, Supabase clients, API helpers
```

## Security

### No secrets in git (any branch)

**Never commit or push secrets to GitHub** — not on `main`, not on feature branches, not in PRs. See `.cursor/rules/no-secrets.mdc`.

- Real credentials live in `.env.local` only (gitignored)
- `.env.example` may contain placeholders, never real values
- Before committing: review `git diff` for keys, tokens, and env files
- If a secret was committed: stop, do not push, remove from git, rotate the credential

- **`NEXT_PUBLIC_*`** — exposed to the browser; use only for publishable keys (e.g. Supabase anon/publishable key)
- **Server-only** — service role keys, AI API keys, OAuth secrets: no `NEXT_PUBLIC_` prefix
- **Client boundaries** — do not pass non-serializable props (functions) from Server to Client Components

## Supabase

Integrated via `@supabase/ssr` in `src/lib/supabase/`:

| File | Use |
|------|-----|
| `client.ts` | Client Components (browser) |
| `server.ts` | Server Components, Route Handlers, Server Actions |
| `proxy.ts` | Session refresh (called from `src/proxy.ts`) |
| `env.ts` | Env validation; supports publishable or legacy anon key |
| `status.ts` | Connection health check |

Env vars in `.env.local` (see `.env.example`):

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` (or `NEXT_PUBLIC_SUPABASE_ANON_KEY`)
- `SUPABASE_SERVICE_ROLE_KEY` (server-only, when needed)

**RLS on every table** in exposed schemas; never trust `user_metadata` for authorization. Use migrations for schema changes; prefer Supabase MCP or CLI.

## What NOT to do

- Do not modify `ios/` unless explicitly asked
- Do not remove or relocate the `ios/` directory
- Do not commit `node_modules/`, `.next/`, build artifacts, or `.env*`
- Do not use deprecated APIs: `next lint`, `middleware` (use `proxy`), sync `cookies()`/`headers()`/`params`
- Do not assume Next.js 15 or earlier patterns — check `node_modules/next/dist/docs/` first
- Do not add large dependencies or frameworks without a clear need
- Do not create commits or push unless the user asks

## Related docs

- [MISSION.md](MISSION.md) — product mission and principles (**read first**)
- [REVIEW.md](REVIEW.md) — status, checklist, open questions
- [README.md](README.md) — human quick-start
- [ios/README.md](ios/README.md) — iOS setup (paused)
