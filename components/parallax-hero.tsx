"use client"

import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { OptimizedImage } from "@/components/OptimizedImage"

export function ParallaxHero() {
  const [scrollY, setScrollY] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const heroRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect()
        if (rect.bottom > 0) {
          setScrollY(window.scrollY)
        }
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!animationRef.current) {
        animationRef.current = window.requestAnimationFrame(() => {
          setMousePosition({
            x: (e.clientX / window.innerWidth - 0.5) * 20,
            y: (e.clientY / window.innerHeight - 0.5) * 10
          })
          animationRef.current = null
        })
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    
    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("mousemove", handleMouseMove)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
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
      <div className="relative z-10 min-h-screen flex flex-col justify-center items-center text-center px-4 md:px-8 lg:px-16 pt-32">
        <div className="max-w-5xl w-full">
          {/* Eyebrow */}
          <div className="reveal-text flex justify-center items-center gap-4 mb-6" style={{ animationDelay: "0.2s" }}>
            <div className="w-12 h-[2px] bg-accent" />
            <span className="font-display text-sm md:text-base tracking-[0.3em] text-accent">
              AUTHENTIC MEXICAN STREET FOOD
            </span>
          </div>

          {/* Main Heading */}
          <h2
            className="reveal-text font-display text-6xl md:text-8xl lg:text-9xl leading-[0.85] tracking-tight text-foreground text-center mx-auto"
            style={{ animationDelay: "0.4s" }}
          >
            TASTE THE <span className="text-accent">REVOLUTION</span>
          </h2>

          {/* Description */}
          <p
            className="reveal-text mt-8 max-w-md mx-auto text-muted-foreground text-base md:text-lg leading-relaxed text-center"
            style={{ animationDelay: "0.6s" }}
          >
            Immerse yourself in a bold culinary experience. Handcrafted tacos, fresh salsas, and flavors that hit
            different.
          </p>

          {/* CTA Buttons */}
          <div className="reveal-text flex flex-wrap justify-center gap-4 mt-10 w-full" style={{ animationDelay: "0.8s" }}>
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
        className="absolute inset-0 pointer-events-none z-20 flex justify-center"
        style={{
          transform: `translateY(${scrollY * -0.5}px)`,
        }}
      >
        <div className="absolute left-1/2 -translate-x-1/2 top-[-3%] sm:top-[-5%] md:top-[-15%] lg:top-[-15%] xl:top-[-20%] w-[90vw] md:w-[70vw] lg:w-[50vw] h-[60vh] md:h-[75vh]">
          <div 
            className="absolute inset-0 subtle-pulse luchador-enter"
            style={{
              transform: `translateX(${mousePosition.x * 0.3}px) translateY(${mousePosition.y * 0.3}px)`
            }}
          >
            <OptimizedImage
              src="/images/mexican-wrestler.png"
              alt="Chuchos Mexican Luchador mascot - A colorful Mexican wrestler character representing authentic Mexican street food"
              fill
              priority
              blurWidth={400}
              blurHeight={600}
              className="object-contain object-center brightness-[2] contrast-125 transition-transform duration-300"
              style={{
                filter: "brightness(2) contrast(1.25)",
                transform: `rotate(${mousePosition.x * 0.2}deg) scale(${1 + (mousePosition.y * 0.001)})`
              }}
            />
          </div>
        </div>
      </div>

      {/* Decorative Taco Elements */}
      {/* Top Left Taco */}
      <div
        className="absolute top-16 left-8 md:left-16 w-20 h-20 md:w-24 md:h-24 pointer-events-none floating"
        style={{
          animation: 'zoomOut 0.8s ease-out 0.2s forwards, float 12s ease-in-out 0s infinite',
          opacity: 0,
          transform: `translateY(${scrollY * 0.1}px) rotate(15deg) translateX(${mousePosition.x * 0.1}px) translateY(${mousePosition.y * 0.1}px)`
        }}
      >
        <OptimizedImage
          src="/taco.png"
          alt="Decorative taco illustration - Traditional Mexican taco with fresh ingredients"
          fill
          blurWidth={100}
          blurHeight={100}
          className="object-contain"
          style={{
            filter: "drop-shadow(0 4px 6px rgba(0, 0, 0, 0.2))"
          }}
        />
      </div>

      {/* Top Right Taco */}
      <div
        className="absolute top-20 right-8 md:right-16 w-24 h-24 md:w-28 md:h-28 pointer-events-none floating"
        style={{
          animation: 'zoomOut 0.8s ease-out 0.3s forwards, float 14s ease-in-out 0s infinite',
          opacity: 0,
          transform: `translateY(${scrollY * 0.2}px) rotate(-15deg) translateX(${mousePosition.x * -0.1}px) translateY(${mousePosition.y * 0.15}px)`
        }}
      >
        <OptimizedImage
          src="/taco.png"
          alt="Decorative taco illustration - Traditional Mexican taco with meat, onions, and cilantro"
          fill
          blurWidth={100}
          blurHeight={100}
          className="object-contain object-center opacity-30"
          style={{
            transform: `rotate(${mousePosition.x * 0.15}deg) scale(${1 + (mousePosition.y * 0.0003)})`,
          }}
          priority/>
      </div>

      {/* Bottom Left Taco */}
      <div
        className="absolute bottom-32 left-12 md:left-24 w-16 h-16 md:w-20 md:h-20 pointer-events-none floating"
        style={{
          animation: 'zoomOut 0.8s ease-out 0.4s forwards, float 13s ease-in-out 0s infinite',
          opacity: 0,
          transform: `translateY(${scrollY * 0.15}px) rotate(30deg) translateX(${mousePosition.x * 0.15}px) translateY(${mousePosition.y * 0.05}px)`
        }}
      >
        <OptimizedImage
          src="/taco.png"
          alt="Decorative taco illustration - Authentic Mexican taco with slow-cooked meat and fresh toppings"
          fill
          blurWidth={100}
          blurHeight={100}
          className="object-contain object-center opacity-40"
          style={{
            transform: `rotate(${mousePosition.x * 0.1}deg) scale(${1 + (mousePosition.y * 0.0003)})`,
          }}
        />
      </div>

      {/* Bottom Right Taco */}
      <div
        className="absolute bottom-40 right-12 md:right-24 w-14 h-14 md:w-16 md:h-16 pointer-events-none floating"
        style={{
          animation: 'zoomOut 0.8s ease-out 0.5s forwards, float 15s ease-in-out 0s infinite',
          opacity: 0,
          transform: `translateY(${scrollY * 0.25}px) rotate(-30deg) translateX(${mousePosition.x * -0.15}px) translateY(${mousePosition.y * 0.1}px)`
        }}
      >
        <OptimizedImage
          src="/taco.png"
          alt="Decorative taco illustration - Classic Mexican street taco with fresh ingredients"
          fill
          blurWidth={100}
          blurHeight={100}
          className="object-contain object-center opacity-50"
          style={{
            transform: `rotate(${mousePosition.x * -0.1}deg) scale(${1 + (mousePosition.y * 0.0004)})`,
          }}
        />
      </div>

      {/* Additional Tacos */}
      {/* Middle Left Taco */}
      <div
        className="absolute top-1/4 left-4 md:left-8 w-12 h-12 md:w-16 md:h-16 pointer-events-none floating"
        style={{
          animation: 'zoomOut 0.8s ease-out 0.6s forwards, float 13s ease-in-out 1.5s infinite',
          opacity: 0,
          transform: `translateY(${scrollY * 0.1}px) rotate(45deg) translateX(${mousePosition.x * 0.1}px) translateY(${mousePosition.y * 0.05}px)`
        }}
      >
        <OptimizedImage
          src="/taco.png"
          alt="Decorative taco illustration - Handmade Mexican taco with fresh cilantro and onions"
          fill
          blurWidth={100}
          blurHeight={100}
          className="object-contain object-center opacity-30"
          style={{
            transform: `rotate(${mousePosition.x * 0.05}deg) scale(${1 + (mousePosition.y * 0.0005)})`,
          }}
        />
      </div>

      {/* Middle Right Taco */}
      <div
        className="absolute top-1/3 right-4 md:right-8 w-14 h-14 md:w-18 md:h-18 pointer-events-none floating"
        style={{
          animation: 'zoomOut 0.8s ease-out 0.7s forwards, float 14s ease-in-out 2.5s infinite',
          opacity: 0,
          transform: `translateY(${scrollY * 0.15}px) rotate(-20deg) translateX(${mousePosition.x * -0.1}px) translateY(${mousePosition.y * 0.08}px)`
        }}
      >
        <OptimizedImage
          src="/taco.png"
          alt="Decorative taco illustration - Authentic birria taco with melted cheese and consommé"
          fill
          blurWidth={100}
          blurHeight={100}
          className="object-contain object-center opacity-35"
          style={{
            transform: `rotate(${mousePosition.x * -0.08}deg) scale(${1 + (mousePosition.y * 0.0006)})`,
          }}
        />
      </div>

{/* Bottom Center Taco */}
      

      {/* Extra Small Tacos */}
      {[...Array(4)].map((_, i) => {
        const positions = [
          { top: '15%', left: '20%', rotate: 25 },
          { top: '25%', right: '15%', rotate: -15 },
          { bottom: '30%', left: '15%', rotate: 35 },
          { bottom: '20%', right: '20%', rotate: -25 }
        ];
        const pos = positions[i];
        const delay = 0.6 + (i * 0.2);
        const duration = 10 + (i * 2);
        const zoomDelay = 0.3 + (i * 0.1);
        
        return (
          <div
            key={`taco-${i}`}
            className={`absolute w-8 h-8 md:w-10 md:h-10 pointer-events-none floating zoom-out`}
            style={{
              top: pos.top,
              [pos.right ? 'right' : 'left']: pos.right || pos.left,
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s`,
              opacity: 0, /* Start transparent */
              animation: `zoomOut 1s ease-out ${zoomDelay}s forwards, float ${duration}s ease-in-out ${delay}s infinite`,
              transform: `translateY(${scrollY * (0.1 + (i * 0.05))}px) rotate(${pos.rotate}deg) translateX(${mousePosition.x * (i % 2 ? -0.05 : 0.05)}px)`
            }}
          >
            <OptimizedImage
              src="/taco.png"
              alt={`Decorative taco illustration - Small Mexican taco with fresh ingredients (${i + 1} of 4)`}
              fill
              className="object-contain opacity-20"
              style={{
                transform: `rotate(${mousePosition.x * (i % 2 ? -0.05 : 0.05)}deg)`
              }}
              blurWidth={100}
              blurHeight={100}
            />
          </div>
        );
      })}
    </div>
  );
}
