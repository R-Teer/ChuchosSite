import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import StructuredData from "@/components/structured-data"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Chuchos | Authentic Mexican Street Food | Woking, Surrey",
  description: "Bold, authentic Mexican street food. Handcrafted tacos, fresh salsas, and flavors that hit different.",
  keywords: ["Mexican food", "tacos", "street food", "Woking restaurants", "authentic Mexican", "taco truck", "lunch Woking"],
  authors: [{ name: 'Chuchos' }],
  creator: 'Chuchos',
  publisher: 'Chuchos',
  metadataBase: new URL('https://chuchos.co.uk'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Chuchos | Authentic Mexican Street Food',
    description: 'Bold, authentic Mexican street food. Handcrafted tacos, fresh salsas, and flavors that hit different.',
    url: 'https://chuchos.co.uk',
    siteName: 'Chuchos',
    locale: 'en_GB',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Chuchos Mexican Street Food',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chuchos | Authentic Mexican Street Food',
    description: 'Bold, authentic Mexican street food in Woking',
    images: ['/og-image.jpg'],
    creator: '@chuchos_tacos_uk',
  },
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
  generator: 'Next.js',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
        <StructuredData />
        <Analytics />
      </body>
    </html>
  )
}
