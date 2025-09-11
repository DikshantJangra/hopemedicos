
import { Poppins } from 'next/font/google';
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hope Medicos - फ़िक्र आपकी",
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
    icon: "/hmLogo.svg",
    shortcut: "/hmLogo.svg",
    apple: "/hmLogo.svg",
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://hopemedicos.org',
    siteName: 'Hope Medicos',
    title: "Hope Medicos - फ़िक्र आपकी",
    description: "Hope medicos - Your Trusted Pharmacy Store in Hisar. We provide quality medicines, healthcare products, and professional pharmaceutical services. Visit us for all your healthcare needs",
    images: [
      {
        url: "https://hopemedicos.org/hmLogo.svg",
        width: 1200,
        height: 630,
        alt: "Hope Medicos - Pharmacy Store",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Hope Medicos - फ़िक्र आपकी",
    description: "Hope medicos - Your Trusted Pharmacy Store in Hisar. We provide quality medicines, healthcare products, and professional pharmaceutical services. Visit us for all your healthcare needs",
    images: ['https://hopemedicos.org/hmLogo.svg'],
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

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'], // choose only what you need
  variable: '--font-poppins',
})

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
    "logo": "https://hopemedicos.org/hmLogo.svg",
    "image": "https://hopemedicos.org/hmLogo.svg",
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
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <Navbar />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
