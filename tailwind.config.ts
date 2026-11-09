import type { Config } from "tailwindcss";
// Concepto: "Medicina con método" — editorial clínico. Tinta profunda, papel cálido,
// un verde salvia como único acento y datos en monoespaciada (cédula, horarios, pasos).
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0C1B2A", // texto y secciones oscuras
        paper: "#F5F4F0", // fondo principal
        bone: "#EAE6DE", // superficies
        mist: "#DCE3E5", // superficies frías
        sage: "#2F6B5A", // acento sobre claro
        mint: "#BFD8CC", // acento sobre oscuro
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      maxWidth: { page: "84rem" },
    },
  },
  plugins: [],
};
export default config;
