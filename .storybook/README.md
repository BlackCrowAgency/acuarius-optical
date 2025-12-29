# Storybook (UI Catalog)

## Scripts
- `pnpm storybook` — levanta Storybook en modo dev
- `pnpm build-storybook` — genera la build estática

## Estructura
- `.storybook/main.ts` — rutas de stories y addons
- `.storybook/preview.ts` — decorators globales, parámetros (a11y, viewport, controls)
- `.storybook/decorators/Theme.tsx` — toggler light/dark (`.dark` + `data-theme`)
- `.storybook/mock/content/*.json` — datos de ejemplo para stories "FromContent"

## Convenciones
- Coloca las stories junto a cada componente: `*.stories.tsx`
- Usa `@/` para imports (alias resuelto en `main.ts`)
- No importes `server/seo/core/config/app/api/**` en stories
