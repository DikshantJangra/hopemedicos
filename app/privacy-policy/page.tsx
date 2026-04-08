import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Privacy Policy | Hope Medicos',
    description: 'Privacy Policy for Hope Medicos. Understand how we collect, use, and protect your personal information.',
};

export default function PrivacyPolicy() {
    const lastUpdated = "April 8, 2026";

    return (
        <div className="bg-[#faf9f7] min-h-screen pt-32 pb-24 px-6 font-inter">
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <div className="mb-16">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#f58518] font-semibold mb-4">
                        Legal Documentation
                    </p>
                    <h1 className="text-5xl md:text-6xl font-normal tracking-tight text-black mb-6">
                        Privacy <span className="font-serif italic font-light">Policy</span>
                    </h1>
                    <div className="flex items-center gap-4 text-xs text-black/40">
                        <span>Last Updated: {lastUpdated}</span>
                        <div className="w-1 h-1 rounded-full bg-black/10" />
                        <span>Hope Medicos</span>
                    </div>
                </div>

                {/* Content */}
                <div className="space-y-12 text-base leading-relaxed text-black/80">
                    <section>
                        <h2 className="text-xl font-medium text-black mb-4">1. Introduction</h2>
                        <p>
                            At Hope Medicos ("we," "our," or "us"), we are committed to protecting your privacy. This Privacy Policy explains how your personal information is collected, used, and disclosed by Hope Medicos. This Privacy Policy applies to our website, and its associated subdomains (collectively, our "Service"). By accessing or using our Service, you signify that you have read, understood, and agree to our collection, storage, use, and disclosure of your personal information as described in this Privacy Policy.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-medium text-black mb-4">2. Information We Collect</h2>
                        <div className="space-y-4">
                            <p>We collect several different types of information for various purposes to provide and improve our Service to you:</p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li><strong>Personal Data:</strong> While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you, including your name, email address, phone number, and shipping address.</li>
                                <li><strong>Prescription Information:</strong> For pharmaceutical services, we may collect information from prescriptions provided by registered medical practitioners, as required by law.</li>
                                <li><strong>Usage Data:</strong> We may also collect information on how the Service is accessed and used. This may include your IP address, browser type, browser version, the pages of our Service that you visit, the time and date of your visit, and other diagnostic data.</li>
                            </ul>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-medium text-black mb-4">3. Use of Information</h2>
                        <p>Hope Medicos uses the collected data for various purposes:</p>
                        <ul className="list-disc pl-5 mt-4 space-y-2">
                            <li>To provide and maintain our Service</li>
                            <li>To process and deliver your orders for medicines and healthcare products</li>
                            <li>To notify you about changes to our Service or special offers</li>
                            <li>To provide customer support and handle enquiries</li>
                            <li>To gather analysis or valuable information so that we can improve our Service</li>
                            <li>To monitor the usage of our Service</li>
                            <li>To detect, prevent and address technical issues</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-medium text-black mb-4">4. Data Security</h2>
                        <p>
                            The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, including encryption and secure firewalls, we cannot guarantee its absolute security.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-medium text-black mb-4">5. Third-Party Services</h2>
                        <p>
                            We may employ third-party companies and individuals to facilitate our Service ("Service Providers"), to provide the Service on our behalf, to perform Service-related services or to assist us in analyzing how our Service is used. These third parties have access to your Personal Data only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-medium text-black mb-4">6. Your Rights</h2>
                        <p>
                            Depending on your location, you may have the right to access, update, or delete the information we have on you. If you wish to be informed what Personal Data we hold about you and if you want it to be removed from our systems, please contact us.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-medium text-black mb-4">7. Changes to This Policy</h2>
                        <p>
                            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "last updated" date at the top of this Privacy Policy.
                        </p>
                    </section>

                    <section className="pt-8 border-t border-black/5">
                        <h2 className="text-xl font-medium text-black mb-4">Contact Us</h2>
                        <p>If you have any questions about this Privacy Policy, please contact us:</p>
                        <ul className="mt-4 space-y-1">
                            <li>Email: admin@hopemedicos.org</li>
                            <li>Phone: +91 98120 80390</li>
                            <li>Address: Hope Medicos, Near Sarvodya Hospital, Hisar, Haryana 125001</li>
                        </ul>
                    </section>
                </div>
            </div>
        </div>
    );
}
