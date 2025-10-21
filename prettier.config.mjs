/** @type {import("prettier").Config} */
const config = {
  printWidth: 100,
  singleQuote: false,
  semi: true,
  trailingComma: "all",
  tabWidth: 2,
  plugins: ["prettier-plugin-tailwindcss"],
};

export default config;
