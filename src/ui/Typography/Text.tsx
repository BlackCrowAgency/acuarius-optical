import type { ElementType, HTMLAttributes, ReactNode } from "react";
import { cn } from "@/utils/cn";

type TextSize = "body-sm" | "body" | "body-lg" | "lead" | "caption" | "eyebrow";
type Tone = "default" | "muted" | "danger" | "success" | "warning";
type Align = "left" | "center" | "right";
type Weight = "normal" | "medium" | "semibold";

export interface TextProps extends Omit<HTMLAttributes<HTMLParagraphElement>, "children"> {
  as?: ElementType;
  children?: ReactNode;
  size?: TextSize;
  tone?: Tone;
  align?: Align;
  weight?: Weight;
  className?: string;
}

const sizeMap: Record<TextSize, string> = {
  "body-sm": "text-body-sm leading-body-sm",
  body: "text-body leading-body",
  "body-lg": "text-body-lg leading-body-lg",
  lead: "text-lead leading-lead",
  caption: "text-caption leading-caption",
  eyebrow: "eyebrow", // ya define font, uppercase y tracking
};

// ⚠️ Nada de `text-*` para tono; usamos propiedades CSS para no colisionar con el tamaño.
const toneMap: Record<Tone, string> = {
  default: "", // hereda el color del padre
  // Usa underscores para espacios en arbitrary values (Tailwind v4)
  muted: "[color:color-mix(in_srgb,var(--brand-text),transparent_20%)]",
  danger: "[color:var(--status-danger)]",
  success: "[color:var(--status-success)]",
  warning: "[color:var(--status-warning)]",
};

const alignMap: Record<Align, string> = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

const weightMap: Record<Weight, string> = {
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
};

export function Text({
  as: As = "p",
  children,
  size = "body",
  tone = "default",
  align = "left",
  weight = "normal",
  className,
  ...rest
}: TextProps) {
  return (
    <As
      className={cn(
        sizeMap[size],        // tamaño/leading (tokens)
        toneMap[tone],        // color como propiedad (no colisiona)
        alignMap[align],
        weightMap[weight],
        className,
      )}
      {...rest}
    >
      {children}
    </As>
  );
}

export default Text;
