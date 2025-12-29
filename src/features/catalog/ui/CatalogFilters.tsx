// src/features/catalog/ui/CatalogFilters.tsx
"use client";

import { useMemo, useState, useRef, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { IoCheckmark, IoClose, IoChevronDown, IoFilter } from "react-icons/io5";
import { cn } from "@/utils/cn";

type Brand = {
  name: string;
  logo: string;
};

type Props = {
  brands: Brand[];
};

function parseSelectedBrands(sp: ReturnType<typeof useSearchParams>) {
  const raw = sp.get("brand");
  if (!raw) return [];
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

export function CatalogFilters({ brands }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();
  
  // Estado para controlar la apertura del menú en móvil
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const selected = useMemo(() => parseSelectedBrands(sp), [sp]);
  const hasFilters = selected.length > 0;

  // Cierra el menú si se hace click fuera (Opcional, mejora UX)
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function setBrands(next: string[]) {
    const params = new URLSearchParams(sp.toString());
    if (next.length === 0) params.delete("brand");
    else params.set("brand", next.join(","));
    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }

  function toggleBrand(name: string) {
    const isOn = selected.includes(name);
    const next = isOn ? selected.filter((b) => b !== name) : [...selected, name];
    setBrands(next);
  }

  // Texto dinámico para el selector
  const selectorLabel = hasFilters 
    ? `${selected.length} Marcas seleccionadas` 
    : "Todas las marcas";

  return (
    <>
      {/* ============================================================
          VISTA MOBILE / TABLET (< lg)
          Diseño "Selector Dropdown" (Estilo Menú Nativo/Select)
         ============================================================ */}
      <div className="lg:hidden mb-8 relative z-30" ref={menuRef}>
        
        {/* Cabecera / Label */}
        <div className="flex items-center justify-between mb-2 px-1">
          <label className="text-[11px] font-bold uppercase tracking-widest text-neutral-500 flex items-center gap-1.5">
            <IoFilter /> Filtrar
          </label>
          
          {hasFilters && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setBrands([]);
              }}
              className="text-[11px] font-bold text-rose-500 uppercase tracking-wide"
            >
              Limpiar
            </button>
          )}
        </div>

        {/* 1. EL SELECTOR (Botón Principal) */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "relative flex w-full items-center justify-between rounded-xl border px-4 py-3.5 text-left shadow-sm transition-all duration-200 active:scale-[0.99]",
            isOpen 
              ? "border-[var(--brand-blue-500)] ring-1 ring-[var(--brand-blue-500)] bg-white" 
              : "border-neutral-200 bg-white hover:border-neutral-300",
            hasFilters && !isOpen && "border-[var(--brand-blue-500)] bg-[var(--brand-blue-50)]/30 text-[var(--brand-blue-700)]"
          )}
        >
          <div className="flex flex-col leading-none">
            <span className={cn("text-sm font-semibold", hasFilters ? "text-[var(--brand-blue-700)]" : "text-neutral-700")}>
              {selectorLabel}
            </span>
            {hasFilters && !isOpen && (
              <span className="mt-1 text-[10px] text-neutral-500 truncate max-w-[200px]">
                {selected.join(", ")}
              </span>
            )}
          </div>

          <IoChevronDown 
            size={18} 
            className={cn(
              "text-neutral-400 transition-transform duration-300",
              isOpen && "rotate-180 text-[var(--brand-blue-500)]"
            )} 
          />
        </button>

        {/* 2. EL MENÚ DESPLEGABLE (Dropdown) */}
        {/* Renderizado condicional o CSS transition */}
        <div 
          className={cn(
            "absolute left-0 right-0 top-full mt-2 origin-top rounded-xl border border-neutral-100 bg-white shadow-xl shadow-neutral-200/50 transition-all duration-200 overflow-hidden",
            isOpen 
              ? "opacity-100 scale-100 translate-y-0" 
              : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
          )}
        >
          <div className="max-h-[300px] overflow-y-auto custom-scrollbar p-2">
            {/* Opción "Todos" */}
            <button
              onClick={() => {
                setBrands([]);
                setIsOpen(false);
              }}
              className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-left hover:bg-neutral-50 transition-colors"
            >
              <span className={cn("text-sm font-medium", !hasFilters ? "text-neutral-900" : "text-neutral-500")}>
                Todas
              </span>
              {!hasFilters && <IoCheckmark className="text-neutral-900" />}
            </button>

            <div className="h-px w-full bg-neutral-100 my-1" />

            {/* Lista de Marcas */}
            {brands.map((b) => {
              const active = selected.includes(b.name);
              return (
                <button
                  key={b.name}
                  onClick={() => toggleBrand(b.name)}
                  className={cn(
                    "flex w-full items-center justify-between rounded-lg px-3 py-3 text-left transition-colors",
                    active ? "bg-[var(--brand-blue-50)]" : "hover:bg-neutral-50"
                  )}
                >
                  <span className={cn("text-sm", active ? "font-semibold text-[var(--brand-blue-700)]" : "text-neutral-700")}>
                    {b.name}
                  </span>
                  
                  {/* Checkbox Simulado */}
                  <div className={cn(
                    "h-5 w-5 rounded border flex items-center justify-center transition-colors",
                    active 
                      ? "bg-[var(--brand-blue-500)] border-[var(--brand-blue-500)] text-white" 
                      : "border-neutral-300 bg-white"
                  )}>
                    {active && <IoCheckmark size={12} />}
                  </div>
                </button>
              );
            })}
          </div>
          
          {/* Footer del Dropdown (Opcional: Botón Cerrar) */}
          <div className="border-t border-neutral-100 bg-neutral-50 p-2 text-center">
            <button 
              onClick={() => setIsOpen(false)}
              className="w-full rounded-lg bg-neutral-900 py-2.5 text-xs font-bold text-white shadow-sm active:scale-95 transition-transform"
            >
              LISTO
            </button>
          </div>
        </div>
      </div>

      {/* ============================================================
          VISTA DESKTOP (>= lg)
          Sidebar Sticky Vertical (Diseño Profesional)
         ============================================================ */}
      <aside className="hidden lg:block sticky top-28 w-full max-w-xs">
        <div className="rounded-2xl border border-neutral-100 bg-white p-6 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
          <div className="flex items-center justify-between border-b border-neutral-100 pb-4 mb-4">
            <div>
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-neutral-800">
                Marcas
              </h3>
              {hasFilters ? (
                <p className="mt-1 text-xs font-medium text-[var(--brand-blue-600)] animate-pulse">
                  {selected.length} seleccionada{selected.length !== 1 ? 's' : ''}
                </p>
              ) : (
                <p className="mt-1 text-xs text-neutral-400">Selecciona para filtrar</p>
              )}
            </div>

            {hasFilters && (
              <button
                type="button"
                onClick={() => setBrands([])}
                className="group flex h-7 w-7 items-center justify-center rounded-full bg-neutral-100 text-neutral-500 transition-all hover:bg-rose-100 hover:text-rose-600"
                title="Limpiar filtros"
              >
                <IoClose size={16} />
              </button>
            )}
          </div>

          <div className="flex flex-col gap-1.5 max-h-[60vh] overflow-y-auto pr-1 custom-scrollbar">
            {brands.map((b) => {
              const active = selected.includes(b.name);

              return (
                <button
                  key={b.name}
                  type="button"
                  onClick={() => toggleBrand(b.name)}
                  className={cn(
                    "group relative flex w-full items-center justify-between rounded-xl px-3 py-3 text-left transition-all duration-200",
                    active
                      ? "bg-[var(--brand-blue-50)] text-[var(--brand-blue-700)] ring-1 ring-[var(--brand-blue-200)]"
                      : "bg-transparent text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-all duration-200",
                        active
                          ? "border-[var(--brand-blue-500)] bg-[var(--brand-blue-500)] text-white shadow-sm"
                          : "border-neutral-300 bg-white group-hover:border-[var(--brand-blue-400)]"
                      )}
                    >
                      <IoCheckmark 
                        size={12} 
                        className={cn("transition-transform duration-200", active ? "scale-100" : "scale-0")} 
                      />
                    </div>
                    <span className={cn("text-sm", active ? "font-bold" : "font-medium")}>
                      {b.name}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </aside>
    </>
  );
}