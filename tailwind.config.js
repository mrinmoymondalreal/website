/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        "dark": "#0f172a",
        "darkLight": "#1e293b"
      }
    },
  },
  plugins: [],
}

