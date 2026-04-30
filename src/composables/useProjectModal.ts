import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import type { Project } from '../data/projects'

export function useProjectModal() {
  const selectedProject = ref<Project | null>(null)
  const modalImageIndex = ref(0)

  // Consolida as imagens: usa o array `images` se disponível (galeria completa),
  // senão cai no campo `image` (thumbnail do card) como item único.
  const modalImages = computed((): string[] => {
    if (!selectedProject.value) return []
    const { images, image } = selectedProject.value
    return images && images.length > 0 ? images : [image]
  })

  const openModal = (project: Project) => {
    selectedProject.value = project
    modalImageIndex.value = 0
  }

  const closeModal = () => {
    selectedProject.value = null
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
    if (event.key === 'Escape' && selectedProject.value) closeModal()
  }

  // Bloqueia o scroll do body enquanto o modal está aberto para impedir
  // que o conteúdo de fundo role enquanto o usuário interage com o modal.
  watch(selectedProject, (value) => {
    document.body.style.overflow = value ? 'hidden' : ''
  })

  onMounted(() => {
    window.addEventListener('keydown', handleGlobalKeydown)
  })

  onUnmounted(() => {
    window.removeEventListener('keydown', handleGlobalKeydown)
    // Restaura o overflow mesmo se o componente for desmontado com o modal aberto.
    document.body.style.overflow = ''
  })

  return {
    selectedProject,
    modalImageIndex,
    modalImages,
    openModal,
    closeModal,
    modalPrev,
    modalNext,
    openProjectLink,
  }
}
