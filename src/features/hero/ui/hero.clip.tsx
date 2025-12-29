// Server Component (sin "use client")
export function HeroClipDefs() {
  const d =
    "M0.025157,0 H0.974843 A0.025157,0.07619 0,0,1 1,0.07619 V0.447619 A0.025157,0.07619 0,0,1 0.974843,0.52381 H0.765723 A0.025157,0.07619 0,0,0 0.740566,0.6 V0.92381 A0.025157,0.07619 0,0,1 0.715409,1 H0.025157 A0.025157,0.07619 0,0,1 0,0.92381 V0.07619 A0.025157,0.07619 0,0,1 0.025157,0 Z";

  return (
    <svg aria-hidden className="absolute size-0">
      <defs>
        <clipPath id="hero-clip-sm" clipPathUnits="objectBoundingBox">
          <path d={d} />
        </clipPath>
        <clipPath id="hero-clip-md" clipPathUnits="objectBoundingBox">
          <path d={d} />
        </clipPath>
      </defs>
    </svg>
  );
}
