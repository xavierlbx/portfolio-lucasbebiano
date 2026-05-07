<script setup lang="ts">
import { watch, onUnmounted } from 'vue'
import { featuredCertificates, aluraCertificates } from '../data/certificates'

const props = defineProps<{ modelValue: boolean }>()
const emit = defineEmits<{ 'update:modelValue': [value: boolean] }>()

const close = () => emit('update:modelValue', false)

const onKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') close()
}

watch(
  () => props.modelValue,
  (v) => {
    document.body.style.overflow = v ? 'hidden' : ''
    if (v) document.addEventListener('keydown', onKeydown)
    else document.removeEventListener('keydown', onKeydown)
  },
  { immediate: true },
)

onUnmounted(() => {
  document.body.style.overflow = ''
  document.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <Teleport to="body">
    <Transition name="cert-overlay">
      <div
        v-if="modelValue"
        class="fixed inset-0 z-[200] flex items-start justify-center overflow-y-auto p-3 pt-6 pb-10 bg-black/85 sm:items-center sm:p-6"
        role="dialog"
        aria-modal="true"
        aria-label="Modal de certificados"
        @click.self="close"
      >
        <div
          class="cert-panel relative w-full max-w-5xl flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 shadow-2xl"
          @click.stop
        >
          <!-- ── Header ─────────────────────────────────────────────── -->
          <div
            class="shrink-0 flex items-center justify-between gap-4 px-4 pt-5 pb-4 border-b border-white/8 sm:px-6"
          >
            <div>
              <p class="font-mono text-[10px] tracking-[0.3em] text-slate-600 uppercase">// certificados</p>
              <h2 class="mt-0.5 text-lg font-black text-white sm:text-2xl">
                Minhas <span class="text-yellow-400">Certificações</span>
              </h2>
            </div>
            <button
              class="shrink-0 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-slate-400 transition-all duration-200 hover:border-yellow-500/50 hover:text-yellow-400 hover:bg-yellow-500/5 focus-visible:ring-2 focus-visible:ring-yellow-400/60 focus-visible:outline-none"
              aria-label="Fechar modal de certificados"
              @click="close"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- ── Scrollable body ─────────────────────────────────────── -->
          <div class="cert-scrollable overflow-y-auto max-h-[75vh] px-4 py-6 flex flex-col gap-10 sm:max-h-[80vh] sm:px-6">

            <!-- ── Section 1: Destaques Acadêmicos ──────────────────── -->
            <section>
              <div class="flex items-center gap-3 mb-5">
                <span
                  class="shrink-0 inline-flex items-center gap-1.5 rounded-full border border-yellow-500/40 bg-yellow-500/10 px-3 py-1 text-[11px] font-bold text-yellow-400 uppercase tracking-wider"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-3 w-3 shrink-0"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path
                      d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                    />
                  </svg>
                  Destaques Acadêmicos
                </span>
                <div class="h-px flex-1 bg-white/8" />
              </div>

              <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div
                  v-for="cert in featuredCertificates"
                  :key="cert.title"
                  class="cert-card cert-featured group relative flex flex-col overflow-hidden rounded-xl border border-yellow-500/20 bg-white/3 transition-all duration-300 hover:border-yellow-500/50 hover:-translate-y-1"
                >
                  <!-- Badge -->
                  <div class="absolute top-2.5 left-2.5 z-10 pointer-events-none">
                    <span
                      class="inline-flex items-center gap-1 rounded-full border border-yellow-400/60 bg-black/80 px-2 py-0.5 text-[10px] font-bold text-yellow-400"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-2.5 w-2.5"
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

                  <!-- Image -->
                  <div class="aspect-[4/3] w-full overflow-hidden bg-zinc-900">
                    <img
                      :src="cert.image"
                      :alt="cert.title"
                      class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>

                  <!-- Content -->
                  <div class="flex flex-1 flex-col gap-2 p-4">
                    <h3 class="text-sm font-bold text-white leading-snug">{{ cert.title }}</h3>
                    <p class="text-xs leading-relaxed text-slate-400 flex-1">{{ cert.description }}</p>
                    <a
                      v-if="cert.link"
                      :href="cert.link"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="mt-1 inline-flex items-center gap-1.5 self-start rounded-lg border border-yellow-500/40 bg-yellow-500/8 px-3 py-1.5 text-[11px] font-semibold text-yellow-400 transition-all duration-200 hover:bg-yellow-500/15 hover:border-yellow-500/60 hover:text-yellow-300"
                    >
                      Ver certificado
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-3 w-3"
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
            </section>

            <!-- ── Section 2: Certificados Alura ────────────────────── -->
            <section>
              <div class="flex items-center gap-3 mb-5">
                <span
                  class="shrink-0 inline-flex items-center gap-1.5 rounded-full border border-sky-500/40 bg-sky-500/10 px-3 py-1 text-[11px] font-bold text-sky-400 uppercase tracking-wider"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-3 w-3 shrink-0"
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
                  Certificados Alura
                </span>
                <div class="h-px flex-1 bg-white/8" />
              </div>

              <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <a
                  v-for="cert in aluraCertificates"
                  :key="cert.title"
                  :href="cert.link"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="cert-card cert-alura group flex flex-col overflow-hidden rounded-xl border border-white/8 bg-white/3 transition-all duration-300 hover:border-sky-500/35 hover:-translate-y-1 no-underline"
                  style="text-decoration: none;"
                >
                  <!-- Image -->
                  <div class="aspect-[4/3] w-full overflow-hidden bg-zinc-900">
                    <img
                      :src="cert.image"
                      :alt="cert.title"
                      class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>

                  <!-- Content -->
                  <div class="flex flex-1 flex-col gap-2 p-4">
                    <h3 class="text-sm font-bold text-white leading-snug">{{ cert.title }}</h3>
                    <p class="text-xs leading-relaxed text-slate-400 flex-1">{{ cert.description }}</p>
                    <div
                      class="mt-1 inline-flex items-center gap-1.5 self-start rounded-lg border border-sky-500/30 bg-sky-500/8 px-3 py-1.5 text-[11px] font-semibold text-sky-400 transition-all duration-200 group-hover:bg-sky-500/15 group-hover:border-sky-500/50 group-hover:text-sky-300"
                    >
                      Ver certificado
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-3 w-3"
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
            </section>

          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
/* ── Overlay transition ─────────────────────── */
.cert-overlay-enter-active {
  transition: opacity 0.25s ease;
}
.cert-overlay-leave-active {
  transition: opacity 0.2s ease;
}
.cert-overlay-enter-from,
.cert-overlay-leave-to {
  opacity: 0;
}

/* ── Panel animation (driven by parent transition) ── */
.cert-overlay-enter-active .cert-panel {
  animation: cert-panel-in 0.32s cubic-bezier(0.34, 1.15, 0.64, 1) both;
}
.cert-overlay-leave-active .cert-panel {
  animation: cert-panel-out 0.18s ease-in both;
}

@keyframes cert-panel-in {
  from {
    opacity: 0;
    transform: scale(0.94) translateY(18px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

@keyframes cert-panel-out {
  from {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
  to {
    opacity: 0;
    transform: scale(0.96) translateY(10px);
  }
}

/* ── Cards ──────────────────────────────────── */
.cert-featured:hover {
  box-shadow: 0 10px 28px rgba(234, 179, 8, 0.1), 0 0 0 1px rgba(234, 179, 8, 0.2);
}

.cert-alura:hover {
  box-shadow: 0 10px 28px rgba(14, 165, 233, 0.08), 0 0 0 1px rgba(14, 165, 233, 0.15);
}

/* ── Scrollbar ──────────────────────────────── */
.cert-scrollable {
  scrollbar-width: thin;
  scrollbar-color: rgba(234, 179, 8, 0.2) transparent;
}
.cert-scrollable::-webkit-scrollbar {
  width: 4px;
}
.cert-scrollable::-webkit-scrollbar-track {
  background: transparent;
}
.cert-scrollable::-webkit-scrollbar-thumb {
  background: rgba(234, 179, 8, 0.2);
  border-radius: 4px;
}
.cert-scrollable::-webkit-scrollbar-thumb:hover {
  background: rgba(234, 179, 8, 0.35);
}
</style>
