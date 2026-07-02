"use client";

// Splits the brand name into individual letters so each one can drop in
// from above on its own, staggered left to right, instead of the whole
// wordmark fading/emerging as one block.

export default function Wordmark({ text = "BLANKSECT", className = "" }) {
  const letters = text.split("");

  return (
    <span className={`wordmark ${className}`} aria-label={text}>
      {letters.map((letter, i) => (
        <span
          key={i}
          className="wordmark-letter"
          aria-hidden="true"
          style={{ animationDelay: `${0.3 + i * 0.07}s` }}
        >
          {letter === " " ? "\u00A0" : letter}
        </span>
      ))}
    </span>
  );
}
