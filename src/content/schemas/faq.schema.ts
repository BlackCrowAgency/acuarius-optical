import { z } from "zod";

export const faqItemSchema = z.object({
  id: z.string().min(1),
  question: z.string().min(1),
  answer: z.string().min(1),
});

export const faqSchema = z.object({
  kind: z.literal("faq"),
  id: z.string().min(1).default("faq"),
  title: z.string().optional(),
  subtitle: z.string().optional(),
  items: z.array(faqItemSchema).min(1),
  cta: z
    .object({
      label: z.string(),
      email: z.string().email(),
    })
    .optional(),
});

export type FaqContent = z.infer<typeof faqSchema>;
export type FaqItem = z.infer<typeof faqItemSchema>;
