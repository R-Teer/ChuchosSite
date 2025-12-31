import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/images/wrestler*',
        '/images/tacos*',
        '/images/assorti*',
        '/api/',
        '/_next/',
        '/favicon.ico',
      ],
    },
    sitemap: 'https://chuchos.co.uk/sitemap.xml',
  };
}
