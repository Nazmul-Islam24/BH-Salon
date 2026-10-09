import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { HERO_IMAGE } from '../data/salonData';

interface HeroProps {
  onOpenBooking: () => void;
  onExploreWork: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onExploreWork }) => {
  return (
    <section className="relative min-h-[92vh] sm:min-h-screen flex items-center justify-start overflow-hidden bg-[#24201D] text-[#F7F3EE]">
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0">
        <img
          src={HERO_IMAGE}
          alt="LUMÉ Hair Studio model with radiant natural textured waves"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center sm:object-right-top transition-transform duration-1000 scale-[1.02]"
        />
        {/* Editorial Gradients & Scrim for perfect legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#24201D]/90 via-[#24201D]/60 to-transparent sm:w-3/5" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#24201D] via-transparent to-black/30" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 w-full">
        <div className="max-w-2xl">
          {/* Subtle Editorial Kicker */}
          <div className="flex items-center space-x-2.5 text-xs tracking-[0.25em] uppercase text-[#EDE5DC]/80 mb-4 sm:mb-6">
            <span className="w-6 h-[1px] bg-[#B98272]" />
            <span>FEMALE HAIR ARTISTRY · SOHO, NY</span>
          </div>

          {/* Main Title */}
          <h1 className="font-serif font-normal text-5xl sm:text-7xl lg:text-8xl tracking-tight leading-[1.05] text-[#F7F3EE] mb-6 drop-shadow-xs">
            BEAUTY,<br />
            <span className="italic font-normal text-[#EDE5DC]">REFINED.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-[#EDE5DC]/90 max-w-lg mb-8 sm:mb-10 font-light leading-relaxed">
            Hair artistry designed around you. Bespoke balayage, precision cuts, and restorative rituals curated in an editorial sanctuary.
          </p>

          {/* Two Buttons Only per PDF */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <button
              onClick={onOpenBooking}
              className="px-8 py-4 bg-[#EDE5DC] hover:bg-white text-[#24201D] text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-200 cursor-pointer shadow-sm text-center"
            >
              BOOK AN APPOINTMENT
            </button>
            <button
              onClick={onExploreWork}
              className="px-8 py-4 border border-[#EDE5DC]/30 hover:border-[#EDE5DC] hover:bg-[#EDE5DC]/10 text-[#EDE5DC] text-xs uppercase tracking-[0.2em] font-medium transition-all duration-200 flex items-center justify-center space-x-2 group cursor-pointer"
            >
              <span>EXPLORE OUR WORK</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

