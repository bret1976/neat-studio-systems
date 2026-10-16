export function SectionCutaway() {
  return (
    <svg
      className="section-cutaway"
      viewBox="0 0 1000 700"
      role="img"
      aria-label="Original NEAT section through a pavilion, with stair and window review annotations"
    >
      <defs>
        <pattern
          id="section-grid"
          width="60"
          height="60"
          patternUnits="userSpaceOnUse"
        >
          <path d="M60 0H0V60" fill="none" stroke="#c6c7bd" strokeWidth=".7" />
        </pattern>
        <pattern
          id="section-hatch"
          width="4"
          height="4"
          patternUnits="userSpaceOnUse"
        >
          <path d="M0 4L4 0" stroke="#282828" strokeWidth=".5" />
        </pattern>
      </defs>
      <path d="M110 80H890V610H110Z" fill="url(#section-grid)" />
      <g stroke="#282828" fill="var(--paper)" strokeWidth="1.5">
        <path d="M180 560L410 375H740L850 560Z" fill="#393c35" />
        <path d="M180 560L410 375H460L235 560Z" fill="url(#section-hatch)" />
        <path d="M300 390V280H720V390ZM380 280V130H800V280Z" />
        <path
          d="M290 390H745V405H290ZM370 280H815V295H370ZM370 130H815V142H370Z"
          fill="#a6a99e"
        />
        <path d="M420 142V280M500 142V280M580 142V280M660 142V280M740 142V280M420 280V390M500 295V390M620 295V390" />
        <path d="M425 150H575V250H425Z" fill="#a1a49a" />
        <path d="M585 150H735V250H585Z" fill="#c6c7bd" />
        <path d="M470 340H550V390H470ZM640 340H700V390H640Z" />
        <path d="M185 570H870M110 610H925M310 310H400V380" fill="none" />
        {Array.from({ length: 15 }, (_, i) => (
          <path
            key={i}
            d={`M${210 + i * 14} ${550 - i * 11}h45`}
            strokeWidth=".8"
          />
        ))}
      </g>
      <g className="cutaway-pin pin-window">
        <path d="M500 180H340L285 125" fill="none" stroke="#c33d20" />
        <rect x="145" y="65" width="220" height="75" fill="#c33d20" />
        <text x="160" y="90" fontSize="10" fill="white" fontFamily="monospace">
          01 / WINDOW GEOMETRY
        </text>
        <text x="160" y="112" fontSize="15" fill="white">
          REVIEW IN CONTEXT
        </text>
        <rect x="493" y="173" width="14" height="14" fill="#c33d20" />
      </g>
      <g className="cutaway-pin pin-stair">
        <path d="M365 470H650V425" fill="none" stroke="#c33d20" />
        <rect x="570" y="425" width="220" height="75" fill="#c33d20" />
        <text x="585" y="451" fontSize="10" fill="white" fontFamily="monospace">
          02 / STAIR GEOMETRY
        </text>
        <text x="585" y="476" fontSize="15" fill="white">
          HUMAN REVIEW REQUIRED
        </text>
        <rect x="358" y="463" width="14" height="14" fill="#c33d20" />
      </g>
    </svg>
  );
}
