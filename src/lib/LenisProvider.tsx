"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface LenisProviderProps {
  children: ReactNode;
}

export default function LenisProvider({ children }: LenisProviderProps) {
  const inited = useRef(false);

  useEffect(() => {
    if (inited.current) return;

    let destroy: (() => void) | null = null;
    let cancelled = false;

    async function init() {
      const { default: Lenis } = await import("lenis");
      if (cancelled) return;

      const instance = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1,
      });

      instance.on("scroll", ScrollTrigger.update);

      const tickerFn = (time: number) => {
        instance.raf(time * 1000);
      };
      gsap.ticker.add(tickerFn);
      gsap.ticker.lagSmoothing(0);

      destroy = () => {
        gsap.ticker.remove(tickerFn);
        instance.destroy();
        gsap.ticker.lagSmoothing(1);
      };

      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    }

    function start() {
      if (inited.current) return;
      inited.current = true;
      init();
    }

    if (document.readyState === "complete") {
      start();
    } else {
      window.addEventListener("load", start, { once: true });
    }

    return () => {
      cancelled = true;
      destroy?.();
      // If start() hasn't run yet, the { once: true } listener auto-removes on fire
    };
  }, []);

  return children;
}
