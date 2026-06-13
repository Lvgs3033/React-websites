"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowDown } from "lucide-react"
import SpaceScene from "@/components/space-scene"

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100")
            entry.target.classList.remove("translate-y-10", "opacity-0")
          }
        })
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  const scrollToProjects = () => {
    const projectsSection = document.getElementById("projects")
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section
      id="home"
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center relative transition-all duration-1000 ease-out translate-y-10 opacity-0"
    >
      <div className="absolute inset-0 z-0">
        <SpaceScene />
      </div>

      <div className="container mx-auto px-4 z-10 relative">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
            <span className="text-accent">Exploring</span> the Universe of{" "}
            <span className="text-primary">Web Development</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-foreground/80">
            Welcome to my cosmic portfolio — where creativity and technology collide to create stellar digital
            experiences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/80 text-primary-foreground"
              onClick={scrollToProjects}
            >
              Explore My Work
            </Button>
            <Button size="lg" variant="outline" className="border-accent text-accent hover:bg-accent/10" asChild>
              <a href="#contact">Contact Me</a>
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <Button
          variant="ghost"
          size="icon"
          className="text-foreground/60 hover:text-accent"
          onClick={scrollToProjects}
          aria-label="Scroll down"
        >
          <ArrowDown size={24} />
        </Button>
      </div>
    </section>
  )
}

