<script setup lang="ts">
const { data: page } = await useAsyncData(
  'blog-page',
  () => {
    return queryCollection('pages').path('/blog').first()
  }
)
if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
    fatal: true
  })
}
const { data: posts } = await useAsyncData('blogs', () =>
  queryCollection('blog').order('date', 'DESC').all()
)
if (!posts.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'blogs posts not found',
    fatal: true
  })
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

useSeoMeta({
  title: page.value?.seo?.title || page.value?.title,
  ogTitle: page.value?.seo?.title || page.value?.title,
  description:
    page.value?.seo?.description || page.value?.description,
  ogDescription:
    page.value?.seo?.description || page.value?.description
})
</script>

<template>
  <div v-if="page">
    <!-- Hero Section -->
    <UPageSection
      :ui="{ container: 'pt-24 pb-12 sm:pb-12 lg:pb-12' }"
    >
      <h1
        class="text-3xl sm:text-4xl lg:text-5xl font-bold text-left mb-4"
      >
        {{ page.title }}
      </h1>
      <p class="text-md text-muted text-left mb-8">
        {{ page.description }}
      </p>
    </UPageSection>

    <!-- Blog Posts Section -->
    <UPageSection
      :ui="{
        container:
          '!pt-0 overflow-hidden pb-18 md:pb-22 lg:pb-24'
      }"
    >
      <div class="space-y-8">
        <Motion
          v-for="(post, index) in posts"
          :key="index"
          :initial="{
            opacity: 0,
            transform: 'translateY(10px)'
          }"
          :while-in-view="{
            opacity: 1,
            transform: 'translateY(0)'
          }"
          :transition="{ delay: 0.2 * index }"
          :in-view-options="{ once: true }"
        >
          <div
            class="group overflow-visible transition-all duration-300"
          >
            <NuxtLink
              :to="post.path"
              class="md:grid md:grid-cols-2 gap-6"
            >
              <div
                class="overflow-visible"
                :class="
                  index % 2 === 0
                    ? 'sm:-rotate-1'
                    : 'sm:rotate-1'
                "
              >
                <img
                  v-if="post.image"
                  :src="post.image"
                  :alt="post.title"
                  class="group-hover:scale-105 rounded-lg shadow-lg border-4 border-muted ring-2 ring-default w-full h-48 object-cover transition-transform duration-300"
                />
              </div>
              <div class="">
                <div class="text-sm text-muted mb-2">
                  {{ formatDate(post.date) }}
                </div>
                <h3 class="text-xl font-semibold mb-2">
                  {{ post.title }}
                </h3>
                <p class="text-muted">
                  {{ post.description }}
                </p>
              </div>
            </NuxtLink>
          </div>
        </Motion>
      </div>
    </UPageSection>
  </div>
</template>
