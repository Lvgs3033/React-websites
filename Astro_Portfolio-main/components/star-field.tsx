"use client"

import { useEffect, useRef } from "react"

export default function StarField() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const containerWidth = container.offsetWidth
    const containerHeight = container.offsetHeight

    // Clear any existing stars
    container.innerHTML = ""

    // Create stars
    const starCount = 200
    for (let i = 0; i < starCount; i++) {
      const star = document.createElement("div")
      star.className = "star"

      // Random position
      const left = Math.random() * containerWidth
      const top = Math.random() * containerHeight

      // Random size (0.5px to 3px)
      const size = Math.random() * 2.5 + 0.5

      // Random twinkle duration (3s to 8s)
      const duration = Math.random() * 5 + 3

      star.style.left = `${left}px`
      star.style.top = `${top}px`
      star.style.width = `${size}px`
      star.style.height = `${size}px`
      star.style.setProperty("--duration", `${duration}s`)

      container.appendChild(star)
    }

    // Handle resize
    const handleResize = () => {
      if (container) {
        const newWidth = container.offsetWidth
        const newHeight = container.offsetHeight

        const stars = container.querySelectorAll(".star")
        stars.forEach((star) => {
          const left = Math.random() * newWidth
          const top = Math.random() * newHeight
          ;(star as HTMLElement).style.left = `${left}px`
          ;(star as HTMLElement).style.top = `${top}px`
        })
      }
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return <div ref={containerRef} className="fixed inset-0 overflow-hidden pointer-events-none z-0" />
}

