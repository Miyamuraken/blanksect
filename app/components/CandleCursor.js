"use client";

import { useEffect, useRef } from "react";

export default function CandleCursor() {
  const glowRef = useRef(null);

  useEffect(() => {
    // Skip on touch devices — a mouse-follow glow means nothing without a mouse.
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (isTouch || prefersReducedMotion) return;

    const node = glowRef.current;
    if (!node) return;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;
    let raf;

    function handleMove(e) {
      targetX = e.clientX;
      targetY = e.clientY;
      node.style.opacity = "1";
    }

    function handleLeave() {
      node.style.opacity = "0";
    }

    function animate() {
      // Gentle lag, like a candle drifting rather than snapping to the cursor.
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      node.style.transform = `translate(${currentX}px, ${currentY}px)`;
      raf = requestAnimationFrame(animate);
    }

    window.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseleave", handleLeave);
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseleave", handleLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={glowRef} className="candle-glow" aria-hidden="true">
      <style jsx>{`
        .candle-glow {
          position: fixed;
          top: 0;
          left: 0;
          width: 420px;
          height: 420px;
          margin-left: -210px;
          margin-top: -210px;
          pointer-events: none;
          z-index: 1;
          opacity: 0;
          transition: opacity 0.6s ease;
          background: radial-gradient(
            circle,
            rgba(168, 138, 74, 0.07) 0%,
            rgba(168, 138, 74, 0.03) 35%,
            rgba(168, 138, 74, 0) 70%
          );
        }
        @media (pointer: coarse) {
          .candle-glow {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
