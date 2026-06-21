"use client";

import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { MagneticWrapper } from "@/components/ui/MagneticWrapper";

const colors = [
  { name: "Primary", hex: "#00E5FF", var: "--color-primary" },
  { name: "Secondary", hex: "#0099FF", var: "--color-secondary" },
  { name: "Accent", hex: "#66F5FF", var: "--color-accent" },
  { name: "Background", hex: "#050B18", var: "--color-background" },
  { name: "Surface", hex: "#0D172A", var: "--color-surface" },
  { name: "Body", hex: "#B8C4D9", var: "--color-body" },
];

const spacings = [
  { name: "4px", value: "4" },
  { name: "8px", value: "8" },
  { name: "12px", value: "12" },
  { name: "16px", value: "16" },
  { name: "24px", value: "24" },
  { name: "32px", value: "32" },
  { name: "40px", value: "40" },
  { name: "48px", value: "48" },
];

function ColorSwatch({ name, hex }: { name: string; hex: string }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className="size-16 rounded-xl border border-white/10 shadow-lg"
        style={{ backgroundColor: hex }}
      />
      <div className="text-center">
        <p className="text-sm font-medium text-white">{name}</p>
        <p className="text-xs text-body/60 font-latin">{hex}</p>
      </div>
    </div>
  );
}

export default function DesignSystemShowcase() {
  return (
    <main className="min-h-dvh">
      <div className="section-padding">
        <div className="container-narrow space-y-24">
          {/* Header */}
          <header className="text-center space-y-4 pt-16">
            <h1 className="text-4xl md:text-5xl font-bold gradient-text">
              NexFlow Design System
            </h1>
            <p className="text-body/80 max-w-xl mx-auto font-latin">
              Phase 2 — Design tokens, components, and utility classes for the
              NexFlow brand identity.
            </p>
          </header>

          {/* Colors */}
          <section className="space-y-8">
            <h2 className="text-2xl font-bold text-white">Color Palette</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {colors.map((c) => (
                <ColorSwatch key={c.name} name={c.name} hex={c.hex} />
              ))}
            </div>
          </section>

          {/* Typography */}
          <section className="space-y-8">
            <h2 className="text-2xl font-bold text-white">Typography</h2>
            <div className="glass-card space-y-6">
              <div>
                <p className="text-xs text-body/40 font-latin mb-1">
                  IBM Plex Sans Arabic — Display / Headings
                </p>
                <p className="text-5xl font-bold text-white">
                  العربية — NexFlow
                </p>
              </div>
              <div className="border-t border-white/5 pt-6">
                <p className="text-xs text-body/40 font-latin mb-1">
                  Inter — Latin / Numbers
                </p>
                <p className="text-3xl font-semibold text-white font-latin">
                  ABC abc 123 456 — NexFlow
                </p>
              </div>
              <div className="border-t border-white/5 pt-6 space-y-2">
                <p className="text-xs text-body/40 font-latin">Body Text</p>
                <p className="text-body/80 leading-relaxed max-w-prose">
                  شريكك التقني لبناء المواقع والبوتات الذكية والأتمتة. نحن
                  هنا لنساعدك على تحويل أفكارك إلى واقع رقمي متكامل.
                </p>
              </div>
            </div>
          </section>

          {/* Buttons */}
          <section className="space-y-8">
            <h2 className="text-2xl font-bold text-white">Buttons</h2>
            <div className="glass-card space-y-8">
              {(["sm", "md", "lg", "xl"] as const).map((size) => (
                <div key={size} className="space-y-3">
                  <p className="text-xs text-body/40 font-latin uppercase">
                    {size}
                  </p>
                  <div className="flex flex-wrap items-center gap-4">
                    <Button
                      variant="primary"
                      size={size}
                      icon={
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M5 12h14" />
                          <path d="m12 5 7 7-7 7" />
                        </svg>
                      }
                    >
                      ابدأ الآن
                    </Button>

                    <Button variant="secondary" size={size}>
                      شاهد أعمالي
                    </Button>

                    <Button variant="ghost" size={size}>
                      تواصل معي
                    </Button>

                    <Button variant="primary" size={size} disabled>
                      غير متاح
                    </Button>

                    <Button variant="primary" size={size} loading>
                      جاري التحميل
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Magnetic Buttons */}
          <section className="space-y-8">
            <h2 className="text-2xl font-bold text-white">
              Magnetic Buttons
            </h2>
            <div className="glass-card">
              <p className="text-body/60 mb-6">
                Hover over these buttons — they follow your cursor.
              </p>
              <div className="flex flex-wrap gap-6">
                <MagneticWrapper strength={0.4}>
                  <Button
                    variant="primary"
                    size="lg"
                    icon={
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                      </svg>
                    }
                  >
                    ابدأ بأتمتة عملك
                  </Button>
                </MagneticWrapper>
                <MagneticWrapper strength={0.3}>
                  <Button variant="secondary" size="lg">
                    📂 شاهد أعمالي
                  </Button>
                </MagneticWrapper>
              </div>
            </div>
          </section>

          {/* GlassCard Variants */}
          <section className="space-y-8">
            <h2 className="text-2xl font-bold text-white">Glass Cards</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <GlassCard>
                <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <span className="text-primary text-lg">⚙️</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  أتمتة العمليات
                </h3>
                <p className="text-sm text-body/70 leading-relaxed">
                  ربط جميع الأنظمة معًا لتعمل تلقائيًا بدون تدخل يدوي.
                </p>
              </GlassCard>

              <GlassCard glow>
                <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <span className="text-primary text-lg">🤖</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  بوتات ذكية
                </h3>
                <p className="text-sm text-body/70 leading-relaxed">
                  بوتات لواتساب وتليغرام ترد فورًا وتدير الحجوزات تلقائيًا.
                </p>
              </GlassCard>

              <GlassCard gradientBorder>
                <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <span className="text-primary text-lg">🌐</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  تطوير المواقع
                </h3>
                <p className="text-sm text-body/70 leading-relaxed">
                  تصميم وبناء مواقع وتطبيقات ويب سريعة ومتجاوبة.
                </p>
              </GlassCard>
            </div>
          </section>

          {/* Utility Classes */}
          <section className="space-y-8 pb-24">
            <h2 className="text-2xl font-bold text-white">
              Utility Classes
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="glass-card space-y-4">
                <h3 className="font-bold text-white">Neon Glow</h3>
                <div className="flex gap-4">
                  <div className="size-14 rounded-lg neon-glow bg-surface" />
                  <div className="size-14 rounded-lg neon-glow-sm bg-surface" />
                </div>
                <p className="text-xs text-body/40 font-latin">
                  .neon-glow / .neon-glow-sm
                </p>
              </div>
              <div className="glass-card space-y-4">
                <h3 className="font-bold text-white">Gradient Text</h3>
                <p className="text-2xl font-bold gradient-text">
                  .gradient-text
                </p>
                <p className="text-xs text-body/40 font-latin">
                  primary → secondary → accent
                </p>
              </div>
              <div className="glass-card space-y-4">
                <h3 className="font-bold text-white">Mesh Gradient</h3>
                <div className="h-20 rounded-lg mesh-gradient border border-white/5" />
                <p className="text-xs text-body/40 font-latin">.mesh-gradient</p>
              </div>
              <div className="glass-card space-y-4">
                <h3 className="font-bold text-white">Section Padding</h3>
                <p className="text-xs text-body/40 font-latin">
                  .section-padding: 80px→120px vertical · responsive
                </p>
                <p className="text-xs text-body/40 font-latin">
                  .container-narrow: max-width 1200px · centered
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
