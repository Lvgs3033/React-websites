import Navbar from "@/components/navbar"
import HeroSection from "@/components/hero-section"
import ProjectsSection from "@/components/projects-section"
import BlogSection from "@/components/blog-section"
import AboutSection from "@/components/about-section"
import ContactSection from "@/components/contact-section"
import Footer from "@/components/footer"
import StarField from "@/components/star-field"

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <StarField />
      <div className="relative z-10">
        <Navbar />
        <HeroSection />
        <ProjectsSection />
        <BlogSection />
        <AboutSection />
        <ContactSection />
        <Footer />
      </div>
    </main>
  )
}

