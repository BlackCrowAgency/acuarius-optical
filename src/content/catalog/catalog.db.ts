import { cache } from "react";
import categoriesRaw from "@/content/catalog/categories.json";
import type {
  CatalogCategoryKey,
  CatalogCategories,
  CatalogCategory,
  CatalogProductWithCategory,
} from "@/content/catalog/catalog.types";
import {
  CatalogCategoriesSchema,
  CatalogProductSchema,
} from "@/content/schemas/catalog.schema";

// Importa JSON por categoría (server-only)
import briotAttitude from "@/content/catalog/products/biseladoras/briot-attitude.json";
import briotAxis from "@/content/catalog/products/biseladoras/briot-axis.json";
import briotEco from "@/content/catalog/products/biseladoras/briot-eco.json";

import hrf8000a from "@/content/catalog/products/equipos-oftalmologicos/hrf-8000a.json";
import s390l from "@/content/catalog/products/equipos-oftalmologicos/s390l.json";
import urk700a from "@/content/catalog/products/equipos-oftalmologicos/urk700a.json";

/** ✅ categorías validadas */
export const getCatalogCategories = cache((): CatalogCategories => {
  return CatalogCategoriesSchema.parse(categoriesRaw);
});

export const isCatalogCategoryKey = (
  value: string
): value is CatalogCategoryKey => {
  const keys = new Set(getCatalogCategories().map((c) => c.key));
  return keys.has(value);
};

const PRODUCTS_BY_CATEGORY: Record<string, unknown[]> = {
  biseladoras: [briotAttitude, briotAxis, briotEco],
  "equipos-oftalmologicos": [hrf8000a, s390l, urk700a],
};

export const getCategoryOrNull = cache(
  (categoryKey: string): CatalogCategory | null => {
    const categories = getCatalogCategories();
    return categories.find((c) => c.key === categoryKey) ?? null;
  }
);

export const getProductsByCategory = cache(
  (categoryKey: CatalogCategoryKey): CatalogProductWithCategory[] => {
    const raw = PRODUCTS_BY_CATEGORY[categoryKey] ?? [];
    const parsed = raw.map((p) => CatalogProductSchema.parse(p));
    return parsed.map((p) => ({ ...p, categoryKey }));
  }
);

export const getProductBySlugOrNull = cache(
  (
    categoryKey: CatalogCategoryKey,
    slug: string
  ): CatalogProductWithCategory | null => {
    const list = getProductsByCategory(categoryKey);
    return list.find((p) => p.slug === slug) ?? null;
  }
);

/* =========================
   ✅ FACADE (sin archivo extra)
========================= */

export type CatalogCategoryContent = {
  categoryKey: CatalogCategoryKey;
  categoryTitle: string;
  heroImage: string | null;
  items: Array<{
    slug: string;
    name: string;
    image: string; // coverImage
    description?: string;
    brand?: string;
  }>;
};

export async function getCatalogCategoryContent(
  categoryKey: CatalogCategoryKey
): Promise<CatalogCategoryContent> {
  const category = getCategoryOrNull(categoryKey);
  if (!category) throw new Error(`Category not found: ${categoryKey}`);

  const products = getProductsByCategory(categoryKey);

  const heroImage =
    category.heroImage ??
    products.find((p) => p.heroImage)?.heroImage ??
    products[0]?.coverImage ??
    null;

  return {
    categoryKey,
    categoryTitle: category.title,
    heroImage,
    items: products.map((p) => ({
      slug: p.slug,
      name: p.name,
      image: p.coverImage,
      description: p.shortDescription,
      brand: p.brand,
    })),
  };
}
