// src/features/faq/ui/Faq.tsx
"use client";

import { useCallback, useState } from "react";
import { LuPlus } from "react-icons/lu";
import { motion, type Variants } from "framer-motion";
import type { FaqUiProps } from "@/features/faq/content/faq.mapper";
import { Section, Container, Typography } from "@/ui";
import { cn } from "@/utils/cn";

type OpenId = string | null;

// --- Animation Config ---
const titleVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.21, 0.47, 0.32, 0.98], // Ease Out suave
    },
  },
};

export default function Faq({ id, title, items, ctaLabel, ctaEmail }: FaqUiProps) {
  const [openId, setOpenId] = useState<OpenId>(null);

  // IDs estables
  const sectionId = id || "faq";
  const headingId = `${sectionId}-heading`;

  const handleToggle = useCallback((itemId: string) => {
    setOpenId((current) => (current === itemId ? null : itemId));
  }, []);

  return (
    <Section
      id={sectionId}
      container="full"
      aria-labelledby={headingId}
      className="bg-[color:var(--surface-default)]"
    >
      <Container max="lg" gutter="none" className="py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-0">
        
        {/* TÍTULO ANIMADO */}
        <motion.div 
          className="mx-auto max-w-3xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }} // Se anima una sola vez al entrar en vista
          variants={titleVariants}
        >
          <Typography.Heading
            as="h2"
            id={headingId}
            className="text-center font-heading text-[length:var(--text-h2)] leading-[var(--leading-h2)] tracking-[var(--tracking-h2)]"
          >
            {title}
          </Typography.Heading>
        </motion.div>

        {/* LISTA FAQ (Sin cambios visuales) */}
        <div className="mt-10 md:mt-12 lg:mt-14">
          <ul className="border-y border-[color:var(--neutral-200)]">
            {items.map((item, index) => {
              const isOpen = openId === item.id;
              const contentId = `${sectionId}-item-${item.id}`;
              const buttonId = `${contentId}-button`;

              return (
                <li
                  key={item.id}
                  className={cn(
                    "relative border-t border-[color:var(--neutral-200)]",
                    index === 0 && "border-t-0"
                  )}
                >
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={contentId}
                    onClick={() => handleToggle(item.id)}
                    className={cn(
                      "group flex w-full items-center justify-between gap-6 py-5 md:py-6 lg:py-7",
                      "text-left transition-colors duration-300",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ring)] focus-visible:ring-offset-2"
                    )}
                  >
                    <Typography.Text
                      as="span"
                      className={cn(
                        "min-w-0 flex-1",
                        "text-[length:var(--text-lg)] font-medium text-[color:var(--text-primary)]",
                        "transition-colors duration-300",
                        "group-hover:text-[color:var(--brand-blue-600)]"
                      )}
                    >
                      {item.question}
                    </Typography.Text>

                    {/* Ícono + */}
                    <span
                      className={cn(
                        "inline-flex items-center justify-center",
                        "-m-2 p-2",
                        "transition-transform duration-300 ease-[cubic-bezier(.22,1,.36,1)]",
                        "text-[color:var(--brand-blue-600)]",
                        isOpen && "rotate-45"
                      )}
                      aria-hidden="true"
                    >
                      <span className="inline-flex h-7 w-7 items-center justify-center">
                        <LuPlus className="h-5 w-5" />
                      </span>
                    </span>
                  </button>

                  {/* Línea hover premium */}
                  <span
                    className={cn(
                      "pointer-events-none absolute inset-x-0 bottom-0 h-px",
                      "scale-x-0 bg-[color:var(--brand-blue-400)] transition-transform duration-300 origin-left",
                      "group-hover:scale-x-100"
                    )}
                  />

                  {/* RESPUESTA */}
                  <div
                    id={contentId}
                    role="region"
                    aria-labelledby={buttonId}
                    className={cn(
                      "grid transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(.22,1,.36,1)] motion-reduce:transition-none",
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    )}
                  >
                    <div className="overflow-hidden">
                      <div className="pb-5 pr-10 pt-1 md:pb-6 md:pr-20 lg:pb-7 lg:pr-32">
                        <Typography.Text as="p" className="text-[color:var(--text-muted)]">
                          {item.answer}
                        </Typography.Text>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        {/* CTA FINAL */}
        {ctaLabel && ctaEmail ? (
          <div className="mt-8 border-t border-[color:var(--neutral-200)] pt-6 md:mt-10 md:pt-8">
            <Typography.Text as="p" className="text-center text-[color:var(--text-muted)]">
              {ctaLabel}{" "}
              <a
                href={`mailto:${ctaEmail}`}
                className="font-medium text-[color:var(--brand-blue-600)] underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ring)] focus-visible:ring-offset-2"
              >
                {ctaEmail}
              </a>
            </Typography.Text>
          </div>
        ) : null}
      </Container>
    </Section>
  );
}