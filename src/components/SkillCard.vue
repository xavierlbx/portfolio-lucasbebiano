<script setup lang="ts">
type Skill = {
  name: string
  icon: string
  subText: string
}

defineProps<{
  skill: Skill
}>()
</script>

<template>
  <div
    class="group flex h-50 w-40 shrink-0 flex-col items-center justify-center rounded-sm border border-stone-300 dark:border-white/10 bg-stone-50 dark:bg-white/5 px-4 py-3 text-center transition-[background-color,border-color] duration-300 hover:bg-stone-100 dark:hover:bg-white/10"
  >
    <img
      :src="skill.icon"
      :alt="skill.name"
      class="h-18 w-18 object-contain transition-transform duration-300 group-hover:scale-110"
      loading="lazy"
      decoding="async"
      draggable="false"
    />
    <hr class="my-3 w-full border-stone-300 dark:border-white/20" />
    <span class="text-md mb-1 font-bold whitespace-nowrap text-slate-800 dark:text-slate-200">{{
      skill.name
    }}</span>
    <span class="text-xs break-words text-slate-600 dark:text-slate-500">{{ skill.subText }}</span>
  </div>
</template>
