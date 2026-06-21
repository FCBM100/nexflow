"use client";

import { useEffect, useRef, useState } from "react";

interface LoadingScreenProps {
  onFinish: () => void;
}

export default function LoadingScreen({ onFinish }: LoadingScreenProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    async function exit() {
      const gsap = (await import("gsap")).default;

      await gsap.to(overlayRef.current, {
        opacity: 0,
        scale: 1.05,
        duration: 0.6,
        ease: "power3.inOut",
      });

      setVisible(false);
      onFinish();
    }

    const timer = setTimeout(exit, 2200);
    return () => clearTimeout(timer);
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
          <source src="/brand/logo-animation.mp4" type="video/mp4" />
        </video>

        <div className="flex items-center gap-2">
          <div className="w-32 h-0.5 bg-white/5 rounded-full overflow-hidden">
            <div className="h-full w-full bg-primary rounded-full animate-pulse" />
          </div>
          <span className="text-xs text-primary/60 font-latin">NexFlow</span>
        </div>
      </div>
    </div>
  );
}
