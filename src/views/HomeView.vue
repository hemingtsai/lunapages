<script setup lang="ts">
import TypeIt from 'typeit'
import { onMounted, ref } from 'vue'
import { marked } from 'marked'

const type_it_element = ref<HTMLElement | null>(null)
const marked_element = ref<HTMLElement | null>(null)
const website_title = import.meta.env.VITE_WEBSITE_TITLE

onMounted(() => {
  if (type_it_element.value) {
    new TypeIt(type_it_element.value, {
      strings: [`Welcome to ${website_title}`],
      speed: 100,
      loop: false,
      breakLines: false,
    }).go()
  }

  if (marked_element.value) {
    marked_element.value.innerHTML = marked
      .parse(`# ${website_title}\n\nThis is a *simple* **markdown** rendering example.`)
      .toString()
  }
})
</script>

<template>
  <main>
    <div
      class="bg-gray-200 dark:bg-gray-800 dark:text-white w-full text-center bg-[url(@/assets/Boochi_the_rock_1920x1080_PNG.png)] bg-center bg-cover animate-background"
    >
      <div class="backdrop-blur-sm p-20">
        <p class="text-6xl m-auto w-full opacity-0 animate-fade-in" ref="type_it_element"></p>
        <p class="text-2xl mt-4 font-serif">时间存在的证明是风蚀的痕迹</p>
      </div>
    </div>

    <div ref="marked_element" class="mx-20 my-10"></div>
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
