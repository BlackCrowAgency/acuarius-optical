import "@/styles/globals.css";
import "@/styles/hero.inverted.css";

import type { ReactNode } from "react";
import { Plus_Jakarta_Sans } from "next/font/google";

import LenisProvider from "@/core/providers/LenisProvider";

import Footer from "@/layout/Footer";
import { mapFooterContent } from "@/layout/Footer/content/footer.mapper";
import home from "@/content/pages/home.json" assert { type: "json" };

const titleFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
  variable: "--font-title",
});

const bodyFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-body",
});

function getFooterSection(): unknown | null {
  const sections = (home as any)?.sections;
  if (!Array.isArray(sections)) return null;

  const footer = sections.find((s: any) => s?.kind === "footer");
  return footer ?? null;
}

export default function RootLayout({ children }: { children: ReactNode }) {
  const footerSection = getFooterSection();

  return (
    <html lang="es" className={`${titleFont.variable} ${bodyFont.variable}`}>
      <body className="font-sans min-h-dvh bg-[var(--brand-surface)] text-[var(--brand-text)] antialiased">
        <LenisProvider>
          {children}

          {/* ✅ Footer global: aparece en toda la web */}
          {footerSection ? <Footer {...mapFooterContent(footerSection)} /> : null}
        </LenisProvider>
      </body>
    </html>
  );
}
