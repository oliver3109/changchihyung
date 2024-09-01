<template>
  <NuxtLink
    class="flex flex-col flex-row items-start gap-4 group p-2 -m-2 rounded-lg"
    :to="project._path"
  >
    <div class="max-w-full">
      <h3 class="text-sm font-medium group-hover:text-primary-600">
        {{ project.title }}
      </h3>
      <p class="text-gray-400 text-sm">{{ project.description }}</p>
    </div>
    <img class="max-w-full" :src="project.thumbnail" />
  </NuxtLink>
</template>

<script setup>
defineProps({
  project: {
    type: Object,
    required: true,
  },
});
</script>
