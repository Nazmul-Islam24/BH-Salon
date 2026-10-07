import React from 'react';
import { Calendar, Phone } from 'lucide-react';
import { SALON_INFO } from '../data/salonData';

interface MobileStickyBarProps {
  onOpenBooking: () => void;
}

export const MobileStickyBar: React.FC<MobileStickyBarProps> = ({ onOpenBooking }) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-[#F7F3EE]/95 backdrop-blur-md border-t border-[#24201D]/10 px-4 py-2.5 shadow-lg">
      <div className="flex items-center gap-2 max-w-md mx-auto">
        <button
          onClick={onOpenBooking}
          className="flex-1 py-3 px-3 bg-[#24201D] text-white text-xs uppercase tracking-[0.16em] font-medium flex items-center justify-center space-x-1.5 active:scale-[0.98] transition-transform"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>BOOK APPOINTMENT</span>
        </button>
        <a
          href={`tel:${SALON_INFO.phone}`}
          className="py-3 px-4 border border-[#24201D]/20 bg-white/60 text-[#24201D] text-xs uppercase tracking-[0.16em] font-medium flex items-center justify-center space-x-1.5 active:scale-[0.98]"
          aria-label="Call salon directly"
        >
          <Phone className="w-3.5 h-3.5 text-[#B98272]" />
          <span>CALL</span>
        </a>
      </div>
    </div>
  );
};

