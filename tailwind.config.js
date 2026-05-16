/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Space Grotesk"', '"DM Sans"', 'sans-serif'],
        body: ['"DM Sans"', 'sans-serif'],
        mono: ['"DM Mono"', 'monospace'],
        chinese: ['"Ma Shan Zheng"', '"ZCOOL XiaoWei"', 'cursive'],
      },
      colors: {
        bg: {
          base: '#0e1520',
          surface: '#131c2a',
          hover: '#1a2438',
        },
        accent: {
          blue: '#4fc3f7',
          purple: '#ce93d8',
          teal: '#80cbc4',
        },
        text: {
          primary: '#f0f4f8',
          secondary: 'rgba(240, 244, 248, 0.55)',
          muted: 'rgba(240, 244, 248, 0.30)',
        },
        border: {
          subtle: 'rgba(255, 255, 255, 0.07)',
          hover: 'rgba(79, 195, 247, 0.30)',
        },
        glow: {
          blue: 'rgba(79, 195, 247, 0.12)',
        },
      },
    },
  },
  plugins: [],
};
