<script setup lang="ts">
import { computed, ref } from 'vue'

interface Props {
  videoId: string
  width?: number
  height?: number
  aspectRatio?: string
  autoplay?: boolean
  controls?: boolean
  muted?: boolean
  loop?: boolean
  title?: string
}

const props = withDefaults(defineProps<Props>(), {
  width: 560,
  height: 315,
  aspectRatio: '16/9',
  autoplay: false,
  controls: true,
  muted: false,
  loop: false,
  title: 'YouTube Video'
})

const isLoaded = ref(false)
const isPlaying = ref(false)
const video = ref()

async function play() {
  if (video.value?.player) {
    await video.value.player.playVideo()
  }
}

function stateChange(event: any) {
  // YouTube Player States:
  // -1 (unstarted)
  // 0 (ended)
  // 1 (playing)
  // 2 (paused)
  // 3 (buffering)
  // 5 (video cued)
  isPlaying.value = event.data === 1
}

function onReady() {
  isLoaded.value = true
}

// Player variables for YouTube API
const playerVars = computed(() => ({
  autoplay: props.autoplay ? 1 : 0,
  controls: props.controls ? 1 : 0,
  mute: props.muted ? 1 : 0,
  loop: props.loop ? 1 : 0,
  rel: 0,
  modestbranding: 1,
  playsinline: 1
}))
</script>

<template>
  <div class="youtube-player-wrapper my-6">
    <div
      class="relative w-full"
      :style="{ aspectRatio: aspectRatio }"
    >
      <ScriptYouTubePlayer
        ref="video"
        :video-id="videoId"
        :player-vars="playerVars"
        class="w-full h-full rounded-lg overflow-hidden shadow-lg"
        @ready="onReady"
        @state-change="stateChange"
      >
        <template #awaitingLoad>
          <div
            class="absolute inset-0 flex items-center justify-center bg-gray-900 rounded-lg"
          >
            <!-- Loading Spinner and YouTube Logo -->
            <div
              class="flex flex-col items-center space-y-4"
            >
              <div
                class="animate-spin rounded-full h-8 w-8 border-b-2 border-white"
              ></div>

              <!-- YouTube Logo -->
              <div class="h-[48px] w-[68px] opacity-80">
                <svg
                  height="100%"
                  version="1.1"
                  viewBox="0 0 68 48"
                  width="100%"
                >
                  <path
                    d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z"
                    fill="#ff0000"
                  />
                  <path
                    d="M 45,24 27,14 27,34"
                    fill="#ffffff"
                  />
                </svg>
              </div>

              <p class="text-white text-sm">
                Loading video...
              </p>
            </div>
          </div>
        </template>
      </ScriptYouTubePlayer>

      <!-- Play Status Indicator -->
      <div
        v-if="isLoaded && isPlaying"
        class="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-medium"
      >
        LIVE
      </div>
    </div>

    <!-- Video Info -->
    <div
      v-if="title && title !== 'YouTube Video'"
      class="mt-2 text-center"
    >
      <p class="text-sm text-gray-600 dark:text-gray-400">
        {{ title }}
      </p>
    </div>
  </div>
</template>
