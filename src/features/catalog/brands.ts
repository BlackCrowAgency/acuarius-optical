// src/features/catalog/brands.ts
import type { CatalogCategoryKey } from "@/content/catalog";

export type Brand = {
  name: string;
  logo: string; // ruta en /public
};

export const BRANDS_BY_CATEGORY: Record<CatalogCategoryKey, Brand[]> = {
  "equipos-oftalmologicos": [
    { name: "Unicos", logo: "/logos/marcas/Unicos.svg" },
    { name: "Visionix", logo: "/logos/marcas/Visionix.svg" },
    { name: "Takagi", logo: "/logos/marcas/Takagi.svg" },
    { name: "MediWorks", logo: "/logos/marcas/Mediworks.svg" },
    { name: "Tomey", logo: "/logos/marcas/Tomey.svg" },
    { name: "Huvitz", logo: "/logos/marcas/Huvitz.svg" },
  ],
  biseladoras: [
    { name: "Briot", logo: "/logos/marcas/Briot.svg" },
    { name: "Visionix", logo: "/logos/marcas/Visionix.svg" },
    { name: "Huvitz", logo: "/logos/marcas/Huvitz.svg" },
    { name: "Takagi", logo: "/logos/marcas/Takagi.svg" },
  ],
};
