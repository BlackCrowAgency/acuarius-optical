// src/features/trayectoria/ui/index.tsx
"use client";

import { memo, useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Variants, Transition } from "framer-motion"; // Importamos Transition para tipado estricto
import { Section, Container, Typography } from "@/ui";
import { cn } from "@/utils/cn";
import type { TrayectoriaUiProps } from "@/features/trayectoria/content/trayectoria.mapper";

// --- Helpers & Types ---

type EyebrowParsed = {
  logoSrc: string;
  line1: string;
  line2: string;
};

function parseEyebrow(eyebrow: TrayectoriaUiProps["eyebrow"]): EyebrowParsed {
  const raw = eyebrow as any;
  const logoSrc = (raw?.logo && typeof raw.logo === "string") 
    ? raw.logo 
    : "/logos/Logovol1.svg";

  let line1 = "";
  let line2 = "";

  if (raw && typeof raw === "object" && Array.isArray(raw.lines)) {
    line1 = raw.lines[0] ?? "";
    line2 = raw.lines[1] ?? "";
  } else if (typeof raw === "string") {
    line1 = raw;
  }

  return { logoSrc, line1, line2 };
}

// --- Animation Configuration ---

// El contenedor orquesta a los hijos (palabras)
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08, // Velocidad del efecto escalonado
      delayChildren: 0.1,
    },
  },
};

// Cada palabra hace esto
const wordVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 20, // Empieza abajo
    filter: "blur(4px)", // Ligeramente borroso
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

// Corrección del error de TypeScript en la transición
const marqueeTransition: Transition = {
  ease: "linear",
  duration: 30,
  repeat: Infinity,
};

// --- Subcomponents ---

// Helper para dividir texto en palabras animables
const WordSplitter = ({ text, className }: { text: string; className?: string }) => {
  if (!text) return null;
  return text.split(" ").map((word, i) => (
    <motion.span
      key={`${word}-${i}`}
      variants={wordVariants}
      className={cn("inline-block mr-[0.25em]", className)} // mr-[0.25em] simula el espacio real
    >
      {word}
    </motion.span>
  ));
};

type CardItem = NonNullable<TrayectoriaUiProps["cards"]>[number];

const MobileCard = memo(function MobileCard({ card }: { card: CardItem }) {
  return (
    <article
      className={cn(
        "relative shrink-0 overflow-hidden bg-neutral-900",
        "mr-2",
        "w-[75vw] sm:w-[50vw] md:w-[40vw]",
        "aspect-[3/4] rounded-[12px]"
      )}
    >
      <Image
        src={card.image}
        alt={card.alt ?? ""}
        fill
        sizes="(max-width: 768px) 75vw, 40vw"
        className="object-cover z-0 brightness-[0.8] contrast-[1.1]"
        loading="lazy"
      />
      <div
        aria-hidden
        className="absolute inset-0 z-[1] bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none"
      />
      <div className="absolute inset-0 z-[2] flex flex-col justify-between p-6 sm:p-8">
        <div className="mt-2">
          {(card.statValue || card.statLabel) && (
            <div className="flex flex-col border-l-[4px] border-[var(--brand-orange-500)] pl-4 py-1">
              {card.statValue && (
                <span className="block text-5xl sm:text-6xl font-bold text-white tracking-tighter leading-[0.9] mb-1">
                  {card.statValue}
                </span>
              )}
              {card.statLabel && (
                <span className="block text-lg text-white/90 font-medium leading-tight max-w-[15ch]">
                  {card.statLabel}
                </span>
              )}
            </div>
          )}
        </div>
        {card.footnote && (
          <div className="mb-1">
            <p className="text-[1rem] sm:text-[1.1rem] text-white/95 font-medium leading-snug text-balance">
              {card.footnote}
            </p>
          </div>
        )}
      </div>
    </article>
  );
});

const DesktopCard = memo(function DesktopCard({
  card,
  isFirst,
  index,
}: {
  card: CardItem;
  isFirst: boolean;
  index: number;
}) {
  return (
    <article
      key={`${card.image}-${index}`}
      className={cn(
        "group/card relative overflow-hidden rounded-3xl md:rounded-[24px] lg:rounded-[10px]",
        "bg-neutral-900",
        "transition-[flex-basis] duration-500 ease-in-out",
        isFirst ? "lg:basis-[45%]" : "lg:basis-[18.3%]",
        "basis-full md:basis-1/2",
        "lg:hover:basis-[45%]",
        "lg:group-hover/rail:basis-[18.3%]",
        "lg:group-hover/rail:hover:basis-[45%]"
      )}
    >
      <Image
        src={card.image}
        alt={card.alt ?? ""}
        fill
        sizes="(min-width: 1024px) 45vw, 25vw"
        className="object-cover z-0 brightness-[0.85] contrast-[1.15] saturate-[1.1] transition-transform duration-700 group-hover/card:scale-105"
        priority={isFirst}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(to_bottom,rgb(0_0_0/0.1)_0%,rgb(0_0_0/0.4)_50%,rgb(0_0_0/0.85)_100%)]"
      />
      <div
        className={cn(
          "absolute inset-0 z-[2] flex flex-col justify-between p-8 md:p-10",
          "transition-opacity duration-500",
          isFirst
            ? "opacity-100 group-hover/rail:opacity-0 group-hover/card:!opacity-100"
            : "opacity-0 group-hover/card:opacity-100"
        )}
      >
        {(card.statValue || card.statLabel) && (
          <div className="w-full">
            <div className="flex items-stretch border-b border-white/40 pb-5">
              {card.statValue && (
                <div className="pr-6 border-r border-white/40 flex items-center">
                  <span className="text-[clamp(2.5rem,2rem+3vw,4rem)] font-bold text-white leading-none tracking-tight">
                    {card.statValue}
                  </span>
                </div>
              )}
              {card.statLabel && (
                <div className="pl-6 flex items-center">
                  <span className="text-[length:var(--text-lead)] leading-tight text-white/90 font-medium max-w-[15ch]">
                    {card.statLabel}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
        {card.footnote && (
          <div className="max-w-[90%]">
            <p className="text-[length:var(--text-body-lg)] leading-relaxed text-white/95 font-medium text-balance drop-shadow-md">
              {card.footnote}
            </p>
          </div>
        )}
      </div>
    </article>
  );
});

// --- Main Component ---

export default function Trayectoria(props: TrayectoriaUiProps) {
  const { eyebrow, titleBefore, titleHighlight, titleAfter, cards } = props;

  const items = useMemo(() => {
    const safe = Array.isArray(cards) ? cards : [];
    return safe.slice(0, 4);
  }, [cards]);

  const infiniteItems = useMemo(() => {
    if (!items.length) return [];
    return [...items, ...items, ...items];
  }, [items]);

  const { logoSrc, line1, line2 } = useMemo(() => parseEyebrow(eyebrow), [eyebrow]);

  const marqueeAnimate = useMemo(() => ({ x: ["0%", "-33.333%"] }), []);

  return (
    <Section
      id="trayectoria"
      container="full"
      className="bg-[var(--brand-surface)] overflow-hidden"
    >
      <Container max="3xl" gutter="lg" className="py-0 md:py-18 lg:py-0">
        
        {/* === Header === */}
        <div className="mb-8 md:mb-10 lg:mb-14 flex items-center gap-4">
          <Image
            src={logoSrc}
            alt=""
            width={64}
            height={64}
            className="size-9 md:size-10 lg:size-[48px]"
            priority
          />
          <div className="leading-tight font-semibold">
            {line1 && (
              <span className="block eyebrow text-[color:var(--brand-text)]/100">
                {line1}
              </span>
            )}
            {line2 && (
              <span className="block eyebrow text-[color:var(--brand-text)]/100">
                {line2}
              </span>
            )}
          </div>
        </div>

        {/* === STAGGERED ANIMATED TITLE (Fixed) === */}
        <Typography.Heading
          as="h2" // Mantenemos el componente original sin props de motion
          className={cn(
            "font-heading text-[length:var(--text-h1)] leading-[var(--leading-h1)] tracking-[var(--tracking-h1)]",
            "text-[var(--brand-text)] text-balance max-w-[28ch]",
            "mb-10 md:mb-12 lg:mb-32"
          )}
        >
          {/* Envolvemos el CONTENIDO en motion.span para activar la animación escalonada */}
          <motion.span
            className="inline-block w-full"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
            variants={containerVariants}
          >
            {titleBefore && <WordSplitter text={titleBefore} />}
            
            {titleHighlight && (
              <span className="text-[var(--brand-highlight,inherit)]">
                <WordSplitter text={titleHighlight} />
              </span>
            )}
            
            {titleAfter && <WordSplitter text={titleAfter} />}
          </motion.span>
        </Typography.Heading>

        {/* ========================================================= */}
        {/* === VERSION MOBILE / TABLET === */}
        {/* ========================================================= */}
        <div className="lg:hidden relative w-screen left-1/2 -translate-x-1/2">
          <motion.div
            className="flex w-max will-change-transform"
            animate={marqueeAnimate}
            transition={marqueeTransition} // Usamos la transición tipada correctamente
          >
            {infiniteItems.map((card, index) => (
              <MobileCard key={`mobile-infinite-${index}`} card={card} />
            ))}
          </motion.div>
        </div>

        {/* ========================================================= */}
        {/* === VERSION DESKTOP === */}
        {/* ========================================================= */}
        <div
          className={cn(
            "group/rail hidden lg:flex w-full gap-6 md:gap-7 lg:gap-8",
            "min-h-[420px] md:min-h-[500px] lg:min-h-[620px]"
          )}
        >
          {items.map((card, index) => (
            <DesktopCard
              key={`${card.image}-${index}`}
              card={card}
              index={index}
              isFirst={index === 0}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}