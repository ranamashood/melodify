<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useFetch } from './helpers'
import { store } from './store'
import { useRoute, useRouter } from 'vue-router'
import LeftSidebar from '@/components/LeftSidebar.vue'
import RightSidebar from '@/components/RightSidebar.vue'
import SeekBar from '@/components/SongPlayer.vue'

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
  <div class="layout">
    <aside>
      <LeftSidebar />
    </aside>
    <main>
      <router-view />
    </main>
    <aside>
      <RightSidebar />
    </aside>
    <SeekBar />
  </div>
</template>

<style scoped>
.layout {
  display: flex;
}

main {
  flex: 1;
}
</style>
