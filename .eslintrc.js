module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: ["eslint:recommended", "plugin:react/recommended", "google"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    semi: [1, "never"],
    quotes: [1, "double"],
    "object-curly-spacing": [1, "never"],
    "array-bracket-spacing": [1, "never"],
    "react/jsx-curly-brace-presence": [1, {props: "always", children: "never"}],
    "max-len": 0,
    "require-jsdoc": 0,
    "react/react-in-jsx-scope": 0,
  },
}
