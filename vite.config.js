import path from "path";
import { defineConfig } from "vite";
import checker from "vite-plugin-checker";
import dts from "vite-plugin-dts";

export default defineConfig({
    plugins: [
        checker({ typescript: true }),
        /**
         * Emits .d.ts files next to the bundle. `paths` aliases from tsconfig (@src/*, @gen/*)
         * are rewritten to relative imports, since consumers can't resolve them.
         * entryRoot "." keeps the dist/src + dist/generated layout that package.json "types" points to.
         */
        dts({
            tsconfigPath: "./tsconfig.json",
            entryRoot: ".",
            include: ["src", "generated"],
            exclude: ["src/test.ts"],
        }),
    ],
    build: {
        minify: false,
        outDir: "dist",
        lib: {
            name: "OpenfeedSDKJS",
            entry: path.resolve(import.meta.dirname, "src/index.ts"),
        },
        rolldownOptions: {
            input: path.resolve(import.meta.dirname, "src/index.ts"),
            output: [
                {
                    entryFileNames: ({ name }) => `${name}.js`,
                    format: "esm",
                    dir: "dist",
                },
            ],
        },
    },
    resolve: {
        alias: {
            "@src": path.resolve(import.meta.dirname, "src"),
            "@gen": path.resolve(import.meta.dirname, "generated"),
            os: path.resolve(import.meta.dirname, "src/utilities/empty.ts"),
        },
    },
});
