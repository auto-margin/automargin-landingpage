import eslintConfigNext from "eslint-config-next";

const nextRulesOverrides = {
  "@next/next/no-html-link-for-pages": "off",
  "react/jsx-key": "off",
  "react/display-name": "off",
  "import/no-named-as-default-member": "off",
  "react/react-in-jsx-scope": "off",
  "jsx-a11y/no-static-element-interactions": "off",
  "jsx-a11y/click-events-have-key-events": "off",
  "jsx-a11y/no-noninteractive-element-interactions": "off",
  "jsx-a11y/no-noninteractive-tabindex": "off",
  "jsx-a11y/media-has-caption": "off",
  "jsx-a11y/anchor-is-valid": "off",
  "jsx-a11y/heading-has-content": "off",
  "react/no-unescaped-entities": "off",
  "no-console": "warn",
  "import/order": [
    "error",
    {
      groups: [
        ["builtin", "external"],
        ["internal", "parent", "sibling", "index"],
      ],
      pathGroups: [
        {
          pattern: "react",
          group: "builtin",
          position: "before",
        },
        {
          pattern: "next/**",
          group: "builtin",
          position: "before",
        },
        {
          pattern: "@/**",
          group: "internal",
          position: "after",
        },
      ],
      pathGroupsExcludedImportTypes: ["builtin"],
      "newlines-between": "always",
      alphabetize: {
        order: "asc",
        caseInsensitive: true,
      },
    },
  ],
};

const tsRulesOverrides = {
  "@typescript-eslint/ban-ts-comment": [
    "error",
    { "ts-ignore": "allow-with-description" },
  ],
  "@typescript-eslint/no-empty-object-type": "off",
};

// Use the official Next.js flat config directly.
// Merge custom rule overrides into the same config objects that already define the needed plugins.
export default eslintConfigNext.map((config) => {
  if (config?.name === "next") {
    return {
      ...config,
      rules: {
        ...config.rules,
        ...nextRulesOverrides,
      },
    };
  }

  if (config?.name === "next/typescript") {
    return {
      ...config,
      rules: {
        ...config.rules,
        ...tsRulesOverrides,
      },
    };
  }

  return config;
});
