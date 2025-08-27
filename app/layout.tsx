
import { Poppins } from 'next/font/google';
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hope Medicos - Your Trusted Pharmacy Store in Hisar",
  description: "Hope Medicos is a leading pharmacy store in Hisar, Haryana. We provide quality medicines, healthcare products, and professional pharmaceutical services. Visit us for all your healthcare needs.",
  keywords: "hope,pharmacy, medicines, healthcare, Hisar, Haryana, Hope Medicos, pharmaceutical store, medical supplies",
  authors: [{ name: "Hope Medicos" }],
  creator: "Hope Medicos",
  publisher: "Hope Medicos",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://hopemedicos.com'),
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
    url: 'https://hopemedicos.com',
    siteName: 'Hope Medicos',
    title: "Hope Medicos - Your Trusted Pharmacy Store in Hisar",
    description: "Hope Medicos is a leading pharmacy store in Hisar, Haryana. We provide quality medicines, healthcare products, and professional pharmaceutical services.",
    images: [
      {
        url: "/hmLogo.svg",
        width: 1200,
        height: 630,
        alt: "Hope Medicos - Pharmacy Store",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Hope Medicos - Your Trusted Pharmacy Store in Hisar",
    description: "Hope Medicos is a leading pharmacy store in Hisar, Haryana. We provide quality medicines, healthcare products, and professional pharmaceutical services.",
    images: ['/hmLogo.svg'],
    creator: '@hopemedicos',
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
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
    "url": "https://hopemedicos.com",
    "logo": "https://hopemedicos.com/hmLogo.svg",
    "image": "https://hopemedicos.com/hmLogo.svg",
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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#1AAB86" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Hope Medicos" />
        <meta name="msapplication-TileColor" content="#1AAB86" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <link rel="apple-touch-icon" href="/hmLogo.svg" />
        <link rel="icon" type="image/svg+xml" href="/hmLogo.svg" />
        <link rel="canonical" href="https://hopemedicos.com" />
      </head>
      <body className={`${poppins.variable} antialiased`}>
        <Navbar />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
