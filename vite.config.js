import path from "path";
import { defineConfig } from "vite";
import checker from "vite-plugin-checker";

export default defineConfig({
    plugins: [checker({ typescript: true })],
    build: {
        minify: false,
        outDir: "dist",
        lib: {
            name: "OpenfeedSDKJS",
            entry: path.resolve(__dirname, "src/index.ts"),
        },
        rollupOptions: {
            /**
             * Explanation to bundler what packages are expected to be EXTERNAL
             * aka from project that uses this library
             *
             * We added peer dependency to our package.json
             * NOTE: that we need to keep versions same, otherwise we will have two "same" libraries
             *      we can avoid this by putting "*" as version in peer dependencies
             *      overall that makes more confusion and stuff mostly break when developer upgrades major version of package
             */
            input: path.resolve(__dirname, "src/index.ts"),
            output: [
                // bundle and export singular files (in case somebody wants to import single component)
                {
                    entryFileNames: ({ name }) => `${name}.js`,
                    format: "esm",
                    dir: "dist",
                    // preserveModules: true,
                },
            ],
        },
    },
    resolve: {
        alias: {
            "@src": path.resolve(process.cwd(), "src"),
            "@gen": path.resolve(process.cwd(), "generated"),
            os: path.resolve(process.cwd(), "src/utilities/empty.ts"),
        },
    },
});
