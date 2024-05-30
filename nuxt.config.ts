export default defineNuxtConfig({
  devtools: { enabled: false },
  experimental: { appManifest: false, payloadExtraction: true },
  modules: [
    "@nuxt/ui",
    "nuxt-icon",
    "@nuxtjs/google-fonts",
    "@nuxtjs/fontaine",
    "@nuxt/image",
    "@nuxt/content",
    "@nuxthq/studio",
    "@vueuse/nuxt",
  ],
  ui: {
    icons: ["heroicons", "lucide"],
  },
  app: {
    pageTransition: { name: "page", mode: "out-in" },
    head: {
      htmlAttrs: {
        lang: "zh-CN",
        class: "h-full",
      },
      bodyAttrs: {
        class: "antialiased bg-gray-50 dark:bg-black min-h-screen",
      },
    },
  },
  content: {
    highlight: {
      theme: "github-dark",
    },
  },
  googleFonts: {
    display: "swap",
    families: {
      Inter: [400, 500, 600, 700, 800, 900],
    },
  },
  nitro: {
    inlineDynamicImports: true,
    prerender: {
      autoSubfolderIndex: false,
    },
    output: {
      dir: "output",
      serverDir: "output/server",
      publicDir: "output/public",
    },
    commands: {
      preview: "npx wrangler dev ./server/index.mjs --site ./public",
      deploy: "npx wrangler deploy",
    },
  },
});
