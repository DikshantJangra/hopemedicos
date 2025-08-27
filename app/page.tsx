import Hope from '@/components/sections/Hope'
import Initiatives from '@/components/sections/Initiatives'
import Offers from '@/components/sections/Offers'
import ShopNow from '@/components/sections/ShopNow'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Hope Medicos - Leading Pharmacy Store in Hisar | Quality Medicines & Healthcare",
  description: "Discover Hope Medicos, the premier pharmacy store in Hisar, Haryana. We offer a wide range of medicines, healthcare products, and professional pharmaceutical services. Your health is our priority.",
  keywords: "pharmacy Hisar, medicines store, healthcare products, pharmaceutical services, medical supplies, Hope Medicos, trusted pharmacy, quality medicines",
  openGraph: {
    title: "Hope Medicos - Leading Pharmacy Store in Hisar | Quality Medicines & Healthcare",
    description: "Discover Hope Medicos, the premier pharmacy store in Hisar, Haryana. We offer a wide range of medicines, healthcare products, and professional pharmaceutical services.",
    url: 'https://hopemedicos.com',
    siteName: 'Hope Medicos',
    images: [
      {
        url: '/hmLogo.svg',
        width: 1200,
        height: 630,
        alt: 'Hope Medicos Pharmacy Store',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Hope Medicos - Leading Pharmacy Store in Hisar | Quality Medicines & Healthcare",
    description: "Discover Hope Medicos, the premier pharmacy store in Hisar, Haryana. We offer a wide range of medicines, healthcare products, and professional pharmaceutical services.",
    images: ['/hmLogo.svg'],
  },
  alternates: {
    canonical: '/',
  },
}

export default function HomePage() {
  return (
    <>
      <Hope />
      <Initiatives />
      <Offers />
      <ShopNow />
    </>
  )
}
