import { Metadata } from 'next';

type PageMetadata = {
  title: string;
  description: string;
  path: string;
  image?: string;
};

export function generateMetadata({
  title,
  description,
  path,
  image = '/og-image.jpg',
}: PageMetadata): Metadata {
  const url = `https://chuchos.co.uk${path}`;
  const ogImage = `https://chuchos.co.uk${image}`;

  return {
    title: `${title} | Chuchos`,
    description,
    metadataBase: new URL('https://chuchos.co.uk'),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${title} | Chuchos`,
      description,
      url,
      siteName: 'Chuchos',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_GB',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | Chuchos`,
      description,
      images: [ogImage],
    },
  };
}
