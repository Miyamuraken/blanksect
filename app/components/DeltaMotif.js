"use client";

import { useEffect, useRef, useState } from "react";

// Hand-drawn, hatched delta glyph — reads like a sketchbook triangle being
// traced stroke by stroke: first a single diagonal stroke, then two strokes
// meeting at a peak, then the closed triangle with its inner triangle and
// full hatching. Rendered translucent white (not filled) so the copy behind
// it stays legible — the lines sit *over* the words rather than blocking them.
// Each section's instance draws itself in slowly (~13s ease-out) once it
// scrolls into view, so the motion is easy to catch rather than snapping in.

const OUTER = "M35,165 L100,20 L165,165 Z";
const INNER = "M100,60 L140,145 L60,145 Z";

const DRAW_DURATION = "13s";
const DRAW_EASE = "cubic-bezier(0.19, 1, 0.22, 1)";

export default function DeltaMotif({ completion = 1, size = 220, className = "" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const uid = useRef(`delta-${Math.random().toString(36).slice(2)}`);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Outer triangle draws in step with `completion`. The inner triangle only
  // starts appearing once the outer shape is mostly resolved, matching the
  // reference sketches (no inner triangle until the third, most-complete one).
  const outerDrawn = visible ? completion : 0;
  const innerDrawn = visible ? Math.max(0, Math.min(1, (completion - 0.6) / 0.4)) : 0;

  const hatchId = `${uid.current}-hatch`;

  return (
    <svg
      ref={ref}
      className={className}
      width={size}
      height={size * 0.9}
      viewBox="0 0 200 185"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <pattern
          id={hatchId}
          width="7"
          height="7"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)"
        >
          <rect width="7" height="7" fill="rgba(255,255,255,0.06)" />
          <line x1="0" y1="0" x2="0" y2="7" stroke="rgba(255,255,255,0.55)" strokeWidth="1.4" />
        </pattern>
      </defs>

      <path
        d={OUTER}
        fill="none"
        stroke={`url(#${hatchId})`}
        strokeWidth="15"
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength="100"
        strokeDasharray="100"
        strokeDashoffset={100 - outerDrawn * 100}
        style={{ transition: `stroke-dashoffset ${DRAW_DURATION} ${DRAW_EASE}` }}
      />
      {/* thin crisp edge on top of the hatch so the outline still reads clearly */}
      <path
        d={OUTER}
        fill="none"
        stroke="rgba(255,255,255,0.5)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength="100"
        strokeDasharray="100"
        strokeDashoffset={100 - outerDrawn * 100}
        style={{ transition: `stroke-dashoffset ${DRAW_DURATION} ${DRAW_EASE}` }}
      />

      <path
        d={INNER}
        fill="none"
        stroke={`url(#${hatchId})`}
        strokeWidth="9"
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength="100"
        strokeDasharray="100"
        strokeDashoffset={100 - innerDrawn * 100}
        style={{ transition: `stroke-dashoffset ${DRAW_DURATION} ${DRAW_EASE}` }}
      />
      <path
        d={INNER}
        fill="none"
        stroke="rgba(255,255,255,0.45)"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength="100"
        strokeDasharray="100"
        strokeDashoffset={100 - innerDrawn * 100}
        style={{ transition: `stroke-dashoffset ${DRAW_DURATION} ${DRAW_EASE}` }}
      />
    </svg>
  );
}
