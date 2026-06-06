# whats-next — GitHub CLI reference

## Auth

```bash
gh auth status
gh project item-list 2 --owner smkjason --limit 1
```

If `Resource not accessible by personal access token (user.projectV2)`:

```bash
gh auth refresh -h github.com -s project
```

## Constants

| Constant | Value |
|----------|-------|
| Owner | `smkjason` |
| Project number | `2` |
| Repo | `smkjason/beneon` |

Discover Status field IDs:

```bash
gh project field-list 2 --owner smkjason --format json
gh project view 2 --owner smkjason --format json
```

## List Todo items

```bash
gh project item-list 2 --owner smkjason --limit 50 \
  --query "status:Todo" --format json
```

**Fallback:**

```bash
gh issue list --repo smkjason/beneon --state open \
  --json number,title,body --limit 30
```

Fetch full issue body for handoff:

```bash
gh issue view <N> --repo smkjason/beneon
```

## Mark completed issue → Done

1. Find project item:

```bash
gh project item-list 2 --owner smkjason --limit 50 --format json
```

Match on `content.number == N`.

2. Set Status → Done:

```bash
gh project item-edit \
  --id <project-item-id> \
  --project-id <project-id> \
  --field-id <status-field-id> \
  --single-select-option-id <done-option-id>
```

**Fallback** (no project scope):

```bash
gh issue close N --repo smkjason/beneon \
  --comment "Completed — marked Done via whats-next."
```

User drags card to Done on the board manually.

## MISSION.md ranking (quick reference)

Prioritize tasks that advance:

1. Scripture reading experience
2. AI-guided quiet time
3. Community / character formation
4. Meaningful progress (not empty gamification)

Reject or deprioritize: chat-with-Bible bolt-on, vanity metrics, gamification without formation.

Validation questions (from MISSION.md):

1. Does it help users read Scripture or pray with intention?
2. Does it strengthen quiet time or community formation?
3. Does it recognize consistency in ways that build character?
