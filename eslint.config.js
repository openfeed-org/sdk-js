import js from "@eslint/js";
import prettier from "eslint-config-prettier";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";

// Same base as desktop-sdk-js and common-client-ts: every core rule and typescript-eslint strict,
// with type information, minus the rules turned off below.
export default defineConfig(
    // generated/ is ts-proto output, rewritten on every `yarn generate`; src/test.ts is a local playground
    { ignores: ["dist", "node_modules", "generated", "src/test.ts"] },
    js.configs.all,
    tseslint.configs.strictTypeChecked,
    {
        languageOptions: {
            parserOptions: { projectService: true, tsconfigRootDir: import.meta.dirname },
        },
        rules: {
            complexity: ["error", 40],
            "max-depth": ["error", 5],
            "id-length": "off",
            "no-magic-numbers": "off",
            "no-undefined": "off",
            camelcase: "off",
            "capitalized-comments": "off",
            "max-statements": "off",
            "max-lines": "off",
            "max-lines-per-function": "off",
            "max-params": "off",
            "no-ternary": "off",
            "no-underscore-dangle": "off",
            "sort-keys": "off",
            "sort-imports": "off",
            "sort-vars": "off",
            "one-var": "off",
            "require-unicode-regexp": "off",
            "prefer-named-capture-group": "off",
            "prefer-destructuring": [
                "warn",
                {
                    VariableDeclarator: { array: true, object: true },
                    AssignmentExpression: { array: false, object: false },
                },
            ],
            // `void promise` marks a promise left running on purpose, as no-floating-promises asks
            "no-void": "off",
            // the connect loop awaits one step at a time, in order
            "no-await-in-loop": "off",
            // the wire format's length prefix is read and written with shifts and masks
            "no-bitwise": "off",
        },
    },
    {
        // the codegen script prints what it does
        files: ["scripts/**/*.ts"],
        rules: {
            "no-console": "off",
        },
    },
    {
        // the encode/decode split walks statement > declaration > object > method
        files: ["scripts/process.ts"],
        rules: {
            "max-depth": ["error", 8],
        },
    },
    {
        // the SDK's error types, kept together
        files: ["src/connection/errors.ts"],
        rules: {
            "max-classes-per-file": "off",
        },
    },
    { files: ["**/*.js"], extends: [tseslint.configs.disableTypeChecked] },
    prettier,
    {
        // eslint-config-prettier turns curly off, though it agrees with Prettier in its default ("all") form
        rules: {
            curly: "error",
        },
    }
);
