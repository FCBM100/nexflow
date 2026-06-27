"use client";

import { useEffect, useRef } from "react";

const IDLE_TIMEOUT = 1500;
const MAX_OPACITY = 0.4;
const LERP = 0.08;
const OPACITY_LERP = 0.04;

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const posRef = useRef({ x: -9999, y: -9999 });
  const currentRef = useRef({ x: -9999, y: -9999 });
  const opacityRef = useRef(0);
  const lastMoveRef = useRef(0);
  const hasMovedRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) return;

    const el = glowRef.current;
    if (!el) return;
    const elStyle = el.style;

    function onMouseMove(e: MouseEvent) {
      if (!hasMovedRef.current) {
        hasMovedRef.current = true;
        currentRef.current = { x: e.clientX, y: e.clientY };
      }
      posRef.current = { x: e.clientX, y: e.clientY };
      lastMoveRef.current = performance.now();
    }

    function animate() {
      const now = performance.now();
      const dt = now - lastMoveRef.current;

      let targetOpacity = 0;
      if (hasMovedRef.current && dt < IDLE_TIMEOUT) {
        const fadeIn = 1 - dt / IDLE_TIMEOUT;
        targetOpacity = MAX_OPACITY * Math.max(0.6, fadeIn);
      }

      opacityRef.current += (targetOpacity - opacityRef.current) * OPACITY_LERP;

      currentRef.current.x += (posRef.current.x - currentRef.current.x) * LERP;
      currentRef.current.y += (posRef.current.y - currentRef.current.y) * LERP;

      elStyle.opacity = String(opacityRef.current);
      elStyle.transform = `translate(${currentRef.current.x - 250}px, ${currentRef.current.y - 250}px)`;

      rafRef.current = requestAnimationFrame(animate);
    }

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      className="fixed top-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none z-[60]"
      style={{
        background:
          "radial-gradient(circle, rgba(0,229,255,0.25) 0%, rgba(0,229,255,0.06) 40%, transparent 70%)",
        mixBlendMode: "screen",
        willChange: "transform",
        opacity: 0,
      }}
      aria-hidden="true"
    />
  );
}
