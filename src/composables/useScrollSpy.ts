import { ref, onMounted, onUnmounted } from 'vue'

// IDs em ordem descendente: o primeiro com offsetTop <= scrollY + offset é a seção ativa.
const SECTION_IDS = ['contact', 'projects', 'certificates', 'skills', 'experience', 'about'] as const
const SECTION_OFFSET = 120

// Breakpoint md do Tailwind — mesma condição do `md:hidden` usado no hamburger menu.
const MOBILE_BREAKPOINT = 768

type SectionId = (typeof SECTION_IDS)[number]

export function useScrollSpy() {
  const activeSection = ref<SectionId | ''>('')
  const isMobile = ref(typeof window !== 'undefined' && window.innerWidth < MOBILE_BREAKPOINT)

  let sectionElements: HTMLElement[] = []
  let scrollRafId: number | null = null

  const refreshSectionElements = () => {
    // Cacheia refs DOM; revalidado ao montar/redimensionar.
    sectionElements = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null,
    )
  }

  const updateActiveSection = () => {
    const viewportBottom = window.scrollY + window.innerHeight
    const documentBottom = document.documentElement.scrollHeight

    if (viewportBottom >= documentBottom - 4) {
      const contactSection = sectionElements.find((el) => el.id === 'contact')
      if (contactSection) {
        activeSection.value = 'contact'
        return
      }
    }

    let found: SectionId | '' = ''
    for (const el of sectionElements) {
      if (window.scrollY >= el.offsetTop - SECTION_OFFSET) {
        found = el.id as SectionId
        break
      }
    }
    activeSection.value = found
  }

  const handleScroll = () => {
    // RAF throttle: max uma execução por frame.
    if (scrollRafId !== null) return
    scrollRafId = window.requestAnimationFrame(() => {
      updateActiveSection()
      scrollRafId = null
    })
  }

  const handleResize = () => {
    isMobile.value = window.innerWidth < MOBILE_BREAKPOINT
    refreshSectionElements()
  }

  onMounted(() => {
    refreshSectionElements()
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleResize, { passive: true })
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
    window.removeEventListener('resize', handleResize)
    if (scrollRafId !== null) cancelAnimationFrame(scrollRafId)
  })

  return { activeSection, isMobile }
}
