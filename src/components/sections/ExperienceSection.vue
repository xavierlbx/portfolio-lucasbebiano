<script setup lang="ts">
import { useDarkMode } from '../../composables/useDarkMode'
import { experiences } from '../../data/experience'

const { isDark } = useDarkMode()
</script>

<template>
  <section
    id="experience"
    class="relative z-[1] overflow-hidden px-4 py-12 sm:px-6 md:px-10 md:py-16"
  >
    <!-- Dot-grid -->
    <div class="hero-grid-overlay pointer-events-none absolute inset-0" aria-hidden="true" />

    <!-- Radial glow: right -->
    <div
      class="pointer-events-none absolute inset-0"
      :style="
        isDark
          ? 'background: radial-gradient(ellipse 50% 45% at 75% 40%, rgba(234, 179, 8, 0.06) 0%, transparent 65%)'
          : 'background: radial-gradient(ellipse 50% 45% at 75% 40%, rgba(16, 185, 129, 0.06) 0%, transparent 65%)'
      "
      aria-hidden="true"
    />

    <div class="relative mx-auto max-w-4xl">
      <!-- Header -->
      <div class="mb-10 flex flex-col items-center gap-2">
        <p class="font-mono text-xs tracking-[0.3em] text-slate-500 dark:text-slate-600 uppercase">
          // experiencias
        </p>
        <h2 class="text-3xl font-black text-gray-900 dark:text-white sm:text-4xl lg:text-5xl">
          Onde eu <span class="text-emerald-600 dark:text-yellow-400">trabalhei</span>
        </h2>
      </div>

      <!-- Experience cards side by side on md+, stacked on mobile -->
      <div class="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div
          v-for="exp in experiences"
          :key="exp.company"
          class="exp-card group rounded-xl border border-stone-300 dark:border-white/8 bg-stone-50 dark:bg-white/2 p-6 transition-[border-color,background-color] duration-300 hover:border-emerald-500/30 dark:hover:border-yellow-500/20 hover:bg-stone-100 dark:hover:bg-white/3"
        >
          <!-- Header row -->
          <div class="mb-1 flex items-start justify-between gap-3">
            <div>
              <p
                class="text-[11px] font-semibold tracking-widest uppercase"
                :class="
                  exp.isPrimary
                    ? 'text-emerald-600/90 dark:text-yellow-500/80'
                    : 'text-slate-600 dark:text-slate-500'
                "
              >
                {{ exp.company }}
              </p>
              <h3 class="mt-1 text-base leading-snug font-bold text-gray-900 dark:text-white">
                {{ exp.role }}
              </h3>
              <p v-if="exp.subtitle" class="mt-0.5 text-[11px] text-slate-500 dark:text-slate-600">
                {{ exp.subtitle }}
              </p>
            </div>
            <span
              class="shrink-0 rounded-full border border-stone-300 dark:border-white/10 bg-stone-100 dark:bg-white/4 px-2.5 py-1 font-mono text-[10px] text-slate-600 dark:text-slate-500"
            >
              {{ exp.period }}
            </span>
          </div>
          <p class="mb-4 text-[11px] text-slate-500 dark:text-slate-600">{{ exp.location }}</p>

          <!-- Bullets -->
          <ul class="flex flex-col gap-2.5">
            <li
              v-for="bullet in exp.bullets"
              :key="bullet"
              class="flex gap-2.5 text-sm leading-relaxed text-slate-700 dark:text-slate-400"
            >
              <span
                class="mt-1 h-1.5 w-1.5 shrink-0 rounded-full"
                :class="
                  exp.isPrimary
                    ? 'bg-emerald-500/60 dark:bg-yellow-500/60'
                    : 'bg-slate-400 dark:bg-white/25'
                "
              />
              {{ bullet }}
            </li>
          </ul>

          <!-- Tech stack chips -->
          <div v-if="exp.tech?.length" class="mt-5 flex flex-wrap gap-1.5">
            <span v-for="tech in exp.tech" :key="tech" class="chip">{{ tech }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.exp-card {
  backdrop-filter: blur(4px);
}

.exp-card:hover {
  box-shadow:
    0 8px 28px rgba(15, 23, 42, 0.1),
    0 0 0 1px rgba(5, 150, 105, 0.24);
}

:global(html.dark) .exp-card:hover {
  box-shadow:
    0 4px 24px rgba(0, 0, 0, 0.4),
    0 0 0 1px rgba(234, 179, 8, 0.1);
}
</style>
