module.exports = [
  {
    languageOptions: {
      ecmaVersion: 2020, // Allows for modern ECMAScript features
      sourceType: "module", // Allows for import/export
      parser: require("@babel/eslint-parser"), // Use Babel parser for JSX
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          presets: ["@babel/preset-react"],
        },
      },
    },
    plugins: {
      react: require("eslint-plugin-react"),
      "react-hooks": require("eslint-plugin-react-hooks"),
    },
    settings: {
      react: {
        version: "detect", // Detects the React version automatically
      },
    },
    rules: {
      ...require("eslint-plugin-react").configs.recommended.rules,
    },
  },
];
