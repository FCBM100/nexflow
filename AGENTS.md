# NexFlow — AGENTS.md

## Source of truth
Read these **before** writing any code:
- `PRD.md` — product, design spec, brand assets, motion system, RTL rules, open questions
- `TASKS.md` — 18 sequential phases (0–17), Definition of Done per phase
- `DESIGN (1).md` — Vercel-style design tokens (visual language reference, not direct copy)

## Project identity
- **NexFlow** — Arabic RTL portfolio + landing page for AI/automation services
- Brand colors: `#00E5FF` primary, `#0099FF` secondary, `#050B18` background, `#0D172A` surface
- Tagline: "Automate. Integrate. Elevate."
- Audience: business owners, shop owners, SMEs in Arabic-speaking markets

## Tech stack (PRD §7.1)
```
Next.js 16 (App Router) + TypeScript
Tailwind CSS v4
Framer Motion      → UI interactions, magnetic buttons, animated counters
GSAP + ScrollTrigger → scroll reveals, parallax
Three.js + R3F     → Hero particle field / neural network (lazy loaded)
Lenis              → smooth scroll
```

## Build order (TASKS.md)
Must follow phases in sequence. Key dependencies:
- **Phase 0** (research): use Firecrawl to analyze vercel.com, linear.app, stripe.com, framer.com, openai.com — ✅ DONE
- **Phase 1** (setup): `npx create-next-app@latest` + install all packages — ✅ DONE
- **Phase 4** (loading screen + navbar) must come before any section component
- **Phase 13** (global polish) requires all sections built first
- **Phase 14** (performance): dynamic import Three.js (`ssr: false`)
- **Phase 16** (QA): Playwright screenshots at 375/768/1440/1920px
- **Phase 17** (deployment): Vercel

## Critical rules
1. **RTL first**: `<html dir="rtl" lang="ar">`, use Tailwind logical properties (`ms-`/`me-`/`ps-`/`pe-`), never `ml-`/`mr-`
2. **All text is static Arabic** from PRD — do not rewrite or translate
3. **Loading screen max 2.5s** — video is 6s, show partial loop only
4. **Every section must have a unique reveal effect** (PRD §6 + TASKS §13)
5. **`prefers-reduced-motion`**: disable heavy animations (particles, parallax), preserve fades
6. **Loading screen video**: prefer `.webm`, fallback `.mp4`, always include `poster` frame
7. **Three.js**: dynamic import (lazy, ssr: false) — never part of main bundle
8. **Numbers**: use English numerals (1, 2, 3) per PRD §7.3 default

## Open questions (must resolve before Phase 5)
Ask user about these early:
1. Exact Telegram link for CTA buttons
2. 2D asset (default) vs 3D model for Hero robot (PRD §5)
3. Whether non-numeric stats ("ثوانٍ معدودة") get approximate numbers or stay text-only
4. Domain name for deployment (Phase 17)

## Asset pipeline
- Raw assets in repo root (`.jpg`, `.mp4`, `.webm`, `.png`)
- Move to `public/brand/` and rename per PRD §7.2 (Phase 3)
- Generate full favicon set from `photo_2026-06-18_20-41-27.jpg` (Phase 3)
- `og-banner-1200x630.jpg` is already correct size — use for `og:image` and `twitter:image`

## Testing
- Phase 16: Playwright for visual regression on 4 breakpoints
- Phase 14: Lighthouse Performance ≥ 90 Mobile, LCP < 2.5s
- No unit test framework specified — manual visual QA is primary

## Current state (Post-Phase 1)
- **Next.js 16.2.9** with TypeScript + Tailwind v4 + App Router + src/ dir
- **Tailwind v4** — uses `@theme` in CSS (NOT `tailwind.config.ts`). Configure colors in `src/app/globals.css`
- **Deps installed:** framer-motion, gsap, three, @react-three/fiber, @react-three/drei, lenis
- **Layout:** RTL (`dir="rtl" lang="ar"`), IBM Plex Sans Arabic + Inter via `next/font`
- **Folder structure:** `src/components/{sections,ui,three}/`, `src/lib/`, `public/brand/`
- **Brand tokens** in globals.css as CSS variables via `@theme`
- Git initialized with first commit "Initial setup"

## Commands
```bash
npm run dev     # dev server
npm run build   # production build
npm run lint    # eslint
```
