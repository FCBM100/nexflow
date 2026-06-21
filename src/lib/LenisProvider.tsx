"use client";

import { useEffect, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface LenisProviderProps {
  children: ReactNode;
}

export default function LenisProvider({ children }: LenisProviderProps) {
  useEffect(() => {
    let lenisInstance: { destroy: () => void } | null = null;

    async function initLenis() {
      const Lenis = (await import("lenis")).default;

      const instance = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
      });

      instance.on("scroll", ScrollTrigger.update);

      gsap.ticker.add((time: number) => {
        instance.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);

      return instance;
    }

    initLenis().then((instance) => {
      lenisInstance = instance;
    });

    return () => {
      if (lenisInstance) {
        lenisInstance.destroy();
      }
      gsap.ticker.lagSmoothing(1);
    };
  }, []);

  return children;
}


