import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "loadingRequest",
      fileName: (format) => `loading-request.${format}.js`,
    },
    sourcemap: true,
  },
  css: {
    modules: {
      localsConvention: "camelCase",
      generateScopedName: "[name]__[local]__[hash:base64:5]",
    },
    postcss: {
      plugins: [
        {
          postcssPlugin: "internal:charset-removal",
          OnceExit(css) {
            css.walkDecls((decl) => {
              if (decl.prop === "@charset") {
                decl.remove();
              }
            });
          },
        },
      ],
    },
  },
});
