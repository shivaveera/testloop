# TestLoop Knowledge File

This file is the in-repo product brief and implementation source of truth for the routed MVP.

## 1. Product

TestLoop is a curated user-testing marketplace. Founders create objective, metric-based usability tests. Verified student testers from tier-2/3 Indian engineering colleges run them inside an embedded iframe plus overlay widget. Founders get back a pass/fail dashboard with real data instead of video-heavy review.

Wedge: objective, computed pass/fail metrics such as TSR, SUS, SEQ, First-Click Success, and related fraud detection surfaced as dashboards.

Business model after MVP: `$100–$300` per campaign with approximately `70%` gross margin. No payments in MVP.

## 2. Stack

- Frontend: React + Vite + TypeScript + Tailwind + shadcn/ui patterns
- Backend: Supabase (Postgres + Auth + Storage + Edge Functions + Realtime)
- AI: OpenAI via Supabase Edge Functions only, never client-side
- Forms: react-hook-form + zod
- Tables: TanStack Table with shadcn-style dense table patterns
- Charts: Recharts
- Toasts: Sonner
- Fingerprinting: FingerprintJS open-source
- Routing: React Router v6
- State: React Query for server state and React context for auth/session

Fonts: Geist Sans + Geist Mono with Inter / JetBrains Mono fallback
Radius: `8px`
Accent: emerald
Theme: dark-first with `class="light"` override support

## 3. Roles

Single `user_role` enum: `tester | founder | admin`.

Admin sub-level enum: `admin_level = super | assistant`.

| Role | Purpose | Primary routes |
| --- | --- | --- |
| Guest | Unauthenticated browsing | `/`, `/for-founders`, `/for-testers`, `/pricing`, `/login`, `/signup` |
| Tester | Verified student tester | `/onboarding/tester`, `/marketplace`, `/test/[id]/take`, `/submissions`, `/profile` |
| Founder | Creates and reviews tests | `/onboarding/company`, `/dashboard`, `/tests`, `/tests/new`, `/tests/[id]`, `/company/settings` |
| Admin (super) | Full moderation and config | `/admin/*` |
| Admin (assistant) | Moderation only | `/admin/verifications`, `/admin/review-queue`, `/admin/flags`, `/admin/audit` |

Every protected route must be gated by `useRole()` and Supabase RLS. The client alone is never trusted.

Role storage lives in `profiles.role` and is mirrored into JWT `app_metadata.role`.

## 4. Core Loop

1. Founder signs up and gets a personal workspace.
2. Founder creates a test, pastes a URL, runs preflight, and receives AI-assisted task and metric suggestions.
3. Tester signs up, completes verification, is reviewed by admin, then browses marketplace listings.
4. Tester runs the campaign in the runner, which streams iframe and overlay events through `events-ingest`.
5. Submission scoring and metrics are computed server-side through Edge Functions.
6. Founder dashboard updates with pass/fail summaries, replayable event trails, and AI summaries.
7. Admin reviews verification items, fraud flags, and audit activity.

## 5. MVP Metrics

The MVP supports ten metrics:

1. Task Success Rate
2. Time on Task
3. Error Rate
4. SUS
5. SEQ
6. Lostness
7. Click-Path Efficiency
8. Confidence
9. First-Click Success
10. UMUX-Lite

Client code never writes `submission_metrics`. Only the server-side metric pipeline does.

## 6. Fraud Signals

The fraud layer tracks thirteen signals:

1. AI text likelihood
2. Paste-dump behavior
3. Copy-paste event usage
4. Tab-switching
5. Idle time greater than forty percent
6. Completion-time outliers
7. Cross-tester similarity
8. Device fingerprint duplicates
9. IP and timezone mismatch
10. VPN or datacenter ASN
11. Attention-check failure
12. Likert straightlining
13. Very short free-text responses

`fraud_score >= 70` auto-flags. `40–70` goes to admin review. Below `40` can auto-approve when quality is acceptable.

## 7. Badges

| Tier | Entry criteria | Unlocks |
| --- | --- | --- |
| Probation | Default | Up to three tests |
| Verified | At least three tests, strong approval rate, GitHub verified | Standard campaigns |
| Top-Rated | At least fifteen tests, high quality, low fraud | Premium campaigns |

Badge recomputation runs on review updates and nightly automation.

## 8. Guardrails

1. Never call AI APIs from client code.
2. Never compute metrics client-side.
3. Never insert into `public.events` directly from the client.
4. Always gate routes with role checks and RLS.
5. Always use react-hook-form plus zod for forms.
6. Always include loading, empty, and error states for data views.
7. Treat the runner as desktop-only and block widths below `1280px`.
8. Avoid `any` in TypeScript.
9. Use generated Supabase types for persisted entities.
10. Keep migrations additive and RLS policies scoped to `authenticated`.

## 9. Design Tokens

```css
:root {
  --radius: 8px;
  --primary: 142 71% 45%;
  --background: 0 0% 100%;
  --foreground: 240 10% 4%;
}

.dark {
  --background: 240 10% 4%;
  --foreground: 0 0% 98%;
}
```

Type scale:

- `xs 12`
- `sm 13`
- `base 14`
- `lg 16`
- `xl 18`
- `2xl 24`
- `3xl 32`
- `4xl 48`

Cards are dense. Tables stay compact. Shadows are reserved for elevated surfaces.

## 10. Page Inventory

Public routes:

- `/`
- `/for-founders`
- `/for-testers`
- `/pricing`
- `/contact`
- `/terms`
- `/privacy`
- `/login`
- `/signup`
- `/reset-password`

Founder routes:

- `/onboarding/company`
- `/dashboard`
- `/tests`
- `/tests/new`
- `/tests/[id]`
- `/tests/[id]/submissions/[sid]`
- `/company/settings`
- `/account`

Tester routes:

- `/onboarding/tester`
- `/onboarding/tester/pending`
- `/marketplace`
- `/marketplace/[id]`
- `/test/[id]/take`
- `/submissions`
- `/submissions/[id]`
- `/profile`
- `/account`

Admin routes:

- `/admin`
- `/admin/verifications`
- `/admin/review-queue`
- `/admin/tests`
- `/admin/users`
- `/admin/flags`
- `/admin/audit`
- `/admin/config`

## 11. Phase Plan

- Phase 0: design system, shell, landing, auth
- Phase 1: identity, role model, onboarding, account
- Phase 2: tests, wizard, marketplace, preflight, AI task generation
- Phase 3: runner, widget, event ingest, metric computation
- Phase 4: admin, fraud review, badge recomputation, realtime

## 12. Acceptance Criteria

- Every route is gated appropriately.
- Every data view includes loading, empty, and error states.
- Build and typecheck pass.
- AI behavior runs through Edge Functions.
- Metrics remain server-authoritative.
- Desktop-only rules are enforced for the runner.
