import { z } from "zod";

export const testimonioItemSchema = z.object({
  title: z.string(),
  rating: z.number().int().min(1).max(5),
  text: z.string(),
  authorName: z.string(),
  authorRole: z.string(),
  // Debe coincidir con /public/logos/clinicas/*.svg
  clinicLogo: z.enum(["auna", "aviva", "oftalmosur"]),
});

export const testimoniosSchema = z.object({
  kind: z.literal("testimonios"),
  title: z.string(),
  subtitle: z.string(),
  items: z.array(testimonioItemSchema).min(1),
});

export type TestimoniosContent = z.infer<typeof testimoniosSchema>;
export type TestimonioItem = z.infer<typeof testimonioItemSchema>;
