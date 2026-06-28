"use client";

import { useCallback, useRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  glow?: boolean;
  gradientBorder?: boolean;
  tilt?: boolean;
  as?: "div" | "section" | "article";
}

function GlassCard({
  className,
  children,
  glow = false,
  gradientBorder = false,
  tilt = false,
  as: Tag = "div",
  ...props
}: GlassCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!tilt || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    cardRef.current.style.transform = `perspective(800px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg)`;
  }, [tilt]);

  const handleMouseLeave = useCallback(() => {
    if (!tilt || !cardRef.current) return;
    cardRef.current.style.transform = "perspective(800px) rotateY(0deg) rotateX(0deg)";
  }, [tilt]);

  return (
    <Tag
      ref={cardRef}
      className={cn(
        "glass-card p-5",
        glow && "neon-glow-sm",
        gradientBorder && "gradient-border",
        tilt && "cursor-pointer will-change-transform",
        "transition-shadow duration-500 hover:shadow-xl hover:shadow-primary/5",
        className,
      )}
      onMouseMove={tilt ? handleMouseMove : undefined}
      onMouseLeave={tilt ? handleMouseLeave : undefined}
      style={{ transition: "transform 0.15s ease-out, box-shadow 0.4s ease, border-color 0.4s ease" }}
      {...props}
    >
      {children}
    </Tag>
  );
}

export { GlassCard };
export type { GlassCardProps };
