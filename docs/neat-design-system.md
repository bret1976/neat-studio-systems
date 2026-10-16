# NEAT design system

Warm paper #F0EEE7, charcoal ink #20211E, drawing field #111514, technical gray #68685F, line #C9C7BD, warm white #FAF9F5, muted red surface #F1DBD5. Alert/action red is darkened from brief #C84932 to #AB3523 for small-text contrast. Grid is 7px outer inset on desktop / 5px on mobile, hairline rules, divided header cells, 26px content gutters / 15px mobile. Rectangular controls, no glass/gradient SaaS styling.

OFL Inter Tight (400/500/600/700) and IBM Plex Mono (400) are bundled through Fontsource. Font files are emitted locally, never fetched from Google at runtime. Licenses remain in the installed font packages and are copied into public/fonts/licenses. Proprietary BT Grotesk is not supplied. Display sizes use clamps; body ranges 13–17px, technical labels 7–10px. Very small metadata is supporting information only; substantive controls have readable labels and visible focus outlines.

The original NEAT wordmark, compact drafting-point mark and monochrome version live in public/logos; favicon in src/app/icon.svg. SVG linework, annotation rectangles, approval bars and mono indexes share the original North Court coordinate system. Neutral architectural images are generated specifically for NEAT. All product UIs are real HTML/SVG, not screenshots.

Desktop uses sticky drawings over 330/400 viewport-height narratives. Mobile uses shorter sticky drawing ranges and offers the same layer/state buttons. Reduced motion alone returns the narratives to normal flow. Reduced motion removes sticky travel and entrance animations; buttons and reveal slider retain all essential states. Navigation is click/tap/keyboard operated with Escape and outside-dismiss. Horizontal problem scrolling is native touch scrolling with scroll snapping on mobile.
