# beneon — Project Review

Initialization and review doc for contributors and AI agents. See [AGENTS.md](AGENTS.md) for day-to-day agent guidance.

## Overview

**beneon** helps Christians build a daily rhythm of Scripture, prayer, and community — with character growth over time. See **[MISSION.md](MISSION.md)** for the full product vision.

The active development target is the Next.js web app at the repo root. A SwiftUI iOS app in `ios/` is preserved for later.

- **GitHub:** [smkjason/beneon](https://github.com/smkjason/beneon) (private)
- **Status:** Early bootstrap — landing page only; backend and features not started

## Repo structure

```
beneon/
├── src/                  # Next.js App Router (active web app)
│   └── app/
│       ├── layout.tsx    # Root layout, Geist fonts, metadata
│       ├── page.tsx      # Landing page
│       └── globals.css   # Tailwind v4 + theme tokens
├── public/               # Static assets (default Next.js SVGs)
├── ios/                  # SwiftUI app — paused; do not modify unless asked
│   ├── beneon/Sources/
│   ├── project.yml
│   └── README.md
├── next.config.ts
├── tsconfig.json         # @/* → ./src/*
├── eslint.config.mjs     # ESLint flat config
├── postcss.config.mjs    # @tailwindcss/postcss
├── package.json
├── MISSION.md            # Product mission and principles (read first)
├── AGENTS.md             # Agent technical guidance
└── README.md             # Human quick-start
```

## Tech stack

| Layer | Choice | Version |
|-------|--------|---------|
| Framework | Next.js (App Router) | 16.2.7 |
| UI | React | 19.2.7 |
| Language | TypeScript | 6.0.3 |
| Styling | Tailwind CSS | 4.3.0 (`@import "tailwindcss"`, `@theme inline`) |
| Linting | ESLint flat config | 9.x + `eslint-config-next` |
| Bundler | Turbopack | Default in Next.js 16 (`next dev` / `next build`) |
| iOS | SwiftUI + XcodeGen | iOS 17+, Xcode 16+ |

**Runtime requirements (Next.js 16):** Node.js 20.9+, TypeScript 5.1+

## Implemented vs planned

### Implemented

- Next.js 16 scaffold with `src/app` layout
- Landing page with beneon branding and product description
- Geist Sans / Geist Mono via `next/font/google`
- Dark mode via `prefers-color-scheme` in `globals.css`
- Tailwind utility classes (zinc palette, flex layout)
- ESLint flat config; `npm run lint` runs ESLint directly
- iOS placeholder app (cross icon, welcome text)

### Planned (not started)

| Area | Notes |
|------|-------|
| **Supabase** | Clients wired (`@supabase/ssr`); needs active project + `.env.local`; schema/RLS TBD |
| **Auth** | Likely Supabase Auth + `@supabase/ssr` for Next.js |
| **Chat / AI** | Conversational guide for readings and prayer — provider TBD |
| **Community** | Social/sharing features — scope undefined |
| **Bible content** | Scripture API or licensed text — TBD |
| **iOS parity** | Resume when web core is stable |

## Setup

### Prerequisites

- Node.js 20.9+
- npm (lockfile present)

### Install and run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Dev server (Turbopack, outputs to `.next/dev`) |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | ESLint (not `next lint` — removed in v16) |

### Environment variables

Copy `.env.example` to `.env.local` and add your Supabase URL and publishable (or anon) key. The home page shows connection status once configured.

```bash
cp .env.example .env.local
```

Add AI provider keys here when chat is implemented. Never commit `.env*` files.

### iOS (optional)

```bash
cd ios
xcodegen generate
open beneon.xcodeproj
```

See [ios/README.md](ios/README.md).

## Conventions

- **Secrets:** never commit credentials to any branch on GitHub — use `.env.local` only; see [AGENTS.md](AGENTS.md#security) and `.cursor/rules/no-secrets.mdc`
- **Naming:** lowercase `beneon` in UI copy and docs
- **Paths:** `@/*` maps to `src/*` (e.g. `@/lib/supabase`)
- **Components:** Server Components by default; add `'use client'` only for interactivity
- **Styling:** Tailwind utilities; zinc palette; dark mode via CSS variables
- **Files:** double quotes, semicolons, `export default function` for pages
- **Scope:** Web work in `src/`; leave `ios/` alone unless explicitly requested

## Open questions

1. **Supabase project** — Active project `beneon` (`jiqbhvwdppevfhzymkdo`, us-west-2); schema not started yet
2. **AI provider** — OpenAI, Anthropic, Vercel AI SDK, or other?
3. **Bible text** — API (e.g. API.Bible), public domain, or licensed?
4. **Auth model** — Email/password, OAuth (Google/Apple), anonymous-first?
5. **Community scope** — Groups, prayer requests, shared readings, or comments?
6. **Deployment** — Vercel, self-hosted, or other?

## Next steps checklist

Track and pick up work on the **[GitHub Project board](https://github.com/users/smkjason/projects/2)** (see [AGENTS.md](AGENTS.md)). Issues: [smkjason/beneon/issues](https://github.com/smkjason/beneon/issues)

- [x] Install `@supabase/supabase-js` and `@supabase/ssr`
- [x] Add `src/lib/supabase/` clients (browser, server, proxy)
- [x] Add `.env.example` with documented placeholders
- [x] Link active Supabase project (`beneon` / `jiqbhvwdppevfhzymkdo`)
- [ ] Configure `.env.local` locally (gitignored; copy from `.env.example`)
- [x] Initial `profiles` table + RLS (extends `auth.users`); readings/prayers tables TBD
- [ ] Choose and wire AI chat provider
- [x] Add auth flows (sign up / sign in / session refresh) — email/password via Supabase Auth; `/login`, `/auth/confirm`, `/auth/signout`
- [ ] Replace landing page with app shell (nav, chat, prayer)
- [ ] Set up CI (lint + build on PR)
