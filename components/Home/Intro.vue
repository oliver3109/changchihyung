<template>
  <div class="space-y-6">
    <NuxtImg
      src="/avatar.png"
      alt="ChihYung Chang"
      class="ring-2 border ring-gray-200 border-gray-300 dark:ring-white/10 dark:border-gray-800 hover:ring-4 transition-all duration-300 bg-gray-200 dark:bg-gray-900 rounded-full h-12 w-12 sm:h-16 sm:w-16"
      sizes="48px sm:64px"
      placeholder
      format="webp"
    />
    <h1
      class="text-xl font-bold tracking-tight text-gray-800 dark:text-gray-100"
    >
      {{ $t("name") }}
    </h1>
    <div v-if="lang == 'zh'">
      <p class="text-gray-900 dark:text-gray-400">
        张智勇是一位<strong>工程师、创业者、艺术创作者</strong>，自16岁起便开始编程，至今已有十年。他精通多种编程语言，包括C、C++、C#、Java
        以及 JavaScript，熟悉多种三维引擎如
        three.js、Unity等。他对新奇而独特的事物充满热情，虽然他有着程序员的背景，但他对感性的艺术同样怀有深厚的热爱。自接触算法生成式艺术以来，在工作之余制作出一系列独具特色的计算机艺术作品。
      </p>
      <p class="text-gray-900 dark:text-gray-400">
        <br />
        2024年，张智勇创办了<strong>幽视科技</strong>，专注于
        AR、VR、MR、Web/小程序AR一站式定制类开发及元宇宙技术的创新工作室。
      </p>
    </div>
    <div v-if="lang == 'en'">
      <p class="text-gray-900 dark:text-gray-400">
        Oliver Chang is an
        <strong>engineer, entrepreneur, and art creators</strong> who began
        programming at the age of 16 and has been doing so for ten years. He is
        proficient in various programming languages, including C, C++, C#, Java,
        and JavaScript, and is familiar with several 3D engines such as three.js
        and Unity. He is passionate about unique and innovative things. Although
        he has a background as a programmer, he also has a deep love for
        expressive art. Since discovering algorithmic generative art, he has
        created a series of distinctive computer art pieces in his spare time.
      </p>
      <p class="text-gray-900 dark:text-gray-400">
        <br />
        In 2024, Oliver Chang founded <strong>Youshi Technology</strong>, a
        studio focused on innovation in Web3D/WebGL、AR, VR, MR, and Metaverse
        technologies.
      </p>
    </div>
  </div>
</template>

<script setup>
useSeoMeta({
  title: "OLIVERCHANG 张智勇",
  description:
    "Oliver Chang is an engineer, entrepreneur, and art creators who began programming at the age of 16 and has been doing so for ten years. He is proficient in various programming languages, including C, C++, C#, Java, and JavaScript, and is familiar with several 3D engines such as three.js and Unity. He is passionate about unique and innovative things. Although he has a background as a programmer, he also has a deep love for expressive art. Since discovering algorithmic generative art, he has created a series of distinctive computer art pieces in his spare time. In 2024, Oliver Chang founded Youshi Technology, a studio focused on innovation in AR, VR, MR, and Metaverse technologies.",
});

const { locale, setLocale } = useI18n();

const lang = computed({
  get() {
    return locale.value;
  },
  set(v) {
    setLocale(v);
  },
});
</script>
