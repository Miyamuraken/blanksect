"use client";

import { useEffect, useRef, useState } from "react";

// Bold, thick-bordered delta glyph (flat top, wide base, hollow center) —
// matches a carved/stamped mark rather than a thin line icon.
// Each section reveals a bit more of it via a bottom-up clip wipe, so the
// symbol reads as "still forming" — a slow ~4s reveal per section so
// visitors actually notice it completing while they read, rather than it
// snapping into place.
const OUTER = "M85,20 L115,20 L165,165 L35,165 Z";
const INNER = "M100,58 L138,148 L62,148 Z";

export default function DeltaMotif({ completion = 1, size = 220, className = "" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const uid = useRef(`delta-clip-${Math.random().toString(36).slice(2)}`);

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

  const revealPercent = visible ? completion * 100 : 0;

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
        <clipPath id={uid.current}>
          <rect
            x="0"
            y={185 - (185 * revealPercent) / 100}
            width="200"
            height={(185 * revealPercent) / 100}
            style={{
              transition:
                "y 4s cubic-bezier(0.19, 1, 0.22, 1), height 4s cubic-bezier(0.19, 1, 0.22, 1)",
            }}
          />
        </clipPath>
      </defs>
      <path
        d={`${OUTER} ${INNER}`}
        fillRule="evenodd"
        fill="var(--bronze)"
        opacity="0.16"
        clipPath={`url(#${uid.current})`}
      />
    </svg>
  );
}
