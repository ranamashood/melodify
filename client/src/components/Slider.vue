<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'

const { max, value, width } = defineProps<{
  max: number
  value: number
  width: number
}>()

const slider = ref<HTMLInputElement>()

const updateProgressBar = (newValue: number) => {
  const percent = ((newValue - 0) / (max - 0)) * 100

  if (slider.value) {
    slider.value.style.background = `linear-gradient(to right, var(--accent-500) 0%, var(--accent-500) ${percent}%, var(--primary-950) ${percent}%, var(--primary-950) 100%)`
  }
}

watch(
  () => value,
  (newValue) => {
    updateProgressBar(newValue)
  },
)

onMounted(() => {
  updateProgressBar(value)
})
</script>

<template>
  <input
    class="slider"
    type="range"
    min="0"
    :max="max"
    :value="value"
    :style="{ width: width + 'px' }"
    ref="slider"
    @change="$emit('change', $event)"
  />
</template>

<style scoped>
.slider {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 3px;
  border-radius: 5px;
  background: linear-gradient(to right, var(--accent-500) 0%, var(--primary-950) 0%);
  outline: none;
  cursor: pointer;
}

.slider:hover {
  height: 5px;
}

.slider::-webkit-slider-runnable-track {
  height: 3px;
}

.slider:hover::-webkit-slider-runnable-track {
  height: 5px;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 0;
  height: 0;
  margin-top: -5px;
  border: none;
  border-radius: 50%;
  background: var(--accent-500);
  cursor: pointer;
}

.slider:hover::-webkit-slider-thumb {
  width: 15px;
  height: 15px;
}

.slider::-moz-range-track {
  background: var(--primary-950);
}

.slider::-moz-range-progress {
  background: var(--accent-500);
}

.slider::-moz-range-thumb {
  width: 0;
  height: 0;
  border: none;
  border-radius: 50%;
  background: var(--accent-500);
  cursor: pointer;
  transition: all 100ms;
}

.slider:hover::-moz-range-thumb {
  width: 15px;
  height: 15px;
}
</style>
