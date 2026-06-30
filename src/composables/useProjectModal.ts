import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import type { Project } from '../data/projects'

export function useProjectModal() {
  const selectedProject = ref<Project | null>(null)
  const modalImageIndex = ref(0)
  const showGallery = ref(false)

  // Prefere `images` (galeria); cai em `image` como item único.
  const modalImages = computed((): string[] => {
    if (!selectedProject.value) return []
    const { images, image } = selectedProject.value
    return images && images.length > 0 ? images : [image]
  })

  const openModal = (project: Project) => {
    selectedProject.value = project
    modalImageIndex.value = 0
    showGallery.value = false
  }

  const closeModal = () => {
    selectedProject.value = null
    showGallery.value = false
  }

  const modalPrev = () => {
    const len = modalImages.value.length
    modalImageIndex.value = (modalImageIndex.value - 1 + len) % len
  }

  const modalNext = () => {
    modalImageIndex.value = (modalImageIndex.value + 1) % modalImages.value.length
  }

  const openProjectLink = (link: string) => {
    if (!link || link === '#') return
    window.open(link, '_blank', 'noopener,noreferrer')
  }

  const handleGlobalKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      if (showGallery.value) {
        showGallery.value = false
      } else if (selectedProject.value) {
        closeModal()
      }
    }
    if (showGallery.value) {
      if (event.key === 'ArrowLeft') modalPrev()
      if (event.key === 'ArrowRight') modalNext()
    }
  }

  // Bloqueia scroll do body enquanto o modal está aberto.
  watch(selectedProject, (value) => {
    document.body.style.overflow = value ? 'hidden' : ''
  })

  onMounted(() => {
    window.addEventListener('keydown', handleGlobalKeydown)
  })

  onUnmounted(() => {
    window.removeEventListener('keydown', handleGlobalKeydown)
    // Restaura overflow ao desmontar, mesmo com modal aberto.
    document.body.style.overflow = ''
  })

  return {
    selectedProject,
    modalImageIndex,
    modalImages,
    showGallery,
    openModal,
    closeModal,
    modalPrev,
    modalNext,
    openProjectLink,
  }
}
