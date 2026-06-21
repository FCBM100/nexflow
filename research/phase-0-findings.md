# Phase 0 — Research & Discovery Findings

> Date: 2026-06-21
> Sites analyzed: vercel.com, linear.app, stripe.com, framer.com, openai.com

---

## 1. Vercel.com — Dark SaaS / Platform

**Layout:**
- Full-screen dark hero with animated gradient glow background
- 3 feature sections stacked vertically (Agents / Apps / Platforms)
- Each section: headline → description → customer logo → feature pill list
- Latest news carousel at bottom
- Minimal footer with single CTA

**Scroll-reveal patterns:**
- Sections fade in with subtle vertical slide (~30px)
- Cards within sections stagger with ~100ms delay
- No parallax — relies on gradient glow animation for depth

**Transition speeds:**
- Section reveals: ~600-800ms ease-out
- Stagger between cards: ~100ms

**Key takeaways for NexFlow:**
- Dark hero with ambient glow is proven pattern
- Keep section count low (3-4 main sections)
- Customer logos build trust

---

## 2. Linear.app — Dark Product Tool

**Layout:**
- Very dark theme (#08090a background)
- Animated product mockup as primary hero visual
- Feature sections numbered 1.0-5.0 with interactive previews
- Real issue board UI shown as screenshot
- Customer testimonials with pull quotes
- Changelog feed before footer

**Scroll-reveal patterns:**
- Sticky side navigation that updates on scroll
- Sections slide in from opposite sides (alternating L/R)
- Product screenshots have subtle 3D perspective on scroll
- Smooth continuous scroll — no abrupt jumps

**Transition speeds:**
- Section reveals: ~700-900ms
- Stagger delay: ~80-120ms

**Key takeaways for NexFlow:**
- Alternating entry directions keep scroll interesting
- Numbered steps work well for service breakdown
- Real UI screenshots > abstract illustrations

---

## 3. Stripe.com — Light Enterprise / Financial

**Layout:**
- Clean white background with large animated stat counter (1.66781378% GDP)
- Interactive bento grid product showcase (6-8 panels)
- Customer story carousel with logos
- Large stat section ($1.9T, 99.999%)
- Multi-column news grid

**Scroll-reveal patterns:**
- Stats animate into view counting up
- Bento grid panels reveal staggered with slight scale-up
- Testimonial headshots fade in with spring animation
- Code snippets slide in from right

**Transition speeds:**
- Counter animations: ~1.5-2s ease-out
- Panel reveals: ~400-600ms
- Spring animations: natural damping

**Key takeaways for NexFlow:**
- Animated counters are essential for credibility
- Bento grid layout for service showcase
- Testimonial section with real quotes

---

## 4. Framer.com — Design Tool / Builder

**Layout:**
- Design tool UI screenshot as main hero
- Product interface shown with annotations
- Feature sections show the tool in action
- Community/marketplace feed (social proof)
- Customer story cards with logos
- Stats section (99.99% uptime, 414 live visitors)

**Scroll-reveal patterns:**
- Tool interface mockups have smooth reveal
- Community posts have infinite horizontal scroll
- Agent interaction logs shown as terminal output
- Stats appear with counter animation

**Transition speeds:**
- Interface reveals: ~500-700ms
- Horizontal scroll: continuous
- Terminal typing effect: ~30-50ms per char

**Key takeaways for NexFlow:**
- Showcasing the "tool in action" builds understanding
- Community numbers as social proof
- Horizontal scroll for dense content

---

## 5. OpenAI.com — Content / Research

**Layout:**
- Content-first hero with article card grid
- Featured research/announcement cards (3-4 in grid)
- Recent news feed (timeline layout)
- Latest research section
- Business stories section
- ChatGPT prompt suggestions as decorative element

**Scroll-reveal patterns:**
- Card grid reveals with staggered fade-up
- News items simple fade-in
- Minimal animation — content is primary

**Transition speeds:**
- Card reveals: ~400-500ms (faster than others — content priority)
- Very subtle movement

**Key takeaways for NexFlow:**
- Content hierarchy over complex animation
- Card grid for multiple items
- When content is the hero, keep animations subtle

---

## Patterns Summary for NexFlow

| Pattern | Source | Apply to NexFlow |
|---------|--------|-----------------|
| Dark hero with glow | Vercel | Hero section ambient glow |
| Animated counters | Stripe | Stats section (خدمنا + مشاريع + تقييم) |
| Numbered steps | Linear | Services breakdown |
| Section stagger reveal | All | Every section unique reveal |
| Alternating entry sides | Linear | Keep RTL in mind (entries from right) |
| Bento grid | Stripe | Services/features panel |
| Customer logos/social proof | All | Testimonials section |
| Terminal/code display | Stripe/Framer | Not applicable (Arabic audience) |
| Content cards | OpenAI | Blog/news if added later |

## Transition Speeds Reference
- Section reveals: 600-900ms (primary)
- Stagger between items: 80-120ms
- Counter animations: 1500-2000ms
- Subtle reveals (content-first): 400-500ms
- Parallax depth: minimal (20-40px offset)
