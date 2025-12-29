// src/features/hero/ui/hero.clip.tsx
import type { HeroUiProps } from "@/features/hero/content/hero.mapper";

export const heroClip: HeroUiProps = {
  videoSrc: "/images/hero/ImagenPortada.mp4",
  poster: "/images/hero/ImagenPortada.jpg",
  videoProps: {
    autoPlay: true,
    loop: true,
    muted: true,
    playsInline: true,
    preload: "metadata",
  },

  titleBefore: "Tecnología",
  titleHighlight: "Oftalmológica",
  titleAfter: "de última generación",

  description:
    "Distribuimos tecnología oftalmológica de última generación, creada por los líderes mundiales en visión y diagnóstico ocular.",

  cta: { label: "Ver Equipos", href: "/equipos-oftalmologicos" },

  features: [
    {
      icon: "icon01",
      title: "Equipos premium",
      description: "Catálogo curado con marcas líderes del sector.",
    },
    {
      icon: "icon02",
      title: "Soporte experto",
      description: "Acompañamiento técnico y asesoría en la compra.",
    },
    {
      icon: "icon03",
      title: "Entrega confiable",
      description: "Coordinación clara y comunicación directa.",
    },
  ],

  pill: {
    label: "Confianza",
    value: "100+",
    caption: "Clientes satisfechos",
    avatars: [
      "/images/avatares/personauno.png",
      "/images/avatares/personados.png",
      "/images/avatares/personatres.png",
    ],
  },
};

export default heroClip;
