export function NeatMonogram() {
  return (
    <div className="neat-monogram" aria-label="NEAT architectural monogram">
      <svg
        viewBox="0 0 300 300"
        role="img"
        aria-label="Original dimensional N mark"
      >
        <g
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinejoin="round"
        >
          <path
            className="monogram-face face-top"
            d="M55 90L105 62L245 142L195 170ZM55 90L105 62L105 112L55 140ZM145 42L195 14L245 42L195 70Z"
          />
          <path
            className="monogram-face face-front"
            d="M55 90L105 119V219L145 242V142L195 170V270L145 298L55 247ZM145 42L195 70V170L145 142Z"
          />
          <path
            className="monogram-face face-side"
            d="M195 70L245 42V242L195 270V170L245 142M105 219L145 197V242"
          />
          <path d="M105 119L145 97M145 197L195 226M55 140L105 169M195 170L245 142" />
        </g>
      </svg>
    </div>
  );
}
