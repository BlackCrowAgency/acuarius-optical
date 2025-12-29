// src/app/(marketing)/metadata.ts
import type { Metadata } from "next";
import home from "@/content/pages/home.json" assert { type: "json" };

type ContentPage = {
  kind: "page";
  sections: Array<{ kind: string; data?: unknown }>;
  meta?: { title?: string; description?: string; ogImage?: string };
};

export async function generateMetadata(): Promise<Metadata> {
  const page = home as unknown as ContentPage;
  const meta = page.meta ?? {};

  const fallbackTitle = "Acuarius Optical";
  const fallbackDescription =
    "Catálogo profesional de equipos oftalmológicos y biseladoras.";

  const title = meta.title ?? fallbackTitle;
  const description = meta.description ?? fallbackDescription;

  const ogImage = meta.ogImage?.trim() ? meta.ogImage.trim() : undefined;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      locale: "es_PE",
      images: ogImage ? [{ url: ogImage }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}
