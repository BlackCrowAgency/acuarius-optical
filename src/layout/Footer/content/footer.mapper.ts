import type { z } from "zod";
import { footerSchema } from "@/content/schemas/footer.schema";

export type FooterContent = z.infer<typeof footerSchema>;

export type FooterProps = {
  logo: {
    src: string;
    alt: string;
  };
  title: string;
  description: string;
  email: string;
  address: string[];
  socials: {
    href: string;
    label: string;
    icon?: string;
  }[];
  connectLabel: string;
  visitLabel: string;
  copyrightLabel: string;
  backToTop?: {
    label: string;
    href: string;
  };
  form: {
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    companyLabel: string;
    companyPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    submitLabel: string;
  };
};

export function mapFooterContent(raw: unknown): FooterProps {
  const parsed = footerSchema.parse(raw);

  return {
    logo: parsed.logo,
    title: parsed.title,
    description: parsed.description,
    email: parsed.email,
    address: parsed.address,
    socials: parsed.socials,
    connectLabel: parsed.connectLabel ?? "(Connect)",
    visitLabel: parsed.visitLabel ?? "(Visit Us)",
    copyrightLabel: parsed.copyrightLabel,
    backToTop: parsed.backToTop,
    form: parsed.form,
  };
}
