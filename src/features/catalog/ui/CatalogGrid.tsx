import { CatalogCard } from "./CatalogCard";

type Item = {
  slug: string;
  name: string;
  image: string;
  description?: string;
  brandLogo?: string;
};

type Props = {
  categoryKey: string;
  items: Item[];
};

export default function CatalogGrid({ categoryKey, items }: Props) {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => (
        <CatalogCard
          key={item.slug}
          href={`/${categoryKey}/${item.slug}`}
          title={item.name}
          image={item.image}
          subtitle={item.description}
          brandLogoSrc={item.brandLogo}
        />
      ))}
    </div>
  );
}
