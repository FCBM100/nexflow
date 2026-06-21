"use client";

import { forwardRef } from "react";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg" | "xl";
  icon?: ReactNode;
  magnetic?: boolean;
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      icon,
      magnetic = false,
      loading = false,
      children,
      disabled,
      ...props
    },
    ref,
  ) => {
    const base =
      "inline-flex items-center justify-center gap-2 font-medium no-underline transition-all duration-300 select-none focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 disabled:opacity-40 disabled:pointer-events-none";

    const variants = {
      primary:
        "bg-primary text-background hover:brightness-110 active:brightness-90 shadow-lg shadow-primary/20 hover:shadow-primary/30",
      secondary:
        "bg-transparent text-primary border border-primary/50 hover:border-primary hover:bg-primary/5 active:bg-primary/10",
      ghost:
        "bg-transparent text-body hover:text-primary hover:bg-white/5",
    };

    const sizes: Record<string, string> = {
      sm: "h-9 px-4 text-sm rounded-[var(--radius-button)]",
      md: "h-11 px-6 text-sm rounded-[var(--radius-button)]",
      lg: "h-12 px-8 text-base rounded-[var(--radius-button)]",
      xl: "h-14 px-10 text-lg rounded-[var(--radius-button)]",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          base,
          variants[variant],
          sizes[size],
          magnetic && "magnetic-button",
          className,
        )}
        {...props}
      >
        {loading ? (
          <svg
            className="animate-spin size-4"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        ) : icon ? (
          <span className="size-4 flex items-center justify-center shrink-0">
            {icon}
          </span>
        ) : null}
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";

export { Button };
export type { ButtonProps };
