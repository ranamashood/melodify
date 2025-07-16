<script setup lang="ts">
import LeftSidebar from '@/components/LeftSidebar.vue'
import RightSidebar from '@/components/RightSidebar.vue'
import SeekBar from '@/components/SongPlayer.vue'
import SongsList from '@/components/SongsList.vue'
import { store } from '@/store'
import { onKeyStroke } from '@vueuse/core'
import { ref, watch } from 'vue'

const previewCoverPath = ref('')

const closeCoverPreview = () => {
  store.previewCoverPath = ''
}

onKeyStroke('Escape', (e) => {
  closeCoverPreview()
})

watch(
  () => store.previewCoverPath,
  (newPreviewCoverPath) => {
    if (newPreviewCoverPath) {
      previewCoverPath.value = newPreviewCoverPath
    }
  },
)
</script>

<template>
  <SongsList />
  <div
    class="cover-preview"
    :class="{ 'cover-preview--active': store.previewCoverPath }"
    @click="closeCoverPreview()"
  >
    <img class="cover-preview__image" :src="previewCoverPath" @click.stop />
  </div>
</template>

<style scoped>
.cover-preview {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  transform: translate(0, 100%);
  transition: transform 300ms cubic-bezier(0.455, 0.03, 0.515, 0.955);

  /* From https://css.glass */
  background: var(--secondary-300-alpha);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  z-index: 10;
}

.cover-preview--active {
  transform: translate(0, 0);
}

.cover-preview__image {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50px;
  user-select: none;
}
</style>
