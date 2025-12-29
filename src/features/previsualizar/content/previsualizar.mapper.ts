// src/features/previsualizar/content/previsualizar.mapper.ts
import {
  previsualizarSchema,
  type PrevisualizarContent,
} from "@/content/schemas/previsualizar.schema";

export type PrevisualizarTab = {
  key: string;
  label: string;
  categoryKey: string;
  limit?: number;
};

export type PrevisualizarUiProps = {
  title: string;
  tabs: PrevisualizarTab[];
  cta?: { label?: string; href?: string };
};

export function mapPrevisualizarContent(input: unknown): PrevisualizarUiProps {
  const data = previsualizarSchema.parse(input) as PrevisualizarContent;

  return {
    title: data.title ?? "",
    tabs: (data.tabs ?? []).map((t) => ({
      key: t.key,
      label: t.label,
      categoryKey: t.categoryKey,
      limit: t.limit,
    })),
    cta: data.cta ? { ...data.cta } : undefined,
  };
}
