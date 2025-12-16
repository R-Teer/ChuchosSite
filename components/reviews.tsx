"use client"

import { useState } from "react"
import { Star } from "lucide-react"
import Image from "next/image"

const reviewsData = [
  {
    id: 1,
    author: "Maria Lopez",
    rating: 5,
    date: "2 weeks ago",
    text: "Absolutely incredible birria tacos. The consomé is addictive and the meat is so tender. This is authentic Mexican food at its finest. Will be back every week.",
    image: "/images/tacos.jpeg",
  },
  {
    id: 2,
    author: "Carlos Mendez",
    rating: 5,
    date: "1 month ago",
    text: "Finally found a place that gets it right. The Pork Pibil Ramen is insane. Every bite is perfection. Prices are fair for the quality. Highly recommend.",
    image: "/images/ramen.jpeg",
  },
  {
    id: 3,
    author: "Jessica Chen",
    rating: 5,
    date: "3 weeks ago",
    text: "The chilaquiles are next level. Fresh, spicy, and absolutely delicious. The service is quick and friendly. This place has serious energy.",
  },
  {
    id: 4,
    author: "David Rodriguez",
    rating: 5,
    date: "1 month ago",
    text: "The quesadillas are massive and loaded with flavor. The handmade tortillas make all the difference. This is what real Mexican food tastes like.",
    image: "/images/quesadilla.jpeg",
  },
  {
    id: 5,
    author: "Sofia Martinez",
    rating: 5,
    date: "2 weeks ago",
    text: "The churros for dessert are the perfect ending. Crispy outside, soft inside. Coffee pairs perfectly. Everything about this place is excellence.",
    image: "/images/churros.jpeg",
  },
  {
    id: 6,
    author: "Marco Gutierrez",
    rating: 5,
    date: "3 weeks ago",
    text: "The nachos with birria are unreal. Crispy, loaded, and the consomé on the side is perfect for dipping. Best experience I've had in ages.",
    image: "/images/chilaquilles.jpeg",
  },
]

export function Reviews() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={16} className={`${i < rating ? "fill-accent text-accent" : "text-foreground/20"}`} />
        ))}
      </div>
    )
  }

  return (
    <section className="py-24 md:py-32 bg-card">
      <div className="px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-8 h-[2px] bg-accent" />
            <span className="font-display text-sm tracking-[0.3em] text-accent">WHAT PEOPLE SAY</span>
          </div>
          <h2 className="font-display text-5xl md:text-7xl tracking-tight text-foreground">REVIEWS</h2>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviewsData.map((review) => (
            <div
              key={review.id}
              className="group relative bg-background border border-border hover:border-accent transition-all duration-500 overflow-hidden flex flex-col"
              onMouseEnter={() => setHoveredId(review.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {review.image && (
                <div className="relative h-48 overflow-hidden bg-foreground/10">
                  <Image
                    src={review.image || "/placeholder.svg"}
                    alt={review.author}
                    fill
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                </div>
              )}

              <div className={`p-6 relative z-10 flex flex-col flex-grow ${!review.image ? "bg-background" : ""}`}>
                {/* Stars */}
                <div className="mb-3">{renderStars(review.rating)}</div>

                {/* Author & Date */}
                <div className="mb-4">
                  <h3 className="font-display text-lg text-foreground group-hover:text-accent transition-colors duration-300">
                    {review.author}
                  </h3>
                  <p className="text-muted-foreground text-sm">{review.date}</p>
                </div>

                {/* Review Text */}
                <p className="text-muted-foreground text-sm leading-relaxed line-clamp-4 flex-grow">{review.text}</p>
              </div>

              <div className="absolute bottom-0 left-0 right-0 h-1 bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 flex justify-center">
          <a
            href="https://www.google.com/search?q=Chuchos+Birria+Tacos"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 bg-accent text-background font-display text-sm tracking-widest hover:bg-accent/90 transition-colors duration-300 border border-accent hover:border-accent"
          >
            SEE ALL REVIEWS ON GOOGLE
          </a>
        </div>
      </div>
    </section>
  )
}
