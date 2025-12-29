// src/ui/Container/index.tsx
import { forwardRef } from "react";
import type { HTMLAttributes } from "react";
import { cn } from "@/utils/cn";

type Max = "md" | "lg" | "xl" | "2xl" | "3xl" | "fluid";
type Gutter = "none" | "xxs" | "xs" | "sm" | "md" | "lg";
type Align = "center" | "left" | "right";

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  max?: Max;        // controla ancho máximo
  gutter?: Gutter;  // controla separación lateral
  align?: Align;    // controla alineación horizontal
  /** atajo: ancho fluido + sin gutter + alineado a la izquierda */
  fullBleed?: boolean;
}

const MAX_MAP: Record<Max, string> = {
  md: "max-w-5xl",
  lg: "max-w-6xl",
  xl: "max-w-7xl",
  "2xl": "max-w-[90rem]",
  "3xl": "max-w-screen-2xl",
  fluid: "max-w-none",
};

const GUTTER_MAP: Record<Gutter, string> = {
  none: "px-0",
  xxs: "px-1 sm:px-2 lg:px-3",
  xs: "px-2 sm:px-3 lg:px-4",
  sm: "px-3 sm:px-4 lg:px-6",
  md: "px-4 sm:px-6 lg:px-8",
  lg: "px-5 sm:px-8 lg:px-12",
};

const ALIGN_MAP: Record<Align, string> = {
  center: "mx-auto",
  left: "mr-auto",
  right: "ml-auto",
};

const Container = forwardRef<HTMLDivElement, ContainerProps>(function Container(
  { className, children, max = "2xl", gutter = "md", align = "center", fullBleed = false, ...props },
  ref,
) {
  const _max = fullBleed ? "fluid" : max;
  const _gutter = fullBleed ? "none" : gutter;
  const _align = fullBleed ? "left" : align;

  return (
    <div
      ref={ref}
      className={cn("w-full", ALIGN_MAP[_align], MAX_MAP[_max], GUTTER_MAP[_gutter], className)}
      {...props}
    >
      {children}
    </div>
  );
});

export default Container;
