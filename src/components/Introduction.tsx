import React from 'react';
import { ArrowRight } from 'lucide-react';
import { SALON_INTERIOR } from '../data/salonData';

interface IntroductionProps {
  onDiscoverLume: () => void;
}

export const Introduction: React.FC<IntroductionProps> = ({ onDiscoverLume }) => {
  return (
    <section className="py-14 sm:py-20 bg-[#F7F3EE] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Salon Image */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-4/3 sm:aspect-16/11 overflow-hidden shadow-sm bg-[#EDE5DC]">
              <img
                src={SALON_INTERIOR}
                alt="LUMÉ Hair Studio serene architectural interior with travertine counters"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
            {/* Subtle floating architectural tag */}
            <div className="hidden sm:block absolute -bottom-6 -right-6 bg-[#EDE5DC] p-5 border border-[#24201D]/10 max-w-xs shadow-xs">
              <p className="font-serif italic text-[#24201D] text-sm">
                “A quiet sanctuary engineered to slow time down.”
              </p>
            </div>
          </div>

          {/* Right Column: Editorial Copy */}
          <div className="lg:col-span-6 space-y-6 lg:pl-6">
            <div className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.22em] text-[#B98272] font-semibold">
              <span>PHILOSOPHY & SPACE</span>
            </div>

            <h2 className="font-serif font-normal text-3xl sm:text-5xl text-[#24201D] leading-[1.15] tracking-tight">
              MORE THAN A SALON.<br />
              <span className="italic font-normal">A SPACE TO FEEL LIKE YOURSELF.</span>
            </h2>

            <p className="text-base text-[#756B63] leading-relaxed font-light">
              We founded LUMÉ with a single guiding intention: to strip away the chaos of conventional commercial salons and replace it with an unhurried, mindful experience.
            </p>

            <p className="text-base text-[#756B63] leading-relaxed font-light">
              Every appointment is treated as an intimate collaborative ritual. From bespoke botanical hair diagnostic assessments to customized tonal formulation, our artists design hair that honors your natural texture, lifestyle, and innate beauty.
            </p>

            <div className="pt-4">
              <button
                onClick={onDiscoverLume}
                className="inline-flex items-center space-x-3 text-xs uppercase tracking-[0.2em] font-semibold text-[#24201D] hover:text-[#B98272] group cursor-pointer border-b border-[#24201D] hover:border-[#B98272] pb-1 transition-all"
              >
                <span>DISCOVER LUMÉ</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

