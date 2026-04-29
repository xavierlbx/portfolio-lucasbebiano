<script setup lang="ts">
const props = defineProps<{
  currentPage: number
  totalPages: number
}>()

const emit = defineEmits<{
  (event: 'update:currentPage', value: number): void
}>()

const goToPage = (page: number) => {
  emit('update:currentPage', page)
}

const goPrev = () => {
  if (props.currentPage > 0) {
    goToPage(props.currentPage - 1)
  }
}

const goNext = () => {
  if (props.currentPage < props.totalPages - 1) {
    goToPage(props.currentPage + 1)
  }
}
</script>

<template>
  <nav
    class="items-center justify-center gap-4"
    role="navigation"
    aria-label="Paginacao dos projetos"
  >
    <button
      :disabled="currentPage === 0"
      class="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-400 transition-all hover:border-yellow-500/40 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
      aria-label="Pagina anterior"
      @click="goPrev"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
      </svg>
    </button>

    <div class="flex gap-2">
      <button
        v-for="page in totalPages"
        :key="page"
        class="h-2.5 w-2.5 rounded-full transition-all duration-300"
        :class="currentPage === page - 1 ? 'w-6 bg-yellow-500' : 'bg-white/20 hover:bg-white/40'"
        :aria-label="`Ir para pagina ${page}`"
        :aria-current="currentPage === page - 1 ? 'page' : undefined"
        @click="goToPage(page - 1)"
      />
    </div>

    <button
      :disabled="currentPage === totalPages - 1"
      class="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-400 transition-all hover:border-yellow-500/40 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
      aria-label="Proxima pagina"
      @click="goNext"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </button>
  </nav>
</template>
