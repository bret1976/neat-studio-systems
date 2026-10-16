"use client";
import { useEffect, useState, useRef, RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
export function useDrawingStages(
  root: RefObject<HTMLElement | null>,
  count: number,
  manualMobile = false,
) {
  const [stage, setStage] = useState(0);
  const manualStage = useRef<number | null>(null);
  useEffect(() => {
    const release = () => {
      manualStage.current = null;
    };
    const key = (e: KeyboardEvent) => {
      if (
        [
          "ArrowDown",
          "ArrowUp",
          "PageDown",
          "PageUp",
          "Home",
          "End",
          " ",
        ].includes(e.key)
      )
        release();
    };
    addEventListener("wheel", release, { passive: true });
    addEventListener("touchmove", release, { passive: true });
    addEventListener("pointerdown", release, { passive: true });
    addEventListener("keydown", key);
    const media = gsap.matchMedia();
    media.add(
      manualMobile
        ? "(min-width: 761px) and (prefers-reduced-motion: no-preference)"
        : "(prefers-reduced-motion: no-preference)",
      () => {
        const trigger = ScrollTrigger.create({
          trigger: root.current,
          start: "top top",
          end: "bottom bottom",
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (manualStage.current !== null) return;
            setStage(Math.min(count - 1, Math.floor(self.progress * count)));
            root.current?.style.setProperty(
              "--scene-progress",
              String(self.progress),
            );
            root.current?.style.setProperty(
              "--plan-progress",
              String(Math.min(1, self.progress * 2.4)),
            );
          },
        });
        return () => trigger.kill();
      },
    );
    return () => {
      media.revert();
      removeEventListener("wheel", release);
      removeEventListener("touchmove", release);
      removeEventListener("pointerdown", release);
      removeEventListener("keydown", key);
    };
  }, [root, count, manualMobile]);
  function select(next: number) {
    manualStage.current = next;
    setStage(next);
    const el = root.current;
    if (!el) return;
    const p = (next + 0.12) / count;
    el.style.setProperty("--scene-progress", String(p));
    el.style.setProperty("--plan-progress", String(Math.min(1, p * 2.4)));
    if (manualMobile && matchMedia("(max-width:760px)").matches) return;
    if (
      !matchMedia("(prefers-reduced-motion: reduce)").matches &&
      el.offsetHeight > innerHeight
    ) {
      const top =
        el.getBoundingClientRect().top +
        scrollY +
        (el.offsetHeight - innerHeight) * p;
      window.dispatchEvent(new CustomEvent("neat:scrollto", { detail: top }));
    }
  }
  return [stage, select] as const;
}
