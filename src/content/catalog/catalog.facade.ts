// src/content/catalog/catalog.facade.ts
import "server-only";

import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

export type CatalogPreviewItem = {
  name: string;
  slug: string;
  src: string;
  badge: string;
  brand?: string;
  description?: string;
};

type AnyProduct = Record<string, unknown>;

function safeString(v: unknown) {
  return typeof v === "string" ? v : "";
}

function pickImage(categoryKey: string, slug: string, data: AnyProduct) {
  // intenta tomar un campo “real” si existe
  const direct =
    safeString(data.coverImage) ||
    safeString(data.heroImage) ||
    safeString(data.image) ||
    safeString(data.cover) ||
    safeString((data as any)?.images?.[0]) ||
    safeString((data as any)?.gallery?.[0]) ||
    safeString((data as any)?.media?.[0]?.src) ||
    safeString((data as any)?.images?.[0]?.src);

  if (direct) return direct;

  // fallback profesional (tu public/catalog ya existe)
  return `/catalog/${categoryKey}/${slug}/cover.png`;
}

function normalizeName(slug: string, data: AnyProduct) {
  return (
    safeString(data.name) ||
    safeString(data.title) ||
    safeString(data.productName) ||
    slug.replace(/[-_]+/g, " ").trim()
  );
}

function normalizeBrand(data: AnyProduct) {
  return safeString(data.brand) || safeString(data.marca);
}

function normalizeDesc(data: AnyProduct) {
  return (
    safeString(data.shortDescription) ||
    safeString(data.subtitle) ||
    safeString(data.description) ||
    safeString(data.badge)
  );
}

function normalizeBadge(data: AnyProduct) {
  return safeString(data.badge) || normalizeBrand(data) || "";
}

function baseDir() {
  return path.join(process.cwd(), "src", "content", "catalog", "products");
}

export async function getCatalogPreviewItems(
  categoryKey: string,
  limit = 3,
): Promise<CatalogPreviewItem[]> {
  const dir = path.join(baseDir(), categoryKey);

  const files = (await readdir(dir)).filter((f) => f.endsWith(".json"));

  const items = await Promise.all(
    files.map(async (file) => {
      const slug = file.replace(/\.json$/i, "");
      const raw = await readFile(path.join(dir, file), "utf8");
      const data = JSON.parse(raw) as AnyProduct;

      const name = normalizeName(slug, data);
      const brand = normalizeBrand(data) || undefined;
      const description = normalizeDesc(data) || undefined;

      return {
        name,
        slug: safeString((data as any)?.slug) || slug,
        src: pickImage(categoryKey, slug, data),
        badge: normalizeBadge(data),
        brand,
        description,
        // opcional si algún día quieres ordenar por “order”
        _order: typeof (data as any)?.order === "number" ? (data as any).order : null,
      } as CatalogPreviewItem & { _order: number | null };
    }),
  );

  items.sort((a, b) => {
    const ao = a._order ?? Number.POSITIVE_INFINITY;
    const bo = b._order ?? Number.POSITIVE_INFINITY;
    if (ao !== bo) return ao - bo;
    return a.name.localeCompare(b.name, "es");
  });

  return items.slice(0, Math.max(1, limit)).map(({ _order, ...rest }) => rest);
}
