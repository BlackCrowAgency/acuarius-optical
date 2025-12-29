"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
// ✅ CORRECCIÓN: Se agrega "type" explícitamente para Variants
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { IoChevronDown } from "react-icons/io5";
import type { HeaderProps } from "@/layout/Header/content/header.mapper";

type BottomHeaderProps = {
  nav: HeaderProps["nav"];
  cta?: HeaderProps["cta"];
  appearRatio?: number;
};

// --- UTILS ---
function normalizeHref(href?: string) {
  if (!href) return "/";
  if (href === "#footer" || href === "/#footer") return "/#footer";
  if (href.startsWith("/#")) return href;
  return href;
}

// --- VARIANTES DE ANIMACIÓN ---

// Animación del Dropdown (Submenú)
const dropdownMotion: Variants = {
  hidden: { opacity: 0, y: 8, scale: 0.98, pointerEvents: "none" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    pointerEvents: "auto",
    transition: { duration: 0.14, ease: [0.22, 0.61, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: 8,
    scale: 0.98,
    pointerEvents: "none",
    transition: { duration: 0.12, ease: [0.22, 0.61, 0.36, 1] },
  },
};

// ✅ Animación de Entrada/Salida del Header (Slide Up)
const headerVariants: Variants = {
  hidden: {
    y: "120%", // Se oculta completamente hacia abajo
    opacity: 0,
    scale: 0.95,
    pointerEvents: "none",
    transition: { 
      type: "spring", 
      stiffness: 400, 
      damping: 30 
    }
  },
  visible: {
    y: 0, // Posición original
    opacity: 1,
    scale: 1,
    pointerEvents: "auto",
    transition: {
      type: "spring",
      stiffness: 260, // Tensión del resorte (más alto = más rápido)
      damping: 20,    // Freno (evita que rebote demasiado)
      mass: 1,
    },
  },
};

export default function BottomHeader({
  nav,
  cta,
  appearRatio = 0.35,
}: BottomHeaderProps) {
  const pathname = usePathname();

  // Estados
  const [isDesktop, setIsDesktop] = useState(false);
  const [visible, setVisible] = useState(false); // Visible por scroll (Hero)
  const [hideByFooter, setHideByFooter] = useState(false); // Oculto por Footer
  const [equiposOpen, setEquiposOpen] = useState(false);

  // Refs para timers
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // --- LOGICA DE TIMERS ---
  const clearCloseTimer = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const scheduleClose = () => {
    clearCloseTimer();
    closeTimer.current = setTimeout(() => setEquiposOpen(false), 120);
  };

  // --- EFFECTS ---

  // 1. Detectar Desktop (lg breakpoint)
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const apply = () => setIsDesktop(mq.matches);

    apply();

    if (typeof mq.addEventListener === "function") {
      mq.addEventListener("change", apply);
      return () => mq.removeEventListener("change", apply);
    }
    // Fallback safari viejo
    mq.addListener(apply);
    return () => mq.removeListener(apply);
  }, []);

  // 2. Cleanup al desmontar
  useEffect(() => {
    return () => clearCloseTimer();
  }, []);

  // 3. Reset menú al cambiar ruta
  useEffect(() => {
    setEquiposOpen(false);
  }, [pathname]);

  // 4. Observer: Scroll Hero (Mostrar/Ocultar)
  useEffect(() => {
    if (!isDesktop) {
      setVisible(false);
      return;
    }

    const hero = document.getElementById("hero");
    // Fallback si no hay ID hero
    if (!hero) {
      const onScroll = () => setVisible(window.scrollY > 240);
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    }

    const obs = new IntersectionObserver(
      ([entry]) => setVisible(entry.intersectionRatio < appearRatio),
      { threshold: [0, 0.15, 0.25, 0.35, 0.5, 0.75, 1] }
    );

    obs.observe(hero);
    return () => obs.disconnect();
  }, [appearRatio, isDesktop]);

  // 5. Observer: Footer (Ocultar al llegar abajo)
  useEffect(() => {
    if (!isDesktop) {
      setHideByFooter(false);
      return;
    }

    const footer = document.getElementById("footer");
    if (!footer) {
      setHideByFooter(false);
      return;
    }

    const footerObs = new IntersectionObserver(
      ([entry]) => setHideByFooter(entry.isIntersecting),
      {
        threshold: 0.01,
        rootMargin: "0px 0px 240px 0px", // Detecta el footer antes de que llegue
      }
    );

    footerObs.observe(footer);
    return () => footerObs.disconnect();
  }, [isDesktop, pathname]);

  // --- DATA ---
  const items = useMemo(() => {
    const byLabel = (label: string) =>
      nav.find((i) => i.label.toLowerCase().trim() === label);

    const equipos = byLabel("equipos");
    const servicios = byLabel("servicios");
    const monturas = byLabel("monturas");
    const faqs = byLabel("faq´s") ?? byLabel("faq's") ?? byLabel("faq´s");

    return {
      home: { label: "Home", href: "/" },
      equipos,
      servicios,
      monturas: monturas ?? { label: "Monturas", href: "/#monturas" },
      faqs: faqs ?? { label: "FAQ´S", href: "/#faq" },
      contacto: { label: cta?.label ?? "Contacto", href: "/#footer" },
    };
  }, [nav, cta?.label]);

  const equiposSubmenu =
    items.equipos && Array.isArray(items.equipos.submenu)
      ? items.equipos.submenu
      : [];

  const navItemClass = [
    "shrink-0",
    "inline-flex h-11 items-center justify-center px-5",
    "rounded-[8px]",
    "bg-[var(--brand-blue-600)]",
    "border border-[var(--brand-blue-400)]",
    "text-white text-[15px] font-medium tracking-wide",
    "hover:bg-[var(--brand-blue-700)] transition-colors duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2",
  ].join(" ");

  // Si no es Desktop, no renderizamos nada
  if (!isDesktop) return null;

  // Lógica de visualización final
  const shouldShow = visible && !hideByFooter;

  return (
    <motion.div
      className="fixed inset-x-0 bottom-8 z-50 flex justify-center"
      initial="hidden"
      animate={shouldShow ? "visible" : "hidden"}
      variants={headerVariants}
    >
      <div
        className={[
          "pointer-events-auto",
          "mx-4",
          "flex items-center gap-1.5 p-1.5",
          "rounded-[14px]",
          "bg-[var(--brand-blue-200)]",
          "shadow-lg",
        ].join(" ")}
      >
        {/* LOGO */}
        <Link
          href="/"
          aria-label="Acuarius Optical"
          className={[
            "grid h-12 w-14 place-items-center shrink-0",
            "rounded-[10px]",
            "bg-[var(--brand-blue-800)]",
            "hover:scale-105 transition-transform duration-200",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white",
          ].join(" ")}
        >
          <Image
            src="/logos/Logovol1.svg"
            alt=""
            width={28}
            height={28}
            className="w-7 h-7 brightness-0 invert"
          />
        </Link>

        {/* NAV */}
        <div
          className={[
            "flex items-center",
            "overflow-x-auto md:overflow-visible",
            "[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",
          ].join(" ")}
        >
          <div
            className={[
              "flex items-center gap-0.5 p-0.5",
              "bg-[var(--brand-blue-600)]",
              "rounded-[10px]",
              "border border-[var(--brand-blue-400)]",
            ].join(" ")}
          >
            <Link href="/" className={navItemClass}>
              Home
            </Link>

            {/* Equipos dropdown */}
            <div
              className="relative shrink-0"
              onMouseEnter={() => {
                clearCloseTimer();
                setEquiposOpen(true);
              }}
              onMouseLeave={() => scheduleClose()}
            >
              <button
                type="button"
                aria-haspopup="menu"
                aria-expanded={equiposOpen}
                onClick={() => setEquiposOpen((v) => !v)}
                className={[
                  navItemClass,
                  "gap-2 pr-5 pl-6",
                  equiposOpen ? "bg-[var(--brand-blue-700)]" : "",
                ].join(" ")}
              >
                Equipos
                <IoChevronDown
                  className={[
                    "h-3.5 w-3.5 text-white transition-transform duration-300",
                    equiposOpen ? "rotate-180" : "",
                  ].join(" ")}
                  aria-hidden="true"
                />
              </button>

              <AnimatePresence>
                {equiposOpen && equiposSubmenu.length > 0 ? (
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={dropdownMotion}
                    className={[
                      "absolute left-0 bottom-[calc(100%+10px)] z-50 min-w-[240px]",
                      "rounded-[14px] border border-gray-200",
                      "bg-white shadow-xl",
                      "p-1.5",
                    ].join(" ")}
                    role="menu"
                  >
                    {equiposSubmenu.map((s, idx) => (
                      <Link
                        key={`${s.href}-${idx}`}
                        href={normalizeHref(s.href)}
                        onClick={() => setEquiposOpen(false)}
                        className={[
                          "flex items-center justify-between gap-3",
                          "rounded-[8px] px-3.5 py-2.5",
                          "text-[14px] font-medium text-[var(--neutral-500)]",
                          "hover:bg-[var(--neutral-50)] hover:text-[var(--brand-blue-600)]",
                          "transition-colors",
                        ].join(" ")}
                        role="menuitem"
                      >
                        <span>{s.label}</span>
                      </Link>
                    ))}
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>

            <Link
              href={normalizeHref(items.servicios?.href ?? "/#servicios")}
              className={navItemClass}
            >
              Servicios
            </Link>

            <Link
              href={normalizeHref(items.monturas.href)}
              className={navItemClass}
            >
              Monturas
            </Link>

            <Link
              href={normalizeHref(items.faqs.href)}
              className={navItemClass}
            >
              FAQ´S
            </Link>
          </div>
        </div>

        {/* CTA */}
        <Link
          href="/#footer"
          className={[
            "shrink-0",
            "inline-flex h-12 items-center justify-center px-6",
            "rounded-[10px]",
            "bg-[var(--brand-orange-500)]",
            "text-white text-[15px] font-semibold tracking-wide",
            "hover:bg-[var(--brand-orange-600)] hover:-translate-y-0.5 transition-all duration-200",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white",
          ].join(" ")}
        >
          Contacto
        </Link>
      </div>
    </motion.div>
  );
}