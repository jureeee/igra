# Hosting costs, plan limits, unit economics and web performance for a one-person website factory (Vercel + Supabase), October 2026

*All sources accessed 31 Oct 2026 unless noted. Vercel and Supabase prices are in USD and exclude VAT. Hetzner and .si prices are in EUR and exclude VAT. Vercel docs pages carry their own `last_updated` dates, given inline. Some figures came from secondary sources or search summaries rather than a primary page; these are flagged where they appear.*

---

## 1. Vercel in 2026: Hobby vs Pro vs Enterprise (prices, included usage, overages, spend controls, limits, and the Hobby commercial-use ban)

### Takeaway
Vercel Hobby is explicitly **personal, non-commercial only**. Sites built for pay, sites that advertise a service, and sites hosted for a fee all count as commercial. That rules Hobby out for both sites.jurelabs.si and every client site. The minimum compliant setup is **one Pro team at $20/month**. That fee includes 1 deploying seat, a $20/month usage credit, unlimited projects and free viewer seats. Since Sept 2026 it also includes a **Flat Rate CDN** base tier (1M CDN requests + 1 TB transfer per month), with fixed-price tiers above that and spike protection. These make a portfolio of small sites cheap and predictable on Vercel.

### Cited Findings

**Commercial use on Hobby (verbatim wording)**
- Fair Use Guidelines (last_updated 2026-09-14): "**Hobby teams** are restricted to non-commercial personal use only. All commercial usage of the platform requires either a Pro or Enterprise plan. Commercial usage is defined as any Deployment that is used for the purpose of financial gain of **anyone** involved in **any part of the production** of the project, including a paid employee or consultant writing the code." The listed examples are: "Any method of requesting or processing payment from visitors of the site; Advertising the sale of a product or service; **Receiving payment to create, update, or host the site**; Affiliate linking is the primary purpose of the site; The inclusion of advertisements…". Asking for donations is not commercial. — [Vercel Fair Use Guidelines](https://vercel.com/docs/limits/fair-use-guidelines)
- Terms of Service (Last Updated October 19, 2026), Section 4: "You shall only use the Services under a Hobby plan for your personal or non-commercial use." — [Vercel Terms](https://vercel.com/legal/terms.md)
- Pricing page: "Our Hobby plan is for personal, non-commercial use." The page also says Hobby teams cannot buy additional usage. — [Vercel Pricing](https://vercel.com/pricing)
- Terms Section 12 (Usage Restrictions) prohibits sublicensing, reselling, renting, leasing or transferring the Services, and prohibits making "the Services available to any third party". The Terms do not mention agencies or building sites for clients. — [Vercel Terms](https://vercel.com/legal/terms.md)

**Plans and seats**
- Hobby costs $0 with 1 developer seat. Pro costs **$20/month**: the platform fee includes 1 deploying seat and $20/month of usage credit. Extra Owner/Member (deploying) seats cost $20/month each. **Viewer seats are free and unlimited** (read-only: analytics, Speed Insights, deployments, commenting on previews). Pro has 1 billing seat. Enterprise pricing is custom. — [Vercel Pro Plan docs (last_updated 2026-09-15)](https://vercel.com/docs/plans/pro-plan); [Vercel Pricing](https://vercel.com/pricing)
- The $20 credit applies from the first unit to all managed-infrastructure resources, expires at the end of each month, and triggers an automatic notification at 75% use. — [Vercel Pro Plan docs](https://vercel.com/docs/plans/pro-plan)
- Pro includes one free first-year domain on 16 eligible TLDs (.agency, .app, .co, .company, .dev, .digital, .info, .live, .online, .pro, .site, .space, .store, .studio, .tech, .website). Neither .si nor .com is on the list. — [Vercel Pro Plan docs](https://vercel.com/docs/plans/pro-plan)
- Pro add-ons: Password Protection $20/month per protected project; Speed Insights Plus $10/month per project + $0.65 per 10K events; Web Analytics Plus $10/month; Observability Plus $1.20 per 1M events; SAML SSO $300/month; Static IPs $100/month per project. — [Vercel Pro Plan docs](https://vercel.com/docs/plans/pro-plan)

**Flat Rate CDN (new in 2026; replaces per-GB/per-request CDN billing on Pro)**
- Announced GA on **8 Sept 2026**. It is on by default for new Pro teams; existing teams can switch in Billing settings. — [Vercel changelog](https://vercel.com/changelog/flat-rate-cdn-is-now-ga-for-pro-teams)
- Tiers: **Included with Pro: 1M CDN requests and 1 TB data transfer per month; $20/month: 10M requests and 50 TB; $100/month: 50M and 50 TB; $300/month: 150M and 50 TB.** The tier covers CDN requests, Fast Data Transfer, Blob Data Transfer, Sandbox Data Transfer and observability events from CDN requests. Capacity is shared across the whole team. "A one-day spike doesn't trigger an upgrade." If total usage over a billing cycle exceeds capacity, Vercel moves the team to a higher tier at the start of the next cycle. Usage above the top tier goes to on-demand pricing. Bulk file, media or download delivery is out of scope. — [Vercel Flat Rate CDN docs (last_updated 2026-09-14)](https://vercel.com/docs/pricing/flat-rate-cdn)
- Fast Origin Transfer is **not** in the list of resources the tier covers. It is billed separately: $0.06/GB in fra1, and Hobby includes 10 GB. — [Flat Rate CDN docs](https://vercel.com/docs/pricing/flat-rate-cdn); [fra1 pricing](https://vercel.com/docs/pricing/regional-pricing/fra1)
- **Conflict:** the summary of the pricing page gave Pro "CDN Requests 10M/month; then from $2 per 1M". The Flat Rate CDN docs, the Pro Plan docs and the changelog all say the included Pro tier is **1M** requests (10M is the $20 tier). The detailed docs (1M) are probably right. — [Vercel Pricing](https://vercel.com/pricing) vs [Flat Rate CDN docs](https://vercel.com/docs/pricing/flat-rate-cdn)
- "Edge Requests" are now called **"CDN Requests"** in pricing and docs. — [Vercel Pricing](https://vercel.com/pricing); [Regional pricing](https://vercel.com/docs/pricing/regional-pricing)

**Hobby included usage (hard limits; Hobby cannot buy more)** — [Vercel Pricing](https://vercel.com/pricing); [Fair Use Guidelines](https://vercel.com/docs/limits/fair-use-guidelines)
- Fast Data Transfer 100 GB/month; Fast Origin Transfer 10 GB; CDN Requests 1M; Function Invocations 1M; Fluid Active CPU 4 h; Provisioned Memory 360 GB-h; Image Transformations 5K; Image Cache Reads 300K; Image Cache Writes 100K; ISR Reads 1M; ISR Writes 200K; Blob storage 1 GB; Web Analytics events 50K/month; Speed Insights 10K events per team per rolling 30 days; Firewall custom rules up to 3.
- When a Hobby team goes over its Image Optimization allowance, new images fail with a **402** error. Images already cached keep working. — [Image Optimization limits & pricing (last_updated 2026-08-11)](https://vercel.com/docs/image-optimization/limits-and-pricing)

**Pro on-demand rates (global range, then Frankfurt fra1)** — [Regional pricing (last_updated 2026-09-14)](https://vercel.com/docs/pricing/regional-pricing); [fra1 pricing](https://vercel.com/docs/pricing/regional-pricing/fra1); [Fair Use Guidelines](https://vercel.com/docs/limits/fair-use-guidelines)
- Fast Data Transfer $0.15–0.35/GB (fra1 $0.15). This applies only outside Flat Rate CDN or above its top tier.
- CDN Requests $2.00–3.20 per 1M (fra1 $2.60), with the same caveat.
- Fast Origin Transfer $0.06–0.43/GB (fra1 $0.06).
- Function Invocations $0.60 per 1M. Fluid Active CPU $0.128–0.221/h (fra1 $0.184). Provisioned Memory $0.0106–0.0183/GB-h (fra1 $0.0152).
- Image Optimization: transformations $0.05–0.0812 per 1K (fra1 $0.0601); cache reads $0.40–0.64 per 1M (fra1 $0.52); cache writes $4.00–6.40 per 1M (fra1 $5.20).
- ISR reads $0.40–0.64 per 1M (fra1 $0.52); ISR writes $4.00–6.40 per 1M (fra1 $5.20). Runtime Cache reads and writes are priced the same as ISR.
- Blob storage $0.023–0.041/GB (fra1 $0.025). Web Analytics $3 per 100K events. Firewall rate-limit requests $0.50–0.80 per 1M.
- All prices are USD excluding VAT. Tax is added according to the billing address.

**Builds** — [Managing Builds (last_updated 2026-09-17)](https://vercel.com/docs/builds/managing-builds)
- Hobby always builds on the Basic machine (2 vCPU, 8 GB), which is included. New Pro teams default to **Elastic** machines (4–30 vCPU), billed **from $0.0035 per CPU-minute**. Basic on paid plans costs $0.0035/CPU-minute ($0.007 per build-minute). Example from the docs: 3 min on a 4-vCPU machine = 12 CPU-minutes.
- Concurrency: Hobby 1 concurrent deployment. Pro up to 500 with on-demand concurrency, or 3 if on-demand is off.

**General limits** — [Vercel Limits (last_updated 2026-09-16)](https://vercel.com/docs/limits)
- Projects: Hobby 200; Pro unlimited.
- Domains per project: Hobby 50; Pro unlimited (soft limit 100,000).
- Deployments per day: Hobby 100; Pro 6,000.
- Projects per Git repository: Hobby 25; Pro 150.
- Build time: 45 min. Static file uploads: Hobby 100 MB; Pro 1 GB.
- Hobby cannot connect to Git repositories owned by Git organizations.
- Runtime logs are kept 1 hour on Hobby, 1 day on Pro, 3 days on Enterprise.
- Functions: Hobby max duration 300 s and 2 GB / 1 vCPU. Pro 300 s default, 800 s max, up to 4 GB / 2 vCPU.
- Function regions: Hobby a single region, Pro 5, Enterprise all. The **default function region is iad1 (Washington, D.C.) for all new projects**. — [Configuring regions (last_updated 2026-08-11)](https://vercel.com/docs/functions/configuring-functions/region)

**Spend management** — [Spend Management (last_updated 2026-09-18)](https://vercel.com/docs/spend-management); [Pro Plan docs](https://vercel.com/docs/plans/pro-plan)
- Available on Pro, and on Enterprise with Flexible Commitment. New customers get spend notifications at a default **$200** per billing cycle.
- Alerts fire at 50%, 75% and 100% by web and email, plus SMS at 100%. A webhook can also be triggered.
- "Setting a spend amount does not stop usage on its own." You have to turn on **Pause Production Deployments**. That pauses production for **all projects** in the team (visitors get a 503). Paused projects must be resumed **one by one by hand**, and raising the budget does not unpause them.
- Spend is checked every few minutes, so pausing lags. The budget does **not** cover seats, add-ons or Marketplace integrations. Storage charges (deployment storage, Blob) continue while projects are paused.
- **Unresolved conflict:** the docs page links a changelog item titled "Spend Management now pauses production deployments by default", but the page text tells you to enable the pause switch. Check the dashboard.

**Platform pattern for many client sites**
- "Vercel for Platforms" documents two architectures. In **multi-tenant**, one codebase and one deployment serve every tenant on custom domains or subdomains; Vercel lists "website builders" as a fit. In **multi-project**, each tenant gets its own project. Domains, including automatic SSL, can be managed programmatically through the REST API or SDK. — [Vercel for Platforms (last_updated 2026-09-03)](https://vercel.com/docs/platforms)

### Inferences
- **Hobby is not an option anywhere in this business.** The definition covers "a paid … consultant writing the code" and "receiving payment to … host the site". Moving each client onto their own free Hobby account would still breach the terms. The same holds for the marketing site sites.jurelabs.si, which advertises a service. Budget at least $20/month for Vercel from the first client.
- A single Pro team with one seat is the cheapest compliant Vercel setup. Projects and domains are unlimited, and clients can be given free Viewer seats to see analytics. The fair-use text expects paid hosting on Pro ("receiving payment to … host the site"), which suggests agency-style hosting in the operator's own Pro team is the intended pattern. However, ToS §12 ("make the Services available to any third party") has not been checked by the legal researcher. Flag it for legal review, especially if clients get deploy access.
- For low-traffic brochure sites, the real limit on the included Flat Rate tier is **CDN requests (1M/month), not bandwidth (1 TB)**. The next step up is a flat $20/month for 10M requests, and spike protection means a viral day does not change the bill.
- Do **not** turn on "Pause Production Deployments" in a client portfolio: one runaway project would take every client site offline. Rely on budget alerts plus a webhook instead, together with Flat Rate CDN spike protection.
- Set every project's function region to **fra1** (the default is iad1) so functions sit next to a Frankfurt Supabase database.

### Gaps
- Enterprise prices and inclusions are not public ("Custom").
- Whether Pause Production Deployments is on by default for new teams is unclear (the changelog title and the docs text disagree).
- Whether ToS §12's resale clause limits agencies hosting client sites in their own Pro team was not settled. Pass this to legal/tax research or ask Vercel sales.
- The pricing-page figures came through an AI summary of the page. The 1M vs 10M discrepancy on included Pro CDN requests should be checked in the Vercel dashboard.

---

## 2. Supabase in 2026: Free vs Pro vs Team, compute add-ons, backups/PITR, quotas, regions, commercial use, and multi-tenant vs project-per-client

### Takeaway
Supabase Pro costs **$25/month per organization**. It includes $10 of compute credit, which covers exactly **one Micro project**. **Every additional project adds about $10/month or more of compute**, and compute is not limited by the spend cap. One multi-tenant project (a `site_id`/`tenant_id` column plus RLS) therefore costs about $25/month whether there are 5 or 100 clients. One project per client costs about $25 + $10 × (N−1). The Free plan pauses after a week of inactivity, allows 2 active projects and has no backups, so it is unsuitable for production data that paying clients depend on.

### Cited Findings
- **Plans:** Free $0; **Pro from $25/month**; **Team from $599/month**; Enterprise custom. — [Supabase Pricing](https://supabase.com/pricing)
- **Included usage, Free vs Pro/Team:**
  - Database 500 MB vs 8 GB per project
  - Egress 5 GB vs 250 GB, and cached egress 5 GB vs 250 GB
  - File storage 1 GB vs 100 GB
  - MAU 50,000 vs 100,000
  - Edge Function invocations 500K vs 2M
  - Realtime 200 vs 500 concurrent connections, and 2M vs 5M messages
  - Compute credits: none on Free, $10/month on Pro and Team
  — [Supabase Pricing](https://supabase.com/pricing)
- **Overages:** disk $0.125/GB; egress $0.09/GB; cached egress $0.03/GB; storage $0.0213/GB; MAU $0.00325; Edge Functions $2 per 1M; Realtime $10 per 1,000 connections and $2.50 per 1M messages. — [Supabase Pricing](https://supabase.com/pricing)
- **Free-tier restrictions:** "Projects are paused after 1 week of inactivity"; limit of 2 active projects (paused projects don't count); no automatic backups; 1-day log retention; 50 MB maximum upload. — [Supabase Pricing](https://supabase.com/pricing)
- **Backups:** daily backups are kept 7 days on Pro and 14 days on Team; Free has none. **PITR costs $100/month per 7 days of retention.** Log retention: Free 1 day, Pro 7, Team 28, Enterprise 90 days. SOC 2 is included only on Team and Enterprise. A custom domain costs **$10/month per domain per project**. — [Supabase Pricing](https://supabase.com/pricing)
- **Compute sizes:** Nano $0 (Free only, shared CPU, up to 0.5 GB); **Micro $0.01344/h ≈ $10/month** (1 GB, 60 direct / 200 pooler connections); Small $0.0206/h ≈ $15 (2 GB); Medium $0.0822/h ≈ $60 (4 GB); Large ≈ $110 (2 dedicated vCPU, 8 GB); XL ≈ $210. Paid plans "cannot launch Nano instances … only Micro and above". **Disk:** 8 GB gp3 included, then $0.125/GB; 3,000 IOPS included, then $0.024/IOPS. — [Supabase Compute and Disk](https://supabase.com/docs/guides/platform/compute-and-disk)
- **Billing model:** the subscription is per organization. Quotas are pooled across all projects in the org. Compute has **no quota**: "Each project you launch increases your monthly Compute costs", and for compute and custom domains "you are charged for your entire usage". — [Supabase Billing docs](https://supabase.com/docs/guides/platform/billing-on-supabase)
- **Spend cap:** Pro only. The pricing page says it is on by default. Usage covered by the cap (disk size, egress, Edge Functions, MAU, Realtime, storage, logs) is **blocked** above quota rather than billed. **Not covered:** compute (including branching and read replicas), custom domain, extra IOPS/throughput, IPv4, log drains, MFA phone, PITR. — [Supabase Cost Control](https://supabase.com/docs/guides/platform/cost-control); [Supabase Pricing](https://supabase.com/pricing)
- **EU regions:** eu-central-1 Frankfurt, eu-central-2 Zurich, eu-west-1 Ireland, eu-west-2 London, eu-west-3 Paris, eu-north-1 Stockholm. A general "Europe" choice may deploy to London or Zurich, which are outside the EU. — [Supabase Regions](https://supabase.com/docs/guides/platform/regions)
- **Commercial use on Free:** the official pricing page and docs fetched here do not address it. A Supabase GitHub community answer and 2026 third-party guides say commercial use on Free is allowed, but none quotes an official statement. — [GitHub discussion #21044](https://github.com/orgs/supabase/discussions/21044); [Jetadmin 2026 guide](https://www.jetadmin.io/blog/supabase-pricing-2026-guide-to-plans-limits-and-real-world-costs/)
- **Breaking change relevant to automated provisioning:** new tables in `public` are no longer exposed to the Data API/GraphQL automatically and need explicit GRANTs. Enforcement on all existing projects was scheduled for **2026-10-30**; existing tables keep their grants. This comes from a search summary of Supabase changelog entry #45329; the page itself was not fetched. — [Supabase changelog #45329](https://supabase.com/changelog/45329-breaking-change-tables-not-exposed-to-data-and-graphql-api-automatically); [GitHub discussion #45329](https://github.com/orgs/supabase/discussions/45329)

### Inferences
- **Cost by architecture (USD/month, compute only, assuming Micro is enough):**

  | Client sites | One multi-tenant project | One project per client |
  |---|---|---|
  | 5 | $25 | ≈ $65 |
  | 20 | $25 | ≈ $215 |
  | 50 | $25 | ≈ $515 |
  | 100 | $25 | ≈ $1,015 |

  Multi-tenant is cheaper by more than an order of magnitude. Use a separate project only for clients who need isolation (a custom app with its own auth, e-commerce, sensitive data), and charge those clients at least about €15/month on top. A $10/month custom domain or PITR adds further.
- Most brochure sites need no per-client database at all. Contact and configurator submissions can go to **one central multi-tenant table** with RLS, or be sent by email. That keeps Supabase spend flat at $25/month.
- **Free plan for production:** the 7-day inactivity pause is a real risk for low-traffic contact-form databases. A paused project means lost inquiries, and there are no backups. Free is fine for prototypes or demos. Pro ($25) is the robust baseline for anything that stores leads, including the sites.jurelabs.si configurator.
- Keep the Supabase spend cap on, but note what it does: when a quota is exhausted, features are blocked (not billed). For example, MAU or egress overruns could stop forms working until the next cycle. Compute is never capped.
- Create the project in **eu-central-1 (Frankfurt)**. That suits EU/GDPR positioning and Vercel's fra1 region. Avoid the generic "Europe" option, which can land in London or Zurich.
- The provisioning pipeline should include explicit `GRANT` statements in migrations (see the Data API change above).

### Gaps
- No official Supabase wording on commercial use of the Free plan was found.
- The IPv4 add-on price is not on the pricing page and was not verified.
- The Data API grants change was confirmed only through search summaries of the changelog, not the page itself.
- Whether the 2-active-project Free limit is per user or per org was not confirmed.

---

## 3. Alternatives and hybrids: Cloudflare (Pages/Workers + OpenNext), Netlify credits, static export to a CDN, Hetzner + Coolify/Dokploy, and when leaving Vercel makes sense

### Takeaway
At the cost floor, **static export to Cloudflare** serves static assets free and without request limits, so 100 brochure sites can cost about $0–5/month. The trade-offs are Next.js feature loss or OpenNext adapter quirks, plus more DIY work. **Netlify's credit model** charges per deploy and per GB, so cost grows roughly linearly with sites and traffic. It is not cheaper than Vercel Pro for a portfolio. **Hetzner + Coolify** is the cheapest per server (about €6–15/month) but carries the most ops work, and Hetzner raised cloud prices twice in 2026. For a time-poor solo operator, staying on Vercel Pro and building sites to be portable is the rational default.

### Cited Findings
- **Cloudflare Workers:** Free: 100,000 requests/day and 10 ms CPU per invocation. Paid: **$5/month minimum** with 10M requests/month and 30M CPU-ms included, then $0.30 per extra million requests and $0.02 per extra million CPU-ms. "**Requests to static assets are free and unlimited.**" Free tiers: KV 100K reads/day and 1 GB; D1 5M rows read/day, 100K rows written/day, 5 GB; R2 10 GB-month with free egress. — [Cloudflare Workers pricing (last updated Oct 2, 2026)](https://developers.cloudflare.com/workers/platform/pricing/)
- **Cloudflare Pages Free:** 500 builds/month, 1 concurrent build, 100 custom domains per project, 20,000 files per site, 25 MiB maximum file size, **100 projects per account**. Pages Functions requests count toward the Workers quota. — [Cloudflare Pages limits (last updated Sep 5, 2026)](https://developers.cloudflare.com/pages/platform/limits/)
- **OpenNext Cloudflare adapter** supports Next.js 16 (all minors) and the latest 15 and 14 minors, with 14 dropped in Q1 2026. Supported: App Router, Route Handlers, SSG, SSR, ISR, middleware, PPR, `'use cache'`, Turbopack, and image optimization (which requires Cloudflare Images). **Not supported:** Node Middleware (introduced in Next.js 15.2). The Worker size limit is **3 MiB on Free and 10 MiB on Paid** (compressed). — [OpenNext Cloudflare](https://opennext.js.org/cloudflare)
- Next.js 16.2 (Mar 2026) introduced a **stable Adapter API**, a public adapter test suite and a cross-platform working group. — [Next.js blog: Next.js Across Platforms (2026-03-25)](https://nextjs.org/blog)
- **Static export** (`output: 'export'`) can be hosted "on any web server that can serve HTML/CSS/JS static assets". It does not support: ISR, Image Optimization with the default loader (a custom loader such as Cloudinary works), redirects, rewrites, headers, Proxy (middleware), cookies, Server Actions, Draft Mode, or dynamic routes without `generateStaticParams`. — [Next.js Static Exports (lastUpdated 2026-08-09)](https://nextjs.org/docs/app/guides/static-exports)
- **Netlify:** Free $0 (300 credits); Personal $9/month (1,000 credits); **Pro $20/month with unlimited members (3,000 credits)**; Enterprise custom. Credit costs: **production deploy 15 credits; bandwidth 20 credits/GB; web requests 2 credits per 10K; compute 10 credits/GB-hour**. Auto-recharge packs: Personal +500 credits for $5, Pro +1,500 for $10. The pricing page does not say what happens when credits run out or whether Free allows commercial use. — [Netlify Pricing](https://www.netlify.com/pricing/)
- According to third-party guides, when Free credits run out **all sites on the team are paused** ("Site not available") until the cycle resets. Netlify's forum has many 2026 reports of free teams staying paused or blocked despite showing remaining credits. Third-party sources say Netlify Free allows commercial use. — [netli.fyi guide](https://netli.fyi/blog/netlify-free-plan-limits-2026); [Netlify forum example](https://answers.netlify.com/t/free-plan-renewed-to-300-300-credits-but-team-site-remains-paused/170585); [agentdeals comparison](https://agentdeals.dev/vercel-vs-netlify)
- **Hetzner Cloud price adjustment, effective 15 June 2026, 08:00 CEST** (Germany/Finland, EUR/month, excl. VAT and IPv4): **CX23 €5.49; CX33 €8.49; CAX11 €5.99; CAX21 €10.49; CPX22 €19.49.** Orders placed before 15 June but delivered after it get "the previous prices". The page does not say existing servers are repriced automatically, but "certain changes to servers with legacy pricing may trigger a switch to the current pricing". — [Hetzner price adjustment docs](https://docs.hetzner.com/general/infrastructure-and-availability/price-adjustment/)
- Secondary sources report an earlier **1 April 2026** increase as well (CPX22 €5.99 → €7.99, then €19.49 in June; CX23 €3.99 → €5.49). The CX line has been intermittently "not available". Hetzner's own cloud page shows "Cost-Optimized from €5.99/month" marked "Currently not available" and "Regular Performance from €6.49/month". — [WZ-IT](https://wz-it.com/en/blog/hetzner-price-increase-june-2026-cpx-ccx-alternatives/); [Capital & Compute](https://capitalandcompute.net/blog/hetzner-price-increase-2026/); [Hetzner Cloud](https://www.hetzner.com/cloud/)
- **Coolify:** self-hosted is "Free forever". **Coolify Cloud costs $5/month base (connects 2 servers) plus $3/month per additional server**, with 20% off annually. You bring your own servers. — [Coolify Pricing](https://coolify.io/pricing/)
- **Patch cadence (ops burden on any platform):**
  - Next.js moved to a formal security release process in July 2026. Scheduled releases: July 20, Aug 25 and Sept 30, with Nov 3 announced.
  - Out-of-band updates: Sept 22 ("critical upstream issue") and **Oct 14, 2026** ("two Critical and one High severity vulnerabilities in upstream dependencies").
  - Earlier, a critical React Server Components CVE was published on 3 Dec 2025 (CVE-2025-66478).
  — [Next.js blog index](https://nextjs.org/blog)

### Inferences
- **Rough monthly platform cost for 100 low-traffic brochure sites** (excluding the operator's time). Assumptions are the same as in Section 5: about 6M CDN requests and 300 GB per month across 100 sites, and 4 production deploys per site per month.

  | Platform | Estimate (USD/month) | Basis |
  |---|---|---|
  | Vercel Pro | ≈ $40–140 | $20 platform fee + $20 or $100 Flat Rate tier, usage largely inside the credit |
  | Cloudflare (static export) | ≈ $0–5 | Static asset requests are free; Pages caps at 100 projects/account and 500 builds/month, so 100 sites would need Workers static assets or a multi-tenant build |
  | Netlify Pro | ≈ $90 | Deploys 100 × 4 × 15 = 6,000 credits; bandwidth 300 GB × 20 = 6,000; requests 6M/10K × 2 = 1,200. Total ≈ 13,200 credits = 3,000 included + 7 packs × $10 |
  | Hetzner CX33 + Coolify | ≈ €9–15 | Plus IPv4 and backups, plus significant ops time |

  These are estimates built on unsourced traffic assumptions. Measure real usage before deciding.
- **Ops burden ranking, least to most:** Vercel (Git push, previews, CDN, TLS, logs, spend alerts) < Netlify < Cloudflare + OpenNext (adapter caveats, image service setup, Worker size limits) < static export to a CDN (no ISR, redirects, headers or forms without extra services) < Hetzner + Coolify (OS and Docker patching, backups, TLS, DDoS exposure, capacity planning, and Hetzner's 2026 price swings). The monthly-plus-out-of-band Next.js security cadence applies everywhere. Self-hosting adds OS and runtime patching on top.
- **When leaving Vercel makes sense:**
  - the Vercel bill is persistently more than about $150–300/month, mostly CDN tiers or usage, **and** the sites are effectively static;
  - a client needs bulk media or download delivery, which is out of scope for Flat Rate CDN;
  - EU-only hosting becomes a hard client requirement (Vercel's CDN is global; this is a legal question);
  - or the operator has spare ops time.

  Until then, keep sites **portable**: Cache Components with `ensureStatic`, so they can be statically exported; no Vercel-only APIs; images either pre-optimized or behind a configurable loader. A migration then becomes a configuration change.
- A **hybrid** is reasonable: keep the factory app and dynamic clients on Vercel Pro, and move very high-traffic but static client sites to Cloudflare static hosting if they would push the team into a higher Flat Rate tier.

### Gaps
- Cloudflare's free-plan terms (Self-Serve Subscription Agreement) were not reviewed. No non-commercial restriction appears on the pricing or limits pages fetched, but no explicit "commercial use allowed" statement was found either.
- Netlify's official terms on commercial use of Free and on credit exhaustion were not found; only secondary and forum sources were.
- Hetzner server specs (vCPU/RAM/disk), the IPv4 price, and the €5.49 vs €5.99 discrepancy (possibly the €5.99 includes IPv4) were not verified.
- Dokploy pricing and Cloudflare Images pricing were not checked.
- No independent 2025–2026 "real bill" case studies for agencies hosting many small sites on Vercel were found.

---

## 4. Other recurring costs per client: domains, transactional email, uptime monitoring, analytics, error tracking, CMS seats — and which free tiers explicitly allow commercial use

### Takeaway
Beyond hosting, the only unavoidable per-client cost is the **domain**. The .si registry charges registrars €10/year (excl. VAT), and retail is roughly €10–25/year. Monitoring, error tracking, email and CMS can all start on free tiers. Among the free tiers checked, **only UptimeRobot explicitly allows commercial use**, and only in its current pricing text; its help center still contradicts this. Vercel Hobby explicitly forbids it, and the others are silent.

### Cited Findings
- **.si registry fee:** "The price for registering and renewing a .si domain will be **10 EUR**." It had been 8 EUR since 2015 and returned to 10 EUR "as of 1 January 2023", citing cost increases and new obligations including NIS2. The tariff is for registrars only, so retail prices vary by registrar. — [Register.si announcement](https://register.si/en/?p=4482)
- **.si retail examples (international registrars, 2026 snapshots):** Dynadot $12.33 first year / $13.83 renewal; Hostinger $11.99 / $16.99 renewal (per Cybernews); Hosting.com $14.99 first year / $23.99 renewal (per a Polish guide); OVHcloud 44.35 PLN net registration / 68.69 PLN net renewal. — [Dynadot .si](https://www.dynadot.com/sr/domain/si); [Cybernews .si registrars](https://cybernews.com/best-domain-registrars/best-si-domain-registrars/); [DNS Robot (PL) .si guide](https://dnsrobot.net/pl/blog/si-domain); [OVHcloud .si](https://www.ovhcloud.com/pl/domains/tld/si/)
- **.com:** Cloudflare Registrar sells at cost, with renewal about **$10.46/year**. Verisign is reportedly raising the .com wholesale price from $10.26 to **$10.97 from 1 Nov 2026**. Both figures come from secondary aggregators. — [domainoffer.net](https://domainoffer.net/tld/com/cloudflare); [costgoat.com](https://costgoat.com/compare/domains)
- **Uptime monitoring, UptimeRobot:** Free plan has **50 monitors at a 5-minute interval** and is "Good for personal and commercial projects". Solo is $12/month (annual): 10 monitors at 60 s. **Team is $33/month (annual): 100 monitors at 30 s.** — [UptimeRobot Pricing](https://uptimerobot.com/pricing/)
  - **Conflict:** from Dec 2024 the terms made Free non-commercial, and a help-center article still says so. A May 2026 terms update reportedly allows any use on all plans. — [UptimeRobot help article](https://help.uptimerobot.com/en/articles/11604710-who-is-uptimerobot-s-free-plan-for); [Host-tracker analysis](https://www.host-tracker.com/en/blog/uptimerobot-alternative)
- **Error tracking, Sentry Developer (Free):** 1 user, 5K errors, 5M spans, 50 replays, 1 cron monitor, 1 uptime monitor, 30-day lookback. Described as "For solo devs working on small projects", with no commercial restriction stated. Team costs $29/month monthly or $26/month annually. — [Sentry Pricing](https://sentry.io/pricing/)
- **Transactional email, Resend Free:** 3,000 emails/month with a **100/day** limit, 3 domains, 30-day retention. Pro is $20/month for 50K emails ($35 for 100K). Nothing is said about commercial use. — [Resend Pricing](https://resend.com/pricing)
- **Analytics:** Vercel Web Analytics gives Hobby 50K events/month; Pro pays **$3 per 100K events** from the credit; Web Analytics Plus is $10/month. Vercel Speed Insights (real-user monitoring) gives 10K events per team per rolling 30 days free; Plus costs $10/project/month + $0.65 per 10K events. — [Vercel Pricing](https://vercel.com/pricing); [Pro Plan docs](https://vercel.com/docs/plans/pro-plan)
  - Plausible starts at about $9 (or €9) per month for 10K pageviews, according to secondary sources; the official EUR price was not confirmed. — [PricePulse](https://www.getpricepulse.com/companies/plausible-pricing.html); [Seline](https://seline.com/blog/plausible-analytics-pricing)
- **CMS seats, Sanity Free:** up to **20 user seats**, 2 datasets (public only), 250K API requests, 1M API CDN requests, 10K documents, 100 GB assets, 100 GB bandwidth. Growth costs $15 per seat per month. Commercial use is not stated. — [Sanity Pricing](https://www.sanity.io/pricing)

### Inferences
- **Domains:** about €0.85–2/month per client. Re-bill them, or bundle them visibly into the package. Since the registry fee is €10 excluding VAT, a Slovenian registrar should price close to €10–20/year. Transfers and DNS are best handled at one registrar (or Cloudflare DNS) for automation.
- **Free tiers that fit a 5–50 site portfolio:**
  - UptimeRobot Free covers 50 monitors, so it runs out at about 50 sites; at 100 sites, Team costs $33.
  - Sentry Developer allows only 1 user and 5K errors, which is enough when sites are mostly static.
  - Resend Free's 100/day limit is fine for inquiry forms; above about 3K emails/month, Pro costs $20.
  - Sanity Free is per project with 20 seats, so each client can get their own.
- **Vercel Web Analytics on every client site costs about $0.18/site/month** at 6K pageviews. That is cheap per site but adds up (about $18/month at 100 sites). It is a natural paid add-on.
- **Vercel Speed Insights Plus at $10/project/month** is too expensive to include per client by default. Use lab-based verification instead (Section 6).
- **Explicit commercial-use status of the free tiers checked:**
  - Vercel Hobby: **no** (explicit).
  - UptimeRobot Free: **yes** (pricing page, with the conflict noted above).
  - Supabase Free, Netlify Free, Cloudflare Free, Sentry Developer, Resend Free, Sanity Free: **not stated** on the official pages checked. Secondary sources say yes for Supabase and Netlify.

### Gaps
- Current .si retail prices at Slovenian registrars (e.g., Domenca, Neoserv, Hostko, Domovanje) were not verified. Only the registry fee and international registrars were confirmed.
- EU-based email providers (Brevo, Mailjet, Scaleway TEM), Cloudflare Web Analytics, Umami, Better Stack, Payload, Decap, TinaCMS and Storyblok were not verified this session.
- No USD→EUR rate was verified for October 2026. Apply the current ECB rate.

---

## 5. Unit economics: monthly infrastructure cost per client site at 5, 20, 50 and 100 sites, and what maintenance/hosting fee yields healthy margins

### Takeaway
With one Vercel Pro team ($20) and one multi-tenant Supabase Pro project ($25), the platform cost is **mostly fixed at about $45/month**. Per site, that is about **$9 at 5 sites, about $2–3 at 20, about $1.3–1.7 at 50, and about $1.4–2.5 at 100** (including paid monitoring and email tiers at 100), plus about €1–2/month for the domain. Infrastructure is therefore a minor cost. The real cost driver of a €15–35/month hosting and maintenance fee is the **operator's time** (patching, client changes, support).

### Cited Findings
- Vercel Pro is $20/month including a $20 usage credit, plus Flat Rate CDN with 1M requests and 1 TB included; the $20 tier gives 10M requests, the $100 tier 50M. — [Vercel Pro Plan docs](https://vercel.com/docs/plans/pro-plan); [Flat Rate CDN docs](https://vercel.com/docs/pricing/flat-rate-cdn)
- Elastic builds cost from $0.0035 per CPU-minute. — [Managing Builds](https://vercel.com/docs/builds/managing-builds)
- Image transformations cost $0.0601 per 1K and cache writes $5.20 per 1M in fra1. Functions cost $0.60 per 1M invocations and $0.184 per Active-CPU hour in fra1. — [fra1 pricing](https://vercel.com/docs/pricing/regional-pricing/fra1)
- Supabase Pro is $25/month with a $10 compute credit; Micro is about $10/month per extra project. — [Supabase Pricing](https://supabase.com/pricing); [Compute and Disk](https://supabase.com/docs/guides/platform/compute-and-disk)
- UptimeRobot Free covers 50 monitors and Team $33 covers 100. Resend Free covers 3K emails/month and Pro is $20. Sentry Developer is free and Team is $29. — [UptimeRobot](https://uptimerobot.com/pricing/); [Resend](https://resend.com/pricing); [Sentry](https://sentry.io/pricing/)
- The .si registry fee is €10 per year excluding VAT. — [Register.si](https://register.si/en/?p=4482)

### Inferences

**Model assumptions.** These are not sourced; measure them on the first real client sites with the Vercel usage dashboard or `vercel usage`.
- A1: an average client gets 3K visits/month (range 1K–20K) at 2 pageviews per visit, so 6K pageviews/month.
- A2: each pageview costs about 10 CDN requests (range 6–20, depending on images, JS chunks and link prefetching) and about 0.5 MB of transfer.
- A3: pages are static (Cache Components with `ensureStatic`, or SSG). The only function is the contact form, at about 100 invocations per site per month.
- A4: in a multi-project setup, 8 builds per site per month, each about 1.5 min on a 4-vCPU machine (6 CPU-min, about $0.021 per build), so about $0.17 per site per month. In a multi-tenant single project, builds are near zero per site.
- A5: about 300 image transformations per site per month, about $0.03 per site.
- A6: Web Analytics is optional, at about $0.18 per site per month.

**Per-site usage:** about 60K CDN requests and 3 GB of transfer per month. CDN requests, not bandwidth, decide the tier.

**Portfolio cost (USD/month, excl. VAT, excl. domains):**

| Sites | CDN requests / transfer | Vercel | Supabase (1 multi-tenant project) | Monitoring / email / errors | **Total** | **Per site** |
|---|---|---|---|---|---|---|
| 5 | 0.3M / 15 GB | $20 (fits the included tier and the credit) | $25 | $0 | **≈ $45** | **≈ $9.0** |
| 20 | 1.2M / 60 GB | $20–40 (moves to the $20 tier if consistently above 1M) | $25 | $0 | **≈ $45–65** | **≈ $2.3–3.3** |
| 50 | 3M / 150 GB | ≈ $40 ($20 tier; builds, images and analytics ≈ $19, inside the credit) | $25 | $0 (UptimeRobot Free at its 50-monitor cap); Resend +$20 if over 3K emails | **≈ $65–85** | **≈ $1.3–1.7** |
| 100 | 6M / 300 GB (12M at 20 req/pageview) | ≈ $58 ($20 + $20 tier + ≈$18 usage above the credit), or ≈ $138 on the $100 tier | $25 | UptimeRobot Team $33 + Resend Pro $20 (+ Sentry Team $29 optional) | **≈ $136–245** | **≈ $1.4–2.5** |

- **Project-per-client variant on Supabase:** add about $10 per client per month (Section 2). At 100 clients, Supabase alone is about $1,015/month, so per-site cost rises to about $11–13. Reserve this for clients who pay for an "app" tier.
- **Domains:** add about €1–2 per site per month if they are included in the fee.
- In EUR, the totals are roughly the USD figures times 0.85–0.95. This is an unverified range; use the current ECB rate. Slovenian VAT treatment of these foreign SaaS invoices belongs to the legal/tax research.
- **Fee guidance from an infrastructure angle:**
  - A hosting and maintenance fee of **€15–20/month** already gives about 85–95% gross margin on infrastructure from 20 sites up, and covers the first-year fixed costs at 3–5 clients.
  - Because infrastructure is so cheap, price for **time and risk**: security patching about monthly for every site, uptime monitoring, backups, small content edits. A **€25–35/month** maintenance tier that includes a capped amount of edits (for example 30 min/month) is defensible.
  - Analytics, Speed Insights Plus, a dedicated Supabase project, password protection ($20/project/month on Vercel) and extra domains should be **paid add-ons**, because each has a clear per-project marginal cost.
- **Break-even of the fixed costs:** $45/month is covered by 2–3 clients at €20/month. From about 10 clients upward, infrastructure is under 15% of maintenance revenue.

### Gaps
- No measured request or transfer profile for a real Next.js 16.4 marketing site on Vercel was found. A1–A6 need validation in the first month.
- No independent 2026 agency bills were found to cross-check these estimates.
- How Vercel's image cache keys behave across redeploys of local images (which affects transformation counts) was not verified.

---

## 6. Web performance: Core Web Vitals thresholds and Google's use, Next.js 16.4 best practices for marketing sites, third-party scripts, and whether "100/100 Lighthouse" is a sellable guarantee (and how to verify it automatically)

### Takeaway
Sell **"Core Web Vitals in the green, Lighthouse mobile performance ≥ 90, verified automatically at handover and on every deploy"**, not "100/100". Google's own Lighthouse docs say a 100 score "is extremely challenging to achieve and not expected" and that scores fluctuate between runs. "Fast" is still a credible differentiator: only **about 48% of mobile origins pass all three Core Web Vitals** (2025 Web Almanac). Next.js 16.4 (Oct 2026) gives a clear static-first recipe: Cache Components plus `ensureStatic`, next/font, next/image or pre-optimized images, and minimal, deferred third-party scripts.

### Cited Findings

**Thresholds and Google's use**
- Good thresholds: **LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1**, measured at the **75th percentile** of page loads and segmented by mobile and desktop. A page passes if all three meet the target at p75. — [web.dev Web Vitals (last updated Oct 31, 2024)](https://web.dev/articles/vitals)
- Google Search Central: "We highly recommend site owners achieve good Core Web Vitals for success with Search". Page experience "aligns with what our core ranking systems seek to reward." The page gives the same thresholds. — [Google Search Central: Core Web Vitals (updated 2025-12-10)](https://developers.google.com/search/docs/appearance/core-web-vitals)
- **2025 Web Almanac:** 48% of mobile origins and 56% of desktop origins pass all three CWV (July 2025 CrUX), up from 44% mobile in 2024. LCP is the main bottleneck (about 62% of mobile origins pass LCP, according to secondary summaries). — [Web Almanac 2025 Performance](https://almanac.httparchive.org/en/2025/performance); [shno.co summary](https://www.shno.co/marketing-statistics/technical-seo-statistics)

**Lighthouse scoring and variability**
- The performance score is a weighted average: **TBT 30%, LCP 25%, CLS 25%, FCP 10%, Speed Index 10%**. 90–100 is "Good". "A 'perfect' score of 100 is extremely challenging to achieve and not expected." "Taking a score from 99 to 100 needs about the same amount of metric improvement that would take a 90 to 94." Variability comes from A/B tests, ads, network routing, devices, extensions and antivirus, so the docs suggest treating performance "as a distribution of scores". — [Chrome: Lighthouse performance scoring](https://developer.chrome.com/docs/lighthouse/performance/performance-scoring)
- **Field data availability:** to appear in CrUX, an origin or page must be publicly discoverable and "sufficiently popular". The minimum visitor count "is not disclosed", sites below it are excluded, and inclusion cannot be requested. — [CrUX methodology (updated 2024-06-20)](https://developer.chrome.com/docs/crux/methodology)
- **PageSpeed Insights API:** works with or without a key ("a key is recommended for frequent, automated queries"). It returns Lighthouse lab data and CrUX field data, but Google says "We plan to discontinue including real-world data from the Chrome User Experience Report in this API." — [PSI API Get Started (updated 2025-08-28)](https://developers.google.com/speed/docs/insights/v5/get-started)
- Vercel Speed Insights (real-user monitoring) is free up to 10K events per team per rolling 30 days on Hobby and Pro. Plus costs $10/project/month + $0.65 per 10K events. — [Vercel Pricing](https://vercel.com/pricing)

**Next.js in October 2026**
- The current release is **Next.js 16.4 (6 Oct 2026)**, shipping React 19.3. "Starting with Next.js 16.4, we're excited to recommend **Cache Components** as the best choice for every Next.js app." New `create-next-app` apps enable it by default, and it "will become the default in Next.js 17". — [Next.js 16.4 blog](https://nextjs.org/blog/next-16-4)
- **`export const ensureStatic = 'navigation'`** in the root layout makes the build fail if any dynamic content enters a route, which "guarantee[s] that every page navigation in your site is static". Next.js recommends it "for optimized sites like ecommerce stores, marketing pages, or blogs" to "avoid unintentional compute and keep … server costs down". — [Next.js 16.4 blog](https://nextjs.org/blog/next-16-4)
- 16.4 also ships smaller production bundles (shorter CSS Module class names, export mangling, a shared Turbopack runtime chunk), a bundle analyzer, and a `next-bundle-optimizer` agent skill. `next upgrade --agent` handles upgrades, and `experimental.agentUpgrade` (default policy `'security'`) reminds you about vulnerable versions. — [Next.js 16.4 blog](https://nextjs.org/blog/next-16-4); [Next.js blog index](https://nextjs.org/blog)
- **next/font:** "automatically optimizes your fonts and removes external network requests". Fonts are self-hosted "with no layout shift". For Google Fonts, "no requests are sent to Google by the browser". — [Next.js Font Optimization (lastUpdated 2026-05-27)](https://nextjs.org/docs/app/getting-started/fonts)
- **next/image on Vercel:** transformations are billed on every cache MISS or STALE; cache reads and writes are billed in 8 KB units; Fast Data Transfer and CDN requests are billed on top. Source images are limited to 8192 px and to jpeg, png, webp or avif; other formats are served as-is. — [Vercel Image Optimization limits & pricing](https://vercel.com/docs/image-optimization/limits-and-pricing)
- **Third-party scripts (`next/script` strategies):**
  - `beforeInteractive` is for critical scripts; the docs list "Cookie consent managers" and "Bot detectors".
  - `afterInteractive` is the default, for "Tag managers" and "Analytics".
  - `lazyOnload` loads during browser idle time, for "Chat support plugins" and "Social media widgets".
  - `worker` (Partytown) "is not yet stable and does not yet work with the App Router".
  — [Next.js Script component (lastUpdated 2026-08-21)](https://nextjs.org/docs/app/api-reference/components/script)
- **`@next/third-parties`** (experimental): `GoogleTagManager` and `GoogleAnalytics` load after hydration; `GoogleMapsEmbed` lazy-loads below the fold by default; `YouTubeEmbed` uses `lite-youtube-embed`. — [Next.js third-party libraries guide (lastUpdated 2026-06-01)](https://nextjs.org/docs/app/guides/third-party-libraries)
- Vercel caches all static content on its CDN by default, serving it from the region nearest the visitor. — [Vercel: Configuring regions](https://vercel.com/docs/functions/configuring-functions/region)

### Inferences

**Performance checklist for every factory site**
1. Use the Next.js 16.4 template with `cacheComponents: true`, `'use cache'` with `cacheLife` on content fetches, and **`ensureStatic = 'navigation'` in the root layout**. Every page is then CDN-served HTML: no per-request function cost, low TTFB, and a cheap Vercel bill. Make content updates trigger a rebuild or on-demand revalidation rather than request-time rendering.
2. **Images:**
   - Set explicit `width`/`height` (or `fill` with sized containers) to protect CLS.
   - Set `priority` (or fetchPriority) on the LCP hero image only, and lazy-load everything else.
   - Use AVIF or WebP, and cap `deviceSizes` and `qualities` to limit transformation counts.
   - Alternatively, pre-optimize at build time and serve static files. This also keeps the site portable to static export.
3. **Fonts:** use `next/font` (self-hosted, no layout shift, no Google requests, which also helps GDPR). Prefer one variable font and the `latin-ext` subset for Slovenian diacritics.
4. **JavaScript budget:** default to Server Components and keep `'use client'` islands small (forms, menu toggle). Check every release with the 16.4 bundle analyzer. Avoid heavy UI kits, animation libraries and carousels above the fold, because TBT is 30% of the Lighthouse score.
5. **Third parties**, the most common reason sites miss CWV:
   - Prefer a first-party, cookieless analytics option over GTM or GA4, so the cookie banner can often be avoided (consent law is the legal researcher's area).
   - Load chat widgets `lazyOnload`, or better behind a click.
   - Use a click-to-load static map image instead of an interactive Google Map, or `GoogleMapsEmbed` lazy-loaded.
   - Use `YouTubeEmbed` (lite) for video.
   - Keep any cookie-consent script small, since Next.js recommends loading it `beforeInteractive`, which puts it on the critical path.
6. **Caching and region:** static assets get long-lived immutable caching by default. Put functions (forms) in fra1 next to Supabase.

**What to sell and how to verify it**
- Sell a **measurable SLA** rather than "100/100": "Lighthouse mobile performance ≥ 90 (median of 5 runs) and lab LCP < 2.5 s, CLS < 0.1, TBT < 200 ms at launch, re-checked on every deploy." A 100 can be advertised for showcase pages but should not be contractual.
- Most small-business sites **will not have CrUX field data**, because the popularity threshold is undisclosed. Field-data guarantees cannot be verified through PSI or Search Console for them, so lab tests are the only scalable proof. For the few sites that do have CrUX data, add Search Console's CWV report.
- **Automation:**
  - Run **Lighthouse CI** in GitHub Actions against each Vercel preview URL, with performance assertions (for example ≥ 0.9) and multiple runs to absorb variance. Block promotion on failure.
  - Run a weekly scheduled PSI API job (with an API key) across all production domains, posting to email or Slack.
  - Optionally enable Vercel Speed Insights (free 10K events per team) on the agency's own site as a showcase. Do not enable it per client unless paid ($10/project).

### Gaps
- The "needs improvement" and "poor" CWV boundaries (commonly cited as LCP > 4 s, INP > 500 ms, CLS > 0.25 for poor) were not in the fetched text, which shows them only in images.
- Lighthouse CI documentation and the PSI API quota numbers were not fetched; the quota is not stated on the Get Started page.
- The per-metric Web Almanac 2025 figures came from secondary summaries.
- No source quantified the impact of particular cookie banners or chat widgets on INP/LCP in 2026.

---

## 7. Supabase performance: indexing, RLS best practices, connection pooling (Supavisor), Data API vs direct connections from Vercel Functions, and region co-location (Frankfurt)

### Takeaway
For a multi-tenant factory database:
- **Index every column RLS policies filter on** (e.g., `tenant_id`/`site_id`, `user_id`).
- **Wrap `auth.uid()` and similar functions in `(select …)`**, scope policies `TO authenticated` or `TO anon`, and add explicit filters in queries.
- Prefer the **Data API (supabase-js over HTTPS)** from Vercel functions. Where a Postgres driver is needed, use the **transaction-mode pooler on port 6543** with prepared statements disabled.
- Put Supabase in **eu-central-1 (Frankfurt)** and Vercel functions in **fra1**. Vercel's default is iad1 in the USA, which would add a transatlantic round trip to every query.

### Cited Findings
- RLS guidance: "Add an index on every column your policies filter on". "A column counts as indexed only when it comes first in a btree index". Wrapping functions in `select` makes Postgres run an `initPlan`; this is valid only if the result does not depend on row data. `TO authenticated` stops evaluation for `anon` users. — [Supabase RLS docs](https://supabase.com/docs/guides/database/postgres/row-level-security)
- **Benchmarks** (Supabase test on a 100K-row table, via search summary):
  - Unwrapped `auth.uid()` took about **179 ms**; `(select auth.uid())` took about **9 ms**.
  - Indexing the policy column cut about **171 ms to under 0.1 ms**.
  - A wrapped helper function with a join went from about **11,000 ms to 7 ms**.
  - Separately, adding an explicit `.eq()` filter in the client cut 171 ms to about 9 ms (secondary source).
  — [Supabase RLS Performance and Best Practices](https://supabase.com/docs/guides/troubleshooting/rls-performance-and-best-practices-Z5Jjwv); [Axonbuild (secondary)](https://axonbuild.com/blog/supabase-rls-performance/)
- **Connection methods:**
  - **Data API** (REST/GraphQL) needs no Postgres client, but tables need RLS ("RLS with no policies denies every request").
  - **Direct connection** (5432) is for persistent backends, "Not for serverless".
  - **Shared pooler, session mode** (5432) is an IPv4 alternative for persistent backends.
  - **Shared pooler, transaction mode (6543)** is for serverless and edge functions, which "open many short-lived connections".
  - **Dedicated pooler** is for Pro and above, transaction mode only.
  - For serverless: create the client once at module scope, use a pool of 1, disable prepared statements (e.g., `prepare: false` in Postgres.js and Drizzle), and set SSL to `require`.
  - Direct connections are IPv6 on Free and Pro unless the IPv4 add-on is bought. "The shared pooler is IPv4-only on every plan."
  — [Supabase: Connecting to Postgres](https://supabase.com/docs/guides/database/connecting-to-postgres)
- Micro compute allows 60 direct and 200 pooler connections; Small allows 90 and 400. — [Supabase Compute and Disk](https://supabase.com/docs/guides/platform/compute-and-disk)
- Vercel: "By default, Vercel Functions execute in Washington, D.C., USA (iad1) for all new projects". Vercel recommends running functions "close to your data source (such as your database)" and warns that "choosing regions far from those services increases latency". Hobby is limited to a single region. — [Vercel: Configuring regions](https://vercel.com/docs/functions/configuring-functions/region)
- In fra1, Active CPU costs $0.184/h vs $0.128/h at the cheapest US rate, and CDN requests $2.60 vs $2.00 per 1M (fra1 vs the low end of the global range). — [fra1 pricing](https://vercel.com/docs/pricing/regional-pricing/fra1); [Regional pricing](https://vercel.com/docs/pricing/regional-pricing)

### Inferences
- **Multi-tenant schema pattern:**
  - Every tenant-scoped table has `tenant_id` (or `site_id`) indexed as the leading column of a btree index (or composite `(tenant_id, created_at)`).
  - Policies are written as `using (tenant_id = (select app.current_tenant()))`, or for user-owned rows `user_id = (select auth.uid())`, and scoped `TO authenticated`.
  - Public inserts from contact forms go through a narrow `TO anon` insert-only policy, or better through a server-side route using a service role kept only on the server.
  - Queries always add `.eq('tenant_id', …)` even though RLS would filter anyway.
- **Vercel to Supabase:** for low-volume form writes and configurator reads, supabase-js over HTTPS (the Data API) avoids connection-pool exhaustion entirely. If an ORM such as Drizzle or Prisma is used, connect to the 6543 transaction pooler (IPv4, works from Vercel) with prepared statements off. Never use the direct 5432 connection from serverless functions.
- **Region:** Supabase eu-central-1 plus Vercel fra1 keeps database round trips within Frankfurt, while the CDN serves static pages from the edge. The higher fra1 unit prices are irrelevant at this scale (a few cents a month). Set `"regions": ["fra1"]` in the shared template's `vercel.json` so new client projects never fall back to iad1.
- With static-first pages (Section 6), Supabase is touched only on form submissions and admin actions. Database performance then barely affects page speed, and Micro compute should comfortably serve 100+ low-traffic tenants. This is an inference; monitor CPU and connections in the Supabase dashboard.

### Gaps
- The RLS benchmark numbers come from Supabase's own test setup (via search summary of the KB). There is no independent replication on multi-tenant data.
- No measured Vercel fra1 ↔ Supabase eu-central-1 latency figures were found.
- How many tenants Micro can support was not verified with any source.

---

## 8. Time optimisation for the operator: monitoring and alerting, and platform choices that minimise weekly ops work

### Takeaway
Per site, the biggest weekly time sinks are **patching and redeploying** (Next.js now has monthly security releases plus critical out-of-band updates) and **manual domain and project setup**. A **single multi-tenant Next.js deployment** (Vercel for Platforms pattern), or at least one shared template package with auto-merged dependency updates, turns "patch 50 sites" into "patch once". Pair it with free alerting (UptimeRobot, Sentry, Vercel spend webhooks, Supabase spend cap) and Vercel's managed CDN, TLS and previews. Weekly ops can then be close to zero outside incidents.

### Cited Findings
- Next.js security cadence in 2026: a formal security release process from July 2026, scheduled releases (Jul 20, Aug 25, Sep 30, with Nov 3 announced) and out-of-band critical updates (Sep 22; Oct 14 with two Critical and one High upstream vulnerabilities). — [Next.js blog index](https://nextjs.org/blog)
- `next upgrade --agent` prepares migration guides, codemods and verification steps for a coding agent. `experimental.agentUpgrade: 'security'` (the default policy) reminds you about upgrades that fix known vulnerabilities in the installed version. — [Next.js 16.4 blog](https://nextjs.org/blog/next-16-4)
- Vercel multi-tenant architecture: "One codebase, one deployment serves every tenant". It is "Lower" complexity and fits "website builders", with custom domains, automatic SSL, programmatic domain management via the REST API or SDK, and preview deployments. Multi-project (one project per tenant) is "Higher" complexity. — [Vercel for Platforms](https://vercel.com/docs/platforms)
- Pro allows unlimited domains per project (soft limit 100,000); Hobby allows 50. — [Vercel Limits](https://vercel.com/docs/limits)
- Vercel Spend Management: alerts at 50/75/100% by email, web and SMS, a webhook at thresholds, and a CLI (`vercel budgets set --amount … --webhook …`). Pausing affects **all** projects, and each must be resumed by hand. — [Vercel Spend Management](https://vercel.com/docs/spend-management)
- Flat Rate CDN spike protection: "A one-day spike doesn't trigger an upgrade". — [Flat Rate CDN docs](https://vercel.com/docs/pricing/flat-rate-cdn)
- Supabase spend cap blocks over-quota usage instead of billing it, but excludes compute. — [Supabase Cost Control](https://supabase.com/docs/guides/platform/cost-control)
- UptimeRobot Free: 50 monitors at 5 minutes; Team: 100 monitors at 30 s for $33/month. Sentry Developer: 1 user, 5K errors, 1 uptime monitor, 1 cron monitor. Vercel runtime logs are kept 1 day on Pro. — [UptimeRobot](https://uptimerobot.com/pricing/); [Sentry](https://sentry.io/pricing/); [Vercel Limits](https://vercel.com/docs/limits)
- Self-hosting cost signals: Hetzner changed cloud prices twice in 2026, and changing legacy-priced servers "may trigger a switch to the current pricing". Coolify Cloud costs $5/month plus $3 per server to manage your own servers. — [Hetzner price adjustment](https://docs.hetzner.com/general/infrastructure-and-availability/price-adjustment/); [Coolify Pricing](https://coolify.io/pricing/)

### Inferences

**Recommended low-ops setup**
1. **One Vercel Pro team, ideally one multi-tenant Next.js project.** Each client is a tenant record (theme, content, domain) in Supabase, Git or a CMS. Onboarding a client (adding the domain and SSL through the Vercel API) and every Next.js security patch then become one automated deploy. To limit the blast radius, gate promotion on preview checks: Lighthouse CI, a smoke test across tenants, and optionally visual snapshots.
   - If clients need bespoke code, use multi-project with a shared template package and Renovate or Dependabot **auto-merge** for patch and security updates, with CI on previews.
2. **Alerting (free tiers):**
   - UptimeRobot Free, one monitor per client domain, up to 50 (then Team at $33).
   - Sentry Developer for the shared codebase.
   - A Vercel spend budget of about $50–100 with notifications and a webhook to email or Slack, but **pause off**.
   - Supabase spend cap on, plus a weekly glance at the Supabase usage page.
   - All alerts routed to one inbox or channel, plus a single weekly scheduled report (PSI API and uptime summary).
3. **Avoid** per-client Supabase projects, per-client Vercel teams, client-owned Hobby accounts (non-compliant), and self-hosted servers, unless a client pays for them. Each adds a recurring maintenance surface.
4. **Domains:** pick one registrar or DNS provider with an API. Ask clients to point DNS (or delegate) at onboarding, and automate verification through the Vercel domains API.
5. **Budget the residual weekly ops time:** about 15–30 minutes for reviewing auto-merged updates and alerts, plus incident time. This is an inference with no source; track actual time per client for the first quarter to calibrate the maintenance fee (Section 5).

### Gaps
- No source quantified the time spent per site per month on maintenance for small agency portfolios.
- Vercel Rolling Releases, Better Stack, Checkly and Renovate auto-merge policies were not researched this session.
- Whether Vercel's managed WAF mitigates Next.js CVEs before a redeploy was not verified, so do not rely on it.
