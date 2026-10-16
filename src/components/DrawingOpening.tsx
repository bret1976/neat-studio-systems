"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
const skeleton =
  "M130 590H1070M245 550V160H955V550M245 290H955M245 420H955M245 550H955M385 145V550M525 145V550M665 145V550M805 145V550M945 145V550M522 295H678V550H522ZM230 550H398V590H230ZM690 508H920V550H690";
export function DrawingOpening() {
  const root = useRef<HTMLDivElement>(null);
  const [checked, setChecked] = useState(0);
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (
      sessionStorage.getItem("neat-opening-v2") ||
      matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      el.hidden = true;
      return;
    }
    let disposed = false;
    sessionStorage.setItem("neat-opening-v2", "seen");
    document.documentElement.classList.add("opening-active");
    const line = el.querySelector("path");
    let timeline: gsap.core.Timeline;
    const drawn = new Promise<void>((resolve) => {
      timeline = gsap
        .timeline({ onComplete: resolve })
        .fromTo(
          line,
          { strokeDashoffset: 1 },
          { strokeDashoffset: 0, duration: 1.35, ease: "power1.inOut" },
        );
    });
    const assets = ["/drawings/elevation.svg", "/drawings/plan.svg"].map(
      (src) =>
        new Promise<void>((resolve) => {
          const image = new window.Image();
          image.onload = image.onerror = () => {
            if (!disposed) setChecked((n) => n + 1);
            resolve();
          };
          image.src = src;
        }),
    );
    assets.push(
      document.fonts.ready.then(() => {
        if (!disposed) setChecked((n) => n + 1);
      }),
    );
    const finish = () => {
      if (disposed) return;
      gsap.to(el, {
        clipPath: "inset(0 0 100% 0)",
        duration: 0.6,
        ease: "power2.inOut",
        onComplete: () => {
          el.hidden = true;
          document.documentElement.classList.remove("opening-active");
          window.dispatchEvent(new Event("neat:opening-complete"));
        },
      });
    };
    Promise.all([drawn, Promise.allSettled(assets)]).then(finish);
    const fallback = setTimeout(finish, 6000);
    return () => {
      disposed = true;
      clearTimeout(fallback);
      timeline?.kill();
      gsap.killTweensOf(el);
      document.documentElement.classList.remove("opening-active");
    };
  }, []);
  return (
    <>
      <noscript>
        <style>{".drawing-opening{display:none!important}"}</style>
      </noscript>
      <div
        className="drawing-opening ruled"
        ref={root}
        role="status"
        aria-label="Preparing the architectural drawing"
      >
        <div className="opening-mast mono">
          <span>NEAT. / INTELLIGENT DESIGN SYSTEMS</span>
          <span>DRAWING SET 001</span>
        </div>
        <svg viewBox="0 0 1200 700" aria-hidden="true">
          <path
            d={skeleton}
            pathLength="1"
            strokeDasharray="1"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
        </svg>
        <div className="opening-rule">
          <span style={{ width: `${(checked / 3) * 100}%` }} />
        </div>
        <div className="opening-copy">
          <h2>
            DESIGN FREELY.
            <br />
            BUILD INTELLIGENTLY.
          </h2>
          <span className="mono">
            ASSETS CHECKED / {checked} OF 3<br />
            MODEL / NORTH COURT
            <br />
            STATUS / PREPARING INTERACTIVE DRAWING
          </span>
        </div>
      </div>
    </>
  );
}
