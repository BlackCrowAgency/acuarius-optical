// src/features/catalog/ui/CatalogCard.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Typography } from "@/ui";
import { cn } from "@/utils/cn";
import { FiArrowUpRight } from "react-icons/fi";

export type CatalogCardProps = {
  href: string;
  title: string;
  image: string;
  brandLogoSrc?: string;
  subtitle?: string;
  badgeLabel?: string; // ✅ opcional (como el pill “Sleep Therapy Solution”)
};

function normalizeHref(input: string) {
  const raw = String(input ?? "").trim();
  const withSlash = raw.startsWith("/") ? raw : `/${raw}`;
  const cleaned = withSlash.replace(/\/{2,}/g, "/");
  return encodeURI(cleaned);
}

export function CatalogCard({
  href,
  title,
  image,
  brandLogoSrc,
  subtitle,
  badgeLabel,
}: CatalogCardProps) {
  const safeHref = normalizeHref(href);

  return (
    <motion.article
      variants={{
        hidden: { opacity: 0, y: 16, scale: 0.97 },
        show: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { type: "spring", stiffness: 110, damping: 18 },
        },
      }}
      className="h-full"
    >
      <motion.div initial="rest" whileHover="hover" animate="rest" className="h-full">
        <Link
          href={safeHref}
          prefetch
          className={cn(
            "group relative flex h-full flex-col rounded-2xl bg-[var(--brand-surface)]",
            "shadow-[var(--elevation-sm)] transition-shadow duration-300 hover:shadow-[var(--elevation-md)]",
            "outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]",
            "overflow-hidden",
          )}
          aria-label={`Ver ${title}`}
        >
          {/* ✅ Badge (opcional) */}
          {badgeLabel && (
            <div className="absolute left-5 top-5 z-20">
              <span
                className={cn(
                  "inline-flex items-center rounded-full",
                  "bg-white/90",
                  "px-4 py-2",
                  "text-body-xs font-medium",
                  "[color:var(--brand-blue-700)]",
                )}
              >
                {badgeLabel}
              </span>
            </div>
          )}

          {/* ✅ Hover CTA circular (como la referencia) */}
          <motion.div
            aria-hidden="true"
            variants={{
              rest: { opacity: 0, scale: 0.92, y: 6 },
              hover: { opacity: 1, scale: 1, y: 0 },
            }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className={cn(
              "pointer-events-none absolute left-1/2 top-[46%] z-30",
              "-translate-x-1/2 -translate-y-1/2",
            )}
          >
            <div
              className={cn(
                "grid h-12 w-12 place-items-center rounded-full",
                "bg-white",
                "shadow-[0_14px_30px_rgba(0,0,0,0.18)]",
                "[color:var(--brand-blue-900)]",
              )}
            >
              <FiArrowUpRight className="h-4 w-4" />
            </div>
          </motion.div>

          {/* ✅ Fade overlay suave para que el botón destaque */}
          <motion.div
            aria-hidden="true"
            variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
            transition={{ duration: 0.18 }}
            className={cn("pointer-events-none absolute inset-0 z-10", "bg-black/5")}
          />

          <div className="relative px-8 pt-10 pb-0">
            <div className="absolute inset-x-0 top-0 h-3/4 bg-[var(--neutral-200)]" />

            <div className="relative flex justify-center">
              <motion.div
                variants={{
                  rest: { scale: 1.3, y: 0 },
                  hover: { scale: 1.34, y: -2 },
                }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
                className="relative aspect-[4/3] w-full max-w-[32rem] -mb-6"
              >
                <Image
                  src={image}
                  alt={title}
                  fill
                  sizes="(min-width:1024px) 22vw, (min-width:768px) 40vw, 90vw"
                  className="object-contain drop-shadow-lg"
                />
              </motion.div>
            </div>
          </div>

          <div className="relative z-20 flex items-center justify-between gap-1 bg-[var(--brand-surface)] px-8 pb-5 pt-6">
            <div className="min-w-0">
              <Typography.Heading
                as="h3"
                level="h5"
                weight="semibold"
                className="[color:var(--brand-blue-900)]"
              >
                {title}
              </Typography.Heading>

              {subtitle && (
                <Typography.Text size="body-sm" tone="muted" className="mt-1">
                  {subtitle}
                </Typography.Text>
              )}
            </div>

            {brandLogoSrc && (
              <div className="relative h-22 w-28 shrink-0">
                <Image
                  src={brandLogoSrc}
                  alt={`Marca de ${title}`}
                  fill
                  className="object-contain object-right"
                />
              </div>
            )}
          </div>
        </Link>
      </motion.div>
    </motion.article>
  );
}
