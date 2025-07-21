<script setup lang="ts">
import { RouterLink } from 'vue-router'

const { to } = defineProps<{
  to: string
}>()
</script>

<template>
  <RouterLink :to="to" class="hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200 rounded-sm p-3">
    <slot> </slot>
  </RouterLink>
</template>
