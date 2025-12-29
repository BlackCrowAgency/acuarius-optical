// src/hooks/useHeroInView.ts
"use client";

import { useEffect, useState } from "react";

export function useHeroInView(threshold = 0.1) {
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const el = document.getElementById("hero");
    if (!el || !("IntersectionObserver" in window)) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setInView(entry.isIntersecting);
      },
      { root: null, threshold }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return inView;
}
