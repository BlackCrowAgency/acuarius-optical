import { z } from "zod";

/** Eyebrow puede ser:
 *  - string (legacy)
 *  - objeto { logo?: string; lines: string[] } (recomendado; máx 2 líneas)
 */
export const EyebrowSchema = z.union([
  z.string(),
  z.object({
    logo: z.string().optional(),
    lines: z.array(z.string()).min(1).max(2),
  }),
]);

export const TrayectoriaCardSchema = z.object({
  image: z.string(),
  alt: z.string(),
  statValue: z.string().optional(),
  statLabel: z.string().optional(),
  footnote: z.string().optional(),
});

export const TrayectoriaSchema = z.object({
  eyebrow: EyebrowSchema,
  titleBefore: z.string(),
  titleHighlight: z.string().default(""),
  titleAfter: z.string().default(""),
  cards: z.array(TrayectoriaCardSchema).min(1),
});

export type TrayectoriaContent = z.infer<typeof TrayectoriaSchema>;
