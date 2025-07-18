<script setup lang="ts">
import type { IndexCollectionItem } from '@nuxt/content'

defineProps<{
  page: IndexCollectionItem
}>()

const { data: posts } = await useAsyncData(
  'index-blogs',
  () =>
    queryCollection('blog')
      .order('date', 'DESC')
      .limit(3)
      .all()
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
</script>

<template>
  <UPageSection
    :ui="{ container: 'pt-0 pb-8 sm:pb-16 lg:pb-24' }"
  >
    <h2
      class="text-left text-xl sm:text-xl lg:text-2xl font-medium"
    >
      {{ page.blog.title }}
    </h2>
    <p
      class="text-left mt-2 text-sm sm:text-md lg:text-sm text-muted"
    >
      {{ page.blog.description }}
    </p>

    <div class="gap-4 lg:gap-y-8 mt-8 space-y-6">
      <div
        v-for="(post, index) in posts"
        :key="index"
        class="group relative lg:items-start lg:flex ring-0 hover:ring-0 px-0"
      >
        <NuxtLink
          :to="post.path"
          class="lg:flex lg:gap-2 flex-col"
        >
          <div class="flex items-center gap-2">
            <time class="text-sm text-toned">
              {{ formatDate(post.date) }}
            </time>
          </div>
          <div class="flex-1 py-4 lg:p-0">
            <h2
              class="text-xl text-pretty font-semibold text-highlighted"
            >
              {{ post.title }}
            </h2>
            <p class="text-muted text-sm mb-4">
              {{ post.description }}
            </p>
            <UButton
              size="xs"
              variant="link"
              class="px-0 gap-0"
              label="Read Article"
            >
              <template #trailing>
                <UIcon
                  name="i-lucide-arrow-right"
                  class="size-4 text-primary transition-all opacity-0 group-hover:translate-x-1 group-hover:opacity-100"
                />
              </template>
            </UButton>
          </div>
        </NuxtLink>
      </div>
    </div>
  </UPageSection>
</template>
