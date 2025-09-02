module.exports = {
  extends: [
    "expo",
    "prettier",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
  ],
  plugins: ["prettier", "react-hooks", "react-native", "import"],
  rules: {
    "prettier/prettier": "error",
    "no-console": ["error", { allow: ["error"] }],
    "no-unused-vars": "off", // Desactiva esta regla
    "no-shadow": "off",
    "no-undef": "off",
    "react/prop-types": "off",
    "react-native/no-inline-styles": "error",
    "react-native/no-unused-styles": "error",
    "react-native/no-single-element-style-arrays": 2,
    "react/no-unescaped-entities": "off",
    "react-hooks/exhaustive-deps": "error",
    "@typescript-eslint/ban-types": "off",
    "sort-imports": [
      "error",
      { ignoreCase: true, ignoreDeclarationSort: true },
    ],
    "import/order": [
      "error",
      {
        groups: [
          ["external", "builtin"],
          "internal",
          ["sibling", "parent"],
          "index",
        ],
        pathGroups: [
          {
            pattern: "@(react|react-native)",
            group: "external",
            position: "before",
          },
          {
            pattern: "@/**",
            group: "internal",
          },
          {
            pattern: "./**",
            group: "index",
          },
        ],
        pathGroupsExcludedImportTypes: ["internal", "react"],
        "newlines-between": "never",
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
      },
    ],
  },
};
