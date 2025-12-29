// src/features/clientes/ui/index.tsx
"use client";

import { memo, useMemo } from "react";
import type { ClientesUiProps } from "@/features/clientes/content/clientes.mapper";
import { Section, Container, Typography } from "@/ui";
import { cn } from "@/utils/cn";
import { motion, type Variants } from "framer-motion";

// --- ANIMATION VARIANTS (Clean Fade Up - No Blur) ---

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Retraso entre cada elemento hijo
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 24 // Desplazamiento limpio desde abajo
  },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.6, 
      ease: [0.21, 0.47, 0.32, 0.98] // Curva suave "Ease Out"
    } 
  },
};

// --- MAIN COMPONENT ---

export default function Clientes({ title, subtitle, logos }: ClientesUiProps) {
  // Optimizamos el filtrado para evitar cálculos en cada render
  const safeLogos = useMemo(() => 
    Array.isArray(logos) && logos.length > 0
      ? logos.filter((item) => Boolean(item?.src))
      : [], 
  [logos]);

  const headingTitle = (title ?? "").trim() || "Trusted by leading teams";
  const headingSubtitle = (subtitle ?? "").trim() || "Socios que confían en nuestra visión";

  return (
    <Section
      id="clientes"
      container="full"
      aria-labelledby="clientes-heading"
      className="bg-[color:var(--brand-blue-25)] overflow-hidden" // Overflow hidden previene scrollbars durante animación
    >
      <Container max="3xl" gutter="lg" className="py-16 md:py-20 lg:py-24">
        
        {/* Contenedor principal de animación */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }} // Se activa una sola vez al entrar 10% en pantalla
          variants={containerVariants}
        >
          {/* ======= Título H2 ======= */}
          <div className="mx-auto text-center mb-10 md:mb-12 lg:mb-18">
            <Typography.Heading
              as="h2"
              id="clientes-heading"
              className={cn(
                "font-semibold",
                "text-center",
                "text-[length:var(--text-h2)]",
                "leading-[var(--leading-h2)]",
                "tracking-[var(--tracking-h2)]",
                "text-[color:var(--neutral-900)]"
              )}
            >
              <motion.span variants={itemVariants} className="block">
                {headingTitle}
              </motion.span>
              <motion.span variants={itemVariants} className="block mt-2">
                {headingSubtitle}
              </motion.span>
            </Typography.Heading>
          </div>

          {/* ======= Fila de logos ======= */}
          {safeLogos.length > 0 && (
            <motion.ul
              role="list"
              aria-label={headingTitle}
              variants={containerVariants} // Hereda el stagger del padre o reinicia uno nuevo
              className={cn(
                "mx-auto grid max-w-6xl w-full",
                "grid-cols-2 md:grid-cols-5",
                "gap-4 md:gap-6 lg:gap-8"
              )}
            >
              {safeLogos.map((logo) => (
                <motion.li 
                  key={logo.name} 
                  variants={itemVariants} // Animación individual
                  className="w-full"
                >
                  <LogoCard name={logo.name} src={logo.src} />
                </motion.li>
              ))}
            </motion.ul>
          )}
        </motion.div>
      </Container>
    </Section>
  );
}

/* ============================== Card de logo (Optimized) ============================== */

// Memoizamos el componente para evitar re-renders si el padre cambia por otras razones
const LogoCard = memo(function LogoCard({ name, src }: { name: string; src: string }) {
  return (
    <div
      className={cn(
        "flex items-center justify-center",
        "w-full",
        "h-28 md:h-28", // todas las tarjetas misma altura
        "rounded-2xl",
        "bg-[color:var(--brand-blue-50)]",
        "transition-transform duration-300 hover:scale-[1.02]" // Pequeño detalle de interacción extra
      )}
    >
      {/* Nota: Mantenemos <img> para compatibilidad total con el diseño original. 
        Si tienes configurado next/image con dominios externos, podrías cambiarlo a <Image />.
      */}
      <img
        src={src}
        alt={name}
        loading="lazy"
        decoding="async"
        className={cn(
          "max-h-10 sm:max-h-12 lg:max-h-12",
          "w-auto object-contain",
          "mix-blend-multiply" // Truco opcional para integrar mejor logos con fondo blanco si el contenedor es azul claro
        )}
      />
    </div>
  );
});