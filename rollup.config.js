import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";
import dts from "rollup-plugin-dts";
import { readFileSync } from 'fs';

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: "dist/loading-request.min.js",
        format: "umd",
        name: "loadingRequest",
        sourcemap: false,
      },
      {
        file: "dist/loading-request.es.min.js",
        format: "esm",
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
