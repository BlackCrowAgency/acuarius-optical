import { CatalogDetailPage } from "@/features/catalog/ui/CatalogDetailPage";

type Props = { params: Promise<{ slug: string }> };

export default async function Page({ params }: Props) {
  const { slug } = await params;
  return <CatalogDetailPage categoryKey="biseladoras" slug={slug} />;
}
