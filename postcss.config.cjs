module.exports = {
  plugins: {
    // Must run before tailwind so third-party CSS (e.g. Swiper) nesting is expanded
    'tailwindcss/nesting': {},
    tailwindcss: {},
    autoprefixer: {},
  },
}
