<template>
  <NuxtLink
    :to="`https://openprocessing.org/sketch/${art.id}/`"
    target="_blank"
  >
    <div class="border-dotted border-2 border-gray-300 rounded-lg p-6 mt-4">
      <div class="flex flex-row items-center justify-start">
        <img
          class="max-w-32 mr-4"
          :src="`https://openprocessing-usercontent.s3.amazonaws.com/thumbnails/visualThumbnail${art.id}@2x.jpg`"
        />
        <div class="flex flex-col justify-around h-32">
          <h2 class="text-2xl font-semibold">{{ art.title }}</h2>
          <div class="barcode">
            <img
              :src="`https://openprocessing-usercontent.s3.amazonaws.com/thumbnails/visualThumbnail${art.id}@2x.jpg`"
            />
          </div>
          <p class="text-lg text-gray">日期: {{ art.date }}</p>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup>
defineProps({
  art: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
.barcode {
  overflow: hidden;
  height: 20px;
  width: 100%;
}

.barcode img {
  -webkit-transform: scaleY(500);
  transform: scaleY(500);
  -webkit-transition-duration: 1s;
  transition-duration: 1s;
  -webkit-animation: moving 40s infinite alternate;
  animation: moving 40s infinite alternate;
}
</style>
