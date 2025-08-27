
import { Poppins } from 'next/font/google';
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hope Medicos",
  description: "Hope Medicos - Pharmacy Store",
  icons: {
    icon: "/hmLogo.svg",
  },
  openGraph: {
    title: "Hope Medicos",
    description: "Your Trusted Pharmacy in Hisar",
    images: [
      {
        url: "/hmLogo.svg",
        width: 1200,
        height: 630,
        alt: "Hope Medicos Preview",
      },
    ],
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
  

  return (
    <html lang="en">
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
