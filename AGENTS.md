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

## Task tracking (GitHub Projects)

Work is tracked on the **[beneon GitHub Project](https://github.com/users/smkjason/projects/2)** board (repo: `smkjason/beneon`). Each task is a GitHub issue linked to the project.

### Kanban states

| Status | Meaning |
|--------|---------|
| **Todo** | Ready to pick up; not started |
| **In Progress** | Someone (human or agent) is actively working on it |
| **Done** | Deliverables complete; issue can be closed |

GitHub Projects uses a built-in **Status** field with these three options. More labels (priority, area, etc.) can be added later.

### Agent workflow

1. **Before starting** — Read [MISSION.md](MISSION.md) and this file. Open the board and pick a **Todo** item (or take the one the user assigned).
2. **Claim work** — Move the item to **In Progress** on the board (or ask the user to). Note the issue number in your session.
3. **Execute** — Follow the issue body: Goal, Scope, Requirements, Do not, Deliverables.
4. **Finish** — Move to **Done**, close the issue if appropriate, update [REVIEW.md](REVIEW.md) checklist items, commit only when the user asks.

### Creating tasks (humans)

**In the GitHub UI:** Project → **Add item** → **Create new issue**, or add an existing issue from the repo.

**With `gh` CLI** (requires `project` scope — run `gh auth refresh -h github.com -s read:project,project` once):

```bash
# New issue + add to project board
gh issue create --repo smkjason/beneon \
  --title "Short task title" \
  --body-file path/to/body.md \
  --project beneon

# Or add an existing issue
gh project item-add <project-number> --owner smkjason \
  --url https://github.com/smkjason/beneon/issues/<n>
```

### Generating tasks (agents)

When the user asks you to **break down work** or **add tasks to the board**, create GitHub issues (not local markdown prompt files). Use this body template:

```markdown
## Goal
One sentence outcome.

## Scope
Bulleted list of what is in / out.

## Requirements
- Concrete acceptance criteria

## Do not
- ios/, secrets, scope creep

## Deliverables
- What ships; REVIEW.md updates if relevant
```

Suggested order for bootstrap work: schema → auth → app shell → AI quiet time → CI. Local env setup can run anytime on a new machine.

### Project board

**Live board:** https://github.com/users/smkjason/projects/2 (Status: Todo / In Progress / Done)

Fine-grained PATs cannot access user-owned Projects via `gh project` — manage the board in the GitHub UI, or use a classic token with `project` scope for CLI.

Add existing issues in the UI: **Add item → Existing issue**, or (classic `project` token only):

```bash
gh project item-add 2 --owner smkjason --url https://github.com/smkjason/beneon/issues/<n>
```

Create a new task in one step:

```bash
gh issue create --repo smkjason/beneon --title "Task title" --body "## Goal\n..." --project beneon
```

### Moving items between columns

**UI:** Drag cards on the board, or change **Status** on the issue sidebar.

**CLI** (needs field IDs from `gh project field-list`):

```bash
gh project item-edit --id <item-id> --project-id <project-id> \
  --field-id <status-field-id> --single-select-option-id <option-id>
```

Prefer the UI for status changes unless automating.

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
- [GitHub Project board](https://github.com/users/smkjason/projects/2) — kanban tasks (Todo / In Progress / Done)
- [REVIEW.md](REVIEW.md) — status, checklist, open questions
- [README.md](README.md) — human quick-start
- [ios/README.md](ios/README.md) — iOS setup (paused)
