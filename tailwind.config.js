module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"], // Ensure Tailwind scans your files
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")], // Use require() instead of import
};
