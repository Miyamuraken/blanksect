"use client";

import { useEffect, useRef, useState } from "react";

// Same triangle glyph used by DeltaMotif, reused here at small scale on the
// back of the shirt so the two motifs stay visually consistent.
const OUTER = "M35,165 L100,20 L165,165 Z";
const INNER = "M100,60 L140,145 L60,145 Z";

// A simple line-art t-shirt silhouette: collar, two sleeves, body.
const SHIRT_PATH =
  "M72,26 L58,8 L36,20 L6,54 L28,80 L44,66 L44,196 L156,196 L156,66 L172,80 L194,54 L164,20 L142,8 L128,26 Q100,42 72,26 Z";

export default function TShirt360({ className = "" }) {
  const [rotation, setRotation] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [autoSpin, setAutoSpin] = useState(true);
  const dragState = useRef({ startX: 0, startRotation: 0 });

  // Gentle one-time spin on load so people immediately understand it's
  // interactive, then it settles and waits for the drag.
  useEffect(() => {
    if (!autoSpin) return;
    let raf;
    const start = performance.now();
    const tick = (t) => {
      const elapsed = t - start;
      const progress = Math.min(elapsed / 2600, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setRotation(eased * 360);
      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setAutoSpin(false);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [autoSpin]);

  const handlePointerDown = (e) => {
    setAutoSpin(false);
    setDragging(true);
    dragState.current = { startX: e.clientX, startRotation: rotation };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (!dragging) return;
    const deltaX = e.clientX - dragState.current.startX;
    setRotation(dragState.current.startRotation + deltaX * 0.6);
  };

  const stopDragging = () => setDragging(false);

  return (
    <div className={`tshirt360 ${className}`}>
      <div
        className={`tshirt360-stage${dragging ? " is-dragging" : ""}`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={stopDragging}
        onPointerLeave={stopDragging}
        onPointerCancel={stopDragging}
        role="img"
        aria-label="Interactive t-shirt preview. Drag to rotate and see the front and back design."
      >
        <div className="tshirt360-card" style={{ transform: `rotateY(${rotation}deg)` }}>
          {/* FRONT */}
          <svg
            className="tshirt360-face tshirt360-front"
            viewBox="0 0 200 220"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d={SHIRT_PATH}
              fill="rgba(255,255,255,0.02)"
              stroke="rgba(237,234,234,0.5)"
              strokeWidth="2"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
            <text
              x="100"
              y="128"
              textAnchor="middle"
              fontFamily="var(--font-manifesto)"
              fontSize="24"
              fill="rgba(168,138,74,0.9)"
              letterSpacing="1"
            >
              I AM.
            </text>
          </svg>

          {/* BACK */}
          <svg
            className="tshirt360-face tshirt360-back"
            viewBox="0 0 200 220"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d={SHIRT_PATH}
              fill="rgba(255,255,255,0.02)"
              stroke="rgba(237,234,234,0.5)"
              strokeWidth="2"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
            <g transform="translate(62,52) scale(0.42)">
              <path
                d={OUTER}
                fill="none"
                stroke="rgba(237,234,234,0.55)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d={INNER}
                fill="none"
                stroke="rgba(237,234,234,0.4)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </svg>
        </div>
      </div>
      <p className="tshirt360-hint">Drag to turn it around</p>
    </div>
  );
}
