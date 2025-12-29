import { z } from "zod";
import { headerSchema } from "@/content/schemas/header.schema";
import { footerSchema } from "@/content/schemas/footer.schema";

// Bloques de secciones (contenido real vive en /content/sections/*.json)
const heroBlockSchema = z.object({ kind: z.literal("hero") });
const trayectoriaBlockSchema = z.object({ kind: z.literal("trayectoria") });
const clientesBlockSchema = z.object({ kind: z.literal("clientes") });

// Placeholder de servicios (contenido en /content/sections/servicios.json)
const serviciosBlockSchema = z.object({ kind: z.literal("servicios") });

// Marcas, testimonios, etc.
const marcasBlockSchema = z.object({ kind: z.literal("marcas") });
const testimoniosBlockSchema = z.object({ kind: z.literal("testimonios") });
const previsualizarBlockSchema = z.object({ kind: z.literal("previsualizar") });
const calidadBlockSchema = z.object({ kind: z.literal("calidad") });
const faqBlockSchema = z.object({ kind: z.literal("faq") });

const footerBlockSchema = z.object({
  kind: z.literal("footer"),
  ...footerSchema.shape
});

const sectionSchema = z.discriminatedUnion("kind", [
  heroBlockSchema,
  trayectoriaBlockSchema,
  clientesBlockSchema,
  serviciosBlockSchema,
  marcasBlockSchema,
  testimoniosBlockSchema,
  previsualizarBlockSchema,
  calidadBlockSchema,
  faqBlockSchema,
  footerBlockSchema
]);

const sectionKind = z.enum([
  "hero",
  "trayectoria",
  "clientes",
  "servicios",
  "marcas",
  "testimonios",
  "previsualizar",
  "calidad",
  "faq",
  "footer"
]);

export type SectionKind = z.infer<typeof sectionKind>;

export const pageSchema = z.object({
  header: headerSchema,
  sections: z.array(sectionSchema).min(1)
});

export type PageContent = z.infer<typeof pageSchema>;
