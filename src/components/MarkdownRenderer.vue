<!-- src/components/MarkdownRenderer.vue -->
<script setup lang="ts">
import { computed, defineProps } from 'vue'
import MarkdownIt from 'markdown-it'
import markdownItHighlightjs from 'markdown-it-highlightjs'
import markdownStyle from '@/markdown_style'
import markdownItClass from 'markdown-it-class'

const props = defineProps<{
  content: string
  loading: boolean
  error: string | null
}>()

// 计算属性：渲染Markdown内容
const renderedHtml = computed(() => {
  if (!props.content) return ''

  const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
  })
    .use(markdownItHighlightjs)
    .use(markdownItClass, markdownStyle)

  return md.render(props.content)
})
</script>

<template>
  <transition name="fade">
    <div
      v-if="!props.loading && !props.error"
      class="prose dark:prose-invert font-serif px-4 py-8 mx-auto max-w-3xl"
      v-html="renderedHtml"
    ></div>
  </transition>
</template>

<style scoped>
@import 'highlight.js/styles/github-dark.css';
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
