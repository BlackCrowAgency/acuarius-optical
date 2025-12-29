// src/features/previsualizar/ui/index.tsx
import previsualizar from "@/content/sections/previsualizar.json" assert { type: "json" };
import { getCatalogPreviewItems } from "@/content/catalog";
import { mapPrevisualizarContent } from "@/features/previsualizar/content/previsualizar.mapper";
import PrevisualizarClient from "./PrevisualizarClient";

export default async function Previsualizar() {
  const base = mapPrevisualizarContent(previsualizar as unknown);

  const tabs = await Promise.all(
    (base.tabs ?? []).map(async (t) => {
      const limit = t.limit ?? 3;
      const items = await getCatalogPreviewItems(t.categoryKey, limit);
      return { ...t, items };
    }),
  );

  return <PrevisualizarClient title={base.title} tabs={tabs} cta={base.cta} />;
}
