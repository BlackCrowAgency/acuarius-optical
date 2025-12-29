export {
  getCatalogCategories,
  getCategoryOrNull,
  getProductsByCategory,
  getProductBySlugOrNull,
  getCatalogCategoryContent,
} from "./catalog.db";

export type { CatalogCategoryKey } from "./catalog.types";
export type { CatalogCategoryContent } from "./catalog.db";
export * from "./catalog.facade";
