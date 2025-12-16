"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

export default function ContactPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
    alert("Message sent! We'll get back to you soon.")
    setFormData({ name: "", email: "", message: "" })
  }

  return (
    <main>
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden bg-background pt-24">
        {/* Background Text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="font-display text-[18vw] text-foreground/[0.03] whitespace-nowrap">CONTACT</span>
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
              <span className="font-display text-sm tracking-[0.3em] text-accent">GET IN TOUCH</span>
              <div className="w-12 h-[2px] bg-accent" />
            </div>
            <h1 className="font-display text-6xl md:text-8xl lg:text-9xl tracking-tight text-foreground">FIND US</h1>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16 md:py-24 bg-card">
        <div className="px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
            {/* Contact Info */}
            <div>
              <h2 className="font-display text-4xl md:text-5xl tracking-tight text-foreground mb-8">
                COME SAY
                <span className="block text-accent">HOLA</span>
              </h2>

              <div className="space-y-8">
                {/* Address */}
                <div className="flex gap-4 group">
                  <div className="w-12 h-12 flex items-center justify-center bg-muted group-hover:bg-accent transition-colors duration-300">
                    <MapPin className="w-5 h-5 text-foreground" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg tracking-wider text-foreground">ADDRESS</h3>
                    <p className="text-muted-foreground mt-1">
                      Kiosk 14 Market Walk
                      <br />
                      Woking, GU21 6AA
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex gap-4 group">
                  <div className="w-12 h-12 flex items-center justify-center bg-muted group-hover:bg-accent transition-colors duration-300">
                    <Mail className="w-5 h-5 text-foreground" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg tracking-wider text-foreground">EMAIL</h3>
                    <a
                      href="mailto:contact@chuchos.co.uk"
                      className="text-muted-foreground hover:text-accent transition-colors mt-1 block"
                    >
                      contact@chuchos.co.uk
                    </a>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex gap-4 group">
                  <div className="w-12 h-12 flex items-center justify-center bg-muted group-hover:bg-accent transition-colors duration-300">
                    <Clock className="w-5 h-5 text-foreground" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg tracking-wider text-foreground">HOURS</h3>
                    <div className="text-muted-foreground mt-1 space-y-1">
                      <p>Mon - Thu: 11am - 10pm</p>
                      <p>Fri - Sat: 11am - 12am</p>
                      <p>Sunday: 12pm - 9pm</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-background p-8 md:p-12 border border-border">
              <h3 className="font-display text-2xl md:text-3xl tracking-tight text-foreground mb-6">SEND A MESSAGE</h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block font-display text-sm tracking-wider text-foreground mb-2">
                    NAME
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full bg-muted border border-border px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block font-display text-sm tracking-wider text-foreground mb-2">
                    EMAIL
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full bg-muted border border-border px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block font-display text-sm tracking-wider text-foreground mb-2">
                    MESSAGE
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={5}
                    className="w-full bg-muted border border-border px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors resize-none"
                    placeholder="What's on your mind?"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-accent hover:bg-accent-hover text-foreground font-display text-lg tracking-wider py-4 transition-colors duration-300"
                >
                  SEND MESSAGE
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="h-[400px] md:h-[500px] bg-muted relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-accent flex items-center justify-center">
              <MapPin className="w-8 h-8 text-foreground" />
            </div>
            <p className="font-display text-2xl tracking-wider text-foreground">Kiosk 14 Market Walk</p>
            <p className="text-muted-foreground mt-2">Woking, GU21 6AA</p>
            <a
              href="https://www.google.com/maps/place/Chuchos+-+Birria+Tacos+%26+Mexican+Cantina/@51.3194246,-0.5596591,17z/data=!3m1!4b1!4m6!3m5!1s0x4875d936bc6c8f8f:0xf0611a9ad679324c!8m2!3d51.3194246!4d-0.5596591!16s%2Fg%2F11yqttqr2x?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 font-display text-sm tracking-wider text-accent hover:text-accent-hover transition-colors"
            >
              GET DIRECTIONS →
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
