// src/features/catalog/ui/BrandsCarousel.tsx
"use client";

import Image from "next/image";
import { animate, motion, useMotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Brand = {
  name: string;
  logo: string;
};

type Props = {
  brands: Brand[];
};

export function BrandsCarousel({ brands }: Props) {
  const x = useMotionValue(0);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const measure = () => setDistance(el.scrollWidth);

    measure();
    const ro = new ResizeObserver(() => measure());
    ro.observe(el);

    return () => ro.disconnect();
  }, [brands]);

  useEffect(() => {
    if (!distance) return;

    x.set(0);

    const controls = animate(x, [0, -distance], {
      ease: "linear",
      duration: Math.max(12, distance / 80),
      repeat: Infinity,
      repeatType: "loop",
    });

    return () => controls.stop();
  }, [distance, x]);

  if (!brands.length) return null;

  return (
    <motion.section
      aria-label="Marcas internacionales"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -120px 0px" }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="mt-10 w-full"
    >
      {/* Altura fija del banner: NO afecta nada debajo */}
      <div className="w-full overflow-hidden py-6 sm:py-7">
        <motion.div style={{ x }} className="flex items-center">
          {/* Set 1 (medido) */}
          <div ref={trackRef} className="flex items-center gap-12 px-10">
            {brands.map((brand) => (
              <BrandLogo key={brand.name} brand={brand} />
            ))}
          </div>

          {/* Set 2 (duplicado) */}
          <div className="flex items-center gap-12 px-10" aria-hidden="true">
            {brands.map((brand) => (
              <BrandLogo key={`${brand.name}-dup`} brand={brand} />
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

function BrandLogo({ brand }: { brand: Brand }) {
  return (
    <div className="shrink-0">
      {/* Caja “ancla”: define el espacio (NO cambia layout) */}
      <div className="relative flex h-10 w-44 items-center justify-center sm:h-11 sm:w-52 md:h-12 md:w-56 lg:h-14 lg:w-60">
        {/* Escala interna: agranda logo sin mover nada */}
        <div className="relative h-full w-full overflow-visible scale-[1.85] sm:scale-[2.05] md:scale-[2.2] lg:scale-[2.35]">
          <Image
            src={brand.logo}
            alt={brand.name}
            fill
            sizes="(min-width: 1024px) 240px, (min-width: 768px) 224px, 208px"
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
}
