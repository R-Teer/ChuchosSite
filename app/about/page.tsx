"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Reviews } from "@/components/reviews"

const values = [
  {
    number: "01",
    title: "AUTHENTICITY",
    description: "Real recipes passed down through generations. No shortcuts, no compromises.",
  },
  {
    number: "02",
    title: "FRESH DAILY",
    description: "Every salsa, every tortilla, every marinade made fresh in-house daily.",
  },
  {
    number: "03",
    title: "BOLD FLAVORS",
    description: "We don't hold back. Spice, heat, and flavor that hits different.",
  },
  {
    number: "04",
    title: "COMMUNITY",
    description: "More than a taqueria. A gathering place for anyone who loves good food.",
  },
]

export default function AboutPage() {
  const [isVisible, setIsVisible] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <main>
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-background pt-24">
        {/* Background Text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="font-display text-[25vw] text-foreground/[0.03] whitespace-nowrap">ABOUT</span>
        </div>

        {/* Content */}
        <div className="relative z-10 px-4 md:px-8 lg:px-16 text-center max-w-4xl">
          <div
            className={`transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-12 h-[2px] bg-accent" />
              <span className="font-display text-sm tracking-[0.3em] text-accent">NUESTRA HISTORIA</span>
              <div className="w-12 h-[2px] bg-accent" />
            </div>
            <h1 className="font-display text-6xl md:text-8xl lg:text-9xl tracking-tight text-foreground">THE STORY</h1>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section ref={contentRef} className="py-24 bg-card">
        <div className="px-4 md:px-8 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 max-w-7xl mx-auto">
            {/* Image */}
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image src="/images/tacos.jpeg" alt="Our signature birria tacos" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8 font-display text-8xl text-foreground/10">2024</div>
            </div>

            {/* Text Content */}
            <div className="flex flex-col justify-center">
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight text-foreground mb-8">
                FROM CDMX TO
                <span className="block text-accent">SURREY</span>
              </h2>

              <div className="space-y-6 text-muted-foreground leading-relaxed">
                <p>
                  La Taqueria was born from a simple obsession: bringing the raw, unfiltered flavors of Mexico City
                  street food to the heart of Woking.
                </p>
                <p>
                  Our founder grew up in the mercados of CDMX, surrounded by vendors who treated every taco like a work
                  of art. That passion, that dedication to craft—it's in every bite we serve.
                </p>
                <p>
                  We don't do trendy. We don't do tex-mex. We do authentic, bold, unapologetic Mexican street food. Every
                  ingredient sourced directly from Mexico. Every dish made from scratch. Every bite served with the energy of the
                  streets.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-border">
                <div>
                  <span className="font-display text-4xl md:text-5xl text-accent">50+</span>
                  <p className="text-muted-foreground text-sm mt-2">Recipes</p>
                </div>
                <div>
                  <span className="font-display text-4xl md:text-5xl text-accent">100%</span>
                  <p className="text-muted-foreground text-sm mt-2">Fresh Daily</p>
                </div>
                <div>
                  <span className="font-display text-4xl md:text-5xl text-accent">∞</span>
                  <p className="text-muted-foreground text-sm mt-2">Flavor</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 md:py-32 bg-background">
        <div className="px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-[2px] bg-accent" />
              <span className="font-display text-sm tracking-[0.3em] text-accent">WHAT WE STAND FOR</span>
            </div>
            <h2 className="font-display text-5xl md:text-7xl tracking-tight text-foreground">OUR VALUES</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div
                key={value.number}
                className="group p-8 border border-border hover:border-accent transition-all duration-500 bg-card hover:bg-card/50"
              >
                <span className="font-display text-6xl text-foreground/10 group-hover:text-accent/30 transition-colors duration-500">
                  {value.number}
                </span>
                <h3 className="font-display text-2xl md:text-3xl tracking-tight text-foreground mt-4 group-hover:text-accent transition-colors duration-300">
                  {value.title}
                </h3>
                <p className="text-muted-foreground mt-4 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <Reviews />

      <Footer />
    </main>
  )
}
