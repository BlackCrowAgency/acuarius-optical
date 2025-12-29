// src/features/catalog/ui/CatalogDetailPage.tsx

import Link from "next/link";
import type { ReactNode } from "react";
import type { CatalogCategoryKey } from "@/content/catalog";
import {
  getCategoryOrNull,
  getProductBySlugOrNull,
  getProductsByCategory,
} from "@/content/catalog";
import { Section, Container, Typography } from "@/ui";
import { cn } from "@/utils/cn";

// --- IMPORTACIONES DE COMPONENTES ---
import { CatalogCard } from "./CatalogCard"; 
import { ProductImageGallery } from "@/features/catalog/ui/ProductImageGallery";

// --- IMPORTACIONES DE ICONOS ---
import {
  HiOutlineHome,
  HiChevronRight,
  HiOutlineDocumentArrowDown,
  HiOutlineChatBubbleLeftEllipsis,
  HiCheckBadge,
  HiOutlineCpuChip,
  HiOutlineBeaker,
  HiOutlineScale,
  HiArrowRight,
} from "react-icons/hi2";
import { FiArrowUpRight } from "react-icons/fi";

/* --- TYPES & UTILS --- */

type Props = {
  categoryKey: CatalogCategoryKey;
  slug: string;
};

type Spec = { label: string; value: string };

function findSpecValue(specs: Spec[], keywords: string[]) {
  const normalized = keywords.map((k) => k.toLowerCase());
  const hit = specs.find((s) => {
    const l = s.label.toLowerCase();
    return normalized.some((k) => l.includes(k));
  });
  return hit?.value;
}

/* --- MICRO COMPONENTS UI/UX --- */

function Breadcrumbs({
  items,
}: {
  items: { label: string; href: string; active?: boolean }[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-caption text-muted">
      <Link
        href="/"
        className="flex items-center text-muted transition-colors hover:text-[color:var(--neutral-900)]"
      >
        <HiOutlineHome size={16} />
      </Link>
      {items.map((item, idx) => (
        <div key={idx} className="flex items-center gap-2">
          <HiChevronRight size={12} className="text-muted/50 shrink-0" />
          <Link
            href={item.href}
            className={cn(
              "transition-colors whitespace-nowrap",
              item.active
                ? "font-medium text-[color:var(--neutral-900)] pointer-events-none"
                : "hover:text-[color:var(--neutral-900)]"
            )}
            aria-current={item.active ? "page" : undefined}
          >
            {item.label}
          </Link>
        </div>
      ))}
    </nav>
  );
}

function Badge({ children, tone = "neutral" }: { children: ReactNode, tone?: "neutral" | "brand" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider",
        tone === "brand"
          ? "bg-blue-50 text-blue-700 border border-blue-100"
          : "bg-gray-100 text-gray-600 border border-gray-200"
      )}
    >
      {children}
    </span>
  );
}

function FeatureGrid({ features }: { features: { icon: ReactNode; label: string; value: string }[] }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
      {features.map((f, i) => (
        <div
          key={i}
          className={cn(
            "group flex flex-col gap-3 rounded-xl border border-[color:var(--neutral-200)] p-4 transition-all",
            "bg-white hover:border-[color:var(--neutral-300)] hover:shadow-sm"
          )}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-50 text-gray-900 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
            {f.icon}
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-wider text-muted font-semibold">
              {f.label}
            </div>
            <div className="mt-0.5 text-sm font-medium text-[color:var(--neutral-900)] truncate">
              {f.value}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function TechnicalSpecsTable({ specs }: { specs: Spec[] }) {
  if (!specs.length) return null;
  return (
    <div className="overflow-hidden rounded-xl border border-[color:var(--neutral-200)] bg-white">
      <table className="w-full text-left text-sm">
        <tbody className="divide-y divide-[color:var(--neutral-200)]">
          {specs.map((s) => (
            <tr key={s.label} className="group hover:bg-gray-50 transition-colors">
              <td className="w-[40%] px-5 py-3.5 font-medium text-muted bg-gray-50/50">{s.label}</td>
              <td className="px-5 py-3.5 text-[color:var(--neutral-900)] font-medium">{s.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ActionButton({
  href,
  label,
  sublabel,
  variant = "primary",
  icon,
}: {
  href: string;
  label: string;
  sublabel?: string;
  variant?: "primary" | "secondary" | "outline";
  icon: ReactNode;
}) {
  const baseStyles = "relative flex w-full items-center gap-4 rounded-xl px-5 py-4 transition-all outline-none group text-left border";

  const variants = {
    primary: "bg-gray-900 border-gray-900 text-white hover:bg-black hover:shadow-lg hover:-translate-y-0.5",
    secondary: "bg-blue-600 border-blue-600 text-white hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/20 hover:-translate-y-0.5",
    outline: "bg-white border-gray-200 text-gray-900 hover:bg-gray-50 hover:border-gray-300",
  };

  return (
    <Link href={href} className={cn(baseStyles, variants[variant])}>
      <span className={cn(
        "grid h-10 w-10 place-items-center rounded-full text-current shrink-0",
        variant === "outline" ? "bg-gray-100" : "bg-white/20"
      )}>
        {icon}
      </span>
      <div className="flex flex-col min-w-0">
        <span className="font-semibold leading-tight truncate">{label}</span>
        {sublabel && <span className="text-[11px] opacity-80 truncate">{sublabel}</span>}
      </div>
      {variant !== "outline" && (
         <FiArrowUpRight className="absolute right-4 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-1" />
      )}
    </Link>
  );
}

/* --- MAIN PAGE COMPONENT --- */

export async function CatalogDetailPage({ categoryKey, slug }: Props) {
  const category = getCategoryOrNull(categoryKey);
  const product = await getProductBySlugOrNull(categoryKey, slug);

  // 404 State
  if (!category || !product) {
    return (
      // Forzamos pt-0 también aquí por si acaso
      <Section container="full" className="bg-gray-50 min-h-[60vh] grid place-items-center pt-0 pb-0">
        <Container className="text-center">
          <Typography.Heading level="h2">Producto no encontrado</Typography.Heading>
          <div className="mt-6">
            <Link href={`/${categoryKey}`} className="text-sm font-medium hover:underline text-blue-600">
              &larr; Volver al catálogo
            </Link>
          </div>
        </Container>
      </Section>
    );
  }

  // Data Extraction
  const heroSrc = product.heroImage ?? product.coverImage;
  const gallery = Array.isArray(product.gallery) ? product.gallery : [];
  const specs = Array.isArray(product.specs) ? product.specs : [];

  const kpiUso = findSpecValue(specs, ["uso"]) ?? "Clínico";
  const kpiTipo = findSpecValue(specs, ["tipo", "categoría"]) ?? "Equipo";
  const kpiPrecision = findSpecValue(specs, ["precisión"]) ?? "Alta";

  const related = getProductsByCategory(categoryKey)
    .filter((p) => p.slug !== slug)
    .slice(0, 3)
    .map((p) => ({
      href: `/${categoryKey}/${p.slug}`,
      title: p.name,
      image: p.coverImage,
      subtitle: p.shortDescription,
    }));

  const ctaTone = categoryKey === "biseladoras" ? "secondary" : "primary";

  return (
    // FIX: Aplicamos `pt-0` al Section para eliminar padding nativo del componente.
    <Section container="full" className="bg-white pt-0 pb-0 md:pt-0 md:pb-0">
      
      {/* CONTROL DE ESPACIADO:
        - pt-4 (Mobile): Suficiente para despegarse del header sin dejar hueco grande.
        - lg:pt-24 (Desktop): Aumentado (antes era 20) para compensar la eliminación del padding del Section y mantener el diseño pro.
      */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-4 pb-12 md:pt-10 md:pb-16 lg:pt-36 lg:pb-24">
        
        {/* 1. Breadcrumbs */}
        <div className="mb-4 md:mb-8 lg:mb-10">
          <Breadcrumbs
            items={[
              { label: "Catálogo", href: "/catalogo" },
              { label: category.title, href: `/${categoryKey}` },
              { label: product.name, href: "#", active: true },
            ]}
          />
        </div>

        {/* 2. Header Grid (Título + Badges) */}
        <div className="mb-8 lg:mb-14">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              {product.brand && <Badge tone="brand">{product.brand}</Badge>}
              <Badge>Disponible</Badge>
            </div>
            
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 text-balance">
              {product.name}
            </h1>
            
            {product.shortDescription && (
              <p className="mt-4 text-lg text-gray-500 max-w-3xl leading-relaxed text-balance">
                {product.shortDescription}
              </p>
            )}
        </div>

        {/* 3. Layout Principal (Grid Asimétrico) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          
          {/* === COLUMNA IZQUIERDA === */}
          <div className="lg:col-span-8 space-y-12 min-w-0">
            
            {/* Galería Wrapper */}
            <div className="w-full space-y-8">
               <div className={cn(
                 "rounded-2xl border border-gray-100 bg-white p-2 shadow-sm",
                 "[&_::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']" 
               )}>
                  <ProductImageGallery title={product.name} heroSrc={heroSrc} gallery={gallery} />
               </div>

               {/* Highlights */}
               <FeatureGrid 
                 features={[
                   { icon: <HiOutlineBeaker size={20} />, label: "Uso", value: kpiUso },
                   { icon: <HiOutlineCpuChip size={20} />, label: "Tecnología", value: kpiTipo },
                   { icon: <HiOutlineScale size={20} />, label: "Precisión", value: kpiPrecision },
                 ]}
               />
            </div>

            {/* Descripción */}
            {product.description && (
              <div className="prose prose-lg prose-gray max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-blue-600 hover:prose-a:text-blue-700">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Descripción General</h3>
                <div className="whitespace-pre-line text-gray-600 leading-relaxed">
                  {product.description}
                </div>
              </div>
            )}

            {/* Specs Table */}
            {specs.length > 0 && (
              <div>
                <div className="mb-6 pb-2 border-b border-gray-100 flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-900">Especificaciones Técnicas</h3>
                  <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Detalles</span>
                </div>
                <TechnicalSpecsTable specs={specs} />
              </div>
            )}
          </div>

          {/* === COLUMNA DERECHA (Sidebar) === */}
          <aside className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
            
            {/* CTA Card */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 md:p-8 shadow-xl shadow-gray-200/50">
              <div className="mb-8">
                 <h4 className="text-lg font-bold text-gray-900">¿Te interesa este equipo?</h4>
                 <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                   Obtén una cotización formal inmediata o descarga la ficha técnica.
                 </p>
              </div>

              <div className="flex flex-col gap-3">
                <ActionButton 
                  href="#quote" 
                  label="Solicitar Cotización" 
                  sublabel="Respuesta prioritaria"
                  variant={ctaTone === "secondary" ? "secondary" : "primary"}
                  icon={<HiOutlineChatBubbleLeftEllipsis size={20} />}
                />
                
                <ActionButton 
                  href="#datasheet" 
                  label="Descargar Ficha Técnica" 
                  sublabel="PDF Document"
                  variant="outline"
                  icon={<HiOutlineDocumentArrowDown size={20} />}
                />
              </div>

              {/* Signals */}
              <div className="mt-8 pt-6 border-t border-gray-100">
                <ul className="space-y-3">
                  {[
                    "Garantía directa de fábrica",
                    "Instalación y capacitación",
                    "Soporte técnico certificado"
                  ].map((text, i) => (
                    <li key={i} className="flex items-center gap-3 text-xs font-medium text-gray-500">
                      <HiCheckBadge className="text-green-500 shrink-0" size={16} />
                      {text}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Support Card */}
            <div className="rounded-xl bg-gray-50 p-6 border border-gray-100 text-center">
               <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Soporte</p>
               <p className="text-sm font-medium text-gray-900 mb-3">¿Tienes dudas técnicas?</p>
               <Link href="/contacto" className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline">
                 Hablar con un especialista <HiArrowRight size={14} />
               </Link>
            </div>
          </aside>
        </div>

        {/* 4. Footer Relacionados */}
        {related.length > 0 && (
          <div className="mt-24 pt-12 border-t border-gray-100">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
              <h3 className="text-2xl font-bold text-gray-900">Productos Similares</h3>
              <Link href={`/${categoryKey}`} className="group inline-flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-800">
                Ver todo {category.title} 
                <HiArrowRight className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {related.map((item) => (
                <CatalogCard
                  key={item.href}
                  {...item}
                />
              ))}
            </div>
          </div>
        )}

      </div>
    </Section>
  );
}