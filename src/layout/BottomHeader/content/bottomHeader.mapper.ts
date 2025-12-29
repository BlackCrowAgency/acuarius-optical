// src/layout/BottomHeader/content/bottomHeader.mapper.ts
export type BottomHeaderNavItem = {
  kind: "link";
  key: string;
  label: string;
  href: string;
  external?: boolean;
};

export type BottomHeaderDropdownItem = {
  kind: "dropdown";
  key: string;
  label: string;
  items: Array<{
    key: string;
    label: string;
    href: string;
  }>;
};

export type BottomHeaderItem = BottomHeaderNavItem | BottomHeaderDropdownItem;

export type BottomHeaderProps = {
  showAfterSelector?: string; // "#hero"
  logo: {
    src: string;
    alt: string;
    href: string;
    ariaLabel?: string;
  };
  items: BottomHeaderItem[];
  cta: {
    label: string;
    href: string; // "/#footer"
    ariaLabel?: string;
  };
};

export function mapBottomHeaderContent(input: unknown): BottomHeaderProps {
  const data = input as BottomHeaderProps;

  return {
    showAfterSelector: data?.showAfterSelector ?? "#hero",
    logo: data.logo,
    items: data.items,
    cta: data.cta,
  };
}
