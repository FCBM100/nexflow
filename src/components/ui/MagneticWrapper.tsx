"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticWrapperProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  spring?: boolean;
}

function MagneticWrapper({
  children,
  strength = 0.5,
  spring = true,
  className,
}: MagneticWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const moveX = spring ? springX : x;
  const moveY = spring ? springY : y;

  function handleMouseMove(e: React.MouseEvent) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distX = (e.clientX - centerX) * strength;
    const distY = (e.clientY - centerY) * strength;
    x.set(distX);
    y.set(distY);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: moveX, y: moveY }}
      className={cn("inline-block", className)}
    >
      {children}
    </motion.div>
  );
}

export { MagneticWrapper };
