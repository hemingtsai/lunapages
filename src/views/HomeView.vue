<!-- src/views/PostPage.vue -->
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import TypeIt from 'typeit'

import MarkdownIt from 'markdown-it'
import markdownItHighlightjs from 'markdown-it-highlightjs'
import markdownItClass from 'markdown-it-class'
import markdownStyle from '@/markdown_style'

// Markdown 渲染区域
const type_it_element = ref<HTMLElement | null>(null)
const markdown_it_element = ref<string>('')
const loading = ref<boolean>(true)
const website_title = import.meta.env.VITE_WEBSITE_TITLE

onMounted(() => {
  // 打字效果
  if (type_it_element.value) {
    new TypeIt(type_it_element.value, {
      strings: [`Welcome to ${website_title}`],
      speed: 100,
      loop: false,
      breakLines: false,
    }).go()
  }

  fetch(`${import.meta.env.VITE_API_URL}/`)
    .then((res) => res.json())
    .then((data) => {
      const md = new MarkdownIt({
        html: true,
        linkify: true,
        typographer: true,
      })
        .use(markdownItHighlightjs)
        .use(markdownItClass, markdownStyle)

      const html = md.render(data)
      markdown_it_element.value = html
      loading.value = false
    })
    .catch((err) => {
      console.error('Error:', err)
      markdown_it_element.value = 'Error loading post.'
      loading.value = false
    })
})
</script>

<template>
  <main>
    <!-- 顶部欢迎区 -->
    <div
      class="bg-gray-200 dark:bg-gray-800 dark:text-white text-center bg-[url(@/assets/Boochi_the_rock_1920x1080_PNG.png)] bg-center bg-cover animate-background"
    >
      <div class="backdrop-blur-sm p-20">
        <p class="text-6xl m-auto w-full opacity-0 animate-fade-in" ref="type_it_element"></p>
        <p class="text-2xl mt-4 font-serif">时间存在的证明是风蚀的痕迹</p>
      </div>
    </div>

    <!-- 加载中 -->
    <div v-if="loading" class="flex items-center gap-2 justify-center py-10">
      <span class="font-serif text-lg">Loading</span>
      <span class="loading loading-spinner loading-xl"></span>
    </div>

    <!-- Markdown内容 -->
    <transition name="fade">
      <div
        v-show="!loading"
        class="prose dark:prose-invert font-serif px-4 py-8 mx-auto max-w-3xl"
        v-html="markdown_it_element"
      ></div>
    </transition>
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
