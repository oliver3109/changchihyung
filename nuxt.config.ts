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
    // "@nuxthq/studio", // 暂时禁用，可能导致预渲染问题
    "@vueuse/nuxt",
    // "@nuxtjs/sitemap", // 暂时禁用，可能导致预渲染问题
    "@nuxtjs/i18n",
  ],
  ui: {
    // Icon configuration is handled by nuxt-icon module and @iconify-json packages
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
    // 添加预渲染配置以避免卡住
    prerender: {
      crawlLinks: false, // 禁用自动爬取链接
      routes: ["/"], // 只预渲染首页
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
  // sitemap: {
  //   // automatically chunk into multiple sitemaps
  //   sitemaps: true,
  // },
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
