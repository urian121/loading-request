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
      extract: "index.css",
      minimize: true, // Minimize CSS
      modules: false, // No necesitas módulos CSS para un archivo CSS global
      use: ["sass"], // Cambiado de "css" a "sass" para mayor flexibilidad
      extensions: [".css", ".scss"], // Extensiones de archivo soportadas
      inject: {
        insertAt: "top", // Opcional: dónde insertar el CSS en el documento
      },
    }),
  ],
};
