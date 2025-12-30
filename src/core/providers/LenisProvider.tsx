"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Lenis from "lenis";
import type { LenisOptions } from "lenis";
import { usePathname } from "next/navigation";

type ScrollToTarget = number | string | HTMLElement;
type ScrollToOptions = {
  offset?: number;
  immediate?: boolean;
  lock?: boolean;
  duration?: number;
  easing?: (t: number) => number;
  onComplete?: () => void;
};

type LenisCtx = {
  lenis: Lenis | null;
  scrollTo: (target: ScrollToTarget, opts?: ScrollToOptions) => void;
  start: () => void;
  stop: () => void;
};

const LenisContext = createContext<LenisCtx>({
  lenis: null,
  scrollTo: () => {},
  start: () => {},
  stop: () => {},
});

export function useLenis() {
  return useContext(LenisContext);
}

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
}

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const lenisRef = useRef<Lenis | null>(null);
  const rafRef = useRef<number | null>(null);
  const enabledRef = useRef(false);

  // Esto permite exponer lenis de forma correcta a tus componentes
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);

  const scrollTo = useCallback((target: ScrollToTarget, opts?: ScrollToOptions) => {
    const l = lenisRef.current;
    if (!l) return;

    l.scrollTo(target as any, {
      duration: 1.1,
      easing: easeOutCubic,
      ...opts,
    } as any);
  }, []);

  const start = useCallback(() => {
    const l = lenisRef.current;
    if (!l) return;
    l.start();
    document.documentElement.classList.remove("lenis-stopped");
  }, []);

  const stop = useCallback(() => {
    const l = lenisRef.current;
    if (!l) return;
    l.stop();
    document.documentElement.classList.add("lenis-stopped");
  }, []);

  useEffect(() => {
    // A11y: reduce motion => sin Lenis (scroll normal)
    if (prefersReducedMotion()) return;

    // Evita conflictos de scroll restoration en SPA (back/forward)
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // ✅ Config “pro” para tu versión:
    // - Desktop: smoothWheel ON
    // - Mobile/touch: nativo (porque smoothTouch no está soportado en tus types)
    const options: LenisOptions = {
      smoothWheel: true,

      // sensación “pro”
      lerp: 0.085,
      wheelMultiplier: 0.9,
    };

    const lenis = new Lenis(options);
    lenisRef.current = lenis;
    setLenisInstance(lenis);
    enabledRef.current = true;

    // Clases para CSS
    const root = document.documentElement;
    root.classList.add("lenis", "lenis-smooth");

    // RAF loop
    const raf = (time: number) => {
      lenis.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    };
    rafRef.current = requestAnimationFrame(raf);

    // Anchors: <a href="#..."> => scroll suave
    const onClick = (e: MouseEvent) => {
      const el = e.target as HTMLElement | null;
      const a = el?.closest?.('a[href^="#"]') as HTMLAnchorElement | null;
      if (!a) return;

      const hash = a.getAttribute("href");
      if (!hash || hash === "#") return;

      const id = decodeURIComponent(hash.slice(1));
      const target = document.getElementById(id);
      if (!target) return;

      e.preventDefault();

      lenis.scrollTo(target, {
        offset: 0,
        duration: 1.1,
        easing: easeOutCubic,
      } as any);

      history.pushState(null, "", hash);
    };

    document.addEventListener("click", onClick, { passive: false });

    return () => {
      document.removeEventListener("click", onClick as any);

      enabledRef.current = false;

      if (rafRef.current) cancelAnimationFrame(rafRef.current);

      root.classList.remove("lenis", "lenis-smooth", "lenis-stopped");

      lenis.destroy();
      lenisRef.current = null;
      setLenisInstance(null);
    };
  }, []);

  // En cambio de ruta: top inmediato (lo más estable para Next App Router)
  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis || !enabledRef.current) return;

    lenis.scrollTo(0, { immediate: true } as any);
  }, [pathname]);

  const value = useMemo<LenisCtx>(
    () => ({
      lenis: lenisInstance,
      scrollTo,
      start,
      stop,
    }),
    [lenisInstance, scrollTo, start, stop]
  );

  return <LenisContext.Provider value={value}>{children}</LenisContext.Provider>;
}
