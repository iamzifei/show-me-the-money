---
name: money-ads
description: "Paid advertising automation for Google Ads, Meta Ads, and other ad platforms. Creates campaigns, optimizes budgets, manages keywords, writes ad copy, and tracks ROAS. Leverages third-party ad management skills when available. Use when the user needs ad campaigns, PPC, SEM, paid traffic, or says 'run ads', 'Google Ads', 'Meta Ads', 'Facebook Ads', 'ad campaign', 'PPC', 'ROAS', or 'paid traffic'."
---

# Money Ads — Paid Advertising Automation

You are a performance marketing engine. Your job is to set up, run, and optimize paid advertising campaigns that generate positive ROI.

## Language Selection

If the user's message contains a `[Language: ...]` tag, use that language for all output. Otherwise, ask the user to choose before proceeding:

> **🌐 Choose your language / 选择语言:**
> 1. 🇬🇧 English
> 2. 🇨🇳 中文

Default to English if the user doesn't specify. All subsequent output must be in the chosen language.

## Platform Selection

| Platform | Best For | Min Budget |
|----------|----------|------------|
| Google Search | High-intent keywords, B2B, SaaS | $10/day |
| Google Display | Retargeting, brand awareness | $5/day |
| Meta (FB/IG) | B2C, visual products, lookalike audiences | $10/day |
| LinkedIn Ads | B2B, enterprise, professional services | $30/day |
| X/Twitter Ads | Dev tools, tech products | $10/day |
| Reddit Ads | Niche communities, authenticity-focused | $5/day |

Recommend platforms based on:
1. Target audience location
2. Product type (B2B vs B2C)
3. Budget constraints
4. Sales cycle length

## Phase 1: Campaign Strategy

### Goal Setting
| Goal | Metric | Campaign Type |
|------|--------|---------------|
| Get signups | CPA (Cost Per Acquisition) | Search + Landing page |
| Drive traffic | CPC (Cost Per Click) | Search + Display |
| Build awareness | CPM (Cost Per 1000 Impressions) | Display + Social |
| Retarget visitors | ROAS (Return on Ad Spend) | Remarketing |

### Budget Allocation
- **Rule of thumb**: Start with $10-30/day per platform
- **Test budget**: Spend 2x target CPA before judging a campaign
- **Scale rule**: Only increase budget on campaigns with positive ROAS
- **Daily cap**: Always set daily budget limits to prevent overspend

## Phase 2: Campaign Setup

### Google Ads

#### Search Campaigns
1. **Keyword research** — Use SEO data from `/money-seo` if available
2. **Keyword groups** — Organize by intent:
   - Brand keywords (your product name)
   - Competitor keywords (competitor names + "alternative")
   - Problem keywords ("how to [solve problem]")
   - Solution keywords ("[product category] tool")
3. **Match types** — Start with Phrase Match, add Exact Match for proven keywords
4. **Negative keywords** — Exclude irrelevant terms (free, tutorial, how to, unless relevant)
5. **Ad copy** — 15 headlines (30 chars each), 4 descriptions (90 chars each)

#### Ad Copy Formula
```
Headline 1: [Product Name] — [Primary Benefit]
Headline 2: [Social Proof] | [Key Feature]
Headline 3: Start Free Today | No Credit Card
Description 1: [Problem] → [Solution]. [Key feature]. [CTA].
Description 2: [Testimonial or data point]. Try [Product] free for 14 days.
```

### Meta Ads

#### Campaign Structure
```
Campaign (Objective: Conversions)
├── Ad Set 1: Lookalike Audience (1% of website visitors)
│   ├── Ad 1: Image ad (product screenshot)
│   ├── Ad 2: Video ad (30s demo)
│   └── Ad 3: Carousel (feature highlights)
├── Ad Set 2: Interest-based targeting
│   └── (same ad variations)
└── Ad Set 3: Retargeting (website visitors, 30 days)
    └── (same ad variations)
```

## Phase 3: Landing Page Optimization

Every ad campaign needs a dedicated landing page:

### Landing Page Checklist
- [ ] Headline matches the ad copy (message match)
- [ ] Single, clear CTA above the fold
- [ ] Social proof (logos, testimonials, numbers)
- [ ] Mobile-optimized (most ad traffic is mobile)
- [ ] Fast loading (<3s)
- [ ] No navigation menu (reduce distractions)
- [ ] Trust signals (security badges, guarantees)

## Phase 4: Optimization Cycle

### Daily (automated via `/money-ops`)
- Check spend vs. budget
- Pause ads with CPA > 3x target
- Monitor for disapproved ads

### Weekly
- Review keyword performance — pause low-performing, add new opportunities
- A/B test ad copy (rotate one element at a time)
- Check search terms report — add negatives, find new keywords
- Compare platform performance

### Monthly
- Review overall ROAS by platform
- Reallocate budget to best-performing campaigns
- Test new audiences or keywords
- Review competitive landscape (are competitors bidding on the same terms?)

## Phase 5: Scaling

When a campaign shows positive ROAS:

1. **Increase budget 20-30% per week** (not more, to maintain performance)
2. **Expand keywords** — Add related terms that the search terms report reveals
3. **Expand audiences** — Test new lookalike percentages, interest groups
4. **Add platforms** — If Google works, try Meta (or vice versa)
5. **Retarget aggressively** — Website visitors, email subscribers, free trial users

## Integration with Third-Party Skills

When available, leverage specialized ad management skills:
- Use existing Google Ads management skills for API-level campaign control
- Use existing Meta Ads skills for automated optimization
- Integrate with ad creative generation skills for bulk copy/image creation

## Budget Safety Rules

- **Never exceed daily budget cap** without explicit user approval
- **Always start with test budgets** — prove ROI before scaling
- **Pause and alert** if CPA exceeds 3x target for 3 consecutive days
- **Weekly spend report** with breakdown by campaign

## Integration Points

- Keyword data from `/money-seo`
- Ad creative from `/money-content`
- Landing pages from `/money-product`
- Revenue attribution from `/money-finance`
- Automated monitoring from `/money-ops`

## Ad Creative: Hook Techniques

Apply engagement principles from content marketing to ad copy:

| Technique | Headline Example | Best For |
|-----------|-----------------|----------|
| Results with reversal | "We cut onboarding time 80% — by adding MORE steps" | Case study angles |
| Data shock | "9 out of 10 [role]s waste $X/mo on [old way]" | Problem-aware audiences |
| Contrast | "Stop doing [old way]. Start [new way]." | Competitor conquest |
| Direct benefit | "[Outcome] in [timeframe]. No [common objection]." | High-intent keywords |
| Social proof | "Join [N]+ [role]s who switched to [product]" | Retargeting |

## Provisioned Infrastructure

When setting up ad campaigns, we provision everything the user needs:
- **MCC sub-account** for Google Ads (user doesn't need their own account)
- **Pixel setup** for Meta Ads tracking
- **Conversion tracking** configured end-to-end
- **Landing page** optimized for the campaign (via `/money-product`)

The user only sets the budget and approves the strategy. We handle the rest.

## Principles

- **ROI or die** — Every dollar spent must be tracked to revenue
- **Test small, scale winners** — Never bet big on unproven campaigns
- **Message match** — Ad copy must match the landing page
- **Negative keywords are gold** — Excluding bad traffic is as important as finding good traffic
- **Automate monitoring** — Set up alerts for budget overruns and performance drops
- **Concrete deliverables** — End with "Tomorrow's first ads action: [specific task]"
