import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Terms & Conditions | Hope Medicos',
    description: 'Terms and Conditions of Service for Hope Medicos. Detailed information on our service policies, user responsibilities, and legal obligations.',
};

export default function TermsAndConditions() {
    const lastUpdated = "April 8, 2026";

    return (
        <div className="bg-[#faf9f7] min-h-screen pt-32 pb-24 px-6 font-inter">
            <div className="max-w-3xl mx-auto text-black/80">
                {/* Header */}
                <div className="mb-16">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#f58518] font-semibold mb-4">
                        Legal Documentation
                    </p>
                    <h1 className="text-5xl md:text-6xl font-normal tracking-tight text-black mb-6">
                        Terms <span className="font-serif italic font-light">&</span> Conditions
                    </h1>
                    <div className="flex items-center gap-4 text-xs text-black/40">
                        <span>Last Updated: {lastUpdated}</span>
                        <div className="w-1 h-1 rounded-full bg-black/10" />
                        <span>Hope Medicos</span>
                    </div>
                </div>

                {/* Content */}
                <div className="space-y-12 text-base leading-relaxed">
                    <section>
                        <h2 className="text-xl font-medium text-black mb-4 underline decoration-[#f58518]/20 underline-offset-8">
                            1. Acceptance of Terms
                        </h2>
                        <p>
                            By accessing and using the services provided by Hope Medicos ("Service"), you agree to be bound by these Terms and Conditions ("Terms"). If you do not agree with any part of these Terms, you must not use our Service. These Terms apply to all visitors, users, and others who access or use our Service.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-medium text-black mb-4 underline decoration-[#f58518]/20 underline-offset-8">
                            2. Pharmaceutical Services and Compliance
                        </h2>
                        <div className="space-y-4">
                            <p>
                                Hope Medicos is a licensed pharmacy provider in Haryana, India. All pharmaceutical services, including the sale of medicinal products, are conducted in strict accordance with the Drugs and Cosmetics Act, 1940 and the Drugs and Cosmetics Rules, 1945, as amended from time to time.
                            </p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li><strong>Prescription Requirement:</strong> Medicines classified under Schedule H and H1 are supplied only against a valid prescription from a registered medical practitioner.</li>
                                <li><strong>Verification:</strong> We reserve the right to verify prescriptions via telephonic or digital communication with the prescribing doctor.</li>
                                <li><strong>Accuracy:</strong> You represent that any information, including prescriptions, provided by you to Hope Medicos is true, accurate, and current.</li>
                            </ul>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-medium text-black mb-4 underline decoration-[#f58518]/20 underline-offset-8">
                            3. User Accounts and Responsibilities
                        </h2>
                        <p>
                            If you create an account with us, you are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer or mobile device. You agree to accept responsibility for all activities that occur under your account or password.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-medium text-black mb-4 underline decoration-[#f58518]/20 underline-offset-8">
                            4. Orders and Payments
                        </h2>
                        <ul className="list-disc pl-5 space-y-2">
                            <li><strong>Availability:</strong> All product orders are subject to availability. We reserve the right to limit the quantity of any product.</li>
                            <li><strong>Pricing:</strong> We make every attempt to ensure that prices on our website are accurate; however, errors may occur. If we discover an error in the price of any product you have ordered, we will inform you as soon as possible.</li>
                            <li><strong>Taxation:</strong> Prices listed for products are inclusive of all applicable taxes unless otherwise stated.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-medium text-black mb-4 underline decoration-[#f58518]/20 underline-offset-8">
                            5. Delivery and Returns
                        </h2>
                        <p>
                            Delivery of medical supplies will be made to the address specified in your order. Hope Medicos reserves the right to refuse the return of pharmaceutical products once delivered, as per standard health and safety protocols, unless the products are damaged or expired at the time of delivery.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-medium text-black mb-4 underline decoration-[#f58518]/20 underline-offset-8">
                            6. Intellectual Property
                        </h2>
                        <p>
                            The Service and its original content (excluding content provided by users), features, and functionality are and will remain the exclusive property of Hope Medicos and its licensors. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of Hope Medicos.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-medium text-black mb-4 underline decoration-[#f58518]/20 underline-offset-8">
                            7. Limitation of Liability
                        </h2>
                        <p>
                            In no event shall Hope Medicos, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-medium text-black mb-4 underline decoration-[#f58518]/20 underline-offset-8">
                            8. Governing Law
                        </h2>
                        <p>
                            These Terms shall be governed and construed in accordance with the laws of India. Any dispute arising out of or in connection with these Terms, including any question regarding its existence, validity, or termination, shall be subject to the exclusive jurisdiction of the courts located in Hisar, Haryana.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-medium text-black mb-4 underline decoration-[#f58518]/20 underline-offset-8">
                            9. Changes to Terms
                        </h2>
                        <p>
                            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, please stop using our Service.
                        </p>
                    </section>

                    <section className="pt-8 border-t border-black/5">
                        <h2 className="text-xl font-medium text-black mb-4 underline decoration-[#f58518]/20 underline-offset-8">
                            Contact Legal
                        </h2>
                        <p>For any legal enquiries regarding these Terms, please contact us:</p>
                        <ul className="mt-4 space-y-1">
                            <li>Email: admin@hopemedicos.org</li>
                            <li>Phone: +91 98120 80390</li>
                            <li>Direct: Hope Medicos legal department, Hisar, Haryana</li>
                        </ul>
                    </section>
                </div>
            </div>
        </div>
    );
}
