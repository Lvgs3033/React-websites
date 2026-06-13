"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import ThemeToggle from "@/components/theme-toggle"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-accent">
            <span className="flex items-center gap-2">
              <span className="text-primary">Cosmic</span> Portfolio
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <NavLink href="#home">Home</NavLink>
            <NavLink href="#projects">Projects</NavLink>
            <NavLink href="#blog">Blog</NavLink>
            <NavLink href="#about">About</NavLink>
            <NavLink href="#contact">Contact</NavLink>
          </div>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-md">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <MobileNavLink href="#home" onClick={toggleMenu}>
              Home
            </MobileNavLink>
            <MobileNavLink href="#projects" onClick={toggleMenu}>
              Projects
            </MobileNavLink>
            <MobileNavLink href="#blog" onClick={toggleMenu}>
              Blog
            </MobileNavLink>
            <MobileNavLink href="#about" onClick={toggleMenu}>
              About
            </MobileNavLink>
            <MobileNavLink href="#contact" onClick={toggleMenu}>
              Contact
            </MobileNavLink>
          </div>
        </div>
      )}
    </nav>
  )
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const targetId = href.replace("#", "")
    const element = document.getElementById(targetId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <Link
      href={href}
      className="text-foreground/80 hover:text-accent transition-colors duration-200"
      onClick={handleClick}
    >
      {children}
    </Link>
  )
}

function MobileNavLink({
  href,
  children,
  onClick,
}: {
  href: string
  children: React.ReactNode
  onClick: () => void
}) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    onClick() // Close the mobile menu
    const targetId = href.replace("#", "")
    const element = document.getElementById(targetId)
    if (element) {
      setTimeout(() => {
        element.scrollIntoView({ behavior: "smooth" })
      }, 300) // Small delay to allow menu to close
    }
  }

  return (
    <Link
      href={href}
      className="text-foreground/80 hover:text-accent transition-colors duration-200 text-lg py-2"
      onClick={handleClick}
    >
      {children}
    </Link>
  )
}

