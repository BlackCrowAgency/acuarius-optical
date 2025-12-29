import { ServiciosSchema } from "@/content/schemas/servicios.schema";

export type ServiciosUiProps = {
  titleLineA: string;
  titleLineB?: string;
  aside?: string;
  cards: {
    key: string;
    image: string;
    alt?: string;
    /** Línea 1 debajo de la imagen (del JSON) */
    label: string;
    /** Línea 2 debajo de la imagen (título) */
    title: string;
    /** Si lo necesitas en otras vistas, sigue disponible */
    description?: string;
    href?: string;
  }[];
};

/** Mapear JSON → props de UI (sin hardcodear textos) */
export function mapServiciosContent(input: unknown): ServiciosUiProps {
  const parsed = ServiciosSchema.parse(input);
  const [titleLineA, titleLineB] = parsed.titleLines;

  return {
    titleLineA,
    titleLineB,
    aside: parsed.aside, // opcional en JSON
    cards: parsed.cards.map((c) => ({
      key: c.key,
      image: c.image,
      alt: c.alt,
      label: c.label, // << usamos label real del JSON
      title: c.title,
      description: c.description,
      href: c.href,
    })),
  };
}
