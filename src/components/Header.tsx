"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { navGroups } from "@/content/site";
export function Header() {
  const [open, setOpen] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);
  const root = useRef<HTMLElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  useEffect(() => {
    const outside = (e: PointerEvent) => {
      if (root.current && !root.current.contains(e.target as Node)) {
        setOpen(null);
        setMobile(false);
      }
    };
    const escape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        const trigger = root.current?.querySelector<HTMLButtonElement>(
          '.nav-group>button[aria-expanded="true"]',
        );
        setOpen(null);
        setMobile(false);
        if (matchMedia("(min-width:761px)").matches) trigger?.focus();
        else menuButton.current?.focus();
      }
    };
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", outside);
      document.removeEventListener("keydown", escape);
    };
  }, []);
  useEffect(() => {
    let previous = scrollY;
    const scroll = () => {
      const current = scrollY;
      if (Math.abs(current - previous) < 4) return;
      const hasFocus = root.current?.contains(document.activeElement);
      root.current?.classList.toggle(
        "header-away",
        current > 300 && current > previous && !mobile && !open && !hasFocus,
      );
      previous = current;
    };
    addEventListener("scroll", scroll, { passive: true });
    root.current?.classList.remove("header-away");
    return () => removeEventListener("scroll", scroll);
  }, [pathname, mobile, open]);
  return (
    <header className="header" ref={root}>
      <Link
        href="/"
        className="brand"
        onClick={() => {
          setOpen(null);
          setMobile(false);
        }}
        aria-label="NEAT home"
      >
        <span className="brand-symbol" aria-hidden="true">
          ⌑
        </span>{" "}
        NEAT<span className="red">.</span>
      </Link>
      <button
        className="menu-toggle"
        ref={menuButton}
        aria-expanded={mobile}
        aria-controls="main-navigation"
        onClick={() => setMobile(!mobile)}
      >
        {mobile ? "CLOSE −" : "MENU +"}
      </button>
      <nav
        id="main-navigation"
        className={mobile ? "navigation is-open" : "navigation"}
        aria-label="Main navigation"
        onClick={(e) => {
          if ((e.target as HTMLElement).closest("a")) {
            setOpen(null);
            setMobile(false);
          }
        }}
      >
        {Object.entries(navGroups).map(([name, links], i) => (
          <div
            className="nav-group"
            key={name}
            onPointerLeave={(e) => {
              if (e.pointerType === "mouse") setOpen(null);
            }}
          >
            <button
              onPointerEnter={(e) => {
                if (e.pointerType === "mouse") setOpen(name);
              }}
              aria-expanded={open === name}
              aria-controls={`nav-${name}`}
              onClick={(e) =>
                setOpen(
                  e.detail > 0 && matchMedia("(pointer: fine)").matches
                    ? name
                    : open === name
                      ? null
                      : name,
                )
              }
            >
              {name}
              <span>⌟</span>
            </button>
            <div
              className="nav-dropdown"
              id={`nav-${name}`}
              hidden={open !== name}
            >
              {links.map(([label, url]) => (
                <Link
                  key={url}
                  href={url}
                  aria-current={pathname === url ? "page" : undefined}
                >
                  {label}
                  <span>↗</span>
                </Link>
              ))}
            </div>
            {i === 0 && (
              <Link className="how-link" href="/how-it-works">
                HOW IT WORKS
              </Link>
            )}
          </div>
        ))}
        <Link href="/about">ABOUT</Link>
        <Link className="nav-cta" href="/contact">
          REQUEST ACCESS<span>↗</span>
        </Link>
      </nav>
    </header>
  );
}
