"use client";

import { useEffect, useState } from "react";

// Same bold delta glyph used throughout the site (see DeltaMotif.js) —
// kept in sync here so the opening ritual and the rest of the page read
// as one consistent mark.
const OUTER = "M85,20 L115,20 L165,165 L35,165 Z";
const INNER = "M100,58 L138,148 L62,148 Z";

export default function RitualEntry() {
  const [phase, setPhase] = useState("hidden"); // hidden | drawing | question | exit | done

  useEffect(() => {
    // Only show once per browser session — repeat visits during the same
    // session skip straight to the site.
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

    setPhase("drawing");
    const t1 = setTimeout(() => setPhase("question"), 2600);
    const t2 = setTimeout(() => setPhase("exit"), 4600);
    const t3 = setTimeout(() => {
      setPhase("done");
      try {
        sessionStorage.setItem("blanksect_entered", "1");
      } catch (e) {
        /* ignore */
      }
    }, 5300);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  if (phase === "done" || phase === "hidden") return null;

  return (
    <div className={`ritual-entry ritual-${phase}`} aria-hidden="true">
      <svg
        width="180"
        height="167"
        viewBox="0 0 200 185"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <clipPath id="ritual-delta-clip">
            <rect x="0" y="185" width="200" height="0" className="ritual-clip-rect" />
          </clipPath>
        </defs>
        <path
          d={`${OUTER} ${INNER}`}
          fillRule="evenodd"
          fill="var(--bronze)"
          opacity="0.9"
          clipPath="url(#ritual-delta-clip)"
        />
      </svg>
      <p className="ritual-question">Are you seeking?</p>

      <style jsx>{`
        .ritual-entry {
          position: fixed;
          inset: 0;
          z-index: 200;
          background: var(--bg);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 2rem;
          transition: opacity 0.7s ease;
        }
        .ritual-exit {
          opacity: 0;
          pointer-events: none;
        }
        .ritual-clip-rect {
          animation: ritual-reveal 2.4s cubic-bezier(0.19, 1, 0.22, 1) forwards;
        }
        .ritual-question {
          font-family: var(--font-display);
          font-style: italic;
          font-size: 1.3rem;
          color: var(--text-muted);
          opacity: 0;
          animation: ritual-fade-in 1s ease forwards;
          animation-delay: 2.5s;
        }
        @keyframes ritual-reveal {
          from {
            y: 185;
            height: 0;
          }
          to {
            y: 20;
            height: 165;
          }
        }
        @keyframes ritual-fade-in {
          to {
            opacity: 1;
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
