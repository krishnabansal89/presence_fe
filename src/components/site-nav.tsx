"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Meet Sudo", href: "#alive" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Build", href: "#sdk" },
  { label: "Founder's Edition", href: "#founders" },
  { label: "FAQ", href: "#faq" },
];

export default function SiteNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "site-nav",
        scrolled && "site-nav-scrolled"
      )}
    >
      <nav className="mx-auto flex h-16 max-w-[1640px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <a className="flex items-center gap-2" href="#top" aria-label="Sudo home">
          <span className="brand-dot" />
          <span className="font-display text-[19px] font-semibold tracking-[-0.02em] text-on-primary">
            sudo
          </span>
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.12em] text-mute sm:inline">
            by presence labs
          </span>
        </a>

        <div className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <a className="nav-link" href={link.href} key={link.href}>
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a className="button-primary hidden sm:inline-flex" href="#founders">
            Early access
          </a>
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={open}
            className="nav-burger lg:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {open && (
        <div className="nav-mobile lg:hidden">
          <div className="mx-auto flex max-w-[1640px] flex-col gap-1 px-4 pb-8 pt-2 sm:px-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="nav-mobile-link"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#founders"
              className="button-primary mt-4 w-full"
              onClick={() => setOpen(false)}
            >
              Early access
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
