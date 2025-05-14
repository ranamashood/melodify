<script setup lang="ts">
defineProps<{
  max: number
  value: number
  width: number
}>()
</script>

<template>
  <input
    class="slider"
    type="range"
    min="0"
    :max="max"
    :value="value"
    :style="{ width: width + 'px' }"
    @change="$emit('change', $event)"
  />
</template>

<style scoped>
.slider {
  cursor: pointer;
}
</style>
