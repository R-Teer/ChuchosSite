import { Navigation } from "@/components/navigation"
import { ParallaxHero } from "@/components/parallax-hero"
import { FeaturedSection } from "@/components/featured-section"
import { AboutPreview } from "@/components/about-preview"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main>
      <Navigation />
      <ParallaxHero />
      <FeaturedSection />
      <AboutPreview />
      <Footer />
    </main>
  )
}
