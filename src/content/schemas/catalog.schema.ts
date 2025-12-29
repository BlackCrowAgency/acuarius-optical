import { z } from "zod";

/* =========================
   Categories
========================= */

export const CatalogCategorySchema = z.object({
  key: z.string().min(1),
  title: z.string().min(1),
  description: z.string().optional(),
  heroImage: z.string().optional(),
});

export const CatalogCategoriesSchema = z.array(CatalogCategorySchema);

/* =========================
   Products (soporta 2 formatos)
   - Flat:  coverImage / heroImage / gallery
   - Legacy: images: { cover, hero, gallery }
========================= */

const LegacyImagesSchema = z
  .object({
    cover: z.string().optional(),
    hero: z.string().optional(),
    gallery: z.array(z.string()).optional(),
  })
  .optional();

const ProductBaseSchema = z.object({
  slug: z.string().min(1),
  name: z.string().min(1),
  brand: z.string().optional(),
  shortDescription: z.string().optional(),
  description: z.string().optional(),

  // Formato nuevo (flat)
  coverImage: z.string().optional(),
  heroImage: z.string().optional(),
  gallery: z.array(z.string()).optional(),

  // Formato viejo (legacy)
  images: LegacyImagesSchema,

  specs: z
    .array(
      z.object({
        label: z.string().min(1),
        value: z.string().min(1),
      })
    )
    .optional(),
});

export const CatalogProductSchema = ProductBaseSchema.transform((p) => {
  const gallery = p.gallery ?? p.images?.gallery ?? [];
  const heroImage = p.heroImage ?? p.images?.hero;

  const coverImage =
    p.coverImage ?? p.images?.cover ?? heroImage ?? gallery[0] ?? "";

  return {
    slug: p.slug,
    name: p.name,
    brand: p.brand,
    shortDescription: p.shortDescription,
    description: p.description,
    coverImage,
    heroImage,
    gallery,
    specs: p.specs ?? [],
  };
}).superRefine((p, ctx) => {
  // Para que SIEMPRE haya cover (porque tus cards lo necesitan)
  if (!p.coverImage || p.coverImage.trim().length === 0) {
    ctx.addIssue({
      code: "custom",
      path: ["coverImage"],
      message:
        'Falta "coverImage". Usa "coverImage" (nuevo) o "images.cover" (legacy).',
    });
  }
});

export const CatalogProductWithCategorySchema = CatalogProductSchema.and(
  z.object({
    categoryKey: z.string().min(1),
  })
);

export type CatalogProduct = z.infer<typeof CatalogProductSchema>;
