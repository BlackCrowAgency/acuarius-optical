// src/features/testimonios/ui/index.tsx
"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Section, Container, Typography } from "@/ui";
import type { TestimoniosProps } from "@/features/testimonios/content/testimonios.mapper";
import type React from "react";

/* ================= helpers ================= */
const EASE = [0.22, 1, 0.36, 1] as const;

const AVATARS = [
  "/images/avatares/personauno.png",
  "/images/avatares/personados.png",
  "/images/avatares/personatres.png",
];
const avatarByIndex = (i: number) => AVATARS[i % AVATARS.length];

const fadeSlide = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.35, ease: EASE } },
};

/* ================= UI atoms (sobrios) ================= */
function StarsText({ count }: { count: number }) {
  const n = Math.max(0, Math.min(5, Math.round(count)));
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-[var(--surface-muted)] px-3 py-1 text-sm text-[var(--neutral-600)]">
      <span className="leading-none text-[var(--brand-orange-500)]">
        {"★★★★★".slice(0, n)}
      </span>
      <span className="leading-none text-[var(--neutral-500)]/30">
        {"★★★★★".slice(0, 5 - n)}
      </span>
      <span className="leading-none">{n}.0</span>
    </span>
  );
}

/* ================= avatar rail ================= */
function AvatarRail({
  items,
  current,
  onSelect,
}: {
  items: TestimoniosProps["items"];
  current: number;
  onSelect: (i: number) => void;
}) {
  return (
    <div
      role="tablist"
      aria-label="Autores de testimonios"
      className="flex gap-4 overflow-x-auto pb-2 md:pb-0 md:flex-col md:overflow-visible [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      {items.map((t, i) => {
        const selected = i === current;
        return (
          <button
            key={`${t.authorName}-${i}`}
            role="tab"
            aria-selected={selected}
            aria-controls={`panel-testimonio-${i}`}
            onClick={() => onSelect(i)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") onSelect(i);
            }}
            className={[
              "group relative flex min-w-[240px] items-center gap-3 rounded-2xl border bg-[var(--surface-muted)] px-4 py-3 text-left md:min-w-0 md:w-full",
              selected
                ? "border-[var(--brand-blue-300)] ring-2 ring-[var(--brand-blue-500)]/35"
                : "border-[var(--neutral-200)] hover:border-[var(--brand-blue-300)]",
              "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface-muted)]",
            ].join(" ")}
          >
            <Image
              src={avatarByIndex(i)}
              alt={`Foto de ${t.authorName}`}
              width={44}
              height={44}
              className="size-11 rounded-full object-cover ring-2 ring-[var(--brand-blue-300)]/60"
            />
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-[var(--neutral-900)]">
                {t.authorName}
              </p>
              <p className="truncate text-xs text-[var(--neutral-500)]/70">
                {t.authorRole}
              </p>
            </div>
            <span
              aria-hidden
              className={[
                "ml-auto hidden rounded-full px-2 py-1 text-[10px] md:inline-block",
                selected
                  ? "bg-[var(--brand-blue-50)] text-[var(--brand-blue-700)]"
                  : "bg-[var(--surface-muted)] text-[var(--neutral-600)]",
              ].join(" ")}
            >
              {selected ? "Actual" : "Ver"}
            </span>
          </button>
        );
      })}
    </div>
  );
}

/* ================= spotlight ================= */
function Spotlight({
  t,
  idx,
}: {
  t: TestimoniosProps["items"][number];
  idx: number;
}) {
  return (
    <motion.article
      id={`panel-testimonio-${idx}`}
      role="tabpanel"
      variants={fadeSlide}
      initial="initial"
      animate="animate"
      exit="exit"
      className="relative w-full overflow-hidden rounded-3xl border border-[var(--neutral-200)] bg-[var(--neutral-50)] shadow-sm"
    >
      {/* acento lateral sobrio */}
      <div aria-hidden className="absolute inset-y-0 left-0 w-1.5 bg-[var(--brand-blue-300)]" />

      <div className="grid grid-rows-[auto_auto_1fr_auto] gap-6 md:gap-8 px-6 pb-7 pt-8 md:px-10 md:pt-12">
        <div className="flex items-center justify-between gap-4">
          <StarsText count={t.rating} />
          <span className="rounded-full bg-[var(--surface-muted)] px-3 py-1 text-xs text-[var(--neutral-600)]">
            Verificado
          </span>
        </div>

        <div className="relative">
          <Typography.Heading
            as="h3"
            level="h3"
            weight="normal"
            className="leading-tight text-pretty [color:var(--neutral-900)]"
          >
            {t.title}
          </Typography.Heading>
          <span
            aria-hidden
            className="pointer-events-none absolute -left-2 -top-6 select-none text-6xl font-serif leading-none text-[var(--neutral-500)]/15"
          >
            “
          </span>
        </div>

        <Typography.Text
          as="p"
          size="body"
          className="max-w-prose leading-relaxed [color:var(--neutral-600)]"
        >
          {t.text}
        </Typography.Text>

        <div className="mt-1 flex items-center gap-3">
          <Image
            src={avatarByIndex(idx)}
            alt={`Foto de ${t.authorName}`}
            width={56}
            height={56}
            className="size-14 rounded-full object-cover ring-2 ring-[var(--brand-blue-300)]/60"
          />
          <div className="min-w-0">
            <p className="truncate text-[var(--neutral-900)]">{t.authorName}</p>
            <p className="truncate text-sm text-[var(--neutral-500)]/70">
              {t.authorRole}
            </p>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

/* ================= main ================= */
export default function Testimonios({ title, subtitle, items }: TestimoniosProps) {
  const list = useMemo(() => (Array.isArray(items) ? items : []), [items]);
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();

  // autoplay con pausa al hover/focus
  const panelRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  useEffect(() => {
    if (reduce || list.length <= 1) return;
    const id = setInterval(() => {
      if (pausedRef.current) return;
      setIndex((i) => (i + 1) % list.length);
    }, 5600);
    return () => clearInterval(id);
  }, [list.length, reduce]);

  const onKeyTabs = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      setIndex((i) => (i + 1) % list.length);
    }
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      setIndex((i) => (i - 1 + list.length) % list.length);
    }
  };

  const total = list.length || 1;
  const avg =
    Math.round((list.reduce((a, b) => a + (b.rating ?? 0), 0) / total) * 10) /
    10;

  return (
    <Section
      id="testimonios"
      container="full"
      aria-labelledby="testimonios-title"
      className="relative bg-[var(--brand-surface)]"
    >
      <Container max="3xl" gutter="lg">
        {/* header */}
        <div className="mx-auto max-w-6xl text-center">
          <Typography.Heading
            as="h3"
            id="testimonios-title"
            level="h3"
            weight="normal"
            align="center"
            className="text-balance [color:var(--neutral-800)]"
          >
            {title}
          </Typography.Heading>

          <Typography.Text
            as="p"
            size="body"
            tone="muted"
            align="center"
            className="mx-auto mt-6 max-w-3xl leading-relaxed"
          >
            {subtitle}
          </Typography.Text>

          <Typography.Text
            as="p"
            size="caption"
            className="mt-4 text-[var(--neutral-600)]"
          >
            Promedio {avg}/5 — {list.length} reseña{list.length === 1 ? "" : "s"}
          </Typography.Text>
        </div>

        {/* layout: rail + spotlight */}
        <div className="mt-12 grid gap-10 md:grid-cols-3" onKeyDown={onKeyTabs}>
          <div className="md:col-span-1">
            <AvatarRail items={list as any} current={index} onSelect={setIndex} />
          </div>

          <div
            ref={panelRef}
            className="md:col-span-2"
            onMouseEnter={() => (pausedRef.current = true)}
            onMouseLeave={() => (pausedRef.current = false)}
            onFocus={() => (pausedRef.current = true)}
            onBlur={() => (pausedRef.current = false)}
          >
            <AnimatePresence mode="wait">
              {list.length > 0 && (
                <Spotlight
                  key={`${list[index]?.authorName}-${index}`}
                  t={list[index]}
                  idx={index}
                />
              )}
            </AnimatePresence>


          </div>
        </div>
      </Container>
    </Section>
  );
}
