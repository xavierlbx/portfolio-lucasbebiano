<script setup lang="ts">
import { ToggleSwitch } from 'primevue'
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useDarkMode } from '../composables/useDarkMode'

const { isDark, toggleDarkMode } = useDarkMode()
const checked = ref(isDark.value)
const isMenuOpen = ref(false)

const handleToggle = () => {
  toggleDarkMode()
  checked.value = isDark.value
}

const scrollY = ref(0)

const handleScroll = () => {
  scrollY.value = window.scrollY
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const navLinks = [
  { label: 'Skills' },
  { label: 'Sobre Mim' },
  { label: 'Projetos' },
  { label: 'Certificados' },
  { label: 'Fale Comigo' },
]

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

const skills = [
  {
    name: 'HTML',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
  },
  {
    name: 'CSS',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
  },
  {
    name: 'JavaScript',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
  },
  {
    name: 'C#',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg',
  },
  {
    name: 'Node.js',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
  },
  {
    name: 'TypeScript',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
  },
  {
    name: 'NestJS',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-original.svg',
  },
  {
    name: 'Vue.js',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg',
  },
  {
    name: 'Entity Framework',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dotnetcore/dotnetcore-original.svg',
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

const line1 = 'Hello World! 👋'
const line2 = 'Lucas Bebiano'
const typedLine1 = ref('')
const typedLine2 = ref('')
const typingPhase = ref(0) // 0 = digitando linha1, 1 = digitando linha2, 2 = concluído
const showCursor = ref(true)

onMounted(() => {
  const speed = 70
  let i = 0
  let j = 0

  const typeLine2 = () => {
    if (j < line2.length) {
      typedLine2.value += line2[j++]
      setTimeout(typeLine2, speed)
    } else {
      typingPhase.value = 2
      setTimeout(() => {
        showCursor.value = false
      }, 2500)
    }
  }

  const typeLine1 = () => {
    if (i < line1.length) {
      typedLine1.value += line1[i++]
      setTimeout(typeLine1, speed)
    } else {
      typingPhase.value = 1
      setTimeout(typeLine2, 150)
    }
  }

  setTimeout(typeLine1, 400)
})
</script>
<template>
  <main class="min-h-screen w-full bg-[#0D0D0D]">
    <!-- Navbar flutuante -->
    <div class="fixed top-3 right-0 left-0 z-100 flex justify-center px-4">
      <nav
        class="w-full max-w-5xl rounded-2xl bg-black/40 px-8 py-0 shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-xl"
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
                class="hover:text-slate/100 inline-block text-sm font-medium text-white transition-all duration-200 hover:scale-110"
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
                class="hover:text-slate/100 block inline-block w-full origin-left py-2 text-sm font-medium text-white transition-all duration-200 hover:scale-105"
                @click.prevent="isMenuOpen = false"
              >
                {{ link.label }}
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>

    <!-- Bem vindo -->
    <section class="relative h-screen w-full overflow-hidden">
      <!-- Background Image | Parallax -->
      <div>
        <img
          src="/images/bg-1.png"
          alt=""
          class="absolute inset-0 z-10 h-full w-full object-cover object-top"
          :style="{ transform: `translate3d(0, ${scrollY * 0.8}px, 0)` }"
        />
        <img
          src="/images/bg-2.png"
          class="absolute bottom-15 left-0 z-20 w-full"
          :style="{ transform: `translate3d(0, ${scrollY * 0.6}px, 0)` }"
        />
        <img
          src="/images/jungle2.png"
          class="absolute bottom-40 left-0 z-30 w-full"
          :style="{ transform: `translate3d(-0, ${scrollY * 0.6}px, 0)` }"
        />
        <img
          src="/images/jungle3.png"
          class="absolute bottom-15 left-0 z-40 w-full"
          :style="{ transform: `translate3d(0, ${scrollY * 0.4}px, 0)` }"
        />
        <img
          src="/images/jungle4.png"
          class="absolute bottom-8 left-0 z-50 w-full"
          :style="{ transform: `translate3d(-0, ${scrollY * 0.4}px, 0)` }"
        />
        <img
          src="/images/man_on_mountain.png"
          class="absolute bottom-0 -left-20 z-70 w-full"
          :style="{ transform: `translate3d(0, 0, 0)` }"
        />
        <img
          src="/images/jungle5.png"
          class="absolute bottom-0 left-0 z-70 w-full"
          :style="{ transform: `translate3d(0, ${scrollY * 0.01}px, 0)` }"
        />
      </div>

      <!-- Main Text -->
      <div
        class="relative z-30 flex h-full items-center justify-center gap-10 px-10 md:px-20"
        :style="{ transform: `translate3d(0, ${scrollY * 0.9}px, 0)` }"
      >
        <!-- Left: Photo -->
        <div
          class="mb-70 hidden shrink-0 items-center justify-center hover:scale-105 transition-all duration-1000 md:flex"
          :class="typingPhase >= 1 ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'"
        >
          <img
            src="/images/coding-image.png"
            alt="Lucas Bebiano"
            class="w-52 lg:w-64"
          />
        </div>

        <!-- Right: Text -->
        <div class="mb-70 flex flex-col items-start">
          <!-- Greeting -->
          <p
            class="text-md mb-2 font-bold tracking-[0.35em] text-white uppercase text-shadow-2xs"
            :class="typingPhase >= 2 ? 'blink-text' : ''"
            style="font-family: 'Courier New', monospace"
          >
            {{ typedLine1
            }}<span v-if="typingPhase === 0 && showCursor" class="cursor text-slate-300">|</span>
          </p>

          <!-- Name headline -->
          <h1
            class="text-5xl leading-tight font-black text-white drop-shadow-2xl transition-all duration-700 sm:text-6xl md:text-7xl"
            :class="typingPhase >= 1 ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'"
          >
            Sou o
            <span class="bg-[#5A1615] via-yellow-300 bg-clip-text text-transparent">{{
              typedLine2
            }}</span
            ><span v-if="typingPhase === 1 && showCursor" class="cursor text-yellow-400">|</span>
          </h1>

          <!-- Subtitle -->
          <p
            class="mt-4 text-base font-medium tracking-widest text-slate-300 transition-all duration-700 sm:text-lg"
            :class="typingPhase === 2 ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'"
          >
            Desenvolvedor Web Fullstack
          </p>
        </div>
      </div>

      <!-- Scroll down -->
      <div
        class="absolute bottom-25 left-1/2 z-65 flex -translate-x-1/2 flex-col items-center gap-2 transition-all duration-500"
        :class="typingPhase === 2 ? 'opacity-100' : 'opacity-0'"
        :style="{ transform: `translate3d(0, ${scrollY * 0.6}px, 0)` }"
      >
        <span class="text-xs tracking-[0.25em] text-slate-500 uppercase">Role para baixo</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 animate-bounce text-slate-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>

    <section
      id="about"
      class="flex items-center justify-center px-6 py-16 md:py-20"
      style="background: linear-gradient(to bottom, #210002 0%, #0d0d0d 60%)"
    >
      <div
        class="mx-auto flex max-w-6xl flex-col items-center gap-12 md:flex-row md:items-center md:gap-0"
      >
        <!-- Left: Sobre mim -->
        <div class="w-full md:flex-1 md:pr-10">
          <h2
            class="mb-4 text-center text-2xl font-bold text-yellow-500 sm:text-3xl md:text-4xl lg:text-5xl dark:text-yellow-400"
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

        <!-- Center: Photo as divider -->
        <div
          class="relative flex shrink-0 flex-col items-center justify-center self-stretch md:px-10"
        >
          <div
            class="absolute inset-y-0 left-0 hidden w-px bg-gradient-to-b from-transparent via-white/15 to-transparent md:block"
          />
          <img
            src="/aboutme-photo.jpg"
            alt="Imagem do Lucas vestindo a beca em uma formatura"
            class="w-44 rounded-2xl shadow-xl ring-1 shadow-black/50 ring-white/10 transition-transform duration-500 hover:scale-105 md:w-60"
          />
          <div
            class="absolute inset-y-0 right-0 hidden w-px bg-gradient-to-b from-transparent via-white/15 to-transparent md:block"
          />
        </div>

        <!-- Right: Conhecimentos -->
        <div class="w-full md:flex-1 md:pl-10">
          <h2
            class="mb-6 text-center text-2xl font-bold text-yellow-500 sm:text-3xl md:text-4xl lg:text-5xl dark:text-yellow-400"
          >
            Conhecimentos
          </h2>
          <div class="grid grid-cols-3 gap-3">
            <div
              v-for="skill in skills"
              :key="skill.name"
              class="group flex aspect-square cursor-default flex-col items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-yellow-500/40 hover:bg-white/10"
            >
              <img
                :src="skill.icon"
                :alt="skill.name"
                class="h-10 w-10 object-contain transition-transform duration-300 group-hover:scale-110"
              />
              <span class="text-center text-xs leading-tight font-medium text-slate-300">
                {{ skill.name }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="projects" class="px-6 pt-20 pb-40">
      <div class="mx-auto w-full max-w-7xl">
        <!-- Title -->
        <h2
          class="mb-12 text-center text-3xl font-bold text-yellow-500 sm:text-4xl md:text-5xl dark:text-yellow-400"
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
                  class="rounded-full border border-yellow-500/20 bg-yellow-500/10 px-3 py-0.5 text-xs font-medium text-yellow-400"
                >
                  {{ tech }}
                </span>
              </div>

              <span class="mt-1 inline-flex items-center gap-1 text-sm font-medium text-yellow-400">
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
            class="flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-yellow-500/40 hover:shadow-yellow-500/10"
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
                  class="rounded-full border border-yellow-500/20 bg-yellow-500/10 px-3 py-0.5 text-xs font-medium text-yellow-400"
                >
                  {{ tech }}
                </span>
              </div>

              <span class="mt-1 inline-flex items-center gap-1 text-sm font-medium text-yellow-400">
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
            class="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-400 transition-all hover:border-yellow-500/40 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
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
                currentPage === page - 1 ? 'w-6 bg-yellow-500' : 'bg-white/20 hover:bg-white/40'
              "
              :aria-label="`Ir para página ${page}`"
              @click="currentPage = page - 1"
            />
          </div>

          <button
            :disabled="currentPage === totalPages - 1"
            class="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-400 transition-all hover:border-yellow-500/40 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
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

    <!-- Fale Comigo -->
    <footer id="contact" class="bg-zinc-900 px-6 pt-10 pb-0">
      <div class="mx-auto max-w-4xl">
        <!-- Title -->
        <h2
          class="mb-12 text-center text-2xl font-bold text-yellow-500 sm:text-3xl md:text-4xl dark:text-yellow-400"
        >
          Fale comigo
        </h2>

        <!-- Contact links row -->
        <div class="flex flex-wrap items-start justify-center gap-10 sm:gap-16">
          <!-- Phone -->
          <a
            href="tel:+5511999999999"
            class="group flex flex-col items-center gap-3 text-slate-400 transition-colors duration-200 hover:scale-105 hover:text-yellow-400"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-8 w-8 transition-transform duration-200 group-hover:scale-110"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="1.5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
              />
            </svg>
            <span class="text-sm font-medium">+55 (XX) XXXXX-XXXX</span>
          </a>

          <!-- Email -->
          <a
            href="mailto:lucasbebiano@email.com"
            class="group flex flex-col items-center gap-3 text-slate-400 transition-colors duration-200 hover:scale-105 hover:text-yellow-400"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-8 w-8 transition-transform duration-200 group-hover:scale-110"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="1.5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
              />
            </svg>
            <span class="text-sm font-medium">lucasbebiano@email.com</span>
          </a>

          <!-- GitHub -->
          <a
            href="https://github.com/lucasbebiano"
            target="_blank"
            rel="noopener noreferrer"
            class="group flex flex-col items-center gap-3 text-slate-400 transition-colors duration-200 hover:scale-105 hover:text-yellow-400"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-8 w-8 transition-transform duration-200 group-hover:scale-110"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.468-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.3 1.23A11.51 11.51 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.625-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.015 2.898-.015 3.293 0 .322.216.694.825.576C20.565 21.796 24 17.303 24 12 24 5.373 18.627 0 12 0Z"
              />
            </svg>
            <span class="text-sm font-medium">github.com/lucasbebiano</span>
          </a>

          <!-- LinkedIn -->
          <a
            href="https://linkedin.com/in/lucasbebiano"
            target="_blank"
            rel="noopener noreferrer"
            class="group flex flex-col items-center gap-3 text-slate-400 transition-colors duration-200 hover:scale-105 hover:text-yellow-400"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-8 w-8 transition-transform duration-200 group-hover:scale-110"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065Zm1.782 13.019H3.555V9h3.564v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003Z"
              />
            </svg>
            <span class="text-sm font-medium">linkedin.com/in/lucasbebiano</span>
          </a>
        </div>

        <!-- Bottom divider + copyright -->
        <div class="mt-8 border-t border-white/10 py-6">
          <p class="text-center text-xs text-slate-600">@2026 - Lucas Bebiano</p>
        </div>
      </div>
    </footer>
  </main>
</template>
<style scoped>
.font {
  font-family: 'Orbitron', monospace;
}
.carousel {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.carousel::-webkit-scrollbar {
  display: none;
}
.cursor {
  display: inline-block;
  font-weight: 100;
  animation: blink 0.65s step-end infinite;
}
.blink-text {
  animation: blink-text 1.4s ease-in-out infinite;
}
@keyframes blink-text {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.25; }
}
@keyframes blink {
  50% {
    opacity: 0;
  }
}
</style>
