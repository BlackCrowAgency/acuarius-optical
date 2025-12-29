import type { z } from "zod";
import type {
  CatalogCategoriesSchema,
  CatalogCategorySchema,
  CatalogProductSchema,
  CatalogProductWithCategorySchema,
} from "@/content/schemas/catalog.schema";

export type CatalogCategory = z.infer<typeof CatalogCategorySchema>;
export type CatalogCategories = z.infer<typeof CatalogCategoriesSchema>;

export type CatalogProduct = z.infer<typeof CatalogProductSchema>;
export type CatalogProductWithCategory = z.infer<
  typeof CatalogProductWithCategorySchema
>;

/** key viene de categories.json (y schema valida) */
export type CatalogCategoryKey = CatalogCategory["key"];
