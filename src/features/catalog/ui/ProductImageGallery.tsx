"use client";

import { useCallback, useMemo, useState } from "react";
import Image from "next/image";
import { cn } from "@/utils/cn";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";

type Props = {
  title: string;
  heroSrc: string;
  gallery?: string[];
};

function normalizeImages(heroSrc: string, gallery?: string[]) {
  const list = [heroSrc, ...(Array.isArray(gallery) ? gallery : [])]
    .filter(Boolean)
    .filter((src, idx, arr) => arr.indexOf(src) === idx);

  return list;
}

export function ProductImageGallery({ title, heroSrc, gallery }: Props) {
  const images = useMemo(() => normalizeImages(heroSrc, gallery), [heroSrc, gallery]);
  const [active, setActive] = useState(0);

  const hasMany = images.length > 1;

  const goTo = useCallback(
    (nextIndex: number) => {
      if (!images.length) return;
      const safe = ((nextIndex % images.length) + images.length) % images.length;
      setActive(safe);
    },
    [images.length]
  );

  const onPrev = useCallback(() => goTo(active - 1), [active, goTo]);
  const onNext = useCallback(() => goTo(active + 1), [active, goTo]);

  // fallback seguro
  if (!images.length) {
    return (
      <div
        className={cn(
          "rounded-3xl border border-[color:var(--neutral-200)]",
          "bg-[color:var(--brand-surface)]"
        )}
      >
        <div className="p-8 text-body-sm text-muted">Sin imágenes disponibles.</div>
      </div>
    );
  }

  const currentSrc = images[active];

  return (
    <section aria-label="Galería del producto" className="w-full">
      <div
        className={cn(
          "grid grid-cols-1 gap-6",
          "lg:grid-cols-[7rem_1fr]"
        )}
      >
        {/* Thumbnails (izquierda) */}
        <aside className={cn("order-2 lg:order-1")}>
          <div className="flex gap-3 overflow-auto pb-1 lg:flex-col lg:gap-4 lg:overflow-visible">
            {images.map((src, idx) => {
              const isActive = idx === active;
              return (
                <button
                  key={`${src}-${idx}`}
                  type="button"
                  onClick={() => setActive(idx)}
                  aria-label={`Ver imagen ${idx + 1} de ${images.length}`}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "group relative shrink-0",
                    "h-20 w-20 rounded-2xl border",
                    isActive
                      ? "border-[color:var(--brand-blue-500)]"
                      : "border-[color:var(--neutral-200)] hover:border-[color:color-mix(in_srgb,var(--neutral-900),transparent_70%)]",
                    "bg-[color:var(--brand-surface)]",
                    "outline-none focus-visible:shadow-[0_0_0_3px_var(--focus-ring)]"
                  )}
                >
                  <div
                    className={cn(
                      "absolute inset-0 rounded-2xl",
                      isActive
                        ? "bg-[color-mix(in_srgb,var(--brand-blue-50),transparent_40%)]"
                        : "bg-transparent"
                    )}
                    aria-hidden="true"
                  />
                  <div className="relative h-full w-full overflow-hidden rounded-2xl">
                    <Image
                      src={src}
                      alt={`${title} - miniatura ${idx + 1}`}
                      fill
                      sizes="(min-width: 1024px) 112px, 80px"
                      className={cn(
                        "object-contain p-2 transition-transform",
                        "group-hover:scale-[1.02]"
                      )}
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </aside>

        {/* Imagen principal */}
        <div className={cn("order-1 lg:order-2")}>
          <div
            className={cn(
              "relative overflow-hidden rounded-3xl border border-[color:var(--neutral-200)]",
              "bg-[linear-gradient(180deg,color-mix(in_srgb,var(--brand-surface),transparent_0%)_0%,color-mix(in_srgb,var(--brand-surface),transparent_0%)_100%)]"
            )}
          >
            {/* Stage */}
            <div className="relative aspect-[16/10] w-full">
              <Image
                src={currentSrc}
                alt={`${title} - imagen ${active + 1} de ${images.length}`}
                fill
                priority
                sizes="(min-width: 1024px) 900px, 100vw"
                className="object-contain p-6"
              />
            </div>

            {/* Controls */}
            {hasMany ? (
              <>
                <button
                  type="button"
                  onClick={onPrev}
                  aria-label="Imagen anterior"
                  className={cn(
                    "absolute left-4 top-1/2 -translate-y-1/2",
                    "grid h-11 w-11 place-items-center rounded-full",
                    "border border-[color:var(--neutral-200)] bg-[color:var(--brand-surface)]",
                    "text-[color:var(--neutral-900)]",
                    "outline-none transition",
                    "hover:bg-[color-mix(in_srgb,var(--brand-surface),transparent_0%)]",
                    "focus-visible:shadow-[0_0_0_3px_var(--focus-ring)]"
                  )}
                >
                  <HiChevronLeft size={18} aria-hidden="true" />
                </button>

                <button
                  type="button"
                  onClick={onNext}
                  aria-label="Siguiente imagen"
                  className={cn(
                    "absolute right-4 top-1/2 -translate-y-1/2",
                    "grid h-11 w-11 place-items-center rounded-full",
                    "border border-[color:var(--neutral-200)] bg-[color:var(--brand-surface)]",
                    "text-[color:var(--neutral-900)]",
                    "outline-none transition",
                    "hover:bg-[color-mix(in_srgb,var(--brand-surface),transparent_0%)]",
                    "focus-visible:shadow-[0_0_0_3px_var(--focus-ring)]"
                  )}
                >
                  <HiChevronRight size={18} aria-hidden="true" />
                </button>

                {/* Dots */}
                <div
                  className={cn(
                    "absolute bottom-4 left-1/2 -translate-x-1/2",
                    "flex items-center gap-2 rounded-full",
                    "border border-[color:var(--neutral-200)] bg-[color:var(--brand-surface)] px-3 py-2"
                  )}
                  aria-label="Indicador de imágenes"
                >
                  {images.map((_, i) => (
                    <button
                      key={`dot-${i}`}
                      type="button"
                      onClick={() => setActive(i)}
                      aria-label={`Ir a la imagen ${i + 1}`}
                      className={cn(
                        "h-2.5 w-2.5 rounded-full transition",
                        i === active
                          ? "bg-[color:var(--brand-blue-500)]"
                          : "bg-[color-mix(in_srgb,var(--neutral-900),transparent_80%)] hover:bg-[color-mix(in_srgb,var(--neutral-900),transparent_65%)]",
                        "outline-none focus-visible:shadow-[0_0_0_3px_var(--focus-ring)]"
                      )}
                    />
                  ))}
                </div>
              </>
            ) : null}
          </div>

          {/* Caption sutil */}
          {hasMany ? (
            <div className="mt-3 flex items-center justify-between text-caption text-muted">
              <span>
                {active + 1} / {images.length}
              </span>
              <span className="hidden sm:inline">Haz clic en las miniaturas para cambiar</span>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
