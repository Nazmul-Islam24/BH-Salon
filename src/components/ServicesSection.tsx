import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { ALL_SUB_SERVICES, HERO_IMAGE, BALAYAGE_DETAIL, HAIR_TREATMENT_LOOK } from '../data/salonData';
import { ServiceItem } from '../types';

interface ServicesSectionProps {
  onViewAllServices: () => void;
  onSelectService: (service: ServiceItem) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onViewAllServices,
  onSelectService,
}) => {
  const [hoveredService, setHoveredService] = useState<{ id: string; name: string; price: string; cardName: string; image?: string } | null>(null);

  // Exactly 14 curated, highly popular and essential salon services (without numbering as requested)
  const signatureServices = [
    { id: 'tb-eyebrows', name: 'Precision Eyebrow Threading', category: 'Threading & Brows', cardName: 'Facial Hair Removal', price: 'From $15', duration: '15 min', image: './src/assets/images/facial-hair-removal.avif', desc: 'Antibacterial organic twisted cotton hair removal for clean brow definition.' },

    { id: 'tb-brow-lamination-wax', name: 'Brow Lamination, Tint & Wax', category: 'Threading & Brows', cardName: 'Tinting & Lamination', price: 'From $75', duration: '45 min', image: './src/assets/images/tinting-lamination2.avif', desc: 'Feathered architectural brow redirection with custom vegetable tint.' },

    { id: 'h-wash-cut-blowdry', name: 'Wash, Cut & Blow-Dry', category: 'Hair', cardName: 'Cut & Finish', price: 'From $85', duration: '1 hr', image: './src/assets/images/cut-finish.avif', desc: 'Tailored architectural sectioning, botanical wash ritual, and thermal blowout.' },

    { id: 'h-restyle', name: 'Signature Hair Restyle', category: 'Hair', cardName: 'Cut & Finish', price: 'From $95', duration: '1 hr 15 min', image: './src/assets/images/2home-hero.avif', desc: 'Complete structural silhouette transformation tailored to facial anatomy.' },

    { id: 'h-wash-blowdry', name: 'Artisan Thermal Blowout', category: 'Hair', cardName: 'Blow-Dry & Styling', price: 'From $50', duration: '45 min', image: './src/assets/images/blow-dry-styling.avif', desc: 'Round ceramic brush sculpt creating long-lasting voluminous bounce.' },

    { id: 'h-brazilian-blowdry', name: 'Brazilian Blow-Dry Keratin', category: 'Hair', cardName: 'Hair Treatments', price: '$220', originalPrice: '$245', discountBadge: 'Save up to 10%', duration: '2 hr', image: './src/assets/images/Brazilian-Blow-Dry-Keratin.avif', desc: 'Deep keratin alignment eliminating frizz and infusing liquid glass shine.' },

    { id: 'h-hair-botox', name: 'Restorative Hair Botox', category: 'Hair', cardName: 'Hair Treatments', price: 'From $160', duration: '1 hr 30 min', image: './src/assets/images/Restorative-Hair-Botox.avif', desc: 'Intensive collagen and amino acid filler restoring damaged hair elasticity.' },

    { id: 'c-full-head-balayage', name: 'French Dimensional Balayage', category: 'Color', cardName: 'Colour', price: '$240', originalPrice: '$265', discountBadge: 'Save up to 10%', duration: '3 hr', image: './src/assets/images/French-Dimensional-Balayage.avif', desc: 'Freehand hand-painted sunlight ribbons with custom toner and bond sealant.' },

    { id: 'c-half-head-highlights', name: 'Half Head Dimensional Highlights', category: 'Color', cardName: 'Colour', price: 'From $110', duration: '1 hr 30 min', image: './src/assets/images/Half-Head-Dimensional-Highlights.avif', desc: 'Multi-tonal fine baby-lights framing the crown and face.' },

    { id: 'c-roots', name: 'Single Process Root Refresh', category: 'Color', cardName: 'Roots', price: 'From $55', duration: '1 hr', image: './src/assets/images/Single-Process-Root-Refresh.avif', desc: 'Precision color continuity and 100% gentle grey concealment.' },

    { id: 'fs-deep-cleansing', name: 'Dermalogica Deep Cleansing Facial', category: 'Facials & Skins', cardName: 'Dermalogica Facials', price: 'From $75', duration: '1 hr', image: './src/assets/images/Dermalogica-Deep-Cleansing-Facial.avif', desc: 'Botanical enzymatic exfoliation, gentle extraction, and barrier recovery masque.' },

    { id: 'fs-microdermabrasion', name: 'Crystal Clear Microdermabrasion', category: 'Facials & Skins', cardName: 'Crystal Clear Facials', price: 'From $70', duration: '45 min', image: './src/assets/images/Crystal-Clear-Microdermabrasion.avif', desc: 'Diamond-tip resurfacing sweeping away dull dead cells for glass skin.' },

    { id: 'w-full-body', name: 'Complete Full Body Waxing', category: 'Waxing', cardName: 'Body Waxing', price: '$145', originalPrice: '$160', discountBadge: 'Save up to 10%', duration: '1 hr 45 min', image: './src/assets/images/intimate-waxing.avif', desc: 'Gentle temperature-controlled azulene wax providing weeks of bare smoothness.' },

    { id: 'ls-lash-lift', name: 'Keratin Lash Lift & Tint', category: 'Lashes', cardName: 'Lashes', price: 'From $55', duration: '45 min', image: './src/assets/images/lashes.avif', desc: 'Upward lash curl enhancement with deep carbon-black tint for 8-week definition.' },
  ];

  return (
    <section className="py-14 sm:py-20 bg-[#EDE5DC]/40 border-t border-[#24201D]/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 pb-5 border-b border-[#24201D]/10">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#B98272] font-semibold block mb-1">
              CURATED OFFERINGS
            </span>
            <h2 className="font-serif font-normal text-3xl sm:text-5xl text-[#24201D] tracking-tight">
              OUR SERVICES
            </h2>
          </div>
          <p className="text-xs uppercase tracking-[0.18em] text-[#756B63] mt-3 md:mt-0 font-medium">
            ARTISTRY · ELEVATION · INTEGRITY
          </p>
        </div>

        {/* 14 Essential Services List (Numbering removed as requested) */}
        <div className="relative">
          <div className="divide-y divide-[#24201D]/15">
            {signatureServices.map((service) => {
              const isHovered = hoveredService?.id === service.id;

              return (
                <div
                  key={service.id}
                  onMouseEnter={() => setHoveredService(service)}
                  onMouseLeave={() => setHoveredService(null)}
                  onClick={() =>
                    onSelectService({
                      id: service.id,
                      name: service.name,
                      category: service.category,
                      shortDesc: service.desc,
                      priceFrom: service.price,
                      duration: service.duration,
                      image: service.image,
                      whatItIs: service.desc,
                      whoItsFor: 'Clients seeking exceptional bespoke care.',
                    })
                  }
                  className={`group relative py-5 sm:py-6 transition-colors duration-200 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                    isHovered ? 'bg-[#F7F3EE]/90 px-4 -mx-4 rounded-xs' : ''
                  }`}
                >
                  {/* Left: Title + Category Pill + Subtitle (NO number count as requested) */}
                  <div className="flex items-baseline space-x-4">
                    <span className="w-2 h-2 rounded-full bg-[#B98272] shrink-0 mt-1 self-center" />
                    <div>
                      <div className="flex items-center space-x-2.5 flex-wrap">
                        <h3 className="font-serif text-xl sm:text-2xl lg:text-3xl text-[#24201D] group-hover:text-[#B98272] transition-colors">
                          {service.name}
                        </h3>
                        <span className="bg-[#EDE5DC] text-[#24201D] text-[9px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-xs">
                          {service.cardName}
                        </span>
                        {service.discountBadge && (
                          <span className="bg-[#6B8E72]/15 text-[#3F6647] font-inter text-[9px] uppercase font-semibold px-1.5 py-0.5 rounded-xs">
                            {service.discountBadge}
                          </span>
                        )}
                      </div>
                      <p className="text-xs sm:text-sm text-[#756B63] font-light mt-0.5">
                        {service.desc}
                      </p>
                    </div>
                  </div>

                  {/* Right: Duration + Price + Arrow */}
                  <div className="flex items-center justify-between md:justify-end space-x-6 pl-6 md:pl-0 shrink-0">
                    <div className="text-right">
                      <div className="flex items-center justify-end space-x-2">
                        {service.originalPrice && (
                          <span className="line-through text-xs font-inter text-[#756B63]/60">
                            {service.originalPrice}
                          </span>
                        )}
                        <span className="font-inter text-sm sm:text-base font-bold text-[#24201D] price-number">
                          {service.price}
                        </span>
                      </div>
                      <span className="text-[11px] font-inter text-[#756B63]/80">
                        {service.duration}
                      </span>
                    </div>

                    <div className="w-9 h-9 rounded-full border border-[#24201D]/20 flex items-center justify-center text-[#24201D] group-hover:border-[#24201D] group-hover:bg-[#24201D] group-hover:text-white transition-all duration-300">
                      <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Desktop Floating Image Preview on Hover */}
          {hoveredService && (
            <div className="hidden lg:block pointer-events-none fixed right-16 top-1/2 -translate-y-1/2 z-30 w-72 h-80 rounded-sm overflow-hidden shadow-2xl border-2 border-[#F7F3EE] transition-all duration-300 animate-fadeIn">
              <img
                src={hoveredService.image || HERO_IMAGE}
                alt={hoveredService.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent flex flex-col justify-end p-4 text-white">
                <span className="text-[10px] uppercase tracking-widest text-[#EDE5DC]">
                  {hoveredService.cardName}
                </span>
                <span className="font-serif text-lg font-medium">
                  {hoveredService.name}
                </span>
                <span className="text-xs text-[#EDE5DC]/90 mt-0.5 font-inter">
                  Investment: <strong className="font-inter font-semibold">{hoveredService.price}</strong>
                </span>
              </div>
            </div>
          )}
        </div>

        {/* View All Services CTA Button */}
        <div className="mt-14 sm:mt-16 text-center">
          <button
            onClick={onViewAllServices}
            className="px-9 py-4 border border-[#24201D] text-[#24201D] hover:bg-[#24201D] hover:text-white text-xs uppercase tracking-[0.2em] font-medium transition-all duration-200 cursor-pointer shadow-xs active:scale-[0.99]"
          >
            VIEW ALL SERVICES
          </button>
        </div>
      </div>
    </section>
  );
};

