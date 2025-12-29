// src/content/schemas/previsualizar.schema.ts
import { z } from "zod";

export const previsualizarSchema = z.object({
  title: z.string().default(""),
  tabs: z
    .array(
      z.object({
        key: z.string().min(1),
        label: z.string().min(1),
        categoryKey: z.string().min(1),
        limit: z.number().int().positive().optional(),
      }),
    )
    .default([]),
  cta: z
    .object({
      label: z.string().optional(),
      href: z.string().optional(),
    })
    .optional(),
});

export type PrevisualizarContent = z.infer<typeof previsualizarSchema>;
