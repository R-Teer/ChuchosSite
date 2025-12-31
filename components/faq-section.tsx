'use client';

import { useState } from 'react';

type FAQItem = {
  question: string;
  answer: string | React.ReactNode;
};

const faqItems: FAQItem[] = [
  {
    question: 'What makes Chuchos different from other taco places?',
    answer: 'At Chuchos, we source our ingredients directly from Mexico to ensure authentic flavors. Our meats are halal-certified, making our food accessible to everyone. We also offer weekly specials that showcase traditional Mexican street food with our unique twist.'
  },
  {
    question: 'Are all your meats halal?',
    answer: 'Yes! We take pride in offering 100% halal-certified beef and chicken, prepared according to halal guidelines. This allows everyone in our community to enjoy authentic Mexican flavors.'
  },
  {
    question: 'What is birria?',
    answer: 'Birria is a traditional Mexican dish from Jalisco, typically made with slow-cooked, tender meat in a rich, flavorful broth. Our birria is made with a special blend of dried chilies and spices, slow-cooked to perfection.'
  },
  {
    question: 'Do you offer vegetarian or vegan options?',
    answer: 'Yes! We have delicious vegetarian options, including our famous mushroom quesadilla and veggie burritos. For vegans, we can modify several dishes - just let us know your dietary preferences when ordering.'
  },
  {
    question: 'Where do you source your ingredients?',
    answer: 'We source many of our key ingredients, including chilies, spices, and corn for our tortillas, directly from Mexico. Our produce is locally sourced from trusted suppliers in Surrey to ensure freshness.'
  },
  {
    question: 'Do you cater for events?',
    answer: 'Yes! We offer catering services for events in the Woking and surrounding areas. Whether it\'s a corporate event, birthday, or wedding, we can create a custom menu to suit your needs. Contact us for more details.'
  },
  {
    question: 'What are your opening hours?',
    answer: 'We\'re open Tuesday to Sunday from 11:00 AM to 5:30 PM. We\'re closed on Mondays.'
  },
  {
    question: 'Do you offer takeaway?',
    answer: 'Yes! You can order takeaway directly from our kiosk at Market Walk, Woking. We also offer click-and-collect - just give us a call to place your order in advance.'
  }
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Generate FAQ schema for SEO
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": typeof item.answer === 'string' ? item.answer : ''
      }
    }))
  };

  return (
    <div className="space-y-2">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      <div className="space-y-2">
        {faqItems.map((item, index) => (
          <div 
            key={index} 
            className={`border-b border-gray-800 transition-colors duration-300 ${
              openIndex === index ? 'border-red-500/50' : 'border-gray-800'
            }`}
          >
            <button
              className="w-full text-left py-4 flex justify-between items-center focus:outline-none group"
              onClick={() => toggleFaq(index)}
              aria-expanded={openIndex === index}
              aria-controls={`faq-${index}`}
            >
              <h2 className="text-lg md:text-xl font-medium text-white group-hover:text-red-500 transition-colors duration-200">
                {item.question}
              </h2>
              <span 
                className={`text-2xl ml-4 transition-transform duration-300 ${
                  openIndex === index ? 'text-red-500 rotate-0' : 'text-gray-500 rotate-90'
                }`}
              >
                ›
              </span>
            </button>
            
            <div
              id={`faq-${index}`}
              className={`overflow-hidden transition-all duration-300 ${
                openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}
              aria-hidden={openIndex !== index}
            >
              <div className="pb-4 text-gray-300 text-sm md:text-base leading-relaxed">
                {item.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
