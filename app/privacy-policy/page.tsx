import type { Metadata } from 'next';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/utils/firebase';

export const metadata: Metadata = {
  title: 'Privacy Policy - Hope Medicos',
  description: 'Learn how Hope Medicos collects, uses, and protects your personal information. Read our comprehensive privacy policy.',
  keywords: 'privacy policy, hope medicos privacy, data protection, personal information',
  openGraph: {
    title: 'Privacy Policy - Hope Medicos',
    description: 'Privacy policy for Hope Medicos services',
    url: 'https://hopemedicos.org/privacy-policy',
    type: 'website',
  },
};

async function getPrivacyPolicy() {
  try {
    const settingsRef = doc(db, 'config', 'portal_settings');
    const settingsSnap = await getDoc(settingsRef);
    
    if (settingsSnap.exists()) {
      return settingsSnap.data().privacyPolicy || getDefaultPrivacyPolicy();
    }
    return getDefaultPrivacyPolicy();
  } catch (error) {
    console.error('Error fetching privacy policy:', error);
    return getDefaultPrivacyPolicy();
  }
}

function getDefaultPrivacyPolicy() {
  return `<div class="mb-12">
    <h2 class="text-2xl font-bold text-gray-800 mb-4">Your Privacy Matters</h2>
    <p class="text-gray-700 leading-relaxed">
      At Hope Medicos, we are committed to protecting your privacy and ensuring the security of your 
      personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard 
      your information when you visit our website or use our services.
    </p>
  </div>

  <div class="mb-10 pb-10 border-b border-gray-200">
    <h2 class="text-2xl font-bold text-gray-800 mb-4">1. Information We Collect</h2>
    <p class="text-gray-700 leading-relaxed mb-3">
      We collect information that you voluntarily provide to us when you register, place orders, or contact us.
    </p>
  </div>

  <div class="mb-10 pb-10 border-b border-gray-200">
    <h2 class="text-2xl font-bold text-gray-800 mb-4">2. How We Use Your Information</h2>
    <p class="text-gray-700 leading-relaxed">
      We use your information to process orders, provide customer support, and improve our services.
    </p>
  </div>

  <div class="mb-10">
    <h2 class="text-2xl font-bold text-gray-800 mb-4">Contact Us</h2>
    <p class="text-gray-700 leading-relaxed mb-4">
      If you have questions about this Privacy Policy, please contact us at hope.medicos@gmail.com
    </p>
  </div>`;
}

export default async function PrivacyPolicyPage() {
  const privacyContent = await getPrivacyPolicy();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-gradient-to-r from-brand to-brand-dark text-white py-24 px-4 pt-40">
        <div className="max-w-4xl mx-auto text-center sm:text-left">
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">Privacy Policy</h1>
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
              dangerouslySetInnerHTML={{ __html: privacyContent }} 
            />
          </div>
        </div>
      </section>
    </div>
  );
}
