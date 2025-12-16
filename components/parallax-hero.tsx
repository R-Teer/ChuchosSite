"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"

export function ParallaxHero() {
  const [scrollY, setScrollY] = useState(0)
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect()
        if (rect.bottom > 0) {
          setScrollY(window.scrollY)
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div ref={heroRef} className="relative min-h-screen overflow-hidden bg-background">
      {/* Background Typography Layer */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        style={{
          transform: `translateY(${scrollY * 0.1}px)`,
        }}
      >
        <h1 className="font-display text-[20vw] md:text-[18vw] lg:text-[15vw] leading-none tracking-tighter text-foreground/5 text-center whitespace-nowrap">
          CHUCHOS
        </h1>
      </div>

      {/* Main Content Layer - lowered z-index so wrestler overlays */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center px-4 md:px-8 lg:px-16 pt-24">
        <div className="max-w-5xl">
          {/* Eyebrow */}
          <div className="reveal-text flex items-center gap-4 mb-6" style={{ animationDelay: "0.2s" }}>
            <div className="w-12 h-[2px] bg-accent" />
            <span className="font-display text-sm md:text-base tracking-[0.3em] text-accent">
              AUTHENTIC MEXICAN STREET FOOD
            </span>
          </div>

          {/* Main Heading */}
          <h2
            className="reveal-text font-display text-6xl md:text-8xl lg:text-9xl leading-[0.85] tracking-tight text-foreground"
            style={{ animationDelay: "0.4s" }}
          >
            TASTE THE
            <br />
            <span className="text-accent">REVOLUTION</span>
          </h2>

          {/* Description */}
          <p
            className="reveal-text mt-8 max-w-md text-muted-foreground text-base md:text-lg leading-relaxed"
            style={{ animationDelay: "0.6s" }}
          >
            Immerse yourself in a bold culinary experience. Handcrafted tacos, fresh salsas, and flavors that hit
            different.
          </p>

          {/* CTA Buttons */}
          <div className="reveal-text flex flex-wrap gap-4 mt-10" style={{ animationDelay: "0.8s" }}>
            <Link
              href="/menu"
              className="group relative inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-foreground font-display text-lg tracking-wider px-8 py-4 transition-all duration-300 overflow-hidden"
            >
              <span className="relative z-10">VIEW MENU</span>
              <svg
                className="relative z-10 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 border border-foreground/30 hover:border-accent text-foreground font-display text-lg tracking-wider px-8 py-4 transition-all duration-300 hover:text-accent"
            >
              <span>FIND US</span>
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{
            opacity: scrollY > 100 ? 0 : 1,
            transition: "opacity 0.3s",
          }}
        >
          <span className="font-display text-xs tracking-widest text-muted-foreground">SCROLL</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-accent to-transparent" />
        </div>
      </div>

      <div
        className="absolute inset-0 pointer-events-none z-20"
        style={{
          transform: `translateY(${scrollY * -0.5}px)`,
        }}
      >
        <div className="absolute right-0 md:right-[-5%] top-1/4 md:top-[15%] w-[90vw] md:w-[65vw] lg:w-[55vw] h-[85vh]">
          <Image
            src="/images/mexican-wrestler.png"
            alt="Mexican Luchador"
            fill
            className="object-contain object-right brightness-[2] contrast-125"
            style={{
              filter: "brightness(2) contrast(1.25)",
            }}
            priority
          />
        </div>
      </div>

      {/* Decorative Elements */}
      <div
        className="absolute top-20 right-8 md:right-16 text-accent/20 font-display text-6xl md:text-8xl pointer-events-none"
        style={{
          transform: `translateY(${scrollY * 0.2}px) rotate(-15deg)`,
        }}
      >
        ★
      </div>
    </div>
  )
}
