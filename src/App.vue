<script setup lang="ts">
import { onMounted, ref } from 'vue'
import LinkButton from './components/LinkButton.vue'
import DropDownList from './components/DropDownList.vue'
import DropDownItem from './components/DropDownItem.vue'


import type { Post } from '@/types/posts'

const website_title = ref<string>("");
const website_description = ref<string>("");
const special_pages = ref<Post[]>([])
const loading = ref(true)

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

</script>

<template>
  <header>
    <div class="flex p-4 bg-gray-200 dark:bg-gray-800 dark:text-white shadow-2xl">
      <LinkButton to="/" class="mr-2">{{ website_title }}</LinkButton>
      <div class="flex-1"></div>
      <LinkButton to="/blog" class="mr-2">Blog</LinkButton>
      <DropDownList>
        <template #title>
          <span class="font-medium text-center w-full">特殊页面</span>
        </template>
        <template #options>
          <DropDownItem v-for="(special_page_item, index) in special_pages" :key="index" class="w-full text-center">
            <LinkButton :to="`/special_pages/${index}`" class="w-full text-center">
              {{ special_page_item.title }}
            </LinkButton>
          </DropDownItem>
        </template>
      </DropDownList>
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
