// src/features/servicios/ui/index.tsx
"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import { Section, Container, Typography } from "@/ui";
import type { ServiciosUiProps } from "../content/servicios.mapper";
import { cn } from "@/utils/cn";
import { motion, type Variants } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

// === CONSTANTES DE ANIMACIÓN (FIXED) ===
// 'as const' soluciona el error de TypeScript convirtiéndolo en una Tupla de lectura [n,n,n,n]
const EASE_CINEMATIC = [0.22, 1, 0.36, 1] as const; 

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      // Stagger: coordina que los hijos aparezcan uno tras otro
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

// Nueva Animación: Blur + Fade + Slide Up
const blurSlideVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 30, // Desplazamiento vertical inicial
    filter: "blur(12px)", // Comienza borroso
    scale: 0.98 // Ligeramente más pequeño
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)", // Se vuelve nítido
    scale: 1,
    transition: {
      duration: 1.0,
      ease: EASE_CINEMATIC,
    },
  },
};

// === SUBCOMPONENTS ===

/**
 * Wrapper para aplicar el efecto BlurFade a cualquier texto
 */
const BlurFade = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <motion.div variants={blurSlideVariants} className={className}>
      {children}
    </motion.div>
  );
};

// === MAIN COMPONENT ===

export default function Servicios({
  titleLineA,
  titleLineB,
  aside,
  cards,
}: ServiciosUiProps) {
  const list = useMemo(() => (Array.isArray(cards) ? cards.slice(0, 2) : []), [cards]);

  return (
    <Section
      id="servicios"
      container="full"
      aria-labelledby="servicios-heading"
      className="bg-[color:var(--brand-blue-500)]"
    >
      <Container
        max="2xl"
        gutter="lg"
        className="pt-14 md:pt-20 lg:pt-24 pb-12 md:pb-20"
      >
        {/* === HEADER SECTION (Orquestador) === */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          variants={containerVariants}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12 lg:mb-18"
        >
          {/* Título */}
          <div className="max-w-2xl">
            <Typography.Heading
              as="h2"
              id="servicios-heading"
              className={cn(
                "text-[length:var(--text-h1)] leading-[var(--leading-h1)] tracking-[var(--tracking-h1)]",
                "font-medium text-[color:var(--surface-muted)] uppercase"
              )}
            >
              <BlurFade>
                {titleLineA}
                {titleLineB ? (
                  <>
                    <br className="hidden sm:block" />
                    {titleLineB}
                  </>
                ) : null}
              </BlurFade>
            </Typography.Heading>
          </div>

          {/* Aside / Descripción */}
          {aside && (
            <div className="lg:max-w-xs lg:text-right pb-2">
              <BlurFade>
                <Typography.Text
                  as="p"
                  className="text-[length:var(--text-body)] leading-relaxed text-[color:var(--surface-muted)]/80 uppercase tracking-wide"
                >
                  {aside}
                </Typography.Text>
              </BlurFade>
            </div>
          )}
        </motion.div>

        {/* === GRID DE TARJETAS === */}
        {/* Animamos el contenedor de la grilla para que las cards hereden el stagger si quisiéramos, 
            pero en este caso las animamos independientemente al entrar en view para mejor performance */}
        <div
          role="list"
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16"
        >
          {list.map((card, i) => (
            <ServicioCard key={card.key || i} card={card} index={i} />
          ))}
        </div>
      </Container>
    </Section>
  );
}

// === CARD COMPONENT (Con Hover Interaction + Entry Animation) ===

const cardHoverVariants = {
  rest: { x: 0 },
  hover: { x: 34 },
};

const arrowVariants = {
  rest: { opacity: 0, x: -10 },
  hover: { opacity: 1, x: 0 },
};

const imageVariants = {
  rest: { scale: 1 },
  hover: { scale: 1.05 },
};

function ServicioCard({ card, index }: { card: any; index: number }) {
  const titleId = `servicio-title-${card.key || index}`;

  return (
    <motion.article
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      animate="rest" // Estado base para las interacciones de hover
      viewport={{ once: true, margin: "-50px" }}
      variants={blurSlideVariants} // Usamos la misma animación de entrada (Blur+Slide)
      custom={index} // Podríamos usar esto para delay manual si fuera necesario
      className="group flex flex-col cursor-pointer"
      aria-labelledby={titleId}
    >
      {/* 1. IMAGEN */}
      <div className="relative w-full aspect-[16/10] overflow-hidden rounded-2xl md:rounded-2xl transform-gpu bg-neutral-800">
        
        {/* Overlay Hover */}
        <motion.div
          className="absolute inset-0 z-10 pointer-events-none bg-black/0"
          variants={{
            rest: { backgroundColor: "rgba(0,0,0,0)" },
            hover: { backgroundColor: "rgba(0,0,0,0.15)" },
          }}
          transition={{ duration: 0.6 }}
        />

        <motion.div
          className="relative w-full h-full will-change-transform"
          variants={imageVariants}
          transition={{ duration: 0.8, ease: EASE_CINEMATIC }}
        >
          <Image
            src={card.image}
            alt={card.alt ?? ""}
            fill
            sizes="(min-width:1280px) 800px, (min-width:1024px) 50vw, 100vw"
            priority={index === 0}
            className="object-cover"
          />
        </motion.div>
      </div>

      {/* 2. TEXTO */}
      <div className="mt-6 md:mt-8 pl-1">
        <p className="text-[length:var(--text-caption)] font-medium tracking-wider text-[color:var(--surface-muted)]/60 mb-2 uppercase">
          {card.label}
        </p>

        <div className="relative flex items-center overflow-visible">
          <motion.div
            className="flex items-center will-change-transform"
            variants={cardHoverVariants}
            transition={{ duration: 0.5, ease: EASE_CINEMATIC }}
          >
            {/* Flecha Animada */}
            <motion.div
              className="absolute -left-[34px] top-1/2 -translate-y-1/2 flex items-center justify-center"
              variants={arrowVariants}
              transition={{ duration: 0.4, ease: EASE_CINEMATIC, delay: 0.05 }}
            >
              <FiArrowRight className="w-6 h-6 md:w-7 md:h-7 text-white" />
            </motion.div>

            <Typography.Heading
              as="h3"
              id={titleId}
              className={cn(
                "text-[length:var(--text-h3)] leading-[var(--leading-h3)] font-semibold uppercase",
                "transition-colors duration-300",
                "text-[color:var(--surface-muted)] group-hover:text-white"
              )}
            >
              {card.title}
            </Typography.Heading>
          </motion.div>
        </div>
      </div>
    </motion.article>
  );
}