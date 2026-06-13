"use client"

import { useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { FileText, Github, Linkedin, Twitter } from "lucide-react"
import ImageWithFallback from "@/components/image-with-fallback"

const skills = [
  "HTML5 & CSS3",
  "JavaScript (ES6+)",
  "TypeScript",
  "React.js",
  "Next.js",
  "Three.js",
  "WebGL",
  "Tailwind CSS",
  "Node.js",
  "Git & GitHub",
  "Responsive Design",
  "UI/UX Design",
]

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const skillsRef = useRef<HTMLDivElement>(null)

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
    if (contentRef.current) {
      observer.observe(contentRef.current)
    }
    if (skillsRef.current) {
      observer.observe(skillsRef.current)
    }

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current)
      if (contentRef.current) observer.unobserve(contentRef.current)
      if (skillsRef.current) observer.unobserve(skillsRef.current)
    }
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-20 transition-all duration-1000 ease-out translate-y-10 opacity-0"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-primary">About</span> Me
          </h2>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            Learn more about my journey as a developer and my passion for space and astronomy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div ref={contentRef} className="transition-all duration-700 ease-out translate-y-10 opacity-0">
            <h3 className="text-2xl font-bold mb-4 text-foreground">
              Hello, I'm <span className="text-accent">Alex Stellar</span>
            </h3>
            <p className="text-foreground/80 mb-4">
              I'm a passionate web developer with a deep fascination for space and astronomy. This portfolio combines my
              two greatest interests: creating immersive web experiences and exploring the cosmos.
            </p>
            <p className="text-foreground/80 mb-4">
              With over 5 years of experience in web development, I specialize in creating interactive, responsive, and
              visually stunning websites and applications. My background in astrophysics gives me a unique perspective
              on problem-solving and design.
            </p>
            <p className="text-foreground/80 mb-6">
              When I'm not coding, you'll find me stargazing, reading about the latest space discoveries, or
              contributing to open-source projects.
            </p>

            <div className="flex flex-wrap gap-4 mb-8">
              <Button
                variant="outline"
                className="border-accent text-accent hover:bg-accent/10 flex items-center gap-2"
                asChild
              >
                <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                  <FileText size={16} /> Resume
                </a>
              </Button>

              <Button variant="ghost" className="text-foreground/80 hover:text-accent" asChild>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile">
                  <Github size={20} />
                </a>
              </Button>

              <Button variant="ghost" className="text-foreground/80 hover:text-accent" asChild>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile">
                  <Linkedin size={20} />
                </a>
              </Button>

              <Button variant="ghost" className="text-foreground/80 hover:text-accent" asChild>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter Profile">
                  <Twitter size={20} />
                </a>
              </Button>
            </div>
          </div>

          <div ref={skillsRef} className="transition-all duration-700 ease-out translate-y-10 opacity-0 delay-200">
            <div className="relative h-64 md:h-80 mb-8 rounded-lg overflow-hidden">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1581822261290-991b38693d1b?q=80&w=1974&auto=format&fit=crop"
                fallbackSrc="/placeholder.svg?height=800&width=600"
                alt="Profile"
                fill
                className="object-cover"
              />
            </div>

            <h3 className="text-xl font-bold mb-4 text-foreground">Skills & Technologies</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span key={index} className="bg-secondary/50 text-foreground/90 px-3 py-1 rounded-full text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

