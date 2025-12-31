import { Metadata } from 'next';

export default function StructuredData() {
  const baseUrl = 'https://chuchos.co.uk';
  
  // Main schema for the restaurant
  const restaurantSchema = {
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

  // Website schema
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "#website",
    "url": baseUrl,
    "name": "Chuchos",
    "description": "Authentic Mexican Street Food in Woking, Surrey",
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${baseUrl}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };

  // WebPage schema
  const webpageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "#webpage",
    "url": baseUrl,
    "name": "Chuchos | Authentic Mexican Street Food",
    "isPartOf": {
      "@id": "#website"
    },
    "about": {
      "@id": "#restaurant"
    },
    "primaryImageOfPage": {
      "@id": `${baseUrl}/og-image.jpg`
    },
    "datePublished": "2023-01-01T00:00:00+00:00",
    "dateModified": new Date().toISOString().split('T')[0]
  };

  // Breadcrumb schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": baseUrl
      }
    ]
  };

  // Combine all schemas
  const schemas = [restaurantSchema, websiteSchema, webpageSchema, breadcrumbSchema];

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
