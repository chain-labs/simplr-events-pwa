import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      forum: "var(--forum)",
      sans: "var(--dm-sans)",
    },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary1: "#F75818", // Orange
        primary2: "#0D3C85", // Blue
        primary3: "#BB04E8", // Purple
        "text-blue": "#340B8B",
      },
      fontFamily: {
        sans: ['"DM Sans"', "sans-serif"], // Default sans font
        forum: ['"Forum"', "serif"],
      },
      keyframes: {
        gradient: {
          "0%, 100%": {
            "background-position": "0% 50%",
          },
          "50%": {
            "background-position": "100% 50%",
          },
        },
      },
      animation: {
        "gradient-bg": "gradient 10s ease infinite",
      },
      boxShadow: {
        "inner-custom": "inset 0 -2px 6px #0A254059", // Custom inner shadow
      },
    },
  },
  plugins: [],
};
export default config;
