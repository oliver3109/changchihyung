<script setup lang="ts">
import type { NuxtError } from '#app'

interface Props {
  error: NuxtError
  ui?: Record<string, any>
  class?: any
}

const props = withDefaults(defineProps<Props>(), {
  ui: () => ({})
})

defineSlots<{
  default?: any
  statusCode?: any
  statusMessage?: any
  message?: any
  links?: any
}>()

const rootClasses = computed(() => {
  return [
    'min-h-[calc(100vh-var(--ui-header-height))] flex flex-col items-center justify-center text-center px-4',
    props.ui?.root,
    props.class
  ].filter(Boolean).join(' ')
})

const statusCodeClasses = computed(() => {
  return [
    'text-base font-semibold text-primary',
    props.ui?.statusCode
  ].filter(Boolean).join(' ')
})

const statusMessageClasses = computed(() => {
  return [
    'mt-2 text-4xl sm:text-5xl font-bold text-highlighted text-balance',
    props.ui?.statusMessage
  ].filter(Boolean).join(' ')
})

const messageClasses = computed(() => {
  return [
    'mt-4 text-lg text-muted text-balance max-w-2xl',
    props.ui?.message
  ].filter(Boolean).join(' ')
})

const linksClasses = computed(() => {
  return [
    'mt-8 flex items-center justify-center gap-6',
    props.ui?.links
  ].filter(Boolean).join(' ')
})

// Default error messages based on status code
const getDefaultMessage = (statusCode: number) => {
  switch (statusCode) {
    case 404:
      return "We couldn't find the page you're looking for."
    case 500:
      return "Something went wrong on our end. Please try again later."
    case 403:
      return "You don't have permission to access this resource."
    case 401:
      return "You need to be authenticated to access this resource."
    default:
      return "An unexpected error occurred. Please try again later."
  }
}

const displayMessage = computed(() => {
  return props.error.message || getDefaultMessage(props.error.statusCode || 500)
})
</script>

<template>
  <div :class="rootClasses">
    <slot>
      <div v-if="$slots.statusCode || error.statusCode" :class="statusCodeClasses">
        <slot name="statusCode">
          {{ error.statusCode }}
        </slot>
      </div>
      
      <h1 v-if="$slots.statusMessage || error.statusMessage" :class="statusMessageClasses">
        <slot name="statusMessage">
          {{ error.statusMessage }}
        </slot>
      </h1>
      
      <p v-if="$slots.message || displayMessage" :class="messageClasses">
        <slot name="message">
          {{ displayMessage }}
        </slot>
      </p>
      
      <div v-if="$slots.links" :class="linksClasses">
        <slot name="links">
          <UButton to="/" variant="solid" color="primary">
            Go Home
          </UButton>
          <UButton @click="$router.go(-1)" variant="ghost" color="neutral">
            Go Back
          </UButton>
        </slot>
      </div>
    </slot>
  </div>
</template>
