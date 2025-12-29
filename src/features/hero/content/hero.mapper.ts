import { HeroSchema, type HeroContent } from "@/content/schemas/hero.schema";

export type HeroUiProps = {
  videoSrc: string;
  titleBefore: string;
  titleHighlight: string;
  titleAfter?: string;
  description: string;
  cta: { label: string; href: string };
  features: Array<{ icon: "icon01" | "icon02" | "icon03"; title: string; description: string }>;
  pill: { label: string; value: string; caption: string; avatars: string[] };
};

export function mapHeroContent(input: unknown): HeroUiProps {
  const parsed = HeroSchema.parse(input) as HeroContent;
  return {
    videoSrc: parsed.videoSrc,
    titleBefore: parsed.titleBefore,
    titleHighlight: parsed.titleHighlight,
    titleAfter: parsed.titleAfter,
    description: parsed.description,
    cta: parsed.cta,
    features: parsed.features,
    pill: parsed.pill,
  };
}
