import { z } from "zod";

const subImage = z.object({
  src: z.string().min(1),
  alt: z.string().min(1).optional(),
});

const submenuItem = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
  image: subImage.optional(),
});

export const headerSchema = z.object({
  logo: z.object({
    src: z.string().min(1),
    alt: z.string().min(1),
  }),
  nav: z
    .array(
      z
        .object({
          label: z.string().min(1),
          href: z.string().min(1).optional(),
          chevron: z.enum(["down", "up"]).optional(),
          submenu: z.array(submenuItem).optional(),
        })
        .refine((n) => !!n.href || (n.submenu && n.submenu.length > 0), {
          message: "Cada item de navegación requiere href o submenu",
        }),
    )
    .min(1),
  cta: z
    .object({
      label: z.string().min(1),
      href: z.string().min(1),
      variant: z.enum(["solid", "outline", "ghost", "link"]).default("solid"),
    })
    .optional(),
  behavior: z
    .object({
      sticky: z.boolean().default(true),
      container: z.boolean().default(true),
    })
    .default({ sticky: true, container: true }),
});

export type HeaderContent = z.infer<typeof headerSchema>;
