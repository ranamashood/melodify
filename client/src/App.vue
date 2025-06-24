<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useFetch } from './helpers'
import { store } from './store'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const fetchProfile = async () => {
  if (store.user.username || route.path === '/login' || route.path === '/register') {
    return
  }

  const { data } = await useFetch(`${import.meta.env.VITE_BASE_URL}/auth/profile`)
    .get()
    .json()

  store.user = data.value
}

onMounted(async () => {
  await router.isReady()
  fetchProfile()
})

watch(
  () => route.path,
  () => {
    fetchProfile()
  },
)
</script>

<template>
  <router-view />
</template>
