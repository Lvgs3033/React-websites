"use client"

import { useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import ImageWithFallback from "@/components/image-with-fallback"

type BlogPost = {
  id: number
  title: string
  excerpt: string
  image: string
  date: string
  readTime: string
  slug: string
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "The Wonders of the James Webb Space Telescope",
    excerpt:
      "Exploring the incredible discoveries made by NASA's newest space telescope and what it means for our understanding of the universe.",
    image: "https://images.unsplash.com/photo-1454789548928-9efd52dc4031?q=80&w=2080&auto=format&fit=crop",
    date: "March 15, 2023",
    readTime: "5 min read",
    slug: "james-webb-telescope",
  },
  {
    id: 2,
    title: "Black Holes: The Universe's Most Mysterious Objects",
    excerpt:
      "Diving into the physics of black holes and how they continue to challenge our understanding of space and time.",
    image: "https://images.unsplash.com/photo-1465101162946-4377e57745c3?q=80&w=2078&auto=format&fit=crop",
    date: "February 28, 2023",
    readTime: "7 min read",
    slug: "black-holes-mystery",
  },
  {
    id: 3,
    title: "The Future of Space Exploration",
    excerpt:
      "From Mars missions to interstellar travel, what does the future hold for humanity's journey to the stars?",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop",
    date: "January 10, 2023",
    readTime: "6 min read",
    slug: "future-space-exploration",
  },
]

export default function BlogSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const postRefs = useRef<(HTMLDivElement | null)[]>([])

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

    postRefs.current.forEach((post) => {
      if (post) observer.observe(post)
    })

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
      postRefs.current.forEach((post) => {
        if (post) observer.unobserve(post)
      })
    }
  }, [])

  return (
    <section
      id="blog"
      ref={sectionRef}
      className="py-20 bg-secondary/20 transition-all duration-1000 ease-out translate-y-10 opacity-0"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-primary">Cosmic</span> Blog
          </h2>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            Explore the wonders of astronomy and space science through my latest articles and insights.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <div
              key={post.id}
              ref={(el) => (postRefs.current[index] = el)}
              className="transition-all duration-700 ease-out translate-y-10 opacity-0"
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <Card className="overflow-hidden bg-card/50 backdrop-blur-sm border-border hover:border-accent transition-all duration-300 h-full flex flex-col">
                <div className="relative h-48 overflow-hidden">
                  <ImageWithFallback
                    src={post.image || "/placeholder.svg"}
                    fallbackSrc="/placeholder.svg?height=600&width=800"
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center gap-4 text-sm text-foreground/60 mb-2">
                    <span className="flex items-center gap-1">
                      <Calendar size={14} />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={14} />
                      {post.readTime}
                    </span>
                  </div>
                  <CardTitle className="text-xl text-foreground">{post.title}</CardTitle>
                  <CardDescription className="text-foreground/70">{post.excerpt}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow"></CardContent>
                <CardFooter>
                  <Button
                    variant="ghost"
                    className="text-accent hover:text-accent/80 hover:bg-accent/10 p-0 flex items-center gap-2"
                    asChild
                  >
                    <a href={`/blog/${post.slug}`}>
                      Read More <ArrowRight size={16} />
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" className="border-accent text-accent hover:bg-accent/10" asChild>
            <a href="/blog">View All Posts</a>
          </Button>
        </div>
      </div>
    </section>
  )
}

