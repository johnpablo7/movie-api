/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      margin: {
        "container-side": "calc((100vw - 1200px)/2)",
      },
    },
  },
  plugins: [],
};
