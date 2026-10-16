# Interaction specification

## Elevation inspection

The canvas has a fixed 1200×700 SVG viewBox and CSS aspect-ratio 12/7. The exact element (not a differently sized outer field) is measured on pointer events. clientX/Y are normalized to its bounds and clamped to [0,1]. Mobile may crop the outer drawing field but coordinate math still refers to the full SVG rectangle. Region objects share this normalized space. Intersections use axis-aligned bounding boxes, in all drag directions. Pointer capture keeps a drag continuous outside the starting point; pointerup/cancel clears transient selection. Discovered IDs persist in component state until reset. No model data is uploaded.

Buttons on each region and a secondary observation list are equivalent keyboard and touch alternatives. Enter/Space inspects a region; live count and detail panel update. Region coordinates are in src/content/site.ts, with helper functions in src/lib/geometry.ts. Example findings explicitly ask for review, never assert definitive code violations.

## Scroll stories

GSAP ScrollTrigger reads section progress, updates the visible plan layer (0–4) and workflow stage (0–3). The drawing remains present. Sticky is CSS, avoiding generated pin spacers and overlapping nested pins. ScrollDirector owns Lenis through the GSAP ticker; cleanup removes listeners, ticker callback and scoped GSAP effects on route changes. Reverse scrolling updates the same state calculations. Step/layer buttons work independently and the next actual scroll update resumes scroll-driven state. Mobile reduces pinning; reduced motion uses normal flow and manual stage controls.

## Ink

A generated render and edge-derived drawing share identical camera, dimensions and pixel geometry. SVG feTurbulence feeds feDisplacementMap (85 units) then Gaussian blur. Scroll drives a white mask circle from radius 0 to 1200 in a 1500×1000 coordinate field. A range input exposes equivalent manual progression, including reduced motion. Both layers use the same preserveAspectRatio transform. Multiple instances use unique React IDs. Footer wordmark has a pointer-following CSS circular reveal; this simpler footer implementation differs from the source's filtered SVG ink lens.

## Product demonstrations

Assist contains the approved scripted conversation, functional alternative buttons and local approval/reset. Control selects observation regions, updates the demonstration status counters, records local approval history and allows the history tab to be inspected. Nothing claims a live model adapter or an AI endpoint. All state resets on reload/navigation. Production software concepts are documented separately.

## October 16 feature correction

The persistent workflow now carries both elevation and plan through four distinct scenes. Proposal geometry has separate current/proposed paths for corridor and door alternatives. A button records approval; reverse scrolling reconstructs the scene without granting new authorization. The last stage explicitly states when no human decision has been recorded. `useDrawingStages` drives the workflow, context, and approval narratives with one responsive mapping, and manual step selection seeks the same timeline through the shared Lenis controller. Mobile uses shorter sticky ranges. Reduced motion removes the sticky ranges and preserves click-through states.

Context structural paths have normalized path lengths and a continuous stroke-dash offset. Wall tracing, underlying detail opacity, scene scaling, and plan overlays are separate layers. The center statement yields to the floor plan as progress increases. Hero opening traces an original elevation skeleton while two local SVGs and fonts are checked; it runs once per session and fails open after a bounded timeout. It does not claim a real analysis is running.

Control now has observation, project, standards, assignment, and history views. Local criteria toggles update the configured-count view, assigned roles update issue details, and revision requests move sample counts into under review. Approvals and revision decisions are mutually exclusive for each observation. Assist exposes four capability modes and actual current/proposed drawing toggles. All are explicitly local demonstrations.

Footer is now an SVG noise/displacement ink lens, replacing the earlier clean CSS circle. Pointer interpolation and fine-pointer drafting trail use GSAP ticker callbacks with teardown. Coarse-pointer and reduced-motion users see a filled wordmark and no cursor effect.
