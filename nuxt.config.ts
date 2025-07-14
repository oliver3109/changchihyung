export default defineNuxtConfig({
  compatibilityDate: "2025-07-14",
  devtools: { enabled: false },
  experimental: { appManifest: false, payloadExtraction: true },
  modules: [
    "@nuxt/ui",
    "nuxt-icon",
    "@nuxtjs/google-fonts",
    "@nuxtjs/fontaine",
    "@nuxt/image",
    "@nuxt/content",
    // "@nuxt/scripts", // 暂时移除，可能导致构建问题
    "@nuxthq/studio",
    "@vueuse/nuxt",
    "@nuxtjs/sitemap",
    "@nuxtjs/i18n",
  ],
  ui: {
    icons: ["heroicons", "lucide"],
  },
  // 添加 CSS 配置
  css: ["~/assets/scss/main.scss"],
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
    // 完全禁用预渲染
    prerender: {
      routes: [],
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
  sitemap: {
    // automatically chunk into multiple sitemaps
    sitemaps: true,
  },
  i18n: {
    baseUrl: "https://chihyungchang.com",
    locales: [
      { code: "en", iso: "en-US", language: "en-US" },
      { code: "zh", iso: "zh-Hans", language: "zh-Hans" },
    ],
    defaultLocale: "en",
    strategy: "prefix",
    vueI18n: "./i18n.config.ts",
  },
});
