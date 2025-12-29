import { z } from "zod";

export const HeroFeatureSchema = z.object({
  icon: z.enum(["icon01", "icon02", "icon03"]),
  title: z.string().min(1),
  description: z.string().min(1),
});

export const HeroSchema = z.object({
  kind: z.literal("hero"),
  videoSrc: z.string().default("/images/hero/ImagenPortada.mp4"),
  titleBefore: z.string().min(1),
  titleHighlight: z.string().min(1),
  titleAfter: z.string().optional().default(""),
  description: z.string().min(1),
  cta: z.object({
    label: z.string().min(1),
    href: z.string().min(1),
  }),
  features: z.array(HeroFeatureSchema).min(1).max(3),
  pill: z.object({
    label: z.string().default("Etc."),
    value: z.string().default("100+"),
    caption: z.string().default("Clientes satisfechos"),
    avatars: z
      .array(z.string())
      .min(1)
      .default([
        "/images/avatares/personauno.png",
        "/images/avatares/personados.png",
        "/images/avatares/personatres.png",
      ]),
  }),
});

export type HeroContent = z.infer<typeof HeroSchema>;
