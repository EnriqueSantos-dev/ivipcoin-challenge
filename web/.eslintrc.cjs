module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh", "simple-import-sort"],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "simple-import-sort/exports": "error",
    "simple-import-sort/imports": [
      "error",
      {
        groups: [
          ["^react$", "^react-dom/?"],
          ["^\\u0000", "^@?\\w"],
          ["^@mui"],
          ["^@/pages"],
          ["^@/components"],
          ["^@/services"],
          ["^@/hooks"],
          ["^@/helpers"],
        ],
      },
    ],
  },
};
