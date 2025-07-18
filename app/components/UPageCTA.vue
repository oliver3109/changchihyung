<script setup lang="ts">
interface Props {
  title?: string
  description?: string
  headline?: string
  variant?: 'solid' | 'outline' | 'soft' | 'ghost' | 'naked'
  color?: string
  orientation?: 'horizontal' | 'vertical'
  ui?: Record<string, any>
  class?: any
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'solid',
  color: 'primary',
  orientation: 'vertical',
  ui: () => ({})
})

defineSlots<{
  default?: any
  leading?: any
  headline?: any
  title?: any
  description?: any
  links?: any
}>()

const containerClasses = computed(() => {
  const base = 'relative isolate overflow-hidden'

  return [base, props.class].filter(Boolean).join(' ')
})

const titleClasses = computed(() => {
  const base =
    'text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight'
  const orientationClasses = {
    horizontal: 'text-left',
    vertical: 'text-center'
  }

  return [
    base,
    orientationClasses[props.orientation],
    props.ui?.title
  ]
    .filter(Boolean)
    .join(' ')
})

const descriptionClasses = computed(() => {
  const base = 'text-base sm:text-lg'
  const orientationClasses = {
    horizontal: 'text-left text-pretty',
    vertical: 'text-center text-balance'
  }

  return [
    base,
    orientationClasses[props.orientation],
    props.ui?.description
  ]
    .filter(Boolean)
    .join(' ')
})

const headlineClasses = computed(() => {
  const base =
    'mb-3 font-semibold text-sm uppercase tracking-wide'
  const orientationClasses = {
    horizontal: 'text-left',
    vertical: 'text-center'
  }

  return [
    base,
    orientationClasses[props.orientation],
    props.ui?.headline
  ]
    .filter(Boolean)
    .join(' ')
})

const linksClasses = computed(() => {
  const base = 'flex flex-wrap gap-x-6 gap-y-3 mt-6'
  const orientationClasses = {
    horizontal: 'justify-start',
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
  <div :class="containerClasses">
    <div
      class="w-full max-w-(--ui-container) mx-auto"
      :class="props.ui?.container"
    >
      <div
        v-if="$slots.leading"
        class="mb-6"
        :class="props.ui?.leading"
      >
        <slot name="leading" />
      </div>

      <div
        v-if="$slots.headline || headline"
        :class="headlineClasses"
      >
        <slot name="headline">
          <span v-if="headline">
            {{ headline }}
          </span>
        </slot>
      </div>

      <h2
        v-if="$slots.title || title"
        :class="titleClasses"
      >
        <slot name="title">
          {{ title }}
        </slot>
      </h2>

      <p
        v-if="$slots.description || description"
        :class="[descriptionClasses, title ? 'mt-4' : '']"
      >
        <slot name="description">
          {{ description }}
        </slot>
      </p>

      <div
        v-if="$slots.default"
        class="mt-6"
        :class="props.ui?.content"
      >
        <slot />
      </div>

      <div v-if="$slots.links" :class="linksClasses">
        <slot name="links" />
      </div>
    </div>
  </div>
</template>
