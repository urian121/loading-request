import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";
import dts from "rollup-plugin-dts";
import { readFileSync } from 'fs';

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: "dist/index.js",
        format: "cjs",
        sourcemap: false,
      },
      {
        file: "dist/index.mjs",
        format: "esm",
        sourcemap: false,
      },
      {
        file: "dist/loading-request.umd.js",
        format: "umd",
        name: "loadingRequest",
        sourcemap: false,
      },
    ],
    plugins: [
      {
        name: "css-loader",
        transform(code, id) {
          if (id.endsWith(".css")) {
            const css = readFileSync(id, "utf-8");
            return {
              code: `export default ${JSON.stringify(css)};`,
              map: null,
            };
          }
        },
      },
      typescript({ tsconfig: "./tsconfig.json" }),
      terser(),
    ],
  },
  {
    input: "src/index.ts",
    output: [{ file: "dist/index.d.ts", format: "es" }],
    plugins: [dts()],
  },
];
