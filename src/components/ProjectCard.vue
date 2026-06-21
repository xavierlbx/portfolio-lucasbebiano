<script setup lang="ts">
import type { Project } from '../data/projects'

const props = defineProps<{
  project: Project
  variant?: 'mobile' | 'desktop'
}>()

const isDesktop = props.variant === 'desktop'
</script>

<template>
  <!-- Terminal bar -->
  <div
    class="flex items-center gap-1.5 border-b border-stone-300 dark:border-white/8 bg-stone-100 dark:bg-white/3 px-3 py-2"
  >
    <span
      class="h-2 w-2 rounded-full bg-stone-400 dark:bg-white/10"
      :class="isDesktop ? 'transition-colors duration-200 group-hover:bg-emerald-600/45 dark:group-hover:bg-yellow-500/40' : ''"
    />
    <span class="h-2 w-2 rounded-full bg-stone-400 dark:bg-white/10" />
    <span class="h-2 w-2 rounded-full bg-stone-400 dark:bg-white/10" />
    <span class="ml-1 truncate font-mono text-[9px] tracking-wider text-slate-500 dark:text-slate-600">
      {{ project.title.toLowerCase().replace(/\s/g, '-') }}.ts
    </span>
  </div>

  <!-- Image 16:9 -->
  <div class="aspect-video w-full overflow-hidden bg-stone-100 dark:bg-white/5">
    <img
      :src="project.image"
      :alt="project.title"
      class="h-full w-full object-cover transition-transform duration-500"
      :class="isDesktop ? 'group-hover:scale-105' : ''"
      loading="lazy"
      decoding="async"
    />
  </div>

  <!-- Content -->
  <div class="flex flex-1 flex-col gap-2 p-3">
    <h3 class="text-sm font-bold text-gray-900 dark:text-white">{{ project.title }}</h3>
    <p class="flex-1 text-xs leading-relaxed text-slate-700 dark:text-slate-400">
      {{ project.description }}
    </p>
    <div class="flex flex-wrap gap-1">
      <span
        v-for="tech in project.tech"
        :key="tech"
        class="rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-700 dark:border-yellow-500/20 dark:bg-yellow-500/8 dark:text-yellow-400"
      >
        {{ tech }}
      </span>
    </div>
    <span
      class="mt-1 inline-flex items-center gap-1 text-xs font-medium text-sky-700 transition-opacity duration-200"
      :class="isDesktop ? 'opacity-0 group-hover:opacity-100' : ''"
    >
      Ver detalhes
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-3 w-3"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
      </svg>
    </span>
  </div>
</template>
