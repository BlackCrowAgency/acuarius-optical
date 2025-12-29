import type { ReactNode } from "react";
import Header from "@/layout/Header";
import BottomHeader from "@/layout/BottomHeader";
import { mapHeaderContent } from "@/layout/Header/content/header.mapper";
import home from "@/content/pages/home.json" assert { type: "json" };
import "@/styles/catalog-category.css";

const headerProps = mapHeaderContent((home as any).header);

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header {...headerProps} />
      <main id="content" className="pt-0">
        {children}
      </main>

      {/* ✅ BottomHeader con logo Logovol1 y enlaces del diseño */}
      <BottomHeader nav={headerProps.nav} cta={headerProps.cta} appearRatio={0.35} />
    </>
  );
}
