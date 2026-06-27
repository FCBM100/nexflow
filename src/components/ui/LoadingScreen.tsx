"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function LoadingScreen() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!reduced) {
      gsap.fromTo(
        barRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 1.4, ease: "power3.inOut", transformOrigin: "right center" },
      );
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out", delay: 0.2 },
      );
      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.3, ease: "power2.out", delay: 0.5 },
      );
    }

    function fadeOut() {
      if (!reduced) {
        gsap.to(overlayRef.current, {
          opacity: 0,
          duration: 0.4,
          ease: "power3.inOut",
          onComplete: () => setHidden(true),
        });
      } else {
        setHidden(true);
      }
    }

    if (document.readyState === "complete") {
      fadeOut();
    } else {
      window.addEventListener("load", fadeOut, { once: true });
    }
  }, []);

  if (hidden) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ backgroundColor: '#050B18' }}
    >
      <div className="flex flex-col items-center gap-8">
        <img
          src="/brand/logo-poster.jpg"
          alt="NexFlow"
          className="w-48 h-48 md:w-64 md:h-64 object-contain"
          loading="eager"
        />

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
            ref={subtitleRef}
            className="font-latin text-[10px] text-primary/50 tracking-[0.08em]"
            style={{ opacity: 0 }}
          >
            Automate. Integrate. Elevate.
          </p>
        </div>
      </div>
    </div>
  );
}
