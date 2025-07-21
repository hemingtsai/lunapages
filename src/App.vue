<script setup lang="ts">
import { onMounted, ref } from 'vue'
import LinkButton from './components/LinkButton.vue'

import { useRouter } from 'vue-router'


import type { Post } from '@/types/posts'

const website_title = ref<string>("");
const website_description = ref<string>("");
const special_pages = ref<Post[]>([])
const loading = ref(true)
const router = useRouter()

function handleSelectChange(event: Event) {
  const target = event.target as HTMLSelectElement
  const value = target.value
  if (value) {
    router.push(`/special_pages/${value}`)
  }
}
onMounted(async () => {
  try {
    // Fetch website info and special pages list
    const website_info = await fetch(`${import.meta.env.VITE_API_URL}/website_info`).then(res => res.json())
    website_title.value = website_info.title || "LunaPages"
    website_description.value = website_info.description || "A Vue.js powered blog platform"

    const res = await fetch(`${import.meta.env.VITE_API_URL}/special_pages_list`)
    const data: Post[] = await res.json()
    special_pages.value = data.map((post) => ({
      ...post
    }))
  } catch (err) {
    console.error('Error loading posts:', err)
  } finally {
    loading.value = false
  }
})


const selectedValue = ref('')
</script>

<template>
  <header>
    <div class="flex p-4 bg-gray-200 dark:bg-gray-800 dark:text-white shadow-2xl">
      <LinkButton to="/" class="mr-2">{{ website_title }}</LinkButton>
      <div class="flex-1"></div>
      <LinkButton to="/blog" class="mr-2">Blog</LinkButton>
      <div class="relative inline-block">
        <select
          class="p-3 pl-4 pr-10 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200 rounded-sm text-gray-800 dark:text-white outline-none cursor-pointer appearance-none focus:ring-2 focus:ring-gray-500 dark:focus:ring-gray-400"
          v-if="loading">
          <option selected class="py-2 px-4 font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700">
            Loading</option>
        </select>
        <select v-if="!loading" @change="handleSelectChange" v-model="selectedValue"
          class="p-3 pl-4 pr-10 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200 rounded-sm text-gray-800 dark:text-white outline-none cursor-pointer appearance-none focus:ring-2 focus:ring-gray-500 dark:focus:ring-gray-400">
          <option disabled value=""
            class="py-2 px-4 font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700">特殊页面</option>
          <option v-for="(special_page_item, index) in special_pages" :key="index" :value="index"
            class="py-2 px-4 hover:bg-gray-200 dark:hover:bg-gray-600 bg-gray-100 dark:bg-gray-700">
            {{ special_page_item.title }}
          </option>
        </select>
        <div
          class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700 dark:text-gray-300">
          <svg class="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
    </div>
  </header>

  <RouterView :key="$route.fullPath" class="min-h-screen bg-gray-200 dark:bg-gray-800 dark:text-white" />

  <footer class="flex p-4 bg-gray-200 dark:bg-gray-800 dark:text-white">
    <div>
      <p class="ml-2 text-bold">© {{ new Date().getFullYear() }} {{ website_title }}</p>
    </div>

    <div class="flex-1"></div>
    <a href="https://github.com/hemingtsai/lunapages" target="_blank" rel="noopener noreferrer"
      class="text-gray-700 dark:text-gray-200 hover:text-teal-500 underline transition-colors duration-200 font-medium decoration-dotted break-words">GitHub</a>
  </footer>
</template>

<style scoped></style>
