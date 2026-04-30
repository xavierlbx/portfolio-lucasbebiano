import { ref, onMounted, onUnmounted } from 'vue'

// A detecção de seção ativa percorre os IDs em ordem DESCENDENTE (contact → about).
// Assim, o primeiro elemento cujo offsetTop é <= scrollY + offset é a seção mais
// baixa já visível, garantindo que a navbar destaque a seção correta.
const SECTION_IDS = ['contact', 'projects', 'skills', 'about'] as const
const SECTION_OFFSET = 120

// Breakpoint md do Tailwind — mesma condição do `md:hidden` usado no hamburger menu.
const MOBILE_BREAKPOINT = 768

type SectionId = (typeof SECTION_IDS)[number]

export function useScrollSpy() {
  const scrollY = ref(0)
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
    // RAF throttle: garante que o handler rode no máximo uma vez por frame (~16ms),
    // evitando cálculos redundantes em monitores de alta taxa de atualização.
    if (scrollRafId !== null) return
    scrollRafId = window.requestAnimationFrame(() => {
      scrollY.value = Math.max(0, window.scrollY)
      updateActiveSection()
      scrollRafId = null
    })
  }

  const handleResize = () => {
    isMobile.value = window.innerWidth < MOBILE_BREAKPOINT
    refreshSectionElements()
  }

  // Retorna a string de transformação CSS para o efeito parallax.
  // translate3d (ao invés de translateY simples) força a GPU a criar uma
  // camada de composição separada para o elemento, eliminando repaints e
  // garantindo animação a 60fps durante o scroll.
  const getParallaxTransform = (speed: number): string =>
    `translate3d(0, ${scrollY.value * speed}px, 0)`

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

  return { scrollY, activeSection, isMobile, getParallaxTransform }
}
