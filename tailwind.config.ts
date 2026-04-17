import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        coral: {
          DEFAULT: "#ff385c",
          light: "#ff5a79",
          dark: "#e00b41",
        },
        warm: {
          black: "#222222",
          gray: "#6a6a6a",
          "warm-gray": "#3f3f3f",
          "off-white": "#ffffff",
          surface: "#f2f2f2",
          border: "#c1c1c1",
        },
        premium: {
          luxe: "#460479",
          plus: "#92174d",
        },
        legal: "#428bff",
        danger: {
          DEFAULT: "#c13515",
          hover: "#b32505",
        },
        "brand-rausch": "#FF385C",
        "near-black": "#222222",
        "secondary-gray": "#717171",
        "background": "#ffffff",
        outline: "#DDDDDD",
      },
      borderRadius: {
        subtle: "4px",
        standard: "8px",
        badge: "14px",
        card: "20px",
        large: "32px",
        DEFAULT: "8px",
        lg: "12px",
        xl: "16px",
        full: "9999px",
      },
      fontFamily: {
        sans: [
          "Airbnb Cereal VF",
          "Circular",
          "-apple-system",
          "system-ui",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "Apple Color Emoji",
          "Segoe UI Emoji",
        ],
      },
      boxShadow: {
        card: "rgba(0,0,0,0.02) 0px 0px 0px 1px, rgba(0,0,0,0.04) 0px 2px 6px, rgba(0,0,0,0.1) 0px 4px 8px",
        hover: "rgba(0,0,0,0.08) 0px 4px 12px",
      },
    },
  },
};

export default config;

