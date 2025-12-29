import type { ElementType, HTMLAttributes, ReactNode } from "react";
import { cn } from "@/utils/cn";

type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
type Align = "left" | "center" | "right";
type Weight = "normal" | "medium" | "semibold" | "bold";

export interface HeadingProps extends Omit<HTMLAttributes<HTMLHeadingElement>, "children"> {
  as?: ElementType;
  children?: ReactNode;
  level?: HeadingLevel;
  align?: Align;
  weight?: Weight;
  className?: string;
}

const levelMap: Record<HeadingLevel, string> = {
  h1: "text-h1 leading-h1 tracking-h1",
  h2: "text-h2 leading-h2 tracking-h2",
  h3: "text-h3 leading-h3",
  h4: "text-h4 leading-h4",
  h5: "text-h5 leading-h5",
  h6: "text-h6 leading-h6",
};

const weightMap = {
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
} as const;

const alignMap = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
} as const;

export function Heading({
  as: As = "h2",
  children,
  level = "h2",
  align = "left",
  weight = "semibold",
  className,
  ...rest
}: HeadingProps) {
  return (
    <As
      className={cn(
        "font-heading",
        levelMap[level],
        weightMap[weight],
        alignMap[align],
        "text-balance",
        className,
      )}
      {...rest}
    >
      {children}
    </As>
  );
}

export default Heading;
