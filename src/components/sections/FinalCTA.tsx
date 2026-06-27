"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MagneticWrapper } from "@/components/ui/MagneticWrapper";
import { Button } from "@/components/ui/Button";

export default function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const meshRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const btnRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    function init() {
      if (!sectionRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          once: true,
        },
      });

      tl.fromTo(
        meshRef.current,
        { clipPath: "circle(0% at 50% 50%)", opacity: 0 },
        { clipPath: "circle(120% at 50% 50%)", opacity: 1, duration: 1.2, ease: "power3.inOut" },
      );

      const titleWords = titleRef.current?.querySelectorAll(".word");
      if (titleWords?.length) {
        tl.fromTo(
          titleWords,
          { x: 40, opacity: 0, filter: "blur(6px)" },
          { x: 0, opacity: 1, filter: "blur(0px)", duration: 0.6, stagger: 0.06, ease: "power3.out" },
          "-=0.6",
        );
      }

      tl.fromTo(
        mockupRef.current,
        { y: 30, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: "power3.out" },
        "-=0.3",
      );

      tl.fromTo(
        descRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
        "-=0.3",
      );

      tl.fromTo(
        btnRef.current,
        { scale: 0.6, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.7, ease: "back.out(1.7)" },
        "-=0.2",
      );
    }

    if (document.readyState === "complete") { init(); return; }
    window.addEventListener("load", init, { once: true });
  }, []);

  return (
    <section ref={sectionRef} className="section-padding relative overflow-hidden" id="contact">
      {/* Ambient gradient mesh background — radial wipe reveal */}
      <div
        ref={meshRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0,
          clipPath: "circle(0% at 50% 50%)",
          background: [
            "radial-gradient(ellipse 80% 60% at 50% 20%, rgba(0,229,255,0.08) 0%, transparent 60%)",
            "radial-gradient(ellipse 50% 50% at 80% 80%, rgba(0,153,255,0.06) 0%, transparent 50%)",
            "radial-gradient(ellipse 40% 40% at 20% 50%, rgba(102,245,255,0.04) 0%, transparent 50%)",
          ].join(", "),
        }}
      />

      <div className="container-narrow relative z-10 flex flex-col items-center text-center">
        <h2 ref={titleRef} className="text-display-xl gradient-text font-bold max-w-[800px] text-balance">
          {"جاهز لتبني موقعك وتنقل مشروعك للمستوى القادم؟"
            .split(" ")
            .map((word, i) => (
              <span key={i} className="word inline-block ms-[0.15em]">{word}</span>
            ))}
        </h2>

        {/* Telegram Bot Preview */}
        <div ref={mockupRef} className="mt-10 w-full max-w-sm mx-auto" style={{ opacity: 0 }}>
          <div className="glass-card p-5 text-right">
            <div className="flex items-center gap-3 pb-3 border-b border-white/5 mb-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm text-white font-medium">NexFlow Bot</p>
                <p className="text-xs text-primary/50">يرد خلال دقائق</p>
              </div>
              <span className="w-2 h-2 rounded-full bg-primary/60" />
            </div>
            <div className="space-y-2.5">
              <div className="flex justify-start">
                <div className="bg-surface/60 rounded-2xl rounded-tr-sm px-4 py-2.5 max-w-[85%]">
                  <p className="text-sm text-body/80 leading-relaxed">أهلاً بك. راسلني وأخبرني عن مشروعك، وسأعود إليك قريباً</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p ref={descRef} className="text-body-lg text-body max-w-[600px] mt-6 text-balance leading-[1.7]">
          تواصل معي الآن عبر تليغرام، وأخبرني عن مشروعك، وسأضع خطة عملية مناسبة لك.
        </p>

        <div ref={btnRef} className="mt-8">
          <MagneticWrapper strength={0.3}>
            <Button
              variant="primary"
              size="xl"
              onClick={() => window.open("https://t.me/FGGHJ74", "_blank")}
            >
              <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
                <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
                <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
                <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
              </svg>
              تواصل معي الآن
            </Button>
          </MagneticWrapper>
        </div>
      </div>
    </section>
  );
}
