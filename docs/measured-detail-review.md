# Measured hero and slow-scroll review — October 16

Reference: live https://heronaiapp.com/, the supplied October 16 recording and the user's 12:29 PM hero screenshot. This follow-up addresses composition and timing rather than treating a functional test pass as visual equivalence.

## Evidence

- Fresh 1920×968 reference hero and 390×844 settled mobile hero.
- Actual wheel scrolling in 280px steps with 650ms pauses from the hero to the footer: 68 captures, including repeated footer states once the end was reached. First 52 captures reviewed in six contact sheets; footer captures reviewed separately. Fifteen reverse-scroll captures through the pinned plan sequence, with detailed spot review.
- Local matched-view captures are output/playwright/measured-final-*. Reference files are output/reference/detail-*, slow-forward-*, slow-reverse-* and slow-sheet-*.

## Corrections

- Narrower concrete end bays, taller projecting two-level center glazing, slender extended fins, lower podium, left stair, recessed side glazing, directional cast shadows, engraved concrete marks and denser irregular winter branches replace the former equal-width facade grid.
- The SVG and marks are independently authored. Original stipple tiles are baked with Sharp to avoid repeatedly painting thousands of texture paths. Reproduce with python3 scripts/pavilion.py followed by node scripts/optimize-pavilion.mjs.
- At 1920×968, measured source header height was 75.08px and caption began at y=781.34px; revised NEAT measures approximately 75.06px and y=781.28px. This verifies those layout boundaries only, not pixel-perfect artwork or typography.
- Header, margins and caption scale with viewport width. Native scrollbar gutter no longer narrows the sheet. The ticker sits within the right caption column. Four corner marks and all four edge rulers are present.
- Header labels have room for the additional approved NEAT navigation. The wordmark withdraws when scrolled; the original NEAT mark remains.
- Drawing observation regions were remapped to the revised geometry. A drag can start directly on an observation region; keyboard and tap controls remain available.
- Problem cards now sequence technical label, drawing, headline and body. Their headings reveal through individual line masks, with scroll-linked reversal and debounced line recalculation after a viewport resize.
- Desktop context story now spans seven viewport heights rather than 3.3. The measured reference mobile context is about 5.7 viewport heights; mobile now uses that duration. Reduced motion remains unpinned.
- The plan stays centered through its detailed drawing and findings stages, then moves left at the end of the sequence. The right copy enters in this later window. Its former early translation was visibly wrong.
- Product/role studies fade in as they enter the viewport. Closing CTA carries the same technical quarter-grid composition with original NEAT content and artwork.

## Remaining differences

The hero is original vector artwork, not Heron's proprietary stippled illustration. Fine concrete/foliage rendering, exact floor-plan geometry, tower and closing art, original role images, Inter Tight versus proprietary BT Grotesk, and the amount of approved NEAT copy still differ. No exact parity claim is made. The approved brief expressly excludes reusing the source's proprietary illustrations. Source company claims, contacts and client logos remain excluded.

Browser emulation does not establish physical iPhone performance. The marketing demonstration still does not connect to BIM software or perform certified compliance review.

## Verification

Production build, ESLint, TypeScript and three backend checks pass. The selected desktop/tablet/mobile regression run passed 29 checks with one scoped duplicate skip. After the final mobile hero scale/position adjustment, four focused mobile Chromium/WebKit hero and reduced-motion checks passed. Manual matched-view captures verified no horizontal overflow and reversible plan positioning. The hero comparison is output/playwright/measured-hero-comparison.png. Live preview verification is recorded in deployment.md.

The final 390×844 caption starts at y=492.97px, compared with the measured reference y=491.61px. Text block height still differs because the approved NEAT wording differs. Desktop baseline placement was adjusted after a direct image-row comparison. The matched hero comparison shows the remaining original-art differences directly rather than asserting equivalence.

Final measured-revision live verification: all ten desktop/mobile checks passed on 2n1e3go46. Additional responsive checks resized through 768, 375 and 1440 pixels and returned from the product route without page errors or horizontal overflow. No runtime edits followed this verification.
