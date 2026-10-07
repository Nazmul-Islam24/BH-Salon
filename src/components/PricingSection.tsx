import React from 'react';

interface PricingSectionProps {
  onViewFullPricing: () => void;
  onBookNow: () => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({
  onViewFullPricing,
  onBookNow,
}) => {
  // Exactly 15 curated, essential, popular salon services matching the Pricing Page
  const previewItems = [
    { name: 'Precision Eyebrows Threading', price: 'From $15', note: '15 min · Organic antibacterial cotton brow contouring' },
    { name: 'Full Face Threading Package', price: '$48', originalPrice: '$55', badge: 'Save up to 10%', note: '45 min · Includes brow arch, lip, chin, and soothing rosewater mist' },
    { name: 'Brow Lamination, Tint & Wax', price: 'From $75', note: '45 min · Architectural redirection with vegetable tint' },
    { name: 'Wash, Cut & Blow-Dry', price: 'From $85', note: '1 hr · Architectural haircut with botanical wash & blowout' },
    { name: 'Artisan Thermal Blowout', price: 'From $50', note: '45 min · Luxury wash, round ceramic wave sculpt' },
    { name: 'Brazilian Blow-Dry Keratin', price: '$220', originalPrice: '$245', badge: 'Save up to 10%', note: '2 hr · Long-lasting liquid silk alignment & humidity lock' },
    { name: 'Hair Botox Restoration', price: 'From $160', note: '1 hr 30 min · Deep collagen and amino acid restorative filler' },
    { name: 'OLAPLEX Molecular Bond Builder', price: 'From $55', note: '45 min · Patented disulfide bond reconstructive therapy' },
    { name: 'French Balayage Dimensional Highlights', price: '$240', originalPrice: '$265', badge: 'Save up to 10%', note: '3 hr · French hand-painted ribbons with gloss sealant' },
    { name: 'Half Head Dimensional Highlights', price: 'From $110', note: '1 hr 30 min · Micro baby-lights framing crown and parting' },
    { name: 'Single Process Root Refresh', price: 'From $55', note: '1 hr · Precision color continuity and 100% grey coverage' },
    { name: 'Dermalogica Deep Cleansing Facial', price: 'From $75', note: '1 hr · Botanical enzymatic extractions and recovery masque' },
    { name: 'Crystal Clear Microdermabrasion & Oxygen', price: '$120', originalPrice: '$135', badge: 'Save up to 10%', note: '1 hr 15 min · Diamond crystal peel with pressurized oxygen plumping' },
    { name: 'Full Body Gentle Waxing', price: '$145', originalPrice: '$160', badge: 'Save up to 10%', note: '1 hr 45 min · Azulene temperature-controlled strip waxing' },
    { name: 'Keratin Lash & Brow Lift Duo', price: '$95', originalPrice: '$105', badge: 'Save up to 10%', note: '1 hr 15 min · Semi-permanent upward lift with carbon-black tint' },
  ];

  return (
    <section className="py-14 sm:py-20 bg-[#F7F3EE]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-12">
          <span className="text-xs uppercase tracking-[0.25em] text-[#B98272] font-semibold block mb-1">
            INVESTMENT & CARE
          </span>
          <h2 className="font-serif font-normal text-3xl sm:text-5xl text-[#24201D] tracking-tight">
            SERVICES & PRICES
          </h2>
          <p className="text-xs sm:text-sm text-[#756B63] mt-2 font-light">
            Transparent pricing designed around bespoke artistry, certified therapists, and clean formulations.
          </p>
        </div>

        <div className="bg-white/80 border border-[#24201D]/15 p-6 sm:p-10 shadow-xs divide-y divide-[#24201D]/10">
          {previewItems.map((item, idx) => (
            <div
              key={idx}
              className="py-4 sm:py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 first:pt-0 last:pb-0"
            >
              <div>
                <span className="font-serif text-lg sm:text-xl text-[#24201D] font-normal block">
                  {item.name}
                </span>
                <span className="text-xs text-[#756B63] font-light">
                  {item.note}
                </span>
              </div>

              <div className="flex items-center space-x-3 self-end sm:self-center">
                {item.originalPrice && (
                  <span className="line-through text-xs font-inter text-[#756B63]/60">
                    {item.originalPrice}
                  </span>
                )}
                {item.badge && (
                  <span className="bg-[#6B8E72]/15 text-[#3F6647] text-[10px] uppercase font-semibold px-2 py-0.5 tracking-wider font-inter rounded-xs">
                    {item.badge}
                  </span>
                )}
                <span className="font-inter text-base sm:text-lg font-semibold text-[#24201D] tracking-tight price-number">
                  {item.price}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer per PDF */}
        <p className="text-xs text-[#756B63] text-center mt-6 italic font-light">
          Prices may vary depending on hair length, density, condition, and service complexity. Studio open Mon–Sat; Closed Sundays.
        </p>

        {/* View Full Pricing Action */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onViewFullPricing}
            className="w-full sm:w-auto px-8 py-3.5 border border-[#24201D] text-[#24201D] hover:bg-[#24201D] hover:text-white text-xs uppercase tracking-[0.2em] font-medium transition-all cursor-pointer"
          >
            VIEW FULL PRICING
          </button>
          <button
            onClick={onBookNow}
            className="w-full sm:w-auto px-8 py-3.5 bg-[#24201D] text-white hover:bg-[#38322E] text-xs uppercase tracking-[0.2em] font-medium transition-all cursor-pointer"
          >
            BOOK APPOINTMENT
          </button>
        </div>
      </div>
    </section>
  );
};
