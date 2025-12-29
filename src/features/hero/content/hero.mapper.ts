// src/features/hero/content/hero.mapper.ts
import { HeroSchema, type HeroContent } from "@/content/schemas/hero.schema";

export type HeroVideoProps = {
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  playsInline?: boolean;
  preload?: "none" | "metadata" | "auto";
};

export type HeroUiProps = {
  // Nuevo (preferido)
  videoSrc: string;

  // Opcionales (para poster/props)
  poster?: string;
  videoProps?: HeroVideoProps;

  titleBefore: string;
  titleHighlight: string;
  titleAfter?: string;

  description: string;
  cta: { label: string; href: string };

  features: Array<{
    icon: "icon01" | "icon02" | "icon03";
    title: string;
    description: string;
  }>;

  pill: {
    label: string;
    value: string;
    caption: string;
    avatars: string[];
  };
};

type LegacyHero = Extract<HeroContent, { media: unknown }>;

function isLegacy(input: HeroContent): input is LegacyHero {
  return "media" in input;
}

export function mapHeroContent(input: unknown): HeroUiProps {
  const parsed = HeroSchema.parse(input) as HeroContent;

  if (isLegacy(parsed)) {
    return {
      videoSrc: parsed.media.kind === "video" ? parsed.media.src : "/images/hero/ImagenPortada.mp4",
      poster: parsed.media.kind === "video" ? parsed.media.poster : undefined,
      videoProps: parsed.videoProps,

      titleBefore: parsed.titleBefore,
      titleHighlight: parsed.titleHighlight,
      titleAfter: parsed.titleAfter,

      description: parsed.description,
      cta: parsed.cta,

      features: parsed.features,
      pill: parsed.pill,
    };
  }

  return {
    videoSrc: parsed.videoSrc,
    poster: parsed.poster,
    videoProps: parsed.videoProps,

    titleBefore: parsed.titleBefore,
    titleHighlight: parsed.titleHighlight,
    titleAfter: parsed.titleAfter,

    description: parsed.description,
    cta: parsed.cta,

    features: parsed.features,
    pill: parsed.pill,
  };
}
