import { render, screen } from "@testing-library/react";
import Hero from ".";
import type { HeroUiProps } from "@/features/hero/content/hero.mapper";

const props: HeroUiProps = {
  titleBefore: "Ingeniería médica al servicio de la",
  titleHighlight: "salud ocular",
  titleAfter: "",
  description: "Distribuimos tecnología oftalmológica de última generación...",
  cta: { label: "Ver Equipos", href: "/equipos" },
  media: { kind: "video", src: "/images/hero/ImagenPortada.mp4" },
  layout: { mediaRadius: "3xl", mediaAspect: "video", stickyHeading: true },
  videoProps: { autoPlay: true, loop: true, muted: true, playsInline: true, preload: "metadata" },
};

describe("Hero", () => {
  it("renderiza el H1 y la pastilla", () => {
    render(<Hero {...props} />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/salud ocular/i);
  });

  it("incluye el botón de CTA", () => {
    render(<Hero {...props} />);
    expect(screen.getByRole("link", { name: /ver equipos/i })).toHaveAttribute("href", "/equipos");
  });

  it("renderiza el video con atributos de autoplay accesibles", () => {
    render(<Hero {...props} />);
    const video = screen.getByRole("img", { hidden: true }) as HTMLVideoElement | null; // aria-label en <video>
    // Si no se expone role img, buscamos por tagName
    const tagVideo = document.querySelector("video") as HTMLVideoElement | null;
    expect(tagVideo?.muted).toBe(true);
    expect(tagVideo?.loop).toBe(true);
    expect(tagVideo?.playsInline).toBe(true);
  });
});
