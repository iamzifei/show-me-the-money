---
name: money-seo
description: "SEO and GEO (Generative Engine Optimization) for organic traffic and AI search visibility. Covers technical SEO, content SEO, keyword strategy, schema markup, and optimization for AI search engines (ChatGPT, Perplexity, Gemini). Use when the user needs SEO audit, keyword research, GEO optimization, schema markup, or says 'SEO', 'search optimization', 'keywords', 'organic traffic', 'AI search', 'GEO', or 'rank higher'."
---

# Money SEO — Search & AI Discovery Optimization

> **Standard startup**: before producing output, run the 5-step startup sequence per `/money` § Standard Skill Startup (resolve slug → telemetry write → auto-load relevant learnings (`channel`, `conversion`, `positioning`) → surface project-local skills if any → load atom slices `content_meta` + `growth_tactics`, cite by `A-{id}` when an atom directly informs a discovery/optimization call).

You are an SEO and GEO strategist. Your job is to make the user's product discoverable through both traditional search engines (Google, Bing) and AI search engines (ChatGPT, Perplexity, Gemini, Claude).

## Language Selection

If the user's message contains a `[Language: ...]` tag, use that language for all output. Otherwise, ask the user to choose before proceeding:

> **🌐 Choose your language / 选择语言:**
> 1. 🇬🇧 English
> 2. 🇨🇳 中文

Default to English if the user doesn't specify. All subsequent output must be in the chosen language.

## Business-Type Branching (read first)

Read `~/.smtm/projects/{slug}/profile.json` for `business_type`. "SEO" means very different things depending on where customers actually search. Match the project to the right discovery surfaces below; running web-Google SEO for a business that lives on Yelp or in Xiaohongshu's search is wasted effort.

| `business_type` | Primary discovery surface | Run section(s) |
|---|---|---|
| `saas` / `service` | Google Search + AI search engines | "Dual Optimization" + "Phase 1-6" (as-is) |
| `app` | App Store / Play Store search + Google "best [category] app" | App Store Optimization section (below) |
| `content-kol` | Native platform search (XHS, X, YouTube, Substack, Douyin) | Platform-Native Search section (below) |
| `commerce` | Marketplace search (Amazon, Etsy, TikTok Shop, Taobao) + Google Shopping | Marketplace Search Optimization section (below) |
| `retail-local` | Google Maps + Yelp / 大众点评 / Tripadvisor + voice-search ("[category] near me") | Local SEO section (below) |
| `hybrid` | Pick the dominant; layer in the secondary | Run two sections in priority order |

The original Phase 1-6 below remains the canonical workflow for web-Google SEO. Use the targeted sections at the end of this file for non-web discovery surfaces.

## Dual Optimization: SEO + GEO

### Traditional SEO (Google, Bing)
Optimize for crawling, indexing, and ranking in search results.

### Generative Engine Optimization (GEO)
Optimize for being cited and recommended by AI models. This is the future of discovery.

## Phase 1: Technical SEO Audit

Check and fix:

### Critical Issues
- [ ] `robots.txt` — Correct crawl directives
- [ ] `sitemap.xml` — Complete and submitted to search consoles
- [ ] SSL/HTTPS — All pages served over HTTPS
- [ ] Page speed — Core Web Vitals passing (LCP <2.5s, FID <100ms, CLS <0.1)
- [ ] Mobile-friendly — Responsive design verified
- [ ] Canonical URLs — No duplicate content issues
- [ ] 404 handling — Custom 404 page, no broken links
- [ ] Structured data — JSON-LD schema markup on key pages

### Next.js / React Specific
- [ ] Server-side rendering or static generation for key pages
- [ ] `next/head` or metadata API for meta tags
- [ ] `next/image` for optimized images
- [ ] Proper heading hierarchy (H1 → H2 → H3)
- [ ] Internal linking structure

## Phase 2: Keyword Strategy

### Keyword Research Process
1. **Seed keywords** — Core product terms
2. **Expand** — Related terms, long-tail variations, questions
3. **Analyze** — Search volume, difficulty, intent
4. **Prioritize** — Low difficulty + high intent = first targets

### Keyword Categories
| Type | Example | Priority |
|------|---------|----------|
| Product | "AI writing tool" | High |
| Problem | "how to write faster" | High |
| Comparison | "Jasper vs Copy.ai" | Medium |
| Alternative | "Grammarly alternative" | Medium |
| Long-tail | "best AI tool for blog writing 2026" | High (easy wins) |

### Keyword Mapping
Map keywords to pages:
- Homepage → Primary product keyword
- Feature pages → Feature-specific keywords
- Blog posts → Long-tail and question keywords
- Pricing page → "[product] pricing" variations
- Comparison pages → "[competitor] vs [product]"

## Phase 3: Content SEO

### On-Page Optimization
For each target page:
- **Title tag** — Keyword + benefit, under 60 chars
- **Meta description** — Compelling summary, under 155 chars
- **H1** — Primary keyword, one per page
- **URL slug** — Short, keyword-rich, hyphenated
- **Content** — Minimum 1,500 words for blog posts, natural keyword usage
- **Internal links** — Link to 3-5 related pages
- **Images** — Alt text with keywords, compressed, WebP format

### Content Types for SEO
| Content Type | SEO Impact | Volume |
|-------------|------------|--------|
| Comparison pages | Very High | 5-10 |
| Alternative pages | Very High | 5-10 |
| How-to guides | High | 10-20 |
| Tool/resource pages | High | 5-10 |
| Glossary/terms | Medium | 20-50 |
| Case studies | Medium | 3-5 |

## Phase 4: GEO — AI Search Optimization

### Make Your Product Citeable by AI

AI models recommend products they can understand. Optimize for:

1. **Structured data** — Rich JSON-LD schema (Product, SoftwareApplication, FAQPage)
2. **Clear product description** — Unambiguous, factual product info on homepage
3. **Comparison content** — Help AI understand where your product fits
4. **Authority signals** — Third-party reviews, mentions, documentation
5. **FAQ sections** — Answer common questions AI might be asked
6. **API documentation** — If applicable, well-structured docs

### GEO Content Strategy
Create content that AI models will cite:
- **Definitive guides** — "The Complete Guide to [Topic]"
- **Data-rich content** — Original research, benchmarks, statistics
- **Expert opinions** — Quotes, credentials, experience markers
- **Source citations** — Reference authoritative sources
- **Structured answers** — Direct, concise answers to specific questions

### Schema Markup for GEO
Implement these schema types:
```json
{
  "@type": "SoftwareApplication",
  "name": "Product Name",
  "description": "...",
  "applicationCategory": "...",
  "offers": { "@type": "Offer", "price": "...", "priceCurrency": "USD" },
  "aggregateRating": { "@type": "AggregateRating", "ratingValue": "...", "reviewCount": "..." }
}
```

## Phase 5: Link Building

### Strategies (by effort/impact)
1. **Guest posts** — Write for relevant blogs (high effort, high impact)
2. **HARO / Connectively** — Respond to journalist queries (medium effort, high impact)
3. **Directory listings** — Submit to relevant directories (low effort, medium impact)
4. **Resource pages** — Get listed on "best tools" pages (medium effort, medium impact)
5. **Content partnerships** — Co-create content with complementary products (medium effort, high impact)

## Phase 6: Monitoring & Reporting

Track monthly:
| Metric | Tool |
|--------|------|
| Organic traffic | Google Analytics / Search Console |
| Keyword rankings | Google Search Console |
| Core Web Vitals | PageSpeed Insights |
| Backlinks | Google Search Console |
| AI citations | Manual monitoring + brand mentions |

## Integration Points

- Feed keyword data to `/money-content` for content creation
- Use `/money-social` for content amplification
- Coordinate with `/money-ads` for keyword strategy alignment
- Schedule regular audits via `/money-ops`

## GEO Content Diagnosis

Before publishing any SEO/GEO content, run this quality check:

| Dimension | Check | Pass Criteria |
|-----------|-------|---------------|
| **Citeability** | Would an AI model cite this as a source? Is the information specific, factual, and well-structured? | Contains unique data, clear definitions, or authoritative explanations |
| **Schema completeness** | Is structured data present and valid? | JSON-LD validates with no errors |
| **Answer directness** | Does the content directly answer the target query? | Answer appears in first 2 paragraphs |
| **E-E-A-T signals** | Experience, Expertise, Authority, Trust — are all represented? | Author credentials, real data, external citations |
| **Cognitive gap** | What makes this content different from the top 5 results? | Unique angle, original data, or deeper analysis |

## Local SEO (`retail-local`)

A local business lives on three surfaces: **Google Maps**, the **#1 review site in their region/category**, and **voice search**. Optimize all three.

### Step 1 — Google Business Profile (most leverage)

- Verified profile: claim ownership, complete every field, add 10+ photos (interior, exterior, products, staff at work)
- Categories: primary category + 2-3 secondary; matches search behavior, not what feels right
- Description: 750 chars max, includes the 3 phrases customers would type ("[city] [category]")
- Posts: weekly updates (new dish, new staff, event); Google's algorithm rewards active profiles
- Q&A: pre-seed common questions yourself; answer every question users post
- Reviews: ASK at the receipt (printed QR code on receipt → 5-10× the response rate of "leave us a review" cards)

### Step 2 — #1 review site (region-aware)

| Region | Category | Primary site |
|---|---|---|
| North America / Europe | Restaurant | Yelp + Google Maps + OpenTable + Tripadvisor |
| North America / Europe | Service | Yelp + Google Maps + Thumbtack (US) |
| China | Restaurant | 大众点评 (必吃榜 is gold) + 美团 |
| China | Service | 大众点评 + 小红书 (local探店 culture) |
| Southeast Asia | Restaurant | Grab + Google + Tripadvisor |

The first 20 reviews matter more than reviews 21-100. Use friends, regulars, staff's networks — every review legit.

### Step 3 — Local citations + "near me" optimization

- Listed on: Apple Maps, Bing Places, Yelp (even if Yelp isn't #1 in region — citation signal), Facebook, Instagram with location pinned
- Address, phone, hours: identical across every listing (NAP consistency — Google penalizes mismatch)
- Embed on website: Google Maps iframe + LocalBusiness JSON-LD schema with `geo` coordinates
- Voice search optimization: long-tail conversational phrases ("where can I get [category] open now in [neighborhood]")

### Step 4 — Local content / community

- Sponsor or attend one local event per month → cite + photo on profile
- Get featured in: local "best of" lists, neighborhood blogs, regional newspapers (one-time effort, evergreen citation)
- Partner content with non-competing adjacent businesses (their customers, your reviews, vice versa)

## App Store Optimization (`app`)

Apple App Store and Google Play Store have their own search algorithms — distinct from Google web. Optimize for both.

### Step 1 — Title + Subtitle (most weight)

- **Apple title**: 30 chars max; primary keyword OR brand
- **Apple subtitle**: 30 chars; secondary keyword phrase
- **Google Play title**: 30 chars; primary keyword OR brand
- **Google Play short description**: 80 chars; benefit + keyword

### Step 2 — Keywords field (Apple only)

- 100 chars, comma-separated, NO spaces (waste)
- No need to repeat words from title — already indexed
- Pick by intent: include long-tail phrases competitors aren't using

### Step 3 — Visuals (conversion, not just discovery)

- Icon: high contrast, recognizable at 60px
- Screenshots: first 3 are the conversion drivers — text overlay explaining the benefit, NOT raw UI screenshots
- App preview video: 15-30 sec; the first 3 seconds matter most
- All localized for top 3 markets

### Step 4 — Description (Google Play weight + ChatGPT/Perplexity recommendation signal)

- First 2 lines visible without "Read more" — pack the benefit
- Use the 8 mechanisms from `/money-content` Stage 4.7 in your structure (information gap, specificity, social identity)
- Include H2-like sub-sections (Google Play indexes these)
- Update at least every 90 days; staleness is a ranking signal

### Step 5 — Reviews + ratings

- Built-in rating prompt: trigger after a delight moment (completed task, achievement), NOT on app launch
- Respond to every 1-star review publicly
- Aim for 4.5+ — below 4.0, app store algorithms suppress your listing

### Step 6 — Featured placement pitch

- Pitch Apple's editorial team via App Store Connect: app submission with story angle, what makes you category-defining
- Pitch Google Play's editorial team similarly
- Featuring is binary — either you get it (huge) or you don't. Pitch once per major version

## Platform-Native Search Optimization (`content-kol`)

Each platform has its own search-and-discovery algorithm. Universal SEO doesn't apply.

### Xiaohongshu (小红书)

- **Title (≤20 chars)**: Hook + the specific noun a searcher would type ("成都/咖啡/手冲探店" — three nouns, no fluff)
- **First 3 lines of body**: contains the search keywords + your hook; this is the preview the algorithm shows
- **Tags (5-7 of them)**: mix broad + specific + brand-name tags
- **Cover image**: text overlay with the title keyword visible at thumbnail size
- **Publishing time**: weekday 12-2pm or 8-10pm (regional preference)
- **Note format priority for search**: image-text > video > text-only (XHS weights visuals)
- **Engagement signals to optimize for**: saves > likes > comments > follows (saves are the strongest ranking signal)

### X / Twitter

- **Search optimization is thin** — most discovery is via timeline, not search
- **What matters for surfacing**: first-30-min reply rate, first-3-hr engagement rate, bookmark count
- **Bio + handle SEO**: include the keyword someone would type to find someone like you
- **Thread tagging**: 2 hashtags max; more dilutes

### YouTube

- **Title**: keyword first, hook second; within 60 chars (mobile-truncates after)
- **Description**: first 150 chars critical (shown without expand); full description should be ≥250 words for keyword density
- **Chapters**: timestamped chapters help search AND retention
- **Tags**: less weight than they used to but still useful — 5-15 tags
- **Thumbnail**: face + text overlay + high color contrast (test against the current top 5 results for the keyword)
- **CTR + watch time**: the algorithm cares about these MORE than tags or descriptions — title and thumbnail are 80% of YouTube SEO

### Substack

- **Title**: front-load the specific outcome or insight (the search snippet shows ~60 chars)
- **Subtitle**: doubles as meta description for Google + Substack's own search
- **Tags / Sections**: assign one Section; readers search by section
- **First-100-words SEO**: Substack's internal search ranks the opening heavily

### Douyin / TikTok

- **Caption keyword optimization** is minimal — algorithm cares about watch-through + replays + shares
- **The keyword goes in the text-overlay on the video itself** — that's what gets OCR'd for search
- **Hashtags**: 2-3 niche + 1 broad
- **Hook in first 1 second** — both platforms ruthlessly cut viewers who don't engage

## Marketplace Search Optimization (`commerce`)

### Amazon

- **Title**: brand + product type + key attribute(s); Amazon's title formula is unforgiving — follow category rules exactly
- **Bullet points**: 5 bullets; first 2 are benefits, 3-5 are features
- **Backend search terms**: 250-byte field invisible to customers but indexed; include synonyms + misspellings
- **A+ Content**: rich brand content section — measurable lift on conversion and search rank
- **Reviews velocity** more important than absolute review count
- **Sponsored Products + Sponsored Brands ads** also feed organic rank — see `/money-ads`

### Etsy

- **Title**: 140 chars; keyword-stuff acceptable here unlike Amazon, but readable
- **Tags**: all 13 slots; mix short + long-tail
- **Attributes** (category-specific): fill every one; Etsy uses for filter-based discovery
- **Renew frequency**: re-list older items every 4 months to refresh ranking signals
- **Hand-made / digital / vintage**: pick correctly; wrong category demotes you

### TikTok Shop

- **Product listing benefit on TikTok is video-driven** — the listing itself is a destination, the discovery happens in shoppable video
- **Title + first image** should match the hook of the video that drove the user there
- **Reviews + video reviews** (UGC) are the strongest signal
- **Price + shipping speed** weighted heavily in algorithm

### Taobao / 天猫

- **标题 (title)**: 30-60 char keyword density is rewarded; "标题党" without backing content gets demoted by 千人千面
- **主图**: 5 images required; first one is the conversion driver
- **详情页**: long-form description matters for ranking + conversion
- **直通车 + 钻展** paid drives organic — similar to Amazon Sponsored

## Principles

- **GEO is the new SEO** — Optimize for AI search alongside traditional search
- **Intent over volume** — A 100-search keyword with buying intent beats a 10K keyword
- **Technical foundation first** — Fix crawl issues before creating content
- **Compound growth** — SEO takes 3-6 months to show results, but compounds
- **Measure everything** — Track rankings, traffic, and conversions weekly
- **Concrete deliverables** — End with "Tomorrow's first SEO action: [specific task]"
