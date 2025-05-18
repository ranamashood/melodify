<script setup lang="ts">
import { store } from '@/store'
import { useMouse } from '@vueuse/core'
import { computed, watch } from 'vue'

const contextMenuVisible = computed(() => store.contextMenuVisible)

const { x, y } = useMouse()

let mouseX = 0
let mouseY = 0

watch(contextMenuVisible, (isContextMenuVisible) => {
  if (isContextMenuVisible) {
    mouseX = x.value
    mouseY = y.value
  }
})
</script>

<template>
  <div class="menu" v-if="contextMenuVisible" :style="{ left: `${mouseX}px`, top: `${mouseY}px` }">
    <button class="menu__item">Add to liked songs</button>
  </div>
</template>

<style scoped>
.menu {
  position: absolute;
  display: flex;
  border: 1px solid black;
  border-radius: 12px;
}

.menu__item {
  border: none;
  outline: none;
  padding: 10px 20px;
  border-radius: 12px;
}
</style>
