"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
export function EditorialLead() {
  const root = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion:no-preference)", () => {
      const tween = gsap.fromTo(
        root.current!.querySelectorAll("span"),
        { opacity: 0.16 },
        {
          opacity: 1,
          stagger: 0.12,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top 83%",
            end: "bottom 40%",
            scrub: 0.3,
          },
        },
      );
      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });
    return () => media.revert();
  }, []);
  return (
    <h2 ref={root} className="editorial-lead">
      {"YOUR SOFTWARE IS POWERFUL. WHY DOES EVERY DETAIL STILL DEPEND ON YOU?"
        .split(" ")
        .map((word, i) => (
          <span key={i}>{word} </span>
        ))}
    </h2>
  );
}
