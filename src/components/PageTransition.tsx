"use client";
import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import gsap from "gsap";
export function PageTransition() {
  const root = useRef<HTMLDivElement>(null);
  const active = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const leave = () => {
      if (timer.current) clearTimeout(timer.current);
      gsap.to(el.children, {
        clipPath: "inset(0 0 100% 0)",
        duration: 0.4,
        stagger: 0.035,
        ease: "power2.inOut",
        onComplete: () => {
          el.hidden = true;
          active.current = false;
          el.style.pointerEvents = "none";
        },
      });
    };
    if (active.current) leave();
    const click = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        matchMedia("(prefers-reduced-motion:reduce)").matches
      )
        return;
      const link = (event.target as HTMLElement).closest<HTMLAnchorElement>(
        "a[href]",
      );
      if (!link || link.download || link.target === "_blank") return;
      const next = new URL(link.href, location.href);
      if (
        next.origin !== location.origin ||
        next.pathname === location.pathname
      )
        return;
      event.preventDefault();
      if (active.current) return;
      active.current = true;
      el.hidden = false;
      el.style.pointerEvents = "auto";
      gsap.fromTo(
        el.children,
        { clipPath: "inset(100% 0 0 0)" },
        {
          clipPath: "inset(0 0 0 0)",
          duration: 0.32,
          stagger: 0.035,
          ease: "power2.inOut",
          onComplete: () =>
            router.push(next.pathname + next.search + next.hash),
        },
      );
      timer.current = setTimeout(leave, 7000);
    };
    document.addEventListener("click", click, true);
    return () => {
      document.removeEventListener("click", click, true);
      if (timer.current) clearTimeout(timer.current);
    };
  }, [pathname, router]);
  useEffect(
    () => () => {
      if (root.current) gsap.killTweensOf(root.current.children);
    },
    [],
  );
  return (
    <div className="page-grid-transition" ref={root} hidden aria-hidden="true">
      {Array.from({ length: 6 }, (_, i) => (
        <div key={i}>
          <span>⌑</span>
        </div>
      ))}
    </div>
  );
}
