"use client";

import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  glow?: boolean;
  gradientBorder?: boolean;
  as?: "div" | "section" | "article";
}

function GlassCard({
  className,
  children,
  glow = false,
  gradientBorder = false,
  as: Tag = "div",
  ...props
}: GlassCardProps) {
  return (
    <Tag
      className={cn(
        "glass-card p-6 md:p-8",
        glow && "neon-glow-sm",
        gradientBorder && "gradient-border",
        "transition-all duration-500",
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}

export { GlassCard };
export type { GlassCardProps };
