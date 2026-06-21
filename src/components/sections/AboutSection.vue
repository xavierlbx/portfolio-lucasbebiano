<script setup lang="ts">
import { useDarkMode } from '../../composables/useDarkMode'

const { isDark } = useDarkMode()

const CHIPS = ['Ciclo completo', 'Boas práticas', 'Trabalho em equipe', 'Perfil proativo']
</script>

<template>
  <section
    id="about"
    class="relative z-[1] overflow-hidden px-4 py-12 sm:px-8 md:px-[3.75rem] md:py-16 lg:py-20"
  >
    <!-- Dot-grid -->
    <div class="hero-grid-overlay pointer-events-none absolute inset-0" aria-hidden="true" />

    <!-- Radial glow: left side -->
    <div
      class="pointer-events-none absolute inset-0"
      :style="
        isDark
          ? 'background: radial-gradient(ellipse 55% 50% at 20% 55%, rgba(234, 179, 8, 0.06) 0%, transparent 65%)'
          : 'background: radial-gradient(ellipse 55% 50% at 20% 55%, rgba(16, 185, 129, 0.06) 0%, transparent 65%)'
      "
      aria-hidden="true"
    />

    <div
      class="relative mx-auto flex max-w-5xl flex-col items-center gap-12 md:flex-row md:items-center md:gap-16"
    >
      <!-- Photo -->
      <div class="shrink-0">
        <div class="group relative w-52 sm:w-64 md:w-72" style="aspect-ratio: 4/5">
          <!-- Glow ring -->
          <div
            class="absolute -inset-4 rounded-3xl opacity-20 blur-xl"
            :style="
              isDark
                ? 'background: radial-gradient(circle, #eab308 0%, transparent 70%)'
                : 'background: radial-gradient(circle, #10b981 0%, transparent 70%)'
            "
            aria-hidden="true"
          />
          <!-- Photo 1 (hover fades to photo 2) -->
          <img
            src="/images/aboutme-photo.jpg"
            alt="Lucas Xavier na formatura"
            class="absolute inset-0 h-full w-full rounded-2xl object-cover shadow-2xl ring-1 ring-gray-200 dark:ring-white/10 transition-[opacity,transform] duration-300 will-change-transform group-hover:scale-[1.02] group-hover:opacity-0"
            loading="lazy"
            decoding="async"
          />
          <img
            src="/images/aboutme-photo-2.png"
            alt="Lucas Xavier"
            class="absolute inset-0 h-full w-full rounded-2xl object-cover object-top opacity-0 shadow-2xl ring-1 ring-gray-200 dark:ring-white/10 transition-[opacity,transform] duration-300 will-change-transform group-hover:scale-[1.02] group-hover:opacity-100"
            loading="lazy"
            decoding="async"
          />
          <!-- "Disponível" badge -->
          <div
            class="absolute -bottom-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 rounded-full border border-emerald-500/35 dark:border-yellow-500/30 bg-white dark:bg-[#0D0D0D] px-3 py-1 shadow-lg"
          >
            <span class="h-1.5 w-1.5 rounded-full bg-emerald-500 dark:bg-yellow-400" />
            <span
              class="text-[10px] font-semibold tracking-[0.15em] whitespace-nowrap text-emerald-700 dark:text-yellow-300 uppercase"
              >Disponível</span
            >
          </div>
        </div>
      </div>

      <!-- Content -->
      <div class="flex w-full flex-col gap-5">
        <p class="font-mono text-xs tracking-[0.3em] text-slate-500 dark:text-slate-600 uppercase">
          // sobre mim
        </p>

        <h2 class="text-3xl font-black text-gray-900 dark:text-white sm:text-4xl lg:text-5xl">
          Lucas <span class="text-emerald-600 dark:text-yellow-400">Xavier</span>
        </h2>

        <p class="text-sm leading-relaxed text-slate-700 dark:text-slate-400 sm:text-base">
          Desenvolvedor Full Stack com experiência no ciclo completo de aplicações web — do
          levantamento de requisitos à entrega. Perfil proativo, com busca contínua por evolução
          técnica e soluções que agreguem eficiência real aos sistemas.
        </p>

        <!-- Terminal card -->
        <div
          class="about-terminal rounded-xl border border-stone-300 dark:border-white/8 bg-stone-50 dark:bg-white/3 p-4 font-mono text-xs leading-relaxed sm:text-sm"
        >
          <div class="mb-3 flex items-center gap-1.5">
            <span class="h-2.5 w-2.5 rounded-full bg-stone-300 dark:bg-white/10" />
            <span class="h-2.5 w-2.5 rounded-full bg-stone-300 dark:bg-white/10" />
            <span class="h-2.5 w-2.5 rounded-full bg-stone-300 dark:bg-white/10" />
            <span class="ml-2 text-[10px] tracking-wider text-slate-500 dark:text-slate-600">lucas.ts</span>
          </div>
          <p>
            <span class="text-violet-700">const</span>
            <span class="text-teal-700 dark:text-yellow-300"> lucas</span>
            <span class="text-slate-600 dark:text-slate-400"> = {</span>
          </p>
          <p class="pl-4">
            <span class="text-sky-700">role</span><span class="text-slate-600 dark:text-slate-400">:</span>
            <span class="text-emerald-700"> 'Full Stack Developer'</span
            ><span class="text-slate-600 dark:text-slate-400">,</span>
          </p>
          <p class="pl-4">
            <span class="text-sky-700">formação</span><span class="text-slate-600 dark:text-slate-400">:</span>
            <span class="text-emerald-700"> 'ADS – Análise e Desenvolvimento de Sistemas'</span
            ><span class="text-slate-600 dark:text-slate-400">,</span>
          </p>
          <p class="pl-4">
            <span class="text-sky-700">stack</span><span class="text-slate-600 dark:text-slate-400">:</span>
            <span class="text-slate-600 dark:text-slate-400"> [</span
            ><span class="text-emerald-700">'JS'</span
            ><span class="text-slate-600 dark:text-slate-400">, </span
            ><span class="text-emerald-700">'TypeScript'</span
            ><span class="text-slate-600 dark:text-slate-400">, </span
            ><span class="text-emerald-700">'Vue'</span
            ><span class="text-slate-600 dark:text-slate-400">, </span
            ><span class="text-emerald-700">'NestJS'</span
            ><span class="text-slate-600 dark:text-slate-400">, </span
            ><span class="text-emerald-700">'.NET'</span
            ><span class="text-slate-600 dark:text-slate-400">, </span
            ><span class="text-emerald-700">'SQL'</span
            ><span class="text-slate-600 dark:text-slate-400">],</span>
          </p>
          <p class="pl-4">
            <span class="text-sky-700">foco</span><span class="text-slate-600 dark:text-slate-400">:</span>
            <span class="text-emerald-700"> 'boas práticas &amp; qualidade de código'</span
            ><span class="text-slate-600 dark:text-slate-400">,</span>
          </p>
          <p class="pl-4">
            <span class="text-sky-700">disponível</span><span class="text-slate-600 dark:text-slate-400">:</span>
            <span class="text-emerald-700 dark:text-yellow-400"> true</span
            ><span class="text-slate-600 dark:text-slate-400">,</span>
          </p>
          <p><span class="text-slate-600 dark:text-slate-400">}</span></p>
        </div>

        <!-- Chips using the global .chip class that auto-handles dark mode -->
        <div class="flex flex-wrap gap-2">
          <span v-for="label in CHIPS" :key="label" class="chip">{{ label }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about-terminal {
  backdrop-filter: blur(4px);
  box-shadow: 0 18px 40px rgba(148, 163, 184, 0.12);
}
</style>
