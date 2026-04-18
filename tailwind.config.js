/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1A3C6E", // Deep Navy
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#E8700A", // Warm Amber
          foreground: "#FFFFFF",
        },
        success: "#2E8B57",
        danger: "#CC3333",
        review: "#1565C0",
        warn: "#F4A91C",
        background: {
          DEFAULT: "#F4F6F9",
          card: "#FFFFFF",
          sidebar: "#EAECF0",
        },
        text: {
          primary: "#1A1A2E",
          secondary: "#555C70",
        }
      },
      fontFamily: {
        serif: ["Source Serif Pro", "serif"],
        display: ["Playfair Display", "serif"],
        sans: ["DM Sans", "sans-serif"],
        mono: ["DM Mono", "monospace"],
        timer: ["JetBrains Mono", "monospace"],
      },
      boxShadow: {
        card: "0 2px 8px rgba(26, 60, 110, 0.08)",
        panel: "0 4px 16px rgba(26, 60, 110, 0.12)",
        modal: "0 8px 32px rgba(0, 0, 0, 0.2)",
      }
    },
  },
  plugins: [],
}
