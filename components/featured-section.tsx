"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"

const featuredItems = [
  {
    name: "BIRRIA TACOS",
    description: "Crispy tacos stuffed with slow-braised protein of your choice, served with our signature consommé",
    image: "/images/tacos.jpeg",
  },
  {
    name: "BIRRIA RAMEN",
    description: "Ramen noodles our signature consommé topped slow-braised protein of your choice and loaded with toppings",
    image: "/images/ramen.jpeg",
  },
  {
    name: "LOADED QUESADILLAS",
    description: "Crispy flour tortilla, melted cheese, your choice of protein, served with salsa",
    image: "/images/quesadilla.jpeg",
  },
  {
    name: "TORTA SANDWICH",
    description: "Pressed Mexican sandwich with all the fixings",
    image: "/images/torta.jpeg",
  },
]

export function FeaturedSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-card">
      <div className="px-4 md:px-8 lg:px-16">
        {/* Section Header */}
        <div
          className={`mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-8 h-[2px] bg-accent" />
            <span className="font-display text-sm tracking-[0.3em] text-accent">FEATURED</span>
          </div>
          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl tracking-tight text-foreground">
            FAN FAVORITES
          </h2>
        </div>

        {/* Featured Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Image Side */}
          <div
            className={`relative aspect-square lg:aspect-[4/5] overflow-hidden transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {featuredItems.map((item, index) => (
              <div
                key={item.name}
                className={`absolute inset-0 transition-opacity duration-700 ${
                  activeIndex === index ? "opacity-100" : "opacity-0"
                }`}
              >
                <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              </div>
            ))}

            {/* Image Counter */}
            <div className="absolute bottom-4 left-4 font-display text-6xl md:text-8xl text-foreground/20">
              0{activeIndex + 1}
            </div>
          </div>

          {/* Items List */}
          <div className="flex flex-col justify-center">
            {featuredItems.map((item, index) => (
              <button
                key={item.name}
                onClick={() => setActiveIndex(index)}
                className={`group text-left py-6 md:py-8 border-b border-border transition-all duration-500 ${
                  isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
                }`}
                style={{ transitionDelay: `${300 + index * 100}ms` }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3
                      className={`font-display text-3xl md:text-4xl lg:text-5xl tracking-tight transition-colors duration-300 ${
                        activeIndex === index ? "text-accent" : "text-foreground group-hover:text-accent"
                      }`}
                    >
                      {item.name}
                    </h3>
                    <p className="mt-2 text-muted-foreground text-sm md:text-base">{item.description}</p>
                  </div>
                  <div
                    className={`w-3 h-3 rounded-full border-2 transition-all duration-300 mt-3 ${
                      activeIndex === index
                        ? "bg-accent border-accent scale-125"
                        : "border-muted-foreground group-hover:border-accent"
                    }`}
                  />
                </div>
              </button>
            ))}

            {/* CTA */}
            <Link
              href="/menu"
              className={`group inline-flex items-center gap-3 mt-8 font-display text-xl tracking-wider text-foreground hover:text-accent transition-all duration-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "600ms" }}
            >
              <span>SEE FULL MENU</span>
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
        </div>
      </div>
    </section>
  )
}
