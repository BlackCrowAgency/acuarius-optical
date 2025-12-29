// .storybook/preview.ts
import type { Preview } from "@storybook/react";
import "../src/styles/globals.css";

const preview: Preview = {
  parameters: {
    layout: "fullscreen",
    nextjs: { appDirectory: true },
    backgrounds: {
      default: "Light / surface",
      values: [
        { name: "Light / surface", value: "#FCFCFC" },
        { name: "Light / muted", value: "#F7F7F8" }
      ]
    },
    controls: {
      expanded: true,
      sort: "alpha"
    },
    options: {
      storySort: { method: "alphabetical", order: [] }
    },
    docs: { source: { state: "open" } }
  },
  decorators: []
};

export default preview;
