module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "google",
  ],
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
  plugins: ["react", "@typescript-eslint", "import"],
  rules: {
    "array-bracket-spacing": [1, "never"],
    "import/order": [
      1,
      {
        pathGroups: [
          {pattern: "react", group: "external", position: "before"},
          {pattern: "next{,/**}", group: "external", position: "before"},
          {
            pattern: "@material-ui/{core,icons,lab}{,/!(styles|colors)*}",
            group: "external",
            position: "before",
          },
          {
            pattern: "@material-ui/core/styles{,/*}",
            group: "external",
            position: "before",
          },
          {
            pattern: "@material-ui/core/colors{,/*}",
            group: "external",
            position: "before",
          },
          {
            pattern: "color",
            group: "external",
            position: "before",
          },
          {
            pattern: "nextjs-global-app-state-strict-demo{,/**}",
            group: "external",
            position: "before",
          },
        ],
        pathGroupsExcludedImportTypes: ["unknown"],
        "newlines-between": "always",
        alphabetize: {order: "asc"},
      },
    ],
    "max-len": 0,
    "object-curly-spacing": [1, "never"],
    "react/jsx-curly-brace-presence": [1, {props: "always", children: "never"}],
    "react/jsx-sort-props": [
      1,
      {
        callbacksLast: true,
        shorthandLast: true,
        ignoreCase: true,
        reservedFirst: true,
      },
    ],
    "react/react-in-jsx-scope": 0,
    "react/prop-types": 0,
    "require-jsdoc": 0,
    "valid-jsdoc": 0,
    quotes: [1, "double"],
    semi: [1, "never"],
  },
  settings: {
    react: {
      version: "detect",
    },
  },
}
