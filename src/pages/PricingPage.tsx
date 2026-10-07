import React, { useEffect, useState } from 'react';
import { SALON_SECTIONS } from '../data/salonData';
import { SalonSection, ServiceCard } from '../types';
import { Info, Calendar, Clock, Layers, ChevronDown, Check, LayoutGrid } from 'lucide-react';
import price from '../assets/images/price.avif';


interface PricingPageProps {
  onOpenBooking: (serviceId?: string) => void;
  targetCardId?: string | null;
}

export const PricingPage: React.FC<PricingPageProps> = ({
  onOpenBooking,
  targetCardId,
}) => {
  const [selectedSection, setSelectedSection] = useState<string>('all');
  const [highlightedCardId, setHighlightedCardId] = useState<string | null>(targetCardId || null);
  const [mobileGridExpanded, setMobileGridExpanded] = useState<boolean>(false);

  // Compute total dynamic services count for any section
  const getSectionServiceCount = (sec: SalonSection) => {
    return sec.cards.reduce((total, card) => total + card.services.length, 0);
  };

  useEffect(() => {
    if (targetCardId) {
      setHighlightedCardId(targetCardId);
      // Auto-set section if needed
      const foundSec = SALON_SECTIONS.find((sec) =>
        sec.cards.some((c) => c.id === targetCardId)
      );
      if (foundSec) {
        setSelectedSection(foundSec.id);
      }

      // Smooth scroll to card
      setTimeout(() => {
        const el = document.getElementById(`pricing-card-${targetCardId}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 150);
    }
  }, [targetCardId]);

  const displayedSections = selectedSection === 'all'
    ? SALON_SECTIONS
    : SALON_SECTIONS.filter((s) => s.id === selectedSection);

  const activeSectionObj = SALON_SECTIONS.find((s) => s.id === selectedSection);

  const handleSelectSection = (id: string) => {
    setSelectedSection(id);
    setHighlightedCardId(null);
    setMobileGridExpanded(false);
    window.scrollTo({ top: 160, behavior: 'smooth' });
  };

  return (
    <div className="pt-20 pb-20 bg-[#F7F3EE]">
      {/* Page Hero - Featuring background stylish hair / beautiful women image over underlying bg-[#EDE5DC]/40 */}
      <section className="relative py-12 sm:py-16 bg-[#EDE5DC]/40 border-b border-[#24201D]/10 text-center overflow-hidden">
        {/* Background stylish hair & beautiful women image (If removed or commented out, underlying bg color displays seamlessly) */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <img
            src={price}
            alt="LUMÉ transparent luxury pricing and artistry"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center opacity-35 mix-blend-multiply scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#EDE5DC]/40 via-transparent to-[#EDE5DC]/80" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
          <span className="text-xs uppercase tracking-[0.25em] text-[#B98272] font-semibold block mb-1">
            COMPREHENSIVE PRICING GUIDE
          </span>
          <h1 className="font-serif font-normal text-3xl sm:text-5xl lg:text-6xl text-[#24201D] tracking-tight mb-2">
            TRANSPARENT SERVICES & PRICES
          </h1>
          <p className="text-xs sm:text-sm text-[#756B63] max-w-2xl mx-auto font-light leading-relaxed">
            All services include bespoke diagnostic consultations, sanitized medical protocols, and complimentary organic botanical refreshments.
          </p>
        </div>
      </section>

      {/* Main Layout: Left-Side Responsive Sticky Section Navigator + Right Cards Pricing */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        {/* Mobile & Tablet (<lg) Responsive Sticky Bar: Always shows all sections in a swipeable / selectable strip */}
        <div className="lg:hidden sticky top-16 sm:top-20 z-30 bg-[#F7F3EE]/95 backdrop-blur-md border border-[#24201D]/15 p-2.5 sm:p-3 shadow-xs mb-6 rounded-xs">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#24201D]/10">
            <div className="flex items-center space-x-1.5">
              <Layers className="w-3.5 h-3.5 text-[#B98272]" />
              <span className="text-[11px] uppercase tracking-wider text-[#24201D] font-semibold">
                {selectedSection === 'all' ? 'All Categories' : activeSectionObj?.name}
              </span>
            </div>

            <button
              type="button"
              onClick={() => setMobileGridExpanded(!mobileGridExpanded)}
              className="px-2.5 py-1 text-[11px] uppercase tracking-wider font-semibold text-[#24201D] border border-[#24201D]/20 hover:border-[#24201D] rounded-xs flex items-center space-x-1 cursor-pointer"
            >
              <LayoutGrid className="w-3 h-3" />
              <span>{mobileGridExpanded ? 'COLLAPSE' : 'ALL CATEGORIES'}</span>
              <ChevronDown className={`w-3 h-3 transition-transform ${mobileGridExpanded ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Full Grid view when expanded */}
          {mobileGridExpanded ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 pt-1 animate-fadeIn max-h-64 overflow-y-auto">
              <button
                type="button"
                onClick={() => handleSelectSection('all')}
                className={`text-left px-2.5 py-2 text-xs uppercase tracking-wider font-semibold rounded-xs transition-colors cursor-pointer flex items-center justify-between ${
                  selectedSection === 'all'
                    ? 'bg-[#24201D] text-white'
                    : 'bg-white text-[#24201D] border border-[#24201D]/10 hover:bg-[#EDE5DC]'
                }`}
              >
                <span>ALL CATEGORIES</span>
                {selectedSection === 'all' && <Check className="w-3 h-3 text-[#B98272]" />}
              </button>

              {SALON_SECTIONS.map((sec) => {
                const count = getSectionServiceCount(sec);
                const isSelected = selectedSection === sec.id;
                return (
                  <button
                    key={sec.id}
                    type="button"
                    onClick={() => handleSelectSection(sec.id)}
                    className={`text-left px-2.5 py-2 text-xs uppercase tracking-wider font-semibold rounded-xs transition-colors cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'bg-[#24201D] text-white'
                        : 'bg-white text-[#24201D] border border-[#24201D]/10 hover:bg-[#EDE5DC]'
                    }`}
                  >
                    <span className="truncate pr-1">{sec.name}</span>
                    <span className={`text-[10px] font-inter px-1.5 py-0.5 rounded-full ${
                      isSelected ? 'bg-[#B98272] text-white' : 'bg-[#EDE5DC] text-[#24201D]'
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          ) : (
            /* Horizontal Scrollable Bar showing every single category directly with count */
            <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar scroll-smooth py-0.5">
              <button
                type="button"
                onClick={() => handleSelectSection('all')}
                className={`shrink-0 px-3 py-1.5 rounded-xs text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer flex items-center space-x-1.5 ${
                  selectedSection === 'all'
                    ? 'bg-[#24201D] text-white shadow-xs'
                    : 'bg-white text-[#24201D] border border-[#24201D]/15 hover:bg-[#EDE5DC]'
                }`}
              >
                <span>ALL CATEGORIES</span>
                {selectedSection === 'all' && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B98272]" />
                )}
              </button>

              {SALON_SECTIONS.map((sec) => {
                const count = getSectionServiceCount(sec);
                const isSelected = selectedSection === sec.id;
                return (
                  <button
                    key={sec.id}
                    type="button"
                    onClick={() => handleSelectSection(sec.id)}
                    className={`shrink-0 px-2.5 py-1.5 rounded-xs text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer flex items-center space-x-1.5 ${
                      isSelected
                        ? 'bg-[#24201D] text-white shadow-xs'
                        : 'bg-white text-[#24201D] border border-[#24201D]/15 hover:bg-[#EDE5DC]'
                    }`}
                  >
                    <span className="whitespace-nowrap">{sec.name}</span>
                    <span className={`text-[10px] font-inter px-1.5 py-0.5 rounded-full font-bold ${
                      isSelected ? 'bg-[#B98272] text-white' : 'bg-[#EDE5DC] text-[#24201D]'
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 items-start">
          {/* Desktop Left Sticky Vertical Sidebar (Shown on Large screens) */}
          <aside className="hidden lg:block w-80 shrink-0 sticky top-24 z-20">
            <div className="bg-white border border-[#24201D]/15 p-4 sm:p-5 shadow-xs rounded-xs">
              <div className="pb-3 mb-3 border-b border-[#24201D]/10 flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#B98272] flex items-center space-x-1.5">
                  <Layers className="w-3.5 h-3.5" />
                  <span>PRICING MENU</span>
                </span>
                <span className="text-[10px] uppercase font-inter text-[#756B63]">
                  {SALON_SECTIONS.length} Sections
                </span>
              </div>

              {/* Vertical list of sections */}
              <nav className="flex flex-col gap-1.5">
                {/* 1. ALL CATEGORIES: Selected by default, NO count number as explicitly instructed */}
                <button
                  type="button"
                  onClick={() => handleSelectSection('all')}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xs text-xs uppercase tracking-wider font-semibold transition-all duration-200 cursor-pointer flex items-center justify-between group ${
                    selectedSection === 'all'
                      ? 'bg-[#24201D] text-white shadow-xs'
                      : 'bg-[#F7F3EE]/80 text-[#24201D] hover:bg-[#EDE5DC]'
                  }`}
                >
                  <span className="font-serif text-sm tracking-normal normal-case font-medium">
                    All Categories
                  </span>
                  {selectedSection === 'all' && (
                    <span className="w-2 h-2 rounded-full bg-[#B98272]" />
                  )}
                </button>

                {/* 2. Specific Sections with Dynamic Service Counts */}
                {SALON_SECTIONS.map((sec) => {
                  const serviceCount = getSectionServiceCount(sec);
                  const isActive = selectedSection === sec.id;

                  return (
                    <button
                      key={sec.id}
                      type="button"
                      onClick={() => handleSelectSection(sec.id)}
                      className={`w-full text-left px-3.5 py-2.5 rounded-xs text-xs uppercase tracking-wider font-semibold transition-all duration-200 cursor-pointer flex items-center justify-between group ${
                        isActive
                          ? 'bg-[#24201D] text-white shadow-xs'
                          : 'bg-[#F7F3EE]/80 text-[#24201D] hover:bg-[#EDE5DC]'
                      }`}
                    >
                      <span className="font-serif text-sm tracking-normal normal-case font-medium">
                        {sec.name}
                      </span>

                      {/* Dynamic count badge */}
                      <span
                        className={`font-inter text-[11px] font-semibold px-2 py-0.5 rounded-full transition-colors ml-2 ${
                          isActive
                            ? 'bg-[#B98272] text-white'
                            : 'bg-white text-[#756B63] group-hover:text-[#24201D] border border-[#24201D]/10'
                        }`}
                      >
                        {serviceCount} {serviceCount === 1 ? 'service' : 'services'}
                      </span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* Right Main Content: Pricing Cards Display */}
          <main className="flex-1 min-w-0 w-full space-y-8">
            {displayedSections.map((sec: SalonSection) => (
              <div key={sec.id} className="space-y-4">
                {/* Section Header */}
                <div className="border-b-2 border-[#24201D]/15 pb-2.5 flex items-end justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#B98272] font-semibold block">
                      CATEGORY
                    </span>
                    <h2 className="font-serif text-2xl sm:text-3xl text-[#24201D]">
                      {sec.name}
                    </h2>
                    <p className="text-xs text-[#756B63] font-light mt-0.5">
                      {sec.tagline}
                    </p>
                  </div>

                  <span className="text-xs font-inter text-[#756B63] bg-[#EDE5DC] px-2.5 py-1 rounded-xs uppercase tracking-wider font-medium">
                    {getSectionServiceCount(sec)} Services
                  </span>
                </div>

                {/* Cards under this section */}
                <div className="space-y-4">
                  {sec.cards.map((card: ServiceCard) => {
                    const isTarget = highlightedCardId === card.id;

                    return (
                      <div
                        key={card.id}
                        id={`pricing-card-${card.id}`}
                        className={`bg-white border transition-all duration-300 p-4 sm:p-6 shadow-xs ${
                          isTarget
                            ? 'border-[#B98272] ring-2 ring-[#B98272]/30 bg-[#F7F3EE]/30'
                            : 'border-[#24201D]/15 hover:border-[#24201D]/30'
                        }`}
                      >
                        {/* Card Title & Description */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3.5 border-b border-[#24201D]/15 gap-2.5">
                          <div>
                            <div className="flex items-center space-x-2">
                              <h3 className="font-serif text-xl sm:text-2xl text-[#24201D]">
                                {card.name}
                              </h3>
                              {isTarget && (
                                <span className="bg-[#B98272] text-white text-[9px] uppercase font-bold px-2 py-0.5 tracking-wider rounded-xs">
                                  Selected Card
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-[#756B63] mt-0.5 font-light">
                              {card.shortDesc}
                            </p>
                          </div>

                          <button
                            type="button"
                            onClick={() => onOpenBooking(card.services[0]?.id || card.id)}
                            className="self-start sm:self-center px-4 py-2 bg-[#24201D] text-white hover:bg-[#38322E] text-xs uppercase tracking-wider font-semibold transition-colors cursor-pointer flex items-center space-x-1.5 shrink-0"
                          >
                            <Calendar className="w-3.5 h-3.5 text-[#EDE5DC]" />
                            <span>BOOK {card.name.toUpperCase()}</span>
                          </button>
                        </div>

                        {/* Service Rows under this Card (No SELECT button, clean display) */}
                        <div className="divide-y divide-[#24201D]/10">
                          {card.services.map((item) => (
                            <div
                              key={item.id}
                              className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-[#F7F3EE]/60 px-2 -mx-2 transition-colors rounded-xs group"
                            >
                              {/* Service Title and duration */}
                              <div className="max-w-md">
                                <h4 className="font-serif text-base text-[#24201D] font-normal group-hover:text-[#B98272] transition-colors">
                                  {item.name}
                                </h4>

                                <div className="flex items-center space-x-2.5 text-xs text-[#756B63] mt-0.5">
                                  <span className="flex items-center space-x-1 font-inter font-medium text-[11px] text-[#756B63]">
                                    <Clock className="w-3 h-3 text-[#B98272]" />
                                    <span>{item.duration}</span>
                                  </span>
                                  {item.note && (
                                    <>
                                      <span>·</span>
                                      <span className="italic font-light text-[11px] text-[#756B63]/90">
                                        {item.note}
                                      </span>
                                    </>
                                  )}
                                </div>
                              </div>

                              {/* Pricing details in bold Inter font */}
                              <div className="flex items-center space-x-3 self-end sm:self-center shrink-0">
                                {item.originalPrice && (
                                  <span className="line-through text-xs sm:text-sm font-inter text-[#756B63]/60 font-normal">
                                    {item.originalPrice}
                                  </span>
                                )}

                                {item.discountBadge && (
                                  <span className="bg-[#6B8E72]/15 text-[#2E5A35] font-inter text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-xs">
                                    {item.discountBadge}
                                  </span>
                                )}

                                <span
                                  className={`font-inter tracking-tight price-number ${
                                    item.discountBadge
                                      ? 'text-lg font-bold text-[#B98272]'
                                      : 'text-base font-semibold text-[#24201D]'
                                  }`}
                                >
                                  {item.price}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Disclaimer */}
            <div className="bg-[#EDE5DC]/40 border border-[#24201D]/10 p-4 flex items-start space-x-3 text-xs text-[#756B63]">
              <Info className="w-4 h-4 text-[#B98272] shrink-0 mt-0.5" />
              <p className="italic font-light leading-relaxed">
                Final pricing may adjust slightly depending on hair density, length, skin patch assessment, and personalized treatment complexity. Transparent estimates are provided prior to starting your service.
              </p>
            </div>

            {/* Bottom Booking CTA */}
            <div className="text-center pt-3">
              <button
                type="button"
                onClick={() => onOpenBooking()}
                className="px-8 py-3 bg-[#24201D] text-white hover:bg-[#38322E] text-xs uppercase tracking-[0.2em] font-medium transition-all cursor-pointer shadow-md"
              >
                BOOK AN APPOINTMENT
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

