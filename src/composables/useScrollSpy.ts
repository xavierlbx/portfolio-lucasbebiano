import { ref, onMounted, onUnmounted } from 'vue'

// A detecção de seção ativa percorre os IDs em ordem DESCENDENTE (contact → about).
// Assim, o primeiro elemento cujo offsetTop é <= scrollY + offset é a seção mais
// baixa já visível, garantindo que a navbar destaque a seção correta.
const SECTION_IDS = ['contact', 'projects', 'skills', 'experience', 'about'] as const
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
    // Cache das referências DOM para evitar document.getElementById() a cada scroll.
    // Revalidamos ao montar e ao redimensionar porque o layout pode mudar.
    sectionElements = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null,
    )
  }

  const updateActiveSection = () => {
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
    // RAF throttle: garante que o handler rode no máximo uma vez por frame (~16ms).
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
