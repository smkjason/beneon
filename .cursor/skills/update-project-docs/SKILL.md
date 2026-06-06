---
name: update-project-docs
description: Captures new product vision and coding preferences from the session and updates MISSION.md or AGENTS.md. Runs proactively at session end when the user expressed learnings, or when the user runs /update-project-docs. Proposes changes for approval before editing.
---

# Update Project Docs

Persist **user-stated** learnings into repo docs. Run at **session end** when product or coding preferences emerged — or on `/update-project-docs`.

## Targets

| Learning type | File | Examples |
|---------------|------|----------|
| Product vision, features, tone, routes, UX intent | [MISSION.md](MISSION.md) | "Quiet time is the Bible surface", tone, what not to build |
| Coding style, tooling, conventions, technical guardrails | [AGENTS.md](AGENTS.md) | quote style, component patterns, commands, routes table |

Do **not** update [REVIEW.md](REVIEW.md) unless the user asks.

## When to run

**End of session** — before wrapping up, scan the conversation:

- Did the **user** state a product preference, correction, or decision?
- Did the **user** state a coding preference or convention?

If **no** user-stated learnings → skip silently (do not announce).

If **yes** → run this workflow. Also run when the user attaches this skill or says `/update-project-docs`.

## What counts as a learning

**Include** (user's words or clear confirmations):

- Corrections: "actually…", "don't…", "always…", "I want…"
- Product decisions: routes, feature scope, tone, priorities
- Coding preferences: patterns, libraries, file layout, commit style

**Exclude**:

- Agent suggestions the user did not affirm
- Task-specific implementation detail that won't generalize
- Secrets, env values, credentials
- One-off bug fixes with no broader convention

When unsure, treat as not a learning.

## Workflow

```
- [ ] 1. Extract learnings from session
- [ ] 2. Map each to MISSION.md or AGENTS.md
- [ ] 3. Propose edits (approval required)
- [ ] 4. Apply after user approves
```

### 1. Extract

List learnings as short bullets. Quote or paraphrase the user's intent — not your interpretation.

### 2. Map

Use [reference.md](reference.md) for placement. One learning → one section. Merge with existing content; avoid duplicate bullets.

### 3. Propose (required before editing)

Show the user:

```markdown
## Proposed doc updates

### MISSION.md
- **Section:** App structure
- **Change:** Add row for …
- **Draft text:**
  > …

### AGENTS.md
- **Section:** Coding conventions
- **Change:** Add bullet …
- **Draft text:**
  > …

Approve these edits? (yes / no / revise)
```

- Show **exact** text to add or replace
- Group by file and section
- If only one file changes, omit the other
- **Do not edit files until the user approves**

### 4. Apply

After approval:

- Minimal diff — add or tighten existing bullets; do not rewrite whole sections
- Match voice and formatting of the target file
- Preserve existing structure (headings, tables, lists)
- Report what changed (file + section)

Do not commit unless the user asks.

## Editing rules

**MISSION.md** — product language, warm and clear. No implementation detail unless it defines product structure (routes, area names).

**AGENTS.md** — terse, agent-facing. Bullets and tables. Technical facts only.

**Both** — no secrets; no time-sensitive "do this before date X" notes.

## Do not

- Edit without user approval
- Infer learnings the user did not state or confirm
- Bloat docs with session noise or agent reasoning
- Create commits or push
- Modify `ios/`, `.env*`, or unrelated files

## Additional resources

- Section placement guide: [reference.md](reference.md)
