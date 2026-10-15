# Original asset inventory

- `public/drawings/elevation.svg`: original scripted 1200×700 North Court three-story elevation. Facade, glazed bays, stairs, guardrail, trees, structural axes and scale labels. Created by `scripts/drawings.py`; no reference artwork copied.
- `public/drawings/plan.svg`: original 1000×700 courtyard floor plan with door arcs, furniture, stairs and grid. Same local drawing generator.
- `public/logos/neat.svg`, `neat-white.svg`, `mark.svg`; `src/app/icon.svg`: original geometric NEAT identity and drafting-point compact mark. SVG, no licensed third-party logo.
- `public/images/north-court-render.webp`: original generated architectural visualization, built-in image-generation tool. Original source retained at `/Users/majid/.codex/generated_images/01a12b84-900b-7081-8341-78d7677a013e/exec-9191c4ec-f84f-4d5a-84de-f14f9065792a.png`. Optimized to 1800px WebP with Sharp. Illustrative fictional building, not a real project/client.
- `public/images/north-court-sketch.webp`: deterministic grayscale Sobel-edge derivative of that exact render, preserving the same camera, crop and geometry for the ink transition. This sketch/render pair is separate from the editable hero elevation and is not represented as the identical model.
- Product UI, markers, floor-plan layers, technical diagrams: original HTML/React/SVG. No screenshot-based fake controls.
- Inter Tight and IBM Plex Mono: OFL licensed, installed with Fontsource. License copies in `public/fonts/licenses`; emitted local font assets come from dependency packages. No proprietary reference fonts bundled.
- OG image: original `src/app/opengraph-image.tsx`, generated through Next ImageResponse.
- Paper grain: tiny original SVG turbulence data URI. No remote asset hotlinks.

## Final generation prompt

Create one original photorealistic architectural visualization for an architectural intelligence website. Landscape 3:2 composition. A precisely centered straight-on orthographic front elevation, no perspective distortion, of a beautiful three-story contemporary residential pavilion. Pale board-formed concrete structural piers, bronze black slender window mullions, three floor levels, recessed floor-to-ceiling glazing, a centered two-floor projecting glazed bay, left-side eight-step external entrance stair, low podium and right-side terrace guardrail. Fine slender deciduous trees at left and right. Warm off-white overcast sky and seamless pale ground with subtle natural shadows. Building occupies central 72 percent of width and 62 percent height, ample clean margins. Sophisticated Swiss architectural competition rendering, hyper detailed concrete textures and glazing reflections, restrained neutral tones, absolutely no text, labels, watermark, UI, logos, people, or cars. It must be a real rendered architecture image, not a website mockup.

## Rights and limitations

Reference site, case-study media and recording are audit evidence only, excluded from deployment. The user's uploaded source serves as reference data; no Heron scripts, product branding, photographs, diagrams or trademarks are embedded. Generated image is original illustrative content; no real-world ownership, performance or software availability claim accompanies it. Fine geometry in the generated visualization is not a construction drawing.
