<script setup lang="ts">
const route = useRoute()

const { data: page } = await useAsyncData(route.path, () =>
  queryCollection('projects').path(route.path).first()
)
if (!page.value)
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
    fatal: true
  })
const { data: surround } = await useAsyncData(
  `${route.path}-surround`,
  () =>
    queryCollectionItemSurroundings(
      'projects',
      route.path,
      {
        fields: ['description']
      }
    )
)
if (page.value.image) {
  defineOgImage({ url: page.value.image })
}

const title = page.value?.seo?.title || page.value?.title
const description =
  page.value?.seo?.description || page.value?.description

useSeoMeta({
  title,
  description,
  ogDescription: description,
  ogTitle: title
})

const articleLink = computed(() => `${window?.location}`)

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}
</script>

<template>
  <UMain class="mt-20 px-2">
    <UContainer class="relative min-h-screen">
      <div v-if="page">
        <ULink
          to="/projects"
          class="text-sm flex items-center gap-1"
        >
          <UIcon name="lucide:chevron-left" />
          Projects
        </ULink>
        <div class="flex flex-col gap-3 mt-8">
          <div
            class="flex text-xs text-muted items-center justify-center gap-2"
          >
            <span v-if="page.date">
              {{ formatDate(page.date) }}
            </span>
          </div>
          <img
            :src="page.image"
            :alt="page.title"
            class="rounded-lg w-full h-[300px] object-cover object-center"
          />
          <h1
            class="text-4xl text-center font-medium max-w-3xl mx-auto mt-4"
          >
            {{ page.title }}
          </h1>
          <p
            class="text-muted text-center max-w-2xl mx-auto"
          >
            {{ page.description }}
          </p>
        </div>
        <div class="max-w-3xl mx-auto py-16">
          <ContentRenderer
            v-if="page.body"
            class="prose"
            :value="page"
          />

          <div
            class="flex items-center justify-end gap-2 text-sm text-muted mt-20"
          >
            <UButton
              size="sm"
              variant="link"
              color="neutral"
              label="Copy link"
              @click="
                copyToClipboard(
                  articleLink,
                  'Article link copied to clipboard'
                )
              "
            />
          </div>
          <UContentSurround
            v-if="surround"
            :surround="surround"
          />
        </div>
      </div>
    </UContainer>
  </UMain>
</template>
