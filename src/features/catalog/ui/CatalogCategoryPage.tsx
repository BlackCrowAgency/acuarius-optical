// src/features/catalog/ui/CatalogCategoryPage.tsx
import Image from "next/image";
import Link from "next/link";
import { Section, Container, Typography } from "@/ui";
import { cn } from "@/utils/cn";

import type { CatalogCategoryKey } from "@/content/catalog";
import { getCatalogCategoryContent } from "@/content/catalog";
import { mapCatalogCategoryContent } from "@/features/catalog/content/catalog.mapper";

import { CatalogCard } from "./CatalogCard";
import { BrandsCarousel } from "./BrandsCarousel";
import { CatalogFilters } from "./CatalogFilters";

import { FiArrowUpRight, FiChevronLeft, FiRepeat } from "react-icons/fi";
import { HiOutlineArrowDown } from "react-icons/hi2";

// --- TYPES ---
type SearchParams = Record<string, string | string[] | undefined>;
type SearchParamsInput = SearchParams | Promise<SearchParams> | undefined;

type Props = {
  categoryKey: CatalogCategoryKey;
  searchParams?: SearchParamsInput;
};

// --- HELPERS ---

/** Determines the sibling category for the toggle button. */
function getSiblingCategory(currentKey: string) {
  const isEquipos = currentKey.includes("equipos");
  return isEquipos
    ? { label: "Ir a Biseladoras", href: "/biseladoras" }
    : { label: "Ir a Equipos", href: "/equipos-oftalmologicos" };
}

/** Parses brand filters from the URL. */
function readSelectedBrands(sp?: SearchParams): string[] {
  if (!sp) return [];
  const raw = sp.brand;
  const values = Array.isArray(raw) ? raw : raw ? [raw] : [];
  return values
    .flatMap((v) => v.split(","))
    .map((s) => s.trim())
    .filter(Boolean);
}

// --- MAIN COMPONENT ---

export async function CatalogCategoryPage({ categoryKey, searchParams }: Props) {
  // Handle async props (Next.js 14+)
  const sp = await Promise.resolve(searchParams);

  // Data fetching & Mapping
  const content = await getCatalogCategoryContent(categoryKey);
  const ui = mapCatalogCategoryContent(content, categoryKey);
  const siblingCategory = getSiblingCategory(categoryKey);

  // Filtering logic
  const selectedBrands = readSelectedBrands(sp);
  const filteredItems = ui.items.filter((it) => {
    if (selectedBrands.length === 0) return true;
    if (!it.brand) return false;
    return selectedBrands.includes(it.brand);
  });

  // Conditional Styles Configuration
  const isOrange = ui.ctaTone === "orange";
  
  // Pre-calculated CSS classes for cleaner JSX
  const styles = {
    desktopTone: isOrange ? "catalogCta--toneOrange" : "catalogCta--toneBlue",
    mobilePrimary: isOrange ? "bg-[var(--brand-orange-500)]" : "bg-[#0077C8]",
    mobileSecondary: "bg-[#EAEAF2]",
    mobileIconPrimary: isOrange ? "text-[var(--brand-orange-500)]" : "text-[#0077C8]",
  };

  return (
    <>
      {/* ✅ CSS Animation: Unified Center Fade 
         - Sin delays escalonados.
         - Sin blur.
         - Opacidad + Micro-escala para centrado sólido.
      */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes heroCenterFade {
          0% { 
            opacity: 0; 
            transform: scale(0.99); /* Sutil efecto zoom-out inicial */
          }
          100% { 
            opacity: 1; 
            transform: scale(1); 
          }
        }
        
        @media (min-width: 1024px) {
          .animate-hero-unified {
            opacity: 0; /* Estado inicial */
            animation: heroCenterFade 0.7s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
          }
        }
      `}} />

      {/* ================= HERO SECTION ================= */}
      <Section container="full" className="catalogCategoryTop max-lg:!pt-0">
        <Container max="3xl">
          
          {/* ---------------- MOBILE VIEW (< 1024px) ---------------- */}
          <div className="flex flex-col gap-5 pt-6 lg:hidden">
            
            {/* 1. Main Image with Floating Controls */}
            <div className="relative aspect-[4/3.5] w-full overflow-hidden rounded-[1.0rem] shadow-sm bg-neutral-100">
              <Image
                src={ui.heroImage}
                alt={ui.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 800px"
                className="object-cover"
              />
              
              {/* Gradient overlay for readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10 pointer-events-none" />

              {/* Breadcrumb */}
              <nav 
                className="absolute left-4 top-4 z-10 flex items-center gap-1.5 rounded-full bg-black/40 backdrop-blur-md px-3.5 py-1.5 text-xs font-medium text-white border border-white/10"
                aria-label="Breadcrumb"
              >
                <Link href="/" className="flex items-center hover:text-white/80 transition-colors">
                  <FiChevronLeft size={14} className="mr-0.5" />
                  Inicio
                </Link>
                <span className="opacity-40">/</span>
                <span className="truncate max-w-[120px]">{ui.breadcrumb.currentLabel}</span>
              </nav>

              {/* Switch */}
              <Link
                href={siblingCategory.href}
                className="absolute right-4 bottom-4 z-10 flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-md pl-4 pr-3 py-1.5 text-xs font-bold text-white border border-white/25 shadow-lg transition-transform active:scale-95 hover:bg-white/30"
              >
                <span>{siblingCategory.label}</span>
                <FiRepeat size={14} />
              </Link>
            </div>

            {/* 2. Mobile Action Buttons */}
            <div className="flex flex-col gap-3">
              <Link
                href={ui.ctaPrimary?.href || "#"}
                className={cn(
                  "group relative flex items-center justify-between overflow-hidden rounded-[1rem] p-6 text-white transition-transform active:scale-[0.98] shadow-md",
                  styles.mobilePrimary
                )}
              >
                <span className="text-[1.125rem] font-medium leading-tight max-w-[85%]">
                  {ui.ctaPrimary?.label || "Descarga nuestro catálogo 2026"}
                </span>
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white shadow-sm transition-transform group-hover:scale-110">
                  <FiArrowUpRight size={22} className={styles.mobileIconPrimary} />
                </div>
              </Link>

              <Link
                href="#catalog-listing"
                className={cn(
                  "group relative flex items-center justify-between overflow-hidden rounded-[1rem] p-6 text-[#1A1A1A] transition-transform active:scale-[0.98]",
                  styles.mobileSecondary
                )}
              >
                <span className="text-[1.125rem] font-medium leading-tight">
                  {ui.ctaSecondary?.label || "Ver Equipos"}
                </span>
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-black/5 bg-white text-black shadow-sm transition-transform group-hover:scale-110">
                  <HiOutlineArrowDown size={20} />
                </div>
              </Link>
            </div>
          </div>


          {/* ---------------- DESKTOP VIEW (>= 1024px) ---------------- */}
          <div className="hidden lg:block">
            {/* Aplicamos la clase 'animate-hero-unified' al contenedor padre .catalogHero 
              para que todo el bloque aparezca junto.
            */}
            <div className="catalogHero animate-hero-unified">
              <div className="catalogHero__media">
                <Image
                  src={ui.heroImage}
                  alt={ui.title}
                  fill
                  priority
                  sizes="1200px"
                  className="catalogHero__img"
                />

                <nav className="catalogHero__tag" aria-label="Breadcrumb">
                  <FiChevronLeft size={18} aria-hidden="true" />
                  <Link href={ui.breadcrumb.homeHref} className="catalogHero__tagLink">
                    {ui.breadcrumb.homeLabel}
                  </Link>
                  <span className="catalogHero__tagSep" aria-hidden="true">/</span>
                  <span className="catalogHero__tagCurrent">
                    {ui.breadcrumb.currentLabel}
                  </span>
                </nav>

                <Link
                  href={siblingCategory.href}
                  className="absolute right-8 top-8 z-20 flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md pl-5 pr-4 py-2 text-sm font-medium text-white border border-white/20 transition-all hover:bg-white/20 hover:scale-105"
                >
                  <span>{siblingCategory.label}</span>
                  <FiRepeat size={16} />
                </Link>
              </div>

              <div className="catalogHero__panel">
                <Link
                  href={ui.ctaPrimary?.href || "#"}
                  className={cn("catalogCta", "catalogCta--primary", styles.desktopTone)}
                >
                  <span className="catalogCta__label">
                    {ui.ctaPrimary?.label || "Descarga nuestro catálogo completo"}
                  </span>
                  <span className="catalogCta__iconWrap" aria-hidden="true">
                    <FiArrowUpRight size={18} />
                  </span>
                </Link>

                <Link
                  href="#catalog-listing"
                  className={cn("catalogCta", "catalogCta--secondary", styles.desktopTone)}
                >
                  <span className="catalogCta__label">
                    {ui.ctaSecondary?.label || "Nuestros Equipos"}
                  </span>
                  <span className="catalogCta__iconWrap" aria-hidden="true">
                    <HiOutlineArrowDown size={18} />
                  </span>
                </Link>
              </div>
            </div>
          </div>

          {/* Shared Brands Carousel */}
          <div className="mt-8 lg:mt-0">
             <BrandsCarousel brands={ui.brands} />
          </div>
        </Container>
      </Section>

      {/* ================= PRODUCT LISTING ================= */}
      <Section id="catalog-listing" container="full">
        <Container max="2xl" gutter="lg" className="py-0 md:py-4">
          <Typography.Heading as="h2" level="h2" weight="semibold">
            <span className="block text-neutral-900">Explora las mejores</span>
            <span className="block text-[var(--brand-orange-500)]">
              Marcas internacionales
            </span>
          </Typography.Heading>

          <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[280px_1fr] xl:grid-cols-[320px_1fr] lg:items-start">
            <aside className="lg:sticky lg:top-24">
              <CatalogFilters brands={ui.brands} />
            </aside>

            <div role="region" aria-label="Lista de productos">
              {filteredItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-neutral-300 bg-neutral-50 p-12 text-center text-neutral-500">
                  <p className="text-lg font-medium">No se encontraron resultados</p>
                  <p className="text-sm">Intenta seleccionar otra marca o limpiar los filtros.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
                  {filteredItems.map((item) => (
                    <CatalogCard
                      key={item.slug}
                      href={`/${categoryKey}/${item.slug}`}
                      title={item.name}
                      image={item.image}
                      subtitle={item.description}
                      brandLogoSrc={item.brandLogo}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}