import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        parchment: "#F5F0E8",
        ink: "#0F0E0C",
        gold: "#C8A96E",
        forest: "#2D5A4F",
        mutedsurface: "#EAE4D8",
        ghost: "#B8B0A0",
      },
      fontFamily: {
        display: ["var(--font-manrope)", "sans-serif"],
        body: ["var(--font-dm-sans)", "sans-serif"],
        mono: ["var(--font-dm-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
