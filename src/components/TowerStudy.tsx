"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
export function TowerStudy() {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion:no-preference)", () => {
      const trigger = ScrollTrigger.create({
        trigger: root.current,
        start: "top 85%",
        end: "bottom 25%",
        onUpdate: (s) =>
          root.current?.style.setProperty("--tower-reveal", String(s.progress)),
      });
      return () => trigger.kill();
    });
    return () => media.revert();
  }, []);
  return (
    <div className="tower-drawing tower-study ruled" ref={root}>
      <svg width="0" height="0" aria-hidden="true">
        <filter id="tower-contours">
          <feColorMatrix type="saturate" values="0" />
          <feConvolveMatrix order="3" kernelMatrix="0 -1 0 -1 5 -1 0 -1 0" />
          <feComponentTransfer>
            <feFuncR type="linear" slope="1.8" intercept="-.25" />
            <feFuncG type="linear" slope="1.8" intercept="-.25" />
            <feFuncB type="linear" slope="1.8" intercept="-.25" />
          </feComponentTransfer>
        </filter>
      </svg>
      <span className="red-circle" aria-hidden="true" />
      <Image
        className="tower-image tower-contour"
        src="/drawings/tower.svg"
        width={1000}
        height={1100}
        alt=""
        unoptimized
      />
      <Image
        className="tower-image tower-shaded"
        src="/drawings/tower.svg"
        width={1000}
        height={1100}
        alt="Original axonometric tower develops from structural contours into a shaded architectural study"
        unoptimized
      />
      <span className="tower-scan" aria-hidden="true" />
      <span className="mono">
        NORTH COURT / DESIGN STUDY
        <br />
        PRECISION WITHOUT REPETITION.
      </span>
    </div>
  );
}
