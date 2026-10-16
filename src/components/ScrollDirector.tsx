"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { SplitText } from "gsap/SplitText";
gsap.registerPlugin(ScrollTrigger, SplitText);
export function ScrollDirector() {
  const path = usePathname();
  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let lenis: Lenis | undefined;
    let tick: ((t: number) => void) | undefined;
    if (!reduced) {
      lenis = new Lenis({ duration: 1.15, anchors: true, smoothWheel: true });
      lenis.on("scroll", ScrollTrigger.update);
      tick = (t) => lenis?.raf(t * 1000);
      gsap.ticker.add(tick);
    }
    const scrollTo = (e: Event) => {
      const top = (e as CustomEvent<number>).detail;
      if (lenis) lenis.scrollTo(top, { immediate: true });
      else window.scrollTo({ top, behavior: "instant" });
    };
    window.addEventListener("neat:scrollto", scrollTo);
    let cleanupIntro = () => {};
    const splitHeadings: SplitText[] = [];
    const resplitHeadings: Array<() => void> = [];
    const ctx = gsap.context(() => {
      if (reduced) return;
      const intro = gsap.timeline({
        paused: document.documentElement.classList.contains("opening-active"),
      });
      if (document.querySelector(".inspection-canvas"))
        intro
          .from(".inspection-canvas .drawing", {
            opacity: 0,
            clipPath: "inset(100% 0 0 0)",
            duration: 1.1,
            ease: "power2.inOut",
          })
          .from(".field-meta,.field-bottom", { opacity: 0, duration: 0.6 }, 0.3)
          .from(
            ".hero-caption .hero-title",
            { y: 30, opacity: 0, duration: 0.7 },
            0.45,
          );
      const reveal = () => {
        intro.play();
        ScrollTrigger.refresh();
      };
      window.addEventListener("neat:opening-complete", reveal, { once: true });
      cleanupIntro = () =>
        window.removeEventListener("neat:opening-complete", reveal);
      if (path === "/") {
        gsap.utils
          .toArray<HTMLElement>(
            ".section-heading h2, .problem-grid h3, .final-cta h2",
          )
          .forEach((heading) => {
            const config = {
              type: "lines",
              mask: "lines" as const,
              autoSplit: false,
              onSplit: (split: SplitText) =>
                gsap.from(split.lines, {
                  yPercent: 105,
                  opacity: 0.15,
                  stagger: 0.12,
                  ease: "none",
                  scrollTrigger: {
                    trigger: heading,
                    start: "top 96%",
                    end: "top 70%",
                    scrub: 0.35,
                  },
                }),
            };
            const split = SplitText.create(heading, config);
            splitHeadings.push(split);
            resplitHeadings.push(() => split.split(config));
          });
        gsap.utils
          .toArray<HTMLElement>(".product-preview, .audience-image")
          .forEach((drawing) =>
            gsap.from(drawing, {
              opacity: 0.12,
              ease: "none",
              scrollTrigger: {
                trigger: drawing,
                start: "top 96%",
                end: "top 60%",
                scrub: 0.3,
              },
            }),
          );
      }
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) =>
        gsap.from(el, {
          opacity: 0,
          y: 24,
          duration: 0.7,
          scrollTrigger: { trigger: el, start: "top 93%", once: true },
        }),
      );
    });
    const refreshDetails = (e: Event) => {
      if ((e.target as HTMLElement).matches("details"))
        requestAnimationFrame(() => ScrollTrigger.refresh());
    };
    document.addEventListener("toggle", refreshDetails, true);
    let resizeTimer: ReturnType<typeof setTimeout>;
    const resizeHeadings = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        resplitHeadings.forEach((resplit) => resplit());
        ScrollTrigger.refresh();
      }, 180);
    };
    window.addEventListener("resize", resizeHeadings);
    const timer = setTimeout(() => ScrollTrigger.refresh(), 400);
    return () => {
      clearTimeout(timer);
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", resizeHeadings);
      document.removeEventListener("toggle", refreshDetails, true);
      window.removeEventListener("neat:scrollto", scrollTo);
      cleanupIntro();
      splitHeadings.forEach((split) => split.revert());
      ctx.revert();
      lenis?.destroy();
      if (tick) gsap.ticker.remove(tick);
    };
  }, [path]);
  return null;
}
