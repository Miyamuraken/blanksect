"use client";

import { useEffect, useState } from "react";

// Cinematic intro: a single continuous, thick white line draws an
// equilateral triangle — starting at the left vertex, moving horizontally
// right along the base, turning sharply upward to the apex, then sloping
// back down to close the shape. Crisp edges, no glow, no bounce — reads
// like a precision instrument tracing the mark in one motion.
const DRAW_MS = 1600;
const HOLD_MS = 700;
const FADE_OUT_MS = 700;

// Equilateral triangle: base left -> base right -> apex -> close (back to
// base left). Side length 200 units, so total perimeter = 600.
const TRIANGLE_PATH = "M10,183.2 L210,183.2 L110,10 Z";
const PERIMETER = 600;

// Thick, bold stroke (~6x the original hairline weight). At this weight the
// sharp miter joins spike out well past the triangle's corners, so the
// viewBox below is padded generously and the SVG wrapper stays
// overflow:visible so nothing gets clipped.
const STROKE_WIDTH = 72;

export default function RitualEntry() {
  const [phase, setPhase] = useState("hidden"); // hidden | drawing | hold | out | done

  useEffect(() => {
    // Only show once per browser session.
    let alreadySeen = false;
    try {
      alreadySeen = sessionStorage.getItem("blanksect_entered") === "1";
    } catch (e) {
      alreadySeen = false;
    }

    if (alreadySeen) {
      setPhase("done");
      return;
    }

    const raf = requestAnimationFrame(() => setPhase("drawing"));

    const t1 = setTimeout(() => setPhase("hold"), DRAW_MS);
    const t2 = setTimeout(() => setPhase("out"), DRAW_MS + HOLD_MS);
    const t3 = setTimeout(() => {
      setPhase("done");
      try {
        sessionStorage.setItem("blanksect_entered", "1");
      } catch (e) {
        /* ignore */
      }
    }, DRAW_MS + HOLD_MS + FADE_OUT_MS);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  if (phase === "done" || phase === "hidden") return null;

  const isDrawing = phase === "drawing" || phase === "hold";

  return (
    <div className={`ritual-entry ritual-${phase}`} aria-hidden="true">
      <svg
        className="ritual-svg"
        viewBox="-90 -90 400 360"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d={TRIANGLE_PATH}
          fill="none"
          stroke="#ffffff"
          strokeWidth={STROKE_WIDTH}
          strokeLinejoin="miter"
          strokeLinecap="butt"
          strokeDasharray={PERIMETER}
          className={`ritual-path ${isDrawing ? "ritual-path-drawing" : ""}`}
        />
      </svg>

      <style jsx>{`
        .ritual-entry {
          position: fixed;
          inset: 0;
          z-index: 200;
          background: #000000;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: opacity ${FADE_OUT_MS}ms ease-in-out;
        }
        .ritual-out {
          opacity: 0;
          pointer-events: none;
        }
        .ritual-svg {
          width: clamp(90px, 18vw, 260px);
          height: auto;
          overflow: visible;
        }
        .ritual-path {
          stroke-dashoffset: ${PERIMETER};
        }
        .ritual-path-drawing {
          animation: ritual-draw ${DRAW_MS}ms ease-in-out forwards;
        }
        @keyframes ritual-draw {
          to {
            stroke-dashoffset: 0;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .ritual-entry {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
