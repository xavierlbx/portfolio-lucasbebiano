<script setup lang="ts">
import { useDarkMode } from '../../composables/useDarkMode'
import { skills } from '../../data/skills'
import SkillCard from '../SkillCard.vue'

const { isDark } = useDarkMode()
</script>

<template>
  <section id="skills" class="relative z-[1] overflow-hidden py-12 md:py-16">
    <!-- Dot-grid -->
    <div class="hero-grid-overlay pointer-events-none absolute inset-0" aria-hidden="true" />

    <!-- Radial glow: center -->
    <div
      class="pointer-events-none absolute inset-0"
      :style="
        isDark
          ? 'background: radial-gradient(ellipse 60% 40% at 50% 50%, rgba(234, 179, 8, 0.05) 0%, transparent 65%)'
          : 'background: radial-gradient(ellipse 60% 40% at 50% 50%, rgba(16, 185, 129, 0.05) 0%, transparent 65%)'
      "
      aria-hidden="true"
    />

    <div class="relative mx-auto w-full max-w-5xl px-4 sm:px-6">
      <!-- Header -->
      <div class="mb-12 flex flex-col items-center gap-2">
        <p class="font-mono text-xs tracking-[0.3em] text-gray-400 dark:text-slate-600 uppercase">
          // conhecimentos
        </p>
        <h2 class="text-3xl font-black text-gray-900 dark:text-white sm:text-4xl lg:text-5xl">
          Minha <span class="text-emerald-600 dark:text-yellow-400">Stack</span>
        </h2>
        <p class="mt-1 text-sm text-slate-600 dark:text-slate-500">
          Tecnologias que uso no dia a dia
        </p>
      </div>

      <!-- Skills grid -->
      <div class="mx-auto flex max-w-3xl flex-wrap justify-center gap-1 sm:gap-1.5">
        <SkillCard v-for="skill in skills" :key="skill.name" :skill="skill" />
      </div>
    </div>
  </section>
</template>
