import { CalidadSchema, type CalidadContent } from "@/content/schemas/calidad.schema";

export type CalidadUiProps = {
  title: string;
  subtitle: string;
  items: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
};

/**
 * Mapper canónico. Convierte el JSON validado por Zod a las props de UI.
 */
export function mapCalidadContent(input: unknown): CalidadUiProps {
  const parsed = CalidadSchema.parse(input) as CalidadContent;

  return {
    title: parsed.title,
    subtitle: parsed.subtitle,
    items: parsed.items.map((i) => ({
      icon: i.icon,
      title: i.title,
      description: i.description,
    })),
  };
}

/* 👇 Export alias para compatibilidad con landing.composition.ts */
export const mapCalidad = mapCalidadContent;
