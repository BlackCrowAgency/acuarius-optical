import { CatalogCategoryPage } from "@/features/catalog/ui/CatalogCategoryPage";

import Faq from "@/features/faq/ui";
import { mapFaqToUiProps } from "@/features/faq/content/faq.mapper";
import faqSection from "@/content/sections/faq.json" assert { type: "json" };

const faqProps = mapFaqToUiProps(faqSection as unknown);

export default function Page(props: {
  searchParams?:
    | Record<string, string | string[] | undefined>
    | Promise<Record<string, string | string[] | undefined>>;
}) {
  return (
    <>
      <CatalogCategoryPage
        categoryKey="equipos-oftalmologicos"
        searchParams={props.searchParams}
      />
      <Faq {...faqProps} />
    </>
  );
}
