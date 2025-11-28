import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  optimizeDeps: {
    include: ["redux-persist/lib/storage"],
  },
  plugins: [
    react(),
    VitePWA({
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
        description: "BeerWorkshop application",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#000000",
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
        maximumFileSizeToCacheInBytes: 3000000,
      },
      devOptions: {
        enabled: true,
        navigateFallback: "index.html",
        suppressWarnings: true,
        type: "module",
      },
    }),
  ],
});
