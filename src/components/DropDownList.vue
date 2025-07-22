<script setup lang="ts">
import { ref } from 'vue'

const hidden_state = ref(true)

function handleClick() {
  hidden_state.value = !hidden_state.value
}
</script>

<template>
  <div>
    <div class="relative inline-block w-48">
      <div @click="handleClick"
        class="flex p-3 pl-4 pr-10 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200 rounded-sm text-gray-800 dark:text-white outline-none cursor-pointer appearance-none focus:ring-2 focus:ring-gray-500 dark:focus:ring-gray-400">
        <slot name="title" class="text-center"></slot>
        <div
          class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700 dark:text-gray-300">
          <svg class="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
    </div>
    <transition name="fade">
      <div v-if="!hidden_state" class="absolute z-10 bg-gray-200 dark:bg-gray-800 rounded-md shadow-lg mt-3 w-48">
        <slot name="options"></slot>
      </div>
    </transition>

  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
