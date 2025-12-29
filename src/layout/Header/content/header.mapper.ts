import { headerSchema } from "@/content/schemas/header.schema";

export type NavSubItem = {
  label: string;
  href: string;
  image?: { src: string; alt?: string };
};

export type NavItem = {
  label: string;
  href?: string;
  chevron?: "down" | "up";
  submenu?: NavSubItem[];
};

export type HeaderProps = {
  logo: { src: string; alt: string };
  nav: NavItem[];
  cta?: { label: string; href: string; variant: "solid" | "outline" | "ghost" | "link" };
  behavior: { sticky: boolean; container: boolean };
};

export function mapHeaderContent(input: unknown): HeaderProps {
  const parsed = headerSchema.parse(input);

  return {
    logo: parsed.logo,
    nav: parsed.nav.map((n) => ({
      label: n.label,
      href: n.href,
      chevron: n.chevron,
      submenu: n.submenu?.map((s) => ({
        label: s.label,
        href: s.href,
        image: s.image ? { src: s.image.src, alt: s.image.alt } : undefined,
      })),
    })),
    cta: parsed.cta
      ? {
          label: parsed.cta.label,
          href: parsed.cta.href,
          variant: parsed.cta.variant,
        }
      : undefined,
    behavior: parsed.behavior,
  };
}
