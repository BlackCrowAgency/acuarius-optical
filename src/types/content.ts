// src/types/content.ts
// Tipos **globales** de contenido y navegación para todo el proyecto.
// Solo tipos (sin valores) para trabajar bien con `verbatimModuleSyntax`.

//
// Locales
//
export type Locale = "es" | "en";

/** Ruta pública que comienza con "/" (por ejemplo: "/contacto", "/images/hero.webp"). */
export type PublicPath = `/${string}`;

/** URL externa absoluta (http o https). */
export type ExternalUrl = `http${"" | "s"}://${string}`;

/** Enlaces permitidos en contenido (interno o externo). */
export type Href = PublicPath | ExternalUrl;

//
// Metadatos de página (SEO básico)
//
export type PageMeta = {
  title?: string;
  description?: string;
  /** Imagen OG pública (ruta que empieza con "/"). */
  ogImage?: PublicPath;
};

//
// CTA
//
export type CTA = {
  label: string;
  href: Href;
  /** `true` si el href es externo (http/https). Puede omitirse si se infiere en el mapper. */
  isExternal?: boolean;
};

//
// Media
//
export type ImageMedia = {
  kind: "image";
  src: PublicPath;
  alt: string;
  /** Póster/placeholder opcional. */
  poster?: PublicPath;
};

export type ModelMedia = {
  kind: "model";
  /** Ruta al .glb/.gltf en /public. */
  src: PublicPath;
  /** Imagen de póster opcional. */
  poster?: PublicPath;
  /** Texto alternativo opcional (no siempre aplica a modelos). */
  alt?: string;
};

/** Unión de medios soportados globalmente. */
export type Media = ImageMedia | ModelMedia;

//
// Galería (ítems simples reutilizables)
//
export type GalleryItem = {
  src: PublicPath;
  alt?: string;
  width?: number;
  height?: number;
};

//
// Secciones de contenido
//
/** Kinds conocidos de secciones en la landing. */
export type KnownSectionKind =
  | "hero"
  | "studioIntro"
  | "capabilities"
  | "gallery"
  | "bigStatement"
  | "interactive-3d"
  | "value-grid";

/** Sección genérica (usa `data` fuertemente tipado por mappers/schemas). */
export type Section<K extends string = string, D = unknown> = {
  kind: K;
  data?: D;
};

/** Página de contenido mínima (tal como vienen los JSON). */
export type ContentPage = {
  kind: "page";
  slug: string;
  meta?: PageMeta;
  sections: Array<Section>;
};

//
// UI tokens compartidos (para evitar variantes sueltas)
//
export type ButtonVariant = "solid" | "outline" | "ghost" | "link";
export type ButtonSize = "sm" | "md" | "lg" | "xl";
