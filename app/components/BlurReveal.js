"use client";

import { useEffect, useRef, useState } from "react";

export default function BlurReveal({ as: Tag = "p", className = "", children }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`${className} blur-reveal ${visible ? "blur-reveal-visible" : ""}`}
    >
      {children}
    </Tag>
  );
}
