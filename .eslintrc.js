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
    "array-bracket-spacing": [1, "never"],
    "max-len": 0,
    "object-curly-spacing": [1, "never"],
    "react/jsx-curly-brace-presence": [1, {props: "always", children: "never"}],
    "react/react-in-jsx-scope": 0,
    "react/prop-types": 0,
    "require-jsdoc": 0,
    "valid-jsdoc": 0,
    quotes: [1, "double"],
    semi: [1, "never"],
  },
}
