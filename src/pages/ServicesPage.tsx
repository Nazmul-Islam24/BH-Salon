import React, { useState } from 'react';
import { ExternalLink, Calendar, Layers, ChevronDown, Check, LayoutGrid } from 'lucide-react';
import { SALON_SECTIONS } from '../data/salonData';
import { SalonSection, ServiceCard } from '../types';

interface ServicesPageProps {
  onOpenBooking: (serviceId?: string) => void;
  onNavigateToPricing: (targetCardId?: string) => void;
  initialSectionId?: string | null;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  onOpenBooking,
  onNavigateToPricing,
  initialSectionId,
}) => {
  // 'all' is selected by default unless an initial section is provided
  const [activeSectionId, setActiveSectionId] = useState<string>(initialSectionId || 'all');
  const [mobileGridExpanded, setMobileGridExpanded] = useState<boolean>(false);

  React.useEffect(() => {
    if (initialSectionId) {
      setActiveSectionId(initialSectionId);
    }
  }, [initialSectionId]);

  // Compute total dynamic services count for any section
  const getSectionServiceCount = (sec: SalonSection) => {
    return sec.cards.reduce((total, card) => total + card.services.length, 0);
  };

  const displayedSections = activeSectionId === 'all'
    ? SALON_SECTIONS
    : SALON_SECTIONS.filter((s) => s.id === activeSectionId);

  const activeSectionObj = SALON_SECTIONS.find((s) => s.id === activeSectionId);

  const handleSelectSection = (id: string) => {
    setActiveSectionId(id);
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
            src="./src/assets/images/ser1.avif"
            alt="LUMÉ bespoke salon hair artistry"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center opacity-50 mix-blend-multiply scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#EDE5DC]/40 via-transparent to-[#EDE5DC]/80" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
          <span className="text-xs uppercase tracking-[0.25em] text-[#B98272] font-semibold block mb-1">
            CURATED MENU & ARTISTRY
          </span>
          <h1 className="font-serif font-normal text-3xl sm:text-5xl lg:text-6xl text-[#24201D] tracking-tight mb-2">
            OUR BESPOKE SERVICES
          </h1>
          <p className="text-xs sm:text-sm text-[#756B63] max-w-2xl mx-auto font-light leading-relaxed">
            Select any category to discover our tailored treatments, master formulations, and beauty offerings.
          </p>
        </div>
      </section>

      {/* Main Layout: Left-Side Responsive Sticky Section Navigator + Right Cards Showcase */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        {/* Mobile & Tablet (<lg) Responsive Sticky Bar: Always shows all sections in a swipeable / selectable strip */}
        <div className="lg:hidden sticky top-16 sm:top-20 z-30 bg-[#F7F3EE]/95 backdrop-blur-md border border-[#24201D]/15 p-2.5 sm:p-3 shadow-xs mb-6 rounded-xs">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#24201D]/10">
            <div className="flex items-center space-x-1.5">
              <Layers className="w-3.5 h-3.5 text-[#B98272]" />
              <span className="text-[11px] uppercase tracking-wider text-[#24201D] font-semibold">
                {activeSectionId === 'all' ? 'All Categories' : activeSectionObj?.name}
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
                  activeSectionId === 'all'
                    ? 'bg-[#24201D] text-white'
                    : 'bg-white text-[#24201D] border border-[#24201D]/10 hover:bg-[#EDE5DC]'
                }`}
              >
                <span>ALL CATEGORIES</span>
                {activeSectionId === 'all' && <Check className="w-3 h-3 text-[#B98272]" />}
              </button>

              {SALON_SECTIONS.map((sec) => {
                const count = getSectionServiceCount(sec);
                const isSelected = activeSectionId === sec.id;
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
                  activeSectionId === 'all'
                    ? 'bg-[#24201D] text-white shadow-xs'
                    : 'bg-white text-[#24201D] border border-[#24201D]/15 hover:bg-[#EDE5DC]'
                }`}
              >
                <span>ALL CATEGORIES</span>
                {activeSectionId === 'all' && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B98272]" />
                )}
              </button>

              {SALON_SECTIONS.map((sec) => {
                const count = getSectionServiceCount(sec);
                const isSelected = activeSectionId === sec.id;
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
                  <span>STUDIO CATEGORIES</span>
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
                    activeSectionId === 'all'
                      ? 'bg-[#24201D] text-white shadow-xs'
                      : 'bg-[#F7F3EE]/80 text-[#24201D] hover:bg-[#EDE5DC]'
                  }`}
                >
                  <span className="font-serif text-sm tracking-normal normal-case font-medium">
                    All Categories
                  </span>
                  {activeSectionId === 'all' && (
                    <span className="w-2 h-2 rounded-full bg-[#B98272]" />
                  )}
                </button>

                {/* 2. Specific Sections with Dynamic Service Counts */}
                {SALON_SECTIONS.map((sec) => {
                  const serviceCount = getSectionServiceCount(sec);
                  const isActive = activeSectionId === sec.id;

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

          {/* Right Main Content: Cards Showcase */}
          <main className="flex-1 min-w-0 w-full space-y-8">
            {displayedSections.map((sec) => (
              <section key={sec.id} id={sec.id} className="scroll-mt-24 space-y-4">
                {/* Section Header */}
                <div className="bg-white/80 border border-[#24201D]/15 p-4 sm:p-5 shadow-xs flex flex-col md:flex-row md:items-end justify-between gap-3">
                  <div>
                    <span className="text-xs uppercase tracking-[0.25em] text-[#B98272] font-semibold block mb-0.5">
                      CATEGORY
                    </span>
                    <h2 className="font-serif text-2xl sm:text-3xl text-[#24201D] tracking-tight">
                      {sec.name}
                    </h2>
                    <p className="text-xs text-[#756B63] font-light mt-0.5 max-w-xl">
                      {sec.tagline}
                    </p>
                  </div>

                  <div className="shrink-0 self-start md:self-end">
                    <span className="bg-[#EDE5DC] text-[#24201D] text-[11px] font-inter font-semibold px-2.5 py-1 rounded-xs tracking-wider uppercase">
                      {getSectionServiceCount(sec)} Services
                    </span>
                  </div>
                </div>

                {/* Cards Grid for this Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                  {sec.cards.map((card: ServiceCard) => (
                    <div
                      key={card.id}
                      id={`service-${card.id}`}
                      className="bg-white border border-[#24201D]/15 flex flex-col justify-between group hover:border-[#24201D]/40 transition-all duration-300 shadow-xs hover:shadow-md"
                    >
                      <div>
                        {/* Card Cover Image */}
                        <div className="aspect-16/10 overflow-hidden bg-[#EDE5DC] relative">
                          <img
                            src={card.image}
                            alt={card.name}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          {card.popular && (
                            <span className="absolute top-3 right-3 bg-[#24201D] text-white text-[10px] uppercase tracking-widest px-2.5 py-1 font-semibold">
                              Signature
                            </span>
                          )}
                          <span className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-xs text-[#24201D] text-[10px] uppercase tracking-widest px-2 py-0.5 font-semibold border border-[#24201D]/10">
                            {card.services.length} Services
                          </span>
                        </div>

                        {/* Card Content Header */}
                        <div className="p-4 sm:p-5">
                          <h3 className="font-serif text-xl sm:text-2xl text-[#24201D] mb-1 group-hover:text-[#B98272] transition-colors">
                            {card.name}
                          </h3>

                          <p className="text-xs text-[#756B63] font-light leading-relaxed mb-3">
                            {card.shortDesc}
                          </p>

                          {/* Services Listed Top-to-Bottom (No internal scrollbar, no numbers, no WHAT IT IS / WHO IT'S FOR) */}
                          <div className="border-t border-[#24201D]/10 pt-3">
                            <span className="text-[11px] uppercase tracking-[0.18em] font-semibold text-[#24201D] block mb-2">
                              SERVICES OFFERED IN THIS CARD:
                            </span>

                            <div className="space-y-1.5">
                              {card.services.map((srv) => (
                                <div
                                  key={srv.id}
                                  className="py-1.5 px-2.5 bg-[#F7F3EE]/80 border border-[#24201D]/5 rounded-xs flex items-center justify-between text-xs hover:bg-[#EDE5DC]/60 transition-colors"
                                >
                                  <div className="flex items-center space-x-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#B98272] shrink-0" />
                                    <span className="font-medium text-[#24201D] text-xs">
                                      {srv.name}
                                    </span>
                                  </div>

                                  <div className="flex items-center space-x-2 shrink-0 font-inter">
                                    <span className="text-[11px] text-[#756B63] font-light">
                                      {srv.duration}
                                    </span>
                                    <span className="text-xs font-semibold text-[#24201D]">
                                      {srv.price}
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Card Footer Actions: Directly jump to this card on Pricing Page, or Book */}
                      <div className="p-4 sm:p-5 pt-0">
                        <div className="pt-3 border-t border-[#24201D]/10 grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {/* 1. Direct pricing page linkup button with layout positioning */}
                          <button
                            type="button"
                            onClick={() => onNavigateToPricing(card.id)}
                            className="w-full py-2.5 px-3 bg-[#EDE5DC]/60 hover:bg-[#24201D] text-[#24201D] hover:text-white border border-[#24201D]/15 text-[11px] uppercase tracking-[0.16em] font-semibold transition-all duration-200 cursor-pointer flex items-center justify-center space-x-1.5 group/btn"
                          >
                            <span>VIEW PRICING & TIMES</span>
                            <ExternalLink className="w-3.5 h-3.5 text-[#B98272] group-hover/btn:text-white transition-colors" />
                          </button>

                          {/* 2. Direct booking for this card's first service */}
                          <button
                            type="button"
                            onClick={() => onOpenBooking(card.services[0]?.id)}
                            className="w-full py-2.5 px-3 bg-[#24201D] hover:bg-[#38322E] text-white text-[11px] uppercase tracking-[0.16em] font-semibold transition-all duration-200 cursor-pointer flex items-center justify-center space-x-1.5 shadow-xs"
                          >
                            <Calendar className="w-3.5 h-3.5 text-[#EDE5DC]" />
                            <span>BOOK THIS SERVICE</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </main>
        </div>
      </div>
    </div>
  );
};

