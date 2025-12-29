import type { z } from "zod";
import { faqSchema } from "@/content/schemas/faq.schema";

export type FaqContent = z.infer<typeof faqSchema>;

export type FaqUiProps = {
  id: string;
  title: string;
  subtitle?: string;
  items: {
    id: string;
    question: string;
    answer: string;
  }[];
  ctaLabel?: string;
  ctaEmail?: string;
};

export function mapFaqToUiProps(raw: unknown): FaqUiProps {
  const parsed = faqSchema.parse(raw);

  const safeTitle = (parsed.title ?? "").trim() || "FAQ’s";
  const safeSubtitle = parsed.subtitle?.trim();

  return {
    id: parsed.id,
    title: safeTitle,
    subtitle: safeSubtitle,
    items: parsed.items.map((item) => ({
      id: item.id,
      question: item.question.trim(),
      answer: item.answer.trim(),
    })),
    ctaLabel: parsed.cta?.label,
    ctaEmail: parsed.cta?.email,
  };
}
