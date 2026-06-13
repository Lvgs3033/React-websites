"use client"

import type React from "react"

import { useRef, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MapPin, Phone, Send } from "lucide-react"

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState("")

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitMessage("Thank you for your message! I'll get back to you soon.")
      setFormState({
        name: "",
        email: "",
        subject: "",
        message: "",
      })

      // Clear success message after 5 seconds
      setTimeout(() => {
        setSubmitMessage("")
      }, 5000)
    }, 1500)
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-20 bg-secondary/20 transition-all duration-1000 ease-out translate-y-10 opacity-0"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-primary">Contact</span> Me
          </h2>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            Have a question or want to work together? Feel free to reach out!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-foreground">Get In Touch</h3>
            <p className="text-foreground/80">
              I'm always open to discussing new projects, creative ideas or opportunities to be part of your vision.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Mail className="text-primary h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-lg font-medium text-foreground">Email</h4>
                  <p className="text-foreground/80">hello@cosmicportfolio.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Phone className="text-primary h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-lg font-medium text-foreground">Phone</h4>
                  <p className="text-foreground/80">+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <MapPin className="text-primary h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-lg font-medium text-foreground">Location</h4>
                  <p className="text-foreground/80">San Francisco, CA</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-foreground/80">
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    required
                    className="bg-card/50 border-border"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-foreground/80">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={handleChange}
                    placeholder="Your Email"
                    required
                    className="bg-card/50 border-border"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-foreground/80">
                  Subject
                </label>
                <Input
                  id="subject"
                  name="subject"
                  value={formState.subject}
                  onChange={handleChange}
                  placeholder="Subject"
                  required
                  className="bg-card/50 border-border"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-foreground/80">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  placeholder="Your Message"
                  required
                  rows={5}
                  className="bg-card/50 border-border"
                />
              </div>

              {submitMessage && <div className="p-3 bg-accent/20 text-accent rounded">{submitMessage}</div>}

              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-primary hover:bg-primary/80 text-primary-foreground flex items-center gap-2"
              >
                {isSubmitting ? (
                  "Sending..."
                ) : (
                  <>
                    Send Message <Send size={16} />
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

