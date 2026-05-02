import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#24312F",
        mist: "#F5F7F4",
        sage: "#8FA99B",
        leaf: "#4F7B63",
        clay: "#C78361",
        coral: "#D96C5F",
        amber: "#D59B3D"
      },
      boxShadow: {
        soft: "0 18px 50px rgba(36, 49, 47, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
