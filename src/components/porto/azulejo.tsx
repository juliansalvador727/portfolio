/**
 * Hand-built azulejo: one 100×100 tile whose corner rosettes, edge dots and
 * quarter arcs only complete when neighbouring tiles meet, like the panels on
 * São Bento and Capela das Almas. Ink is currentColor, the body is --glaze.
 */

const PETAL = "M50 50C58 42 60 30 50 22C40 30 42 42 50 50Z";
const LEAF = "M50 50C54 46 55 41 50 36C45 41 46 46 50 50Z";
// A small petal pointing up from the origin, fanned around each corner.
const CORNER_PETAL = "M0 0C4.5 -5 5 -11 0 -16C-5 -11 -4.5 -5 0 0Z";
const CORNERS = [
  [0, 0],
  [100, 0],
  [0, 100],
  [100, 100],
];

export function AzulejoTile() {
  return (
    <g fill="none" stroke="currentColor">
      {/* Grout */}
      <rect width="100" height="100" strokeOpacity="0.12" strokeWidth="0.8" />

      {/* Lozenge lattice — joins into a diamond grid across the wall */}
      <path d="M50 0L100 50L50 100L0 50Z" strokeOpacity="0.45" strokeWidth="0.8" />

      {/* Corner rosettes and rings — each completes across four tiles */}
      {CORNERS.map(([cx, cy]) => (
        <g key={`${cx}-${cy}`}>
          <circle cx={cx} cy={cy} r="30" strokeWidth="1.3" />
          <circle cx={cx} cy={cy} r="24" strokeOpacity="0.5" strokeWidth="0.7" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <path
              key={deg}
              d={CORNER_PETAL}
              strokeWidth="1"
              transform={`translate(${cx} ${cy}) rotate(${deg})`}
            />
          ))}
          <circle cx={cx} cy={cy} r="3" fill="currentColor" stroke="none" />
        </g>
      ))}

      {/* Edge beads where the lattice meets the tile edge */}
      {[
        [50, 0],
        [0, 50],
        [100, 50],
        [50, 100],
      ].map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="2.4" fill="currentColor" stroke="none" />
      ))}

      {/* Central camellia: open petals, solid leaves between */}
      {[0, 90, 180, 270].map((deg) => (
        <path
          key={deg}
          d={PETAL}
          className="fill-glaze"
          strokeWidth="1.2"
          transform={`rotate(${deg} 50 50)`}
        />
      ))}
      {[45, 135, 225, 315].map((deg) => (
        <path
          key={deg}
          d={LEAF}
          fill="currentColor"
          stroke="none"
          transform={`rotate(${deg} 50 50)`}
        />
      ))}
      <circle cx="50" cy="50" r="5" className="fill-glaze" strokeWidth="1" />
      <circle cx="50" cy="50" r="1.8" fill="currentColor" stroke="none" />
    </g>
  );
}

/** A <pattern> def; reference it with fill={`url(#${id})`}. */
export function AzulejoPattern({ id, size }: { id: string; size: number }) {
  return (
    <pattern
      id={id}
      width={size}
      height={size}
      patternUnits="userSpaceOnUse"
    >
      <g transform={`scale(${size / 100})`}>
        <AzulejoTile />
      </g>
    </pattern>
  );
}

/** A single-row band of tiles, used as a divider along page edges. */
export function AzulejoFrieze({
  id,
  size = 28,
  className = "",
}: {
  id: string;
  size?: number;
  className?: string;
}) {
  return (
    <svg
      aria-hidden
      width="100%"
      height={size}
      className={`block text-cobalt ${className}`}
    >
      <defs>
        <AzulejoPattern id={id} size={size} />
      </defs>
      <rect width="100%" height={size} fill={`url(#${id})`} />
    </svg>
  );
}

/**
 * Cercadura: the running border that frames figurative panels. A vine scrolls
 * between double rules, curling at each crest and trough, with a leaf between.
 * One repeat is 64×32.
 */
export function CercaduraUnit() {
  return (
    <g fill="none" stroke="currentColor" strokeLinecap="round">
      <path d="M0 1.5H64M0 4.5H64M0 27.5H64M0 30.5H64" strokeWidth="0.9" />
      <path d="M0 16C10 6 22 6 32 16S54 26 64 16" strokeWidth="1.6" />
      {/* Crest curl, falling inward */}
      <path d="M16 8.5C20 9 21.5 13 19 15.5C16.8 17.6 13.6 16 14 13.6C14.3 12 16.2 11.8 16.8 13" strokeWidth="1.1" />
      {/* Trough curl, rising inward */}
      <path d="M48 23.5C44 23 42.5 19 45 16.5C47.2 14.4 50.4 16 50 18.4C49.7 20 47.8 20.2 47.2 19" strokeWidth="1.1" />
      {/* Leaves */}
      <path d="M26 11C28 6.5 32 6 35 7C33 10.5 29.5 11.8 26 11Z" fill="currentColor" stroke="none" />
      <path d="M58 21C56 25.5 52 26 49 25C51 21.5 54.5 20.2 58 21Z" fill="currentColor" stroke="none" />
      <path d="M4 20.5C3.2 23.5 5 25.5 7.5 25.8C7.4 23.2 6 21.2 4 20.5Z" fill="currentColor" stroke="none" />
      <path d="M36 11.5C36.8 8.5 35 6.5 32.5 6.2" strokeWidth="0.8" />
      {/* Beads in the rules */}
      <circle cx="0" cy="3" r="1.3" fill="currentColor" stroke="none" />
      <circle cx="32" cy="29" r="1.3" fill="currentColor" stroke="none" />
    </g>
  );
}

export function Cercadura({
  id,
  height = 24,
  className = "",
}: {
  id: string;
  height?: number;
  className?: string;
}) {
  const k = height / 32;
  return (
    <svg
      aria-hidden
      width="100%"
      height={height}
      className={`block text-cobalt ${className}`}
    >
      <defs>
        <pattern id={id} width={64 * k} height={height} patternUnits="userSpaceOnUse">
          <g transform={`scale(${k})`}>
            <CercaduraUnit />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height={height} fill={`url(#${id})`} />
    </svg>
  );
}
