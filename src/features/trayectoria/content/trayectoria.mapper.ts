import { TrayectoriaSchema, type TrayectoriaContent } from "@/content/schemas/trayectoria.schema";

/* ===== Tipos que consume la UI ===== */
export type TrayectoriaEyebrow =
  | string
  | {
      logo?: string;
      lines: string[];
    };

export type TrayectoriaCard = {
  image: string;
  alt: string;
  statValue?: string;
  statLabel?: string;
  footnote?: string;
};

export interface TrayectoriaUiProps {
  eyebrow: TrayectoriaEyebrow;
  titleBefore: string;
  titleHighlight?: string;
  titleAfter?: string;
  cards: TrayectoriaCard[];
}

/* === Mapper principal (usado por landing.composition) === */
export function mapTrayectoriaContent(input: unknown): TrayectoriaUiProps {
  const parsed = TrayectoriaSchema.parse(input) as TrayectoriaContent;

  return {
    eyebrow: parsed.eyebrow,
    titleBefore: parsed.titleBefore,
    titleHighlight: parsed.titleHighlight ?? "",
    titleAfter: parsed.titleAfter ?? "",
    cards: parsed.cards.map((c) => ({
      image: c.image,
      alt: c.alt,
      statValue: c.statValue,
      statLabel: c.statLabel,
      footnote: c.footnote,
    })),
  };
}

/* (Opcional) export para Storybook u otros usos */
export type { TrayectoriaContent };
