import type { Metadata } from 'next';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/utils/firebase';

export const metadata: Metadata = {
  title: 'Terms & Conditions - Hope Medicos',
  description: 'Read the terms and conditions for using Hope Medicos services. Learn about our policies on medicine sales, prescriptions, orders, and customer support.',
  keywords: 'terms and conditions, hope medicos terms, pharmacy terms, medicine policy',
  openGraph: {
    title: 'Terms & Conditions - Hope Medicos',
    description: 'Terms and conditions for using Hope Medicos services',
    url: 'https://hopemedicos.org/terms-and-conditions',
    type: 'website',
  },
};

async function getTermsAndConditions() {
  try {
    const settingsRef = doc(db, 'config', 'portal_settings');
    const settingsSnap = await getDoc(settingsRef);
    
    if (settingsSnap.exists()) {
      return settingsSnap.data().termsAndConditions || getDefaultTerms();
    }
    return getDefaultTerms();
  } catch (error) {
    console.error('Error fetching terms and conditions:', error);
    return getDefaultTerms();
  }
}

function getDefaultTerms() {
  return `<div class="mb-12">
    <h2 class="text-2xl font-bold text-gray-800 mb-4">Welcome to Hope Medicos</h2>
    <p class="text-gray-700 leading-relaxed">
      These Terms and Conditions govern your access to and use of the Hope Medicos website 
      and services. By accessing or using our website, you acknowledge that you have read, understood, 
      and agree to be bound by these Terms.
    </p>
  </div>

  <div class="mb-10 pb-10 border-b border-gray-200">
    <h2 class="text-2xl font-bold text-gray-800 mb-4">1. Acceptance of Terms</h2>
    <p class="text-gray-700 leading-relaxed">
      By accessing and using the Hope Medicos website, you accept and agree to be 
      bound by these Terms and Conditions and our Privacy Policy.
    </p>
  </div>

  <div class="mb-10 pb-10 border-b border-gray-200">
    <h2 class="text-2xl font-bold text-gray-800 mb-4">2. Products and Services</h2>
    <p class="text-gray-700 leading-relaxed">
      Hope Medicos sells Over-the-Counter (OTC) medicines and healthcare products. 
      Prescription medicines require valid prescriptions from licensed medical practitioners.
    </p>
  </div>

  <div class="mb-10">
    <h2 class="text-2xl font-bold text-gray-800 mb-4">Contact Us</h2>
    <p class="text-gray-700 leading-relaxed">
      For questions about these Terms, contact us at hope.medicos@gmail.com or +91 9812080390
    </p>
  </div>`;
}

export default async function TermsPage() {
  const termsContent = await getTermsAndConditions();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-gradient-to-r from-brand to-brand-dark text-white py-24 px-4 pt-40">
        <div className="max-w-4xl mx-auto text-center sm:text-left">
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">Terms & Conditions</h1>
          <p className="text-xl opacity-90 font-medium">
            Effective Date: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 px-4 -mt-10">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-16 border border-brand/10">
            <div 
              className="prose prose-lg max-w-none 
                prose-headings:text-brand prose-headings:font-black
                prose-p:text-gray-600 prose-p:leading-relaxed
                prose-strong:text-brand prose-strong:font-bold"
              dangerouslySetInnerHTML={{ __html: termsContent }} 
            />
          </div>
        </div>
      </section>
    </div>
  );
}
