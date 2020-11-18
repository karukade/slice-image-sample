module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: {
    enable: process.env.NODE_ENV === "production",
    content: ["./src/**/*.html"],
  },
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [],
}
