<script setup lang="ts">
import { ToggleSwitch } from 'primevue'
import { ref, computed } from 'vue'
import { useDarkMode } from '../composables/useDarkMode'

const { isDark, toggleDarkMode } = useDarkMode()
const checked = ref(isDark.value)
const isMenuOpen = ref(false)

const handleToggle = () => {
  toggleDarkMode()
  checked.value = isDark.value
}

const navLinks = [
  { label: 'Skills' },
  { label: 'Sobre Mim' },
  { label: 'Projetos' },
  { label: 'Certificados' },
  { label: 'Fale Comigo' },
]

const title = 'Welcome to My Portfolio'

const projects = [
  {
    title: 'E-Commerce App',
    description:
      'Plataforma de e-commerce full stack com autenticação, carrinho e pagamento integrado.',
    tech: ['Vue.js', 'Node.js', 'PostgreSQL'],
    image: '/procedures-project-line-icon-with-checklist-vector.jpg',
    link: '#',
  },
  {
    title: 'Task Manager',
    description: 'Gerenciador de tarefas com drag-and-drop, filtros e colaboração em tempo real.',
    tech: ['React', 'TypeScript', 'Firebase'],
    image: '/procedures-project-line-icon-with-checklist-vector.jpg',
    link: '#',
  },
  {
    title: 'API REST',
    description: 'API RESTful com autenticação JWT, documentação Swagger e testes automatizados.',
    tech: ['Spring Boot', 'Java', 'MySQL'],
    image: '/procedures-project-line-icon-with-checklist-vector.jpg',
    link: '#',
  },
  {
    title: 'Dashboard Analytics',
    description:
      'Painel de métricas e visualização de dados com gráficos interativos e exportação.',
    tech: ['Vue.js', 'Chart.js', 'Tailwind'],
    image: '/procedures-project-line-icon-with-checklist-vector.jpg',
    link: '#',
  },
  {
    title: 'Chat em Tempo Real',
    description:
      'Aplicação de chat com WebSockets, salas privadas, notificações e histórico de mensagens.',
    tech: ['Vue.js', 'Socket.io', 'Node.js'],
    image: '/procedures-project-line-icon-with-checklist-vector.jpg',
    link: '#',
  },
  {
    title: 'Sistema de Agendamento',
    description:
      'Plataforma de agendamentos online com calendário interativo, notificações e painel admin.',
    tech: ['Angular', 'Spring Boot', 'PostgreSQL'],
    image: '/procedures-project-line-icon-with-checklist-vector.jpg',
    link: '#',
  },
]

const itemsPerPage = 6
const currentPage = ref(0)

const totalPages = computed(() => Math.ceil(projects.length / itemsPerPage))

const paginatedProjects = computed(() =>
  projects.slice(currentPage.value * itemsPerPage, (currentPage.value + 1) * itemsPerPage)
)

const prevPage = () => {
  if (currentPage.value > 0) currentPage.value--
}

const nextPage = () => {
  if (currentPage.value < totalPages.value - 1) currentPage.value++
}

type Project = (typeof projects)[number]
const selectedProject = ref<Project | null>(null)

const openModal = (project: Project) => {
  selectedProject.value = project
}

const closeModal = () => {
  selectedProject.value = null
}
</script>
<template>
  <main class="w-full bg-[#0D0D0D]">
    <!-- Navbar flutuante -->
    <div class="fixed top-3 right-0 left-0 z-50 flex justify-center px-4">
      <nav
        class="w-full max-w-5xl rounded-2xl bg-white/5 px-8 py-0 shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-xl"
      >
        <div class="flex h-14 items-center justify-between">
          <!-- Logo -->
          <span class="text-xl font-black tracking-[0.4em] text-white uppercase select-none">
            Lucas
          </span>

          <!-- Desktop links (centered) -->
          <ul class="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 md:flex">
            <li v-for="link in navLinks" :key="link.label">
              <a
                href="#"
                class="inline-block text-sm font-medium text-slate-300 transition-all duration-200 hover:scale-110 hover:text-white"
                @click.prevent
              >
                {{ link.label }}
              </a>
            </li>
          </ul>

          <!-- Hamburger button (mobile only) -->
          <button
            class="flex h-8 w-8 flex-col items-center justify-center gap-[5px] focus:outline-none md:hidden"
            :aria-expanded="isMenuOpen"
            aria-label="Abrir menu"
            @click="isMenuOpen = !isMenuOpen"
          >
            <span
              class="block h-0.5 w-6 origin-center bg-white transition-all duration-300"
              :class="isMenuOpen ? 'translate-y-[7px] rotate-45' : ''"
            />
            <span
              class="block h-0.5 w-6 bg-white transition-all duration-300"
              :class="isMenuOpen ? 'opacity-0' : ''"
            />
            <span
              class="block h-0.5 w-6 origin-center bg-white transition-all duration-300"
              :class="isMenuOpen ? '-translate-y-[7px] -rotate-45' : ''"
            />
          </button>
        </div>

        <!-- Mobile dropdown -->
        <div
          class="overflow-hidden transition-all duration-300 md:hidden"
          :class="isMenuOpen ? 'max-h-80' : 'max-h-0'"
        >
          <ul class="flex flex-col gap-1 border-t border-white/10 pt-2 pb-4">
            <li v-for="link in navLinks" :key="link.label">
              <a
                href="#"
                class="block inline-block w-full origin-left py-2 text-sm font-medium text-slate-300 transition-all duration-200 hover:scale-105 hover:text-white"
                @click.prevent="isMenuOpen = false"
              >
                {{ link.label }}
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>

    <div class="h-20" />

    <section class="flex min-h-screen items-center px-6 py-10">
      <div class="mx-auto flex w-full max-w-5xl flex-col items-center gap-8 text-center">
        <h1
          class="text-4xl font-extrabold tracking-tight text-slate-800 sm:text-5xl dark:text-slate-200"
        >
          {{ title }}
        </h1>

        <p class="max-w-2xl text-lg text-slate-600 dark:text-slate-300">
          Consectetur ullamco voluptate ad eu aute et culpa velit et occaecat eu adipisicing. Fugiat
          pariatur occaecat exercitation sunt consequat aliquip. Sint minim est eiusmod cillum
          eiusmod irure aliquip in nisi sit. Cupidatat culpa sunt dolore nulla anim aliquip eu sunt
          Lorem quis excepteur laborum. Cillum veniam et in magna proident esse in deserunt
          excepteur. Cillum ea sunt velit id pariatur consequat aliqua in reprehenderit sit sunt
          nulla.
        </p>

        <div
          class="flex items-center gap-4 rounded-xl bg-white/80 p-4 shadow-lg backdrop-blur-sm dark:bg-slate-800/80"
        >
          <span class="text-sm font-medium text-slate-700 dark:text-slate-300">
            {{ isDark ? 'Dark Mode' : 'Light Mode' }}
          </span>
          <ToggleSwitch v-model="checked" @change="handleToggle" />
        </div>
      </div>
    </section>

    <section id="about" class="bg-[#141414]/70 px-6 py-20 text-left md:py-32">
      <div
        class="mx-auto flex max-w-5xl flex-col items-center gap-12 md:flex-row md:items-center md:gap-16"
      >
        <!-- image -->
        <div class="flex w-full shrink-0 justify-center md:w-1/2">
          <img
            src="/aboutme-photo.jpg"
            alt="Imagem do Lucas vestindo a beca em uma formatura"
            class="w-64 max-w-full rounded-2xl shadow-xl shadow-black/50 transition-all duration-[600ms] hover:scale-105 sm:w-72 md:w-full md:max-w-sm dark:shadow-black/30"
          />
        </div>

        <!-- text -->
        <div class="w-full md:w-1/2">
          <h2
            class="mb-4 font-bold text-blue-500 sm:text-3xl md:text-4xl lg:text-5xl dark:text-blue-400"
          >
            Sobre mim
          </h2>
          <p class="text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-300">
            Desenvolvedor Full Stack graduado em Análise e Desenvolvimento de Sistemas, com
            experiência no desenvolvimento e manutenção de aplicações web, atuando em todo o ciclo
            de vida, do levantamento de requisitos à entrega. Foco em boas práticas de
            desenvolvimento, qualidade de código e colaboração em equipe. Perfil proativo, com busca
            contínua por evolução técnica e adoção de soluções que agreguem valor e eficiência aos
            sistemas.
          </p>
        </div>
      </div>
    </section>

    <section id="projects" class="px-6 py-20 md:py-32">
      <div class="mx-auto w-full max-w-7xl">
        <!-- Title -->
        <h2
          class="mb-12 text-center text-3xl font-bold text-blue-500 sm:text-4xl md:text-5xl dark:text-blue-400"
        >
          Projetos
        </h2>

        <!-- Mobile: Carrossel horizontal (< sm) -->
        <div
          class="carousel -mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 sm:hidden"
        >
          <div
            v-for="project in projects"
            :key="project.title"
            class="flex w-[82%] shrink-0 cursor-pointer snap-start flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-lg backdrop-blur-sm"
            @click="openModal(project)"
          >
            <!-- Imagem -->
            <div class="h-48 overflow-hidden bg-white/5">
              <img :src="project.image" :alt="project.title" class="h-full w-full object-cover" />
            </div>

            <!-- Conteúdo -->
            <div class="flex flex-1 flex-col gap-3 p-5">
              <h3 class="text-lg font-semibold text-white">{{ project.title }}</h3>
              <p class="flex-1 text-sm leading-relaxed text-slate-400">{{ project.description }}</p>

              <div class="flex flex-wrap gap-2">
                <span
                  v-for="tech in project.tech"
                  :key="tech"
                  class="rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-0.5 text-xs font-medium text-blue-400"
                >
                  {{ tech }}
                </span>
              </div>

              <span class="mt-1 inline-flex items-center gap-1 text-sm font-medium text-blue-400">
                Ver detalhes
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </span>
            </div>
          </div>
        </div>

        <!-- Desktop: Grid (>= sm) -->
        <div class="hidden sm:grid sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          <div
            v-for="project in paginatedProjects"
            :key="project.title"
            class="flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/40 hover:shadow-blue-500/10"
            @click="openModal(project)"
          >
            <!-- Imagem -->
            <div class="h-48 overflow-hidden bg-white/5">
              <img
                :src="project.image"
                :alt="project.title"
                class="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>

            <!-- Conteúdo -->
            <div class="flex flex-1 flex-col gap-3 p-5">
              <h3 class="text-lg font-semibold text-white">{{ project.title }}</h3>
              <p class="flex-1 text-sm leading-relaxed text-slate-400">{{ project.description }}</p>

              <div class="flex flex-wrap gap-2">
                <span
                  v-for="tech in project.tech"
                  :key="tech"
                  class="rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-0.5 text-xs font-medium text-blue-400"
                >
                  {{ tech }}
                </span>
              </div>

              <span class="mt-1 inline-flex items-center gap-1 text-sm font-medium text-blue-400">
                Ver detalhes
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </span>
            </div>
          </div>
        </div>

        <!-- Paginação (desktop only) -->
        <div v-if="totalPages > 1" class="mt-10 hidden items-center justify-center gap-4 sm:flex">
          <button
            :disabled="currentPage === 0"
            class="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-400 transition-all hover:border-blue-500/40 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
            aria-label="Página anterior"
            @click="prevPage"
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
              :class="
                currentPage === page - 1 ? 'w-6 bg-blue-500' : 'bg-white/20 hover:bg-white/40'
              "
              :aria-label="`Ir para página ${page}`"
              @click="currentPage = page - 1"
            />
          </div>

          <button
            :disabled="currentPage === totalPages - 1"
            class="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-400 transition-all hover:border-blue-500/40 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
            aria-label="Próxima página"
            @click="nextPage"
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
        </div>
      </div>
    </section>
  </main>
</template>
<style scoped>
.carousel {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.carousel::-webkit-scrollbar {
  display: none;
}
</style>
