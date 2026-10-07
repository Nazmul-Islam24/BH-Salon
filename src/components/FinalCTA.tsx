import React from 'react';
import { Calendar } from 'lucide-react';

interface FinalCTAProps {
  onOpenBooking: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onOpenBooking }) => {
  return (
    <section className="bg-[#24201D] text-white py-16 sm:py-24 relative overflow-hidden">
      {/* Subtle organic radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#B98272]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
        <span className="text-xs uppercase tracking-[0.3em] text-[#EDE5DC]/70 block mb-4">
          YOUR APPOINTMENT AWAITS
        </span>

        <h2 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-white mb-6">
          READY FOR YOUR NEXT LOOK?
        </h2>

        <p className="font-serif italic text-xl sm:text-2xl text-[#EDE5DC]/80 font-light mb-10 max-w-xl mx-auto">
          Let’s create something that feels like you.
        </p>

        <button
          onClick={onOpenBooking}
          className="inline-flex items-center space-x-3 px-10 py-4 bg-[#EDE5DC] hover:bg-white text-[#24201D] text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-200 cursor-pointer shadow-lg active:scale-95"
        >
          <Calendar className="w-4 h-4 text-[#24201D]" />
          <span>BOOK AN APPOINTMENT</span>
        </button>
      </div>
    </section>
  );
};

