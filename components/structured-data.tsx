import { Metadata } from 'next';

export default function StructuredData() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": "#restaurant",
    "name": "Chuchos",
    "description": "Bold, authentic Mexican street food. Handcrafted tacos, fresh salsas, and flavors that hit different.",
    "image": "https://chuchos.co.uk/og-image.jpg",
    "url": "https://chuchos.co.uk",
    "servesCuisine": ["Mexican", "Street Food", "Tacos", "Birria"],
    "priceRange": "££",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Kiosk 14 Market Walk",
      "addressLocality": "Woking",
      "postalCode": "GU21 6AA",
      "addressCountry": "GB"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "51.3190",
      "longitude": "-0.5588"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday"
        ],
        "opens": "11:00",
        "closes": "17:30"
      }
    ],
    "sameAs": [
      "https://www.instagram.com/chuchos_tacos_uk/",
      "https://www.tiktok.com/@chuchos_tacos_uk"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
