<script setup lang="ts">
import type { IndexCollectionItem } from '@nuxt/content'

const { footer, global } = useAppConfig()

defineProps<{
  page: IndexCollectionItem
}>()
</script>

<template>
  <UPageSection
    :ui="{
      container: 'pt-24 pb-12 sm:pb-12 lg:pb-12'
    }"
  >
    <!-- Headline/Avatar -->
    <div class="flex items-center justify-center mb-6">
      <Motion
        :initial="{
          scale: 1.1,
          opacity: 0,
          filter: 'blur(20px)'
        }"
        :while-in-view="{
          scale: 1,
          opacity: 1,
          filter: 'blur(0px)'
        }"
        :transition="{
          duration: 0.6,
          delay: 0.1
        }"
      >
        <img
          src="/avatar.jpeg"
          alt="Regular img test"
          class="size-18 rounded-full object-cover"
        />
      </Motion>
    </div>

    <!-- Title -->
    <h1
      class="text-shadow-md max-w-lg mx-auto text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-4"
    >
      <Motion
        :initial="{
          scale: 1.1,
          opacity: 0,
          filter: 'blur(20px)'
        }"
        :while-in-view="{
          scale: 1,
          opacity: 1,
          filter: 'blur(0px)'
        }"
        :transition="{
          duration: 0.6,
          delay: 0.1
        }"
      >
        {{ page.title }}
      </Motion>
    </h1>

    <!-- Description -->
    <p
      class="text-md mx-auto max-w-2xl text-pretty sm:text-md text-muted text-center mb-8"
    >
      <Motion
        :initial="{
          scale: 1.1,
          opacity: 0,
          filter: 'blur(20px)'
        }"
        :while-in-view="{
          scale: 1,
          opacity: 1,
          filter: 'blur(0px)'
        }"
        :transition="{
          duration: 0.6,
          delay: 0.3
        }"
      >
        {{ page.description }}
      </Motion>
    </p>

    <!-- Links -->
    <div
      class="mt-4 flex flex-col justify-center items-center"
    >
      <Motion
        :initial="{
          scale: 1.1,
          opacity: 0,
          filter: 'blur(20px)'
        }"
        :while-in-view="{
          scale: 1,
          opacity: 1,
          filter: 'blur(0px)'
        }"
        :transition="{
          duration: 0.6,
          delay: 0.5
        }"
      >
        <div
          v-if="page.hero.links"
          class="flex items-center gap-2"
        >
          <UButton v-bind="page.hero.links[0]" />
          <UButton
            :color="global.available ? 'success' : 'error'"
            variant="ghost"
            class="gap-2"
            :to="global.available ? global.meetingLink : ''"
            :label="
              global.available
                ? 'Available for new projects'
                : 'Not available at the moment'
            "
          >
            <template #leading>
              <span class="relative flex size-2">
                <span
                  class="absolute inline-flex size-full rounded-full opacity-75"
                  :class="
                    global.available
                      ? 'bg-success animate-ping'
                      : 'bg-error'
                  "
                />
                <span
                  class="relative inline-flex size-2 scale-90 rounded-full"
                  :class="
                    global.available
                      ? 'bg-success'
                      : 'bg-error'
                  "
                />
              </span>
            </template>
          </UButton>
        </div>
      </Motion>

      <div class="gap-x-4 inline-flex mt-4">
        <Motion
          v-for="(link, index) of footer?.links"
          :key="index"
          :initial="{
            scale: 1.1,
            opacity: 0,
            filter: 'blur(20px)'
          }"
          :while-in-view="{
            scale: 1,
            opacity: 1,
            filter: 'blur(0px)'
          }"
          :transition="{
            duration: 0.6,
            delay: 0.5 + index * 0.1
          }"
        >
          <UButton
            v-bind="{
              size: 'md',
              color: 'neutral',
              variant: 'ghost',
              ...link
            }"
            target="_blank"
            :href="link"
          />
        </Motion>
      </div>
    </div>

    <!-- Image Marquee -->
    <!-- <div
      class="py-2 -mx-4 sm:-mx-6 lg:-mx-8 mt-8 relative flex items-center overflow-hidden gap-16 [--duration:40s]"
    >
      <div
        class="flex items-center shrink-0 justify-around gap-16 min-w-max w-full animate-[marquee_var(--duration)_linear_infinite] group-hover:[animation-play-state:paused]"
      >
        <Motion
          v-for="(img, index) in page.hero.images"
          :key="index"
          :initial="{
            scale: 1.1,
            opacity: 0,
            filter: 'blur(20px)',
          }"
          :while-in-view="{
            scale: 1,
            opacity: 1,
            filter: 'blur(0px)',
          }"
          :transition="{
            duration: 0.6,
            delay: index * 0.1,
          }"
        >
          <img
            width="234"
            height="234"
            class="rounded-lg"
            :class="index % 2 === 0 ? '-rotate-2' : 'rotate-2'"
            v-bind="img"
          />
        </Motion>
      </div>
    </div> -->
  </UPageSection>
</template>
