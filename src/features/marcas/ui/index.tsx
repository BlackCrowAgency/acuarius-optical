// src/features/marcas/ui/index.tsx
"use client";

import { useMemo } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import type { MarcasUiProps } from "@/features/marcas/content/marcas.mapper";
import { Section, Typography, Button } from "@/ui";
import { cn } from "@/utils/cn";

export default function Marcas({ logos }: MarcasUiProps) {
  const reduced = (useReducedMotion() ?? false) as boolean;

  const items = Array.isArray(logos) ? logos : [];
  const loop = useMemo(() => [...items, ...items, ...items], [items]);
  const DURATION = 35;

  return (
    <Section
      id="marcas"
      container="full"
      aria-labelledby="marcas-heading"
      className={cn(
        "bg-[color:var(--brand-orange-500)]",
        "!py-0 !pt-0 !pb-0",
        "mb-14 md:mb-20 lg:mb-0"
      )}
    >
      <div className="w-full !m-0 !p-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 h-[640px]">
          {/* ================= IZQUIERDA · IMAGEN ================= */}
          <div className="relative h-full w-full overflow-hidden">
            <Image
              src="/images/SeccionMarcas.png"
              alt="Equipos oftalmológicos"
              fill
              priority
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />

            {/* ===== Carrusel mejorado (glass + logos blancos) ===== */}
            <div className="absolute inset-x-0 bottom-6 px-6">
              {/* fade en bordes */}
              <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]">
                <motion.ul
                  role="list"
                  aria-label="Marcas"
                  className="flex gap-4 will-change-transform"
                  animate={reduced ? undefined : { x: ["0%", "-33.33%"] }}
                  transition={
                    reduced
                      ? undefined
                      : { duration: DURATION, ease: "linear", repeat: Infinity }
                  }
                >
                  {loop.map((logo, i) => (
                    <li
                      key={`${logo.name}-${i}`}
                      className={cn(
                        "group flex-shrink-0 h-[72px] w-[150px] sm:w-[165px]",
                        "rounded-2xl",
                        "relative overflow-hidden",
                        "flex items-center justify-center"
                      )}
                    >
                      {/* glass base */}
                      <span
                        aria-hidden="true"
                        className={cn(
                          "absolute inset-0",
                          "bg-white/10 backdrop-blur-xl",
                          "ring-1 ring-white/25",
                          "shadow-[0_14px_40px_rgba(0,0,0,0.18)]"
                        )}
                      />
                      {/* highlight diagonal */}
                      <span
                        aria-hidden="true"
                        className={cn(
                          "absolute -inset-10 rotate-12",
                          "bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.18),transparent)]",
                          "opacity-70"
                        )}
                      />
                      {/* hover: un poco más de brillo */}
                      <span
                        aria-hidden="true"
                        className={cn(
                          "absolute inset-0",
                          "opacity-0 transition-opacity duration-300",
                          "bg-white/15 group-hover:opacity-100"
                        )}
                      />

                      <img
                        src={logo.src}
                        alt={logo.name}
                        loading="lazy"
                        decoding="async"
                        className={cn(
                          "relative z-10",
                          "max-h-[104px] w-auto object-contain",
                          "opacity-95",
                          // ✅ convierte a blanco (alto contraste) sin editar SVG
                          "brightness-0 invert",
                          // micro ajuste pro
                          "contrast-125",
                          "transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                        )}
                      />
                    </li>
                  ))}
                </motion.ul>
              </div>
            </div>
          </div>

          {/* ================= DERECHA · TEXTO ================= */}
          <div className="h-full w-full bg-[color:var(--brand-orange-500)]">
            <div className="h-full w-full px-10 sm:px-12 lg:px-10 pt-14 pb-14 flex flex-col">
              <Typography.Heading
                as="h2"
                id="marcas-heading"
                className={cn(
                  "text-[length:var(--text-h2)] leading-[var(--leading-h2)] tracking-[var(--tracking-h2)]",
                  "font-medium text-[color:var(--text-on-colored)]"
                )}
              >
                <span className="block">Marcas que</span>
                <span className="block">definen el</span>
                <span className="block">Estándar mundial.</span>
              </Typography.Heading>

              <div className="mt-auto">
                <Typography.Heading
                  as="h3"
                  className={cn(
                    "max-w-md",
                    "text-[length:var(--text-h4)] leading-[var(--leading-h4)]",
                    "font-normal text-[color:var(--text-on-colored)]/90"
                  )}
                >
                  Trabajamos junto a los líderes internacionales en tecnología
                  oftalmológica.
                </Typography.Heading>

                <div className="mt-8">
                  <Button
                    variant="ghost"
                    className={cn(
                      "rounded-full",
                      "bg-neutral-900/80 hover:bg-neutral-900",
                      "text-[color:var(--text-on-colored)]",
                      "px-6"
                    )}
                  >
                    Ver Equipos
                  </Button>
                </div>
              </div>
            </div>
          </div>
          {/* ===================================================== */}
        </div>
      </div>
    </Section>
  );
}
