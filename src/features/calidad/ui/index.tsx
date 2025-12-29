// src/features/calidad/ui/index.tsx
"use client";

import { memo, useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { Section, Container, Typography } from "@/ui";
import { cn } from "@/utils/cn";
import type { CalidadUiProps } from "@/features/calidad/content/calidad.mapper";

// --- Animation Config ---

// Contenedor que orquesta el retraso entre palabras
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08, // Retraso entre cada palabra
      delayChildren: 0.1,
    },
  },
};

// Animación individual de cada palabra (Blur + Slide Up)
const wordVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 20, 
    filter: "blur(4px)" 
  },
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: "blur(0px)",
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 100,
    },
  },
};

// --- Helper Components ---

// Divide el texto en spans animados preservando espacios
const WordSplitter = memo(({ text, className }: { text: string; className?: string }) => {
  if (!text) return null;
  return (
    <>
      {text.split(" ").map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          variants={wordVariants}
          className={cn("inline-block mr-[0.25em] will-change-transform", className)}
        >
          {word}
        </motion.span>
      ))}
    </>
  );
});

WordSplitter.displayName = "WordSplitter";

// --- Main Component ---

export default function Calidad({ title, items }: CalidadUiProps) {
  // Memorizamos la lista y el título para evitar recálculos innecesarios
  const list = useMemo(() => (Array.isArray(items) ? items.slice(0, 4) : []), [items]);
  
  const { lineA, lineB } = useMemo(() => {
    const [a = "", b = ""] = String(title ?? "").split("\n");
    return { lineA: a, lineB: b };
  }, [title]);

  return (
    <Section
      id="calidad"
      container="full"
      spacing="none"
      aria-labelledby="calidad-heading"
      className="bg-[var(--brand-surface)] overflow-x-hidden"
    >
      {/* 1. Encabezado Animado */}
      <Container
        max="3xl"
        gutter="lg"
        className="pt-14 md:pt-18 lg:pt-20 pb-10 md:pb-12 lg:pb-16"
      >
        <Typography.Heading
          as="h2"
          id="calidad-heading"
          className={cn(
            "text-[length:var(--text-h2)] leading-[var(--leading-h2)] tracking-[var(--tracking-h2)]",
            "font-semibold text-[var(--brand-text)] text-balance"
          )}
        >
          <motion.span
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
            variants={containerVariants}
            className="block" // Asegura que el contenedor tome el ancho disponible
          >
            {/* Línea 1 */}
            <span className="block">
              <WordSplitter text={lineA} />
            </span>

            {/* Línea 2 (si existe) */}
            {lineB && (
              <span className="block mt-1 sm:mt-0"> {/* Wrapper para la segunda línea */}
                <WordSplitter text={lineB} />
              </span>
            )}
          </motion.span>
        </Typography.Heading>
      </Container>

      {/* 2. GRID FULL-BLEED */}
      <div className="relative left-1/2 -translate-x-1/2 w-screen max-w-[100vw] border-t border-b border-[var(--neutral-200)] bg-[var(--neutral-200)]">
        {/* Container opcional para pantallas gigantes */}
        <div className="mx-auto max-w-[1920px]"> 
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[1px]">
            {list.map((it, i) => (
              <div
                role="listitem"
                key={`${it.icon}-${i}`}
                className="bg-[var(--brand-surface)] p-8 sm:p-10 lg:p-10 flex flex-col min-h-[300px]"
              >
                {/* Icono */}
                <div className="mb-8 md:mb-26">
                  <div className="relative h-14 w-14 md:h-16 md:w-16">
                    <Image
                      src={it.icon}
                      alt=""
                      fill
                      className={cn(
                        "object-contain",
                        // Filtro CSS para colorear el SVG (Negro -> Naranja marca)
                        "[filter:brightness(0)_saturate(100%)_invert(15%)_sepia(17%)_saturate(30%)_hue-rotate(3deg)_brightness(101%)_contrast(80%)]"
                      )}
                      priority={i === 0}
                    />
                  </div>
                </div>

                {/* Título del item */}
                <Typography.Heading
                  as="h5"
                  className="text-[length:var(--text-h5)] leading-[var(--leading-h5)] text-[var(--brand-text)] font-semibold"
                >
                  {it.title}
                </Typography.Heading>

                {/* Descripción del item */}
                <Typography.Text className="mt-2 text-[length:var(--text-body)] leading-[var(--leading-body-lg)] text-[color:var(--brand-text)]/80">
                  {it.description}
                </Typography.Text>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}