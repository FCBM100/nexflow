"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { MagneticWrapper } from "@/components/ui/MagneticWrapper";
import { Button } from "@/components/ui/Button";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    function init() {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      const titleWords = titleRef.current?.querySelectorAll(".word");
      if (titleWords?.length) {
        tl.fromTo(
          titleWords,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.08 },
        );
      }

      tl.fromTo(
        subtitleRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        "-=0.2",
      );

      tl.fromTo(
        buttonsRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        "-=0.3",
      );
    }

    if (document.readyState === "complete") { init(); return; }
    window.addEventListener("load", init, { once: true });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-dvh flex items-center justify-center overflow-hidden section-padding pt-24 md:pt-28"
    >
      <div className="relative z-10 container-narrow flex flex-col items-center text-center">
        {/* Logo visual */}
        <div className="mb-8 md:mb-10 w-32 md:w-40">
          <video
            autoPlay
            muted
            loop
            playsInline
            poster="/brand/logo-poster.jpg"
            className="w-full h-auto"
          >
            <source src="/brand/logo-animation.webm" type="video/webm" />
          </video>
        </div>

        {/* Headline */}
        <h1
          ref={titleRef}
          className="text-display-2xl font-bold text-white max-w-[900px] text-balance leading-[1.1]"
        >
          {"تفرّغ لتطوير مشروعك.. واترك إدارة بيجك وأعمالك للأنظمة الذكية!"
            .split(" ")
            .map((word, i) => (
              <span key={i} className="word inline-block mr-[0.25em]">
                {word}
              </span>
            ))}
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="text-body-lg text-body max-w-[680px] mt-6 md:mt-8 text-balance leading-[1.7]"
        >
          أنا شريكك التقني. أساعد أصحاب البيجات، المحلات، والشركات الناشئة في
          بناء مواقع إلكترونية سريعة واحترافية، وتصميم بوتات ذكية تُدير حجزك
          وترد على زبائنك، مع أتمتة كاملة لأعمالك لتعمل على مدار الساعة بدون
          مجهود يدوي.
        </p>

        {/* Buttons */}
        <div
          ref={buttonsRef}
          className="flex flex-col sm:flex-row items-center gap-4 mt-8 md:mt-10"
        >
          <MagneticWrapper strength={0.3}>
            <Button
              variant="primary"
              size="xl"
              onClick={() =>
                window.open("https://t.me/FGGHJ74", "_blank")
              }
            >
              <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
                <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
                <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
                <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
              </svg>
              ابدأ بأتمتة عملك وبناء موقعك الآن
            </Button>
          </MagneticWrapper>
          <MagneticWrapper strength={0.3}>
            <Button
              variant="secondary"
              size="xl"
              onClick={() =>
                document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })
              }
            >
              <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
              </svg>
              ماذا أفعل
            </Button>
          </MagneticWrapper>
        </div>
      </div>
    </section>
  );
}
