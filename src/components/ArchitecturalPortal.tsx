export function ArchitecturalPortal({
  idPrefix = "portal-study",
}: {
  idPrefix?: string;
}) {
  return (
    <svg
      className="architectural-portal"
      viewBox="0 0 800 1000"
      role="img"
      aria-label="Original NEAT architectural study of an arched concrete portal and approach stairs"
    >
      <defs>
        <pattern
          id={`${idPrefix}-hatch`}
          width="5"
          height="5"
          patternUnits="userSpaceOnUse"
        >
          <path d="M0 5L5 0" stroke="#282828" strokeWidth=".4" opacity=".35" />
        </pattern>
        <linearGradient id={`${idPrefix}-shade`}>
          <stop stopColor="#282828" />
          <stop offset="1" stopColor="#93958a" />
        </linearGradient>
      </defs>
      <g fill="none" stroke="#c6c7bd" strokeWidth=".7">
        <path d="M0 780H800M0 850H800M0 920H800M400 600V1000M50 1000L400 600L750 1000M200 1000L400 600L600 1000" />
        <path
          d="M150 900V100M600 900V100M100 200H700M100 500H700"
          strokeDasharray="6 6"
        />
      </g>
      <circle cx="475" cy="160" r="85" fill="var(--red)" />
      <g stroke="#282828" strokeWidth="2">
        <path
          d="M220 800V370C220 165 580 165 580 370V800H490V370C490 265 310 265 310 370V800Z"
          fill="#e4e4d8"
        />
        <path
          d="M220 800V370C220 165 580 165 580 370V800H490V370C490 265 310 265 310 370V800Z"
          fill={`url(#${idPrefix}-hatch)`}
        />
        <path
          d="M580 370L645 320V750L580 800ZM310 370L375 320V750L310 800Z"
          fill={`url(#${idPrefix}-shade)`}
        />
        <path
          d="M220 370C220 165 580 165 580 370L645 320C645 115 285 115 285 320Z"
          fill="#b8bbae"
        />
        <path d="M310 800L250 850H550L490 800Z" fill="#b9baaf" />
        <path
          d="M250 850L190 900H610L550 850ZM190 900L145 945H655L610 900Z"
          fill="#e4e4d8"
        />
        {Array.from({ length: 9 }, (_, i) => (
          <path
            key={i}
            d={`M${246 - i * 10} ${856 + i * 10}H${554 + i * 10}`}
            strokeWidth=".7"
          />
        ))}
        <path d="M490 800L720 900H610L550 850Z" fill="#282828" stroke="none" />
      </g>
      <circle cx="200" cy="865" r="50" fill="var(--red)" />
      <text x="35" y="975" fontSize="10" fontFamily="monospace" fill="#68685f">
        NEAT / ORIGINAL ARCHITECTURAL STUDY / PORTAL 001
      </text>
    </svg>
  );
}
