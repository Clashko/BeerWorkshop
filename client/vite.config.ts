import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  base: "/client/",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "D:/Programming/Sites/BeerWorkshop/Client",
    // cssMinify is disabled because of a bug in lightningcss with @material-tailwind/react beta version
    cssMinify: false,
  },
  plugins: [
    react(),
    VitePWA({
      base: "/client/",
      filename: "manifest.webmanifest",
      registerType: "autoUpdate",
      injectRegister: "script",
      includeAssets: [
        "assets/logo.png",
        "assets/logo.png",
        "assets/android-chrome-192x192.png",
        "assets/android-chrome-512x512.png",
        "assets/android-chrome-maskable-192x192.png",
        "assets/android-chrome-maskable-512x512.png",
        "assets/apple-touch-icon.png",
        "assets/favicon.ico",
      ],
      manifest: {
        name: "BeerWorkshop",
        short_name: "BeerWorkshop",
        description: "BeerWorkshop draft drinks",
        start_url: "/client/",
        scope: "/client/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#000000",
        lang: "ru",
        icons: [
          {
            src: "/assets/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/assets/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/assets/android-chrome-maskable-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable",
          },
          {
            src: "/assets/android-chrome-maskable-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js, css, html, svg, png, ico}"],
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        maximumFileSizeToCacheInBytes: 5000000,
        navigateFallback: "/client/index.html",
      },
      devOptions: {
        enabled: true,
        navigateFallback: "/client/index.html",
        suppressWarnings: true,
        type: "module",
      },
    }),
  ],
});
