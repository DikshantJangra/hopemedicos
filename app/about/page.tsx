import Image from 'next/image';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us - Hope Medicos | Your Trusted Pharmacy Partner',
  description: 'Learn about Hope Medicos, a trusted pharmacy in Hisar, Haryana serving customers with genuine medicines and quality healthcare products since 2010. A unit of GlobalHope Biotech OPC Private Limited.',
  keywords: 'about hope medicos, pharmacy hisar, healthcare hisar, trusted pharmacy, GlobalHope Biotech',
  openGraph: {
    title: 'About Us - Hope Medicos',
    description: 'Your Trusted Pharmacy Partner serving quality medicines and healthcare products since 2010',
    url: 'https://hopemedicos.org/about',
    type: 'website',
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-8 flex justify-center">
            <Image
              src="/hope_logo.png"
              alt="Hope Medicos Logo"
              width={120}
              height={120}
              className="drop-shadow-2xl"
              priority
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            About Hope Medicos
          </h1>
          <p className="text-xl md:text-2xl font-light max-w-3xl mx-auto">
            Your Trusted Pharmacy Partner
          </p>
          <p className="text-lg mt-4 opacity-90">
            Serving quality medicines and healthcare products with care, trust, and professionalism.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Introduction */}
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Who We Are</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Hope Medicos is a trusted pharmacy and healthcare store based in Hisar, Haryana, 
              serving customers with genuine medicines and quality healthcare products since 2010.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              We are committed to providing safe, reliable, and affordable medicines to our community. 
              As a unit of <span className="font-semibold text-blue-600">GlobalHope Biotech OPC Private Limited</span>, 
              we focus on delivering trusted healthcare solutions with a strong emphasis on customer care and satisfaction.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              At Hope Medicos, we offer a wide range of products including prescription medicines, 
              over-the-counter drugs, healthcare essentials, wellness products, and personal care items.
            </p>
          </div>

          {/* Mission */}
          <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-lg p-8 md:p-12 mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Our mission is to ensure that every customer receives the right medicine, proper guidance, 
              and a smooth experience both in-store and online. We believe in building lasting relationships 
              with our customers through trust, quality, and exceptional service.
            </p>
          </div>

          {/* Why Choose Us */}
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Why Choose Us?</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: 'Genuine & Quality Medicines',
                  description: 'We source all our products from authorized distributors to ensure authenticity and quality.',
                  icon: '✓'
                },
                {
                  title: 'Experienced & Trusted',
                  description: 'Serving the community since 2010 with professional pharmaceutical expertise.',
                  icon: '⭐'
                },
                {
                  title: 'Customer-Focused Service',
                  description: 'Your health and satisfaction are our top priorities. We provide personalized care and guidance.',
                  icon: '❤️'
                },
                {
                  title: 'Wide Product Range',
                  description: 'From prescription medicines to wellness products, we have everything you need.',
                  icon: '🏥'
                },
                {
                  title: 'Affordable Pricing',
                  description: 'Competitive prices without compromising on quality or service.',
                  icon: '💰'
                },
                {
                  title: 'Professional Guidance',
                  description: 'Expert advice from qualified pharmacists for all your healthcare needs.',
                  icon: '👨‍⚕️'
                }
              ].map((feature, index) => (
                <div key={index} className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl border border-blue-100 hover:shadow-md transition-shadow">
                  <div className="text-3xl mb-3">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Vision */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-2xl shadow-lg p-8 md:p-12 mb-12">
            <h2 className="text-3xl font-bold mb-6 text-center">Our Vision</h2>
            <p className="text-lg leading-relaxed text-center max-w-3xl mx-auto">
              To become a reliable and accessible healthcare partner for every family in Hisar and beyond, 
              ensuring quality healthcare is within everyone&apos;s reach.
            </p>
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Get In Touch</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-start">
                  <span className="text-2xl mr-4">📍</span>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Location</h3>
                    <p className="text-gray-600">Hisar, Haryana, India</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-2xl mr-4">📞</span>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Contact</h3>
                    <a href="tel:+919812080390" className="text-blue-600 hover:underline">
                      +91 9812080390
                    </a>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start">
                  <span className="text-2xl mr-4">🕒</span>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Serving Since</h3>
                    <p className="text-gray-600">2010</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-2xl mr-4">🏢</span>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Part of</h3>
                    <p className="text-gray-600">GlobalHope Biotech OPC Private Limited</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
