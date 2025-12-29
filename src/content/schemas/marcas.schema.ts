// src/content/schemas/marcas.schema.ts
import { z } from "zod";

const logoSchema = z.object({
  name: z.string().min(1),
  src: z.string().min(1),
});

const shapeA = z.object({
  kind: z.literal("marcas"),
  title: z.string().min(1),
  description: z.string().optional(),
  logos: z.array(logoSchema).min(1),
});

const shapeB = z.object({
  kind: z.literal("marcas"),
  titleBefore: z.string().default(""),
  titleHighlight: z.string().default(""),
  titleAfter: z.string().default(""),
  description: z.string().optional(),
  logos: z.array(logoSchema).min(1),
});

export const marcasContentSchema = z.union([shapeA, shapeB]);

export type MarcasContent = z.infer<typeof marcasContentSchema>;
export type MarcasLogo = z.infer<typeof logoSchema>;
