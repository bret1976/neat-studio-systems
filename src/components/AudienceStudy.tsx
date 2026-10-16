"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { audiences } from "@/content/site";
const images = [
  ["/images/north-court-render.webp", "Original North Court exterior study"],
  ["/drawings/plan.svg", "Original coordinated floor plan study"],
  ["/images/north-court-sketch.webp", "Original North Court spatial study"],
  ["/drawings/elevation.svg", "Original structural pavilion elevation"],
  ["/drawings/plan.svg", "Original technical documentation study"],
  ["/drawings/tower.svg", "Original tower massing study"],
  ["/images/north-court-render.webp", "Original studio project visualization"],
  ["/drawings/elevation.svg", "Original interdisciplinary pavilion study"],
];
export function AudienceStudy() {
  const [active, setActive] = useState(0);
  return (
    <div className="audience-editorial">
      <div className="audience-image ruled" data-role={active}>
        {images.map(([src, alt], i) => (
          <div
            key={i}
            className={`audience-plate ${active === i ? "active" : ""}`}
            aria-hidden={active !== i}
          >
            <Image
              src={src}
              width={1800}
              height={1200}
              alt={active === i ? alt : ""}
              sizes="(max-width:760px) 100vw,50vw"
              unoptimized={src.endsWith("svg")}
            />
            {i === 1 || i === 4 ? (
              <svg
                className="audience-drafting-overlay"
                viewBox="0 0 1000 700"
                aria-hidden="true"
              >
                <path
                  d={
                    i === 1
                      ? "M350 200L650 200L665 460L755 270M350 200L665 460M650 200L755 270"
                      : "M110 70H890M110 65V75M890 65V75M110 65V620M100 100H115M100 600H115"
                  }
                  fill="none"
                  stroke="var(--red)"
                  strokeDasharray="5 4"
                  strokeWidth="2"
                />
              </svg>
            ) : null}
          </div>
        ))}
        <span className="mono">
          {audiences[active][0]} / ORIGINAL DESIGN STUDY
          <br />
          ONE CONNECTED DESIGN PROCESS.
        </span>
      </div>
      <div className="audience-list">
        {audiences.map(([title, description, slug], i) => (
          <details
            key={title}
            open={active === i}
            onToggle={(e) => {
              if (e.currentTarget.open) setActive(i);
            }}
          >
            <summary
              onClick={(e) => {
                e.preventDefault();
                setActive(i);
              }}
            >
              <span className="mono">0{i + 1}</span>
              {title}
              <b>{active === i ? "−" : "+"}</b>
            </summary>
            <div>
              <p>{description}</p>
              <Link
                className="technical-link"
                href={slug ? `/solutions/${slug}` : "/solutions#design-teams"}
              >
                EXPLORE <span>↗</span>
              </Link>
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}
