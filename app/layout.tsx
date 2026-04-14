
import { Inter, Instrument_Serif, Poppins } from 'next/font/google';
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ChatWidget from "@/components/chat/ChatWidget";
import { WebsiteDataProvider } from "@/context/WebsiteDataContext";
import type { Metadata } from "next";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-instrument',
  display: 'swap',
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Hope Medicos - Trusted Pharmacy",
  description: "Hope medicos - Your Trusted Pharmacy Store in Hisar. We provide quality medicines, healthcare products, and professional pharmaceutical services. Visit us for all your healthcare needs",
  keywords: "hope,pharmacy, medicines, healthcare, Hisar, Haryana, Hope Medicos, pharmaceutical store, medical supplies, hindi pharmacy, local pharmacy",
  authors: [{ name: "Hope Medicos" }],
  creator: "Hope Medicos",
  publisher: "Hope Medicos",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://hopemedicos.org'),
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: "/hope_logo.png",
    shortcut: "/hope_logo.png",
    apple: "/hope_logo.png",
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://hopemedicos.org',
    siteName: 'Hope Medicos',
    title: "Hope Medicos - Trusted Pharmacy",
    description: "Hope medicos - Your Trusted Pharmacy Store in Hisar. We provide quality medicines, healthcare products, and professional pharmaceutical services. Visit us for all your healthcare needs",
    images: [
      {
        url: "https://hopemedicos.org/hope_logo.png",
        width: 1200,
        height: 630,
        alt: "Hope Medicos - Pharmacy Store",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Hope Medicos - Trusted Pharmacy",
    description: "Hope medicos - Your Trusted Pharmacy Store in Hisar. We provide quality medicines, healthcare products, and professional pharmaceutical services. Visit us for all your healthcare needs",
    images: ['https://hopemedicos.org/hope_logo.png'],
    creator: '@hopemedicos',
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Hope Medicos',
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Pharmacy",
    "name": "Hope Medicos",
    "description": "Leading pharmacy store in Hisar, Haryana providing quality medicines and healthcare products",
    "url": "https://hopemedicos.org",
    "logo": "https://hopemedicos.org/hope_logo.png",
    "image": "https://hopemedicos.org/hope_logo.png",
    "telephone": "+91-XXXXXXXXXX",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Your Street Address",
      "addressLocality": "Hisar",
      "addressRegion": "Haryana",
      "postalCode": "125001",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "29.1492",
      "longitude": "75.7217"
    },
    "openingHours": "Mo-Su 08:00-22:00",
    "priceRange": "₹₹",
    "sameAs": [
      "https://www.facebook.com/hopemedicos",
      "https://www.instagram.com/hopemedicos",
      "https://twitter.com/hopemedicos"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Pharmacy Products",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Medicines"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Healthcare Products"
          }
        }
      ]
    }
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${instrumentSerif.variable} ${poppins.variable} antialiased`} suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <WebsiteDataProvider>
          <Navbar />
          <main>
            {children}
          </main>
          <Footer />
          <ChatWidget />
        </WebsiteDataProvider>
      </body>
    </html>
  );
}
