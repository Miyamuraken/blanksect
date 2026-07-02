"use client";

import { useEffect, useState } from "react";

const PERIMETER = 520;

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
    const t1 = setTimeout(() => setPhase("question"), 1800);
    const t2 = setTimeout(() => setPhase("exit"), 3600);
    const t3 = setTimeout(() => {
      setPhase("done");
      try {
        sessionStorage.setItem("blanksect_entered", "1");
      } catch (e) {
        /* ignore */
      }
    }, 4300);

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
        height="162"
        viewBox="0 0 200 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 14 L188 166 L12 166 Z"
          stroke="var(--bronze)"
          strokeWidth="1"
          strokeLinejoin="round"
          strokeDasharray={PERIMETER}
          className="ritual-delta-path"
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
        .ritual-delta-path {
          stroke-dashoffset: ${PERIMETER};
          animation: ritual-draw 1.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .ritual-question {
          font-family: var(--font-display);
          font-style: italic;
          font-size: 1.3rem;
          color: var(--text-muted);
          opacity: 0;
        }
        .ritual-question,
        .ritual-question {
          animation: ritual-fade-in 1s ease forwards;
          animation-delay: 1.7s;
        }
        @keyframes ritual-draw {
          to {
            stroke-dashoffset: 0;
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
