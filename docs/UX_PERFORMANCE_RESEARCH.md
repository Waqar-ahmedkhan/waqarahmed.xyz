# Portfolio interaction and performance review

Reviewed October 4, 2026. Scope: current source code, supplied screenshots, and official Apple/browser guidance.

## Recommendation

Keep the monochrome portfolio, compact experience clock, airplane-window switch, and simple project constellation. Aim for calm surfaces, immediate feedback, consistent spacing, and a subtle cursor. Use translucent material only for floating controls. This is a proposed direction, not a measured performance result.

## Evidence from the current implementation

1. **Cursor: useful foundation, expensive hover property choices.** `src/components/custom-cursor.tsx` updates position through `translate3d`, uses elapsed-time smoothing, and stops scheduling frames when settled. It preserves the native cursor and disables the effect for touch/reduced motion. However, `src/app/globals.css` animates the halo's width and height from 22px to 32px. Replace those size changes with a transform on a fixed-size inner ring. Compare smoothing constants of 18–24ms against the current 32ms; these are tuning candidates, not measured latency targets. Only update hover attributes when their values change.

2. **Background: already demand-driven.** `src/components/fluid-dot-grid.tsx` stops when idle, pauses when hidden, limits device pixel ratio to 2, and uses neighbor-only links. Keep those safeguards. It still clears and redraws the entire viewport while active; profile that cost before changing it. Try a lower-opacity static pattern on mobile and restrict dynamic connections to the pointer region on desktop. Keep all changes monochrome.

3. **Portrait: avoid animating blur.** `src/components/HeaderSection.tsx:51` uses `transition-all` and changes blur on hover. Retain a static soft backlight; animate opacity or a small transform instead. The image is served unoptimized at approximately 112KiB. Inspect the existing smaller portrait variants for visual quality before choosing one or enabling responsive image optimization. Smaller files alone do not prove acceptable quality.

4. **Simple view: reveal timing affects perceived speed.** `src/components/simple-view.tsx` starts social-link reveals after 800ms and staggers additional links by 80ms. Make important content and contact actions visible immediately. Limit optional entrance movement to a short fade/4px rise, without gating interaction.

5. **Theme switch: intentional but blocking.** The shutter lasts 1.2 seconds, the theme changes after 480ms, and the button remains disabled until the sequence ends. Preserve the slower shutter requested by the user, but investigate reversible/interruptible motion so repeated input feels responsive. The sequence's delay should not be confused with INP. Keep reduced-motion switching immediate. On mobile retain the centered control and compact clock.

6. **CSS: consolidate abandoned variants.** `src/app/globals.css` includes rules for the removed sidebar, studio, and exploration ship. These are maintenance opportunities; their presence is not evidence of substantial JavaScript cost. Identify actual consumers before deleting rules or components. Unmounted components are not automatically shipped in the current page bundle. In particular, the animated favicon is defined but no mount was found in `src`; do not blame it for current runtime work.

7. **External content: handle latency gracefully.** The contribution chart fetches a third-party API after mount. Keep its dimensions stable, show a useful unavailable state on failure, and consider cached data rather than waiting indefinitely. The chatbot component is deferred; its iframe loads on opening. Preserve that separation.

## Visual specification proposal

- Dark: black canvas, charcoal content surfaces, soft-white text, neutral gray dividers. Light: off-white canvas, white surfaces, dark text. No colored accent required.
- One radius scale: 16px for major cards, 10px for controls, full rounding for pills.
- Spacing based on 4px increments: 8/12/16/24/32. Prefer one border per content group.
- Retain system fonts. Use readable secondary text and stronger labels; avoid excessive 9px microcopy.
- Limit glass to the floating Simple/Detailed control; keep project and experience content opaque.
- Preserve the simple constellation and its short summaries. Avoid adding a second demo panel.

These choices adapt Apple's separation of content and navigation to a website. They are design recommendations, not Apple requirements. [Apple: Adopting Liquid Glass](https://developer.apple.com/documentation/TechnologyOverviews/adopting-liquid-glass) and [Apple: Liquid Glass](https://developer.apple.com/documentation/TechnologyOverviews/liquid-glass).

## Proposed motion specification

- Button press: 100–140ms, scale around 0.98.
- Hover: 140–180ms, slight opacity/transform change.
- Project-summary change: 180–220ms subtle fade; prevent container jumps.
- View selection: 220–280ms smooth slider.
- Shutter: retain the requested 1.2s initially; separate visual animation from control responsiveness.
- Cursor: fixed-size ring; position through transform; frame scheduling only while moving.
- Reduced motion: static background and native cursor; immediate theme switch; preserve all content and actions.

Timing values are proposed tuning ranges. Browser guidance favors transform/opacity for animations, warns against unnecessary layout/paint work, and recommends profiling before adding compositor hints. [web.dev: High-performance CSS animations](https://web.dev/articles/animations-guide). Apple recommends adapting decorative depth, animated blur, and ongoing motion to accessibility preferences while preserving meaningful feedback. [Apple: Reduced Motion criteria](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/reduced-motion-evaluation-criteria).

## Implementation order

### 1. Capture a production baseline

Use a production build, not Next.js development mode. Record mobile and desktop load behavior and a trace of cursor movement, scrolling, project selection, theme switching, and view switching. Check Safari and Chromium, 390px and 430px mobile widths, and 1440px desktop width. Include keyboard and reduced motion. No baseline has been recorded in this review.

### 2. Remove avoidable interaction work

Convert cursor size transitions to scale. Replace portrait animated blur and broad transitions. Remove long contact-link reveal delays. Keep visual behavior otherwise stable, then compare the same traces.

### 3. Unify the visual system

Consolidate tokens and superseded CSS, strengthen text hierarchy, and normalize border/radius/spacing. Preserve the user's monochrome preference and current simple first-view interaction.

### 4. Tune the distinctive effects

Profile the fluid canvas; optimize only confirmed hotspots. Keep the shutter metaphor, but make input handling responsive. Check the experience clock does not jump or crowd the mobile header.

### 5. Verify and stop

Require passing lint/type checks and a production build; test real interaction paths and responsive screenshots. Compare before/after traces. Do not claim a speedup from source changes alone.

## Acceptance targets and limitations

Target LCP ≤2.5s, INP ≤200ms, and CLS ≤0.1 at the 75th percentile, segmented by mobile and desktop. These are field targets; local Lighthouse cannot establish them. [web.dev: Core Web Vitals](https://web.dev/articles/vitals).

For animation traces, compare dropped frames against a baseline; avoid persistent animation work at idle. Verify focus visibility, native text selection, touch targets, and immediate content visibility under reduced motion. Check 60Hz and 120Hz devices where available. There are no FPS, Lighthouse, bundle-size, or field performance measurements in this report, and no production performance improvements have been demonstrated yet.


## Implementation completed October 4, 2026

- Cursor hover/press uses scale on a fixed ring, with 22ms exponential-follow tuning; unchanged hover attributes are not rewritten. Native pointer, input selection, idle stopping, touch gating, and reduced-motion behavior remain.
- Contact actions and Simple-view content appear immediately. Portrait blur stays static; the glow fades without changing blur. Next.js responsive image optimization and preload replace the unoptimized portrait.
- The 1.2-second shutter remains, using a cancellable Web Animations sequence. Repeated clicks reverse the pending target and continue from the current shade transform. Reduced motion switches immediately.
- Contribution data is cached in memory for five minutes. Requests time out after eight seconds and report unavailable status; cleanup prevents updates after unmount. This is browser-session memory, not persistent or server caching.
- Floating view-switch blur is reduced and its permanent compositor hint removed. Removed obsolete sidebar/studio prototypes and their related CSS, plus superseded text-reveal/theme-icon rules.
- Major cards use consistent 16px corners; control radius is 10px. Shared bracketed headings cover About, Activity, Highlights, Experience, Education, Projects, Writing, Skills, Certifications, Achievements, and Volunteering. Removed duplicate section margins/padding; heading-to-content spacing is 20px and work rows use 16px vertical padding.
- The constellation remains the only project interaction. Summary changes use a short fade, with reserved vertical space to reduce jumping. The clock remains mobile-friendly and monochrome.
- Background canvas safeguards were retained. No speculative canvas rendering rewrite was made without a browser trace.

### Verification

Production build, full ESLint, TypeScript checks, and whitespace validation pass. Production home, both blog pages, robots.txt, and sitemap.xml returned HTTP 200. Focused mocked-environment checks passed for cursor convergence at 60/120Hz-style timestamps, idle stopping, unchanged hover state, native input cursor, keyboard interaction, preference gating, and cleanup; theme checks passed for timing, reversal, interrupted-shade continuity, reduced motion, and cleanup. These checks validate scheduling/logic, not real rendered FPS or browser layout.

The optimized 128px portrait response is 994 bytes and the 256px response is 2,578 bytes. The 256px output was visually inspected to confirm the intended portrait remains. This does not measure LCP.

Home-page referenced static assets: baseline 810,994 bytes / estimated gzip 240,794 bytes; after 764,518 bytes / estimated gzip 227,229 bytes. Method: sum unique static references in production home HTML; gzip each asset locally. This is an asset estimate, not observed browser transfer, total lazy-loaded code, or interaction performance.

No browser surface was available for real-device screenshots or performance traces. Safari, mobile visual QA, dropped-frame measurements, and field Core Web Vitals remain unverified. No deployment or GitHub push was performed.
