<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import { useDarkMode } from '../composables/useDarkMode'
import { useProjectModal } from '../composables/useProjectModal'
import type { Project } from '../data/projects'

import SiteNavbar from './layout/SiteNavbar.vue'
import HeroSection from './sections/HeroSection.vue'
import AboutSection from './sections/AboutSection.vue'
import ExperienceSection from './sections/ExperienceSection.vue'
import SkillsSection from './sections/SkillsSection.vue'
import CertificatesSection from './sections/CertificatesSection.vue'
import ProjectsSection from './sections/ProjectsSection.vue'
import ContactSection from './sections/ContactSection.vue'

// Loaded asynchronously — keeps the modal out of the initial bundle
// until the user first clicks a project card.
const ProjectModal = defineAsyncComponent(() => import('./ProjectModal.vue'))

const { isDark } = useDarkMode()

const {
  selectedProject,
  modalImageIndex,
  modalImages,
  showGallery,
  openModal,
  closeModal,
  modalPrev,
  modalNext,
  openProjectLink,
} = useProjectModal()

const openProjectModal = (project: Project) => openModal(project)
</script>

<template>
  <main
    class="min-h-screen w-full overflow-x-hidden"
    :class="isDark ? 'bg-[#0D0D0D] text-slate-100' : 'bg-[#f5f7f2] text-slate-950'"
  >
    <SiteNavbar />
    <HeroSection />
    <AboutSection />
    <ExperienceSection />
    <SkillsSection />
    <CertificatesSection />
    <ProjectsSection @open-modal="openProjectModal" />
    <ContactSection />

    <!-- Project detail modal — async loaded on first open -->
    <ProjectModal
      v-if="selectedProject"
      :project="selectedProject"
      :images="modalImages"
      :image-index="modalImageIndex"
      :show-gallery="showGallery"
      @close="closeModal"
      @prev="modalPrev"
      @next="modalNext"
      @set-image="modalImageIndex = $event"
      @open-link="openProjectLink"
      @open-gallery="showGallery = true"
      @close-gallery="showGallery = false"
    />
  </main>
</template>
