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
    "@nuxtjs/i18n",
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
  i18n: {
    strategy: "prefix_and_default", // 添加路由前缀的方式
    locales: ["en", "zh"], //配置语种
    defaultLocale: "en", // 默认语种
    vueI18n: "./i18n.config.ts", // 通过vueI18n配置
  },
});
