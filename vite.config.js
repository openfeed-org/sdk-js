import path from "path";
import { defineConfig } from "vite";
import checker from "vite-plugin-checker";
import dts from "vite-plugin-dts";

// Node's ES module resolution (`moduleResolution: nodenext` in client projects) needs file extensions on relative imports.
// The JavaScript is bundled into single files, so only the declarations have relative imports, and they get `.js` here
const relativeImport = /(\bfrom\s+|\bimport\()(["'])(\.{1,2}\/[^"']+?)(?<!\.js)\2/g;
const addJsExtensions = (content) => content.replace(relativeImport, "$1$2$3.js$2");

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
            beforeWriteFile: (filePath, content) => ({ filePath, content: addJsExtensions(content) }),
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
