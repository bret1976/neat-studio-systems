import Image from "next/image";
export function ArchitecturalDrawing({
  plan = false,
  context = false,
  className = "",
  eager = false,
}: {
  plan?: boolean;
  context?: boolean;
  className?: string;
  eager?: boolean;
}) {
  return (
    <Image
      src={
        context
          ? "/drawings/context-plan.svg"
          : plan
            ? "/drawings/plan.svg"
            : "/drawings/elevation.svg"
      }
      width={plan ? 1000 : 1200}
      height={700}
      alt={
        plan
          ? "Original North Court floor plan with courtyard, rooms, doors and circulation"
          : "Original North Court two-story pavilion elevation with balconies, stairs, entrance and structural grid"
      }
      className={`drawing ${className}`}
      loading={eager ? "eager" : "lazy"}
      unoptimized
    />
  );
}
export function Crosshair() {
  return (
    <span className="crosshair" aria-hidden="true">
      +
    </span>
  );
}
