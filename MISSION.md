# beneon — Mission

**beneon** helps Christians build a daily rhythm of Scripture, prayer, and community — and grow in character along the way.

This document defines our product vision. Every feature should advance this mission.

## Vision

To make consistent time in God's Word and in prayer a natural, rewarding part of everyday life — supported by thoughtful technology and a community that builds people up.

## What we offer

### Scripture, at the center

beneon is built around the Bible. Users read Scripture in a focused, distraction-free experience designed for daily return — not as an add-on, but as the foundation of the product.

Reading happens inside **quiet time** — there is no separate “Bible app” surface. Scripture and reflection share one flow.

### AI-guided quiet time

Quiet time is the primary Scripture experience: read the Word, then walk through it with a conversational guide.

- Bible reading in a focused, distraction-free view
- Reflective prompts grounded in what they read
- Prayer oriented toward Scripture, not generic inspiration
- A personal, guided flow — thoughtful companion, not a novelty chatbot

### Community that forms character

A space where believers share progress, encourage one another, and grow together:

- Accountability for prayer and reading habits
- Celebration of faithfulness, not comparison
- Support for intercessory prayer and mutual care

### Progress that reflects real growth

Consistency in reading, prayer, and intercession builds character over time. beneon rewards faithfulness through meaningful progression — items, milestones, and visual growth that reflect genuine spiritual discipline, not empty gamification.

## Product standards

Features should uphold:

- **Scripture first** — the Word anchors everything; AI and community serve it
- **Depth over distraction** — habits and formation matter more than streaks alone
- **Community with purpose** — connection that builds character, not performative feeds
- **Tone of grace** — warm, respectful, encouraging; never preachy or transactional
- **Privacy by design** — spiritual life is personal; sharing is always intentional

## App structure

How major areas map to the product (routes may evolve; names should stay mission-aligned):

| Area | Route | Purpose |
|------|-------|---------|
| Home | `/` | Signed-out: welcome and sign-in. Signed-in: dashboard and habit summary. |
| Quiet time | `/quiet-time` | **Bible reading + AI-guided reflection and prayer** — one flow, not a separate reader |
| Prayer | `/prayer` | Personal and intercessory prayer log |
| Community | `/community` | Encouragement, accountability, shared progress |
| Character | `/character` | Progression tied to consistency in reading, prayer, and care for others |

Do not split Bible reading into its own top-level route (e.g. `/read`). Quiet time *is* how users engage Scripture.

## What we are not building

- A chat app with a Bible attachment
- A social platform optimized for vanity metrics
- A game that substitutes points for spiritual formation

## For agents

Before shipping a feature, validate:

1. Does it help users read Scripture or pray with intention?
2. Does it strengthen quiet time or community formation?
3. Does it recognize consistency in ways that build character?

If none apply, reconsider scope or align with the product owner.

## Related docs

- [AGENTS.md](AGENTS.md) — technical guidance for agents
- [REVIEW.md](REVIEW.md) — project status and checklist
