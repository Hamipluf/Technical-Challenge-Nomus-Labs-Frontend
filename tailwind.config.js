/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        "postShadow": "11px 9px 13px -2px rgba(224,221,224,1)",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["sunset"],
  },
};
