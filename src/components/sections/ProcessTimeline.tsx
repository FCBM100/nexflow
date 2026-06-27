"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const steps = [
  { num: "01", title: "تحليل المشروع", desc: "فهم متطلباتك وأهدافك التجارية لوضع خطة عمل مخصصة." },
  { num: "02", title: "تصميم الحل", desc: "رسم هيكلة النظام وتجربة المستخدم بما يناسب علامتك التجارية." },
  { num: "03", title: "التطوير والبرمجة", desc: "بناء الموقع أو البوت أو نظام الأتمتة بأحدث التقنيات." },
  { num: "04", title: "الاختبار والتحسين", desc: "اختبار شامل للأداء والتجربة وإجراء التحسينات اللازمة." },
  { num: "05", title: "الإطلاق والمتابعة", desc: "نشر المشروع وتقديم دعم فني ومتابعة دورية لضمان الاستقرار." },
];

export default function ProcessTimeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const connectorRef = useRef<HTMLDivElement>(null);
  const glowDotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    function init() {
      if (!sectionRef.current) return;

      const stepEls = sectionRef.current.querySelectorAll(".step-node");

      if (connectorRef.current) {
        gsap.fromTo(
          connectorRef.current,
          { scaleX: 0 },
          {
            scaleX: 1, duration: 1.2, ease: "power3.inOut",
            transformOrigin: "right center",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              once: true,
            },
          },
        );
      }

      if (glowDotRef.current) {
        gsap.to(glowDotRef.current, {
          left: "100%",
          duration: 1.4,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            end: "center 60%",
            scrub: 1,
          },
        });
      }

      stepEls.forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1,
            duration: 0.6, delay: i * 0.15, ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              once: true,
            },
          },
        );
      });
    }

    if (document.readyState === "complete") { init(); return; }
    window.addEventListener("load", init, { once: true });
  }, []);

  return (
    <section ref={sectionRef} className="section-padding" id="process">
      <div className="container-narrow">
        <h2 className="text-display-xl gradient-text font-bold text-center mb-4">
          خطوات العمل
        </h2>
        <p className="text-body text-body text-center max-w-lg mx-auto mb-12">
          رحلة متكاملة من الفكرة إلى الإطلاق
        </p>

        {/* Desktop: horizontal */}
        <div className="hidden md:block relative">
          {/* Connector line */}
          <div
            ref={connectorRef}
            className="absolute top-8 right-0 left-0 h-0.5 origin-right"
            style={{
              background:
                "linear-gradient(to left, rgba(0,229,255,0.4), rgba(0,229,255,0.05))",
            }}
          />
          {/* Traveling glow dot */}
          <div
            ref={glowDotRef}
            className="absolute top-6 right-0 w-1 h-1 rounded-full pointer-events-none"
            style={{
              background: "#00E5FF",
              boxShadow: "0 0 8px #00E5FF, 0 0 16px #00E5FF",
            }}
          />

          <div className="grid grid-cols-5 gap-6 relative">
            {steps.map((s, i) => (
              <div key={i} className="step-node flex flex-col items-center text-center group">
                <div className="relative z-10 w-16 h-16 rounded-full bg-surface border border-primary/20 flex items-center justify-center mb-4 group-hover:border-primary/50 transition-colors">
                  <span className="text-lg font-bold text-primary font-latin">{s.num}</span>
                </div>
                <h3 className="text-heading-sm font-semibold text-white mb-2">{s.title}</h3>
                <p className="text-body-sm text-body/70">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: vertical */}
        <div className="md:hidden relative">
          <div className="absolute top-0 bottom-0 right-[23px] w-0.5"
            style={{
              background:
                "linear-gradient(to bottom, rgba(0,229,255,0.3), rgba(0,229,255,0.05))",
            }}
          />

          <div className="space-y-8">
            {steps.map((s, i) => (
              <div key={i} className="step-node flex items-start gap-4 group">
                <div className="relative z-10 w-12 h-12 rounded-full bg-surface border border-primary/20 flex items-center justify-center shrink-0">
                  <span className="text-base font-bold text-primary font-latin">{s.num}</span>
                </div>
                <div className="pt-2">
                  <h3 className="text-heading-sm font-semibold text-white mb-1">{s.title}</h3>
                  <p className="text-body-sm text-body/70">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
