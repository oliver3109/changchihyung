<template>
  <div class="space-y-6">
    <NuxtImg
      src="/avatar.jpeg"
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
        张智勇是一位<strong>工程师、极客和艺术创作者</strong>，自16岁开始编程，至今已有十年。他熟悉多种编程语言，如JavaScript,
        C# 和
        Java，并擅长使用three.js、Unity等三维引擎，同时具备Arduino编程的经验。
        他对创新和独特的事物充满热情，尽管拥有扎实的工程背景，他始终在突破专业边界，积极探索艺术、技术与自然科学的融合。在工作之余，他还创作了一系列独具风格的计算机艺术作品和装置艺术。
      </p>
      <p class="text-gray-900 dark:text-gray-400">
        <br />
        近年来，张智勇专注于AR和XR领域，不断提升技术能力。他与合作伙伴一起完成了多个城市级AR地标项目，积累了丰富的实践经验。
      </p>
    </div>
    <div v-if="lang == 'en'">
      <p class="text-gray-900 dark:text-gray-400">
        ZHI YONG ZHANG is an
        <strong>engineer, geek, and artistic creator</strong> who began
        programming at the age of 16, and has accumulated a decade of
        experience. He is proficient in several programming languages, including
        JavaScript, C# and Java, and is skilled in using 3D engines such as
        three.js and Unity, with additional expertise in Arduino programming.
        Passionate about innovation and unique ideas, ZHI YONG ZHANG continues
        to push the boundaries of his engineering background, actively exploring
        the intersection of art, technology, and natural sciences. In his spare
        time, he has created a series of distinctive computer art and
        installation pieces.
      </p>
      <p class="text-gray-900 dark:text-gray-400">
        <br />
        In recent years, ZHI YONG ZHANG has focused on AR and XR, steadily
        building his technical expertise. Together with his partners, he has
        worked on numerous creative and engaging city-level AR landmark
        projects, gaining extensive hands-on experience.
      </p>
    </div>
  </div>
</template>

<script setup>
useSeoMeta({
  title: "ZHI YONG ZHANG 张智勇",
  description:
    "ZHI YONG ZHANG is an engineer, geek, and artistic creator who began programming at the age of 16, and has accumulated a decade of experience. He is proficient in several programming languages, including JavaScript, C# and Java, and is skilled in using 3D engines such as three.js and Unity, with additional expertise in Arduino programming.Passionate about innovation and unique ideas, ZHI YONG ZHANG continues to push the boundaries of his engineering background, actively exploring the intersection of art, technology, and natural sciences. In his spare time, he has created a series of distinctive computer art and installation pieces.",
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
