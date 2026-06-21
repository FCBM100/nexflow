"use client";

import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const posRef = useRef({ x: -9999, y: -9999 });
  const currentRef = useRef({ x: -9999, y: -9999 });
  const activeRef = useRef(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    function onMouseMove(e: MouseEvent) {
      if (!activeRef.current && glowRef.current) {
        const srcCaps = (e as MouseEvent & { sourceCapabilities?: { firesTouchEvents?: boolean } }).sourceCapabilities;
        const isRealMouse =
          e.movementX !== 0 ||
          e.movementY !== 0 ||
          !srcCaps ||
          !srcCaps.firesTouchEvents;
        if (!isRealMouse) return;
        activeRef.current = true;
        currentRef.current = { x: e.clientX, y: e.clientY };
      }
      posRef.current = { x: e.clientX, y: e.clientY };
    }

    function animate() {
      currentRef.current.x += (posRef.current.x - currentRef.current.x) * 0.08;
      currentRef.current.y += (posRef.current.y - currentRef.current.y) * 0.08;

      if (glowRef.current) {
        const opacity = activeRef.current ? 1 : 0;
        glowRef.current.style.transform = `translate(${currentRef.current.x - 250}px, ${currentRef.current.y - 250}px)`;
        if (glowRef.current.style.opacity !== String(opacity)) {
          glowRef.current.style.opacity = String(opacity);
        }
      }

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
