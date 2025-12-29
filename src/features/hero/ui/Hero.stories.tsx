import type { Meta, StoryObj } from "@storybook/react";
import Hero from ".";
import type { HeroUiProps } from "@/features/hero/content/hero.mapper";

const meta: Meta<typeof Hero> = {
  title: "Features/Hero",
  component: Hero,
};
export default meta;

type Story = StoryObj<typeof Hero>;

const base: HeroUiProps = {
  titleBefore: "Ingeniería médica al servicio de la",
  titleHighlight: "salud ocular",
  titleAfter: "",
  description:
    "Distribuimos tecnología oftalmológica de última generación, creada por los líderes mundiales en visión y diagnóstico ocular.",
  cta: { label: "Ver Equipos", href: "/equipos" },
  media: { kind: "video", src: "/images/hero/ImagenPortada.mp4", poster: "/images/hero/ImagenPortada.jpg" },
  layout: { mediaRadius: "3xl", mediaAspect: "video", stickyHeading: true },
  videoProps: { autoPlay: true, loop: true, muted: true, playsInline: true, preload: "metadata" },
};

export const Default: Story = { args: base };
