/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: 'Roboto, sans-serif',
      },
      backgroundImage: {
        app: "url(/app-bg.png)"
      },
      colors: {
        ignite: {
          500: "#129E57",
        },
        gray: {
          900: "#121214",
          800: "#202024",
          600: "#323238",
          400: "#8D8D99",
          300: "#C4C4CC",
          100: "#E1E1E6"
        },
        yellow: {
          700: "#E5CD3D",
          500: "#F7DD43"
        },
        black: {
          800: "#09090A",
        }
      }
    },
  },
  plugins: [],
}