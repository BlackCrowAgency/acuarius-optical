import { clientesSchema, type ClientesContent } from "@/content/schemas/clientes.schema";

export type ClientesUiProps = {
  title: string;
  subtitle: string;
  logos: { name: string; src: string }[]; // fila de 5 (wrap en sm)
};

export function mapClientesContent(input: unknown): ClientesUiProps {
  const data: ClientesContent = clientesSchema.parse(input);

  const logos = data.logos
    .filter(Boolean)
    .slice(0, 5)
    .map((l) => ({ name: String(l.name), src: String(l.src) }));

  return {
    title: data.title,
    subtitle: data.subtitle,
    logos,
  };
}
