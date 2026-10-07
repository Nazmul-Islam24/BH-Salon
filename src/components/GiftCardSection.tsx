import React from 'react';
import { Gift, ArrowRight } from 'lucide-react';
import { GiftCardCustomizer } from './GiftCardCustomizer';

interface GiftCardSectionProps {
  onViewGiftCardsPage: () => void;
}

export const GiftCardSection: React.FC<GiftCardSectionProps> = ({
  onViewGiftCardsPage,
}) => {
  return (
    <section className="py-14 sm:py-20 bg-[#EDE5DC]/40 border-t border-[#24201D]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 sm:mb-12 pb-4 border-b border-[#24201D]/10">
          <div>
            <div className="flex items-center space-x-2 text-xs uppercase tracking-[0.25em] text-[#B98272] font-semibold mb-1">
              <Gift className="w-3.5 h-3.5" />
              <span>THE ART OF GIVING</span>
            </div>
            <h2 className="font-serif font-normal text-3xl sm:text-5xl text-[#24201D] tracking-tight">
              GIFT AN UNHURRIED EXPERIENCE
            </h2>
          </div>

          <div className="mt-4 sm:mt-0 flex items-center space-x-3">
            <button
              onClick={onViewGiftCardsPage}
              className="inline-flex items-center space-x-1.5 text-xs uppercase tracking-[0.18em] font-semibold text-[#24201D] hover:text-[#B98272] transition-colors cursor-pointer group"
            >
              <span>EXPLORE GIFT CARDS PAGE</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        {/* Embedded Interactive 3D Gift Card Customizer */}
        <GiftCardCustomizer
          onExploreFullPage={onViewGiftCardsPage}
          showExploreButton={true}
        />
      </div>
    </section>
  );
};

