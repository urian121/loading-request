import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";

export default {
  input: "src/index.ts",
  output: [
    {
      file: "dist/index.cjs.js",
      format: "cjs",
    },
    {
      file: "dist/index.esm.js",
      format: "es",
    },
  ],
  plugins: [
    typescript({
      tsconfig: "./tsconfig.json",
    }),
    postcss({
      extract: true, // Extrae el CSS a un archivo separado
    }),
  ],
};
