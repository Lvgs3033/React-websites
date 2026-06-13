"use client"

import { useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"
import ImageWithFallback from "@/components/image-with-fallback"

type Project = {
  id: number
  title: string
  description: string
  image: string
  tags: string[]
  liveUrl?: string
  githubUrl?: string
}

const projects: Project[] = [
  {
    id: 1,
    title: "Galactic Explorer",
    description: "An interactive 3D visualization of our solar system built with Three.js and WebGL.",
    image: "https://images.unsplash.com/photo-1614732414444-096e5f1122d5?q=80&w=1974&auto=format&fit=crop",
    tags: ["Three.js", "WebGL", "React"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: 2,
    title: "Nebula Dashboard",
    description: "A responsive admin dashboard with dark mode and space-themed UI components.",
    image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=2022&auto=format&fit=crop",
    tags: ["React", "Tailwind CSS", "TypeScript"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: 3,
    title: "Cosmic Weather App",
    description: "Weather application that shows forecasts with cosmic-themed animations.",
    image: "https://images.unsplash.com/photo-1534841090574-cba2d662b62e?q=80&w=1974&auto=format&fit=crop",
    tags: ["JavaScript", "API Integration", "CSS Animations"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: 4,
    title: "Stellar E-commerce",
    description: "A full-featured e-commerce platform with space-themed products and design.",
    image: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?q=80&w=2013&auto=format&fit=crop",
    tags: ["Next.js", "MongoDB", "Stripe"],
    liveUrl: "#",
    githubUrl: "#",
  },
]

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const projectRefs = useRef<(HTMLDivElement | null)[]>([])

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

    projectRefs.current.forEach((project) => {
      if (project) observer.observe(project)
    })

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
      projectRefs.current.forEach((project) => {
        if (project) observer.unobserve(project)
      })
    }
  }, [])

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-20 transition-all duration-1000 ease-out translate-y-10 opacity-0"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-primary">Stellar</span> Projects
          </h2>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            Explore my universe of web development projects, from interactive 3D experiences to responsive applications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.id}
              ref={(el) => (projectRefs.current[index] = el)}
              className="transition-all duration-700 ease-out translate-y-10 opacity-0"
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <Card className="overflow-hidden bg-card/50 backdrop-blur-sm border-border hover:border-accent transition-all duration-300 h-full flex flex-col">
                <div className="relative h-48 overflow-hidden">
                  <ImageWithFallback
                    src={project.image || "/placeholder.svg"}
                    fallbackSrc="/placeholder.svg?height=600&width=800"
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-xl text-foreground">{project.title}</CardTitle>
                  <CardDescription className="text-foreground/70">{project.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="bg-secondary/50 text-foreground/90">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground/70 hover:text-accent transition-colors"
                      aria-label={`View ${project.title} source code on GitHub`}
                    >
                      <Github size={20} />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground/70 hover:text-accent transition-colors flex items-center gap-1"
                    >
                      <span>View Project</span>
                      <ExternalLink size={16} />
                    </a>
                  )}
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

