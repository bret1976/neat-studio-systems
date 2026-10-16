# Recording review — 16 October 2026

Reference: user-supplied `Screen Recording 2026-10-15 at 11.03.24 AM.mov`, 131.33 seconds, 1916 × 970, 60 fps. Reviewed decoded frames at one-second intervals across the complete recording; eleven timestamped contact sheets are retained in `output/reference/video-recheck`. This establishes visible states and sequence, not exact source easing curves or a continuous 60 fps motion measurement.

| Recording | Observed behavior | NEAT implementation / remaining difference |
| --- | --- | --- |
| 00:03–00:11 | Reload, line-drawing loading screen, progress rule, building reveal | Original drawing opening, real image/font readiness, fail-open timeout and vertical reveal. Building geometry is an original NEAT asset. |
| 00:12–00:17 | Rectangular building inspection, coordinate pointer, black observation callouts | Geometry-based selection, persistent findings, keyboard/touch discovery, drafting cursor. Source building and exact callout art differ. |
| 00:18–00:23 | Tower drawing, red circle, editorial introduction, client strip | Original tower illustration, red motif, staged introduction. No fabricated NEAT customers or source-company endorsements. |
| 00:24–00:27 | Four illustrated problem columns | Four NEAT problem columns and original architectural line studies. |
| 00:27–00:39 | Two successive centered statements; thin plan contours gain walls/details; plan shifts left into a product composition | Added sequential statement opacity windows, progressive structure/details, late horizontal shift and approved contextual copy at right. Original floor plan and approved wording differ. |
| 00:40–00:42 | Assist and Control product rows | Product rows now precede workflow in the observed sequence. |
| 00:43–00:48 | Four workflow scenes alternate left/right; active black stage bar | Added alternating scene composition and stage bar; final scene is an interactive original standards network. Native sticky scene replaces the source's precise vertical travel/easing. |
| 00:48–00:57 | Use-case composition, centered CTA, drawing/render transformation, grid footer and interactive outline wordmark | Retained NEAT use-case controls, ink transformation, CTA, original wordmark ink. Original 3D bird/logo hover sculpture is not duplicated; NEAT uses its own geometry. |
| 00:58–01:03 | Navigation hover and geometric page-cover transition | Added pointer-hover dropdowns and six-cell animated grid wipe for same-origin route changes; keyboard, touch, modified clicks and reduced-motion fallback retained. |
| 01:04–01:25 | Product detail page with sticky feature navigation, large changing workspace, steps/FAQ/CTA/footer | Added desktop scroll-driven Assist/Control feature tours using the existing functional workspace. Mobile uses explicit horizontal feature navigation and normal flow to keep controls reachable. Source dashboard layout is not reproduced verbatim. |
| 01:26–01:44 | Pricing page | No source-company prices, plans, or commercial claims introduced: these are not approved NEAT content. |
| 01:46–01:54 | Resource category filters, card grid, dark hover | Added three actual NEAT resource articles with category filtering, card hover and real destinations. |
| 01:55–02:10 | Plan-to-logo morph, editorial About content, team and partner grids | Added reversible original plan-to-N identity morph and retained approved About content. Source staff portraits, employees and partner claims are not represented as NEAT. |

## Verification scope

Production build, lint, TypeScript, backend validation, seven-size/engine browser matrix, route-transition/filter/morph tests and representative desktop/mobile visual captures. The checks establish working behavior and responsive reachability; they do not establish pixel-perfect or frame-perfect parity. No physical iPhone test or live BIM/AI service is claimed.

## Structural correction after the second user review

The first follow-up overstated fidelity: the product order was corrected, but its homepage compositions were still full workspaces; workflow stages still swapped inside a fixed canvas. Those are material differences visible at 00:40–00:48, not merely artwork or timing differences.

This revision replaces the homepage workspaces with three-column product studies and local approval previews, preserving the full workspaces on product/demo routes. The four homepage workflow scenes are now independent vertically travelling panels with alternating drawing/bar positions and shared explicit-approval state. The dedicated How It Works page retains the brief's controllable pinned model.

Other corrections: progressive tower shading, scroll-linked word opacity, original axonometric problem diagrams, working software-interest carousel arrows, hide-on-down/show-on-up navigation, full-screen context-plan composition, pointer coordinate readout, compact initial inspection controls, longer measured drawing-first opening, original dimensional footer monogram with face hover, two-row footer grid, centered closing CTA, and exclusive use-case disclosure. Product detail pages now have split interface-preview heroes, feature tours, three-step content, FAQs and closing drawings; About pairs original portal art with the approved editorial content.

New live research captures: `output/reference/second-pass-*.png`, including matched 1440×900 desktop and fresh 390×844 mobile reference captures. The reference scroll container is `.main-inner`, not window; native wheel interactions were used after dismissing its consent banner. Some headed mobile captures timed out, so a fresh headless mobile context was used successfully. No reference consent UI was added to NEAT because the rebuild does not add optional analytics/tracking.

Original architectural assets, the NEAT wordmark, approved section copy, and product-demo boundaries remain intentionally different. The source's pricing/staff/partner content is not adopted. Exact proprietary illustration geometry, typeface and source easing are not claimed. This remains a rebrand with original media, not a pixel-perfect duplicate.
