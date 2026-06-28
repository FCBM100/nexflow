"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GlassCard } from "@/components/ui/GlassCard";

const problems = [
  {
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <line x1="22" y1="11" x2="18" y2="11" />
      </svg>
    ),
    title: "خسارة الزبائن",
    desc: "بسبب التأخر في الرد على الرسائل والاستفسارات المكررة.",
  },
  {
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
        <line x1="1" y1="1" x2="23" y2="23" />
      </svg>
    ),
    title: "غياب الهوية الرقمية",
    desc: "عدم امتلاك موقع خاص يعرض عملك بشكل احترافي ويثبت وجودك بالسوق.",
  },
  {
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
        <path d="M21 2v6h-6" />
      </svg>
    ),
    title: "المجهود اليدوي المكرر",
    desc: "ضياع وقتك يوميًا في تسجيل الحجوزات ومتابعة الطلبات يدويًا.",
  },
];

export default function ProblemSolution() {
  const cardsRef = useRef<HTMLDivElement>(null);
  const solutionRef = useRef<HTMLDivElement>(null);

  function onReady1() {
    const cards = cardsRef.current?.querySelectorAll(".problem-card");
    if (cards?.length) {
      gsap.fromTo(
        cards,
        { y: 60, opacity: 0, rotateX: 5 },
        {
          y: 0, opacity: 1, rotateX: 0,
          duration: 0.7, stagger: 0.12, ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 80%",
            once: true,
          },
        },
      );
    }
  }

  function onReady2() {
    if (solutionRef.current) {
      gsap.fromTo(
        solutionRef.current,
        { clipPath: "inset(0 100% 0 0)", opacity: 0 },
        {
          clipPath: "inset(0 0% 0 0)", opacity: 1,
          duration: 0.8, ease: "power3.inOut",
          scrollTrigger: {
            trigger: solutionRef.current,
            start: "top 85%",
            once: true,
          },
        },
      );
    }
  }

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;
    if (document.readyState === "complete") { onReady1(); return; }
    window.addEventListener("load", onReady1, { once: true });
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;
    if (document.readyState === "complete") { onReady2(); return; }
    window.addEventListener("load", onReady2, { once: true });
  }, []);

  return (
    <section className="section-padding" id="problems">
      <div className="container-narrow">
        <h2 className="text-display-xl gradient-text font-bold text-center mb-4">
          هل تعاني من هذه المشاكل في مشروعك؟
        </h2>

        <div ref={cardsRef} className="flex flex-col gap-5 mt-8">
          {problems.map((p, i) => (
            <div key={i} className="problem-card" style={{ perspective: "1000px" }}>
              <GlassCard gradientBorder tilt className="h-full group">
                <div className="flex flex-col items-center text-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                    {p.icon}
                  </div>
                  <h3 className="text-heading font-semibold text-white">
                    {p.title}
                  </h3>
                  <p className="text-body-sm text-body leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </GlassCard>
            </div>
          ))}
        </div>

        {/* Solution */}
        <div
          id="maza-af3al"
          ref={solutionRef}
          className="mt-12 p-6 rounded-[var(--radius-card)] text-center relative overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, rgba(0,229,255,0.06) 0%, rgba(0,153,255,0.04) 50%, transparent 100%)",
            border: "1px solid rgba(0,229,255,0.1)",
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 50% 0%, rgba(0,229,255,0.08) 0%, transparent 60%)",
            }}
          />
          <div className="relative z-10 max-w-2xl mx-auto">
            <h3 className="text-heading font-bold text-primary mb-3">
              ماذا أفعل؟
            </h3>
            <p className="text-body-lg text-white/80 leading-relaxed">
              ماذا أفعل أبني أنظمة أتمتة ذكية للمحلات التجارية، تتضمن بوتات
              تفاعلية لخدمة العملاء. من خلال هذه الأنظمة، أضمن لك رداً فورياً
              على زبائنك، وإمكانية تصفحهم لمنتجاتك لحظة بلحظة، مع إتمام عمليات
              الحجز وتحديث البيانات تلقائياً وبدون تدخل يدوي
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
