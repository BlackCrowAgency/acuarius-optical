import { z } from "zod";

export const CalidadItemSchema = z.object({
  icon: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
});

export const CalidadSchema = z.object({
  title: z.string().min(1),
  subtitle: z.string().min(1),
  items: z.array(CalidadItemSchema).min(1).max(4),
});

export type CalidadContent = z.infer<typeof CalidadSchema>;
export type CalidadItem = z.infer<typeof CalidadItemSchema>;
