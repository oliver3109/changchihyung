// middleware/redirect.js
export default defineNuxtRouteMiddleware((to, from) => {
  // 获取用户的首选语言
  const defaultLang = "zh";

  // 如果当前路由是首页（/）
  if (to.path === "/") {
    // 根据首选语言进行重定向
    if (defaultLang.startsWith("zh")) {
      return navigateTo("/zh");
    } else {
      return navigateTo("/en");
    }
  }
});
