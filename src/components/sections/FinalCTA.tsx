"use client";

import { useEffect, useRef, useCallback } from "react";
import { MagneticWrapper } from "@/components/ui/MagneticWrapper";
import { Button } from "@/components/ui/Button";

export default function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const meshRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const btnRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);

  const animate = useCallback(async () => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    const gsap = (await import("gsap")).default;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 85%",
        once: true,
      },
    });

    // Background mesh: radial wipe from center
    tl.fromTo(
      meshRef.current,
      { clipPath: "circle(0% at 50% 50%)", opacity: 0 },
      { clipPath: "circle(120% at 50% 50%)", opacity: 1, duration: 1.2, ease: "power3.inOut" },
    );

    // Title: staggered word reveal
    const titleWords = titleRef.current?.querySelectorAll(".word");
    if (titleWords?.length) {
      tl.fromTo(
        titleWords,
        { x: 40, opacity: 0, filter: "blur(6px)" },
        { x: 0, opacity: 1, filter: "blur(0px)", duration: 0.6, stagger: 0.06, ease: "power3.out" },
        "-=0.6",
      );
    }

    // Bot mockup
    tl.fromTo(
      mockupRef.current,
      { y: 30, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: "power3.out" },
      "-=0.3",
    );

    // Description
    tl.fromTo(
      descRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
      "-=0.3",
    );

    // Button: spring scale-in
    tl.fromTo(
      btnRef.current,
      { scale: 0.6, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.7, ease: "back.out(1.7)" },
      "-=0.2",
    );
  }, []);

  useEffect(() => {
    animate();
  }, [animate]);

  return (
    <section
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
      id="contact"
    >
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
        <h2
          ref={titleRef}
          className="text-display-xl gradient-text font-bold max-w-[800px] text-balance"
        >
          {"جاهز لتبني موقعك وتنقل مشروعك للمستوى القادم؟"
            .split(" ")
            .map((word, i) => (
              <span key={i} className="word inline-block ms-[0.15em]">
                {word}
              </span>
            ))}
        </h2>

        {/* Telegram Bot Preview — calm & beautiful */}
        <div
          ref={mockupRef}
          className="mt-10 w-full max-w-sm mx-auto"
          style={{ opacity: 0 }}
        >
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
                  <p className="text-sm text-body/80 leading-relaxed">
                    أهلاً بك. راسلني وأخبرني عن مشروعك، وسأعود إليك قريباً
                    لنبدأ معاً.
                  </p>
                </div>
              </div>
              <div className="flex justify-end">
                <div className="bg-primary/10 rounded-2xl rounded-tl-sm px-4 py-2.5 max-w-[85%]">
                  <p className="text-sm text-white/90 leading-relaxed">
                    عندي محل وأبغى بوت يحجز مواعيد ويرد على الزبائن. كم تكلفة؟
                  </p>
                </div>
              </div>
              <div className="flex justify-start">
                <div className="bg-surface/60 rounded-2xl rounded-tr-sm px-4 py-2.5 max-w-[85%]">
                  <p className="text-sm text-body/80 leading-relaxed">
                    يسعدني مساعدتك. دعنا نناقش التفاصيل ونضع خطة مناسبة لك
                    ولعملك.
                  </p>
                  <p className="text-xs text-primary/40 mt-1">✓ أنا موجود</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p
          ref={descRef}
          className="text-body text-body max-w-[650px] mt-6 leading-relaxed"
          style={{ opacity: 0 }}
        >
          اترك رسالة هادئة على تليغرام وسأعود إليك لأفهم مشروعك تماماً وأقدم لك
          أفضل حل يناسبك.
        </p>

        <div ref={btnRef} className="mt-8" style={{ opacity: 0 }}>
          <MagneticWrapper strength={0.3}>
            <Button
              variant="primary"
              size="xl"
              className="text-base px-8 py-4 h-auto"
              onClick={() =>
                window.open("https://t.me/FGGHJ74", "_blank")
              }
            >
              <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 2 11 13" />
                <path d="M22 2 15 22 11 13 2 9 22 2" />
              </svg>
              تواصل معي على تليغرام
            </Button>
          </MagneticWrapper>
        </div>
      </div>
    </section>
  );
}
