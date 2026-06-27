"use client";

import { useEffect, useRef } from "react";

interface OrbData {
  x: string;
  y: string;
  w: string;
  h: string;
  color: string;
  blur: string;
  opacity: number;
  dx: number;
  dy: number;
}

const ORBS: OrbData[] = [
  { x: "15%", y: "10%", w: "600px", h: "600px", color: "#00E5FF", blur: "120px", opacity: 0.04, dx: 0.3, dy: 0.2 },
  { x: "70%", y: "30%", w: "500px", h: "500px", color: "#0099FF", blur: "100px", opacity: 0.035, dx: -0.25, dy: 0.35 },
  { x: "40%", y: "60%", w: "450px", h: "450px", color: "#66F5FF", blur: "90px", opacity: 0.03, dx: 0.2, dy: -0.3 },
  { x: "80%", y: "75%", w: "550px", h: "550px", color: "#00E5FF", blur: "110px", opacity: 0.025, dx: -0.35, dy: -0.15 },
];

export default function FloatingOrbs() {
  const orbRefs = useRef<(HTMLDivElement | null)[]>([]);
  const positionsRef = useRef(ORBS.map(() => ({ x: 0, y: 0 })));
  const directionsRef = useRef(ORBS.map((o) => ({ dx: o.dx, dy: o.dy })));
  const rafRef = useRef(0);
  const runningRef = useRef(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) return;

    const positions = positionsRef.current;
    const directions = directionsRef.current;
    const MAX_DELTA = 0.1;
    let lastTime = performance.now();

    function applyPositions() {
      for (let i = 0; i < positions.length; i++) {
        const el = orbRefs.current[i];
        if (el) {
          el.style.transform = `translate3d(${positions[i].x}px, ${positions[i].y}px, 0)`;
        }
      }
    }

    function hardReset() {
      for (let i = 0; i < positions.length; i++) {
        positions[i].x = 0;
        positions[i].y = 0;
        directions[i].dx = ORBS[i].dx;
        directions[i].dy = ORBS[i].dy;
      }
      applyPositions();
      lastTime = performance.now();
    }

    function animate(rafTime: number) {
      if (!runningRef.current) return;

      const dt = Math.min((rafTime - lastTime) / 1000, MAX_DELTA);
      lastTime = rafTime;
      const speed = 60;

      for (let i = 0; i < positions.length; i++) {
        const d = directions[i];
        const p = positions[i];
        let nx = p.x + d.dx * dt * speed;
        let ny = p.y + d.dy * dt * speed;
        const range = 60;
        if (nx > range || nx < -range) {
          d.dx *= -1;
          nx = p.x + d.dx * dt * speed;
        }
        if (ny > range || ny < -range) {
          d.dy *= -1;
          ny = p.y + d.dy * dt * speed;
        }
        p.x = nx;
        p.y = ny;
      }

      applyPositions();
      rafRef.current = requestAnimationFrame(animate);
    }

    function pause() {
      runningRef.current = false;
      cancelAnimationFrame(rafRef.current);
    }

    function resume() {
      if (runningRef.current) return;
      hardReset();
      runningRef.current = true;
      rafRef.current = requestAnimationFrame(animate);
    }

    function onVisibilityChange() {
      if (document.hidden) pause();
      else resume();
    }

    function onBlur() { pause(); }
    function onFocus() { resume(); }

    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("blur", onBlur);
    window.addEventListener("focus", onFocus);

    lastTime = performance.now();
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      pause();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("blur", onBlur);
      window.removeEventListener("focus", onFocus);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {ORBS.map((orb, i) => (
        <div
          key={i}
          ref={(el) => { orbRefs.current[i] = el; }}
          className="absolute rounded-full will-change-transform"
          style={{
            width: orb.w,
            height: orb.h,
            left: orb.x,
            top: orb.y,
            background: `radial-gradient(circle, ${orb.color}, transparent 70%)`,
            filter: `blur(${orb.blur})`,
            opacity: orb.opacity,
            transform: "translate3d(0, 0, 0)",
          }}
        />
      ))}
    </div>
  );
}
