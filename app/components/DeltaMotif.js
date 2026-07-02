"use client";

import { useEffect, useRef, useState } from "react";

// The delta resolves further into itself as you move through the page —
// the symbol only fully completes once you reach the drop.
export default function DeltaMotif({ completion = 1, size = 220, className = "" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

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

  // Perimeter of the triangle path below, used for the stroke-dash draw-in.
  const perimeter = 520;
  const hiddenOffset = perimeter;
  const revealedOffset = perimeter * (1 - completion);

  return (
    <svg
      ref={ref}
      className={className}
      width={size}
      height={size * 0.9}
      viewBox="0 0 200 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M100 14 L188 166 L12 166 Z"
        stroke="var(--bronze)"
        strokeWidth="1"
        strokeLinejoin="round"
        strokeDasharray={perimeter}
        strokeDashoffset={visible ? revealedOffset : hiddenOffset}
        style={{
          transition: "stroke-dashoffset 2.2s cubic-bezier(0.16, 1, 0.3, 1)",
          opacity: 0.55,
        }}
      />
    </svg>
  );
}
