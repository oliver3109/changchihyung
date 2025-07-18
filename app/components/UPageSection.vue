<script setup lang="ts">
interface Props {
  title?: string
  description?: string
  headline?: string
  orientation?: 'horizontal' | 'vertical'
  reverse?: boolean
  ui?: Record<string, any>
  class?: any
}

const props = withDefaults(defineProps<Props>(), {
  orientation: 'vertical',
  reverse: false,
  ui: () => ({})
})

defineSlots<{
  default?: any
  leading?: any
  headline?: any
  title?: any
  description?: any
  footer?: any
  links?: any
}>()

const containerClasses = computed(() => {
  const base = 'relative isolate'

  return [base].filter(Boolean).join(' ')
})

const descriptionClasses = computed(() => {
  const base =
    'text-balance text-left mt-2 text-sm sm:text-md lg:text-sm text-muted'

  return [base, props.ui?.description]
    .filter(Boolean)
    .join(' ')
})

const linksClasses = computed(() => {
  const base = 'flex flex-wrap gap-x-6 gap-y-3'
  const orientationClasses = {
    horizontal: '',
    vertical: 'justify-center'
  }

  return [
    base,
    orientationClasses[props.orientation],
    props.ui?.links
  ]
    .filter(Boolean)
    .join(' ')
})
</script>

<template>
  <section :class="[containerClasses, props.class]">
    <div
      v-if="$slots.default"
      :class="[
        'w-full max-w-(--ui-container) mx-auto px-4 sm:px-6 lg:px-8',
        props.ui?.container
      ]"
    >
      <div class="header" :class="props.ui?.header">
        <div
          v-if="$slots.leading"
          :class="[
            'text-pretty tracking-tight text-highlighted text-left text-xl sm:text-xl lg:text-2xl font-medium',
            props.ui?.leading
          ]"
        >
          <slot name="leading" />
        </div>
        <div
          v-else-if="title"
          :class="[
            'text-pretty tracking-tight text-highlighted text-left text-xl sm:text-xl lg:text-2xl font-medium',
            props.ui?.leading
          ]"
        >
          {{ title }}
        </div>

        <p
          v-if="$slots.description || description"
          :class="[descriptionClasses, title ? 'mt-2' : '']"
        >
          <slot name="description">
            {{ description }}
          </slot>
        </p>
      </div>

      <slot name="default">
        <slot />
      </slot>

      <div
        v-if="$slots.footer"
        class="mt-8"
        :class="props.ui?.footer"
      >
        <slot name="footer" />
      </div>

      <div v-if="$slots.links" :class="linksClasses">
        <slot name="links" />
      </div>
    </div>
  </section>
</template>
