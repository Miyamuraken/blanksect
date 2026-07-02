"use client";

import { useEffect, useState } from "react";

// Cinematic intro: the solid delta mark (same glyph as DeltaMotif elsewhere
// on the site) wipes into view from the bottom up, holds, then fades out to
// reveal the homepage underneath. Bold filled shape — no thin stroked lines,
// no miter spikes, just the mark itself resolving into place.
const DRAW_MS = 1600;
const HOLD_MS = 700;
const FADE_OUT_MS = 700;

// Full pointed equilateral triangle with a hollow center — a bold delta,
// not a hairline outline.
const OUTER = "M10,183.2 L210,183.2 L110,10 Z";
const INNER = "M110,62 L165,157.2 L55,157.2 Z";

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

  const isRevealed = phase === "drawing" || phase === "hold";

  return (
    <div className={`ritual-entry ritual-${phase}`} aria-hidden="true">
      <svg
        className="ritual-svg"
        viewBox="0 0 220 193.2"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <clipPath id="ritual-clip">
            <rect
              className="ritual-clip-rect"
              x="0"
              y={isRevealed ? "0" : "193.2"}
              width="220"
              height={isRevealed ? "193.2" : "0"}
            />
          </clipPath>
        </defs>
        <path
          d={`${OUTER} ${INNER}`}
          fillRule="evenodd"
          fill="#ffffff"
          clipPath="url(#ritual-clip)"
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
        .ritual-clip-rect {
          transition: y ${DRAW_MS}ms ease-in-out, height ${DRAW_MS}ms ease-in-out;
        }
        @media (prefers-reduced-motion: reduce) {
          .ritual-entry {
            display: none;
          }
          .ritual-clip-rect {
            transition: none;
          }
        }
      `}</style>
    </div>
  );
}
