import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['var(--font-cormorant)', 'serif'],
        body: ['var(--font-dm-sans)', 'sans-serif'],
      },
      colors: {
        cream: '#FAF7F2',
        'warm-white': '#FEFCF8',
        charcoal: '#1A1A1A',
        'warm-gray': '#6B6460',
        gold: '#C4956A', // Warm terracotta
        'gold-light': '#D9BFA7', // Soft sand
        blush: '#F2E8E1',
      },
    },
  },
  plugins: [],
};
export default config;
