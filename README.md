# NexFlow — Automate. Integrate. Elevate.

Portfolio + landing page RTL عربي لخدمات الذكاء الاصطناعي والأتمتة. موقع احترافي يعرض خدمات الأتمتة الذكية للمحلات التجارية وأصحاب المشاريع الصغيرة والمتوسطة في الأسواق العربية.

## Tech Stack

| |  |  |
|--|--|--|
| **Framework** | Next.js 16 (App Router) | TypeScript |
| **Styling** | Tailwind CSS v4 | PostCSS |
| **Animation** | GSAP + ScrollTrigger | Framer Motion |
| **Smooth Scroll** | Lenis |  |
| **3D** | Three.js + React Three Fiber | `ssr: false` |
| **Fonts** | IBM Plex Sans Arabic | Inter |

## Brand Identity

- **Primary:** `#00E5FF` · **Secondary:** `#0099FF`
- **Background:** `#050B18` · **Surface:** `#0D172A`
- **Design:** Dark theme · Glassmorphism · Futuristic AI
- **Language:** Arabic RTL (`dir="rtl" lang="ar"`)

## Sections

1. **Hero** — GSAP word-stagger headline, NeuralNetwork 3D background, CTA ← Telegram/WhatsApp
2. **Problems & Solution** — 3 problem cards + solution card
3. **Services** — 3 tilted glass cards (Code, Bot, Workflow)
4. **Stats** — Animated counters
5. **Case Study** — Split-screen text + mockup with GSAP reveals
6. **Process Timeline** — 5-step horizontal timeline with traveling glow dot
7. **Final CTA** — Telegram bot preview mockup
8. **Footer** — 4 columns, social links, copyright

## Getting Started

```bash
npm install
npm run dev     # → localhost:3000
npm run build   # production build
npm run lint    # eslint
```

## Project Structure

```
src/
├── app/                  # App Router (layout, page, globals.css)
├── components/
│   ├── sections/         # Page sections (Hero, Services, etc.)
│   ├── three/            # Three.js (NeuralNetwork, WebGLGuard)
│   └── ui/               # Reusable (Button, GlassCard, Navbar, etc.)
├── lib/                  # LenisProvider, utilities
public/brand/             # Favicons, OG banner, logo animation
```

## Deployment

Deployed on [Vercel](https://vercel.com). Connect your fork and it Just Works™ — zero config.
