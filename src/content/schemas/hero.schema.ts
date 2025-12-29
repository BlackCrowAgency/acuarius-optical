// src/content/schemas/hero.schema.ts
import { z } from "zod";

const IconSchema = z.enum(["icon01", "icon02", "icon03"]);

const FeatureSchema = z.object({
  icon: IconSchema,
  title: z.string().min(1),
  description: z.string().min(1),
});

const CtaSchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
});

const PillSchema = z.object({
  label: z.string().min(1),
  value: z.string().min(1),
  caption: z.string().min(1),
  avatars: z.array(z.string().min(1)).min(1),
});

const VideoPropsSchema = z
  .object({
    autoPlay: z.boolean().optional(),
    loop: z.boolean().optional(),
    muted: z.boolean().optional(),
    playsInline: z.boolean().optional(),
    preload: z.enum(["none", "metadata", "auto"]).optional(),
  })
  .optional();

const HeroNewSchema = z.object({
  kind: z.literal("hero"),
  videoSrc: z.string().min(1),
  poster: z.string().min(1).optional(),
  videoProps: VideoPropsSchema,

  titleBefore: z.string().min(1),
  titleHighlight: z.string().min(1),
  titleAfter: z.string().optional(),

  description: z.string().min(1),
  cta: CtaSchema,

  features: z.array(FeatureSchema).min(1).max(3),
  pill: PillSchema,
});

const HeroLegacySchema = z.object({
  kind: z.literal("hero"),

  titleBefore: z.string().min(1),
  titleHighlight: z.string().min(1),
  titleAfter: z.string().optional(),

  description: z.string().min(1),
  cta: CtaSchema,

  media: z.object({
    kind: z.literal("video"),
    src: z.string().min(1),
    poster: z.string().min(1).optional(),
  }),

  layout: z
    .object({
      mediaRadius: z.string().optional(),
      mediaAspect: z.string().optional(),
      stickyHeading: z.boolean().optional(),
    })
    .optional(),

  videoProps: VideoPropsSchema,

  features: z.array(FeatureSchema).min(1).max(3),
  pill: PillSchema,
});

export const HeroSchema = z.union([HeroNewSchema, HeroLegacySchema]);
export type HeroContent = z.infer<typeof HeroSchema>;
