// src/ui/Button/index.tsx
import * as React from "react";
import { cn } from "@/utils/cn";

type Variant = "primary" | "secondary" | "ghost" | "link" | "cta";
type Size = "sm" | "md" | "lg";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  loading?: boolean;
  withDot?: boolean; // punto blanco a la izquierda (solo CTA)
  asChild?: boolean;
}

const base = [
  "inline-flex items-center justify-center select-none",
  "font-semibold transition-colors",
  "focus:outline-none",
  "focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]",
  "disabled:opacity-50 disabled:pointer-events-none",
].join(" ");

const variantMap: Record<Variant, string> = {
  primary:
    "rounded-md bg-[var(--brand)] text-[var(--brand-foreground)] hover:bg-[var(--brand-muted)]",
  secondary:
    "rounded-md bg-[var(--surface-muted)] text-[var(--text)] hover:bg-[var(--surface-raised)] border border-[var(--border)]",
  ghost:
    "rounded-md bg-transparent text-[var(--text)] hover:bg-[var(--surface-muted)]",
  link:
    "rounded-none bg-transparent underline underline-offset-4 text-[var(--brand)] hover:opacity-80",
  // CTA: píldora naranja (radio controlado por tamaño; NO rounded-full)
  cta: [
    "bg-[var(--brand-orange-500)] text-[var(--text-on-colored)]",
    "shadow-[0_8px_24px_rgb(255_111_0/0.25)]",
  ].join(" "),
};

// Alturas + paddings (NO toques lg: queda igual que tu versión)
const sizeMap: Record<Size, string> = {
  sm: "h-10 px-5 text-[length:var(--text-body-sm)] gap-2", // compacto y legible
  md: "h-12 px-7 text-[length:var(--text-body)] gap-3",    // proporción intermedia
  lg: "h-[52px] px-8 text-[length:var(--text-body-sm)] gap-2", // <- SIN CAMBIOS
};

// Radio específico por tamaño para CTA (menos redondeado que full)
// (Mantenemos tu lg y equilibramos sm/md para que se vean como el lg)
const radiusCtaBySize: Record<Size, string> = {
  sm: "rounded-[18px]",
  md: "rounded-[22px]",
  lg: "rounded-[22px]", // <- SIN CAMBIOS
};

// Dot por tamaño (cuando se usa asChild) para que el punto quede bien proporcionado
const dotPseudoBySize: Record<Size, string> = {
  sm: "pl-6 before:mr-2",
  md: "pl-7 before:mr-3",
  lg: "pl-8 before:mr-3",
};
const dotPseudoBase =
  "before:content-[''] before:inline-block before:align-middle before:size-2 before:rounded-full before:bg-[var(--text-on-colored)]";

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      fullWidth,
      loading,
      disabled,
      asChild,
      withDot,
      children,
      onClick,
      type,
      ...props
    },
    ref
  ) => {
    const classes = cn(
      base,
      variantMap[variant],
      sizeMap[size],
      variant === "cta" ? radiusCtaBySize[size] : "",
      fullWidth && "w-full",
      loading && "cursor-wait",
      withDot &&
        variant === "cta" &&
        asChild &&
        cn(dotPseudoBase, dotPseudoBySize[size]),
      className
    );

    // asChild: <Button asChild><Link .../></Button>
    if (asChild && React.isValidElement(children)) {
      const child = children as React.ReactElement<any>;
      const mergedOnClick = (e: any) => {
        onClick?.(e);
        child.props?.onClick?.(e);
      };
      return React.cloneElement(child, {
        className: cn(classes, child.props?.className),
        onClick: mergedOnClick,
        "data-variant": variant,
        "data-size": size,
        "data-loading": loading ? "" : undefined,
        "aria-busy": loading || undefined,
        ...(disabled || loading ? { "aria-disabled": true, tabIndex: -1 } : {}),
      } as any);
    }

    // Por defecto: <button>
    return (
      <button
        ref={ref}
        className={classes}
        disabled={disabled || loading}
        onClick={onClick}
        type={type ?? "button"}
        data-variant={variant}
        data-size={size}
        data-loading={loading ? "" : undefined}
        aria-busy={loading || undefined}
        {...props}
      >
        {/* Dot real cuando NO es asChild */}
        {withDot && variant === "cta" && !asChild && (
          <span
            aria-hidden
            className="inline-block size-2 rounded-full bg-[var(--text-on-colored)] mr-3"
          />
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
export type { Variant as ButtonVariant, Size as ButtonSize };
