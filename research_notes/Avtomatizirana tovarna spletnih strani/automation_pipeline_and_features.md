# Automation pipeline, architecture and productizable features for a one-person "website factory" (Vercel + Supabase, Slovenia, as of 31 Oct 2026)

Scope note: this file covers architecture, the automation pipeline, tools with their 2026 capabilities, limits and prices, and the feature catalog. Security hardening, legal/tax, offer design/pricing and hosting costs are covered by other researchers. They appear here only where they change the architecture. Vercel doc pages were read on 31 Oct 2026 and carry their own `last_updated` dates, which are given inline. Vendor pricing pages without a date are marked "(page read Oct 2026, undated)".

---

## 1. Architecture choice: multi-tenant app vs project-per-client vs static export; Vercel limits; templates and per-tenant config

### Takeaway
Vercel's own Platforms docs (updated Sept 2026) recommend the **multi-tenant pattern** (one Next.js codebase, one deployment, tenant resolved from the hostname in `proxy.ts`) for website builders where "content and branding differ, but functionality is the same". They reserve **multi-project** (one Vercel project per tenant, created with the Vercel SDK) for tenants that need custom code or isolated infrastructure. On Pro, both patterns fit easily within the limits: unlimited projects, unlimited domains per project (soft cap 100,000), and 100 cron jobs per project. Hobby is non-commercial only, so client sites must run on Pro. The best fit for a solo factory is a hybrid: a multi-tenant "renderer" for every templated package, with an escape hatch into a separate project for the occasional bespoke client.

### Cited Findings
**Vercel's official recommendation (docs/platforms, last_updated 2026-09-03)**
- Vercel names two architectures. **Multi-tenant**: "One codebase, one deployment serves every tenant", complexity "Lower", "Best for: Content and branding differ, but functionality is the same (documentation sites, website builders, SaaS dashboards)". **Multi-project**: "One project and deployment per tenant", complexity "Higher", "Best for: Each tenant needs custom code or isolated infrastructure (AI coding platforms, user-generated apps)". — [Vercel for Platforms](https://vercel.com/docs/platforms)
- For a multi-tenant build, Vercel says to clone the **Platforms Starter Kit**. For multi-project, it says to follow the multi-project quickstart and create tenant projects with the **Vercel SDK** (`@vercel/sdk`, e.g. `vercel.projects.createProject({ requestBody: { name, framework: 'nextjs' } })`). — [Vercel for Platforms](https://vercel.com/docs/platforms)
- The typical setup Vercel describes is a root platform domain (`acme.com`), tenant subdomains (`tenant1.acme.com`) and optional custom domains (`tenantcustomdomain.com`), with automatic SSL for verified domains, programmatic domain management via the REST API/SDK, and preview deployments. — [Vercel for Platforms](https://vercel.com/docs/platforms)
- "Platform elements" are prebuilt actions and UI blocks for domains and deployments, such as a "claim deployment" block. — [Vercel for Platforms](https://vercel.com/docs/platforms)
- Vercel lists website/store builders running this pattern: Super, Typedream, Universe. It also lists content platforms (Hashnode, Dub), docs platforms (Mintlify, Fern) and B2B SaaS (Zapier Interfaces, Instatus, Cal.com). — [Vercel for Platforms](https://vercel.com/docs/platforms)
- Vercel for Platforms "can now deploy from your users' GitHub repositories" (changelog, linked from the Platforms docs). — [Vercel changelog](https://vercel.com/changelog/vercel-for-platforms-can-now-deploy-from-your-users-github-repositories)

**How multi-tenant routing works now (docs, last_updated 2026-08-20)**
- Tenant resolution is done in **Next.js Proxy (`proxy.ts`, exported function `proxy`)**, which "runs on every request before your pages render". The proxy looks the tenant up by subdomain or custom domain, strips any inbound `x-tenant-id` header, sets `x-tenant-id` on the *request* headers via `NextResponse.next({ request: { headers } })`, and rewrites to `/not-found` for unknown hosts. Server components read the tenant with `headers()`. — [Multi-Tenant Platform Concepts](https://vercel.com/docs/platforms/multi-tenant-platforms/concepts)
- There are three tenant identification strategies: subdomain (`tenant1.yourapp.com`), custom domain (DB lookup by `customDomain`) and path (`/tenant1/...`). For data isolation the docs say: "Use tenant ID in all queries". They also suggest storing tenant configuration in **Global Config** (`@vercel/global-config`) "for sub-10ms lookups" at the edge, caching tenant lookups in the proxy, and using connection pooling. — [Multi-Tenant Platform Concepts](https://vercel.com/docs/platforms/multi-tenant-platforms/concepts)
- Wildcard domains: add `*.yourapp.com` to the project. Vercel issues one wildcard Let's Encrypt certificate via a DNS challenge, so Vercel nameservers (`ns1/ns2.vercel-dns.com`) are required, or delegated certificate validation if the nameservers can't change. A wildcard covers only the first level: `*.yourapp.com` does not cover `docs.tenant1.yourapp.com`. — [Multi-Tenant Platform Concepts](https://vercel.com/docs/platforms/multi-tenant-platforms/concepts)
- Custom domains: add the domain via the SDK, the tenant sets a CNAME or nameservers, ownership is verified with a TXT record "for domains already in use on Vercel", and the certificate is issued per domain via HTTP challenge and renewed automatically. — [Multi-Tenant Platform Concepts](https://vercel.com/docs/platforms/multi-tenant-platforms/concepts)

**Limits (Vercel limits page, last_updated 2026-09-16; multi-tenant limits page, last_updated 2026-09-08)**
- Projects: Hobby 200, Pro unlimited. Deployments created per day: Hobby 100, Pro 6,000. Vercel projects connected per Git repository: Hobby 25, **Pro 150**. Build time per deployment: 45 min. Concurrent deployments: Hobby 1, **Pro "up to 500" with on-demand concurrent builds**. Cron jobs: 100 per project. Deploy hooks: 5 per project (Pro). — [Vercel Limits](https://vercel.com/docs/limits)
- Domains per project: Hobby 50, Pro/Enterprise "Unlimited*". The asterisk refers to soft limits of **100,000 domains per project on Pro** and 1,000,000 on Enterprise, which can be raised on request. — [Vercel Limits](https://vercel.com/docs/limits); [Multi-tenant Limits](https://vercel.com/docs/platforms/multi-tenant-platforms/limits)
- **Multi-tenant per-tenant preview URLs (`tenant1---project-git-branch.yourdomain.dev`) are Enterprise-only**, as are custom (uploaded) SSL certificates. — [Multi-tenant Limits](https://vercel.com/docs/platforms/multi-tenant-platforms/limits)
- Domain API rate limits listed on the multi-tenant page: domain addition 100/hour/team, verification 50/hour/team, removal 100/hour/team. The general API table on the limits page lists different values ("Domains creation per hour" 120; "Project domain creation, update, or remove per minute" 100). The two pages conflict, though both are far above a solo factory's needs. DNS propagation typically takes 24–48 h. — [Multi-tenant Limits](https://vercel.com/docs/platforms/multi-tenant-platforms/limits); contradicted in detail by [Vercel Limits](https://vercel.com/docs/limits)
- Function limits (Fluid compute): Hobby 300 s max. Pro 300 s default, 800 s max, up to 1,800 s in beta. 2 GB/1 vCPU default, up to 4 GB/2 vCPU on Pro. — [Vercel Limits](https://vercel.com/docs/limits)
- Cron: Hobby allows only once per day with ±59 min precision. Pro runs per minute with per-minute precision. Both plans get 100 cron jobs per project, and crons are billed as function usage. — [Cron usage & pricing (last_updated 2026-07-15)](https://vercel.com/docs/cron-jobs/usage-and-pricing)

**Plan constraints that shape the architecture**
- The Hobby plan is "restricted to non-commercial personal use only. All commercial usage of the platform requires either a Pro or Enterprise plan". A Vercel community answer adds that a business website promoting services counts as commercial even without direct monetary gain. — [Vercel Hobby plan docs](https://vercel.com/docs/plans/hobby); [Vercel Community](https://community.vercel.com/t/fair-use-of-the-hobby-plan/2725)
- Pro (last_updated 2026-09-15) costs a $20/month platform fee that includes 1 deploying seat and $20 of usage credit. Extra deploying seats are $20/month. **Viewer seats are free and unlimited**: they are read-only and can comment on previews. Pro also includes a Flat Rate CDN tier of 1M CDN requests and 1 TB transfer per month, and one free first-year domain on 16 eligible TLDs (e.g. .dev, .app, .site, .studio, .website). Spend notifications default to $200 per cycle. Password Protection is a $20/month per-project add-on. — [Vercel Pro Plan](https://vercel.com/docs/plans/pro-plan)

**Real-world scale proof for the multi-tenant pattern**
- Super (Notion-to-website builder) serves "over 15,000 custom domains" from one Next.js project on Vercel. It uses the Domains API to add and remove customer domains and auto-generate SSL, and on-demand ISR so content updates need no redeploy (17M+ page views per month). Its CEO says: "By far my favorite Vercel feature is the ability to connect as many domains as I need to a single project." This is a Vercel-published case study, undated and probably from 2022–2023. — [Vercel customer story: Super](https://vercel.com/blog/super-serves-thousands-of-domains-on-one-project-with-next-js-and-vercel)
- The open-source starter: [vercel/platforms on GitHub](https://github.com/vercel/platforms); announcement: [Introducing the Platforms Starter Kit](https://vercel.com/blog/platforms-starter-kit).

**Supabase constraints relevant to "one DB per client" vs shared DB (pricing page read Oct 2026, undated)**
- Free plan: 2 active projects, **paused after 1 week of inactivity**, 500 MB DB. Pro: from $25/month, includes $10/month compute credit "covers one Micro instance", 8 GB DB per project, 250 GB egress, 100k MAU, 2M Edge Function invocations, and daily backups kept 7 days. PITR costs $100/month per 7 days of retention. Branching costs $0.01344 per branch-hour. — [Supabase Pricing](https://supabase.com/pricing)

**Lessons from smaller multi-tenant builds**
- A team running 12+ sites from one codebase reported that "a CDN config change started forwarding a different header and took everything down". They now read the forwarded-host header first with a fallback, isolate config resolution in a testable function, and add complexity only when forced to. — [Medium: 12+ websites from one codebase](https://medium.com/@akshaymarx08/how-i-built-a-multi-tenant-platform-serving-12-websites-from-one-codebase-4c475165f723)
- A solo developer's early mistake was relying on a `tenant_id` column without Postgres RLS, so frontend logic was the only barrier between tenants. — [DEV: multi-tenant SaaS lessons](https://dev.to/cybersense/what-i-learned-building-a-multi-tenant-saas-as-a-final-year-student-9ce)
- A "multi-tenant website builder with one Next.js app" serves both the dashboard and every published site (subdomains and custom domains) from one app via hostname routing. — [DEV: Zenpage architecture](https://dev.to/zenpage/i-built-a-multi-tenant-website-builder-with-one-nextjs-app-heres-the-architecture-35gn)
- Choosing between one runtime for all sites and a separate build per site depends on whether you expect a few sites or hundreds to thousands. — [Khromov: code-sharing patterns for Next.js](https://khromov.se/code-sharing-patterns-for-next-js/)

### Inferences
- **Recommended architecture (hybrid):**
  1. **A multi-tenant "renderer" Next.js app** (one Vercel Pro project) serves every templated client site: `<slug>.sites.jurelabs.si` during build/review, and the client's own domain at go-live. Content changes are written to Supabase and published with on-demand revalidation via a per-tenant cache tag (the pattern Super uses), so they never trigger a rebuild. One codebase means one dependency/security update patches every client at once, which matters most for a one-person shop.
  2. **The same component/theme library is published as a package**, so a bespoke client can be spun into its own Vercel project (multi-project via the SDK) without forking the design system. The Pro cap of 150 projects per Git repo is only relevant if all bespoke clients share one monorepo.
  3. **Static export per client** (`output: 'export'` hosted anywhere) is the cheapest to host. It loses server features (form handlers, ISR, server-side preview, per-request tenant logic), and every content edit needs a rebuild and redeploy. It is the weakest fit for "as little manual work as possible". This is my assessment; the Next.js docs on static export were not re-verified in this session.
- **Per-tenant config in Supabase (practical pattern):**
  - A `tenants` table (`id`, `slug`, `custom_domain`, `status` draft/review/live/suspended, `plan`, `locales[]`, `modules jsonb` for enabled features, `theme jsonb` for design tokens such as colours, font pair, radius, logo URL, layout variant, and `seo jsonb`).
  - `pages` and `sections` tables where each section has a `type` and `props jsonb` (the same JSON shape a Puck editor produces). A code-side component registry maps section types to React components. Theme tokens are injected as CSS variables per request.
  - RLS on every table keyed to `tenant_id` and the client's auth user. A hostname-to-tenant cache in Global Config or in-proxy memory keeps lookups off the database.
  - This gives "packages" as presets (template + default modules), so the configurator output maps directly to a `tenants` row.
- **Domain plan:** a wildcard under `sites.jurelabs.si` requires either moving the `jurelabs.si` zone to Vercel DNS or delegating `_acme-challenge` validation (Vercel docs). An alternative is a separate preview domain, e.g. one of the Pro free-domain TLDs, on Vercel nameservers. Client custom domains (often `.si` at a Slovenian registrar) only need A/CNAME records and, sometimes, a TXT verification record.
- **Client previews before go-live:** per-tenant preview *deployments* are Enterprise-only. The practical substitute is to serve unpublished tenants from the production deployment on the preview subdomain behind Next.js draft mode or a signed token, so no extra deployment is needed.
- **Supabase:** a single shared Supabase Pro project with RLS is far cheaper than one Supabase project per client. Each extra project consumes its own compute (the $10 credit covers only one Micro instance), and free projects pause after a week, which makes them unsuitable for production client sites. Supabase has EU regions (e.g. Frankfurt); this was not re-verified in this session.

### Gaps
- I did not verify the exact current Next.js major version. Vercel's docs use the `proxy.ts` convention, which replaced `middleware.ts` in Next.js 16.
- I did not read the Platforms Starter Kit repo's current stack (tenant store, Next.js version) directly in 2026.
- Pricing for on-demand concurrent builds (Pro "up to 500") was not checked.
- I did not verify whether Vercel's registrar can buy `.si` domains. Most Slovenian SMB domains are held at local registrars, so assume external DNS.
- I did not verify whether Vercel's free Viewer seats can be limited to a single project. Inviting clients as viewers could expose other clients' projects.

---

## 2. Client content editing: which CMS or editing approach fits many small client sites

### Takeaway
For a multi-tenant factory, the lowest-support option is **a custom Supabase-backed client portal with structured forms**: hours, services, price lists, menus, galleries, news, and page sections with constrained props. An optional visual editor built on **Puck** (MIT; JSON stored in Supabase) can serve clients who want layout control. **Payload 3** is the strongest full open-source CMS (MIT, runs inside Next.js, official multi-tenant plugin), but it adds a heavy admin surface. Per-project SaaS CMSs (Sanity Growth, TinaCloud Team) price linearly per client, and Git-based CMSs (Keystatic, Tina) fit the project-per-client/static model better than a shared database.

### Cited Findings
- **Payload multi-tenant plugin (`@payloadcms/plugin-multi-tenant`, Payload 3.x):** it adds a `tenant` field to chosen collections and filters admin list views and relationships by the selected tenant. It supports "global-like" one-document-per-tenant collections and adds a tenant selector to the admin and a `tenants` array on users. It rejects writes to tenants the user doesn't belong to, including drafts and autosaves. A caveat: by default, deleting a tenant deletes its documents. — [Payload docs: Multi-tenant plugin](https://payloadcms.com/docs/plugins/multi-tenant)
- Payload markets multi-tenancy as built into its architecture rather than a paid add-on. — [Payload: Multi-tenancy](https://payloadcms.com/multi-tenancy)
- Figma acquired Payload in June 2025. Payload's CEO said the product continues under the same banner and stays open source. — [CMSWire](https://www.cmswire.com/digital-experience/when-cms-meets-ux-design-what-figmas-payload-deal-really-means)
- Unverified: several 2026 posts from one blog network claim "Payload Cloud paused new sign-ups", meaning self-hosting is the default path. — [Techsy (unverified)](https://techsy.io/en/blog/payload-cms-guide)
- Payload's hosted plan prices conflict across aggregators: CostBench lists $0–$833/month (Aug 2026), and another CostBench comparison lists a $35/month Growth tier. — [CostBench](https://www.costbench.com/software/headless-cms/payload-cms/)
- **Sanity (pricing page © 2026, no effective date):**
  - Free: $0, 20 seats limited to Administrator and Viewer roles, 2 public datasets, 10k documents, 1M CDN and 250k API requests per month.
  - Growth: $15 per seat per month, up to 50 seats, 2 private datasets, 25k documents. Extra datasets are a $999/month add-on.
  - The page states no project limit. Each project needs separate invitations and configuration isn't shared across projects. There is no agency pricing on the page.
  - — [Sanity Pricing](https://www.sanity.io/pricing)
- **TinaCMS/TinaCloud (pricing page © 2019–2026):**
  - Free: $0, 2 users, unlimited projects, no editorial workflow.
  - Team: **$24/project/month** billed annually or $29 monthly, 3–10 users, editorial workflow.
  - Business: $249/project/month billed annually ($299 monthly).
  - — [Tina Pricing](https://tina.io/pricing)
- **Keystatic:**
  - Core is MIT, with local mode and GitHub mode (the latter needs a GitHub App/OAuth setup). Keystatic Cloud's free tier is reported as unlimited projects with up to 3 users per team. — [Wisp comparison](https://wisp.blog/compare/keystatic/directus); [Luckymedia](https://www.luckymedia.dev/insights/keystatic)
  - Paid Cloud details conflict: Wisp says $10/month for 3 users plus $5 per extra user, while Luckymedia describes a Pro plan with Cloud Images. These are secondary sources.
  - Keystatic is used as the CMS option in a commercial Next.js + Supabase SaaS kit. — [Makerkit docs](https://makerkit.dev/docs/next-supabase-turbo/content/keystatic)
- **Directus:** under BSL 1.1 with a usage grant, organisations with total finances under $5M used it in production for free. Directus has since announced a v12 relicensing to a bundled model (MSCL plus a grant), whose final terms I did not confirm. — [Directus BSL FAQ](https://directus.io/bsl-faq); [Directus v12 license change](https://directus.com/resources/directus-v12-license-change)
- **Puck:**
  - Open-source (MIT) React visual editor. It is "just a React component", works with Next.js (official Next.js recipe), and "you own your data". — [Puck GitHub](https://github.com/puckeditor/puck)
  - A third-party guide says "Puck AI" (0.8, around 28 July 2026) adds a hosted agent around the editor, and that the package namespace moved from `@measured/puck` to `@puckeditor/core`. Unverified against Puck's own announcement. — [Agentpedia (secondary)](https://agentpedia.codes/blog/puck-ai-0-8-embedded-react-builder-guide.md)

### Inferences
- **Support burden ranking (low to high):**
  1. **Constrained structured forms in the client portal.** Clients can't break the design, the fields map to schema.org data, and they work well with AI assistance ("rewrite this paragraph", "translate to German").
  2. **Puck visual editor limited to the factory's own section components.** Clients get freedom, but only within the design system. Page JSON lives in Supabase per tenant, so no extra service is needed.
  3. **Payload admin.** It is powerful, but it is a full CMS UI to explain, upgrade and secure, and it doubles the surface area in the same Next.js app.
  4. **Git-based CMSs (Keystatic, Tina).** Every edit is a commit plus rebuild, which suits project-per-client/static sites. Client authentication is via GitHub or Tina Cloud.
  5. **Per-project SaaS (Sanity, Tina Team).** Costs scale with the number of clients, e.g. 30 clients × $24 = $720/month on Tina Team, and each project is configured separately.
- Because most SMB clients edit content rarely (hours, prices, a news item, holiday notices), a **"request a change" button** that creates a ticket, which an AI agent or the owner applies, may replace a CMS entirely for the cheapest package. Self-editing can then be an upsell.
- Builder.io-style hosted visual CMSs add per-seat or per-space SaaS costs and vendor lock-in. Puck covers the same need in-house. Builder.io pricing was not verified.

### Gaps
- Builder.io's current pricing and multi-space terms were not checked.
- Payload's official pricing page and Payload Cloud status were not fetched directly; third-party data conflicts.
- I did not verify whether Payload's admin UI ships a Slovenian translation.
- Directus v12 license (MSCL) terms were not confirmed.

---

## 3. AI-assisted first-draft generation (copy in Slovenian, structure, images, SEO): capabilities, cost per site, risks

### Takeaway
Token costs are negligible. With October 2026 prices (Claude Sonnet 5.5 at $2/$10 per million tokens, Opus 5.5 at $4/$20, Haiku 5.5 at $0.10/$0.50, Batch API −50%), a full multi-page Slovenian draft with SEO metadata and two translations costs roughly $0.5–$1.5 in text plus about $0.3–$1.5 for images. The real risks are Slovenian grammar and idiom quality (no current head-to-head benchmark of frontier models was found), invented facts about the business, image licensing and AI-labelling duties (EU AI Act Art. 50 applies from 2 Aug 2026), and EU data residency (Anthropic's first-party API offers only global or US-only inference). The pipeline should generate *structured JSON into the template's schema* from verified client inputs, never free-form HTML, and keep a human proofread gate.

### Cited Findings
- **Claude API prices (platform.claude.com pricing page, read 31 Oct 2026), per million input/output tokens:**
  - Claude Opus 5.5 $4/$20, with cache hits at $0.20 (0.05× input).
  - Claude Sonnet 5.5 $2/$10, with cache hits at $0.10.
  - Claude Sonnet 5 $2/$10. The introductory price became standard, and the planned 1 Sep 2026 increase to $3/$15 "will not occur".
  - Claude Haiku 5.5 $0.10/$0.50 for prompts up to 100k tokens, and $0.50/$2.50 above that. Claude Haiku 4.5 $1/$5.
  - Top-tier Claude Fable 5.1 $10/$50.
  - — [Claude pricing](https://platform.claude.com/docs/en/about-claude/pricing)
- The Batch API gives 50% off input and output and stacks with prompt caching. Web search costs $10 per 1,000 searches plus tokens. Claude 4.7 and later use a newer tokenizer that produces "approximately 30% more tokens for the same text". — [Claude pricing](https://platform.claude.com/docs/en/about-claude/pricing)
- **Data residency:** on the first-party Claude API, `inference_geo: "us"` costs 1.1× and the default is global. The pricing page describes no EU-only first-party option. Bedrock and Google Cloud offer regional and multi-region endpoints at a 10% premium over global. — [Claude pricing](https://platform.claude.com/docs/en/about-claude/pricing)
- **v0 (v0.app pricing page, undated, read Oct 2026):**
  - Plans: Free (7 messages/day), Plus $30/user/month ($30 monthly credits), Business $100/user/month (training opt-out by default), Enterprise custom.
  - Model token prices: v0 Mini $0.20/$1.20, v0 Pro $2/$10, v0 Max $5/$25, v0 Max Fast $10/$50 per million tokens.
  - **The page does not say which plan includes v0 Platform API access.** — [v0 pricing](https://v0.app/pricing)
  - Third-party sources conflict on API access (Premium vs Business) and on plan renames (Team → Plus in July 2026). — [Automation Atlas (secondary)](https://automationatlas.io/answers/v0-pricing-explained-2026/)
- **Image generation (Gemini API pricing page, last updated 2026-10-30), price per image:**
  - Gemini 2.5 Flash Image ("Nano Banana") $0.039 per image up to 1024², or $0.0195 in batch. **Deprecated, shutdown 15 Mar 2027.**
  - Gemini 3.1 Flash Image ("Nano Banana 2") $0.067 at 1K and $0.101 at 2K.
  - Nano Banana 2.1 $0.0336 at 1K.
  - Gemini 3 Pro Image $0.134 at 1K/2K and $0.24 at 4K.
  - Batch is 50% off. Paid-tier data is "not used to improve products"; free-tier data is. — [Gemini API pricing](https://ai.google.dev/gemini-api/docs/pricing)
- **Slovenian language quality evidence:**
  - A March 2026 paper on GaMS3-12B (University of Ljubljana, a Slovene-adapted model) reports it "performs comparably to much larger commercial GPT-4o in the Slovene LLM arena", with a >60% win rate against its base model. — [arXiv 2603.01691](https://arxiv.org/html/2603.01691v1)
  - On the older SloBench English→Slovene leaderboard, DeepL ranked first, with gemini-1.5-pro, Claude Sonnet 3.5 and GPT-4o close behind. These are older models.
  - **No head-to-head Slovene benchmark of current Claude/GPT/Gemini versions was found.** — [Search summary of SloBench / GaMS sources](https://huggingface.co/papers/2603.01691)
- **Stock photo licensing (Unsplash API):** apps must credit Unsplash and the photographer with a link, hotlink images via the API-returned URLs, and call `download_location` on download-like actions. The base Unsplash License itself doesn't require attribution. — [Unsplash API Guidelines: Attribution](https://help.unsplash.com/api-guidelines/guideline-attribution); [Hotlinking](https://help.unsplash.com/api-guidelines/guideline-hotlinking-images)
- **EU AI Act Art. 50:**
  - Transparency obligations apply from **2 Aug 2026**. Deployers must disclose AI-generated or manipulated "deep fake" images, video and audio. Machine-readable marking falls mainly on providers, i.e. the model vendors. — [Cooley (3 Aug 2026)](https://www.cooley.com/news/insight/2026/2026-08-03-eu-ai-act-transparency-obligations-take-effect-2-august-2026); [Harper Macleod](https://www.harpermacleod.co.uk/insights/eu-ai-transparency-rules-now-in-force/)
  - Marking for systems already on the market was reportedly deferred to 2 Dec 2026 under the AI Omnibus provisional agreement. This comes from secondary sources. — [Harper Macleod](https://www.harpermacleod.co.uk/insights/eu-ai-transparency-rules-now-in-force/)
  - Chatbot-style "is it a bot" disclosure duties also took effect on 2 Aug 2026. — [Travers Smith](https://www.traverssmith.com/knowledge/knowledge-container/is-it-a-bot-eu-ai-act-transparency-rules-take-effect-2-august-2026/)

### Inferences
- **Cost per site draft (my calculation from the prices above):**
  - Assume about 70k input and 50k output tokens in total. That covers structure plus copy for 5–8 sections or pages, SEO titles, descriptions and JSON-LD, a self-review/proofread pass, and EN plus DE translations.
  - **Sonnet 5.5: ~$0.14 + ~$0.50 ≈ $0.65. Opus 5.5: ~$0.28 + ~$1.00 ≈ $1.30.** Batch API halves this if the draft isn't needed instantly.
  - 8 images: $0.27 (Nano Banana 2.1 at 1K) to $1.07 (Gemini 3 Pro Image).
  - Even with 3× retries the total stays under about $10 per site, which is immaterial against any package price. Human review time is the real cost.
- **Pipeline design to limit quality risk:**
  1. Generate only into a strict JSON schema (sections, headings, body, CTA, FAQ, meta), validated with Zod. The renderer then can't produce broken layouts.
  2. Ground every factual claim in configurator answers, uploaded documents, the client's existing website and their Google Business Profile. Instruct the model to output `[[MISSING: …]]` placeholders instead of inventing years, certificates, prices or awards. Auto-flag numbers, names and claims for client confirmation.
  3. Run a second "Slovenian editor" pass, e.g. with Opus 5.5 at a lower temperature, against a style guide: formal "vi" vs informal "ti", dual forms, local terms. Show the client the draft in the preview *before* publishing, since they are the final proofreader.
  4. Write SEO metadata and schema.org data from structured fields, not prose.
- **Images:** prefer the client's own photos, then licensed stock (Unsplash or Pexels with API attribution handled in the component), then AI images for abstract or decorative visuals only. Avoid photoreal AI images of the client's premises, team or products. Those could mislead customers and would fall under the Art. 50 deep-fake disclosure duty. Store provenance (source, licence, prompt) per image in Supabase.
- **v0 Platform API** is optimised for generating arbitrary React apps. For a template factory, generating *content JSON for existing components* is cheaper, more consistent and easier to support than generating code per client. I would use v0 or an agent only for bespoke "multi-project" clients.
- **GDPR:** configurator inputs are business data, but they can include personal data (owner names, phone numbers). A DPA with the LLM vendor plus disclosure in the privacy notice is needed. EU-region inference is available via Bedrock or Vertex at about +10% if required (legal/security researchers to confirm).

### Gaps
- No current benchmark measures Slovenian copywriting quality of Claude Opus/Sonnet 5.5 vs GPT/Gemini. A small in-house blind test is advisable.
- OpenAI gpt-image and Google Imagen 4 prices were not verified on official pages. Third-party sites conflict.
- The official v0 Platform API pricing and plan entitlement were not found.

---

## 4. End-to-end pipeline: configurator → quote → e-signature → deposit → onboarding → build → preview → revisions → go-live → handover → maintenance

### Takeaway
Everything can run on the existing stack plus a few SaaS APIs:
- **Supabase** (system of record, Auth for the client portal, Storage for uploads, Queues/pg_cron).
- **Vercel** (renderer app, Functions/Cron, **Vercel Workflows** for long-running "wait for the client" flows, Domains API).
- **Stripe** (card/SEPA collection only).
- **An e-signature API or simple click-to-accept.**
- **Resend** for email.
- **A Slovenian invoicing API** for legally valid, fiscally verified invoices.

n8n Cloud (EU, from €20/month) is an optional no-code glue layer. Its main value is visual debugging of integrations; it is not required.

### Cited Findings
**Orchestration options**
- **Vercel Workflows (Workflow SDK; docs last_updated 2026-09-16):**
  - Durable runs with steps, retries and hooks. "Maximum run duration: No limit" and "Maximum `sleep` duration: No limit". Default Node runtime caps are 25,000 events and 10,000 steps per run.
  - Billing: Hobby includes 50,000 workflow events per month. On-demand prices are $0.02 per 1k events, $0.50/GB written and $0.50 per GB-month retained (retention is not available on Hobby). Workflows run on Vercel Queues, and step compute is billed as normal Functions.
  - — [Vercel Workflows pricing & limits](https://vercel.com/docs/workflows/pricing)
- **Supabase Queues:** a Postgres-native durable queue built on `pgmq`. "A Message is delivered exactly once to a consumer within a customizable visibility window", and access is controlled by API permissions and RLS. — [Supabase Queues docs](https://supabase.com/docs/guides/queues)
  - A common pattern is pg_cron triggering an Edge Function that reads a batch from a pgmq queue, with pg_net for HTTP calls from SQL. This comes from a third-party write-up. — [DEV: Supabase cron + queue + edge function](https://dev.to/suciptoid/build-queue-worker-using-supabase-cron-queue-and-edge-function-19di)
  - Pro includes 2M Edge Function invocations, then $2 per million. — [Supabase Pricing](https://supabase.com/pricing)
- **n8n (pricing page read Oct 2026, undated):**
  - Starter €20/month billed annually, 2,500 executions, 5 concurrent. Pro €50/month annually, 10,000 executions. Business €667/month, self-hosted only.
  - Hosted plans store data in **Frankfurt, Germany**. A self-hosted Community Edition is available on GitHub; its licence terms are not stated on the pricing page.
  - — [n8n pricing](https://n8n.io/pricing/)
- **Trigger.dev:** Free $0 ($5 usage credit, 20 concurrent runs, 10 schedules, 1-day logs). Hobby $10/month. Pro $50/month. "Open source and self-hostable". No EU region is mentioned. — [Trigger.dev pricing](https://trigger.dev/pricing)
- **Inngest:** Free tier with 50k executions per month (5 concurrent steps, 24 h history, pauses at quota). Pro from $99/month (1M executions). Open source and self-hostable. No EU region is mentioned. — [Inngest pricing](https://www.inngest.com/pricing)
- **Vercel Cron on Pro:** per-minute schedules, 100 per project. — [Vercel cron pricing](https://vercel.com/docs/cron-jobs/usage-and-pricing)

**Payments**
- **Stripe Slovenia (pricing page, © 2026):**
  - Standard EEA cards 1.5% + €0.25. Premium EEA cards 2.8% + €0.25. UK cards 2.5% + €0.25. International cards 3.15% + €0.25 (+2% FX).
  - SEPA Direct Debit €0.35.
  - **Checkout and Payment Links at no extra charge.** Post-payment invoices from Checkout: 0.4% capped at $2.
  - Invoicing Starter 0.4% per paid invoice. Billing (subscriptions) 0.7% pay-as-you-go. Stripe Tax Basic 0.5% (no-code) or €0.45 per API transaction.
  - Disputes €20.
  - — [Stripe pricing (SI)](https://stripe.com/en-si/pricing)
- **Fiscal verification constraint:** the Slovenian government guidance treats payment "by debit or credit card, cheque or similar" as a **cash payment** for the fiscal-verification law (ZDavPR). Direct transfer to a transaction account is the exception. Such invoices must be confirmed by FURS before issuing. — [gov.si: Davčni postopek in davčno potrjevanje računov](https://www.gov.si/teme/davcni-postopek-in-davcno-potrjevanje-racunov/)
  - A Žurnal24 guide says online shops taking card payments need fiscal verification, but those paid exclusively to a transaction account do not. It also claims PayPal-paid invoices need not be verified (conflicting/unverified). — [Žurnal24](https://www.zurnal24.si/uporabno/davcna-blagajna-za-spletno-trgovino-kaj-morate-vedeti-o-davkih-395540)
  - Older FURS-attributed clarifications on PayPal and Moneta are summarised in [data.si](https://data.si/blog/davcne-blagajne-enako-kot-paypal-se-bo-obravnavala-tudi-moneta/).
  - The consolidated ZDavPR text is valid as of 1 Jan 2026. — [Tax-Fin-Lex ZDavPR](https://www.tax-fin-lex.si/dokument/podrobnosti/502c0678-7c49-42c0-82d7-024cbafd1dd0)
- **UPN QR (bank transfer):**
  - npm `upnqr` (ISC) encodes and decodes UPN QR from payer, recipient, amount, purpose and IBAN fields. — [npm upnqr](https://www.npmjs.com/package/upnqr)
  - `upn-with-qr-generator` v2.0.2 (MIT) claims "2024 standard compliant" generation. This is the package's own claim. — [unpkg: upn-with-qr-generator](https://app.unpkg.com/upn-with-qr-generator@2.0.2/files/package.json)

**E-signature / acceptance**
- **DocuSeal (pricing page, undated):**
  - Open-source self-hosted edition free, with legally binding e-signature and an audit log.
  - Cloud Pro $20/user/month ($200/year), unlimited requests.
  - **API/embedding $0.20 per completed document** (requires one Pro seat). Sandbox free.
  - **EU Qualified Signature (QES) $2–$4 each** on Cloud Pro.
  - The page does not mention eIDAS by name or an EU-hosted cloud.
  - — [DocuSeal pricing](https://www.docuseal.com/pricing)
- **Documenso:**
  - The official pricing page lists Teams at $40/month billed yearly, with unlimited documents, API access, embedding and 5 users. — [Documenso pricing](https://documenso.com/pricing)
  - Self-hosting is offered with a separate licence. — [Documenso self-hosted](https://documenso.com/self-hosted)
  - A third party lists the Platform embed/API plan at $250/month. — [Toolradar](https://toolradar.com/tools/documenso/pricing)
- **eIDAS Art. 25(1):** an electronic signature "shall not be denied legal effect and admissibility as evidence in legal proceedings solely on the grounds that it is in an electronic form or that it does not meet the requirements for qualified electronic signatures". — [Regulation (EU) 910/2014](https://eur-lex.europa.eu/eli/reg/2014/910/oj)

**Email**
- **Resend (pricing page, undated):**
  - Transactional Free: 3,000 emails/month (100/day), 3 domains. Pro: $20 (50k) to $35 (100k), 10 domains. Scale: from $90. Marketing Free: 1,000 contacts. Pro marketing: from $40 for 5k contacts. — [Resend pricing](https://resend.com/pricing)
  - The sending region can be Ireland (`eu-west-1`), but **the region controls only where mail is sent from; account data stays in the US**. — [Resend: Choosing a region](https://resend.com/docs/dashboard/domains/regions)
  - The docs say non-US regions are on paid plans, while a changelog says free users can use any region. These conflict. — [Resend changelog](https://resend.com/changelog/multi-region-for-everyone)

**Go-live, previews, client collaboration**
- Custom domain flow: add the domain via the SDK, the client sets a CNAME or nameservers, TXT verification runs if needed, and SSL is issued automatically. Per-tenant preview deployments are Enterprise-only. — [Multi-Tenant Concepts](https://vercel.com/docs/platforms/multi-tenant-platforms/concepts); [Multi-tenant Limits](https://vercel.com/docs/platforms/multi-tenant-platforms/limits)
- Vercel Pro viewer seats are free and can "comment and collaborate on deployed previews". — [Vercel Pro Plan](https://vercel.com/docs/plans/pro-plan)
- Vercel publishes "Platform Elements" UI blocks for domains and deployments. — [Vercel for Platforms](https://vercel.com/docs/platforms)
- The Vercel MCP server can buy domains ("Vercel MCP now supports purchases"). — [Vercel changelog](https://vercel.com/changelog/vercel-mcp-now-supports-purchases)

### Inferences
**Concrete pipeline (state machine in Supabase `projects.status`, driven by one Vercel Workflow per project, with webhooks as resume events)**

1. **Inquiry (existing configurator)**
   - The configurator posts to a Route Handler, which writes `leads` and `inquiries` rows and starts the workflow. BotID or Turnstile protects the form.
   - Leads can be scored automatically (package, budget, industry), and a Slack or e-mail notification goes out.
2. **Instant quote/proposal**
   - Deterministic pricing in code: package plus add-on modules from a `price_list` table.
   - A PDF is rendered with React-PDF in a Function, or as an HTML proposal page in the portal.
   - Resend sends a magic link into the client portal (Supabase Auth OTP).
   - The quote carries validity and terms, and the workflow `sleep`s with reminder emails at day 3 and day 7.
3. **Acceptance**
   - Cheapest option: click-to-accept in the portal with an audit record (timestamp, IP, user agent, SHA-256 of the proposal PDF, user ID). This is a simple e-signature, valid as evidence per eIDAS Art. 25(1), subject to legal researcher confirmation.
   - Upgrade option: a DocuSeal API envelope at $0.20 per document, or self-hosted DocuSeal/Documenso, with a webhook back to the workflow on completion.
4. **Deposit (e.g. 30–50%)**
   - (a) **Bank transfer with UPN QR** on a proforma (*predračun*), generated with `upnqr`. Payments to a transaction account need no fiscal verification, but reconciliation needs a bank-statement import or bank API.
   - (b) **Stripe Checkout/Payment Link**, preferably with card and SEPA. The `checkout.session.completed` webhook resumes the workflow and **calls the invoicing API to issue a fiscally verified invoice**, because card payment counts as cash under ZDavPR. Stripe receipts or invoices should not be treated as the legal Slovenian invoice.
5. **Content collection / onboarding**
   - A portal wizard with structured fields: business data, services/prices, hours, team, FAQs.
   - Uploads (logo, photos, documents) go to Supabase Storage.
   - Optional prefill by scraping the client's existing site or Google Business Profile and summarising it with Claude.
   - The workflow sends automatic reminders until the content checklist is complete.
6. **Automated build**
   - The AI draft (section 3) is written into `pages` and `sections` for the tenant with `status = draft`. Theme tokens come from the chosen template plus brand colours extracted from the logo.
   - In the multi-tenant model **there is no build**: the site exists immediately at `slug.sites.jurelabs.si` in draft mode.
   - A smoke test runs (Playwright screenshot plus a Lighthouse run), and the screenshots are attached to the review email.
7. **Preview & revisions**
   - The client reviews on the preview subdomain via a signed link.
   - Revision requests come through a portal form tied to a section ID, or through Vercel Toolbar comments if the client is a free Viewer (check cross-client visibility first).
   - The revision round counter per package is stored in the database.
   - Text changes can be applied by an AI agent and approved by the owner.
8. **Final payment, then go-live**
   - The balance invoice is paid (Stripe or UPN).
   - Then the domain is added with `vercel.projects.addProjectDomain`, and DNS instructions are shown in the portal. Vercel Platform Elements can render them.
   - A cron polls verification until SSL is issued, then flips `tenants.status = live`. Sitemap and robots switch from `noindex` to indexable.
9. **Handover**
   - An auto-generated handover email or PDF with portal login, edit instructions, a support/SLA summary, and the analytics report schedule.
   - Optionally starts the maintenance subscription (Stripe Billing at 0.7%, or a recurring UPN invoice from the invoicing app).
10. **Monitoring/maintenance**: see section 6.

**Engine choice**
- A solo developer already on Vercel and Supabase gets the fewest moving parts from **Vercel Workflows** (code-first, durable, unlimited sleeps, cheap at this volume) or **pg_cron + Supabase Queues + Edge Functions**.
- n8n Cloud (EU-hosted, €20/month for 2,500 executions) is worth it only if visual flows speed up integration work. Each project lifecycle uses perhaps 20–50 executions, so Starter suffices for many dozens of projects a month.
- Inngest's and Trigger.dev's free tiers are fine alternatives. Neither states EU hosting.

**CRM**
- A Supabase `leads` table with stages plus a simple Kanban in the admin is enough at this scale. HubSpot or Pipedrive add another data silo to sync.
- Resend for transactional mail; a dedicated EU email provider is an option if data residency is a selling point. Resend's EU region does not keep account data in the EU.

### Gaps
- Dropbox Sign, Make, Zapier, Postmark, Brevo, HubSpot Free and Pipedrive pricing were not verified in this session.
- No source was found for **automatic matching of incoming UPN bank transfers via a bank API** (PSD2 account-information providers) for Slovenian banks in 2026. Reconciliation of bank-transfer payments may remain semi-manual, e.g. via the invoicing app's bank-statement import.
- I did not verify whether DocuSeal Cloud offers EU data hosting (docuseal.eu).
- The legal sufficiency of click-to-accept for this contract type under Slovenian law is for the legal researcher.

---

## 5. Invoicing automation for a Slovenian s.p.: apps with APIs, fiscal verification, e-invoices (eSLOG), prices

### Takeaway
**Minimax** is the best-documented option that combines everything needed. It has a REST API with OAuth2, a documented route for external systems to have invoices fiscally verified, and issued invoices plus e-invoices in its plans, from €13–19/month (excl. VAT). **Čebelca BIZ** (free Mini plan up to 15 invoices/month, Plus about €8–10/month, API with fiscalization usable via a community package) and **e-računi.com** (JSON API, Shopify app with fiscalized invoices) are cheaper or more e-commerce oriented. Their current prices and API scope need confirming. Card payments trigger fiscal verification, and **B2B e-invoicing becomes mandatory from 1 Jan 2028 (ZIERDED)**, so the chosen app must support both via API.

### Cited Findings
- **Minimax prices (cenik page, monthly, excl. VAT; linked price list file dated 2024-07-01, page © 2026):**
  - "Izdani računi" €13.00: issued invoices and e-invoices, fiscally verified receipts, received orders, document inbox.
  - Mikro €19.00: adds received invoices, bank statements and travel orders.
  - Mini €26.00. Maksi €36.00 (adds payroll and stock).
  - Free trial; no free plan.
  - — [Minimax cenik](https://www.minimax.si/cenik)
- **Minimax API:** RESTful with OAuth2 (password grant). Base `moj.minimax.si/si/api`, token endpoint `moj.minimax.si/si/aut/oauth20/token`. — [Minimax help: API](https://si-minimax.knowledgeowl.com/help/pdfexport/id/5cb5dfd18e121c7231df9733)
  - A help page (dated 2021) says external programs can send invoice data to Minimax, which **performs fiscal verification on issue** and returns the completed document. — [Minimax help: davčno potrjevanje za zunanje programe prek API](https://si-minimax.knowledgeowl.com/help/pdfexport/id/5cb5e0a3ec161c9e1c0b0bc9)
  - External applications are created in the user account and get API credentials; repeated failed logins lock them. — [Minimax help](https://si-minimax.knowledgeowl.com/help/pdfexport/id/6151c0dff7adbc99287b2574)
  - The Minimax integration is listed in Nango's integration catalogue. — [Nango: Minimax](https://nango.dev/docs/integrations/all/minimax/connect)
- **Čebelca BIZ:**
  - Mini is free ("je in bo ostal brezplačen") for up to 15 invoices per month. Plus is €7.8–9.8/month, with up to 500 invoices per month, quotes, proformas and advance invoices.
  - The site lists "Izvozi podatkov, API" and has help on fiscal verification and e-invoices (XML).
  - **Caveat: the site footer reads "© 2009-2015", so prices may be stale.**
  - — [Čebelca BIZ](https://www.cebelca.biz/)
  - A community Laravel package documents API-driven fiscalization. It registers the business premises with FURS via the API, has a test mode against the FURS test server, and uses an API token from Settings. — [Packagist: mare06xa/beez](https://packagist.org/packages/mare06xa/beez)
- **e-računi.com (E-RAČUNI d.o.o., Maribor):**
  - JSON API with methods such as `SalesInvoiceCreate` (username, MD5 password hash and token auth), plus PDF retrieval by ID. A full reference is at `e-racuni.com/obracuni/ApiDocumentation`. — [e-računi API wiki](https://e-racuni.com/WikiDoc/WikiPage-1002DAD)
  - Its free-to-install Shopify app "E-racuni ERP Slovenija" generates **fiscalized** invoices from Shopify orders. — [Shopify App Store](https://apps.shopify.com/e-racuni-slovenia)
  - Pricing was not found.
- **Space Invoices** (API-first invoicing):
  - €49/month platform fee, plus €3 per entity per month (first entity free). 100 documents per entity per month included, then €0.01–0.006 per document. Peppol €0.10 per document.
  - It advertises "real-time fiscalization", e-invoice formats and EPC QR, but **does not state Slovenian FURS or eSLOG support** on its homepage.
  - — [Space Invoices](https://spaceinvoices.com/)
- **Vasco Fakturiranje Mini:** rental €15.00 + VAT per month (undated brochure). — [Vasco brochure (PDF)](https://www.vasco.si/wp-content/uploads/ns_import/faw_mini_reklama.pdf)
- **E-invoicing mandate (ZIERDED):**
  - The National Assembly passed the Act on the exchange of electronic invoices and other electronic documents on **23 Oct 2025**. It makes **B2B e-invoices mandatory from 1 Jan 2028** for entities in the Slovenian Business Register, including s.p. — [gov.si news (23 Oct 2025)](https://www.gov.si/novice/2025-10-23-drzavni-zbor-sprejel-zakon-o-izmenjavi-elektronskih-racunov-in-drugih-elektronskih-dokumentov/)
  - The standard is **eSLOG (2.0)** or EN 16931. Paper and PDF invoices remain allowed for consumers and foreign companies. — [PwC Slovenia](https://www.pwc.com/si/sl/aktualno/Zakon-o-izmenjavi-elektronskih-racunov-in-drugih-elektronskih-dokumentov.html)
- **Fiscal verification scope:** card and similar payments count as "cash" under ZDavPR, while direct transfers to a transaction account are excluded. — [gov.si](https://www.gov.si/teme/davcni-postopek-in-davcno-potrjevanje-racunov/)
  - FURS offers a free low-volume app (manual entry) suited to fewer than 15 cash invoices per month. — [Žurnal24](https://www.zurnal24.si/uporabno/davcna-blagajna-za-spletno-trgovino-kaj-morate-vedeti-o-davkih-395540)

### Inferences
- **Recommended integration:** a Stripe webhook or "bank payment confirmed" event triggers an Edge Function or Workflow step, which calls the invoicing API (`IssuedInvoice` create plus issue/fiscalize action). The resulting invoice number, ZOI/EOR identifiers and PDF are stored in Supabase, and the PDF is emailed to the client and shown in the portal.
  - For B2B clients from 2028, the same app must deliver eSLOG e-invoices (directly or via an e-invoice exchange network).
  - For proformas and quotes, Čebelca Plus or Minimax can also generate *predračun* documents, or the factory renders its own and uses the invoicing app only for final invoices.
- To minimise fiscal complexity, steer B2B clients (most website buyers are businesses) to **bank transfer with UPN QR**. Accept cards via Stripe mainly for deposits, small add-ons and subscriptions, and always fiscalize those.
- Choosing an app: Minimax is the safest if the bookkeeper also uses it (accounting continuity), at about €13–19/month. Čebelca is the cheapest for a side business. e-računi is worth considering if client e-shops are on Shopify. Pantheon/Datalab is ERP-scale and overkill. Space Invoices is unproven for Slovenia.

### Gaps
- I could not confirm the current (2026) API endpoints for Minimax's external fiscal verification (the help page is from 2021), or whether eSLOG e-invoices can be *sent* via the Minimax API.
- Čebelca's current prices: the visible page is stale.
- e-računi.com prices and API fiscalization details were not found.
- Pantheon and other apps (e.g. "Fakturiraj") were not researched. No source was found for an app named Fakturiraj.
- The FURS position on online card payments processed by Stripe (as opposed to PayPal) should be confirmed by the tax researcher. Secondary sources conflict on PayPal.

---

## 6. Maintenance automation: dependency updates, uptime, Lighthouse/performance, backups, link checks, monthly client reports

### Takeaway
With a single multi-tenant codebase, maintenance is mostly **per-platform, not per-client**: one dependency-update bot, one CI pipeline, one backup policy. Per-client work reduces to cron jobs over the `tenants` table: uptime/SSL/domain checks, link checks, Lighthouse runs and the monthly analytics email. Monthly reports can be fully automated. The data comes from the **Vercel Web Analytics API** (Pro: $0.03 per 1k events, no included events, 12-month window) or **Plausible** (EU-hosted, cookieless, Stats API on Business). Claude Haiku writes the Slovenian summary and Resend delivers it.

### Cited Findings
- **Vercel Web Analytics (last_updated 2026-08-25):**
  - Hobby: 50k events per month included, collection pauses at the limit, 1-month window. **Pro: no included events, $0.03 per 1k events (charged against the $20 credit), 12-month reporting window, custom events with 2 properties.** Web Analytics Plus is $10/month per team for a 24-month window, 8 properties and UTM support.
  - Events are pooled across all projects in the team.
  - A "Query Web Analytics with the API" doc exists for custom reports, and there are Vercel MCP tools for web analytics.
  - — [Vercel Web Analytics pricing](https://vercel.com/docs/analytics/limits-and-pricing); [Web Analytics API](https://vercel.com/docs/analytics/web-analytics-api); [Vercel MCP web analytics tools](https://vercel.com/docs/agent-resources/vercel-mcp/tools/web-analytics)
- **Plausible (site read Oct 2026, undated):**
  - At 10k monthly pageviews: Starter $9/month (1 site), Growth $14 (up to 3 sites), Business $19 (up to 10 sites, **Stats API 600 requests/hour**). Enterprise adds the Sites API.
  - Claims "No cookie banner required" and "Made and hosted in the EU". Agency/white-label pages exist.
  - — [Plausible](https://plausible.io/)
- **Uptime monitoring:**
  - UptimeRobot's own knowledge hub quotes its current Terms as "available for any use, including commercial and business use". — [UptimeRobot: for client work](https://uptimerobot.com/knowledge-hub/monitoring/uptimerobot-for-client-work/)
  - Third-party sources say UptimeRobot restricted its free plan to non-commercial use in late 2024. **The sources conflict; check the live ToS.** — [DEV (2026)](https://dev.to/velprove/uptimerobot-commercial-use-free-alternatives-for-business-sites-in-2026-5d75)
  - Self-hosted Uptime Kuma is the usual free alternative. — [Notifier: Uptime Kuma vs UptimeRobot](https://notifier.so/guides/uptime-kuma-vs-uptimerobot/)
- **Backups:** Supabase Pro has daily backups kept 7 days (Team plan 14 days). PITR costs $100/month per 7 days of retention. — [Supabase Pricing](https://supabase.com/pricing)
- **Scheduling:** Vercel Cron on Pro allows per-minute jobs, 100 per project. — [Vercel cron](https://vercel.com/docs/cron-jobs/usage-and-pricing)
  - Vercel Workflows allow unlimited `sleep`, which suits monthly loops. — [Vercel Workflows](https://vercel.com/docs/workflows/pricing)
- **Spend safety:** Pro sends a notification at 75% of the monthly credit. Spend Management can trigger webhooks or pause projects at a set spend amount, with a $200 default notification. — [Vercel Pro Plan](https://vercel.com/docs/plans/pro-plan); [Vercel Web Analytics pricing](https://vercel.com/docs/analytics/limits-and-pricing)

### Inferences
**Maintenance stack (mostly free OSS on GitHub Actions or Vercel Cron)**
- **Renovate or Dependabot on the single renderer repo**, with grouped weekly updates, automerge for patch versions after CI passes, and manual review for Next.js and React majors. One merge updates all clients, which is the core economic advantage of multi-tenancy.
- **CI gates:**
  - Type check and unit tests.
  - Playwright visual snapshots of 5–10 representative tenants (one per template).
  - **Lighthouse CI** with performance budgets on those tenants.
  - **lychee** link checker over each live tenant's sitemap, weekly via a scheduled Action.
- **Uptime and SSL:**
  - Uptime Kuma on a small VPS, or a paid monitor if a client SLA is sold.
  - Plus a home-grown daily cron that checks each `custom_domain` DNS/SSL status through the Vercel domains API and alerts on misconfiguration, e.g. a client changing DNS by mistake.
- **Backups:**
  - Supabase daily backups, plus a nightly `pg_dump` and a Storage bucket sync to an EU object store from a GitHub Action, for off-platform copies.
  - PITR ($100/month) only once the client base justifies it.
- **Monthly client report (fully automated):**
  1. A cron on the 1st of the month iterates live tenants.
  2. It pulls pageviews, top pages, referrers and form submissions per hostname, from the Vercel WA API or Plausible Stats API plus the Supabase form table.
  3. Claude Haiku 5.5 writes a 5-sentence Slovenian summary with recommendations (cost: fractions of a cent).
  4. React-email/PDF is rendered and sent via Resend.
  5. A copy is stored in the client portal.
- **Analytics choice:** Vercel WA is cheapest inside one Vercel team, e.g. 50 sites × 2,000 pageviews = 100k events ≈ $3/month. I did not verify whether its API filters by hostname inside one multi-tenant project. Plausible is "EU-hosted, cookieless" and easier to sell, but costs scale with sites and pageviews; agency pricing was not verified.

### Gaps
- I did not verify that the Vercel Web Analytics API supports per-hostname filtering within one project. A changelog title, "split Web Analytics data by any dimension", suggests it does.
- Better Stack, Checkly and Umami free-tier terms were not verified.
- Plausible agency/white-label pricing was not fetched.

---

## 7. Feature/module catalog for Slovenian SMBs: value vs effort/support, and how to implement each

### Takeaway
The highest ROI comes from features that are **built once into the template, toggled per tenant via `modules` jsonb, and generate structured data the client edits through forms**. Examples: SEO automation, contact forms with bot protection, analytics plus a monthly report, maps/hours/click-to-call, Google reviews, menus and price lists, galleries, news, multilingual (AI-translated) content, and booking via a Cal.com embed. E-shop, memberships and AI chatbots carry the most support, legal (fiscalization, EAA, AI Act) and liability burden, so they should be priced as premium add-ons.

### Cited Findings
- **Contact forms / spam protection:**
  - Vercel BotID protects form submissions via `checkBotId()` in server actions or route handlers. Native HTML forms posting via `action`/`method` are not supported, because headers can't be attached. — [Vercel BotID: form submissions](https://vercel.com/docs/botid/form-submissions)
  - A per-route `checkLevel` of `basic` or `deepAnalysis` is configurable. — [BotID advanced configuration](https://vercel.com/docs/botid/advanced-configuration)
- **Online booking (Cal.com pricing page published 30 Oct 2026):**
  - Free: $0 for 1 user, "no usage limits", unlimited event types and calendars, email/SMS notifications, **Stripe and PayPal payments**. Teams: $12/user/month (yearly). Organizations: $28/user/month.
  - "US & EU hosting" is listed (plan not specified). A self-hosted option links to a GitHub licence file.
  - — [Cal.com pricing](https://cal.com/pricing)
- **Google reviews (Places API (New)):**
  - Review fields bill at the **Place Details Enterprise + Atmosphere** SKU. A German-language Google pricing page gives **$25 per 1,000** with **1,000 free events per month**.
  - Free usage is per SKU (10k Essentials, 5k Pro, 1k Enterprise). This **replaced the $200 monthly credit on 1 Mar 2025**. Place IDs are free.
  - — [Google Maps Platform pricing](https://developers.google.com/maps/billing-and-pricing/pricing?hl=de); [Woosmap 2026 guide](https://www.woosmap.com/blog/google-places-api-pricing); [OpenPlacesAPI](https://openplacesapi.com/blog/google-places-api-free-tier)
- **Analytics / cookie consent:**
  - Plausible claims cookieless operation with "No cookie banner required" and EU hosting. — [Plausible](https://plausible.io/)
  - Vercel WA prices are in section 6. — [Vercel WA pricing](https://vercel.com/docs/analytics/limits-and-pricing)
- **Newsletter:** Resend Marketing is free up to 1,000 contacts. Pro marketing starts at $40/month for 5k contacts. — [Resend pricing](https://resend.com/pricing)
- **E-shop / payments:**
  - Stripe Checkout and Payment Links carry no extra fee beyond processing. — [Stripe SI pricing](https://stripe.com/en-si/pricing)
  - Card sales require fiscally verified invoices. — [gov.si](https://www.gov.si/teme/davcni-postopek-in-davcno-potrjevanje-racunov/)
  - The e-računi Shopify app can fiscalize Shopify orders. — [Shopify App Store](https://apps.shopify.com/e-racuni-slovenia)
- **Accessibility (EAA):**
  - The European Accessibility Act has applied since 28 June 2025. E-commerce is a covered service. The **microenterprise exemption applies only to services**, and companies must meet both the headcount and the financial thresholds. — [Xictron (2026)](https://www.xictron.com/en/blog/accessibility-act-exemptions-microenterprises-2026/); [iubenda EAA guide](https://www.iubenda.com/en/help/179096-eaa-compliance)
- **AI chatbot:**
  - Claude Haiku 5.5 costs $0.10/$0.50 per million tokens for prompts up to 100k. — [Claude pricing](https://platform.claude.com/docs/en/about-claude/pricing)
  - AI Act transparency ("is it a bot") duties apply from 2 Aug 2026. — [Travers Smith](https://www.traverssmith.com/knowledge/knowledge-container/is-it-a-bot-eu-ai-act-transparency-rules-take-effect-2-august-2026/)
- **Memberships / login:** Supabase Auth includes 50k MAU on Free and 100k on Pro, then $0.00325 per MAU. — [Supabase Pricing](https://supabase.com/pricing)
- **Multilingual:**
  - Claude Sonnet 5.5 at $2/$10 per million tokens makes machine translation of a small site cost cents. — [Claude pricing](https://platform.claude.com/docs/en/about-claude/pricing)
  - Gemini and Imagen image costs are in section 3.

### Inferences
**Ranked catalog.** Value is for Slovenian SMBs (restaurants, tourism and accommodation, salons, trades, clinics, professional services). Effort is the one-time build. Support is the ongoing burden. Rankings are my judgement from the cited costs and constraints.

| Rank | Module | Value | Build effort | Support burden | Implementation sketch |
|---|---|---|---|---|---|
| 1 | **SEO automation** (metadata, `sitemap.ts`, `robots.ts`, hreflang, schema.org `LocalBusiness`/`Restaurant`/`FAQPage` JSON-LD, dynamic OG images) | High | Low (once) | ~0 | Generated from tenant structured data; AI writes titles/descriptions; included in every package |
| 2 | **Contact/inquiry form + spam protection + email/SMS notification** | High | Low | Low | Server action + BotID or Turnstile; submissions stored in Supabase (portal inbox) + Resend email; GDPR consent checkbox |
| 3 | **Location, hours, click-to-call/WhatsApp, map** | High | Very low | ~0 | Hours as structured data (also feeds schema.org and "open now" badge); map as click-to-load embed or static image (avoids cookies before consent) |
| 4 | **Analytics + automated monthly report** | High (perceived) | Low | ~0 | Vercel WA or Plausible + Haiku summary + Resend (section 6); a strong retention hook for the maintenance plan |
| 5 | **Google reviews widget/badge** | High (trust) | Low | Low | Daily/weekly cron fetching Place Details with review fields, cached in Supabase; ~$0.025/call beyond 1,000 free/month, so daily refresh fits ~33 clients in the free tier, weekly ~230; check Google ToS on caching/attribution |
| 6 | **Menus/price lists, services catalog** | High (hospitality, salons) | Low–Med | Low | Structured editor in portal; PDF/print view; allergen icons; schema.org `Menu`; seasonal toggles |
| 7 | **Gallery + news/blog + events** | Med–High | Low–Med | Low | Supabase Storage + Next/Image; posts with AI-assisted drafting and translation; events with schema.org `Event` and .ics export |
| 8 | **Multilingual (sl + en/de/it/hr)** | High for tourism/border regions | Med (routing, hreflang, UI strings) | Med (keeping translations synced) | Locale routing in proxy; content tables keyed by locale; "auto-translate on publish" with Claude; client reviews key pages; sell per extra language |
| 9 | **Online booking** | High (salons, therapists, tourism) | Low (Cal.com embed) / High (custom) | Med (calendar sync, no-shows) | Cal.com embed (free for 1 user; Stripe deposits) as default; custom Supabase booking only for simple slot/table reservations |
| 10 | **Cookie-consent avoidance or CMP** | Med (compliance) | Low | Low | Default to cookieless analytics and click-to-load embeds so no banner is needed; open-source consent component only when the client insists on GA/Meta Pixel |
| 11 | **Accessibility baseline (WCAG 2.1 AA) + performance budget** | Med–High (EAA for non-micro e-commerce) | Low if built into template | Low | Accessible components, contrast checks in CI, Lighthouse budgets; sell "accessibility statement + audit" as add-on |
| 12 | **Newsletter signup** | Med | Low | Low–Med | Resend Audiences (free ≤1,000 contacts) or client's existing Mailchimp/Brevo via API; double opt-in |
| 13 | **Simple e-shop / payments** (gift vouchers, deposits, small catalog) | High for some | Med–High | **High** (fiscalization, VAT, returns, EAA, stock) | Stripe Payment Links/Checkout + webhook issues fiscalized invoice via invoicing API; vouchers easiest; for real catalogs hand off to Shopify + e-računi app |
| 14 | **AI chatbot on client content** | Med (novelty) | Med | Med–High (hallucinations, liability) | pgvector in Supabase + Haiku 5.5 (~$0.80 per 1,000 chats at ~6k in/400 out tokens); mandatory "you're chatting with AI" disclosure; answer only from indexed content with handoff to contact form |
| 15 | **Members/login area** | Low–Med (niche) | Med | Med (password resets, roles) | Supabase Auth + RLS; only for clubs, courses, B2B price lists |
| 16 | **PWA** | Low | Low | Low | Manifest + icons comes nearly free with the template; low selling power |

- **Packaging logic:**
  - Items 1–4 and 10–11 belong in *every* package as "quality by default".
  - Items 5–9 and 12 are the main upsell modules, toggled per tenant with near-zero marginal effort.
  - Items 13–15 are premium and priced for their support and liability.

### Gaps
- Shopify Starter, Snipcart and Medusa pricing were not verified.
- Google's ToS on caching and display of Places reviews was not checked.
- The cookie-consent requirement for specific embeds under Slovenian ZEKom-2 belongs to the legal researcher.
- No Slovenia-specific demand data (which modules SMBs actually buy) was found.
- Slovenia's EAA transposition act details were not verified.

---

## 8. Real-world examples: solo founders and small teams running website factories or "website as a service"

### Takeaway
At scale, the multi-tenant Next.js-on-Vercel pattern is proven: Super serves 15,000+ custom domains from one project, and Vercel lists other website builders on the pattern. For solo "website as a service" businesses, the evidence is self-reported Indie Hackers stories. The most relevant is a local-SMB web design business (FLX Websites) reporting about $12k MRR after four years at about 15 hours a week with flat monthly fees including hosting. Its lessons: recurring flat fees, retention, and keeping the scope narrow. **No verified case study was found of a solo founder running a *fully automated* Next.js + Supabase website factory with real numbers.**

### Cited Findings
- **Super:** 15,000+ custom domains and 17M+ monthly page views on one Vercel project, using the Domains API and on-demand ISR. The CEO's favourite feature is connecting unlimited domains to a single project. Vercel case study, undated. — [Vercel customer story](https://vercel.com/blog/super-serves-thousands-of-domains-on-one-project-with-next-js-and-vercel)
- **Platforms named by Vercel:** Super, Typedream and Universe (website and store builders), and Hashnode and Dub (content platforms), among others. — [Vercel for Platforms](https://vercel.com/docs/platforms)
- **FLX Websites (Indie Hackers):**
  - Started in 2019, sells to small, mostly brick-and-mortar businesses in Western New York.
  - About $12k MRR after four years at roughly 15 hours a week, with flat monthly pricing where the founder covers hosting, and a $199/month entry package.
  - Self-reported. The page returned 403 to direct fetch, so the details come from the search-result summary. — [Indie Hackers: profitable web design business selling to local/regional SMBs](https://www.indiehackers.com/post/how-i-built-and-scaled-a-profitable-web-design-business-selling-to-local-regional-smbs-av2hYobWuXHlvqQyUM0v)
- **Productized design services (self-reported):**
  - One founder went from $1.5k per month to $8k MRR within a year, attributing much of the growth to **raising prices** after a few repeat customers. — [IH: $8k MRR within a year after pivoting to productized services](https://www.indiehackers.com/post/services/8k-mrr-within-a-year-after-pivoting-to-productized-services-44N8isCYNJf95AVDnefu)
  - Other IH interviews report $25k/month and $1.2M ARR productized design services, crediting retention, word of mouth, positioning and onboarding/ops efficiency. — [IH: $25k/mo productized design service](https://www.indiehackers.com/post/services/teaching-himself-to-design-and-building-a-25k-mo-productized-design-service-RhDsK436jlYHjZbGniJU); [IH: $1.2M ARR within a year](https://www.indiehackers.com/post/services/hitting-1-2m-arr-within-a-year-with-productized-design-services-RQaHrYUKBzkPoqnfMbHq)
  - An "unlimited design + Webflow" subscription claimed $5k+ MRR after 2 months. A commenter noted it was effectively a single top-tier customer, so this is a cautionary data point. — [IH: $5000+ MRR design service after 2 months](https://www.indiehackers.com/post/5000-mrr-design-service-after-2-months-d6ad38a0b9)
- **Engineering lessons from multi-tenant builders:** see section 1. Key points: protect the host-header and tenant-resolution path, enforce RLS, and start simple. — [Medium](https://medium.com/@akshaymarx08/how-i-built-a-multi-tenant-platform-serving-12-websites-from-one-codebase-4c475165f723); [DEV](https://dev.to/cybersense/what-i-learned-building-a-multi-tenant-saas-as-a-final-year-student-9ce); [DEV: Zenpage](https://dev.to/zenpage/i-built-a-multi-tenant-website-builder-with-one-nextjs-app-heres-the-architecture-35gn)

### Inferences
- The FLX data point (about $12k MRR from roughly 15 h/week with flat monthly fees) is the closest analogue to a *popoldanski s.p.* side business. It suggests that the recurring maintenance/hosting subscription, not the one-off build, is what makes a part-time web business sustainable. Automating the per-client maintenance work (section 6) is therefore as important as automating the build.
- The productized-services stories consistently say narrow scope, standardized deliverables and price increases matter more than growth hacks. That favours a small number of excellent templates with toggled modules over a general-purpose site builder.
- Survivorship bias is strong in all IH examples, and none shows churn data for very small local businesses.

### Gaps
- No verified, recent (2025–2026) case of a solo developer running an *automated* inquiry-to-live-site pipeline on Next.js + Supabase with revenue, churn and time-per-site numbers.
- No Slovenian or EU-specific examples of "website as a service" businesses and their pricing were found. That belongs with the offer/pricing researcher.
