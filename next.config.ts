// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "standalone",

  images: {
    formats: ["image/avif", "image/webp"],
  },

  experimental: {
    optimizePackageImports: ["react", "react-dom", "framer-motion", "three", "@react-three/fiber"],

    // ✅ reduce el overlay por sourcemaps rotos en Turbopack
    serverSourceMaps: false,
  },

  // Opcional (mantén lo tuyo)
  transpilePackages: ["three-stdlib"],
};

export default nextConfig;
