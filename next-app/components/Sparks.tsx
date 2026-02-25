"use client";

import { useEffect } from "react";

export default function Sparks({ count = 28 }: { count?: number }) {
  useEffect(() => {
    const colors = ["#00f5ff", "#7b61ff", "#ff4ecd"];
    const created: HTMLSpanElement[] = [];

    for (let i = 0; i < count; i++) {
      const s = document.createElement("span");
      s.className = "spark sparkHome";
      s.style.left = Math.random() * 100 + "vw";
      s.style.animationDelay = (Math.random() * 9).toFixed(2) + "s";
      s.style.animationDuration = (6 + Math.random() * 8).toFixed(2) + "s";
      s.style.color = colors[Math.floor(Math.random() * colors.length)];
      document.body.appendChild(s);
      created.push(s);
    }

    return () => {
      created.forEach((s) => s.remove());
    };
  }, [count]);

  return null;
}
