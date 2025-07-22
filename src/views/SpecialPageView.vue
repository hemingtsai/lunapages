<!-- src/views/PostPage.vue -->
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import TypeIt from 'typeit'
import { useRoute } from 'vue-router'
import MarkdownRenderer from '@/components/MarkdownRenderer.vue'
import type { Post } from '@/types/posts'

// Assume formatDate is defined to handle time object
import { formatDate } from '@/utils'

const route = useRoute()
const type_it_element = ref<HTMLElement | null>(null)
const content = ref<string>('')
const loading = ref<boolean>(true)
const date = ref<string>('')
const error = ref<string | null>(null)

onMounted(async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/special_pages/${route.params.id}`)
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`)
    const data: Post = await response.json()

    // TypeIt animation for title
    if (type_it_element.value) {
      new TypeIt(type_it_element.value, {
        strings: data.title,
        speed: 50,
        waitUntilVisible: true,
        afterComplete: () => {
          type_it_element.value!.classList.add('opacity-100')
        },
      }).go()
    }

    content.value = data.content
    date.value = formatDate(data.time)
  } catch (err) {
    console.error('Failed to load post:', err)
    error.value = '无法加载文章，请稍后再试。'
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <main>
    <!-- Header section -->
    <div
      class="bg-gray-200 dark:bg-gray-800 dark:text-white text-center bg-[url(@/assets/Boochi_the_rock_1920x1080_PNG.png)] bg-center bg-cover animate-background">
      <div class="backdrop-blur-sm backdrop-brightness-125 dark:backdrop-brightness-75 py-20 w-full">
        <p class="text-4xl lg:text-6xl m-auto w-full opacity-0 animate-fade-in text-nowrap text-center"
          ref="type_it_element"></p>
        <p class="text-2xl mt-4 font-serif">{{ date }}</p>
      </div>
    </div>

    <!-- Loading state -->
    <div v-if="loading" class="flex items-center gap-2 justify-center py-10">
      <span class="font-serif text-lg">加载中...</span>
      <span class="loading loading-spinner loading-xl"></span>
    </div>

    <!-- Error state -->
    <div v-else-if="error" class="text-center py-10 text-red-500 font-serif">
      {{ error }}
    </div>

    <!-- 使用Markdown渲染组件 -->
    <MarkdownRenderer :content="content" :loading="loading" :error="error" />
  </main>
</template>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes background {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.05);
  }

  100% {
    transform: scale(1);
  }
}

.animate-fade-in {
  animation: fade-in 2s ease-in-out forwards;
}

.animate-background {
  animation: background 10s ease-in-out infinite;
}
</style>
