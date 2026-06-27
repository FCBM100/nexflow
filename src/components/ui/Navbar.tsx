"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";
import { MagneticWrapper } from "./MagneticWrapper";
import { Button } from "./Button";

const navLinks = [
  { label: "الخدمات", href: "#services" },
  { label: "ماذا أفعل", href: "#work" },
  { label: "خطوات العمل", href: "#process" },
  { label: "تواصل", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [entered, setEntered] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  useEffect(() => {
    function onReady() {
      setEntered(true);
    }
    if (document.readyState === "complete") {
      onReady();
    } else {
      window.addEventListener("load", onReady, { once: true });
    }
  }, []);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 60);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const ids = navLinks.map((l) => l.href.replace("#", ""));
    const observers: IntersectionObserver[] = [];

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: "-40% 0px -50% 0px" },
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
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
    <motion.header
      initial={{ y: -80 }}
      animate={entered ? { y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-500",
        scrolled
          ? "glass-card border-x-0 border-t-0 rounded-none shadow-lg shadow-primary/5"
          : "bg-transparent",
      )}
    >
      <nav className="container-narrow flex items-center justify-between h-16 md:h-18 px-4">
        {/* Logo */}
        <motion.a
          href="#"
          initial={{ opacity: 0, x: -20 }}
          animate={entered ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex items-center gap-3 shrink-0"
        >
          <Image
            src="/brand/nexflow-icon.png"
            alt="NexFlow"
            width={36}
            height={36}
            className="size-8 md:size-9"
          />
          <span className="text-white font-bold text-lg tracking-tight hidden sm:block">
            NexFlow
          </span>
        </motion.a>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((link, i) => {
            const isActive = activeSection === link.href.replace("#", "");
            return (
              <motion.li
                key={link.href}
                initial={{ opacity: 0, y: -12 }}
                animate={entered ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.15 + i * 0.07 }}
                className="relative"
              >
                <a
                  href={link.href}
                  className={cn(
                    "relative px-4 py-2 text-sm rounded-lg transition-colors",
                    isActive
                      ? "text-primary"
                      : "text-body/70 hover:text-primary",
                  )}
                >
                  {link.label}
                </a>
                {isActive && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute -bottom-0.5 left-3 right-3 h-0.5 bg-primary rounded-full"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </motion.li>
            );
          })}
        </ul>

        {/* Desktop CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={entered ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.45 }}
          className="hidden md:block"
        >
          <MagneticWrapper strength={0.3}>
            <Button variant="primary" size="sm">
              تواصل عبر تليغرام
            </Button>
          </MagneticWrapper>
        </motion.div>

      {/* Mobile Hamburger */}
      <motion.button
        initial={{ opacity: 0, rotate: -90 }}
        animate={entered ? { opacity: 1, rotate: 0 } : {}}
        transition={{ duration: 0.4, delay: 0.5 }}
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
      </motion.button>
    </nav>

    {/* Mobile Menu */}
    <motion.div
      initial={false}
      animate={menuOpen ? "open" : "closed"}
      variants={{
        open: { opacity: 1, pointerEvents: "auto" as const },
        closed: { opacity: 0, pointerEvents: "none" as const },
      }}
      transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="md:hidden fixed inset-x-0 top-16 bottom-0 bg-background/95 backdrop-blur-xl"
    >
      <div className="flex flex-col items-center justify-center h-full gap-8 px-6">
        {navLinks.map((link, i) => (
          <motion.a
            key={link.href}
            href={link.href}
            onClick={() => setMenuOpen(false)}
            initial={{ opacity: 0, y: 20 }}
            animate={menuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.35, delay: menuOpen ? 0.1 + i * 0.06 : 0 }}
            className="text-2xl text-white/80 hover:text-primary transition-colors"
          >
            {link.label}
          </motion.a>
        ))}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={menuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.35, delay: menuOpen ? 0.34 : 0 }}
          className="w-full max-w-xs"
        >
          <Button
            variant="primary"
            size="lg"
            className="mt-4 w-full"
          >
            تواصل عبر تليغرام
          </Button>
        </motion.div>
      </div>
    </motion.div>

    {/* Scroll Progress Bar */}
    <motion.div
      className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary/60 origin-left"
      style={{ scaleX }}
    />
  </motion.header>
  );
}
