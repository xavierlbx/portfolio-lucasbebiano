<script setup lang="ts">
type Skill = {
  name: string
  icon: string
}

defineProps<{
  skill: Skill
}>()
</script>

<template>
  <div
    class="group flex aspect-[3/4] w-[4.75rem] min-w-0 flex-col items-center rounded-lg border border-stone-300 bg-stone-50 px-1.5 py-2 text-center transition-[background-color,border-color] duration-300 hover:bg-stone-100 sm:w-[6rem] sm:px-2 sm:py-2.5 md:w-[7rem] md:px-2.5 md:py-3 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
  >
    <div class="flex min-h-0 flex-1 items-center justify-center">
      <img
        :src="skill.icon"
        :alt="skill.name"
        class="h-11 w-11 shrink-0 object-contain transition-transform duration-300 group-hover:scale-110 sm:h-14 sm:w-14 md:h-16 md:w-16"
        loading="lazy"
        decoding="async"
        draggable="false"
      />
    </div>
    <hr class="my-1 w-full shrink-0 border-stone-300 sm:my-1.5 dark:border-white/20" />
    <span
      class="w-full min-w-0 shrink-0 text-[10px] leading-tight font-bold break-words text-slate-800 sm:text-xs md:text-sm dark:text-slate-200"
    >
      {{ skill.name }}
    </span>
  </div>
</template>
