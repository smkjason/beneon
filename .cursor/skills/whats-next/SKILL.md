---
name: whats-next
description: After a task is finished, marks the completed issue Done, suggests exactly 3 next tasks (from this session or board Todo items) prioritized by MISSION.md, and generates a handoff prompt for a new agent when the user picks one. Use when the user runs /whats-next or asks what to work on next after completing work.
disable-model-invocation: true
---

# What's Next

Run after a task is finished. Explicit invocation only — attach this skill or say `/whats-next`.

## Constants

| Key | Value |
|-----|-------|
| Repo | `smkjason/beneon` |
| Project | `2` (owner: `smkjason`) |
| Board | https://github.com/users/smkjason/projects/2 |
| Priority doc | [MISSION.md](MISSION.md) |

## Workflow

```
- [ ] 1. Identify completed work
- [ ] 2. Mark completed issue → Done
- [ ] 3. Gather candidates (session + board Todo)
- [ ] 4. Rank by MISSION.md → present exactly 3
- [ ] 5. On user pick → output handoff prompt
```

### 1. Identify completed work

- **Preferred:** issue number the user gives (e.g. `#4`)
- **Fallback:** infer from chat if the session just shipped work

Scan the session for follow-up ideas: loose ends, deferred work, improvements mentioned in conversation.

### 2. Mark completed issue → Done

If a completed issue number is known:

1. Move its project item **Status → Done** via `gh project item-edit` (see [reference.md](reference.md))
2. If project API unavailable: `gh issue close <n> --repo smkjason/beneon` and tell the user to drag the card to Done on the board

Do not mark Done without evidence the work finished. Do not commit or push.

### 3. Gather candidates

Build a pool from two sources:

| Source | How |
|--------|-----|
| **This session** | Follow-ups, gaps, or next steps surfaced in chat |
| **Board Todo** | Open issues in Todo status |

```bash
# Board Todo items
gh project item-list 2 --owner smkjason --limit 50 \
  --query "status:Todo" --format json
```

**Fallback** (no project scope):

```bash
gh issue list --repo smkjason/beneon --state open --limit 30 --json number,title,body
```

Exclude the issue just marked Done. Skip `ios/` work and duplicates.

Session candidates that are not yet issues stay as **session tasks** (no issue #). Board items include their issue #.

### 4. Present exactly 3 options

Read [MISSION.md](MISSION.md). Rank all candidates by mission fit:

1. Scripture at the center
2. AI-guided quiet time
3. Community that forms character
4. Progress that reflects real growth
5. Product standards (depth, grace, privacy)

Use the three validation questions from MISSION.md as the ranking lens.

**Present exactly 3** — mix session and board candidates as appropriate. Label each:

- `Board #N` — existing Todo issue
- `Session` — follow-up from this chat (no issue yet)

For each option include:

- **Title** — short
- **Source** — `Board #N` or `Session`
- **Why now** — one sentence tied to MISSION.md

**Do not pick for the user.** Ask: "Which do you want to work on — 1, 2, or 3?"

### 5. Handoff prompt (after user picks)

When the user chooses, output a **copy-paste prompt** for a **new agent session**. Use this template:

```markdown
Work on beneon issue #<N>: <title>

Read MISSION.md and AGENTS.md first.

## Goal
<from issue body, or synthesized for session tasks>

## Context
- Previous work: #<completed-issue> marked Done
- <1–2 sentences on why this task is next, from MISSION alignment>

## Requirements
<bullet list from issue body, or concrete acceptance criteria for session tasks>

## Do not
- ios/, secrets, scope creep

## Start
1. Move this issue to **In Progress** on the beneon board (project #2)
2. Execute the requirements
3. When finished, run /whats-next
```

For **session tasks** (no issue #), omit the issue number in the title line and note that the agent should ask whether to create a board issue first, or proceed without one if scope is small.

Deliver the handoff in a single fenced code block the user can copy.

## Report format (before user picks)

```markdown
## Done
- **#N — Title** moved to Done ✓ (or failure + manual step)

## Pick your next task
1. **Title** (`Board #N` or `Session`) — Why now (mission)
2. …
3. …

Which do you want — 1, 2, or 3?
```

## Do not

- Suggest more or fewer than 3 options
- Create issues, drafts, or board items (unless user asks separately)
- Auto-invoke at end of implementation sessions
- Pick the next task for the user
- Modify `ios/`, commit, push, or touch secrets

## Additional resources

- CLI commands for Done + board read: [reference.md](reference.md)
