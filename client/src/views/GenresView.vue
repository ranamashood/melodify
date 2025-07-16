<script setup lang="ts">
import { useFetch } from '@/helpers'
import type { Genre } from '@/types/Genre.interface'

const { isFetching, error, data: genres } = useFetch(`genres`).get().json<Genre[]>()
</script>

<template>
  <div class="genres">
    <RouterLink
      v-for="genre in genres"
      :to="{ name: 'genrePage', params: { name: genre.name } }"
      class="genre"
    >
      {{ genre.name }} {{ genre.count }}
    </RouterLink>
  </div>
</template>

<style scoped>
.genres {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.genre {
  color: var(--text-800);
  background-color: var(--primary-300);
  padding: 5px 10px;
  margin: 5px 0;
  text-decoration: none;
  border-radius: 12px;
}
</style>
