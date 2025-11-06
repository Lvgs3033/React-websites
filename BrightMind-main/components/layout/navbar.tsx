"use client"

import Link from "next/link"
import { Brain } from "lucide-react"
import { motion } from "framer-motion"

export function Navbar() {
  const navItems = [
    { href: "/", label: "Home" },
    { href: "/games", label: "Games" },
    { href: "/contact", label: "Contact Us" },
    { href: "/register", label: "Register" },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50"
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 group">
            <motion.div whileHover={{ rotate: 360, scale: 1.1 }} transition={{ duration: 0.5 }}>
              <Brain className="h-8 w-8 text-blue-600" />
            </motion.div>
            <span className="text-2xl font-bold text-blue-600">BrightMind</span>
          </Link>

          {/* Centered Navigation */}
          <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={item.href}
                  className="text-sm font-medium transition-colors hover:text-blue-600 relative group"
                >
                  {item.label}
                  <motion.div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300" />
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium transition-colors hover:text-blue-600"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right side spacer to balance the layout */}
          <div className="hidden md:block w-32"></div>
        </div>
      </div>
    </motion.nav>
  )
}
