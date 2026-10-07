import React, { useState } from 'react';
import { ArrowRight, Sparkles, X, Check } from 'lucide-react';
import { STYLISTS } from '../data/salonData';
import { Stylist } from '../types';
import homeHero1 from '../assets/images/1home-hero.avif';

interface StylistsPageProps {
  onOpenBooking: (serviceId?: string, stylistId?: string) => void;
  targetStylistId?: string | null;
}

export const StylistsPage: React.FC<StylistsPageProps> = ({
  onOpenBooking,
  targetStylistId,
}) => {
  // Always null initially unless explicitly targeted from navbar dropdown
  const [selectedStylist, setSelectedStylist] = useState<Stylist | null>(null);

  React.useEffect(() => {
    if (targetStylistId) {
      const found = STYLISTS.find((st) => st.id === targetStylistId);
      if (found) {
        setSelectedStylist(found);
      }
    }
  }, [targetStylistId]);

  return (
    <div className="pt-20 pb-20 bg-[#F7F3EE]">
      {/* Page Hero - Featuring background stylish hair / beautiful women image over underlying bg-[#EDE5DC]/40 */}
      <section className="relative py-12 sm:py-16 bg-[#EDE5DC]/40 border-b border-[#24201D]/10 text-center overflow-hidden">
        {/* Background stylish hair & beautiful women image (If removed or commented out, underlying bg color displays seamlessly) */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <img
            src={homeHero1}
            alt="LUMÉ master stylists and creative directors"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center opacity-50 mix-blend-multiply scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#EDE5DC]/40 via-transparent to-[#EDE5DC]/80" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
          <span className="text-xs uppercase tracking-[0.25em] text-[#B98272] font-semibold block mb-1">
            ARTISAN COLLECTIVE
          </span>
          <h1 className="font-serif font-normal text-3xl sm:text-5xl lg:text-6xl text-[#24201D] tracking-tight mb-2">
            OUR MASTER STYLISTS
          </h1>
          <p className="text-xs sm:text-sm text-[#756B63] max-w-xl mx-auto font-light leading-relaxed">
            A collective of European-trained creative directors, dimensional colorists, and hair architects.
          </p>
        </div>
      </section>

      {/* Dynamic Stylists List */}
      <section className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14">
          {STYLISTS.map((stylist) => (
            <div
              key={stylist.id}
              className="bg-white border border-[#24201D]/15 p-6 sm:p-8 flex flex-col justify-between group hover:border-[#24201D]/35 transition-all shadow-xs"
            >
              <div>
                <div className="flex flex-col sm:flex-row gap-6 mb-6">
                  <div className="w-full sm:w-44 aspect-3/4 overflow-hidden bg-[#EDE5DC] shrink-0">
                    <img
                      src={stylist.portrait}
                      alt={stylist.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="space-y-3">
                    <div>
                      <span className="text-xs uppercase tracking-widest text-[#B98272] font-semibold block">
                        {stylist.role}
                      </span>
                      <h3 className="font-serif text-2xl sm:text-3xl text-[#24201D]">
                        {stylist.name}
                      </h3>
                      <span className="text-xs text-[#756B63]">
                        {stylist.experienceYears}+ Years Editorial Experience
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-[#756B63] leading-relaxed font-light">
                      {stylist.bio}
                    </p>
                  </div>
                </div>

                {/* Specialties */}
                <div className="pt-4 border-t border-[#24201D]/10">
                  <span className="text-[11px] uppercase tracking-wider font-semibold text-[#24201D] block mb-2">
                    Specialties:
                  </span>
                  <div className="flex flex-wrap gap-2 text-xs text-[#756B63]">
                    {stylist.specialties.map((spec, i) => (
                      <span key={i} className="bg-[#EDE5DC]/50 px-2.5 py-1 text-[#24201D]">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 mt-6 border-t border-[#24201D]/10 flex items-center gap-3">
                <button
                  onClick={() => setSelectedStylist(stylist)}
                  className="flex-1 py-3 border border-[#24201D]/20 text-[#24201D] hover:border-[#24201D] text-xs uppercase tracking-[0.16em] font-medium transition-colors cursor-pointer text-center"
                >
                  VIEW PROFILE & WORK
                </button>
                <button
                  onClick={() => onOpenBooking(undefined, stylist.id)}
                  className="flex-1 py-3 bg-[#24201D] text-white hover:bg-[#38322E] text-xs uppercase tracking-[0.16em] font-medium transition-colors cursor-pointer text-center"
                >
                  BOOK WITH {stylist.name.split(' ')[0].toUpperCase()}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Individual Stylist Profile Modal (PDF page 14 requirement) */}
      {selectedStylist && (
        <div
          className="fixed inset-0 z-50 bg-[#24201D]/80 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setSelectedStylist(null)}
        >
          <div
            className="bg-[#F7F3EE] max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-10 shadow-2xl border border-[#24201D]/15 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedStylist(null)}
              className="absolute top-4 right-4 w-9 h-9 bg-white/80 hover:bg-white text-[#24201D] rounded-full flex items-center justify-center cursor-pointer shadow-xs"
              aria-label="Close stylist profile"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col sm:flex-row gap-6 mb-8 items-center sm:items-start">
              <div className="w-48 aspect-3/4 overflow-hidden bg-[#EDE5DC] shrink-0 shadow-xs">
                <img
                  src={selectedStylist.portrait}
                  alt={selectedStylist.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <span className="text-xs uppercase tracking-[0.25em] text-[#B98272] font-semibold block mb-1">
                  {selectedStylist.role}
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl text-[#24201D]">
                  {selectedStylist.name}
                </h2>
                <span className="text-xs text-[#756B63] block mt-1">
                  Senior Resident Artist · SoHo Studio
                </span>

                <div className="mt-4 pt-3 border-t border-[#24201D]/10">
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-[#24201D] mb-1">
                    Specialties:
                  </h4>
                  <ul className="text-xs text-[#756B63] space-y-1">
                    {selectedStylist.specialties.map((spec, i) => (
                      <li key={i} className="flex items-center space-x-1.5">
                        <span className="w-1.5 h-1.5 bg-[#B98272] rounded-full" />
                        <span>{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* About Stylist Section */}
            <div className="border-t border-[#24201D]/10 pt-4 mb-6">
              <h4 className="text-xs uppercase tracking-[0.18em] font-semibold text-[#24201D] mb-2">
                ABOUT {selectedStylist.name.toUpperCase()}
              </h4>
              <p className="text-sm text-[#756B63] leading-relaxed font-light">
                {selectedStylist.bio}
              </p>
              <p className="text-sm text-[#756B63] leading-relaxed font-light mt-3">
                “Every haircut and color formula should reflect the wearer’s authentic essence rather than a passing trend. I prioritize hair fiber health, longevity of tone, and effortless at-home styling.”
              </p>
            </div>

            {/* Signature Work */}
            <div className="border-t border-[#24201D]/10 pt-4 mb-8">
              <h4 className="text-xs uppercase tracking-[0.18em] font-semibold text-[#24201D] mb-3">
                SIGNATURE WORK
              </h4>
              <div className="grid grid-cols-2 gap-4">
                {selectedStylist.signatureWork.map((workImg, idx) => (
                  <div key={idx} className="aspect-4/3 overflow-hidden bg-[#EDE5DC]">
                    <img
                      src={workImg}
                      alt={`Signature look ${idx + 1}`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Book with Stylist CTA */}
            <div className="pt-4 border-t border-[#24201D]/10 text-center">
              <button
                onClick={() => {
                  const sId = selectedStylist.id;
                  setSelectedStylist(null);
                  onOpenBooking(undefined, sId);
                }}
                className="w-full py-4 bg-[#24201D] text-white hover:bg-[#38322E] text-xs uppercase tracking-[0.2em] font-medium transition-colors cursor-pointer shadow-md"
              >
                BOOK WITH {selectedStylist.name.toUpperCase()}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

