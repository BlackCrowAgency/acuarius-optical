// src/ui/Section/index.tsx
import { forwardRef } from "react";
import type { HTMLAttributes, ElementType } from "react";
import { cn } from "@/utils/cn";

type Spacing = "none" | "sm" | "md" | "lg" | "xl";
type ContainerKind = "default" | "wide" | "full";

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  spacing?: Spacing;         // ritmo vertical
  container?: ContainerKind; // wrapper horizontal interno
}

const SPACING_MAP: Record<Spacing, string> = {
  none: "py-0",
  sm: "py-6 md:py-8",
  md: "py-10 md:py-10",
  lg: "py-16 md:py-24",
  xl: "py-24 md:py-32",
};

const WRAPPER_MAP: Record<ContainerKind, string> = {
  default: "mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8",
  wide: "mx-auto w-full max-w-[90rem] px-4 sm:px-6 lg:px-8",
  full: "w-full", // sin centrado ni gutters → deja el control al <Container />
};

const Section = forwardRef<HTMLElement, SectionProps>(function Section(
  { as: Tag = "section", spacing = "md", container = "default", className, children, ...props },
  ref,
) {
  return (
    <Tag ref={ref} className={cn(SPACING_MAP[spacing], className)} {...props}>
      <div className={WRAPPER_MAP[container]}>{children}</div>
    </Tag>
  );
});

export default Section;
