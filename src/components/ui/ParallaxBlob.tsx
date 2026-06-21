"use client";

import { useEffect, useRef } from "react";

interface ParallaxBlobProps {
  className?: string;
  speed?: number;
  style?: React.CSSProperties;
}

export default function ParallaxBlob({ className = "", speed = 0.08, style }: ParallaxBlobProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const handleScroll = () => {
      const rect = el.getBoundingClientRect();
      const viewportH = window.innerHeight;
      if (rect.top < viewportH && rect.bottom > 0) {
        const progress = (viewportH - rect.top) / (viewportH + rect.height);
        const offset = (progress - 0.5) * viewportH * speed;
        el.style.transform = `translateY(${offset}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed]);

  return (
    <div
      ref={ref}
      className={`pointer-events-none absolute will-change-transform ${className}`}
      style={style}
    />
  );
}
