# Cursor, ink and easing review — October 16

Reference: https://heronaiapp.com/ and the supplied 84.83-second, 60fps October 16 recording. This follows the measured-hero revision; it does not claim visual identity.

## What the closer review found

The workflow is not a conventional set of sticky labels. A live pointer test at 1440×900 showed all four label tracks moving from y=196 to y=576 when the pointer moved from y=220 to y=600, without scrolling. The active label also changed as the pointer crossed into the next drawing. The scanner compensates for document scrolling, so its viewport position stays with the pointer while the illustrations move underneath. The earlier implementation missed this mechanism.

The source tower develops from a pale technical outline into dark shading. The red sun appears independently, with an irregular wet edge. The closing illustration also fills from above; a simple expanding circle was the wrong transition. Window/stair panels withdraw in sequence, leaving their small red observation markers behind. The footer has a softer grey leading ink patch around its black cursor fill.

## Evidence and limits of frame analysis

All 5,089 available frames were extracted at the recording's native frame rate into `output/reference/full-rate/`. `scripts/analyze-recording.mjs` analyzes every frame for motion difference and red-pixel area/centroid, producing `output/reference/full-rate-analysis.json`. Visual review sampled the full timeline and inspected consecutive frames around the tower reveal, plus half-second workflow/footer sequences. This is automated analysis of every frame plus selective visual review—not a claim that every frame was individually viewed.

Relevant reviewed sequences: 22.4–22.9 seconds (tower outline, ink and sun); 58–61.5 seconds (window/stair annotations); 62–65.5 seconds (alternating stage labels, stacked plans and network); 79–84 seconds (footer ink). The recording includes variable user input; matching elapsed video time is not equivalent to matching scroll progress.

## Changes

- One continuous pointer-following scanner, a full-width vermilion rule, alternating half-width black captions and stage changes based on which drawing is under the scanner. Its position compensates for scrolling. Touch uses a stable reading line; reduced motion retains ordinary visible stage headings.
- Window and stair annotations now appear and retract independently, leaving persistent red markers. The review highlight retracts; stacked plans and network linework progress through the scanner.
- Separate original tower outline and shaded layers, with displaced SVG masks creating irregular top-down ink and sun fronts. The reveal reverses when scrolling back. The closing portal now uses the same top-down principle instead of a radial wipe.
- Bright illustration accent #fa3600 measured from a live reference capture replaces muted brick. Text/control backgrounds use darker companion colors where needed for contrast.
- Lenis duration 1.15 replaces 0.85. A real 700px wheel sample of the reference reached approximately y=338 at 138ms, y=640 at 439ms and y=698 at 978ms. NEAT's measured sample reached y=320 at 113ms, y=650 at 446ms and y=698 at 946ms. Input-dispatch latency and frame cadence vary; these measurements establish a similar easing envelope, not identical performance.
- Two-layer footer cursor ink: softer grey leading edge and black interior, initialized at the pointer's entry location.

## Remaining differences

The original NEAT tower, pavilion, section, plans and closing portal are different illustrations. They remain visibly less detailed than the source's bespoke artwork. Inter Tight differs from BT Grotesk. Approved NEAT copy and additional product controls affect spacing/page length. The approved brief excludes reuse of Heron's proprietary illustrations. Source frames are research evidence only and are excluded from deployment. Real mobile hardware performance is not established by browser emulation.

## Verification

Production build, TypeScript and ESLint pass. Three backend checks pass. Final browser and deployment results are recorded in deployment.md. Captures include `output/playwright/motion-desktop-*`, `motion-mobile-*`, `scanner-pointer-*` and `tower-organic-front.png`; matched live-source pointer captures are `output/reference/scanner-pointer-*`. Tests verify behaviors and accessibility, not visual equivalence.
