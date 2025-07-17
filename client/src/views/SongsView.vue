<script setup lang="ts">
import SongsList from '@/components/SongsList.vue'
import { store } from '@/store'
import { onKeyStroke } from '@vueuse/core'

const closeCoverPreview = () => {
  store.previewCoverPath = ''
}

onKeyStroke('Escape', (e) => {
  closeCoverPreview()
})
</script>

<template>
  <Transition name="pop-in">
    <div class="cover-preview" @click="closeCoverPreview()" v-if="store.previewCoverPath">
      <img class="cover-preview__image" :src="store.previewCoverPath" @click.stop />
    </div>
  </Transition>
  <SongsList />
</template>

<style scoped>
.cover-preview {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;

  /* From https://css.glass */
  background: var(--secondary-300-alpha);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  z-index: 10;
}

.cover-preview__image {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50px;
  user-select: none;
}

.pop-in-enter-active,
.pop-in-leave-active {
  transition: all 100ms;
}

.pop-in-enter-from,
.pop-in-leave-to {
  border-radius: 50px;
  transform: scale(0.8);
  opacity: 0;
}

.pop-in-enter-to,
.pop-in-leave-from {
  border-radius: 0;
  transform: scale(1);
  opacity: 1;
}
</style>
