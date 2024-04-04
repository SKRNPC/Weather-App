/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "blue-light": "#8fb2f5", // Örnek bir açık mavi hex kodu
      },
    },
  },
  plugins: [],
};
