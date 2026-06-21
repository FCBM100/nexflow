"use client";

import { useEffect, useRef, useCallback } from "react";

export default function CaseStudy() {
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const connectorRef = useRef<HTMLDivElement>(null);

  const animate = useCallback(async () => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    const gsap = (await import("gsap")).default;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: leftRef.current?.parentElement,
        start: "top 80%",
        once: true,
      },
    });

    tl.fromTo(
      leftRef.current,
      { x: 60, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
    );

    tl.fromTo(
      rightRef.current,
      { opacity: 0, filter: "blur(8px)" },
      { opacity: 1, filter: "blur(0px)", duration: 0.8, ease: "power3.out" },
      "-=0.4",
    );

    tl.fromTo(
      connectorRef.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 0.6,
        ease: "power3.inOut",
        transformOrigin: "right center",
      },
      "-=0.5",
    );
  }, []);

  useEffect(() => {
    animate();
  }, [animate]);

  return (
    <section className="section-padding" id="work">
      <div className="container-narrow">
        <h2 className="text-display-xl font-bold text-white text-center mb-12">
          <span className="inline-block w-8 h-8 text-primary align-middle me-2">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
          </span>
          نظام مبيعات وحجز مؤتمت بالكامل
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left — Text */}
          <div ref={leftRef} className="lg:col-span-5 space-y-6">
            <p className="text-body text-body leading-relaxed">
ماذا أفعل أبني أنظمة أتمتة ذكية للمحلات التجارية، تتضمن بوتات
تفاعلية لخدمة العملاء. من خلال هذه الأنظمة، أضمن لك رداً فورياً
على زبائنك، وإمكانية تصفحهم لمنتجاتك لحظة بلحظة، مع إتمام عمليات
الحجز وتحديث البيانات تلقائياً وبدون تدخل يدوي
            </p>

            <div className="space-y-4 pt-2">
              {[
                "تقليل وقت الرد بشكل كبير.",
                "تنظيم كامل للحجوزات.",
                "تقليل الأخطاء البشرية.",
                "تجربة أفضل للزبائن.",
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 text-body text-white/80"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Right — Chat/Screen Mockup */}
          <div
            ref={rightRef}
            className="lg:col-span-7 relative"
          >
            <div className="glass-card p-6 md:p-8 max-w-md mx-auto">
              {/* Chat header */}
              <div className="flex items-center gap-3 pb-4 border-b border-white/5 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary text-sm font-semibold">
                  ن
                </div>
                <div>
                  <p className="text-sm text-white font-medium">NexFlow Bot</p>
                  <p className="text-xs text-primary/60">نشط الآن</p>
                </div>
              </div>

              {/* Chat messages */}
              <div className="space-y-3">
                <div className="flex justify-start">
                  <div className="bg-surface/80 rounded-2xl rounded-tr-sm px-4 py-3 max-w-[80%]">
                    <p className="text-sm text-body">
                      مرحباً! كيف يمكنني مساعدتك؟
                    </p>
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="bg-primary/20 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[80%]">
                    <p className="text-sm text-white">
                      أبي أحجز طاولة لشخصين بكرة الساعة ٨
                    </p>
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="bg-surface/80 rounded-2xl rounded-tr-sm px-4 py-3 max-w-[80%]">
                    <p className="text-sm text-body">
                      تم حجز طاولة لشخصين بكرة الساعة ٨:٠٠ مساءً ✅
                    </p>
                    <p className="text-xs text-primary/60 mt-1">
                      تم التحديث تلقائيًا
                    </p>
                  </div>
                </div>
              </div>

              {/* Input bar */}
              <div className="mt-4 pt-4 border-t border-white/5">
                <div className="flex items-center gap-2 bg-background/60 rounded-xl px-4 py-3">
                  <span className="text-xs text-body/40 flex-1">
                    اكتب رسالتك...
                  </span>
                  <span className="w-6 h-6 rounded-lg bg-primary/20 text-primary flex items-center justify-center">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="22" y1="2" x2="11" y2="13" />
                      <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>

            {/* Connector accent line */}
            <div
              ref={connectorRef}
              className="hidden lg:block absolute -left-6 top-1/2 -translate-y-1/2 w-1 h-32"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(0,229,255,0.4), transparent)",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
