<script setup lang="ts">
import { useFetch } from '@/helpers'
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const username = ref('')
const password = ref('')

const setToken = (token: string) => {
  localStorage.setItem('token', token)
  router.push({ name: 'home' })
}

const login = async () => {
  if (!username.value || !password.value) return

  const { data, error } = await useFetch(`${import.meta.env.VITE_BASE_URL}/auth/login`)
    .post({ user: { username: username.value, password: password.value } })
    .json()

  if (error.value) return

  setToken(data.value.access_token)
}

const register = async () => {
  if (!username.value || !password.value) return

  const { data, error } = await useFetch(`${import.meta.env.VITE_BASE_URL}/auth/register`)
    .post({ user: { username: username.value, password: password.value } })
    .json()

  if (error.value) return

  setToken(data.value.access_token)
}

const isLoginPage = computed(() => route.path === '/login')
</script>

<template>
  <div>
    <input type="text" placeholder="Username" v-model="username" />
    <input type="password" placeholder="Password" v-model="password" />
    <button @click="isLoginPage ? login() : register()">
      {{ isLoginPage ? 'Login' : 'Register' }}
    </button>
    <router-link :to="isLoginPage ? 'register' : 'login'">{{
      isLoginPage ? 'Register' : 'Login'
    }}</router-link>
  </div>
</template>
