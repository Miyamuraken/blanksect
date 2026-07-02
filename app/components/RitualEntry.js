"use client";

import { useEffect, useState } from "react";

// Cinematic intro: a solid white equilateral triangle, centered on pure
// black. Fades + scales in (0.8s), holds (1.2s), then fades out while the
// homepage is revealed underneath. No outline, no text, no bounce —
// a quiet luxury-brand reveal rather than a flashy one.
const FADE_IN_MS = 800;
const HOLD_MS = 1200;
const FADE_OUT_MS = 800;

export default function RitualEntry() {
  const [phase, setPhase] = useState("hidden"); // hidden | in | hold | out | done

  useEffect(() => {
    // Only show once per browser session — repeat visits/navigation during
    // the same session skip straight to the site.
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

    // Start on the next frame so the CSS transition actually fires.
    const raf = requestAnimationFrame(() => setPhase("in"));

    const t1 = setTimeout(() => setPhase("hold"), FADE_IN_MS);
    const t2 = setTimeout(() => setPhase("out"), FADE_IN_MS + HOLD_MS);
    const t3 = setTimeout(() => {
      setPhase("done");
      try {
        sessionStorage.setItem("blanksect_entered", "1");
      } catch (e) {
        /* ignore */
      }
    }, FADE_IN_MS + HOLD_MS + FADE_OUT_MS);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  if (phase === "done" || phase === "hidden") return null;

  const logoVisible = phase === "in" || phase === "hold";

  return (
    <div className={`ritual-entry ritual-${phase}`} aria-hidden="true">
      <div className={`ritual-triangle ${logoVisible ? "ritual-triangle-visible" : ""}`} />

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
        .ritual-triangle {
          width: clamp(90px, 18vw, 260px);
          aspect-ratio: 1 / 0.866;
          background: #ffffff;
          clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
          opacity: 0;
          transform: scale(0.95);
          transition: opacity ${FADE_IN_MS}ms ease-in-out,
            transform ${FADE_IN_MS}ms ease-in-out;
        }
        .ritual-triangle-visible {
          opacity: 1;
          transform: scale(1);
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
