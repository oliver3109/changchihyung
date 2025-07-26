<script setup lang="ts">
const { data: page } = await useAsyncData(
  'projects-page',
  () => {
    return queryCollection('pages')
      .path('/projects')
      .first()
  }
)
if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
    fatal: true
  })
}

const { data: projects } = await useAsyncData(
  'projects',
  () => {
    return queryCollection('projects')
      .order('date', 'DESC')
      .all()
  }
)

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const { global } = useAppConfig()

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
      <div
        v-if="page.links"
        class="flex items-center gap-2"
      >
        <UButton
          :label="page.links[0]?.label"
          :to="global.meetingLink"
          v-bind="page.links[0]"
        />
        <UButton
          :to="`mailto:${global.email}`"
          v-bind="page.links[1]"
        />
      </div>
    </UPageSection>

    <!-- Projects Section -->
    <UPageSection
      :ui="{
        container:
          'py-2 sm:py-4 lg:py-8 overflow-hidden flex flex-col gap-16 lg:gap-0'
      }"
    >
      <Motion
        v-for="(project, index) in projects"
        :key="project.title"
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
          class="lg:flex lg:gap-8 lg:items-center"
          :class="{
            'lg:flex-row-reverse': index % 2 === 1
          }"
        >
          <div class="flex-1">
            <div class="mb-2">
              <span class="text-sm text-muted">
                {{ formatDate(project.date) }}
              </span>
            </div>
            <h3 class="text-lg font-semibold mb-2">
              {{ project.title }}
            </h3>
            <p class="text-muted mb-4">
              {{ project.description }}
            </p>
            <ULink
              :to="'/projects/' + project.url"
              class="text-sm text-primary flex items-center mb-4"
            >
              View Project
              <UIcon
                name="i-lucide-arrow-right"
                class="size-4 text-primary transition-all opacity-0 group-hover:translate-x-1 group-hover:opacity-100"
              />
            </ULink>
          </div>
          <div class="lg:flex-shrink-0 lg:w-1/2">
            <img
              :src="project.image"
              :alt="project.title"
              class="object-cover w-full h-48 rounded-lg"
            />
          </div>
        </div>
      </Motion>
    </UPageSection>
  </div>
</template>
