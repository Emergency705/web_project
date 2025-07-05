/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // 'brand-primary': '#538E79', // 피그마 시안의 메인 컬러
      },
    },
  },
  plugins: [],
};
