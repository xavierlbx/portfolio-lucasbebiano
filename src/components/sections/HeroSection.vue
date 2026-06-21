<script setup lang="ts">
import { ref } from 'vue'
import { useDarkMode } from '../../composables/useDarkMode'
import { useTypingAnimation } from '../../composables/useTypingAnimation'
import { useHeroCanvas } from '../../composables/useHeroCanvas'

const { isDark } = useDarkMode()
const { typedLine1, typedLine2, typingPhase, showCursor } = useTypingAnimation()

const heroCanvasRef = ref<HTMLCanvasElement | null>(null)
useHeroCanvas(isDark, heroCanvasRef)

const scrollTo = (hash: string) => {
  const el = document.querySelector(hash)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <!-- Hero / Bem vindo — min-h-[100dvh] accounts for mobile browser chrome -->
  <section class="relative min-h-[100dvh] w-full overflow-hidden">
    <!-- Canvas: floating code tokens -->
    <canvas
      ref="heroCanvasRef"
      class="pointer-events-none absolute inset-0 h-full w-full select-none"
      aria-hidden="true"
    />

    <!-- Dot-grid overlay -->
    <div class="hero-grid-overlay pointer-events-none absolute inset-0" aria-hidden="true" />

    <!-- Radial glow -->
    <div
      class="pointer-events-none absolute inset-0"
      :style="
        isDark
          ? 'background: radial-gradient(ellipse 65% 55% at 62% 50%, rgba(234, 179, 8, 0.07) 0%, transparent 65%)'
          : 'background: radial-gradient(ellipse 65% 55% at 62% 50%, rgba(16, 185, 129, 0.07) 0%, transparent 65%)'
      "
      aria-hidden="true"
    />

    <!-- Content: stacked on mobile, side-by-side on md+ -->
    <div
      class="relative z-10 flex min-h-[100dvh] flex-col items-center justify-center gap-6 px-8 pt-20 pb-16 md:flex-row md:gap-16 md:px-24 md:pt-0 md:pb-0"
    >
      <!-- Desktop image (hidden on mobile) -->
      <div class="hidden md:flex md:shrink-0 md:items-center md:justify-center">
        <div class="relative">
          <div
            class="absolute -inset-6 rounded-full opacity-25 blur-xl"
            :style="
              isDark
                ? 'background: radial-gradient(circle, #eab308 0%, transparent 70%)'
                : 'background: radial-gradient(circle, #10b981 0%, transparent 70%)'
            "
            aria-hidden="true"
          />
          <img
            src="/images/coding-image.png"
            alt="Ilustração de programação"
            class="relative w-60 opacity-90 drop-shadow-2xl transition-transform duration-300 hover:scale-[1.1] lg:w-[16.25rem] xl:w-72"
            fetchpriority="high"
          />
        </div>
      </div>

      <!-- Text block -->
      <div class="flex flex-col items-center gap-4 md:items-start">
        <!-- Badge "Full Stack Developer" -->
        <div
          class="inline-flex items-center gap-2 rounded-full border border-emerald-500/35 bg-emerald-500/8 dark:border-yellow-500/30 dark:bg-yellow-500/8 px-4 py-1.5 transition-all duration-700"
          :class="typingPhase >= 2 ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'"
        >
          <span class="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500 dark:bg-yellow-400" />
          <span class="text-xs font-semibold tracking-[0.2em] text-emerald-700 dark:text-yellow-300 uppercase"
            >Full Stack Developer</span
          >
        </div>

        <!-- Line 1: "Hello World!" (typing) -->
        <p
          class="text-sm font-bold tracking-[0.35em] text-slate-700 dark:text-slate-400 uppercase"
          style="font-family: 'Courier New', monospace; min-height: 1.5em"
        >
          {{ typedLine1
          }}<span v-if="typingPhase === 0 && showCursor" class="cursor text-emerald-500 dark:text-yellow-400">|</span>
        </p>

        <!-- Line 2: "Bem vindo(a)!" (typing, big) -->
        <p
          class="text-4xl font-black tracking-tight text-gray-900 dark:text-white transition-all duration-700 sm:text-5xl lg:text-6xl"
          :class="typingPhase >= 1 ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'"
          style="font-family: 'Courier New', monospace"
        >
          {{ typedLine2
          }}<span v-if="typingPhase === 1 && showCursor" class="cursor text-emerald-500 dark:text-yellow-400">|</span>
        </p>

        <!-- Name -->
        <p
          class="text-base font-semibold tracking-widest text-slate-800 dark:text-slate-300 transition-all delay-75 duration-700 sm:text-lg"
          :class="typingPhase >= 2 ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'"
        >
          Eu sou o <span class="font-black text-emerald-600 dark:text-yellow-400">Lucas Xavier</span>
        </p>

        <!-- Stack label -->
        <p
          class="text-sm tracking-wide text-slate-600 dark:text-slate-500 transition-all delay-100 duration-700 md:text-base"
          :class="typingPhase >= 2 ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'"
        >
          JS &nbsp;·&nbsp; TypeScript &nbsp;·&nbsp; Vue &nbsp;·&nbsp; NestJS &nbsp;·&nbsp; .NET
          &nbsp;·&nbsp; SQL
        </p>

        <!-- CTA buttons -->
        <div
          class="mt-2 flex flex-wrap gap-3 transition-all delay-200 duration-700"
          :class="typingPhase >= 2 ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'"
        >
          <button
            class="hero-btn-primary rounded-lg bg-emerald-500 px-5 py-2.5 text-sm font-bold text-white dark:bg-yellow-500 dark:text-black transition-all duration-200 hover:bg-emerald-400 dark:hover:bg-yellow-400 active:scale-95"
            @click="scrollTo('#projects')"
          >
            Ver Projetos
          </button>
          <button
            class="rounded-lg border border-stone-400 dark:border-white/20 px-5 py-2.5 text-sm font-semibold text-slate-800 dark:text-slate-300 transition-all duration-200 hover:border-emerald-500/45 dark:hover:border-white/40 hover:text-slate-950 dark:hover:text-white active:scale-95"
            @click="scrollTo('#contact')"
          >
            Fale Comigo
          </button>
        </div>
      </div>

      <!-- Mobile coding image (visible only below md, hidden when viewport is too short) -->
      <div class="mt-2 block md:hidden">
        <img
          src="/images/coding-image.png"
          alt="Ilustração de programação"
          class="w-[12.5rem] opacity-80 drop-shadow-2xl transition-transform duration-300 hover:scale-[1.1]"
          loading="lazy"
          decoding="async"
        />
      </div>
    </div>

    <!-- Scroll down indicator -->
    <div
      class="absolute bottom-8 left-1/2 z-10 flex flex-col items-center gap-2 transition-all duration-500"
      :class="typingPhase === 2 ? 'opacity-100' : 'opacity-0'"
      style="transform: translate3d(-50%, 0, 0)"
    >
      <span class="text-[10px] tracking-[0.25em] text-slate-500 dark:text-slate-600 uppercase"
        >Role para baixo</span
      >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-4 w-4 animate-bounce text-slate-500 dark:text-slate-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  </section>
</template>

<style scoped>
.hero-btn-primary:hover {
  box-shadow: 0 0 22px rgba(5, 150, 105, 0.46);
}

:global(html.dark) .hero-btn-primary:hover {
  box-shadow: 0 0 22px rgba(234, 179, 8, 0.45);
}

.cursor {
  display: inline-block;
  font-weight: 100;
  animation: blink 0.65s step-end infinite;
}
</style>
