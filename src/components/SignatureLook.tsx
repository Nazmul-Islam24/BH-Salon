import React from 'react';
import { ArrowRight } from 'lucide-react';
import { BALAYAGE_DETAIL } from '../data/salonData';

interface SignatureLookProps {
  onExploreLookbook: () => void;
}

export const SignatureLook: React.FC<SignatureLookProps> = ({ onExploreLookbook }) => {
  return (
    <section className="relative min-h-[58vh] sm:min-h-[66vh] flex items-center justify-center overflow-hidden bg-[#24201D] text-[#F7F3EE]">
      {/* Huge Background Image with editorial overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={BALAYAGE_DETAIL}
          alt="The LUMÉ Signature soft texture and natural movement"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center scale-[1.03] transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-[#24201D]/75 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#24201D] via-transparent to-[#24201D]/60" />
      </div>

      {/* Centered Editorial Highlight Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center py-16 sm:py-24">
        <span className="text-xs uppercase tracking-[0.3em] text-[#EDE5DC]/80 block mb-4">
          EDITORIAL HIGHLIGHT
        </span>

        <h2 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal text-white tracking-tight mb-8">
          THE LUMÉ SIGNATURE
        </h2>

        <div className="space-y-2 mb-10 max-w-md mx-auto">
          <p className="font-serif italic text-2xl sm:text-3xl text-[#EDE5DC]/90">
            Soft texture.
          </p>
          <p className="font-serif italic text-2xl sm:text-3xl text-[#EDE5DC]/90">
            Natural movement.
          </p>
          <p className="font-serif italic text-2xl sm:text-3xl text-[#EDE5DC]">
            Effortless elegance.
          </p>
        </div>

        <button
          onClick={onExploreLookbook}
          className="inline-flex items-center space-x-3 px-8 py-4 bg-[#EDE5DC] hover:bg-white text-[#24201D] text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-200 cursor-pointer shadow-lg active:scale-95"
        >
          <span>EXPLORE THE LOOKBOOK</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};

