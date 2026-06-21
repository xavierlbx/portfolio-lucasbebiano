<script setup lang="ts">
import { ref } from 'vue'
import { useDarkMode } from '../../composables/useDarkMode'
import { useCertCarouselDrag } from '../../composables/useCertCarouselDrag'
import { featuredCertificates, aluraCertificates } from '../../data/certificates'

const { isDark } = useDarkMode()

const certCarouselRef = ref<HTMLElement | null>(null)
const certCarousel2Ref = ref<HTMLElement | null>(null)

const {
  isDragging: certIsDragging,
  canScroll: cert1CanScroll,
  onMouseDown: onCertMouseDown,
  onMouseMove: onCertMouseMove,
  onMouseUp: onCertMouseUp,
} = useCertCarouselDrag(certCarouselRef)

const {
  isDragging: certIsDragging2,
  canScroll: cert2CanScroll,
  onMouseDown: onCertMouseDown2,
  onMouseMove: onCertMouseMove2,
  onMouseUp: onCertMouseUp2,
} = useCertCarouselDrag(certCarousel2Ref)
</script>

<template>
  <section
    id="certificates"
    class="relative z-[1] overflow-hidden px-4 pt-12 pb-16 sm:px-6 md:px-[3.75rem] md:pt-16 md:pb-20"
  >
    <!-- Dot-grid -->
    <div class="hero-grid-overlay pointer-events-none absolute inset-0" aria-hidden="true" />

    <!-- Radial glow: left -->
    <div
      class="pointer-events-none absolute inset-0"
      :style="
        isDark
          ? 'background: radial-gradient(ellipse 55% 45% at 20% 40%, rgba(234, 179, 8, 0.05) 0%, transparent 65%)'
          : 'background: radial-gradient(ellipse 55% 45% at 20% 40%, rgba(16, 185, 129, 0.05) 0%, transparent 65%)'
      "
      aria-hidden="true"
    />

    <div class="relative mx-auto w-full max-w-7xl">
      <!-- Header -->
      <div class="mb-12 flex flex-col items-center gap-2">
        <p class="font-mono text-xs tracking-[0.3em] text-slate-500 dark:text-slate-600 uppercase">
          // certificados
        </p>
        <h2 class="text-3xl font-black text-gray-900 dark:text-white sm:text-4xl lg:text-5xl">
          Minhas <span class="text-emerald-600 dark:text-yellow-400">Certificações</span>
        </h2>
      </div>

      <!-- Row 1: Featured / Academic certificates -->
      <div class="mb-8">
        <p
          class="mb-3 text-center font-mono text-[10px] tracking-[0.25em] text-slate-500 dark:text-slate-600 uppercase"
        >
          ★ destaques acadêmicos
        </p>

        <div class="relative">
          <div
            ref="certCarouselRef"
            class="carousel -mx-4 flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 pb-2"
            style="justify-content: safe center; touch-action: pan-x pan-y"
            :style="{ cursor: certIsDragging ? 'grabbing' : 'grab', userSelect: 'none' }"
            @mousedown="onCertMouseDown"
            @mousemove="onCertMouseMove"
            @mouseup="onCertMouseUp"
            @mouseleave="onCertMouseUp"
          >
            <div
              v-for="cert in featuredCertificates"
              :key="`feat-${cert.title}`"
              class="cert-featured group relative flex w-64 shrink-0 snap-start flex-col overflow-hidden rounded-xl border border-emerald-600/30 dark:border-yellow-500/20 bg-stone-50 dark:bg-white/3 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-600/60 dark:hover:border-yellow-500/50"
            >
              <!-- Destaque badge -->
              <div class="pointer-events-none absolute top-2 left-2 z-10">
                <span
                  class="inline-flex items-center gap-1 rounded-full border border-emerald-500/70 dark:border-yellow-400/60 bg-black/80 px-1.5 py-0.5 text-[9px] font-bold text-emerald-400 dark:text-yellow-400"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-2 w-2"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path
                      d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                    />
                  </svg>
                  Destaque
                </span>
              </div>

              <div class="aspect-[4/3] w-full overflow-hidden bg-stone-200 dark:bg-zinc-900">
                <img
                  :src="cert.image"
                  :alt="cert.title"
                  class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <div class="flex flex-1 flex-col gap-1.5 p-2.5">
                <h3 class="line-clamp-2 text-[11px] leading-snug font-bold text-gray-900 dark:text-white">
                  {{ cert.title }}
                </h3>
                <p class="line-clamp-3 flex-1 text-[10px] leading-relaxed text-slate-700 dark:text-slate-400">
                  {{ cert.description }}
                </p>
                <a
                  v-if="cert.link"
                  :href="cert.link"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="mt-1 inline-flex items-center gap-1 self-start rounded border border-emerald-500/40 dark:border-yellow-500/40 bg-emerald-500/8 dark:bg-yellow-500/8 px-2 py-1 text-[9px] font-semibold text-emerald-700 dark:text-yellow-400 transition-all duration-200 hover:border-emerald-500/60 dark:hover:border-yellow-500/60 hover:bg-emerald-500/15 dark:hover:bg-yellow-500/15"
                  @mousedown.stop
                >
                  Ver certificado
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-2.5 w-2.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Drag indicator row 1 -->
        <div v-if="cert1CanScroll" class="mt-3 flex items-center justify-center gap-2">
          <span class="h-px w-8 bg-emerald-500/20 dark:bg-yellow-500/20" />
          <span
            class="flex items-center gap-1.5 rounded-full border border-emerald-500/25 dark:border-yellow-500/20 bg-emerald-500/6 dark:bg-yellow-500/6 px-3 py-1 text-[10px] font-medium text-emerald-600/70 dark:text-yellow-400/70"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-3 w-3 animate-[slide-left_1.4s_ease-in-out_infinite]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            arraste para ver mais
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-3 w-3 animate-[slide-right_1.4s_ease-in-out_infinite]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </span>
          <span class="h-px w-8 bg-emerald-500/20 dark:bg-yellow-500/20" />
        </div>
      </div>

      <!-- Row 2: Alura certificates -->
      <div>
        <p
          class="mb-3 text-center font-mono text-[10px] tracking-[0.25em] text-slate-500 dark:text-slate-600 uppercase"
        >
          // demais certificados
        </p>

        <div class="relative">
          <div
            ref="certCarousel2Ref"
            class="carousel -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2"
            style="justify-content: safe center; touch-action: pan-x pan-y"
            :style="{ cursor: certIsDragging2 ? 'grabbing' : 'grab', userSelect: 'none' }"
            @mousedown="onCertMouseDown2"
            @mousemove="onCertMouseMove2"
            @mouseup="onCertMouseUp2"
            @mouseleave="onCertMouseUp2"
          >
            <a
              v-for="cert in aluraCertificates"
              :key="`alura-${cert.title}`"
              :href="cert.link"
              target="_blank"
              rel="noopener noreferrer"
              class="cert-alura group flex w-64 shrink-0 snap-start flex-col overflow-hidden rounded-xl border border-stone-300 dark:border-white/8 bg-stone-50 dark:bg-white/3 transition-all duration-300 hover:-translate-y-1 hover:border-sky-600/45"
              style="text-decoration: none"
              @mousedown.stop
            >
              <div class="relative aspect-[4/3] w-full overflow-hidden bg-stone-200 dark:bg-zinc-900">
                <!-- Alura badge -->
                <div class="pointer-events-none absolute top-2 left-2 z-10">
                  <span
                    class="inline-flex items-center gap-1 rounded-full border border-sky-400/60 bg-black/80 px-1.5 py-0.5 text-[9px] font-bold text-sky-400"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-2 w-2 shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 3.741-1.342m-7.482 0c.338-.134.68-.265 1.028-.391m-1.028.391a50.717 50.717 0 0 0-3.741 1.342m7.482 0a50.717 50.717 0 0 0 3.741 1.342"
                      />
                    </svg>
                    Alura
                  </span>
                </div>
                <img
                  :src="cert.image"
                  :alt="cert.title"
                  class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <div class="flex flex-1 flex-col gap-1.5 p-2.5">
                <h3 class="line-clamp-2 text-[11px] leading-snug font-bold text-gray-900 dark:text-white">
                  {{ cert.title }}
                </h3>
                <p class="line-clamp-3 flex-1 text-[10px] leading-relaxed text-slate-700 dark:text-slate-400">
                  {{ cert.description }}
                </p>
                <div
                  class="mt-1 inline-flex items-center gap-1 self-start rounded border border-sky-600/35 bg-sky-600/10 px-2 py-1 text-[9px] font-semibold text-sky-700 transition-all duration-200 group-hover:border-sky-600/55 group-hover:bg-sky-600/15 group-hover:text-sky-800"
                >
                  Ver certificado
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-2.5 w-2.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                    />
                  </svg>
                </div>
              </div>
            </a>
          </div>
        </div>

        <!-- Drag indicator row 2 -->
        <div v-if="cert2CanScroll" class="mt-3 flex items-center justify-center gap-2">
          <span class="h-px w-8 bg-sky-500/20" />
          <span
            class="flex items-center gap-1.5 rounded-full border border-sky-500/20 bg-sky-500/6 px-3 py-1 text-[10px] font-medium text-sky-400/70"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-3 w-3 animate-[slide-left_1.4s_ease-in-out_infinite]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            arraste para ver mais
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-3 w-3 animate-[slide-right_1.4s_ease-in-out_infinite]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </span>
          <span class="h-px w-8 bg-sky-500/20" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cert-featured:hover {
  box-shadow:
    0 12px 30px rgba(5, 150, 105, 0.14),
    0 0 0 1px rgba(5, 150, 105, 0.32);
}

:global(html.dark) .cert-featured:hover {
  box-shadow:
    0 10px 28px rgba(234, 179, 8, 0.15),
    0 0 0 1px rgba(234, 179, 8, 0.25);
}

.cert-alura:hover {
  box-shadow:
    0 12px 28px rgba(2, 132, 199, 0.12),
    0 0 0 1px rgba(2, 132, 199, 0.24);
}
</style>
