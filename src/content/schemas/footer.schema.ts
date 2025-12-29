import { z } from "zod";

const logoSchema = z.object({
  src: z.string().min(1),
  alt: z.string().min(1),
});

const socialSchema = z.object({
  href: z.string().min(1),
  label: z.string().min(1),
  icon: z.string().optional(),
});

const backToTopSchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
});

const formSchema = z.object({
  nameLabel: z.string().min(1),
  namePlaceholder: z.string().min(1),
  emailLabel: z.string().min(1),
  emailPlaceholder: z.string().min(1),
  companyLabel: z.string().min(1),
  companyPlaceholder: z.string().min(1),
  messageLabel: z.string().min(1),
  messagePlaceholder: z.string().min(1),
  submitLabel: z.string().min(1),
});

export const footerSchema = z.object({
  logo: logoSchema,
  title: z.string().min(1),
  description: z.string().min(1),
  email: z.string().email(),
  address: z.array(z.string().min(1)).min(1),
  socials: z.array(socialSchema).min(1),
  connectLabel: z.string().optional(),
  visitLabel: z.string().optional(),
  copyrightLabel: z.string().min(1),
  backToTop: backToTopSchema.optional(),
  form: formSchema,
});

export type FooterContent = z.infer<typeof footerSchema>;
