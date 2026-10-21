import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui"],
      },
      colors: {
        ink: "#142018",
        moss: "#1f3c31",
        lime: "#b6e553",
        paper: "#f7f7f2",
        sand: "#ebece4",
      },
      boxShadow: {
        quiet: "0 18px 50px rgba(22, 35, 27, .08)",
      },
    },
  },
  plugins: [],
} satisfies Config;
