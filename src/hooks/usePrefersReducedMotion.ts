'use client';

import { useEffect, useState } from 'react';

/**
 * Detecta si el usuario ha activado "reducir movimiento".
 * SSR-safe: devuelve `false` en el servidor y se actualiza en el cliente.
 */
export function usePrefersReducedMotion(): { reducedMotion: boolean } {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      setReducedMotion(false);
      return;
    }

    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');

    // Set inicial
    setReducedMotion(mql.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };

    // Feature detection: modernos vs. legacy (Safari viejo)
    if (typeof mql.addEventListener === 'function') {
      mql.addEventListener('change', handleChange);
      return () => mql.removeEventListener('change', handleChange);
    }

    // Fallback legacy con addListener/removeListener
    const anyMql = mql as unknown as {
      addListener?: (cb: (e: MediaQueryListEvent) => void) => void;
      removeListener?: (cb: (e: MediaQueryListEvent) => void) => void;
    };

    if (typeof anyMql.addListener === 'function' && typeof anyMql.removeListener === 'function') {
      anyMql.addListener(handleChange);
      return () => anyMql.removeListener!(handleChange);
    }

    // Sin listeners disponibles
    return;
  }, []);

  return { reducedMotion };
}
