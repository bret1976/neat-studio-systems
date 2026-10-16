"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
export function ProblemDiagram({ index }: { index: number }) {
  const root = useRef<SVGSVGElement>(null);
  useEffect(() => {
    const el = root.current,
      card = el?.closest("article");
    if (!el || !card) return;
    const paths = el.querySelectorAll(
      ".problem-object path,.problem-object circle",
    );
    paths.forEach((p) => {
      p.setAttribute("pathLength", "1");
    });
    let tween: gsap.core.Tween | undefined;
    const replay = () => {
      if (matchMedia("(prefers-reduced-motion:reduce)").matches) return;
      tween?.kill();
      tween = gsap.fromTo(
        paths,
        { strokeDasharray: 1, strokeDashoffset: 1 },
        {
          strokeDashoffset: 0,
          duration: 0.85,
          stagger: 0.04,
          ease: "power1.inOut",
        },
      );
    };
    card.addEventListener("pointerenter", replay);
    card.addEventListener("focusin", replay);
    return () => {
      tween?.kill();
      card.removeEventListener("pointerenter", replay);
      card.removeEventListener("focusin", replay);
    };
  }, []);
  return (
    <svg
      ref={root}
      className={`draft-problem draft-problem-${index}`}
      viewBox="0 0 320 240"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth=".7"
    >
      <g className="problem-axis" strokeDasharray="4 5" opacity=".25">
        <path d="M160 12V226M25 180L290 28M25 28L290 180" />
        <circle cx="160" cy="120" r="87" />
      </g>
      <g className="problem-object">
        {index === 0 ? (
          <>
            <path d="M65 150L160 95L255 150L160 205ZM65 150V132L160 77L255 132V150M65 132L160 187L255 132M160 187V205M135 90V55Q160 35 185 55V90M135 55Q160 75 185 55M135 90Q160 110 185 90M135 90V128Q160 148 185 128V90" />
            <path
              d="M110 115L160 145L210 115V157L160 187L110 157Z"
              strokeDasharray="3 3"
            />
          </>
        ) : index === 1 ? (
          <>
            <path d="M92 154L160 115L228 154L160 194ZM92 154V75L160 36L228 75V154M92 75L160 115L228 75M160 115V194" />
            <circle cx="160" cy="37" r="22" />
            <path d="M160 59V91M138 37H113M182 37H207" />
          </>
        ) : index === 2 ? (
          <>
            <circle cx="160" cy="115" r="86" />
            <circle cx="160" cy="115" r="44" strokeDasharray="4 3" />
            <path d="M105 146L160 114L215 146L160 178ZM105 146V83L160 51L215 83V146M105 83L160 115L215 83M160 115V178" />
            <path
              className="problem-radar"
              d="M160 115V29A86 86 0 0 1 234 158Z"
              fill="#ab352310"
              stroke="var(--red)"
            />
          </>
        ) : (
          <>
            {[0, 1, 2].map((n) => (
              <g key={n} transform={`translate(0 ${n * 36})`}>
                <path d="M72 90L160 39L248 90L160 141ZM72 90V105L160 156L248 105V90M160 141V156" />
              </g>
            ))}
            <path d="M160 18V230" strokeDasharray="3 3" />
          </>
        )}
      </g>
    </svg>
  );
}
