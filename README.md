# NEAT — Intelligent Design Systems

[Verified preview — October 16](https://neat-studio-systems-bx58i9ohw-brets-projects-1715089a.vercel.app/)

Original architectural-intelligence concept website, built as a separate project from SOLVANE. Visual reference: [Heron AI](https://heronaiapp.com/); interaction research: [creator case study](https://tympanus.net/codrops/2026/10/12/heron-ai/). The approved NEAT brief is archived in `docs/approved-brief.txt`.

## Run locally

Node 22+ (Node 25 used for verification) and npm.

```bash
npm ci
npm run dev
# http://localhost:3120
npm run lint
npm run typecheck
npm run build
npm run start
```

```bash
npx playwright install chromium webkit
npm test
npm run test:backend
```

Run tests against a running production server. Automated tests cover the seven requested desktop/tablet/mobile sizes and iPhone-sized WebKit. Tests are meaningful behavioral checks, not pixel-perfect assertions. Browser emulation does not replace physical iPhone testing.

## Implemented

Next.js App Router, React/TypeScript, Tailwind 4 and authored design CSS, GSAP ScrollTrigger, Lenis, Zod. Original SVG drawings and identity. Hero rectangle intersection with direct normalized coordinates, persistent discovered issues, pointer capture, reset, touch/tap and keyboard alternatives. Layered plan, four-state sticky workflow, reversible filtered SVG ink reveal and manual range fallback. Interactive Assist capability modes, current/proposed geometry, approval, and Control project/criteria/assignments/observations/revisions/history. A drawing-first opening, progressive plan tracing, explicit designer authorization narrative, drafting cursor and displaced SVG footer lens complete the interaction system. Responsive dropdowns, mobile horizontal problem sequence, role accordions, pointer footer reveal. All 19 required content routes have original content; metadata, OG image, favicon, sitemap/robots and noindex for unconfigured previews.

The site is an interactive marketing demonstration, not an implemented AI/BIM platform. Scripted assistant messages, sample counts and local approvals are labeled as illustrative. No existing design software is read or modified. There are no fabricated customers, code citations, statistics, addresses or endorsements.

## Inquiry configuration

Copy `.env.example` to an ignored local env file; configure values directly in your hosting environment. Never commit secrets.

- `RESEND_API_KEY`, `INQUIRY_FROM` (verified sender), `INQUIRY_TO` (authorized recipient).
- `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` for a durable, cross-instance rate limiter.
- Optional `NEXT_PUBLIC_SITE_URL` only after a real production origin is chosen.

`POST /api/inquiries` validates input and honeypot, rejects unsupported origin/content type/oversized requests, limits five submissions per ten minutes with hashed request keys, and only returns 202 when Resend acknowledges a message ID. Configuration/limiter/provider errors do not simulate success. The form remains disabled when required configuration is absent; an otherwise valid direct request returns 503. No persistent lead database is implemented. Before accepting public leads, establish an operator identity, privacy contact, retention policy and appropriate production legal notices. No real email delivery is claimed without credentials and a verified sender/recipient.

Software options are interest categories, not supported integrations. Production platform services and data model are specifications in `docs/platform-architecture.md`, not running services.

## Vercel

Use the dedicated `neat-studio-systems` project and a preview deployment. No production domain is authorized. Configure the above variables and redeploy when enabling inquiries. Preview metadata stays noindex while `NEXT_PUBLIC_SITE_URL` is unset. `.vercelignore` excludes tests, captures, env files, docs and build caches. Deployment identifiers and verification results are in `docs/deployment.md`.

See `docs/feature-gap-audit.md` for the October 16 correction and implementation inventory.

## Assets and review

`docs/asset-inventory.md`: origins, generation prompt, licenses and exact paths. `docs/heron-reference-audit.md`: observed source behavior, viewport captures and limitations. `docs/visual-comparison.md`: differences and verification. `docs/interaction-specification.md`: geometry/motion architecture. Reference and local screenshots are in the separately supplied comparison archive; they are intentionally excluded from Git/deployment.

The reference's proprietary BT Grotesk font, building illustrations and source scripts are not reused. NEAT's original building geometry, wording and added routes change page length and composition. Matching render/sketch layers share exact pixel geometry; the separate interactive hero uses editable SVG. The original SVG hero is less photorealistic than Heron's textured building. No pixel-perfection claim is made.

## Recording fidelity follow-up

Full timestamped recording review: [docs/video-timeline-review.md](docs/video-timeline-review.md). Includes the sequential plan reveal, alternating workflow compositions, geometric page wipe, sticky product tours, resource filters and original identity morph. Latest local matrix: 82 passed, nine scoped duplicate checks skipped, seven viewport/engine projects; three backend checks, lint, TypeScript and production build pass.

The second structural review replaces full homepage workspaces with compact product studies and introduces four independent vertical workflow panels. It also corrects tower shading, word reveal, header direction, plan framing, carousel controls, footer geometry, product detail page heroes/FAQ/closing sequences and About editorial art. See docs/video-timeline-review.md for the original recording timestamps and remaining differences.
