<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  href: string
  label: string
  external?: boolean
}>()

const linkAttrs = computed(() => {
  if (!props.external) return {}
  return {
    target: '_blank',
    rel: 'noopener noreferrer',
  }
})
</script>

<template>
  <a
    :href="href"
    v-bind="linkAttrs"
    class="group flex flex-col items-center gap-3 text-gray-600 dark:text-slate-400 transition-colors duration-200 hover:scale-105 hover:text-emerald-600 dark:hover:text-yellow-400 focus-visible:ring-2 focus-visible:ring-emerald-400/70 dark:focus-visible:ring-yellow-400/70 focus-visible:outline-none"
  >
    <slot />
    <span class="text-sm font-medium">{{ label }}</span>
  </a>
</template>
