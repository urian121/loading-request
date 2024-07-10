import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";

export default {
  input: "src/index.ts",
  output: [
    {
      file: "dist/index.js",
      format: "es",
    },
  ],
  plugins: [
    typescript({
      tsconfig: "./tsconfig.json",
    }),
    postcss({
      extract: "index.css",
      minimize: true,
      modules: false,
      use: ["sass"],
      extensions: [".css", ".scss"],
      inject: {
        insertAt: "top",
      },
    }),
  ],
};
