import { z } from "zod";

export const ServiciosSchema = z.object({
  titleLines: z.tuple([z.string(), z.string().optional()]),
  aside: z.string().optional(),
  cards: z.array(
    z.object({
      key: z.string(),
      image: z.string(),
      alt: z.string().optional(),
      label: z.string(),        // << requerido para la línea 1
      title: z.string(),
      description: z.string().optional(),
      href: z.string().optional(),
    })
  ),
});
export type ServiciosContent = z.infer<typeof ServiciosSchema>;
