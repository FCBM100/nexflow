"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function AnimatedNumber({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [displayed, setDisplayed] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let cleared = false;
    let timer: ReturnType<typeof setInterval> | null = null;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || cleared) return;
        cleared = true;
        obs.disconnect();

        let start = 0;
        const duration = 1200;
        const step = 16;
        const totalSteps = duration / step;
        const increment = to / totalSteps;

        timer = setInterval(() => {
          start += increment;
          if (start >= to) {
            setDisplayed(to);
            if (timer) clearInterval(timer);
          } else {
            setDisplayed(Math.floor(start));
          }
        }, step);
      },
      { threshold: 0.5 },
    );

    obs.observe(el);
    return () => {
      cleared = true;
      obs.disconnect();
      if (timer) clearInterval(timer);
    };
  }, [to]);

  return (
    <span ref={ref} className="font-latin">
      {displayed}{suffix}
    </span>
  );
}

const stats = [
  {
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    label: "تشغيل مستمر",
    value: "24/7",
    isCounter: true,
    counterTo: 24,
    counterSuffix: "/7",
  },
  {
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    label: "أتمتة للمهام المتكررة",
    value: "100%",
    isCounter: true,
    counterTo: 100,
    counterSuffix: "%",
  },
  {
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
    label: "للرد على العملاء",
    value: "ثوانٍ معدودة",
    isText: true,
  },
  {
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
    label: "زيادة الإنتاجية بشكل ملحوظ",
    isText: true,
  },
];

export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    function init() {
      const badges = sectionRef.current?.querySelectorAll(".stat-badge");
      if (badges?.length) {
        gsap.fromTo(
          badges,
          { scale: 0.8, opacity: 0, y: 20 },
          {
            scale: 1, opacity: 1, y: 0,
            duration: 0.5, stagger: 0.15, ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 85%",
              once: true,
            },
          },
        );
      }
    }

    if (document.readyState === "complete") { init(); return; }
    window.addEventListener("load", init, { once: true });
  }, []);

  return (
    <section ref={sectionRef} className="section-padding" id="stats">
      <div className="container-narrow">
        <div className="flex flex-col gap-4">
          {stats.map((s, i) => (
            <div
              key={i}
              className="stat-badge flex flex-col items-center text-center p-6 md:p-8 rounded-2xl"
              style={{
                background:
                  "linear-gradient(135deg, rgba(13,23,42,0.6) 0%, rgba(13,23,42,0.3) 100%)",
                border: "1px solid rgba(0,229,255,0.08)",
              }}
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-3">
                {s.icon}
              </div>
              <span className="text-display-lg font-bold text-white mb-1 font-latin">
                {s.isCounter ? (
                  <AnimatedNumber to={s.counterTo!} suffix={s.counterSuffix!} />
                ) : (
                  s.value
                )}
              </span>
              <span className="text-body-sm text-body/80">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
