// .storybook/main.ts
import type { StorybookConfig } from "@storybook/nextjs-vite";
import tsconfigPaths from "vite-tsconfig-paths";

const config: StorybookConfig = {
  stories: [
    "../src/**/*.stories.@(ts|tsx|mdx)",
    "../src/**/?(*.)+(stories).@(ts|tsx|mdx)"
  ],
  staticDirs: ["../public"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-a11y"
    // Nota: Docs viene dentro de addon-essentials, no hace falta config extra.
  ],
  framework: {
    name: "@storybook/nextjs-vite",
    options: {}
  },
  // Quitar docs.autodocs: no es válido en SB 9
  viteFinal: async (cfg) => {
    cfg.plugins = [...(cfg.plugins ?? []), tsconfigPaths()];
    cfg.resolve = { ...(cfg.resolve ?? {}), dedupe: ["react", "react-dom"] };
    return cfg;
  }
};

export default config;
