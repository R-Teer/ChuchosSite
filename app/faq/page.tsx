import { Metadata } from 'next';
import { generateMetadata as generatePageMetadata } from '@/lib/metadata';
import { FaqSection } from '@/components/faq-section';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';

export const metadata: Metadata = generatePageMetadata({
  title: 'Frequently Asked Questions',
  description: 'Find answers to common questions about Chuchos, our menu, ingredients, and more.',
  path: '/faq',
});

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      <main className="pt-24">
        {/* Hero Section */}
        <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden bg-background">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="font-display text-[20vw] text-foreground/[0.03] whitespace-nowrap">FAQ</span>
          </div>
          
          <div className="relative z-10 px-4 md:px-8 lg:px-16 text-center max-w-4xl">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display tracking-tight mb-6">
              <span className="text-red-500">FREQUENTLY ASKED</span>
              <br />
              <span className="text-white">QUESTIONS</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
              Everything you need to know about Chuchos. Can't find the answer you're looking for? 
              Feel free to <a href="/contact" className="text-red-500 hover:underline">contact us</a>.
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 md:py-24 px-4 md:px-8">
          <div className="container mx-auto max-w-4xl">
            <div className="bg-card/50 backdrop-blur-sm border border-gray-800 rounded-lg p-6 md:p-8">
              <FaqSection />
            </div>
            
            <div className="mt-12 text-center">
              <h2 className="text-2xl font-display mb-6">Still have questions?</h2>
              <a 
                href="/contact" 
                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 md:py-4 md:text-lg md:px-10 transition-colors duration-200"
              >
                Contact Us
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
