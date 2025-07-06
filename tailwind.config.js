/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        //primary:"#8a2be2",
        primary:"#33c648",
        bgprimary:"#f1f1f1;",
        bgsecondary:"#FFFFFF",
        muted: "#7d7d82",
        based:"#111111",
        "dark-overlay":"rgba(1,1,1,0.5",
      }
    },
  },
  plugins: [],
}

