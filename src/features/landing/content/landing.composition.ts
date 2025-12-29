// src/features/landing/content/landing.composition.ts
import type { ComponentType } from "react";
import type { PageContent } from "@/content/schemas/page.schema";
import { pageSchema } from "@/content/schemas/page.schema";
import home from "@/content/pages/home.json" assert { type: "json" };

// Secciones
import Hero from "@/features/hero/ui";
import { mapHeroContent } from "@/features/hero/content/hero.mapper";
import heroData from "@/content/sections/hero.json" assert { type: "json" };

import Trayectoria from "@/features/trayectoria/ui";
import { mapTrayectoriaContent } from "@/features/trayectoria/content/trayectoria.mapper";
import trayectoriaData from "@/content/sections/trayectoria.json" assert { type: "json" };

import Clientes from "@/features/clientes/ui";
import { mapClientesContent } from "@/features/clientes/content/clientes.mapper";
import clientesData from "@/content/sections/clientes.json" assert { type: "json" };

// Servicios
import Servicios from "@/features/servicios/ui";
import { mapServiciosContent } from "@/features/servicios/content/servicios.mapper";
import serviciosData from "@/content/sections/servicios.json" assert { type: "json" };

// Marcas
import Marcas from "@/features/marcas/ui";
import { mapMarcasContent } from "@/features/marcas/content/marcas.mapper";
import marcasData from "@/content/sections/marcas.json" assert { type: "json" };

import Testimonios from "@/features/testimonios/ui";
import { mapTestimoniosContent } from "@/features/testimonios/content/testimonios.mapper";
import testimoniosData from "@/content/sections/testimonios.json" assert { type: "json" };

import Previsualizar from "@/features/previsualizar/ui";
import { mapPrevisualizarContent } from "@/features/previsualizar/content/previsualizar.mapper";
import previsualizarData from "@/content/sections/previsualizar.json" assert { type: "json" };

// Calidad
import Calidad from "@/features/calidad/ui";
import { mapCalidad } from "@/features/calidad/content/calidad.mapper";
import calidadData from "@/content/sections/calidad.json" assert { type: "json" };

// FAQ
import Faq from "@/features/faq/ui";
import { mapFaqToUiProps } from "@/features/faq/content/faq.mapper";
import faqData from "@/content/sections/faq.json" assert { type: "json" };



export type SectionItem<P = any> = {
  key: string;
  UI: ComponentType<P>;
  props: P;
};

export function composeLanding(content: PageContent): SectionItem[] {
  const items: SectionItem[] = [];

  for (const [idx, block] of content.sections.entries()) {
    switch (block.kind) {
      case "hero":
        items.push({
          key: `hero-${idx}`,
          UI: Hero,
          props: mapHeroContent(heroData)
        });
        break;

      case "trayectoria":
        items.push({
          key: `trayectoria-${idx}`,
          UI: Trayectoria,
          props: mapTrayectoriaContent(trayectoriaData)
        });
        break;

      case "clientes":
        items.push({
          key: `clientes-${idx}`,
          UI: Clientes,
          props: mapClientesContent(clientesData)
        });
        break;

      case "servicios":
        items.push({
          key: `servicios-${idx}`,
          UI: Servicios,
          props: mapServiciosContent(serviciosData as any)
        });
        break;

      case "marcas":
        items.push({
          key: `marcas-${idx}`,
          UI: Marcas,
          props: mapMarcasContent(marcasData)
        });
        break;

      case "testimonios":
        items.push({
          key: `testimonios-${idx}`,
          UI: Testimonios,
          props: mapTestimoniosContent(testimoniosData)
        });
        break;

      case "previsualizar":
        items.push({
          key: `previsualizar-${idx}`,
          UI: Previsualizar,
          props: mapPrevisualizarContent(previsualizarData)
        });
        break;

      case "calidad":
        items.push({
          key: `calidad-${idx}`,
          UI: Calidad,
          props: mapCalidad(calidadData as any)
        });
        break;

      case "faq":
        items.push({
          key: `faq-${idx}`,
          UI: Faq,
          props: mapFaqToUiProps(faqData as any)
        });
        break;


      default:
        break;
    }
  }

  return items;
}

export function getLandingComposition(): SectionItem[] {
  const parsed = pageSchema.parse(home);
  return composeLanding(parsed);
}

export default composeLanding;
