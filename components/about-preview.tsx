"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"

export function AboutPreview() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect()
        const windowHeight = window.innerHeight
        const progress = Math.max(0, Math.min(1, 1 - rect.top / windowHeight))
        setScrollProgress(progress)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section ref={sectionRef} className="relative py-32 md:py-48 overflow-hidden bg-background">
      {/* Background Text */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{
          transform: `translateX(${-scrollProgress * 100}px)`,
        }}
      >
        <span className="font-display text-[30vw] text-foreground/[0.03] whitespace-nowrap">DESDE 2024</span>
      </div>

      {/* Content */}
      <div className="relative z-10 px-4 md:px-8 lg:px-16 max-w-5xl mx-auto text-center">
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="w-12 h-[2px] bg-accent" />
          <span className="font-display text-sm tracking-[0.3em] text-accent">OUR STORY</span>
          <div className="w-12 h-[2px] bg-accent" />
        </div>

        <h2 className="font-display text-4xl md:text-6xl lg:text-7xl tracking-tight text-foreground leading-tight">
          BORN FROM THE STREETS OF
          <span className="block text-accent">MEXICO CITY</span>
        </h2>

        <p className="mt-8 text-muted-foreground text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
          Every taco tells a story. Ours begins in the bustling mercados of CDMX, where bold flavors and fearless
          cooking collide. We brought that energy to Surrey, serving up authentic street food with zero compromises.
        </p>

        <Link
          href="/about"
          className="group inline-flex items-center gap-3 mt-12 font-display text-xl tracking-wider text-foreground hover:text-accent transition-colors"
        >
          <span>READ MORE</span>
          <svg
            className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>

      {/* Decorative Stars */}
      <div className="absolute top-1/4 left-8 text-accent/10 font-display text-8xl pointer-events-none">★</div>
      <div className="absolute bottom-1/4 right-8 text-accent/10 font-display text-6xl pointer-events-none">★</div>
    </section>
  )
}
