<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Post {
  title: string
  time: {
    year: number
    month: number
    day: number
  }
}

interface PostWithDate extends Post {
  date: string
}

function formatDate(time: Post['time']) {
  const { year, month, day } = time
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
}

const loading = ref(true)
const posts = ref<PostWithDate[]>([])

onMounted(async () => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/posts_list`)
    const data: Post[] = await res.json()
    posts.value = data.map((post) => ({
      ...post,
      date: formatDate(post.time),
    }))
  } catch (err) {
    console.error('Error loading posts:', err)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <main>
    <div class="min-h-screen px-4 py-8 mx-auto max-w-3xl">
      <div class="p-4">
        <h1 class="text-6xl font-bold text-center mb-10">Blog Posts</h1>
        <div v-if="loading" class="text-center text-gray-500 animate-pulse">Loading...</div>
        <ul v-else>
          <li v-for="(post, index) in posts" :key="index" class="mb-6">
            <h2 class="text-2xl font-semibold">{{ post.title }}</h2>
            <div class="flex">
              <p class="text-gray-600">{{ post.date }}</p>
              <div class="flex-1"></div>
              <RouterLink
                :to="`/blog/${index}`"
                class="text-gray-700 dark:text-gray-200 hover:text-teal-500 underline transition-colors duration-200 font-medium decoration-dotted break-words"
                >Read More</RouterLink
              >
            </div>
          </li>
        </ul>
      </div>
    </div>
  </main>
</template>
