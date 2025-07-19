<script setup lang="ts">
import LinkButton from './components/LinkButton.vue'
const website_title = import.meta.env.VITE_WEBSITE_TITLE
</script>

<template>
  <header>
    <div class="flex p-4 bg-gray-200 dark:bg-gray-800 dark:text-white shadow-2xl">
      <LinkButton to="/" class="mr-2">{{ website_title }}</LinkButton>
      <div class="flex-1"></div>
      <LinkButton to="/blogs" class="mr-2">Blog</LinkButton>
    </div>
  </header>

  <RouterView class="min-h-screen bg-gray-200 dark:bg-gray-800 dark:text-white" />

  <footer class="flex p-4 bg-gray-200 dark:bg-gray-800 dark:text-white">
    <div>
      <p class="ml-2 text-bold">© {{ new Date().getFullYear() }} {{ website_title }}</p>
    </div>

    <div class="flex-1"></div>
    <a
      href="https://github.com/hemingtsai/lunapages"
      target="_blank"
      rel="noopener noreferrer"
      class="hover:underline mr-2"
      >GitHub</a
    >
  </footer>
</template>

<style scoped></style>
