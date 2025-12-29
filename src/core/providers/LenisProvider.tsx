// src/core/providers/LenisProvider.tsx
"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface LenisProviderProps {
  children: React.ReactNode;
}

export default function LenisProvider({ children }: LenisProviderProps) {
  const pathname = usePathname();
  const prefersReducedMotion = usePrefersReducedMotion();
  const lenisRef = useRef<Lenis | null>(null);
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    // Accesibilidad: Si el usuario prefiere movimiento reducido, no activamos Lenis
    if (prefersReducedMotion) return;

    // Inicialización de Lenis (Configuración Pro Ajustada)
    // Nota: 'smoothWheel' suele estar activo por defecto.
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Easing exponencial suave
      orientation: "vertical", // 'direction' cambió a 'orientation' en v1+
      gestureOrientation: "vertical",
      
      // Configuración de "Peso" y Suavidad
      wheelMultiplier: 0.9, 
      lerp: 0.08, 
      
      // UX Pro: Touch nativo en móviles es mejor
      touchMultiplier: 2,
      infinite: false, // Aseguramos scroll finito estándar
    });

    lenisRef.current = lenis;

    // Loop de animación (RAF)
    const raf = (time: number) => {
      lenis.raf(time);
      rafIdRef.current = requestAnimationFrame(raf);
    };
    rafIdRef.current = requestAnimationFrame(raf);

    // Clases globales para CSS
    document.documentElement.classList.add("lenis", "lenis-smooth");

    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      lenis.destroy();
      lenisRef.current = null;
      document.documentElement.classList.remove("lenis", "lenis-smooth");
    };
  }, [prefersReducedMotion]);

  // Manejo de cambio de rutas (Next.js Behavior)
  useEffect(() => {
    if (!lenisRef.current) return;
    
    // Al cambiar de ruta, forzamos el scroll al inicio instantáneamente (comportamiento nativo)
    // lenisRef.current.scrollTo(0, { immediate: true }); 
    
    // Opcional: Solo resize si no quieres forzar scroll top
    // lenisRef.current.resize();
  }, [pathname]);

  return <>{children}</>;
}