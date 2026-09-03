import type { Config } from "tailwindcss";

// Tailwind v4 defines design tokens (colours, fonts) in src/app/globals.css via
// the @theme directive. This file exists to declare content sources explicitly
// and as the place to add JS-only config (safelist, plugins) if ever needed.
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
};

export default config;
