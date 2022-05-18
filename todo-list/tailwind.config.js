module.exports = {
  mode: 'jit',
  purge: [
    "./src/**/*.{html,ts}",
    "./src/app/**/*.{html,ts}",

  ],
  darkMode: false, // or 'media' or 'class'
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
