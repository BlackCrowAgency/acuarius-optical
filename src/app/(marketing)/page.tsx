// src/app/(marketing)/page.tsx
import type { ComponentType, ReactNode } from "react";
import { getLandingComposition } from "@/features/landing/content/landing.composition";
import type { SectionItem } from "@/features/landing/content/landing.composition";

export default function Page() {
  const composition: SectionItem[] = getLandingComposition();

  const nodes: ReactNode[] = [];

  for (let i = 0; i < composition.length; i++) {
    const { UI: Cmp, props, key } = composition[i];

    // ✅ key siempre única (aunque el generator repita)
    const safeKey = `${key ?? "section"}-${i}`;

    const isServicios = (key ?? "").startsWith("servicios-");
    const next = composition[i + 1];
    const nextIsMarcas = (next?.key ?? "").startsWith("marcas-");

    if (isServicios && nextIsMarcas && next) {
      const MarcasCmp = next.UI as ComponentType<any>;

      nodes.push(
        <div key={`band-${safeKey}`} className="bg-band-shared">
          <Cmp {...props} />
          <MarcasCmp {...next.props} />
        </div>
      );

      i++;
      continue;
    }

    const Component = Cmp as ComponentType<any>;
    nodes.push(<Component key={safeKey} {...props} />);
  }

  return <>{nodes}</>;
}
