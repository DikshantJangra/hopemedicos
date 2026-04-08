'use client';

export default function TrustMarquee() {
  const trustSignals = [
    "Licensed Pharmacy",
    "15,000+ Customers",
    "Certified Products",
    "Fast Delivery",
    "Expert Consultation",
    "Quality Assured",
  ];

  // Duplicate for seamless loop
  const signals = [...trustSignals, ...trustSignals];

  return (
    <div className="w-full overflow-hidden bg-white border-y border-black/5 py-4">
      <div className="flex animate-marquee whitespace-nowrap">
        {signals.map((signal, idx) => (
          <div key={idx} className="inline-flex items-center mx-8">
            <span className="text-xs uppercase tracking-[0.15em] text-black/40 font-medium">
              {signal}
            </span>
            <span className="mx-8 text-black/20">•</span>
          </div>
        ))}
      </div>
    </div>
  );
}
