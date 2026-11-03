import { defineConfig } from "vitest/config";

// Kept separate from vite.config.js: tests run in Node, so they must not pick up the
// browser-only `os` alias or the build plugins (checker, dts).
export default defineConfig({
    resolve: {
        alias: {
            "@src": `${import.meta.dirname}/src`,
            "@gen": `${import.meta.dirname}/generated`,
        },
    },
    test: {
        include: ["test/**/*.test.ts"],
        environment: "node",
    },
});
