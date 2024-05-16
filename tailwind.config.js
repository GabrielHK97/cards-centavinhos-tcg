/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#CD853F",
          secondary: "#FFD700",
          accent: "#FFDEAD",
          neutral: "#e5e7eb",
          "base-100": "#1e2b30",
          info: "#0284c7",
          success: "#22c55e",
          warning: "#fbbf24",
          error: "#ef4444",
        },
      },
    ],
  },
};
