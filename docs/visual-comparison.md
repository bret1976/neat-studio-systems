# Visual and functional comparison

Reference evidence: output/reference/desktop-hero.png, desktop-drag.png, full-desktop-0..16.png, wheel-mobile-0..9.png and recording-sheet.jpg. First desktop and mobile captures include the source loader; they are labeled in the audit and not misrepresented as finished states. Source uses an internal canvas scroll, so subsequent comparisons use wheel events. Local captures are grouped in output/playwright by viewport.

| Area | Recreated behavior/composition | Intentional difference or limit |
|---|---|---|
| Header | Thin divided rectangular cells, logo left, compact uppercase labels, dropdowns, mobile menu | New NEAT identity, extra approved links, licensed fonts |
| Hero | Drawing dominates above the bottom caption; technical metadata, coordinate readout, hints, direct rectangle reveal, persistent issue count/reset | Original three-story SVG, not Heron's proprietary textured two-story drawing; full NEAT copy and visible secondary issue list add height |
| Introduction/problems | Architectural graphic with editorial statement, four technical numbered columns | Longer approved copy; software-interest strip replaces unverified customers/integration claims; mobile native horizontal snapping |
| Context | Same floor plan persists while spatial/route/review layers appear | Progressive structural line tracing, centered statement-to-plan transition and five equivalent manual controls; original plan |
| Workflow | Same model, four scroll-driven states, technical active bar, annotation/approval changes, reverse progression | Inspect/Interpret/Resolve/Improve copy; persistent building/plan, alternatives and approval history; shorter mobile sticky timelines; CSS sticky instead of source canvas |
| Ink | Reversible scroll-driven organic SVG mask with noise/displacement; aligned drawing and render | Exact pixel geometry within generated pair; sketch is edge-derived, not proprietary illustration; different drawing from editable hero |
| Assist/Control | Floor-plan and review-oriented interface, tabs, alternatives, observation detail, approvals/history | Four Assist modes and five Control views with criteria, role assignment, revisions, comparison geometry and history; all scripted/local |
| Use cases | Large architecture image left, expandable role list right, stacked mobile | Original imagery and eight NEAT roles |
| Philosophy/CTA | Technical approval sequence, oversized editorial typography, building reveal | Added/expanded NEAT content changes page length; philosophy now has its own scroll/click-driven authorization demonstration |
| Footer | Information grid, huge outline wordmark, pointer reveal, legal strip | NEAT has no invented address/social/customer/subscription claims; Noise-displaced SVG lens and coarse-pointer/reduced-motion solid wordmark now replace the initial CSS circle |

Corrections made during review: replaced the initial rotated-elevation introduction with an original axonometric tower drawing; replaced initial role-card grid with architectural editorial image/accordion; replaced mobile two-column problem grid with horizontal snap scrolling; kept manual mobile workflow from being overwritten by automatic scroll state; reserved manual ink slider control while it has focus; darkened red text and removed translucent label contrast; made horizontal region keyboard focusable; preserved normalized pointer mapping when the mobile building is cropped.

Not claimed: pixel perfection, exact proprietary font/asset reproduction, physical-device verification, production email delivery, real model integration or certified code checking. The source reference and approved NEAT expanded content are not identical in length or section density. Tests and deployment status are recorded in deployment.md once completed.


October 16: the prior comparison understated missing functionality. See `feature-gap-audit.md` for the corrected inventory and actual implementations. Basic click/route test passes did not establish reference fidelity. New state-by-state desktop/mobile captures are named revision-*, and an additional behavioral suite exercises approvals, revisions, modes, criteria, assignments, opening, responsive geometry, and scroll reversal.
