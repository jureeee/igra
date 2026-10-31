# Security hardening for a Vercel + Supabase web business (sites.jurelabs.si), as of 31 October 2026

Research date: 2026-10-31. All official pages listed below were read on that date. Vercel pages carry their own `last_updated` dates and Next.js docs a `lastUpdated` date; these are quoted where relevant. Supabase docs pages show no date, so read them as "current on 2026-10-31". Where a fact comes only from a search-result summary or a secondary source, the bullet says so.

## Prioritized hardening checklist for sites.jurelabs.si (objective synthesis, ranked by risk reduction per hour)

### Takeaway
"Fully safe" cannot be guaranteed. What a solo operator can achieve in roughly one or two working days:
- Every internet-facing path to the database is closed except one small, validated server endpoint.
- The accounts that control everything (email, GitHub, Vercel, Supabase, domain registrar) are MFA-protected.
- The data can be rebuilt from backups that an attacker using the same accounts cannot delete.

The current public site already follows the right architecture: the browser never talks to Supabase. So the remaining work is mostly server-side and account/backup hygiene, plus three time-sensitive items:
- Supabase's Data API grants change, enforced on existing projects on 2026-10-30.
- The end-of-2026 deprecation of the legacy `anon`/`service_role` keys.
- Vercel's rule that Hobby is non-commercial only.

### Cited Findings
- Supabase began enforcing on existing projects on **2026-10-30** that tables without explicit grants "stop being reachable via the Data API". New tables are no longer auto-granted to `anon`, `authenticated` or even `service_role`. Existing tables keep their current grants. Security Advisor flags affected tables and shows remediation SQL. — [Supabase changelog #45329](https://supabase.com/changelog/45329-breaking-change-tables-not-exposed-to-data-and-graphql-api-automatically)
- Supabase is "deprecating the `anon` and `service_role` keys by the end of 2026". Legacy keys stay valid until you disable them in Settings > API Keys. — [Supabase API keys docs](https://supabase.com/docs/guides/api/api-keys)
- Supabase's own timeline says that in "Late 2026 (TBC)" legacy keys will be deleted and "Apps still using them will break". — [GitHub discussion #29260](https://github.com/orgs/supabase/discussions/29260)
- Vercel Hobby teams "are restricted to non-commercial personal use only. All commercial usage of the platform requires either a Pro or Enterprise plan". Examples of commercial use include "Advertising the sale of a product or service" and "Receiving payment to create, update, or host the site". (page last_updated 2026-09-14) — [Vercel Fair Use Guidelines](https://vercel.com/docs/limits/fair-use-guidelines)
- On Supabase Free, automatic backups are "Not included" and projects pause "After 1 week of inactivity". Pro is "from $25/month" with 7-day backups. — [Supabase pricing](https://supabase.com/pricing)
- The Supabase production checklist's security items:
  - RLS on all tables
  - SSL enforcement
  - Network Restrictions
  - MFA on the Supabase account (GitHub 2FA if you sign in with GitHub)
  - Org-wide MFA enforcement
  - Multiple org owners
  - Email confirmations
  - OTP expiry ≤ 3600 s
  - Custom SMTP
  - Reviewing the Security Advisor

  — [Supabase production checklist](https://supabase.com/docs/guides/deployment/going-into-prod)
- Cloudflare Turnstile: "You must call the Siteverify API to complete your Turnstile implementation… The client-side widget alone does not protect your forms." — [Cloudflare Turnstile server-side validation](https://developers.cloudflare.com/turnstile/get-started/server-side-validation/)
- Vercel WAF rate limiting is available on all plans. Hobby gets 1 rate-limit rule (within 3 custom rules) and 1,000,000 allowed requests. Pro gets 40 rules. (last_updated 2026-08-28) — [Vercel WAF Rate Limiting](https://vercel.com/docs/vercel-firewall/vercel-waf/rate-limiting)
- Attackers who steal developer credentials republish packages with install hooks. The Aug-2026 keyv/CHAINDROP wave compromised 400+ npm packages. Elastic recommends a "soak period" for new versions, token rotation, 2FA, and npm 12+ (which blocks `preinstall` hooks by default). — [Elastic Security Labs](https://www.elastic.co/security-labs/shai-hulud-chaindrop-npm-supply-chain)

### Inferences
Ranked by risk reduction per hour. Time estimates are rough judgments, not sourced.

**P0: do this week (about 4–7 hours in total)**
1. **Account takeover protection (30–60 min).** Turn on MFA everywhere, preferring passkeys or TOTP and keeping recovery codes offline:
   - the email inbox (password resets for everything else go there), GitHub, Vercel, Supabase, the domain registrar/DNS, npm (if you publish), and Cloudflare (Turnstile).
   - In Vercel, enable team "Two-Factor Authentication Enforcement" ([docs](https://vercel.com/docs/two-factor-enforcement)).
   - In Supabase, enable "Require MFA to access organization" (Pro/Team/Enterprise, per [org MFA docs](https://supabase.com/docs/guides/platform/mfa/org-mfa-enforcement)).

   An account takeover defeats RLS, firewalls and same-account backups at once, so this is the single highest-value hour.
2. **Supabase exposure audit (30–90 min).**
   - Run Security Advisor and fix every ERROR-level lint, especially `0013_rls_disabled_in_public`, `0023_sensitive_columns_exposed`, `0010_security_definer_view`, `0002_auth_users_exposed` and `0015_rls_references_user_metadata`.
   - Check that every table in `public` has RLS enabled.
   - Because the site's browser code never calls Supabase, revoke `anon`/`authenticated` grants on the leads table. Grant `service_role` only what `/api/povprasevanje` needs (for example `insert`, plus `select` for an admin view).
   - Recheck after the 2026-10-30 grants change.
3. **Key migration (30 min).** Check in Vercel env vars which credential `/api/povprasevanje` uses.
   - If it is a legacy `eyJ…` `service_role` JWT, create a dedicated `sb_secret_…` key for this one function and store it as a Vercel **Secret** env var scoped to Production.
   - Use separate values for Preview/Development.
   - Redeploy, then disable the legacy keys. This must happen before the end-2026 deprecation.
4. **Inquiry endpoint hardening (1–2 h).**
   - Verify the Turnstile token server-side (`success`, `hostname`, `action`).
   - Validate the body against a schema (for example zod) with strict length limits, and reject oversized bodies.
   - Add a honeypot field.
   - Add one Vercel WAF rate-limit rule on `POST /api/povprasevanje` (for example 5 requests / 60 s per IP → 429).
   - Do not auto-send emails to user-supplied addresses (that is an email-bombing vector).
   - Return generic errors.
   - Log minimal PII.
5. **Backups (1–2 h).**
   - Be on Supabase Pro (Free has no automatic backups).
   - Add an independent daily logical dump (the official `supabase db dump` GitHub Actions workflow). Encrypt it and store it outside Supabase and GitHub, with versioning/immutability and credentials that cannot delete old copies.
   - Do one test restore into a scratch project.
6. **Plan compliance (15 min).** A commercial business on Vercel needs Pro. Hobby violates the fair-use terms. Pro also raises WAF custom rules from 3 to 40.

**P1: this month**
7. **Separate environments.** Use separate Supabase projects for production and dev/preview, and keep production secrets out of Preview.
   - Turn on Vercel "Standard Protection" for previews.
   - Turn on the team policy "Separate Production Secret Values → Require Separate Values".
8. **Supply chain.**
   - Commit the lockfile and use `npm ci` / frozen lockfile.
   - Set a release-age gate (npm `min-release-age` in days; pnpm `minimumReleaseAge`, which defaults to 1440 minutes).
   - Block dependency install scripts (pnpm `allowBuilds`/`strictDepBuilds`; npm `allow-scripts`/`strict-allow-scripts` or `ignore-scripts`).
   - Enable Dependabot security updates, GitHub secret scanning and push protection.
   - Use no long-lived publish tokens.
9. **Monitoring.**
   - Vercel Firewall alerts.
   - A log drain if you need longer retention.
   - Periodic `supabase db advisors` (CLI) in CI.
   - Watch Supabase API logs (7-day retention on Pro).
10. **Patch cadence.** Next.js now publishes scheduled monthly security releases (next one: 2026-11-03). Subscribe to advisories for every framework you deploy for clients.

**P2: before launching client logins, admin panels, uploads or payments**
11. **Auth.**
    - Email confirmation, CAPTCHA on sign-up/sign-in/reset, leaked-password protection (Pro+), a strong minimum password length, and MFA for admin users.
    - Custom SMTP and reviewed Auth rate limits.
    - Never authorize on `user_metadata`.
12. **RLS.** Owner-based policies with `(select auth.uid())`, `to authenticated`, and indexes on owner columns. Write tests proving that tenant A cannot read tenant B's rows.
13. **Storage.** Private buckets only, with per-user folder policies on `storage.objects`.
14. **App code.**
    - Next.js: a Data Access Layer with `server-only`, plus authN/authZ and validation inside every Server Action and Route Handler.
    - A CSP (nonces or SRI) and a security headers baseline.
15. **Database functions and views.** SECURITY DEFINER functions only in non-exposed schemas, with `set search_path = ''`. Views with `security_invoker = true`.
16. **PITR.** Add it when losing up to 24 h of data is unacceptable or the DB is larger than 4 GB. It costs about $100/month for 7 days plus at least the Small compute add-on.

### Gaps
- Vercel Pro's per-seat price in Oct 2026 was not verified in this session; check https://vercel.com/pricing.
- Which credential `/api/povprasevanje` actually uses, its validation, and whether it verifies Turnstile could not be checked without probing the endpoint, which was out of scope.

## Passive external check of https://sites.jurelabs.si (normal GET requests only, 2026-10-31 ~21:46 UTC)

### Takeaway
The public site does not expose any Supabase URL or key, nor any other secret, in its HTML or JavaScript. The browser cannot even connect to Supabase (`connect-src 'self'`), and inquiries go to a same-origin serverless endpoint (`/api/povprasevanje`) protected client-side by Cloudflare Turnstile. The security headers are already strong. The remaining risk sits behind that endpoint (server validation, key type, DB grants/RLS) and in accounts and backups, none of which can be seen from outside.

### Cited Findings
**Scope of the check**
- Method: plain `curl` GET requests only. Nothing was sent to the Supabase API, the inquiry endpoint was not called, and the form was not submitted.
- Pages fetched:
  - `/` (HTTP 200, 19,397 bytes).
  - Six demo pages linked from the JS bundle, all HTTP 200: `/demo/salon/`, `/demo/restavracija/`, `/demo/avtoservis/`, `/demo/kavarna/`, `/demo/obrtnik/`, `/demo/trgovina/`.
  - `/predogled/salon` and `/predogled/zrno` (referenced in the bundle) returned 404.

  — [GET https://sites.jurelabs.si/ on 2026-10-31](https://sites.jurelabs.si/)

**Stack**
- Response header `server: Vercel`, plus `x-vercel-cache: HIT` and `age: 20` on `/`.
- The page is a static Vite build (`/assets/main-lF9510r9.js`, `/assets/modulepreload-polyfill-B5Qt9EMX.js`), not Next.js.

  — [GET https://sites.jurelabs.si/](https://sites.jurelabs.si/)

**Security headers.** Identical on `/` and all six `/demo/*` pages:
- `content-security-policy: default-src 'self'; script-src 'self' https://challenges.cloudflare.com; frame-src 'self' https://challenges.cloudflare.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self' data:; connect-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'self'; upgrade-insecure-requests`
- `strict-transport-security: max-age=63072000`: two years, no `includeSubDomains`, no `preload`.
- `x-frame-options: SAMEORIGIN`
- `x-content-type-options: nosniff`
- `referrer-policy: strict-origin-when-cross-origin`
- `permissions-policy: camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()`
- `cross-origin-opener-policy: same-origin`
- Also present: `access-control-allow-origin: *`.
- No `Set-Cookie` on any page fetched.

  — [GET https://sites.jurelabs.si/](https://sites.jurelabs.si/)

**Secret scan**
- Files scanned:
  - the HTML of 7 pages
  - `main-lF9510r9.js` (199 KB), `ogled-DxSBkHMO.js` (469 KB), `lenis-9qxpAu3p.js`, `modulepreload-polyfill-B5Qt9EMX.js`
  - six `demo-*.js` bundles
  - `main-BOh3ez8i.css`
- Patterns searched:
  - `sb_secret_`, `sb_publishable_`, `service_role`, any 3-part `eyJ…` JWT, `supabase`
  - Stripe `sk_live_`/`sk_test_`/`pk_live_`/`whsec_`, AWS `AKIA…`, Google `AIza…`, GitHub `ghp_`/`github_pat_`, Slack `xox?-`, Resend `re_…`, SendGrid `SG.…`
  - `PRIVATE KEY`, `postgres://`, `VITE_*`, `process.env`, `import.meta.env`
- Result: **zero matches**, including no Supabase URL and no publishable/anon key at all.

  — [GET https://sites.jurelabs.si/](https://sites.jurelabs.si/)

**Other observations**
- The only key-like value is a Cloudflare Turnstile **site key** (`0x4AAAAAAF…`). It is used when `location.hostname === "sites.jurelabs.si"`; on any other hostname the code falls back to `1x00000000000000000000AA`. The widget renders with `appearance:"interaction-only"`. — [GET https://sites.jurelabs.si/assets/main-lF9510r9.js](https://sites.jurelabs.si/)
- The bundle sends inquiries to a same-origin `"/api/povprasevanje"` and includes a `mailto:` fallback. The HTML contains no `<form>` element; the form is rendered by JS. — [GET https://sites.jurelabs.si/assets/main-lF9510r9.js](https://sites.jurelabs.si/)
- There are no inline `<script>` blocks and no `sourceMappingURL` references in the downloaded JS, so source maps are not advertised. — [GET https://sites.jurelabs.si/](https://sites.jurelabs.si/)
- The homepage carries `<meta name="robots" content="noindex, nofollow" />`. — [GET https://sites.jurelabs.si/](https://sites.jurelabs.si/)
- Turnstile's server-side check needs the widget's **secret** key ("Your widget's secret key from the Cloudflare dashboard"). The site key is the client-side part. — [Cloudflare Turnstile server-side validation](https://developers.cloudflare.com/turnstile/get-started/server-side-validation/)

### Inferences
**Key type.** Seeing the Supabase URL plus a publishable/anon key would have been normal. None is visible, so the key type cannot be determined from outside. Whatever credential the Vercel function uses (secret key, legacy `service_role` JWT, or a Postgres connection string) is server-side only. That is the recommended pattern for a public insert-only form.

**CSP**
- The CSP is better than typical: no `'unsafe-inline'`/`'unsafe-eval'` for scripts, `frame-ancestors 'self'`, `form-action 'self'`, `object-src 'none'`, `base-uri 'self'`.
- `style-src 'unsafe-inline'` is a minor, common weakness.
- There is no `report-to`/`report-uri`, so CSP violations are not monitored.
- `interest-cohort=()` is an obsolete FLoC directive (harmless).

**HSTS.** It covers only this host. Adding `includeSubDomains`/`preload` belongs on the apex `jurelabs.si`, and only after confirming every subdomain serves HTTPS.

**`access-control-allow-origin: *`.** On public static HTML/JS this only lets other sites read public content. The thing to check is that `/api/povprasevanje` does not return permissive CORS. That was not tested, by design.

**Test site key.** On non-production hostnames (e.g., Vercel preview URLs) the client uses the `1x0000…AA` key. From prior knowledge (not re-fetched in this session), that is Cloudflare's documented "always passes" test site key. If a preview deployment is public *and* uses production Supabase credentials with a test Turnstile secret, the bot protection could be bypassed on the preview URL. This is another reason for preview Deployment Protection and separate preview credentials.

**Robots meta.** `noindex, nofollow` on the homepage is an SEO matter, not a security one. It may be intentional pre-launch, but it should be a conscious choice.

### Gaps
- Not checked, by design: whether `/api/povprasevanje` validates the Turnstile token server-side, enforces input limits, rate-limits, or sets CORS headers; DNS/email security records (SPF/DKIM/DMARC); `www.jurelabs.si`.
- The "always passes" meaning of `1x00000000000000000000AA` comes from memory of Cloudflare's testing docs and was not re-verified in this session.

## Supabase data access: how RLS and the Data API interact, policy patterns, and limiting exposure

### Takeaway
Two independent gates protect every table reachable through the Data API (PostgREST/GraphQL):
- **Grants** decide whether a role can touch the table at all.
- **RLS** decides which rows it can touch.

A table in an exposed schema with RLS disabled is readable and writable by any role that holds a grant. With the public key, that means anyone on the internet. Since 2026-10-30, Supabase no longer auto-grants new tables, which closes the most common footgun for new tables. Old tables keep their grants, so RLS still has to be checked.

For a public inquiry form, inserting through a server route (as sites.jurelabs.si already does) is better than direct browser inserts: the CAPTCHA, validation and rate limits cannot be bypassed by calling the Data API with the public key.

### Cited Findings
**How grants and RLS interact**
- "A table in an exposed schema without RLS is readable and writable by any role with a grant on it." Enable RLS on every table in an exposed schema. On projects that still grant `anon`/`authenticated` by default, revoke those grants, because adding policies does not remove them. — [Supabase RLS docs](https://supabase.com/docs/guides/database/postgres/row-level-security)
- Grants are checked before policies; a missing grant raises `42501` before any policy runs. Once RLS is enabled, no data is reachable with a publishable key until policies exist. — [Supabase RLS docs](https://supabase.com/docs/guides/database/postgres/row-level-security)
- "A table isn't reachable through the Data API unless you have granted a role privileges on it." Grants control *whether* a role can access an object; RLS controls *which rows*. "Use both controls for every exposed object." — [Supabase: Hardening the Data API](https://supabase.com/docs/guides/database/hardening-data-api)

**The 2026 grants change**
- Previously, `select`/`insert`/`update`/`delete` were granted on every new `public` table to `anon`, `authenticated` and `service_role`.
- Rollout:
  - 2026-04-28: opt-out checkbox at project creation.
  - 2026-05-18: `pg_graphql` no longer enabled by default.
  - 2026-05-30: new behavior becomes the default for new projects.
  - 2026-10-30: applied to all existing projects. Existing tables keep their grants; RLS is unchanged.
- Without a grant, PostgREST returns `42501` ("permission denied for table") with a hint.
- Recommended SQL:
  ```sql
  grant select on public.your_table to anon;
  grant select, insert, update, delete on public.your_table to authenticated;
  grant select, insert, update, delete on public.your_table to service_role;
  alter table public.your_table enable row level security;
  ```
- Opt in early on an existing project:
  ```sql
  alter default privileges for role postgres in schema public
    revoke select, insert, update, delete on tables from anon, authenticated, service_role;
  alter default privileges for role postgres in schema public
    revoke usage, select on sequences from anon, authenticated, service_role;
  ```
- Remove exposure from an existing table:
  ```sql
  revoke all on table public.your_table from anon, authenticated, service_role;
  ```
- Security Advisor flags affected tables, and a "Data API exposure badge" in the Table Editor marks tables to review. Direct Postgres connections (psql, ORMs) are not affected.

  — [Supabase changelog #45329](https://supabase.com/changelog/45329-breaking-change-tables-not-exposed-to-data-and-graphql-api-automatically)

**Limiting what the Data API exposes**
- If the app never uses Supabase client libraries, REST or GraphQL, turn **Enable Data API** off in the Dashboard. "With the Data API disabled, none of the auto-generated REST endpoints respond, regardless of grants or RLS." — [Supabase: Hardening the Data API](https://supabase.com/docs/guides/database/hardening-data-api)
- Disable **Automatically expose new tables** in the Data API settings. — [Supabase: Hardening the Data API](https://supabase.com/docs/guides/database/hardening-data-api)
- Use a dedicated schema such as `api` as the exposed surface and keep internal tables and helper functions in schemas that aren't exposed. — [Supabase: Hardening the Data API](https://supabase.com/docs/guides/database/hardening-data-api)
- Grant the `service_role` only what server code needs, e.g. `grant select, insert, update, delete on table public.your_table to service_role;`. — [Supabase: Hardening the Data API](https://supabase.com/docs/guides/database/hardening-data-api)

**Policy-writing guidance**
- Wrap `auth.uid()` in a select, `(select auth.uid()) = user_id`, so Postgres caches it per statement. — [Supabase RLS docs](https://supabase.com/docs/guides/database/postgres/row-level-security)
- Put a btree index on every column policies filter on; only the leading column of a composite index counts. — [Supabase RLS docs](https://supabase.com/docs/guides/database/postgres/row-level-security)
- Name the role with `to authenticated` so the policy doesn't run for other roles. — [Supabase RLS docs](https://supabase.com/docs/guides/database/postgres/row-level-security)
- Use `with check` on insert so users can't create rows owned by someone else. — [Supabase RLS docs](https://supabase.com/docs/guides/database/postgres/row-level-security)
- `using (true)` exposes every row the role can reach; use it only for public data. — [Supabase RLS docs](https://supabase.com/docs/guides/database/postgres/row-level-security)

**Service keys and views**
- Secret keys map to `service_role`, which has `BYPASSRLS`. "A secret key bypasses RLS only when the request carries no user access token." Table grants still apply even to `service_role`. — [Supabase RLS docs](https://supabase.com/docs/guides/database/postgres/row-level-security); [Supabase API keys docs](https://supabase.com/docs/guides/api/api-keys)
- Views bypass RLS by default because they are usually created as `postgres`. On Postgres 15+, set `security_invoker = true`; on older versions, revoke access from `anon`/`authenticated` or put the view in an unexposed schema. — [Supabase RLS docs](https://supabase.com/docs/guides/database/postgres/row-level-security)

**Lints relevant to these patterns**
- `0024_permissive_rls_policy` (WARN) flags policies with an always-true condition. — [Supabase database advisors](https://supabase.com/docs/guides/database/database-advisors)
- `0015_rls_references_user_metadata` (ERROR) flags policies that rely on user-editable metadata. — [Supabase database advisors](https://supabase.com/docs/guides/database/database-advisors)

### Inferences
**Recommended patterns.** Built from the documented building blocks above; adapt the names.

1. **Public insert-only inquiry form, server-side insert (recommended; matches the current site).**
   ```sql
   create table public.leads (
     id uuid primary key default gen_random_uuid(),
     created_at timestamptz not null default now(),
     name text not null check (char_length(name) between 1 and 200),
     email text not null check (char_length(email) <= 320),
     message text check (char_length(message) <= 5000),
     config jsonb,
     consent boolean not null
   );
   alter table public.leads enable row level security;            -- RLS on, no anon/authenticated policies
   revoke all on table public.leads from anon, authenticated;      -- not reachable with the public key at all
   grant insert, select on table public.leads to service_role;    -- only what the server function needs
   ```
   The Vercel function (Node runtime) does the following, in order:
   1. Verify the Turnstile token.
   2. Validate with zod.
   3. Rate-limit.
   4. Insert with a dedicated `sb_secret_…` key.

   Because `anon` has no grant, the public key cannot be used to spam, read or delete leads.
2. **Direct browser insert (only if a server route is impossible).**
   ```sql
   grant insert on table public.leads to anon;
   create policy "anon can submit leads" on public.leads for insert to anon
     with check (char_length(message) <= 5000 and consent);
   -- no select/update/delete grant or policy for anon
   ```
   - Using a real check instead of `with check (true)` avoids lint `0024`.
   - Weakness: anyone holding the public key can script unlimited inserts that bypass the CAPTCHA, so flooding is only limited by platform rate limits. That is why the server route is preferred.
3. **Client-owned rows (future client portals).**
   ```sql
   alter table public.projects enable row level security;
   grant select, insert, update, delete on table public.projects to authenticated;
   create index on public.projects (owner_id);
   create policy "own rows: read"   on public.projects for select to authenticated using ((select auth.uid()) = owner_id);
   create policy "own rows: insert" on public.projects for insert to authenticated with check ((select auth.uid()) = owner_id);
   create policy "own rows: update" on public.projects for update to authenticated
     using ((select auth.uid()) = owner_id) with check ((select auth.uid()) = owner_id);
   create policy "own rows: delete" on public.projects for delete to authenticated using ((select auth.uid()) = owner_id);
   ```
   For multi-tenant (agency → client → users), use a `tenant_id` plus a membership table, and test cross-tenant reads.
4. **Admin-only tables.**
   - Enable RLS, `revoke all … from anon, authenticated`, and access the table only from server code that checks the admin identity first and then uses the secret key.
   - Alternatively, use a policy based on a server-controlled source: a membership/admin table or `app_metadata`, never `user_metadata`. `user_metadata` is user-editable, and lint `0015` flags it.

**Further hardening**
- If `/api/povprasevanje` connects with a direct Postgres connection string rather than supabase-js, the Data API could be switched off entirely. That is the strongest "nobody gets in via the API" setting. It is only possible when no client-side or Data-API code needs it.
- For a project that serves only server-side code, also consider removing `anon`/`authenticated` grants on all tables and disabling `pg_graphql` if unused. The `0026`/`0027` lints flag GraphQL introspection exposure.

### Gaps
- Whether an identity/serial column needs sequence grants for `service_role` under the new defaults was not checked; the changelog revokes sequence defaults. Using `uuid default gen_random_uuid()` sidesteps this.
- The "Exposed schemas" setting location and the custom-schema setup steps were not covered by the pages read. The relevant guide is "Using Custom Schemas" in the Supabase docs.

## Supabase API keys in 2026: publishable/secret vs legacy anon/service_role

### Takeaway
New projects use `sb_publishable_…` keys (safe in browsers when RLS and grants are right) and `sb_secret_…` keys (server only; bypass RLS). Legacy `anon`/`service_role` JWTs are being retired "by the end of 2026", and apps still using them will break. A leaked secret or `service_role` key gives full read/write/delete on every table it has grants for, and on Storage, so it is a "destroy everything" credential.

Mitigations:
- One secret key per backend component.
- Store it as a write-only secret env var.
- Never put it in browser code or Git.
- Rotate by creating a new key, switching, then deleting the old one (deletion is instant and irreversible).

### Cited Findings
**Key types and where they go**
- Four key types:
  - Publishable `sb_publishable_…`: low privilege, "Safe to expose online".
  - Secret `sb_secret_…`: elevated, backend only.
  - `anon` (JWT): legacy publishable key.
  - `service_role` (JWT): legacy secret key.

  New keys are short strings, not JWTs; "a long key starting with `eyJ` indicates a legacy key". — [Supabase API keys docs](https://supabase.com/docs/guides/api/api-keys)
- Where secret keys may live: servers that do their own authorization, Edge Functions, jobs, queue processors, admin tools that check authorization first, and data pipelines. Never in a browser, a shipped app, or source control. — [Supabase API keys docs](https://supabase.com/docs/guides/api/api-keys)

**What a secret key can do**
- Secret and `service_role` keys map to the `service_role` Postgres role, which has full access and `BYPASSRLS`. The docs warn that a secret key "bypasses every Row Level Security policy you have". Table grants still apply. — [Supabase API keys docs](https://supabase.com/docs/guides/api/api-keys)
- "Service keys entirely bypass RLS policies, granting you unrestricted access to all Storage APIs." — [Supabase Storage access control](https://supabase.com/docs/guides/storage/security/access-control)

**Browser blocking and headers**
- Secret keys are refused in browsers: Supabase matches the `User-Agent` and returns 401. The page notes this does not stop an attacker using the key from other tools. — [Supabase API keys docs](https://supabase.com/docs/guides/api/api-keys)
- New keys go in the `apikey` header. — [Supabase API keys docs](https://supabase.com/docs/guides/api/api-keys)
- Edge Functions `verify_jwt` accepts these keys "but passing it doesn't authenticate the caller". Edge Functions must authorize in code; the `@supabase/server` SDK is recommended. — [Supabase API keys docs](https://supabase.com/docs/guides/api/api-keys)

**Migration timeline**
- Creating new keys doesn't revoke legacy keys; both work until legacy keys are disabled in Settings > API Keys. — [Supabase API keys docs](https://supabase.com/docs/guides/api/api-keys)
- Use a separate secret key per backend component, so a leak only requires rotating that key. — [Supabase API keys docs](https://supabase.com/docs/guides/api/api-keys)
- Timeline (table last updated 17 June 2025):
  - June 2025: opt-in preview.
  - November 2025: monthly reminders begin; "Projects restored from 1st November 2025 will no longer be restored with the legacy API keys"; new projects no longer have `anon`/`service_role`.
  - "Late 2026 (TBC)": legacy keys deleted and "Apps still using them will break".
  - Multiple secret keys are supported. "By deleting a secret key it is instantly revoked."

  — [GitHub discussion #29260](https://github.com/orgs/supabase/discussions/29260)

**Rotation after a leak.** Read via a search-result summary of the official page, not a full fetch.
1. Fix the cause of the leak first.
2. Create a new secret key (Settings > API Keys, or the Management API).
3. Move every component to it. Edge Functions using `auth: 'secret'` accept only the key named `default` until updated.
4. Delete the old key. Deletion cannot be undone. If the key is being actively abused, retire it immediately.
5. For legacy `service_role` keys, deactivate them, revoke the legacy JWT secret, and move to JWT signing keys.

— [Supabase: Rotate a leaked or compromised API key](https://supabase.com/docs/guides/security/rotate-leaked-api-keys)

A troubleshooting page states that the legacy anon/service/JWT secrets can no longer be rotated without migrating to asymmetric JWT signing keys (search-result summary). — [Supabase: Rotating Anon, Service, and JWT Secrets](https://supabase.com/docs/guides/troubleshooting/rotating-anon-service-and-jwt-secrets-1Jq6yd)

**Leak detection by GitHub**
- Supabase has been a GitHub secret scanning partner since 2022 (search-result snippet). — [GitHub changelog 2022-03-28](https://github.blog/changelog/2022-03-28-supabase-is-now-a-github-secret-scanning-partner)
- On 2026-10-05, GitHub added detectors for `supabase_oauth_access_token` and `supabase_scoped_personal_access_token`. Partner secrets found in public repositories are automatically reported to the issuer. — [GitHub changelog 2026-10-05](https://github.blog/changelog/2026-10-05-secret-scanning-adds-detectors-for-lovable-supabase-and-more)

**Vercel side of rotation**
- Vercel **Secret**-type env vars are write-only after saving; you rotate by entering a new value. Secret values of 32+ characters are redacted from build logs. (last_updated 2026-08-28) — [Vercel Config and Secret environment variables](https://vercel.com/docs/environment-variables/sensitive-environment-variables)
- Vercel has a KB guide for rotating the Supabase service role key, JWT secret and DB password when Supabase is connected through the Vercel integration. — [Vercel KB: Rotating Secrets for Vercel Marketplace Integrations](https://vercel.com/kb/guide/how-to-reset-the-secrets-of-your-supabase-integration)

### Inferences
**What a leaked secret key breaks**
- An attacker can export all leads (a GDPR breach), alter or delete all rows in granted tables, and delete Storage files. Only backups held outside the project make that recoverable.
- The 2026 grant model limits damage slightly, since `service_role` only reaches tables explicitly granted to it. Granting `service_role` only `insert`/`select` on `leads` (no `delete`) means a leaked function key cannot wipe the leads table.

**Detection for a solo dev**
- GitHub secret scanning and push protection on all repos.
- Never commit `.env*`.
- Review Supabase API logs for secret-key traffic from unexpected IPs or user agents.
- Watch for Security Advisor or billing anomalies.

**Deadline.** Any legacy JWT key in use must be migrated before the end-2026 removal, so roughly within the next two months as of 2026-10-31.

### Gaps
- Whether Supabase automatically revokes leaked `sb_secret_` keys reported via GitHub's partner program is not confirmed. Sources show notification, not guaranteed auto-revocation.
- Whether GitHub detects the new `sb_secret_` format was not confirmed.
- An exact final removal date for legacy keys was not found beyond "end of 2026" / "Late 2026 (TBC)".

## Supabase platform settings: Security Advisor, SECURITY DEFINER, Storage, Edge Functions, Auth, account/org security, network, audit logs

### Takeaway
Supabase provides most of the needed controls:
- the Security Advisor lints;
- Auth hardening (CAPTCHA, leaked-password check on Pro+, rate limits, email confirmation, MFA);
- org MFA enforcement (Pro+), SSL enforcement and network restrictions.

Two higher-tier items are gated: Platform Audit Logs and SOC2 are Team-plan features ($599/month). For a solo developer, Pro plus disciplined settings is the realistic tier.

### Cited Findings
**Security Advisor lints.** Can be run in Studio, via the MCP `get_advisors` tool, via the CLI `supabase db advisors`, or via the Management API. — [Supabase database advisors](https://supabase.com/docs/guides/database/database-advisors)

| Lint | Level |
|---|---|
| `0002_auth_users_exposed` | ERROR |
| `0006_multiple_permissive_policies` | WARN |
| `0007_policy_exists_rls_disabled` | INFO |
| `0008_rls_enabled_no_policy` | INFO |
| `0010_security_definer_view` | ERROR |
| `0011_function_search_path_mutable` | WARN |
| `0012_auth_allow_anonymous_sign_ins` | INFO |
| `0013_rls_disabled_in_public` | ERROR |
| `0014_extension_in_public` | WARN |
| `0015_rls_references_user_metadata` | ERROR |
| `0016_materialized_view_in_api` | WARN |
| `0017_foreign_table_in_api` | WARN |
| `0019_insecure_queue_exposed_in_api` | ERROR |
| `0021_fkey_to_auth_unique` | ERROR |
| `0022_extension_versions_outdated` | WARN |
| `0023_sensitive_columns_exposed` | ERROR |
| `0024_permissive_rls_policy` | WARN |
| `0025_public_bucket_allows_listing` | WARN |
| `0026_pg_graphql_anon_table_exposed` | WARN |
| `0027_pg_graphql_authenticated_table_exposed` | WARN |
| `0028_anon_security_definer_function_executable` | WARN |
| `0029_authenticated_security_definer_function_executable` | WARN |

**SECURITY DEFINER functions**
- They run with the creator's privileges. Set `search_path = ''` and schema-qualify every name. Never create one in a schema listed under "Exposed schemas", because the Data API can call it with the creator's privileges. — [Supabase RLS docs](https://supabase.com/docs/guides/database/postgres/row-level-security)
- Roles can be given `bypassrls` (`alter role … with bypassrls;`); never share credentials for such roles. — [Supabase RLS docs](https://supabase.com/docs/guides/database/postgres/row-level-security)

**Storage**
- Access is controlled by RLS policies on `storage.objects`. "By default Storage does not allow any uploads to buckets without RLS policies."
- Uploads need an `INSERT` policy; upserts also need `SELECT` and `UPDATE`.
- Example per-user folder rule: `(storage.foldername(name))[1] = (select auth.jwt()->>'sub')`. Owner read: `(select auth.jwt()->>'sub') = owner_id`.
- Public buckets are publicly readable; `storage.allow_any_operation()` can prevent listing.

— [Supabase Storage access control](https://supabase.com/docs/guides/storage/security/access-control)

Lint `0025_public_bucket_allows_listing` flags listable public buckets. — [Supabase database advisors](https://supabase.com/docs/guides/database/database-advisors)

**Edge Functions**
- `verify_jwt` passing "doesn't authenticate the caller". Authorize API keys in code; `@supabase/server` is recommended. — [Supabase API keys docs](https://supabase.com/docs/guides/api/api-keys)
- Public Realtime connections last at most 24 hours unless upgraded to user-level authentication. — [Supabase API keys docs](https://supabase.com/docs/guides/api/api-keys)

**Auth hardening (production checklist)**
- Enable email confirmations.
- Remove test phone numbers.
- Set OTP expiry to ≤ 3600 s.
- Consider MFA for end users.
- Use custom SMTP on your domain.
- CAPTCHA protects sign-up, sign-in and password reset.
- Email scanners can consume single-use links, so route links through a page with a button.
- Disable link tracking in custom SMTP.

— [Supabase production checklist](https://supabase.com/docs/guides/deployment/going-into-prod)

**Auth default rate limits**, configurable under Auth → Rate Limits. — [Supabase production checklist](https://supabase.com/docs/guides/deployment/going-into-prod)

| Endpoint | Default limit |
|---|---|
| Emails | 2 per hour on built-in email; changeable only with custom SMTP |
| `/auth/v1/otp` | 360 per hour |
| `/auth/v1/verify` | 360 per hour per IP |
| `/auth/v1/token` | 1800 per hour per IP |
| MFA challenge/verify | 15 per minute per IP |
| Anonymous sign-ins | 30 per hour per IP |
| New users with custom SMTP | 30 per hour |

**Passwords**
- Leaked password protection uses HaveIBeenPwned and is available on the "Pro Plan and above". — [Supabase password security](https://supabase.com/docs/guides/auth/password-security)
- Minimum length: under 8 characters is discouraged. Character requirements are configurable. — [Supabase password security](https://supabase.com/docs/guides/auth/password-security)
- Reauthentication via a nonce for password change is optional; users must have signed in within 24 h to change a password without it. Optionally require the current password. — [Supabase password security](https://supabase.com/docs/guides/auth/password-security)

**Account and organization security**
- Use MFA on the Supabase account, or GitHub 2FA if signing in with GitHub. Consider org-wide MFA enforcement and add multiple org owners. — [Supabase production checklist](https://supabase.com/docs/guides/deployment/going-into-prod)
- Org MFA enforcement is "only available on the Pro, Team and Enterprise plans". It is toggled by owners ("Require MFA to access organization"), who must have MFA themselves (search-result summary of the official page). — [Supabase: Enforce MFA on Organization](https://supabase.com/docs/guides/platform/mfa/org-mfa-enforcement)
- SSL enforcement and Network Restrictions are production-checklist items, under Database Settings. — [Supabase production checklist](https://supabase.com/docs/guides/deployment/going-into-prod)

**Plan matrix** — [Supabase pricing](https://supabase.com/pricing)

| Feature | Free | Pro | Team | Enterprise |
|---|---|---|---|---|
| Access roles | Owner/Admin/Developer | Owner/Admin/Developer | adds Read-only and project-scoped roles | custom roles |
| Platform Audit Logs | Not included | Not included | Included | Included |
| Log retention (API & Database) | 1 day | 7 days | 28 days | 90 days |
| SOC2 | Not included | Not included | Included | Included |
| Leaked password protection | Not included | Included | Included | Included |

SSO (dashboard) is listed as "Contact Us" on Team and Enterprise, while the Team summary mentions "SSO for Supabase Dashboard". The page is internally inconsistent.

**pg_graphql.** Not enabled by default for new projects since 2026-05-18. — [Supabase changelog #45329](https://supabase.com/changelog/45329-breaking-change-tables-not-exposed-to-data-and-graphql-api-automatically)

### Inferences
**SECURITY DEFINER helper pattern** (e.g., `is_admin()` used in policies):
- Create it in a non-exposed schema (e.g., `private`) with `set search_path = ''` and fully qualified names.
- `revoke execute … from public, anon` and grant it only to the roles that need it.
- Lints `0028`/`0029`/`0011` will confirm the setup.

**Uploads (future client sites)**
- Use private buckets and per-user folder policies.
- Serve files through signed URLs or authorized server routes.
- Never let a public bucket be listable.

**Network Restrictions.** These are relevant if you keep direct Postgres access, e.g., for backups. GitHub-hosted runners have changing IPs, so a backup job may need a self-hosted runner or an allowed IP range. This is a practical trade-off to check.

**Audit logs.** For a solo developer, the Team plan's audit logs/SOC2 ($599/month) is likely disproportionate. Compensate with MFA, a minimal number of owners, and off-platform backups.

### Gaps
- Not verified in this session:
  - Plan availability of Network Restrictions and SSL enforcement.
  - Supabase Vault documentation; it is the place for DB-side secrets such as webhook signing keys.
  - Bucket-level `file_size_limit`/`allowed_mime_types` details.
  - Which CAPTCHA providers Supabase Auth supports (believed to be hCaptcha and Turnstile, unverified).
  - How to revoke all user sessions after a breach.
- Self-service dashboard SSO: a July 2025 Supabase post described it as upcoming. Current availability is unclear (search-result summary). — [Supabase blog: Improved security controls](https://supabase.com/blog/improved-security-controls)
- No Supabase "project deletion protection" setting was found in the pages read.

## Real-world failure modes and incidents (AI-generated apps, missing RLS, leaked keys)

### Takeaway
The dominant real-world failure is not hackers breaking Supabase. It is apps shipping with the public key in the browser while RLS is missing, disabled, or always-true, so anyone can query the REST API directly. This is how CVE-2025-48757 (Lovable, 2025) and the Moltbook exposure (Wiz, Feb 2026) happened. Security scanners that only check "a policy exists" give false comfort.

### Cited Findings
**CVE-2025-48757 (Lovable)**
- Discovered 2025-03-20 on Linkable, a Lovable-built site: modifying a network request exposed the whole `users` table.
- A scan of Lovable showcase sites found **303 endpoints across 170 projects** (about 10.3% of 1,645 analyzed) with inadequate RLS. Only homepages were checked.
- Exposed data included emails, names, phone numbers, payment details, and API keys (e.g., Gemini, Google Maps).
- A follow-up showed **unauthenticated writes**: a crafted POST set `"payment_status": "paid"`, bypassing Stripe.
- Root cause: the client uses Supabase's public `anon` key, so anyone can query the backend directly, bypassing frontend controls. Lovable-generated apps often lacked correct RLS.
- Timeline: Lovable notified 2025-03-21; Lovable 2.0 with a "security scan" released 2025-04-24; CVE published 2025-05-29.
- The author says the scanner "only checks whether any RLS policy exists, not whether it is correct", giving "a false sense of security".

— [Matt Palmer: Statement on CVE-2025-48757](https://mattpalmer.io/posts/statement-on-CVE-2025-48757/)

A secondary write-up gives the same 303 endpoints / 170 projects figures. — [Superblocks](https://www.superblocks.com/blog/lovable-rls-breach)

**Moltbook (disclosed by Wiz, early February 2026)**
- A Supabase API key was hardcoded in client-side JavaScript and the database "completely lacked Row Level Security", allowing unauthenticated **read and write** access to production.
- Exposed: roughly 1.5 million API keys and about 35,000 emails per Wiz; other outlets say 30,000. Private agent conversations were also exposed.
- Fixed after disclosure, after multiple remediation rounds.

— [Wiz: Hacking Moltbook](https://www.wiz.io/blog/exposed-moltbook-database-reveals-millions-of-api-keys); [Infosecurity Magazine](https://www.infosecurity-magazine.com/news/moltbook-exposes-user-data-api/)

**Other references**
- Supabase's checklist: without RLS and reasonable policies, "any client can access and modify data". — [Supabase production checklist](https://supabase.com/docs/guides/deployment/going-into-prod)
- GitGuardian maintains a remediation page for leaked "Supabase service role JWT" secrets. This indicates these keys are a known, actively detected leak type. — [GitGuardian remediation: Supabase service role JWT](https://www.gitguardian.com/remediation/supabase-service-role-jwt)

### Inferences
**Common root causes**
1. RLS disabled, or tables created by SQL/migrations without RLS (lint `0013`).
2. Policies like `using (true)` on sensitive tables (lint `0024`).
3. Trusting the frontend for authorization or payment status.
4. Secret/`service_role` keys in client bundles or committed `.env` files.
5. AI-generated code shipped without review.

**What applies to sites.jurelabs.si.** The site avoids all five today: no key in the client, and the insert goes through a server route. The risk returns when client portals are built (especially with AI coding tools), so add RLS tests and run the Advisor before each launch.

### Gaps
- I found no reliable, dated public incident specifically about a leaked Supabase `service_role` key from GitHub with impact figures. Only generic detection and remediation pages surfaced.
- Lovable's official post-mortem was not found. Secondary sources disagree on some details, such as whether 1,645 apps were "scanned" or "analyzed".

## Backups, recovery and "nobody can destroy anything"

### Takeaway
Supabase Free has no automatic backups, so a business with lead data should be on Pro at least.
- Pro: 7 days of daily backups.
- PITR: about $100/month per 7 days of retention, requires Small compute or larger, worst-case RPO 2 minutes.
- Database backups do **not** include Storage files, and Supabase's physical backups cannot be downloaded.

So an independent, encrypted, off-site logical dump is the key "nobody can destroy it" control. Ideally it is immutable and written with credentials that cannot delete it. Pair it with separate prod/dev projects and deploy-from-Git migrations.

### Cited Findings
**Daily backups and PITR**
- Daily backups: Pro last 7 days, Team 14 days, Enterprise up to 30 days. For free-tier projects the docs recommend regular `supabase db dump` exports kept off-site. — [Supabase backups](https://supabase.com/docs/guides/platform/backups)
- PITR is an add-on for Pro/Team/Enterprise and requires "at least a Small compute add-on". Granularity is seconds, worst-case RPO two minutes. — [Supabase backups](https://supabase.com/docs/guides/platform/backups)
- PITR pricing: 7 days $0.137/h (~$100/month), 14 days $0.274/h (~$200), 28 days $0.55/h (~$400). Enabling PITR stops daily backups. — [Supabase backups](https://supabase.com/docs/guides/platform/backups)
- Pricing page: Free "Not included", Pro "7 days", Team "14 days", Enterprise "Custom"; PITR "$100 per month per 7 days retention". — [Supabase pricing](https://supabase.com/pricing)

**Restore behavior and limits**
- The project is inaccessible during a restore, and downtime grows with DB size.
- Subscriptions and replication slots must be dropped before restoring and recreated after.
- Custom role passwords are not stored and must be reset after a restore.
- Storage objects are not in DB backups (only metadata), so restoring doesn't bring back deleted files.
- All projects on Postgres `15.8.1.079`+ use physical backups. Daily physical backups cannot be downloaded; use the CLI/`pg_dump` for logical backups.

— [Supabase backups](https://supabase.com/docs/guides/platform/backups)

**Production checklist items on durability**
- "Free Plan backups can't be downloaded".
- Disks have 99.8–99.9% durability.
- Enable PITR for databases over 4 GB.
- Connect GitHub and "Deploy to production" from `main` instead of manual `supabase db push`.
- On Pro, consider branching to test migrations.

— [Supabase production checklist](https://supabase.com/docs/guides/deployment/going-into-prod)

**Branching price.** "$0.01344 per branch, per hour" on Pro/Team. — [Supabase pricing](https://supabase.com/pricing)

**Official off-site backup workflow (GitHub Actions)**
- Steps: `supabase/setup-cli@v1`, then
  - `supabase db dump --db-url "$supabase_db_url" -f roles.sql --role-only`
  - `supabase db dump --db-url "$supabase_db_url" -f schema.sql`
  - `supabase db dump --db-url "$supabase_db_url" -f data.sql --data-only --use-copy`
- Schedule: cron `'0 0 * * *'` (daily).
- The connection string is held in the `SUPABASE_DB_URL` secret.
- The example commits the dumps back to the repo.
- Warning: "Never backup your data to a public repository."

— [Supabase: Automated backups using GitHub Actions](https://supabase.com/docs/guides/deployment/ci/backups)

**Free-plan constraints.** Free projects pause after 1 week of inactivity, with a limit of 2 active projects. — [Supabase pricing](https://supabase.com/pricing)

### Inferences
**Recommended backup plan for a solo operator**
1. Supabase Pro daily backups as the first line.
2. A nightly GitHub Actions job runs the three `supabase db dump` commands, encrypts the result (e.g., `age`/`gpg` with a public key; the private key kept offline), and uploads it to object storage (S3/Backblaze B2/Cloudflare R2) in a bucket with versioning and object lock/retention. Use a write-only upload key that cannot delete.
3. Copy Storage buckets separately, since DB backups don't include files.
4. Run a quarterly test restore into a scratch Supabase project.
5. Add PITR only once losing a day of leads is unacceptable or the DB exceeds 4 GB.

Committing dumps of personal data into a Git repository, even a private one, spreads PII into every clone and fork. Encrypted object storage is preferable.

**"Nobody can destroy anything" controls**
- Separate prod and dev Supabase projects; preview/dev never hold production credentials.
- Schema changes only through migrations deployed from `main`.
- No production DB password or secret key on the laptop.
- Least-privilege grants: the function key cannot `delete`.
- MFA on all owner accounts.
- Backups stored outside the blast radius of the Supabase/GitHub accounts.

### Gaps
- Exact restore commands (psql order, `session_replication_role`) were not on the page read. They are in Supabase's "Migrating and Upgrading" / backup-restore guides, which were not fetched.
- Object-lock and immutability specifics and pricing for S3, B2 and R2 were not verified in this session.
- No Supabase project-deletion-protection feature was found. Whether a deleted project can be recovered by support was not verified.

## Vercel platform security: Firewall/WAF, rate limiting, BotID, DDoS, Deployment Protection, env vars, team security (Hobby vs Pro)

### Takeaway
Available on every plan: DDoS mitigation (automatic, no configuration), the WAF, WAF rate limiting, BotID Basic, and Standard Deployment Protection.

Hobby limits:
- 3 custom WAF rules, only 1 of which can be a rate limit.
- 10 IP blocks.
- No Password Protection.
- Commercial use is not allowed at all.

Pro raises the WAF to 40 rules and adds BotID Deep Analysis ($1 per 1,000 checks) and Password Protection ($20/month per project). The OWASP managed ruleset, Trusted IPs and token-bucket rate limiting are Enterprise-only.

Since 2026, env vars are typed "Config" (readable) or "Secret" (write-only), and a team policy can force production secrets to differ from preview/dev values.

### Cited Findings
**DDoS and WAF**
- "DDoS Mitigation is available on all plans": automated, "regardless of the plan". The platform-wide firewall is "available for free for all customers without any configuration required". (last_updated 2026-09-10) — [Vercel Firewall](https://vercel.com/docs/vercel-firewall)
- Rule order: DDoS mitigation → IP blocking → custom rules → managed rulesets. — [Vercel Firewall](https://vercel.com/docs/vercel-firewall)
- WAF tools include Custom Rules, IP Blocking, Managed Rulesets and "Attack Mode". Firewall alerts and Drains to a SIEM are available for monitoring. — [Vercel Firewall](https://vercel.com/docs/vercel-firewall)
- "Vercel WAF is available on all plans". Configuration changes take effect globally within 300 ms, and there is instant rollback via the firewall audit log. (last_updated 2026-07-29) — [Vercel WAF](https://vercel.com/docs/vercel-firewall/vercel-waf)

WAF limits per project — [Vercel WAF](https://vercel.com/docs/vercel-firewall/vercel-waf):

| | Hobby | Pro | Enterprise |
|---|---|---|---|
| Custom rules | 3 | 40 | 250 |
| Project IP blocks | 10 | 40 | 250 |
| System bypass rules | N/A | 10 | 75 |
| OWASP core ruleset | N/A | N/A | Available |

**Rate limiting.** Available on all plans. Each rule has an action (default 429; or Log, Deny, Challenge). Counters are per region. (last_updated 2026-08-28) — [Vercel WAF Rate Limiting](https://vercel.com/docs/vercel-firewall/vercel-waf/rate-limiting)

| | Hobby | Pro | Enterprise |
|---|---|---|---|
| Counting keys | IP, JA4 | IP, JA4 | IP, JA4, plus UA/headers |
| Algorithm | Fixed window | Fixed window | Fixed window or token bucket |
| Window | 10 s – 10 min | 10 s – 10 min | up to 1 h |
| Rules | 1 per project | 40 | 250 |
| Included | 1,000,000 allowed requests | Usage-based | Custom |

**BotID** (last_updated 2026-06-16) — [Vercel BotID](https://vercel.com/docs/botid)
- An invisible CAPTCHA: the client-side challenge is verified with `checkBotId()` on the server.
- Basic is free on all plans. Deep Analysis (Kasada) is Pro at "$1/1000 `checkBotId()` Deep Analysis calls", custom on Enterprise.
- A changelog entry says BotID is "now available for all frameworks".

**Deployment Protection** (last_updated 2026-09-15) — [Vercel Deployment Protection](https://vercel.com/docs/deployment-protection)
- Standard Protection, which protects all deployments except production domains, is available on all plans. So is All Deployments.
- Password Protection is Pro "$20 per month per protected project", not on Hobby. Trusted IPs is Enterprise-only.
- Protected Source Maps can gate `.map` files behind Vercel Authentication.
- When Standard Protection is enabled, `VERCEL_URL`/`VERCEL_BRANCH_URL` are no longer publicly accessible.

**Environment variables** (last_updated 2026-08-28) — [Vercel Config and Secret environment variables](https://vercel.com/docs/environment-variables/sensitive-environment-variables)
- Two types: **Config** (readable) and **Secret** (write-only after saving).
- Secret values of 32+ characters are redacted from build logs, with an Activity Log event.
- The legacy "Enforce Sensitive Environment Variables" policy is deprecated. It is replaced by the owner-controlled team policy "Separate Production Secret Values" → "Require Separate Values": each Secret must use a different value in Production than in Preview/Development.

**Team security**
- Team-wide 2FA enforcement is under Team Settings → Security & Privacy. CI/CD tokens of users without 2FA stop working, and builds fail for members without 2FA. (last_updated 2026-08-28) — [Vercel Two-factor enforcement](https://vercel.com/docs/two-factor-enforcement)
- SAML SSO can be enforced so members cannot access team information without a SAML-authenticated session. — [Vercel SAML SSO](https://vercel.com/docs/saml)

**Hobby is non-commercial only.** (last_updated 2026-09-14) — [Vercel Fair Use Guidelines](https://vercel.com/docs/limits/fair-use-guidelines)

### Inferences
**Concrete Vercel setup for sites.jurelabs.si**
1. Move to Pro (commercial use).
2. Add a WAF rate-limit rule: `Request Path equals /api/povprasevanje AND Method equals POST`, 60 s window, about 5 requests per IP, action Deny/429. Start in Log mode for a day, then enforce.
3. Optionally add a custom rule challenging or denying non-browser user agents on that path.
4. Use Standard Deployment Protection, with previews pointing at a dev Supabase project.
5. Store all Supabase/Turnstile/email-API keys as Secret type, Production-only, with "Require Separate Values" on.
6. Enforce 2FA on the team.
7. Turn on Firewall alerts.
8. During an attack, use Attack Mode and IP blocks; roll back a bad firewall config from the audit log.

Turnstile is already integrated, so BotID is optional. It is mainly worth adding if bots start passing Turnstile.

### Gaps
- Not confirmed:
  - The exact plan availability and current naming of "Attack Mode" (formerly "Attack Challenge Mode"). It is listed under the WAF, which is available on all plans.
  - The plan availability of the Bot Protection and AI-bots managed rulesets.
  - The plan availability of Vercel's team audit log; third-party pages say Enterprise only.
  - Vercel SAML SSO plan and price.
  - The current Pro seat price.

## Next.js/React application security and recent advisories (2025–2026)

### Takeaway
The current sites.jurelabs.si is a static Vite site with a serverless function, so the React Server Components and Next.js CVEs do not apply to it today. They will matter as soon as client sites use Next.js App Router.

The 2025–2026 record is severe:
- CVE-2025-29927 middleware authorization bypass (CVSS 9.1).
- "React2Shell" CVE-2025-55182, unauthenticated RCE (CVSS 10.0), plus follow-up denial-of-service and source-exposure CVEs.
- In 2026 Next.js moved to formal monthly security releases, with critical out-of-band fixes on 2026-09-22 and 2026-10-14.

The rules that follow:
- Patch promptly.
- Never rely on middleware/proxy alone for authorization.
- Treat every Server Action and Route Handler as a public POST endpoint (authN, authZ, zod validation).
- Keep secrets out of `NEXT_PUBLIC_` variables.
- Set a CSP and security headers.

### Cited Findings
**CVE-2025-29927** (GHSA-f82v-jwr5-mffw) — [GitHub Advisory GHSA-f82v-jwr5-mffw](https://github.com/advisories/GHSA-f82v-jwr5-mffw)
- CVSS 9.1. Authorization checks performed in middleware can be bypassed.
- Affected: 12.0.0–<12.3.5, 13.0.0–<13.5.9, 14.0.0–<14.2.25, 15.0.0–<15.2.3. Patched: 12.3.5 / 13.5.9 / 14.2.25 / 15.2.3.
- Workaround: block external requests that contain the `x-middleware-subrequest` header.
- Vercel-hosted deployments were "automatically protected". Published 2025-03-21.

**CVE-2025-55182 ("React2Shell")** — [React blog, 2025-12-03 (updated 2026-01-26)](https://react.dev/blog/2025/12/03/critical-security-vulnerability-in-react-server-components)
- CVSS 10.0, unauthenticated RCE via crafted requests to Server Function endpoints. Apps may be vulnerable "even if your app does not implement any React Server Function endpoints" if they support RSC.
- Affected: `react-server-dom-webpack/parcel/turbopack` 19.0, 19.1.0, 19.1.1, 19.2.0. Fixed: 19.0.1 / 19.1.2 / 19.2.1.
- Affected frameworks include `next`, `react-router`, `waku`, `@vitejs/plugin-rsc` and others.
- Next.js fixed versions: 14.2.35, 15.0.8, 15.1.12, 15.2.9, 15.3.9, 15.4.11 (the page also says 15.4.10 elsewhere), 15.5.10, 16.0.11, 16.1.5.
- Follow-ups: CVE-2025-55184 and CVE-2025-67779 (DoS, 7.5); CVE-2025-55183 (source code exposure, 5.3); CVE-2026-23864 (DoS, 7.5, 2026-01-26).
- Timeline: reported 2025-11-29, fixed and disclosed 2025-12-03.
- Hosting-provider mitigations exist "but the page says not to rely on them".

**Next.js advisories and the 2026 release program**
- Next.js published "Security Advisory: CVE-2025-66478" (2025-12-03) for the RSC issue, and a further update on 2025-12-11. — [Next.js blog](https://nextjs.org/blog)
- In 2026 the blog shows:
  - a formal security release process (2026-07-13);
  - scheduled security releases on 2026-07-20, 2026-08-25 and 2026-09-30;
  - out-of-band critical updates on 2026-09-22 and 2026-10-14;
  - an "Upcoming Next.js November Security Release" for **2026-11-03**.

  — [Next.js blog](https://nextjs.org/blog); [Next.js security release program](https://nextjs.org/blog/next-security-release-program)
- 2026-10-14 out-of-band update. Fixed in **16.4.1** (Active LTS) and **15.5.28** (Maintenance LTS): — [Next.js Security Update, 2026-10-14](https://nextjs.org/blog/nextjs-security-update-october-14-2026)
  - GHSA-673q-mjm6-r5xr: unauthenticated RCE in `use cache` functions returning multiple typed arrays (App Router + Cache Components). No workaround.
  - CVE-2026-96889 / GHSA-2464-fhr4-w9xw: RCE in Image Optimization with SVG on glibc Linux. Workaround: `sharp` ≥ 0.35.5.
  - GHSA-p3m5-59mp-jv5r: Server Actions DoS (High).
- Secondary sources, not verified against the official posts:
  - August 2026 release: CVE-2026-75604, a Windows-only path traversal (CVSS 9.0), fixed in 15.5.24/16.3.3, plus an AVIF-related RCE.
  - 2026-09-22: CVE-2026-94545, RCE in `next/og` ImageResponse (16.2.0–16.3.5), fixed in 16.3.6.
  - Sources disagree on the CVSS of CVE-2026-96889 (9.5 vs 7.8).

  — [The Hacker News, Aug 2026](https://thehackernews.com/2026/08/nextjs-patches-critical-avif-and.html); [SecurityOnline](https://securityonline.info/nextjs-rce-vulnerability-cve-2026-94545/); [NHS England cyber alert](https://digital.nhs.uk/cyber-alerts/2026/cc-4873)

**Data security guidance** (lastUpdated 2026-10-06) — [Next.js data security guide](https://nextjs.org/docs/app/guides/data-security)
- Server Actions are "reachable via a direct POST request, not just through your application's UI". Verify authentication **and** authorization inside each action; a page-level check does not extend to actions.
- Validate all client input. Return only what the UI needs. Rate-limit expensive operations such as sending emails or writing to a DB.
- Built-in CSRF defense: actions are POST-only and compare `Origin` to `Host`/`X-Forwarded-Host`, aborting on mismatch. Use `serverActions.allowedOrigins` for proxies.
- Use a Data Access Layer with `import 'server-only'`, and only the DAL accesses `process.env`. `NEXT_PUBLIC_`-prefixed variables are exposed to the client. React Taint APIs exist.
- Audit `proxy.ts` and `route.ts` "extra".

**CSP guidance** (lastUpdated 2026-03-20) — [Next.js CSP guide](https://nextjs.org/docs/app/guides/content-security-policy)
- In current Next.js, nonce-based CSP is implemented in `proxy.ts` (the former middleware), producing headers like `script-src 'self' 'nonce-…' 'strict-dynamic'`, `object-src 'none'`, `base-uri 'self'`, `form-action 'self'`, `frame-ancestors 'none'`.
- Nonces force dynamic rendering: static optimization and ISR are disabled and PPR is incompatible.
- Alternatives: experimental SRI hash-based CSP (App Router only), or a static CSP via `next.config.js` `headers()` with `'unsafe-inline'`.

### Inferences
**Baseline for client Next.js sites**
1. Stay on a supported LTS line (16.4.x or 15.5.x as of Oct 2026) and apply each monthly security release within days. Enable Dependabot security updates.
2. Do authorization in the DAL and in every Server Action and Route Handler, never only in `proxy.ts`/middleware (lesson of CVE-2025-29927).
3. Validate inputs with zod (`safeParse`) and cap lengths.
4. Never put a Supabase secret key in `NEXT_PUBLIC_*`. Use `server-only` on modules that read secrets.
5. Headers: CSP (SRI/static for marketing sites; nonces for app areas), HSTS, `frame-ancestors`/X-Frame-Options, `nosniff`, Referrer-Policy and Permissions-Policy, set via `next.config.js` `headers()` or `vercel.json`. The sites.jurelabs.si header set is a good template.
6. Do not self-host Next.js on Windows (CVE-2026-75604). Be aware that Image Optimization pulls in native `sharp`/`librsvg` code paths.

### Gaps
- The official text of the August and September 2026 Next.js posts was not fetched, so their CVE details rely on secondary sources.
- The contents of the 2026-11-03 Next.js release were not yet public.
- OWASP ASVS/Top 10 2025 mappings were not researched in this session.

## Form and bot abuse on the inquiry form (Turnstile vs hCaptcha vs BotID, honeypots, rate limiting, email bombing)

### Takeaway
The site already uses Cloudflare Turnstile, which is free and unlimited on the Free plan. That is a good choice, **provided** the server calls Siteverify on every submission and checks `success`, `hostname` and `action`.

Layered defense for a solo developer:
- Turnstile with server-side verification.
- A honeypot field and minimum fill time.
- Strict schema validation.
- One Vercel WAF rate-limit rule (available even on Hobby).
- No automatic emails to user-supplied addresses.

Vercel BotID (Basic free, Deep Analysis paid) is an alternative or extra layer.

### Cited Findings
**Turnstile server-side validation** — [Cloudflare Turnstile server-side validation](https://developers.cloudflare.com/turnstile/get-started/server-side-validation/)
- Endpoint: `POST https://challenges.cloudflare.com/turnstile/v0/siteverify` with `secret` and `response` (optionally `remoteip` and `idempotency_key`).
- Tokens are "valid for 300 seconds", "can only be validated once", and at most 2048 characters long.
- "Tokens can be forged". "The client-side widget alone does not protect your forms."
- Check `success` and validate `hostname` and `action`. A reused token returns `timeout-or-duplicate`.

**Turnstile plans** — [Cloudflare Turnstile plans](https://developers.cloudflare.com/turnstile/plans/)
- Free: up to 20 widgets, 10 hostnames per widget, unlimited challenges/verification requests, 7-day analytics.
- Usable without other Cloudflare services.
- Enterprise adds ephemeral IDs and "Offlabel".

**Other layers**
- Vercel BotID: Basic is free on all plans; Deep Analysis costs $1 per 1,000 `checkBotId()` calls on Pro; available "for all frameworks" per the changelog link. — [Vercel BotID](https://vercel.com/docs/botid)
- Vercel WAF rate limiting is on all plans, with 1 rule on Hobby. Vercel also publishes a KB guide on building a honeypot with the WAF. — [Vercel WAF Rate Limiting](https://vercel.com/docs/vercel-firewall/vercel-waf/rate-limiting)
- Next.js guidance: "For expensive operations (sending emails, writing to a database), consider adding rate limiting to prevent abuse." — [Next.js data security guide](https://nextjs.org/docs/app/guides/data-security)
- Supabase Auth's built-in email sender is limited to 2 emails/hour by default. With custom SMTP the default is 30 new users/hour. CAPTCHA can protect sign-up, sign-in and reset. — [Supabase production checklist](https://supabase.com/docs/guides/deployment/going-into-prod)

### Inferences
**Handler order for `/api/povprasevanje`**
1. Reject non-POST requests, wrong `Content-Type`, and bodies over a few KB.
2. Parse with a zod schema: lengths, email format, enum values for configurator options, consent boolean.
3. Drop the submission silently if the honeypot field is filled or the form was filled in under ~3 s.
4. Call Siteverify with the secret key, `remoteip` and an `idempotency_key`. Require `success`, `hostname === "sites.jurelabs.si"` and the expected `action`.
5. Insert with a least-privilege secret key.
6. Notify yourself only (e.g., one email or Slack message to the owner).

If you want an acknowledgement email to the submitter, send it only after a verified submission, cap it per recipient and IP, and avoid echoing user-provided text. Otherwise the form becomes an email-bombing or spam-relay tool.

**WAF rule.** Add a Vercel WAF fixed-window rule on the path (e.g., 5 per 60 s per IP) as a coarse outer limit.

**hCaptcha.** It is an alternative mainly when a non-Cloudflare vendor is preferred. With Turnstile already deployed and free, switching has little value.

### Gaps
- hCaptcha's 2026 free-tier terms and its privacy/GDPR positioning were not verified in this session.
- Upstash Ratelimit (`@upstash/ratelimit`) pricing and docs were not verified. Vercel's Rate Limiting SDK (`@vercel/firewall`) page exists but was not read in detail.
- Cloudflare's own GDPR/data-processing statements for Turnstile were not read. The legal side is covered by another researcher.

## Supply chain: npm worms (Shai-Hulud and successors) and practical defenses for a solo developer

### Takeaway
npm supply-chain attacks escalated through 2025–2026. The pattern: credential-stealing worms (Shai-Hulud in Sept 2025, Shai-Hulud 2.0 in Nov 2025, "Mini Shai-Hulud" waves April–June 2026, and keyv/CHAINDROP in August 2026) steal npm, GitHub, cloud and AI-tool tokens from developer machines and CI, then republish the victim's packages with install hooks.

The cheapest effective defenses:
- A release-age delay (npm `min-release-age` in days; pnpm `minimumReleaseAge`, which now defaults to 1 day).
- Blocking dependency install scripts by default.
- Lockfile + `npm ci`.
- 2FA/passkeys on npm and GitHub.
- No long-lived tokens on the laptop or in CI.
- GitHub secret scanning and push protection.

### Cited Findings
**keyv / CHAINDROP (August 2026)** — [Elastic Security Labs](https://www.elastic.co/security-labs/shai-hulud-chaindrop-npm-supply-chain)
- Identified by Elastic on 2026-08-04, published 2026-08-06.
- The `keyv` maintainer was compromised. The CHAINDROP worm used stolen npm credentials to backdoor every package the maintainer could publish.
- Scope: over 400 packages, including `keyv`, `flat-cache`, `cacheable-request`, `cacheable` and `cache-manager`; together over 1.3 billion monthly downloads.
- The payload scans for 300+ credential patterns: AI tool keys, AWS/GCP/Azure, GitHub, Vault, SSH, Kubernetes, npm.
- Propagation: it self-propagates if it finds an npm token with write access and `bypass_2fa`, adding a `preinstall` hook and republishing. It also plants a Claude Code `SessionStart` hook and a VS Code `folderOpen` task.
- Defenses listed:
  - A "soak period" for new versions.
  - Revoke and regenerate GitHub and npm tokens.
  - Check for commits "chore: update config" from `claude@users.noreply.github.com`.
  - Rotate cloud, CI and AI credentials.
  - Upgrade to **npm 12+, which blocks `preinstall` hooks by default**.
  - Use 2FA and avoid `bypass_2fa` tokens.

**Earlier 2026 waves** (secondary sources, aggregated) — [Aikido (TanStack)](https://www.aikido.dev/blog/mini-shai-hulud-is-back-tanstack-compromised); [Akamai](https://www.akamai.com/blog/security-research/mini-shai-hulud-worm-returns-goes-public); [Aikido (Red Hat)](https://www.aikido.dev/blog/red-hat-npm-packages-compromised-credential-stealing-worm); [CSA Singapore AD-2026-009](https://www.csa.gov.sg/alerts-and-advisories/advisories/ad-2026-009/)
- April 2026: SAP npm packages compromised via an npm token leaked from a malicious CircleCI pull-request build (2026-04-29).
- 2026-05-11: the "Mini Shai-Hulud" wave hit the TanStack dependency tree and spread to Mistral AI- and UiPath-related packages (Microsoft counted 170+ npm packages / 404 malicious versions).
- 2026-05-19: the `atool` account (`timeago.js`, `@antv`).
- June 2026: 30+ `@redhat-cloud-services` packages ("Miasma" variant).
- CSA Singapore reported 1,300+ affected package versions in the keyv wave.

**2025.** Microsoft published detection and defense guidance for Shai-Hulud 2.0 on 2025-12-09. — [Microsoft Security blog](https://www.microsoft.com/en-us/security/blog/2025/12/09/shai-hulud-2-0-guidance-for-detecting-investigating-and-defending-against-the-supply-chain-attack/)

**npm settings** (v11 CLI docs, shown as "Version 11.21.1 (Legacy)") — [npm config docs](https://docs.npmjs.com/cli/v11/using-npm/config)
- `min-release-age` (days; default `null`; "only versions that were available more than the given number of days ago will be installed").
- `before` (date).
- `ignore-scripts` (default `false`).
- `allow-scripts` (allow-list of packages whose install scripts may run), `strict-allow-scripts` (turns the policy from a warning into an error), `dangerously-allow-all-scripts`.
- `allow-git` (`all`/`none`/`root`), plus `allow-file`/`allow-directory`/`allow-remote`.
- `audit-level`.

**pnpm settings** — [pnpm supply-chain security](https://pnpm.io/supply-chain-security)
- Dependency build scripts don't run unless listed in `allowBuilds`.
- `strictDepBuilds` is on: an install fails on unapproved build scripts.
- `blockExoticSubdeps` is on.
- `minimumReleaseAge` defaults to `1440` minutes (1 day); `10080` waits a week.
- `trustPolicy: no-downgrade` blocks packages whose trust level dropped.
- Commit `pnpm-lock.yaml`.

**Other package managers** (secondary, conflicting) — [lilting.ch](https://lilting.ch/en/articles/pnpm-11-minimum-release-age-default-shai-hulud-defense); [mcollina gist](https://gist.github.com/mcollina/b294a6c39ee700d24073c0e5a4e93104)
- npm `min-release-age` arrived in npm 11.10 (Feb 2026), off by default.
- pnpm's 1-day default came with pnpm 11.0.
- Yarn has `npmMinimalAgeGate` (minutes, 4.10+).
- Bun's `minimumReleaseAge` is reported in seconds (bunfig.toml, v1.3+), but another source says it is still being tracked.
- `npx`/`bunx` may not honor these settings.

**GitHub.** Partner secrets found in public repositories are automatically reported to the issuer, and the October 2026 detectors include Supabase OAuth and scoped PAT tokens. — [GitHub changelog 2026-10-05](https://github.blog/changelog/2026-10-05-secret-scanning-adds-detectors-for-lovable-supabase-and-more)

### Inferences
**Solo-developer baseline (about 1 hour)**
1. Use pnpm 11, or npm 12 with `min-release-age=3` (days) in the project `.npmrc`.
   - Keep install scripts blocked except an explicit allow-list (`allowBuilds` / `allow-scripts` + `strict-allow-scripts=true`).
   - Mind the unit difference: npm counts days, pnpm counts minutes.
2. Commit the lockfile. CI and Vercel install with `npm ci` / `pnpm install --frozen-lockfile`.
3. Pin exact versions for critical deps and let Dependabot or Renovate propose updates. Configure Renovate's `minimumReleaseAge` to match.
4. Accounts: passkeys/2FA on GitHub and npm; no classic or long-lived npm tokens; never `bypass_2fa` tokens.
5. Turn on GitHub secret scanning and push protection on all repos, and branch protection on `main` (no force-push; Vercel production only from `main`).
6. Keep secrets out of the laptop where possible: use `vercel env pull` only for dev values, never production secrets.
7. Be careful with AI coding agents and editor auto-run hooks. The CHAINDROP worm planted Claude Code and VS Code hooks, so review `.claude/`/`.vscode/` changes in PRs.

### Gaps
- Not verified against official npm/GitHub posts:
  - npm 12's release date and its exact default install-script policy (asserted by Elastic).
  - npm's 2025–2026 token policy changes (granular token expiry, removal of classic tokens, trusted publishing).
- The exact availability of push protection for private personal repos without GitHub Secret Protection (a paid add-on) was not verified.
- The September 2025 chalk/debug compromise and the original Shai-Hulud (Sept 2025) details were not re-researched in this session.

## Incident response for a solo operator (key leak, data exposure, destructive change)

### Takeaway
Write a one-page runbook before you need it:
1. **Contain**: rotate the leaked key, block the attacker at the Vercel WAF, pause the vulnerable function or revoke grants.
2. **Assess**: logs, which tables and rows.
3. **Recover**: restore from a backup or PITR, or from the off-site dump.
4. **Notify**: if personal data was exposed and there is a risk to people, notify the Slovenian supervisory authority (Informacijski pooblaščenec) within 72 hours of becoming aware (GDPR Art. 33), and document every breach either way. The legal details are covered by the legal researcher.

### Cited Findings
- **Supabase key rotation:** fix the leak, create a new secret key, switch components, delete the old key (irreversible), or retire it immediately if it is being actively abused. For legacy keys, deactivate them and move to JWT signing keys. — [Supabase: Rotate a leaked or compromised API key](https://supabase.com/docs/guides/security/rotate-leaked-api-keys)
- **Vercel secrets:** Secret env vars are rotated by entering a new value; redeploy to apply. (last_updated 2026-08-28) — [Vercel Config and Secret environment variables](https://vercel.com/docs/environment-variables/sensitive-environment-variables)
- **Vercel firewall during an incident:**
  - Config changes take effect within 300 ms and can be rolled back from the audit log.
  - IP blocking and custom rules are available on all plans.
  - Firewall alerts and Drains support detection.

  — [Vercel WAF](https://vercel.com/docs/vercel-firewall/vercel-waf); [Vercel Firewall](https://vercel.com/docs/vercel-firewall)
- **Cutting off Data API access.** Two levers stop REST endpoints from responding:
  - revoke grants, e.g. `revoke all on table … from anon, authenticated, service_role`;
  - disable the Data API, after which none of the REST endpoints respond.

  — [Supabase changelog #45329](https://supabase.com/changelog/45329-breaking-change-tables-not-exposed-to-data-and-graphql-api-automatically); [Supabase: Hardening the Data API](https://supabase.com/docs/guides/database/hardening-data-api)
- **Restores:** the project is offline during a restore. Storage files are not restored by DB backups. Custom role passwords must be reset. — [Supabase backups](https://supabase.com/docs/guides/platform/backups)
- **Log retention limits forensics:** API and Database logs are kept 1 day on Free and 7 days on Pro. — [Supabase pricing](https://supabase.com/pricing)
- **GDPR Art. 33:**
  - Notify the supervisory authority "where feasible, not later than 72 hours after having become aware of it", unless the breach is "unlikely to result in a risk to the rights and freedoms of natural persons".
  - Art. 33(5): "The controller shall document any personal data breaches…".

  — [GDPR Art. 33 (gdpr-info.eu)](https://gdpr-info.eu/art-33-gdpr/)
- **npm worm compromise:** revoke and regenerate GitHub and npm tokens, rotate cloud/CI/AI credentials, and audit repos for injected commits and hooks. — [Elastic Security Labs](https://www.elastic.co/security-labs/shai-hulud-chaindrop-npm-supply-chain)

### Inferences
**Runbook outline**
1. Have an "emergency" note with links to: Supabase API Keys, Data API settings, Backups; Vercel Firewall, Env Vars, Deployments; the GitHub token settings; the Turnstile dashboard; and the IP RS breach-report page.
2. **Key leak:**
   1. Create a new `sb_secret_`, update the Vercel Secret, redeploy, and delete the old key.
   2. If a legacy JWT leaked, disable the legacy keys and rotate the JWT secret/signing keys.
   3. Change the DB password if a connection string leaked.
   4. Rotate Turnstile/email API keys if they were in the same place.
3. **Data exposure via missing RLS/grants:**
   1. Immediately `revoke` grants or enable RLS.
   2. Export the relevant logs before the 1-day or 7-day retention expires.
   3. Determine the scope.
   4. Run the GDPR assessment and 72-h notification decision.
4. **Destructive change:**
   1. Restore to a new or scratch project first to extract data, rather than restoring production in place.
   2. Otherwise use PITR or a daily backup, or rebuild from the encrypted off-site dump.
5. **Worm or laptop compromise:** rotate every token reachable from the laptop and CI, and review recent commits and `.claude/`/`.vscode/` hooks.
6. Afterwards, add an Advisor or regression test so the same failure cannot recur.

### Gaps
- Not verified in this session:
  - The exact procedure to invalidate all Supabase Auth sessions or refresh tokens after a JWT secret compromise.
  - The Slovenian Information Commissioner's (IP RS) current online breach-notification form and URL. That belongs to the legal researcher's scope.
