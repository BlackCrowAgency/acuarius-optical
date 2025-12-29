// src/config/site.ts

export type NavItem = { label: string; href: string; external?: boolean };
export type FooterLink = { label: string; href: string; external?: boolean };

export const site = {
  // Identidad de marca
  name: "TuProducto",
  tagline: "Lanza más rápido",
  url: "https://tuproducto.com", // dominio canonical (sin slash final)
  ogImage: "/images/og-default.png", // fallback para OG/Twitter

  // Navegación principal (Header)
  nav: [
    { label: "Features", href: "/features" },
    { label: "Precios", href: "/pricing" },
    { label: "Contacto", href: "/contact" },
  ] as NavItem[],

  // Footer
  footer: {
    links: [
      { label: "Privacidad", href: "/privacy" },
      { label: "Términos", href: "/terms" },
      { label: "Soporte", href: "/contact" },
    ] as FooterLink[],
    socials: {
      twitter: "https://twitter.com/tuempresa",
      github: "https://github.com/tuempresa",
      linkedin: "https://linkedin.com/company/tuempresa",
    } as const,
    copyright: `© ${new Date().getFullYear()} TuProducto. Todos los derechos reservados.`,
  },

  // Defaults de SEO (útiles para combinar con generateMetadata())
  seo: {
    defaultTitle: "TuProducto – Lanza más rápido",
    defaultDescription:
      "La mejor herramienta para crecer tu negocio en línea.",
    titleTemplate: "%s – TuProducto",
  },
} as const;

export type SiteConfig = typeof site;
