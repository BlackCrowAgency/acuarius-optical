import { z } from "zod";

export const clienteItemSchema = z.object({
  name: z.string().min(1),
  src: z.string().refine((v) => v.startsWith("/") || /^https?:\/\//.test(v), {
    message: "src must be an internal path or absolute URL",
  }),
});

export const clientesSchema = z.object({
  kind: z.literal("clientes"),
  title: z.string().min(1),
  subtitle: z.string().min(1),
  logos: z.array(clienteItemSchema).min(1),
});

export type ClientesContent = z.infer<typeof clientesSchema>;
export type ClienteItem = z.infer<typeof clienteItemSchema>;
