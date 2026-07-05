"use client";

import { useEffect, useRef } from "react";

// Attaches a subtle "magnetic" pull-toward-cursor effect to whatever element
// the returned ref is placed on. Disabled for touch devices (no hover) and
// for people who've asked for reduced motion.
export default function useMagnetic(strength = 14) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
    if (prefersReducedMotion || isCoarsePointer) return;

    function handleMove(e) {
      const rect = el.getBoundingClientRect();
      const relX = e.clientX - (rect.left + rect.width / 2);
      const relY = e.clientY - (rect.top + rect.height / 2);
      el.style.transform = `translate(${(relX / rect.width) * strength}px, ${
        (relY / rect.height) * strength
      }px)`;
    }

    function handleLeave() {
      el.style.transform = "translate(0, 0)";
    }

    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);
    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, [strength]);

  return ref;
}
