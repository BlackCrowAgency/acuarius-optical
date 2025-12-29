// src/features/marcas/content/marcas.mapper.ts
import { marcasContentSchema } from "@/content/schemas/marcas.schema";
import type { MarcasContent, MarcasLogo } from "@/content/schemas/marcas.schema";

export type MarcasUiProps = {
  titleBefore: string;
  titleHighlight: string;
  titleAfter: string;
  description?: string;
  logos: MarcasLogo[];
};

export function mapMarcasContent(input: unknown): MarcasUiProps {
  const parsed = marcasContentSchema.parse(input) as MarcasContent;

  if ("title" in parsed) {
    // Si vino en una sola cadena, intentamos detectar “ESTÁNDAR MUNDIAL”;
    // si no está, todo queda en titleBefore.
    const full = parsed.title;
    const marker = "ESTÁNDAR MUNDIAL";
    if (full.includes(marker)) {
      const [before, afterRaw] = full.split(marker);
      const after = afterRaw?.trimStart() ?? "";
      return {
        titleBefore: before.trimEnd(),
        titleHighlight: marker,
        titleAfter: after,
        description: parsed.description ?? "",
        logos: parsed.logos ?? [],
      };
    }
    return {
      titleBefore: full,
      titleHighlight: "",
      titleAfter: "",
      description: parsed.description ?? "",
      logos: parsed.logos ?? [],
    };
  }

  // Forma dividida
  const { titleBefore = "", titleHighlight = "", titleAfter = "", description = "", logos = [] } = parsed;
  return { titleBefore, titleHighlight, titleAfter, description, logos };
}
