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
