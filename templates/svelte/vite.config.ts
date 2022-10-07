import { defineConfig, loadEnv } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import sveltePreprocess from "./svelte.config";
import { resolve } from "path";
import FullReload from "vite-plugin-full-reload";
import basicSsl from "@vitejs/plugin-basic-ssl";
import type { Plugin as PostCssPlugin } from "postcss";
import { mkdirSync, writeFileSync } from "fs";

/**
 * Prevent FOUC in development mode before Vite
 * injects the CSS into the page
 */
const postCssViteDevCss = (): PostCssPlugin => ({
  postcssPlugin: "postcss-vite-dev-css",

  OnceExit(root, { result }) {
    // @ts-expect-error: property unknown
    if (result.opts.env !== "production") {
      const regex = root.source?.input.file?.match(
        new RegExp(/([a-z]*)(.scss)$/)
      );
      const name = regex ? regex[1] : "index";
      const outDir = resolve(__dirname, "www/assets/dev");
      mkdirSync(outDir, { recursive: true });
      writeFileSync(resolve(outDir, `${name}.css`), root.toResult().css);
    }
  },
});

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    root: "frontend",
    base: mode === "development" ? "/frontend/" : "/",

    build: {
      outDir: resolve(__dirname, "www"),
      emptyOutDir: false,
      manifest: true,
      rollupOptions: {
        input: resolve(__dirname, "frontend/index.ts"),
      },
    },

    resolve: {
      alias: {
        "@styles": resolve(__dirname, "frontend/styles/"),
        "@": resolve(__dirname, "frontend/"),
      },
    },

    server: {
      open: env.VITE_DEV_URL,
      cors: true,
      host: "vite.test",
      https: true,
      hmr: { host: "vite.test" },
      port: 3000,
      strictPort: true,
    },

    css: {
      postcss: {
        plugins: [postCssViteDevCss()],
      },
      preprocessorOptions: {
        scss: {
          additionalData: `@import './frontend/styles/global.scss';`,
        },
      },
    },
    rollupDedupe: ["svelte"],

    plugins: [
      basicSsl(),
      svelte({
        ...sveltePreprocess,
        compilerOptions: { customElement: true },
        include: "/.wc.svelte$/",
      }),
      svelte({
        ...sveltePreprocess,
        compilerOptions: { customElement: false },
        exclude: "/.wc.svelte$/",
      }),
      FullReload([
        "volumes/content/**/*",
        "backend/site/(templates|snippets|controllers|models|plugins)/**/*.php",
      ]),
    ],
  };
});
