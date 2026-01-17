/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        slug: {
          primary: "#349265",   // main CTA
          secondary: "#7ebeab", // cards / highlights
          dark: "#136942",      // headings
          muted: "#9bae8c",     // backgrounds
          forest: "#134a33"    // strong accents
        }
      }
    }
  },
  plugins: []
};
