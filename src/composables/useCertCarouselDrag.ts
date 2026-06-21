import { ref, onMounted, onUnmounted } from 'vue'
import type { Ref } from 'vue'

/**
 * Provides mouse drag-to-scroll behaviour for a horizontal carousel element.
 * Uses getBoundingClientRect() instead of offsetLeft to avoid incorrect offset
 * calculations caused by negative-margin wrappers (-mx-4, etc.).
 */
export function useCertCarouselDrag(carouselRef: Ref<HTMLElement | null>) {
  let dragging = false
  let dragStartX = 0
  let dragScrollLeft = 0

  const isDragging = ref(false)

  const canScroll = ref(false)

  let resizeObserver: ResizeObserver | null = null

  const updateCanScroll = () => {
    const el = carouselRef.value
    if (el) canScroll.value = el.scrollWidth > el.clientWidth + 4
  }

  const onMouseDown = (e: MouseEvent) => {
    const el = carouselRef.value
    if (!el) return
    const rect = el.getBoundingClientRect()
    isDragging.value = true
    dragging = true
    dragStartX = e.clientX - rect.left
    dragScrollLeft = el.scrollLeft
  }

  const onMouseMove = (e: MouseEvent) => {
    if (!dragging || !carouselRef.value) return
    e.preventDefault()
    const rect = carouselRef.value.getBoundingClientRect()
    const x = e.clientX - rect.left
    carouselRef.value.scrollLeft = dragScrollLeft - (x - dragStartX)
  }

  const onMouseUp = () => {
    isDragging.value = false
    dragging = false
  }

  onMounted(() => {
    updateCanScroll()
    if (carouselRef.value) {
      resizeObserver = new ResizeObserver(updateCanScroll)
      resizeObserver.observe(carouselRef.value)
    }
  })

  onUnmounted(() => {
    resizeObserver?.disconnect()
  })

  return { isDragging, canScroll, onMouseDown, onMouseMove, onMouseUp }
}
