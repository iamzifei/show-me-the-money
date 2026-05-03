# Atoms — Founder Knowledge Base

Atomic, reusable patterns distilled from the maintainer's working notes (X tweets, build logs, retros). Each atom is one declarative principle a money-* skill can cite when reasoning about a user's situation.

## Why atoms?

Skills routinely re-derive the same conclusions every conversation: "API products beat consumer-app GTM for solo founders," "AI-content traps look like growth but kill positioning," "agents replace UI in 12 months." These aren't hot takes — they're principles the maintainer has paid for in time, money, and dead products.

Atoms encode them so every skill run starts with that compounded judgement instead of cold reasoning.

## Files

| File | Contents |
|---|---|
| `atoms.jsonl` | Full atom corpus (every accepted atom across every category) |
| `atoms_solopreneur_psychology.jsonl` | Character, action threshold, focus, mental models |
| `atoms_market_observation.jsonl` | Market shifts, channel dynamics, industry trajectories |
| `atoms_agent_infra.jsonl` | AI agents, skill design, tooling, automation infra |
| `atoms_growth_tactics.jsonl` | Cold outreach, ads ROI, pricing, conversion experiments |
| `atoms_content_meta.jsonl` | Content strategy, AI-content traps, positioning narrative |

## Atom schema

```json
{
  "id": "A-1302",
  "captured_at": "2026-05-03T04:26:26Z",
  "source": "https://x.com/<handle>/status/<id>",
  "source_text": "Original full text",
  "source_created_at": "2026-05-03T00:35:31Z",
  "category": "market_observation",
  "pattern": "One declarative sentence in the source's language.",
  "confidence": "validated | emerging | hypothesis",
  "tags": ["1-3", "short", "keywords"],
  "distill_model": "sonnet",
  "reason": "1-sentence rationale for atomization."
}
```

`confidence`:
- **validated** — backed by multiple observations or a quantitative outcome
- **emerging** — one strong observation, not yet replicated
- **hypothesis** — claim or speculation, untested

## How skills consume atoms

Every money-* skill loads the relevant slice at startup (see Standard Skill Startup in `skills/money/SKILL.md`). The slice rule:

| Skill | Loads |
|---|---|
| `/money-discover`, `/money-strategy` | `market_observation` + `growth_tactics` |
| `/money-content`, `/money-social`, `/money-seo` | `content_meta` + `growth_tactics` |
| `/money-outreach`, `/money-ads` | `growth_tactics` |
| `/money-product`, `/money-quality`, `/money-ops` | `agent_infra` |
| `/money-diagnose`, `/money-panel`, `/money-review-*` | `solopreneur_psychology` + ALL |
| `/money-finance` | `growth_tactics` (pricing/conversion subset) |

Atoms are read-only at runtime. Skills cite them by `id` when an atom directly informs a recommendation, so the user can trace any conclusion back to its evidence.

## Adding more atoms

The corpus grows in two ways:

1. **X distillation pipeline** (`scripts/x-distill.mjs` — gitignored, maintainer-only). Reads exported tweets and asks Claude to extract atoms category-by-category. Resumable; on subsequent runs only new tweets are processed.
2. **Manual additions** — append a single line to the relevant `atoms_<category>.jsonl` and the full `atoms.jsonl`. ID format `A-{4 hex chars}`.

Atoms are append-only. To deprecate one, set `confidence: "deprecated"` and add a `superseded_by` field pointing to its replacement — never delete history.
