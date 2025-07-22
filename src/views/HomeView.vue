<script setup lang="ts">
import { onMounted, ref } from 'vue'
import TypeIt from 'typeit'

import MarkdownRenderer from '@/components/MarkdownRenderer.vue'

const type_it_element = ref<HTMLElement | null>(null)
const content = ref<string>('')
const loading = ref<boolean>(true)
const error = ref<string | null>(null)
const website_title = ref<string>("");
const website_description = ref<string>("");

onMounted(async () => {
  try {
    const website_info = await fetch(`${import.meta.env.VITE_API_URL}/website_info`).then(res => res.json())
    website_title.value = website_info.title || "LunaPages"
    website_description.value = website_info.description || "A Vue.js powered blog platform"

    await fetch(`${import.meta.env.VITE_API_URL}/`)
      .then((res) => res.json())
      .then((data) => {
        content.value = data
        loading.value = false
      })

  } catch (err) {
    console.error('Failed to load post:', err)
    error.value = '无法加载文章，请稍后再试。'
  } finally {
    loading.value = false
  }

  // 打字效果
  if (type_it_element.value) {
    new TypeIt(type_it_element.value, {
      strings: [website_title.value],
      speed: 100,
      loop: false,
      breakLines: false,
    }).go()
  }

})
</script>

<template>
  <main>
    <!-- 顶部欢迎区 -->
    <div
      class="bg-gray-200 dark:bg-gray-800 dark:text-white text-center bg-[url(@/assets/Boochi_the_rock_1920x1080_PNG.png)] bg-center bg-cover animate-background">
      <div class="backdrop-blur-sm backdrop-brightness-125 dark:backdrop-brightness-75 py-20 w-full">
        <p class="text-4xl md:text-6xl lg:text-7xl m-auto w-full opacity-0 animate-fade-in text-nowrap text-center"
          ref="type_it_element"></p>
        <p class="text-xl md:text-2xl lg:text-3xl mt-4 font-serif">{{ website_description }}</p>
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
@import 'highlight.js/styles/github-dark.css';

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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
