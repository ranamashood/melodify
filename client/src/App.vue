<script setup lang="ts">
import { watch } from 'vue'
import { useFetch } from './helpers'
import { store } from './store'
import { useRoute } from 'vue-router'

const route = useRoute()

watch(
  () => route.path,
  async (newPath) => {
    if (!store.user.username && newPath !== '/login' && newPath !== '/register') {
      const { data } = await useFetch(`${import.meta.env.VITE_BASE_URL}/auth/profile`)
        .get()
        .json()

      store.user = data.value
    }
  },
  { immediate: true },
)
</script>

<template>
  <router-view />
</template>
