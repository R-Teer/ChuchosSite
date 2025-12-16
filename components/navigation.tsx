"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Instagram, Facebook, Twitter } from "lucide-react"

const navLinks = [
  { href: "/", label: "HOME" },
  { href: "/about", label: "ABOUT" },
  { href: "/menu", label: "MENU" },
  { href: "/contact", label: "CONTACT" },
]

const socialLinks = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  return (
    <>
      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-background/90 backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between px-4 py-4 md:px-8">
          <Link href="/" className="group relative z-50">
            <Image
              src="/chuchos-logo.svg"
              alt="Chuchos"
              width={120}
              height={45}
              className="h-8 md:h-10 w-auto transition-transform duration-300 group-hover:scale-105"
              priority
            />
          </Link>

          {/* Social Icons - Desktop */}
          <div className="hidden md:flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="text-foreground/70 hover:text-accent transition-colors duration-300"
              >
                <social.icon size={20} />
              </a>
            ))}
          </div>

          {/* Taco Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="relative z-50 flex items-center gap-3 group"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            <span className="hidden md:block font-display text-sm tracking-widest text-foreground/70 group-hover:text-foreground transition-colors">
              MENU
            </span>
            <div className="relative w-10 h-10 flex items-center justify-center">
              {/* Taco Icon styled as hamburger */}
              <div className="relative w-8 h-6 flex flex-col justify-between">
                {/* Top taco shell */}
                <span
                  className={`block h-1 rounded-full bg-foreground transition-all duration-500 origin-center ${
                    isOpen
                      ? "rotate-45 translate-y-2.5 bg-accent"
                      : "rounded-t-full bg-gradient-to-r from-amber-600 to-amber-500"
                  }`}
                  style={{
                    borderRadius: isOpen ? "2px" : "999px 999px 4px 4px",
                    height: isOpen ? "3px" : "6px",
                  }}
                />
                {/* Middle filling */}
                <span
                  className={`block h-1 bg-foreground transition-all duration-500 ${
                    isOpen
                      ? "opacity-0 scale-0"
                      : "opacity-100 bg-gradient-to-r from-green-600 via-red-500 to-yellow-500"
                  }`}
                  style={{ height: "4px", borderRadius: "2px" }}
                />
                {/* Bottom taco shell */}
                <span
                  className={`block h-1 rounded-full bg-foreground transition-all duration-500 origin-center ${
                    isOpen
                      ? "-rotate-45 -translate-y-2.5 bg-accent"
                      : "rounded-b-full bg-gradient-to-r from-amber-500 to-amber-600"
                  }`}
                  style={{
                    borderRadius: isOpen ? "2px" : "4px 4px 999px 999px",
                    height: isOpen ? "3px" : "6px",
                  }}
                />
              </div>
            </div>
          </button>
        </div>
      </header>

      {/* Full Screen Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-background transition-all duration-700 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="h-full flex flex-col justify-center px-8 md:px-16 lg:px-24">
          {/* Nav Links */}
          <nav className="stagger-children" style={{ animationPlayState: isOpen ? "running" : "paused" }}>
            {navLinks.map((link, index) => (
              <div
                key={link.href}
                className="menu-item-hover overflow-hidden py-2 md:py-4"
                style={{
                  opacity: isOpen ? 1 : 0,
                  transform: isOpen ? "translateY(0)" : "translateY(40px)",
                  transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.1}s`,
                }}
              >
                <Link href={link.href} onClick={() => setIsOpen(false)} className="group flex items-center gap-4">
                  <span className="font-display text-muted-foreground text-sm md:text-base">0{index + 1}</span>
                  <span className="font-display text-5xl md:text-7xl lg:text-8xl tracking-tight text-foreground group-hover:text-accent transition-colors duration-300">
                    {link.label}
                  </span>
                  <div className="menu-line h-[2px] w-0 bg-foreground ml-4 hidden md:block" />
                </Link>
              </div>
            ))}
          </nav>

          {/* Bottom Section */}
          <div
            className="mt-12 md:mt-20 flex flex-col md:flex-row md:items-center md:justify-between gap-8"
            style={{
              opacity: isOpen ? 1 : 0,
              transform: isOpen ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.5s",
            }}
          >
            {/* Social Links */}
            <div className="flex items-center gap-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="text-foreground/50 hover:text-accent transition-colors duration-300"
                >
                  <social.icon size={24} />
                </a>
              ))}
            </div>

            {/* Contact Info */}
            <div className="text-muted-foreground font-sans text-sm">
              <p>Kiosk 14 Market Walk, Woking, GU21 6AA</p>
              
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
