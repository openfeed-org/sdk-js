import path from "path";
import { defineConfig } from "vite";
import checker from "vite-plugin-checker";
import dts from "vite-plugin-dts";

// Node's ES module resolution (`moduleResolution: nodenext` in client projects) needs file extensions on relative imports.
// The JavaScript is bundled into single files, so only the declarations have relative imports, and they get `.js` here
const relativeImport = /(\bfrom\s+|\bimport\()(["'])(\.{1,2}\/[^"']+?)(?<!\.js)\2/g;
const addJsExtensions = (content) => content.replace(relativeImport, "$1$2$3.js$2");

const entry = path.resolve(import.meta.dirname, "src/index.ts");
const aliases = {
    "@src": path.resolve(import.meta.dirname, "src"),
    "@gen": path.resolve(import.meta.dirname, "generated"),
};

/**
 * `vite build --mode node` builds dist/node.js: the same library bundled for Node, dependencies included (ws instead
 * of the browser WebSocket), with only Node's built-in modules left as imports. It runs after the browser build, which
 * empties dist and emits the declarations for both.
 */
const nodeConfig = defineConfig({
    build: {
        minify: false,
        outDir: "dist",
        emptyOutDir: false,
        target: "node16",
        ssr: entry,
        rolldownOptions: {
            // ws's optional native speed-ups: kept as runtime requires (which ws wraps in try/catch), so they're used
            // when the user has them installed, instead of being replaced by a stub that always throws
            external: ["bufferutil", "utf-8-validate"],
            output: {
                entryFileNames: "node.js",
                format: "esm",
            },
        },
    },
    ssr: {
        target: "node",
        noExternal: true,
    },
    resolve: {
        alias: aliases,
    },
});

const browserConfig = defineConfig({
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
            entry,
        },
        rolldownOptions: {
            input: entry,
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
            ...aliases,
            os: path.resolve(import.meta.dirname, "src/utilities/empty.ts"),
        },
    },
});

export default defineConfig(({ mode }) => (mode === "node" ? nodeConfig : browserConfig));
