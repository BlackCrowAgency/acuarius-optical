// src/layout/Header/index.tsx
"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { HeaderProps } from "./content/header.mapper";

import { Container } from "@/ui";

import {
  IoChevronDown,
  IoArrowForward,
  IoClose,
  IoMenu,
  IoMailOutline,
  IoGridOutline,
  IoCubeOutline,
} from "react-icons/io5";
import { FaInstagram, FaFacebookF } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";

const EQUIPOS_KEY = "equipos";
const SERVICIOS_KEY = "servicios";

const EQUIPOS_BRANDS = [
  { src: "/logos/marcas/Unicos.svg", alt: "Unicos" },
  { src: "/logos/marcas/Visionix.svg", alt: "Visionix" },
  { src: "/logos/marcas/Takagi.svg", alt: "Takagi" },
  { src: "/logos/marcas/Huvitz.svg", alt: "Huvitz" },
  { src: "/logos/marcas/Tomey.svg", alt: "Tomey" },
  { src: "/logos/marcas/Mediworks.svg", alt: "MediWorks" },
];

const easeOutCubic: [number, number, number, number] = [0.22, 0.61, 0.36, 1];

function normalizeCtaHref(href?: string) {
  if (!href) return "/#footer";
  if (href === "#footer") return "/#footer";
  if (href === "/#footer") return "/#footer";
  return href;
}

function normalizeKey(label: string) {
  return label.toLowerCase().trim().replace(/\s+/g, "-");
}

function isActivePath(pathname: string, href?: string) {
  if (!href) return false;
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

type ContactFabProps = {
  href: string;
};

function ContactFab({ href }: ContactFabProps) {
  return (
    <Link
      href={href}
      aria-label="Contacto"
      className={[
        "lg:hidden",
        "fixed right-4 top-1/2 -translate-y-1/2 z-[90]",
        "grid h-11 w-11 place-items-center rounded-full",
        "bg-[var(--brand-orange-500)] [color:var(--text-on-colored)]",
        "shadow-sm",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--brand-surface)]",
      ].join(" ")}
    >
      <IoMailOutline className="h-5 w-5" aria-hidden="true" />
    </Link>
  );
}

type DesktopNavItem = HeaderProps["nav"][number] & {
  semanticKey: string;
  hasMenu: boolean;
};

export default function Header({ logo, nav, cta }: HeaderProps) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  // ===== Desktop dropdown state =====
  const [openKey, setOpenKey] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearCloseTimer = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const scheduleClose = useCallback(() => {
    clearCloseTimer();
    closeTimer.current = setTimeout(() => setOpenKey(null), 140);
  }, []);

  const handleEnter = (key?: string) => {
    clearCloseTimer();
    if (key) setOpenKey(key);
  };

  const closeAll = () => setOpenKey(null);

  useEffect(() => () => clearCloseTimer(), []);

  useEffect(() => {
    closeAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "Escape") {
      event.stopPropagation();
      closeAll();
    }
  };

  // ===== Mobile menu state =====
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<string | null>(null);
  const mobileCloseBtnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    setMobileOpen(false);
    setMobileSection(null);
  }, [pathname]);

  // Lock scroll while mobile menu open
  useEffect(() => {
    if (!mobileOpen) return;

    const prevHtml = document.documentElement.style.overflow;
    const prevBody = document.body.style.overflow;

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    setTimeout(() => mobileCloseBtnRef.current?.focus(), 0);

    return () => {
      document.documentElement.style.overflow = prevHtml;
      document.body.style.overflow = prevBody;
    };
  }, [mobileOpen]);

  useEffect(() => {
    const onKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (mobileOpen) {
        setMobileOpen(false);
        setMobileSection(null);
      }
      closeAll();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

  const desktopItems = useMemo<DesktopNavItem[]>(() => {
    return nav.map((item) => {
      const raw = item.label.toLowerCase().trim();
      const semanticKey =
        raw === EQUIPOS_KEY
          ? EQUIPOS_KEY
          : raw === SERVICIOS_KEY
            ? SERVICIOS_KEY
            : normalizeKey(item.label);

      const hasMenu = Array.isArray(item.submenu) && item.submenu.length > 0;
      return { ...item, semanticKey, hasMenu };
    });
  }, [nav]);

  const mobileItems = desktopItems;

  const contactHref = useMemo(() => normalizeCtaHref(cta?.href), [cta?.href]);

  // ===== Mobile overlay rendered in portal =====
  const mobileOverlay = mounted
    ? createPortal(
        <AnimatePresence>
          {mobileOpen ? (
            <motion.div
              className="fixed inset-0 z-[9999] pointer-events-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.18 } }}
              exit={{ opacity: 0, transition: { duration: 0.14 } }}
              aria-modal="true"
              role="dialog"
            >
              {/* Backdrop */}
              <div
                className="absolute inset-0 bg-black/60"
                onClick={() => {
                  setMobileOpen(false);
                  setMobileSection(null);
                }}
                aria-hidden
              />

              {/* Panel (solid) */}
              <motion.div
                className="absolute inset-0 bg-[#0f0f0f] text-white"
                initial={{ y: 10, opacity: 0 }}
                animate={{
                  y: 0,
                  opacity: 1,
                  transition: { duration: 0.22, ease: easeOutCubic },
                }}
                exit={{
                  y: 10,
                  opacity: 0,
                  transition: { duration: 0.16, ease: easeOutCubic },
                }}
              >
                {/* Top bar */}
                <div className="flex h-16 items-center justify-between px-6">
                  <span className="text-xs tracking-[0.3em] text-white/50">
                    MENU
                  </span>

                  <button
                    ref={mobileCloseBtnRef}
                    type="button"
                    aria-label="Cerrar menú"
                    onClick={() => {
                      setMobileOpen(false);
                      setMobileSection(null);
                    }}
                    className="grid h-10 w-10 place-items-center rounded-full bg-white/5 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f0f0f]"
                  >
                    <IoClose className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Items */}
                <nav className="px-6 pt-6" aria-label="Menú móvil">
                  <ul className="flex flex-col">
                    {mobileItems.map((item) => {
                      const key = item.semanticKey;
                      const expanded = mobileSection === key;

                      if (!item.hasMenu) {
                        const href = item.href ?? "/";
                        const active = isActivePath(pathname, href);

                        return (
                          <li key={key} className="border-b border-white/10">
                            <Link
                              href={href}
                              onClick={() => {
                                setMobileOpen(false);
                                setMobileSection(null);
                              }}
                              className={[
                                "block py-6 text-sm uppercase tracking-widest transition-colors",
                                active
                                  ? "text-white"
                                  : "text-white/70 hover:text-white",
                              ].join(" ")}
                            >
                              {item.label}
                            </Link>
                          </li>
                        );
                      }

                      return (
                        <li key={key} className="border-b border-white/10">
                          <button
                            type="button"
                            aria-expanded={expanded}
                            onClick={() =>
                              setMobileSection((s) => (s === key ? null : key))
                            }
                            className="flex w-full items-center justify-between py-6 text-left"
                          >
                            <span className="text-sm uppercase tracking-widest text-white/70">
                              {item.label}
                            </span>
                            <span
                              className={[
                                "text-white/50 transition-transform",
                                expanded ? "rotate-180" : "",
                              ].join(" ")}
                              aria-hidden
                            >
                              <IoChevronDown className="h-5 w-5" />
                            </span>
                          </button>

                          <AnimatePresence initial={false}>
                            {expanded ? (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{
                                  height: "auto",
                                  opacity: 1,
                                  transition: {
                                    duration: 0.22,
                                    ease: easeOutCubic,
                                  },
                                }}
                                exit={{
                                  height: 0,
                                  opacity: 0,
                                  transition: {
                                    duration: 0.16,
                                    ease: easeOutCubic,
                                  },
                                }}
                                className="overflow-hidden"
                              >
                                <ul className="pb-5">
                                  {item.submenu?.map((sub) => (
                                    <li key={sub.href}>
                                      <Link
                                        href={sub.href}
                                        onClick={() => {
                                          setMobileOpen(false);
                                          setMobileSection(null);
                                        }}
                                        className="block py-3 text-sm text-white/60 hover:text-white transition-colors"
                                      >
                                        {sub.label}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </motion.div>
                            ) : null}
                          </AnimatePresence>
                        </li>
                      );
                    })}
                  </ul>

                  {/* CTA móvil/tablet */}
                  {cta?.label ? (
                    <div className="pt-8">
                      <Link
                        href={normalizeCtaHref(cta.href)}
                        onClick={() => {
                          setMobileOpen(false);
                          setMobileSection(null);
                        }}
                        className={[
                          "inline-flex w-full items-center justify-center gap-2",
                          "rounded-full px-6 py-4 text-sm tracking-wide",
                          "bg-[var(--brand-orange-500)] [color:var(--text-on-colored)]",
                          "shadow-sm transition-transform active:scale-[0.99]",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f0f0f]",
                        ].join(" ")}
                      >
                        <span>{cta.label}</span>
                        <IoArrowForward
                          className="h-4 w-4"
                          aria-hidden="true"
                        />
                      </Link>
                    </div>
                  ) : null}

                  <div className="pt-10 flex gap-6 text-white/55">
                    <Link
                      href="https://www.instagram.com/"
                      aria-label="Instagram"
                      className="hover:text-white transition-colors"
                    >
                      <FaInstagram className="h-6 w-6" aria-hidden="true" />
                    </Link>

                    <Link
                      href="https://www.facebook.com/"
                      aria-label="Facebook"
                      className="hover:text-white transition-colors"
                    >
                      <FaFacebookF className="h-5 w-5" aria-hidden="true" />
                    </Link>
                  </div>
                </nav>
              </motion.div>
            </motion.div>
          ) : null}
        </AnimatePresence>,
        document.body
      )
    : null;

  const desktopTextClass = isHome ? "text-white" : "text-[var(--brand-text)]";

  return (
    <>
      {/* MOBILE & TABLET HEADER BAR (Sticky, < lg) */}
      <div className="pointer-events-auto lg:hidden sticky top-0 z-[80] border-b border-[var(--neutral-200)] bg-white/95 backdrop-blur-md">
        <Container max="fluid" gutter="none" className="px-4">
          <div className="flex h-14 items-center justify-between">
            <Link
              href="/"
              aria-label={logo.alt}
              className="flex items-center rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] focus-visible:ring-offset-2"
            >
              <Image
                src={logo.src}
                alt=""
                width={320}
                height={120}
                priority
                className="h-24 w-auto object-contain"
              />
            </Link>

            <button
              type="button"
              aria-label="Abrir menú"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(true)}
              className="inline-flex h-10 items-center justify-center rounded-md px-2 text-[var(--brand-text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] focus-visible:ring-offset-2"
            >
              <IoMenu className="h-8 w-8" aria-hidden="true" />
            </button>
          </div>
        </Container>
      </div>

      {/* Botón flotante (contacto) móvil/tablet */}
      <ContactFab href={contactHref} />

      {/* Mobile overlay (portal) */}
      {mobileOverlay}

      {/* DESKTOP HEADER */}
      <header className="relative z-50 pointer-events-none hidden lg:block lg:absolute lg:inset-x-14 lg:top-0">
        <Container max="fluid" gutter="none" className="hero-offset relative">
          <div className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-31 py-6 pointer-events-auto">
            {/* Logo */}
            <Link
              href="/"
              aria-label={logo.alt}
              className="relative z-10 -ml-2 -mt-2 flex shrink-0 items-start rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] focus-visible:ring-offset-2 md:-ml-4 md:-mt-6 lg:-ml-5"
            >
              <Image
                src={logo.src}
                alt=""
                width={420}
                height={140}
                className="drop-shadow-lg h-16 w-auto select-none transform-gpu origin-top-left md:h-32 md:-translate-y-1 md:scale-110 lg:-translate-y-10 lg:scale-160"
                priority
              />
            </Link>

            {/* Navbar + CTA */}
            <div className="relative flex items-center justify-end gap-6 pt-3">
              <nav aria-label="Navegación principal" className="relative">
                <ul
                  className="flex items-center gap-6"
                  onMouseLeave={scheduleClose}
                >
                  {desktopItems.map((item) => {
                    const key = item.semanticKey;
                    const hasMenu = item.hasMenu;
                    const href = item.href ?? "/";
                    const active = hasMenu
                      ? item.submenu?.some((s) => isActivePath(pathname, s.href))
                      : isActivePath(pathname, href);

                    if (!hasMenu) {
                      return (
                        <li key={key} className="relative">
                          <Link
                            href={href}
                            className={[
                              "group inline-flex items-center rounded-md px-2 py-2 text-sm tracking-wide",
                              "transition-opacity",
                              active
                                ? "opacity-100"
                                : "opacity-85 hover:opacity-100",
                              desktopTextClass,
                              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
                            ].join(" ")}
                          >
                            <span>{item.label}</span>
                            <span
                              className={[
                                "ml-0.5 h-0.5 w-0 rounded-full bg-current transition-all duration-200",
                                "group-hover:w-4",
                                active ? "w-4" : "",
                              ].join(" ")}
                              aria-hidden="true"
                            />
                          </Link>
                        </li>
                      );
                    }

                    const isOpen = openKey === key;

                    return (
                      <li
                        key={key}
                        className="relative"
                        onMouseEnter={() => handleEnter(key)}
                      >
                        <button
                          type="button"
                          aria-expanded={isOpen}
                          onKeyDown={handleKeyDown}
                          onFocus={() => handleEnter(key)}
                          onBlur={scheduleClose}
                          className={[
                            "group inline-flex items-center gap-2 rounded-md px-2 py-2 text-sm tracking-wide",
                            "transition-opacity",
                            active || isOpen
                              ? "opacity-100"
                              : "opacity-85 hover:opacity-100",
                            desktopTextClass,
                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
                          ].join(" ")}
                        >
                          <span>{item.label}</span>
                          <span
                            className={[
                              "transition-transform",
                              isHome
                                ? "text-white/80"
                                : "text-[var(--brand-text)]/70",
                              isOpen ? "rotate-180" : "",
                            ].join(" ")}
                            aria-hidden="true"
                          >
                            <IoChevronDown className="h-4 w-4" />
                          </span>
                          <span
                            className={[
                              "ml-0.5 h-0.5 w-0 rounded-full bg-current transition-all duration-200",
                              "group-hover:w-4",
                              isOpen || active ? "w-4" : "",
                            ].join(" ")}
                            aria-hidden="true"
                          />
                        </button>

                        {/* === DESKTOP DROPDOWN === */}
                        <AnimatePresence>
                          {isOpen ? (
                            <motion.div
                              key={`${key}-panel`}
                              initial={{ opacity: 0, y: 8, scale: 0.98 }}
                              animate={{
                                opacity: 1,
                                y: 0,
                                scale: 1,
                                transition: {
                                  duration: 0.2,
                                  ease: easeOutCubic,
                                },
                              }}
                              exit={{
                                opacity: 0,
                                y: 6,
                                scale: 0.98,
                                transition: {
                                  duration: 0.15,
                                  ease: easeOutCubic,
                                },
                              }}
                              onMouseEnter={() => handleEnter(key)}
                              onMouseLeave={scheduleClose}
                              className={[
                                "absolute right-0 top-full mt-4 w-[40rem] origin-top-right",
                                "rounded-xl bg-white shadow-2xl ring-1 ring-black/5 overflow-hidden",
                              ].join(" ")}
                              role="menu"
                            >
                              <div className="relative">
                                {/* Header / Decorative Top (Color cambiado a celeste azulado) */}
                                <div className="absolute top-0 inset-x-0 h-1 bg-sky-500" />

                                {/* Body Content */}
                                <div className="p-6">
                                  <div className="mb-4 flex items-center justify-between">
                                    <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-500">
                                      {item.label}
                                    </h3>
                                    <Link
                                      href={item.href || "/"}
                                      className="text-xs text-sky-600 hover:underline"
                                    >
                                      Ver todo
                                    </Link>
                                  </div>

                                  <div className="grid grid-cols-2 gap-2">
                                    {item.submenu?.map((sub) => {
                                      const subActive = isActivePath(
                                        pathname,
                                        sub.href
                                      );

                                      return (
                                        <Link
                                          key={sub.href}
                                          href={sub.href}
                                          onClick={closeAll}
                                          className={[
                                            "group flex items-start gap-4 rounded-lg p-3 transition-all",
                                            "hover:bg-neutral-50",
                                            subActive
                                              ? "bg-neutral-50"
                                              : "bg-transparent",
                                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500",
                                          ].join(" ")}
                                          role="menuitem"
                                        >
                                          <div
                                            className={[
                                              "mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border shadow-sm transition-colors",
                                              subActive
                                                ? "border-sky-500/20 bg-sky-500/5 text-sky-600"
                                                : "border-neutral-200 bg-white text-neutral-400 group-hover:border-sky-500/30 group-hover:text-sky-600",
                                            ].join(" ")}
                                          >
                                            {key === EQUIPOS_KEY ? (
                                              <IoCubeOutline className="h-5 w-5" />
                                            ) : (
                                              <IoGridOutline className="h-5 w-5" />
                                            )}
                                          </div>

                                          <div>
                                            <p className="font-medium text-neutral-900 group-hover:text-sky-600 transition-colors">
                                              {sub.label}
                                            </p>
                                            <p className="mt-0.5 text-xs text-neutral-500 group-hover:text-neutral-600">
                                              Explorar catálogo completo
                                            </p>
                                          </div>
                                        </Link>
                                      );
                                    })}
                                  </div>
                                </div>

                                {/* Brands Footer (Modificado para visibilidad) */}
                                {key === EQUIPOS_KEY && (
                                  <div className="bg-neutral-50 px-6 py-5 border-t border-neutral-100">
                                    <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-neutral-400">
                                      Marcas Oficiales
                                    </p>
                                    <div className="grid grid-cols-3 gap-6 sm:grid-cols-6 items-center justify-items-center">
                                      {EQUIPOS_BRANDS.map((b) => (
                                        <div
                                          key={b.alt}
                                          className="relative flex items-center justify-center w-full"
                                        >
                                          <Image
                                            src={b.src}
                                            alt={b.alt}
                                            width={140}
                                            height={80}
                                            // Se actualizó la altura a h-10 para móviles y md:h-20 para escritorio
                                            className="h-10 md:h-20 w-auto object-contain opacity-70 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-300"
                                          />
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}

                                {/* Generic Footer (Otros) */}
                                {key !== EQUIPOS_KEY && (
                                  <div className="bg-neutral-50 px-6 py-4 border-t border-neutral-100 flex items-center justify-between">
                                    <span className="text-xs text-neutral-500">
                                      ¿Tienes alguna duda sobre nuestros
                                      servicios?
                                    </span>
                                    <Link
                                      href="/contacto"
                                      className="text-xs font-medium text-neutral-900 hover:text-sky-600 transition-colors"
                                    >
                                      Contáctanos &rarr;
                                    </Link>
                                  </div>
                                )}
                              </div>
                            </motion.div>
                          ) : null}
                        </AnimatePresence>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              {/* CTA principal (desktop) */}
              {cta?.label ? (
                <Link
                  href={normalizeCtaHref(cta.href)}
                  className={[
                    "inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm",
                    "bg-[var(--brand-orange-500)] [color:var(--text-on-colored)]",
                    "shadow-sm transition-transform hover:-translate-y-[1px]",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
                  ].join(" ")}
                >
                  <span className="tracking-wide">{cta.label}</span>
                  <IoArrowForward className="h-4 w-4" aria-hidden="true" />
                </Link>
              ) : null}
            </div>
          </div>
        </Container>
      </header>
    </>
  );
}