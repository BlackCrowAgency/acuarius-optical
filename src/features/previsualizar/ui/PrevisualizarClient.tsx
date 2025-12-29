// src/features/previsualizar/ui/PrevisualizarClient.tsx
"use client";

import type React from "react";
import { useCallback, useMemo, useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Section, Container, Typography } from "@/ui";
import { cn } from "@/utils/cn";
import { FiArrowUpRight } from "react-icons/fi";
import { CatalogCard } from "@/features/catalog/ui/CatalogCard";
import type { CatalogPreviewItem } from "@/content/catalog";
import type { PrevisualizarTab } from "@/features/previsualizar/content/previsualizar.mapper";

// --- TYPES & CONSTANTS ---

type TabWithItems = PrevisualizarTab & { items: CatalogPreviewItem[] };

type Props = {
  title: string;
  tabs: TabWithItems[];
  cta?: { label?: string; href?: string };
};

const BRAND_LOGOS: Record<string, string> = {
  Tomey: "/logos/marcas/Tomey.svg",
  Takagi: "/logos/marcas/Takagi.svg",
  Huvitz: "/logos/marcas/Huvitz.svg",
  Mediworks: "/logos/marcas/Mediworks.svg",
  Visionix: "/logos/marcas/Visonix.svg",
  Unicos: "/logos/marcas/Unicos.svg",
  Briot: "/logos/marcas/Briot.svg",
};

const FALLBACK_BRANDS = [
  "Tomey", "Takagi", "Huvitz", "Mediworks", "Unicos", "Visionix", "Briot"
] as const;

const TAB_KEYS = ["ArrowUp", "ArrowDown", "Home", "End"] as const;

// --- ANIMATION VARIANTS (Clean Scale + Fade Up) ---

const gridMotion: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Secuencia en cascada
      delayChildren: 0.05,
    },
  },
  exit: { 
    opacity: 0, 
    transition: { duration: 0.2 } 
  },
};

const itemMotion: Variants = {
  hidden: { 
    opacity: 0, 
    y: 20, 
    scale: 0.95 
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { 
      type: "spring", 
      stiffness: 100, 
      damping: 15,
      mass: 0.8
    },
  },
  exit: { 
    opacity: 0, 
    scale: 0.95, 
    transition: { duration: 0.15 } 
  },
};

// --- UTILS ---

const brandLogoOf = (i: CatalogPreviewItem, index: number) =>
  (i.brand && BRAND_LOGOS[i.brand]) ||
  BRAND_LOGOS[FALLBACK_BRANDS[index % FALLBACK_BRANDS.length]];

const categoryPathFromCategoryKey = (categoryKey: string) => {
  const k = String(categoryKey || "").toLowerCase();
  if (k === "equipos-oftalmologicos") return "equipos-oftalmologicos";
  if (k === "biseladoras") return "biseladoras";
  return k;
};

const buildHref = (categoryKey: string, item: CatalogPreviewItem) => {
  const slug = item.slug;
  if (!slug) return "#";
  return `/${categoryPathFromCategoryKey(categoryKey)}/${slug}`;
};

const PANEL_ID = (k: string) => `previsualizar-panel-${k}`;

// --- MAIN COMPONENT ---

export default function PrevisualizarClient({ title, tabs, cta }: Props) {
  const safeTabs = useMemo(() => (Array.isArray(tabs) ? tabs : []), [tabs]);
  const firstKey = safeTabs[0]?.key ?? "";

  const [active, setActive] = useState(firstKey);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Memorizamos current tab
  const current = useMemo(
    () => safeTabs.find((t) => t.key === active) ?? 
          ({ key: firstKey, label: "", categoryKey: "", items: [] } as TabWithItems),
    [active, safeTabs, firstKey]
  );

  const items = useMemo(() => current.items?.slice?.(0, 3) ?? [], [current.items]);

  const [titleLineA = "", titleLineBRaw = ""] = String(title ?? "").split(",");
  const titleLineB = titleLineBRaw.trimStart();

  const ctaHref = useMemo(() => {
    const base = `/${categoryPathFromCategoryKey(String(current.categoryKey))}`;
    return cta?.href || base;
  }, [cta?.href, current.categoryKey]);

  const activeLabel = useMemo(
    () => safeTabs.find((t) => t.key === active)?.label ?? current.label ?? "",
    [active, current.label, safeTabs]
  );

  // Keyboard navigation for tabs
  const onKeys = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (!TAB_KEYS.includes(e.key as (typeof TAB_KEYS)[number])) return;
      e.preventDefault();

      const n = safeTabs.length || 1;
      const idx = Math.max(0, safeTabs.findIndex((t) => t.key === active));

      if (e.key === "Home") return setActive(safeTabs[0]?.key ?? "");
      if (e.key === "End") return setActive(safeTabs[n - 1]?.key ?? "");

      const dir = e.key === "ArrowDown" ? 1 : -1;
      setActive(safeTabs[(idx + dir + n) % n]?.key ?? "");
    },
    [active, safeTabs]
  );

  const closeMobile = useCallback(() => setMobileOpen(false), []);
  const selectTab = useCallback((k: string) => {
    setActive(k);
    setMobileOpen(false);
  }, []);

  return (
    <Section
      id="previsualizar"
      container="full"
      className="bg-[var(--brand-surface)] overflow-hidden"
    >
      <Container max="2xl" gutter="lg" className="py-0 md:py-20">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[420px_1fr] lg:gap-44">
          {/* ===================== LEFT: Heading & Tabs ===================== */}
          <div className="flex flex-col">
            <Typography.Heading
              as="h1"
              level="h2"
              weight="semibold"
              className={cn("[color:var(--neutral-900)]", "text-balance")}
            >
              {titleLineA}
              {titleLineB && (
                <>
                  ,<br />
                  {titleLineB}
                </>
              )}
            </Typography.Heading>

            {safeTabs.length > 0 && (
              <div className="mt-14" onKeyDown={onKeys}>
                {/* --- MOBILE SELECTOR --- */}
                <div className="md:hidden">
                  <button
                    type="button"
                    aria-haspopup="listbox"
                    aria-expanded={mobileOpen}
                    onClick={() => setMobileOpen(true)}
                    className={cn(
                      "w-full rounded-2xl px-5 py-4",
                      "bg-[var(--neutral-200)]",
                      "[color:var(--neutral-900)]",
                      "outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]"
                    )}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="min-w-0 text-left">
                        <div className="text-body-xs [color:var(--neutral-900)]/70">
                          Categoría
                        </div>
                        <div className="text-body-md font-semibold truncate">
                          {activeLabel}
                        </div>
                      </div>

                      <span
                        aria-hidden="true"
                        className={cn(
                          "grid h-10 w-10 place-items-center rounded-full",
                          "bg-white/90",
                          "[color:var(--neutral-900)]"
                        )}
                      >
                        <span className="block h-2 w-2 rotate-45 border-b-2 border-r-2 border-current" />
                      </span>
                    </div>
                  </button>

                  <AnimatePresence>
                    {mobileOpen && (
                      <>
                        <motion.button
                          type="button"
                          aria-label="Cerrar selector"
                          onClick={closeMobile}
                          className="fixed inset-0 z-40 cursor-default bg-black/30"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        />

                        <motion.div
                          role="listbox"
                          aria-label="Categorías de equipos"
                          className={cn(
                            "fixed left-0 right-0 bottom-0 z-50",
                            "rounded-t-3xl",
                            "bg-[var(--brand-surface)]",
                            "shadow-[0_-20px_60px_rgba(0,0,0,0.18)]",
                            "overflow-hidden"
                          )}
                          initial={{ y: "100%" }}
                          animate={{
                            y: 0,
                            transition: { type: "spring", stiffness: 140, damping: 20 },
                          }}
                          exit={{ y: "100%", transition: { duration: 0.2 } }}
                        >
                          <div className="px-5 pt-5 pb-3">
                            <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-black/10" />
                            <div className="flex items-center justify-between gap-3">
                              <div className="text-body-md font-semibold [color:var(--neutral-900)]">
                                Elige una categoría
                              </div>
                              <button
                                type="button"
                                onClick={closeMobile}
                                className={cn(
                                  "rounded-full px-4 py-2",
                                  "bg-[var(--neutral-200)]",
                                  "text-body-sm font-medium",
                                  "[color:var(--neutral-900)]"
                                )}
                              >
                                Cerrar
                              </button>
                            </div>
                          </div>

                          <div className="px-5 pb-6">
                            <div className="flex flex-col gap-2">
                              {safeTabs.map((t) => {
                                const isActive = t.key === active;
                                return (
                                  <button
                                    key={t.key}
                                    type="button"
                                    role="option"
                                    aria-selected={isActive}
                                    onClick={() => selectTab(t.key)}
                                    className={cn(
                                      "w-full rounded-2xl px-4 py-4 text-left",
                                      isActive
                                        ? "bg-[var(--brand-blue-500)] text-[color:var(--text-on-colored)]"
                                        : "bg-[var(--neutral-200)] [color:var(--neutral-900)]"
                                    )}
                                  >
                                    <div className="flex items-center justify-between gap-4">
                                      <div className="min-w-0">
                                        <div className="text-body-md font-semibold truncate">
                                          {t.label}
                                        </div>
                                        <div
                                          className={cn(
                                            "text-body-xs mt-1",
                                            isActive
                                              ? "text-[color:var(--text-on-colored)]/80"
                                              : "[color:var(--neutral-900)]/70"
                                          )}
                                        >
                                          Ver previsualización
                                        </div>
                                      </div>
                                      <span
                                        aria-hidden="true"
                                        className={cn(
                                          "grid h-10 w-10 place-items-center rounded-full",
                                          isActive ? "bg-white/95 text-[color:var(--brand-orange-500)]" : "bg-white/80 [color:var(--neutral-900)]"
                                        )}
                                      >
                                        <FiArrowUpRight className="text-[18px]" />
                                      </span>
                                    </div>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>

                {/* --- DESKTOP TABS --- */}
                <div
                  role="tablist"
                  aria-label="Categorías de equipos"
                  className="hidden md:flex flex-col gap-6"
                >
                  {safeTabs.map((t) => {
                    const isActive = t.key === active;
                    if (isActive) {
                      return (
                        <button
                          key={t.key}
                          type="button"
                          role="tab"
                          aria-selected="true"
                          aria-controls={PANEL_ID(t.key)}
                          onClick={() => setActive(t.key)}
                          className={cn(
                            "group relative w-full max-w-[520px]",
                            "bg-[color:var(--brand-blue-500)]",
                            "text-[color:var(--text-on-colored)]",
                            "rounded-full px-7 py-3",
                            "shadow-[0_18px_40px_rgba(11,116,199,0.25)]",
                            "outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]"
                          )}
                        >
                          <div className="flex items-center justify-between gap-4">
                            <span className="text-body-lg font-medium">{t.label}</span>
                            <span
                              aria-hidden="true"
                              className={cn(
                                "grid h-10 w-10 place-items-center rounded-full",
                                "bg-white/95",
                                "text-[color:var(--brand-orange-500)]",
                                "transition-transform duration-200 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]"
                              )}
                            >
                              <FiArrowUpRight className="text-[18px]" />
                            </span>
                          </div>
                        </button>
                      );
                    }
                    return (
                      <button
                        key={t.key}
                        type="button"
                        role="tab"
                        aria-selected="false"
                        aria-controls={PANEL_ID(t.key)}
                        onClick={() => setActive(t.key)}
                        className={cn(
                          "w-fit text-left",
                          "text-body-md font-medium",
                          "[color:var(--neutral-900)]/85 hover:[color:var(--neutral-900)]",
                          "outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]"
                        )}
                      >
                        {t.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* ===================== RIGHT: Grid Content ===================== */}
          <div
            id={PANEL_ID(current.key)}
            role="tabpanel"
            aria-labelledby={current.key}
            className="min-w-0"
          >
            {/* CORRECCIÓN CLAVE:
                Usamos whileInView para la animación de entrada por scroll.
                Usamos key para la animación de cambio de tab.
                Esto asegura que la animación funcione en ambos casos.
            */}
            <AnimatePresence mode="wait">
              <motion.div
                key={current.key}
                initial="hidden"
                whileInView="show" // Activa la animación al hacer scroll
                viewport={{ once: true, margin: "-100px" }} // Evita que se repita molestamente al scrollear
                exit="exit"
                variants={gridMotion}
                className={cn(
                  "grid grid-cols-1 gap-6",
                  "md:grid-cols-2 md:gap-8",
                  "items-stretch"
                )}
              >
                {items.map((item, i) => (
                  <motion.div 
                    // Usamos slug o index como fallback, evitando 'id' que causaba error
                    key={item.slug || i} 
                    variants={itemMotion} 
                    className="h-full"
                  >
                    <CatalogCard
                      href={buildHref(String(current.categoryKey), item)}
                      title={item.name}
                      image={item.src}
                      brandLogoSrc={brandLogoOf(item, i)}
                      subtitle={item.description}
                    />
                  </motion.div>
                ))}

                <MoreEquiposCard href={ctaHref} label="MAS EQUIPOS..." />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </Section>
  );
}

// ===================== MORE CARD (CTA) =====================

type MoreProps = { href: string; label: string };

function MoreEquiposCard({ href, label }: MoreProps) {
  const titleB = label.replace("MAS ", "");

  return (
    <motion.div variants={itemMotion} className="h-full">
      <motion.div initial="rest" whileHover="hover" animate="rest" className="h-full">
        <Link
          href={href}
          prefetch
          aria-label={label}
          className={cn(
            "group relative block h-full min-h-[320px] sm:min-h-[340px] rounded-2xl",
            "bg-[var(--brand-orange-500)]",
            "overflow-hidden",
            "outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]"
          )}
        >
          {/* Hover Overlay */}
          <motion.div
            aria-hidden="true"
            variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
            transition={{ duration: 0.15 }}
            className="pointer-events-none absolute inset-0"
          >
            <div className="absolute inset-0 bg-black/5" />
          </motion.div>

          {/* Title */}
          <div className="p-8 sm:p-10">
            <div
              className={cn(
                "text-[color:var(--text-on-colored)] font-semibold tracking-wide leading-[1.05]",
                "text-[24px] sm:text-[26px]"
              )}
            >
              <span className="block">MAS</span>
              <span className="block">{titleB}</span>
            </div>
          </div>

          {/* CTA Button */}
          <div className="absolute left-6 bottom-6 z-20">
            {/* Mobile/Tablet Pill */}
            <div className="md:hidden" aria-hidden="true">
              <div
                className={cn(
                  "inline-flex items-center gap-3",
                  "rounded-full",
                  "bg-white/18",
                  "px-5 py-3",
                  "text-body-sm font-semibold text-[color:var(--text-on-colored)]",
                  "shadow-[0_14px_34px_rgba(0,0,0,0.12)]"
                )}
              >
                <span>Explorar</span>
                <span className="grid h-9 w-9 place-items-center rounded-full bg-white/90">
                  <FiArrowUpRight className="h-5 w-5 [color:var(--brand-orange-500)]" />
                </span>
              </div>
            </div>

            {/* Desktop Pill (Animated) */}
            <motion.div
              aria-hidden="true"
              variants={{ rest: { opacity: 0.92, y: 0 }, hover: { opacity: 1, y: -2 } }}
              transition={{ type: "spring", stiffness: 240, damping: 20 }}
              className="hidden md:inline-flex"
            >
              <div
                className={cn(
                  "inline-flex items-center gap-3 rounded-full",
                  "bg-white/14",
                  "px-5 py-3",
                  "text-body-sm font-semibold text-[color:var(--text-on-colored)]",
                  "shadow-[0_14px_34px_rgba(0,0,0,0.12)]"
                )}
              >
                <span>Explorar</span>
                <span className="grid h-9 w-9 place-items-center rounded-full bg-white/90">
                  <FiArrowUpRight className="h-5 w-5 [color:var(--brand-orange-500)]" />
                </span>
              </div>
            </motion.div>
          </div>

          {/* Brand Logo */}
          <div className="absolute bottom-7 right-7 h-12 w-12">
            <Image
              src="/logos/Logovol1.svg"
              alt="Logo"
              fill
              className="object-contain brightness-0 invert"
            />
          </div>
        </Link>
      </motion.div>
    </motion.div>
  );
}