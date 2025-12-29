// src/app/manifest.ts
import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Acuarius Optical",
    short_name: "Acuarius",
    description: "Catálogo profesional de equipos oftalmológicos y biseladoras.",
    start_url: "/",
    display: "standalone",
    background_color: "#0b1220",
    theme_color: "#0b1220",
    icons: [
      { src: "/favicons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/favicons/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/favicons/maskable-192.png", sizes: "192x192", type: "image/png", purpose: "maskable" },
      { src: "/favicons/maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" }
    ]
  };
}
