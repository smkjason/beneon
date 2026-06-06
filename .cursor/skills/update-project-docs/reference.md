# update-project-docs — placement guide

## MISSION.md sections

| Section | Put here when the user clarifies… |
|---------|-----------------------------------|
| **Vision** | Long-term product aim, who it's for |
| **What we offer → Scripture** | Bible/reading placement, quiet time relationship |
| **What we offer → AI-guided quiet time** | AI tone, reflection flow, prayer style |
| **What we offer → Community** | Accountability, encouragement, sharing norms |
| **What we offer → Progress** | Gamification boundaries, milestones, character growth |
| **Product standards** | Cross-cutting principles (privacy, tone, depth) |
| **App structure** | Routes, area names, navigation intent — use the table |
| **What we are not building** | Explicit anti-patterns, scope exclusions |
| **For agents** | How agents should validate features against mission |

Prefer editing an existing bullet over adding a new heading.

## AGENTS.md sections

| Section | Put here when the user clarifies… |
|---------|-----------------------------------|
| **Repo layout** | Where files live, new top-level dirs |
| **Commands** | `make` / npm shortcuts, dev workflow |
| **App routes** | Route status, implementation notes |
| **Git workflow** | Branching, commit expectations |
| **Agent workflow** | How agents start/finish tasks |
| **Coding conventions** | TypeScript, React, Tailwind, quotes, fonts, scope |
| **Security** | Secrets, env, RLS reminders |
| **Supabase** | Client files, env vars, auth patterns |
| **What NOT to do** | Hard guardrails |

Do not put product vision in AGENTS.md — link to MISSION.md instead.

## Examples

**User:** "Quiet time should be the only place to read the Bible — no /read route."

→ MISSION.md → **App structure** table note + **What we are not building** if needed

**User:** "Use double quotes and semicolons everywhere."

→ AGENTS.md → **Coding conventions**

**User:** "I want the landing page to feel warm, not corporate."

→ MISSION.md → **Product standards** (tone) or **Vision**

**User:** "Always run make dev, not npm run dev."

→ AGENTS.md → **Commands**
