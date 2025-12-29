// src/features/catalog/content/catalog.mapper.ts
import type { CatalogCategoryKey } from "@/content/catalog";
import type { CatalogCategoryContent } from "@/content/catalog";
import { BRANDS_BY_CATEGORY } from "@/features/catalog/brands";

export type CatalogCategoryUi = {
  title: string;
  heroImage: string;
  ctaTone: "blue" | "orange";
  breadcrumb: {
    homeLabel: string;
    homeHref: string;
    currentLabel: string;
  };
  ctaPrimary?: { label: string; href: string };
  ctaSecondary?: { label: string; href: string };
  brands: Array<{ name: string; logo: string }>;
  items: Array<{
    slug: string;
    name: string;
    image: string;
    description?: string;
    brand?: string;
    brandLogo?: string;
  }>;
};

const HERO_FALLBACK: Record<CatalogCategoryKey, string> = {
  "equipos-oftalmologicos": "/images/Equipos_Oftalmologicos.png",
  biseladoras: "/images/Biceladoras.png",
};

export function mapCatalogCategoryContent(
  content: CatalogCategoryContent,
  categoryKey: CatalogCategoryKey
): CatalogCategoryUi {
  const tone: CatalogCategoryUi["ctaTone"] =
    categoryKey === "biseladoras" ? "orange" : "blue";

  const brands = BRANDS_BY_CATEGORY[categoryKey] ?? [];
  const brandLogoByName = new Map(brands.map((b) => [b.name, b.logo]));

  const heroImage =
    content.heroImage ??
    HERO_FALLBACK[categoryKey] ??
    content.items?.[0]?.image ??
    "/images/Equipos_Oftalmologicos.png";

  return {
    title: content.categoryTitle,
    heroImage,
    ctaTone: tone,

    breadcrumb: {
      homeLabel: "Catálogo",
      homeHref: "/",
      currentLabel: content.categoryTitle,
    },

    ctaPrimary: {
      label: "Descarga nuestro catálogo completo 2026",
      href: "/catalogo.pdf",
    },

    ctaSecondary: {
      label: "Nuestros Equipos",
      href: "#equipos",
    },

    brands,

    items: (content.items ?? []).map((it) => ({
      slug: it.slug,
      name: it.name,
      image: it.image,
      description: it.description,
      brand: it.brand,
      brandLogo: it.brand ? brandLogoByName.get(it.brand) : undefined,
    })),
  };
}
