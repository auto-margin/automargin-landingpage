# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

AutoMargin marketing/landing site — a Next.js 16 (App Router, React 19, Turbopack) app for the AutoMargin product (vehicle market intelligence for European dealers). Production site: https://auto-margin.com.

## Commands

- `npm run dev` — local dev server (Turbopack)
- `npm run build` — production build
- `npm run start` — serve the production build
- `npm run lint` / `npm run lint:fix` — ESLint over the repo (skips `.next/` and `out/`)
- `npm run format` — Prettier write across the repo

No test runner is configured.

Node engine: `>=20.19.0 <23` (per `package.json`).

## Architecture

### Routing & i18n

- App Router with internationalized routes under `src/app/[locale]/`. Locales: `en`, `sv`, `de`, `es`, `dk` (default `en`), defined in `src/i18n/routing.ts`.
- Translation messages live in `messages/<locale>.json` and are loaded via `src/i18n/request.ts`.
- The locale middleware lives at `src/proxy.ts` (uses `createMiddleware` from `next-intl`). Treat this as the project's middleware entry point — do not duplicate it as `middleware.ts` without intent.
- Root `src/app/layout.tsx` sets up fonts, theme, analytics, and `NextIntlClientProvider`. `src/app/[locale]/layout.tsx` validates the locale and calls `setRequestLocale`.
- Non-localized routes also exist directly under `src/app/` (e.g. `api/`, `privacy/`, `robots.ts`, `sitemap.ts`).

### UI layer

- shadcn/ui (`new-york` style, `neutral` base, Lucide icons) — see `components.json`. Path aliases: `@/components`, `@/components/ui`, `@/lib`, `@/lib/utils`, `@/hooks`. Extra shadcn registries: `@formcn`, `@magicui`.
- Tailwind v4 via `@tailwindcss/postcss`; styles in `src/styles/globals.css` and `src/styles/motion.css`.
- Component organization:
  - `src/components/ui/` — primitives (Radix-based shadcn components).
  - `src/components/blocks/` — page sections (hero, pricing, navbar, footer, etc.).
  - `src/components/` (top level) — cross-cutting widgets (theme, language selector, status cards, animated lists/beams).
  - `src/features/<name>/` — self-contained product features (e.g. `features/alice/` chatbot + knowledge).

### Server actions & APIs

- Form submissions use `next-safe-action`. The shared client is `src/actions/safe-action.ts`; the contact submission lives in `src/actions/server-action.ts` and posts to `process.env.BACKEND_CONTACT_URL`.
- Validation: `zod` schemas in `src/lib/form-schema.ts`; React Hook Form via `@hookform/resolvers`.
- API routes under `src/app/api/`: `alice/route.ts` (ALICE chatbot proxying OpenAI Responses API) and `demo/calculate/`.

### Anti-abuse & rate limiting

- All anti-abuse for forms and the chatbot flows through `src/lib/`:
  - `rate-limit.ts` — Upstash Redis sliding-window limits per surface (contact: `5/10m` + burst `2/30s`; demo: `1/24h`; ALICE: `12/10m` + burst `4/1m`).
  - `anti-bot.ts` — honeypot field + minimum submit time check (used by the contact action).
  - `request-identity.ts` — derives the per-request identity used as the rate-limit key.
- Required env: `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`, `BACKEND_CONTACT_URL`, `OPENAI_API_KEY`, optional `ALICE_MODEL` (default `gpt-5-nano`). See `docs/form-hardening.md` and `.env.example`.

### Security headers

- CSP and other security headers are set in `next.config.ts` via `headers()`. In dev the CSP is `Content-Security-Policy-Report-Only`; production switches to enforced `Content-Security-Policy` plus HSTS. When adding third-party scripts, fonts, or fetch destinations, update the matching `*-src` directive there.

### Feature flags

- Public flags are read from `NEXT_PUBLIC_*` env vars in `src/lib/feature-flags.ts` (e.g. `ENABLE_SELF_SERVE_PRICING`).

## Conventions

- TypeScript strict mode, path alias `@/*` → `src/*`.
- ESLint uses the official Next flat config (`eslint-config-next`) with overrides in `eslint.config.mjs`. Notable enforced rule: `import/order` with grouping (`react` and `next/**` as builtins, `@/**` as internal) and alphabetized imports separated by blank lines — match this when adding imports.
- Prettier: double quotes, semicolons, 2 spaces, trailing commas, `prettier-plugin-tailwindcss` for class sorting. `src/styles/globals.css` uses a wider 180-col print width.
- `console.*` is a lint warning — keep production code free of stray logs.

---

# Capability Usage Policy

This project has access to skills (knowledge playbooks) and MCP servers (live tool integrations) that significantly improve answer quality. **Capability availability does not guarantee capability usage.** The rules below are explicit policy for when to invoke each — Claude must follow them, not rely on auto-trigger.

## Decision Heuristic (read first)

Before answering any non-trivial coding question in this repo, ask internally:

1. **Will the answer be substantively better with a skill consulted?** If yes → invoke the skill before answering.
2. **Does the question depend on current library docs or external state?** If yes → invoke the relevant MCP before answering.
3. **Is this a trivial Q&A (syntax, single-line answers, naming)?** If yes → answer directly without invocation. Don't over-invoke for simple things.

The trade-off is real: invoking skills adds 10–30s. Don't pay that cost on questions where you're confident in the answer and the skill wouldn't add depth.

## Skill Invocation Rules

For each skill below: **trigger conditions → required action → when to skip**.

### vercel-react-best-practices

- **Trigger:** Any task involving React component refactoring, performance review, data fetching patterns, bundle optimization, or "should I refactor X" questions about React/Next.js code.
- **Required:** Invoke the skill via `Skill(skill="vercel-react-best-practices")` BEFORE answering. Cite specific rule names from its rule set (e.g., `async-parallel`, `server-cache-react`, `bundle-barrel-imports`) in the response.
- **Skip when:** Pure syntax questions ("what's the import for X"), naming/styling questions, or non-React tasks.

### vercel-composition-patterns

- **Trigger:** Designing new component hierarchies, deciding server vs. client component boundaries, splitting/extracting components, or questions about prop passing patterns and component coupling.
- **Required:** Invoke before proposing any non-trivial component structure.
- **Skip when:** Modifying internals of an existing component without changing its boundaries.

### vercel-react-view-transitions

- **Trigger:** Implementing or debugging page transitions, view transitions API usage, navigation animations, or shared element transitions in Next.js.
- **Required:** Invoke before writing any transition code.
- **Skip when:** Static UI work, non-animated navigation, or component-internal animations (those are CSS/Framer-Motion territory, not view transitions).

### web-design-guidelines

- **Trigger:** UI accessibility audits, design system reviews, "review my UI" requests, or any task explicitly checking compliance with web standards.
- **Required:** Invoke before producing review findings.
- **Skip when:** Building new components from scratch (use `vercel-composition-patterns` instead) or pure layout work without an audit ask.
- **Note:** This skill fetches guidelines fresh from a Vercel-Labs URL via WebFetch on each invocation. The fetched URL should be `https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md`. If it fetches anything else, stop and flag.

### review

- **Trigger:** Pre-commit code review requests, "review this PR/file", or before producing diff summaries.
- **Required:** Invoke before producing any structured code review output.
- **Skip when:** Just reading code to understand it (not producing review feedback).

### security-review

- **Trigger:** Any change touching `src/lib/rate-limit.ts`, `src/lib/anti-bot.ts`, `src/lib/request-identity.ts`, `next.config.ts` (CSP/security headers), authentication/session logic, or environment-variable handling.
- **Required:** Invoke before suggesting changes or approving diffs in these areas.
- **Skip when:** Cosmetic UI changes, content edits, or non-security infrastructure work.

### simplify

- **Trigger:** Explicit "simplify this", "clean this up", or "is this over-engineered" requests. Also when reviewing code with obvious complexity smells (deep nesting, redundant abstractions, premature optimization).
- **Required:** Invoke before proposing structural simplifications.
- **Skip when:** New-feature work or when the code is already lean.

## MCP Tool Usage Rules

### context7

- **Trigger:** Any question depending on current library/framework documentation. Especially relevant here for Next.js 16 (very new, training data may be stale), React 19, Tailwind 4, shadcn/ui, `next-intl`, `next-safe-action`, `zod`, `@hookform/resolvers`, Upstash Redis SDK.
- **Required:** Resolve library ID first (`resolve-library-id`), then `query-docs` against that ID. Cite the source URL/version (e.g., `Sourced from Context7 (/vercel/next.js/v16.x)`) in the response.
- **Skip when:** The question is about app-internal code, business logic, or general programming concepts not tied to a specific library version.

### vercel (MCP)

- **Trigger:** Questions about deployment status, environment variables on Vercel, build logs, or production URLs for this project.
- **Required:** Use Vercel MCP rather than guessing. First call may trigger OAuth — that's expected.
- **Skip when:** Local-only work, code-level questions, or anything that doesn't need live Vercel state.

### railway (MCP)

- **Trigger:** Questions about Railway-hosted backends, the contact-form backend (`BACKEND_CONTACT_URL`) if it lives there, or related infrastructure.
- **Required:** Use Railway MCP for live state queries.
- **Skip when:** Frontend-only work or no Railway dependency.

### Notion / Slack / Google Calendar (claude.ai connectors)

- **Trigger:** Questions explicitly referencing project notes, team threads, or scheduled events ("what did we discuss in Slack about X", "is there a Notion doc on Y").
- **Required:** Use the connector. Don't guess at content.
- **Skip when:** Pure code work or when the answer doesn't depend on team-knowledge sources.

## Self-Check Protocol

After producing any response that involved a skill or MCP, briefly note in the response which capabilities were used. Format:

> _Used: `vercel-react-best-practices` (rules: async-parallel, server-parallel-fetching), context7 (next.js v16.2.x)_

If a response should have used a capability and didn't, the user can challenge it with: _"Why didn't you use [skill/MCP]?"_ — answer honestly with the reasoning, then redo the response with the capability invoked.

## Anti-Patterns to Avoid

- **Don't fake invocation.** If you didn't actually call the skill/MCP, don't claim you did. Honest non-use beats fake citations.
- **Don't over-invoke.** Trivial questions (`useState` syntax, what does `'use client'` mean) don't need a skill consultation. Use judgment.
- **Don't bundle invocations gratuitously.** One skill per task is usually right. Stacking 3 skills on one question wastes context tokens and dilutes signal.
- **Don't ignore skip conditions.** Each rule has explicit "skip when" — respect it.
