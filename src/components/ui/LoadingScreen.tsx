"use client";

import { useEffect, useRef, useState } from "react";

interface LoadingScreenProps {
  onFinish: () => void;
}

export default function LoadingScreen({ onFinish }: LoadingScreenProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    async function run() {
      try {
        const gsapMod = await import("gsap");
        const gsap = gsapMod.default;

        if (!reduced) {
          const tl = gsap.timeline();

          tl.fromTo(
            barRef.current,
            { scaleX: 0 },
            { scaleX: 1, duration: 2.2, ease: "power3.inOut", transformOrigin: "right center" }
          );

          tl.fromTo(
            textRef.current,
            { opacity: 0, y: 12 },
            { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
            "0.3"
          );

          tl.fromTo(
            taglineRef.current,
            { opacity: 0, y: 8 },
            { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
            "-=0.2"
          );

          await new Promise((resolve) => setTimeout(resolve, 2400));

          gsap.to(overlayRef.current, {
            opacity: 0,
            scale: 1.05,
            duration: 0.6,
            ease: "power3.inOut",
            onComplete: () => {
              setVisible(false);
              onFinish();
            },
          });
        } else {
          await new Promise((resolve) => setTimeout(resolve, 2200));
          setVisible(false);
          onFinish();
        }
      } catch {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setVisible(false);
        onFinish();
      }
    }

    run();
  }, [onFinish]);

  if (!visible) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050B18]"
    >
      <div className="flex flex-col items-center gap-8">
        <video
          autoPlay
          muted
          playsInline
          poster="/brand/logo-poster.jpg"
          className="w-48 h-48 md:w-64 md:h-64 object-contain"
        >
          <source src="/brand/logo-animation.webm" type="video/webm" />
        </video>

        <div className="flex flex-col items-center gap-3">
          <div className="w-32 md:w-40 h-0.5 bg-white/5 rounded-full overflow-hidden">
            <div
              ref={barRef}
              className="h-full w-full bg-primary rounded-full origin-right"
            />
          </div>

          <div ref={textRef} className="opacity-0">
            <span className="font-latin text-sm font-semibold text-white tracking-[0.15em]">
              NexFlow
            </span>
          </div>

          <p
            ref={taglineRef}
            className="opacity-0 font-latin text-[10px] text-primary/50 tracking-[0.08em]"
          >
            Automate. Integrate. Elevate.
          </p>
        </div>
      </div>
    </div>
  );
}
