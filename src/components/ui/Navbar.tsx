"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { MagneticWrapper } from "./MagneticWrapper";
import { Button } from "./Button";

const navLinks = [
  { label: "الخدمات", href: "#services" },
  { label: "الأعمال", href: "#work" },
  { label: "خطوات العمل", href: "#process" },
  { label: "تواصل", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 60);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-500",
        scrolled
          ? "glass-card border-x-0 border-t-0 rounded-none"
          : "bg-transparent",
      )}
    >
      <nav className="container-narrow flex items-center justify-between h-16 md:h-18 px-4">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 shrink-0">
          <img
            src="/brand/nexflow-icon.png"
            alt="NexFlow"
            className="size-8 md:size-9"
          />
          <span className="text-white font-bold text-lg tracking-tight hidden sm:block">
            NexFlow
          </span>
        </a>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="px-4 py-2 text-sm text-body/70 hover:text-primary transition-colors rounded-lg hover:bg-white/5"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <MagneticWrapper strength={0.3}>
            <Button variant="primary" size="sm">
              تواصل عبر تليغرام
            </Button>
          </MagneticWrapper>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden relative size-10 flex items-center justify-center rounded-lg hover:bg-white/5 transition-colors"
          aria-label="Toggle menu"
        >
          <div className="flex flex-col gap-1.5">
            <span
              className={cn(
                "block w-5 h-0.5 bg-white transition-all duration-300",
                menuOpen && "rotate-45 translate-y-1",
              )}
            />
            <span
              className={cn(
                "block w-5 h-0.5 bg-white transition-all duration-300",
                menuOpen && "opacity-0",
              )}
            />
            <span
              className={cn(
                "block w-5 h-0.5 bg-white transition-all duration-300",
                menuOpen && "-rotate-45 -translate-y-1",
              )}
            />
          </div>
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={cn(
          "md:hidden fixed inset-x-0 top-16 bottom-0 bg-background/95 backdrop-blur-xl transition-all duration-400",
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        )}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8 px-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-2xl text-white/80 hover:text-primary transition-colors"
            >
              {link.label}
            </a>
          ))}
          <Button
            variant="primary"
            size="lg"
            className="mt-4 w-full max-w-xs"
          >
            تواصل عبر تليغرام
          </Button>
        </div>
      </div>
    </header>
  );
}
