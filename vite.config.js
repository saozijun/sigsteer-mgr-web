import { fileURLToPath, URL } from "node:url";
import { defineConfig, loadEnv } from "vite";
import createVitePlugins from './vite/plugins'

const baseUrl = "http://192.168.0.142:9191";
export default defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd());
  const { VITE_APP_BASE_API } = env;

  
  return {
    plugins: createVitePlugins(env, command === 'build'),
    resolve: {
      alias: {
        "~": fileURLToPath(new URL("./", import.meta.url)),
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData:
            '@use "@/styles/screenInit.scss" as *;@use "@/styles/element/index.scss" as *;',
        },
      },
    },
    build: {
      // https://vite.dev/config/build-options.html
      sourcemap: command === "build" ? false : "inline",
      outDir: "dist",
      assetsDir: "assets",
      chunkSizeWarningLimit: 2000,
      rollupOptions: {
        output: {
          chunkFileNames: "static/js/[name]-[hash].js",
          entryFileNames: "static/js/[name]-[hash].js",
          assetFileNames: "static/[ext]/[name]-[hash].[ext]",
        },
      },
    },
    server: {
      host: true,
      proxy: {
        "/dev-api": {
          target: "http://localhost:9191", // http://192.168.0.142:9191
          changeOrigin: true,
          rewrite: (p) => p.replace(/^\/dev-api/, ""),
        },
      },
    },
  };
});
