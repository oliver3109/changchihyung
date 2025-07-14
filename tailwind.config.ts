import type { Config } from "tailwindcss";

export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
    // 添加 Nuxt UI 相关的内容路径
    "./node_modules/@nuxt/ui/dist/**/*.{js,mjs,ts,vue}",
  ],
  // 添加 safelist 确保生成所需的类
  safelist: [
    "outline-primary",
    "outline-primary-50",
    "outline-primary-100",
    "outline-primary-200",
    "outline-primary-300",
    "outline-primary-400",
    "outline-primary-500",
    "outline-primary-600",
    "outline-primary-700",
    "outline-primary-800",
    "outline-primary-900",
    "outline-primary-950",
    // 添加其他可能需要的 outline 类
    {
      pattern: /outline-(primary|teal)(-\d+)?/,
      variants: ["hover", "focus", "active"],
    },
  ],
  theme: {
    extend: {
      boxShadow: {
        zoop: "rgba(102, 109, 128, 0.08) 0px 1.2672px 1.2672px 0px, rgba(102, 109, 128, 0.08) 0px 5.06879px 10.1376px 0px",
        zoopdark:
          "rgba(10, 10, 10, 0.2) 0px 1.2672px 1.2672px 0px, rgba(10, 10, 10, 0.2) 0px 5.06879px 10.1376px 0px",
      },
      // 添加 outline 相关的颜色
      colors: {
        primary: {
          50: "#f0fdfa",
          100: "#ccfbf1",
          200: "#99f6e4",
          300: "#5eead4",
          400: "#2dd4bf",
          500: "#14b8a6",
          600: "#0d9488",
          700: "#0f766e",
          800: "#115e59",
          900: "#134e4a",
          950: "#042f2e",
        },
      },
    },
    fontFamily: {
      sans: [
        "Inter",
        "Avenir Next",
        "Roboto",
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Ubuntu",
        '"Helvetica Neue"',
        "Arial",
        '"Noto Sans"',
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
        '"Noto Color Emoji"',
      ],
      mono: [
        "Cascadia Code",
        "ui-monospace",
        "SFMono-Regular",
        "Menlo",
        "Monaco",
        "Consolas",
        "Liberation Mono",
        "Courier New",
        "monospace",
      ],
    },
  },
  plugins: [require("@tailwindcss/typography")],
} satisfies Config;
