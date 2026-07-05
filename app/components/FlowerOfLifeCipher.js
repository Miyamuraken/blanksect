"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const CIRCLE_R = 22;

// Generates the classic 19-circle Flower of Life pattern using hex-grid math.
function generateCircles() {
  const centers = [[0, 0]];
  const directions = [0, 60, 120, 180, 240, 300].map((deg) => {
    const rad = (deg * Math.PI) / 180;
    return [Math.cos(rad) * CIRCLE_R, Math.sin(rad) * CIRCLE_R];
  });

  // Ring 1
  directions.forEach(([dx, dy]) => centers.push([dx, dy]));

  // Ring 2 (combinations of two adjacent ring-1 directions)
  for (let i = 0; i < 6; i++) {
    const [dx1, dy1] = directions[i];
    const [dx2, dy2] = directions[(i + 1) % 6];
    centers.push([dx1 + dx2, dy1 + dy2]);
  }

  return centers;
}

const CIRCLES = generateCircles();

export default function FlowerOfLifeCipher({ onReveal, size = 46 }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  function handleActivate() {
    setOpen(true);
    if (onReveal) onReveal();
  }

  const modal = (
    <div className="fol-overlay" onClick={() => setOpen(false)}>
      <div className="fol-modal" onClick={(e) => e.stopPropagation()}>
        <svg
          width="120"
          height="120"
          viewBox="-70 -70 140 140"
          xmlns="http://www.w3.org/2000/svg"
          className="fol-modal-svg"
        >
          {CIRCLES.map(([cx, cy], i) => (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r={CIRCLE_R}
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
          ))}
        </svg>
        <p className="fol-line">
          Everything that exists was once inside a thought.
        </p>
        <p className="fol-sub">You found this because you were looking.</p>
        <button type="button" className="fol-close" onClick={() => setOpen(false)}>
          Close
        </button>
      </div>
    </div>
  );

  return (
    <>
      <button
        type="button"
        className="fol-trigger"
        onClick={handleActivate}
        aria-label="A symbol for those who look closer"
      >
        <svg
          width={size}
          height={size}
          viewBox="-70 -70 140 140"
          xmlns="http://www.w3.org/2000/svg"
        >
          {CIRCLES.map(([cx, cy], i) => (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r={CIRCLE_R}
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
          ))}
        </svg>
      </button>

      {open && mounted && createPortal(modal, document.body)}

      <style jsx>{`
        .fol-trigger {
          grid-column: 3;
          justify-self: end;
          background: none;
          border: none;
          padding: 0.5rem;
          cursor: pointer;
          color: var(--on-ink-muted);
          opacity: 0.7;
          transition: opacity 0.4s ease, color 0.4s ease;
        }
        .fol-trigger:hover {
          opacity: 1;
          color: var(--bronze);
        }
        @media (pointer: coarse) {
          .fol-trigger {
            /* No hover state on touch — sit a bit more visible by default. */
            opacity: 0.55;
          }
        }
        .fol-overlay {
          position: fixed;
          inset: 0;
          background: rgba(10, 10, 10, 0.82);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 2rem;
          animation: fol-fade-in 0.4s ease;
        }
        .fol-modal {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          max-width: 360px;
          padding: 2rem;
        }
        .fol-modal-svg {
          color: var(--bronze);
          margin-bottom: 1.75rem;
          animation: fol-draw 1.8s ease forwards;
        }
        .fol-line {
          font-family: var(--font-display);
          font-style: italic;
          font-size: 1.3rem;
          color: var(--on-ink);
          margin-bottom: 0.75rem;
          line-height: 1.5;
        }
        .fol-sub {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--bronze);
          margin-bottom: 2rem;
        }
        .fol-close {
          background: none;
          border: 1px solid var(--on-ink-border);
          color: var(--on-ink-muted);
          font-family: var(--font-mono);
          font-size: 0.7rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 0.6rem 1.5rem;
          cursor: pointer;
          transition: color 0.2s ease, border-color 0.2s ease;
        }
        .fol-close:hover {
          color: var(--on-ink);
          border-color: var(--bronze);
        }
        @keyframes fol-fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes fol-draw {
          from {
            opacity: 0;
            transform: scale(0.85);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </>
  );
}
