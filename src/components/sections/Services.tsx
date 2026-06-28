"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GlassCard } from "@/components/ui/GlassCard";

const services = [
  {
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="m18 16 4-4-4-4" />
        <path d="m6 8-4 4 4 4" />
        <path d="m14.5 4-5 16" />
      </svg>
    ),
    title: "تطوير المواقع الإلكترونية الاحترافية",
    desc: "تصميم وبناء مواقع وتطبيقات ويب سريعة، حديثة، ومتجاوبة بالكامل مع الهواتف.",
  },
  {
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        <path d="M8 10h.01" />
        <path d="M12 10h.01" />
        <path d="M16 10h.01" />
        <path d="M9 16H5" />
        <path d="M5 3v4" />
        <path d="M19 3v4" />
        <path d="M9 13h6" />
        <path d="M9 16h2" />
        <path d="M13 16h2" />
      </svg>
    ),
    title: "بوتات خدمة العملاء والحجز التلقائي",
    desc: "بوتات ذكية لواتساب وتليغرام ترد فورًا وتدير الحجوزات.",
  },
  {
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="8" height="8" rx="1.5" />
        <rect x="14" y="2" width="8" height="8" rx="1.5" />
        <rect x="8" y="14" width="8" height="8" rx="1.5" />
        <path d="M10 6h4" />
        <path d="M12 10v4" />
      </svg>
    ),
    title: "أتمتة العمليات بالكامل",
    desc: "ربط جميع الأنظمة معًا لتعمل تلقائيًا بدون تدخل يدوي.",
  },
];

export default function Services() {
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    function init() {
      const cards = cardsRef.current?.querySelectorAll(".service-card");
      if (cards?.length) {
        gsap.fromTo(
          cards,
          { y: 60, opacity: 0, rotateX: 15, transformPerspective: 800 },
          {
            y: 0, opacity: 1, rotateX: 0,
            duration: 0.8, stagger: 0.12, ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 80%",
              once: true,
            },
          },
        );
      }

      const icons = cardsRef.current?.querySelectorAll(".service-icon");
      if (icons?.length) {
        gsap.fromTo(
          icons,
          { scale: 0, rotate: -30 },
          {
            scale: 1, rotate: 0,
            duration: 0.6, stagger: 0.15, ease: "back.out(2.5)",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 75%",
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
    <section className="section-padding" id="services">
      <div className="container-narrow">
        <h2 className="text-display-xl font-bold text-white text-center mb-4">
          كيف أساعد مشروعك على النمو؟
        </h2>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {services.map((s, i) => (
            <GlassCard key={i} tilt className="service-card group">
              <div className="flex flex-col gap-4">
                <div className="service-icon w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                  {s.icon}
                </div>
                <h3 className="text-heading font-semibold text-white">
                  {s.title}
                </h3>
                <p className="text-body-sm text-body leading-relaxed">
                  {s.desc}
                </p>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
