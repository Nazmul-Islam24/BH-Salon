import React from 'react';
import { ArrowRight } from 'lucide-react';
import { STYLISTS } from '../data/salonData';
import { Stylist } from '../types';

interface StylistsSectionProps {
  onSelectStylist: (stylist: Stylist) => void;
  onViewAllStylists: () => void;
}

export const StylistsSection: React.FC<StylistsSectionProps> = ({
  onSelectStylist,
  onViewAllStylists,
}) => {
  // Only first 4 stylists on Home page as explicitly requested
  const homeStylists = STYLISTS.slice(0, 4);

  return (
    <section className="py-14 sm:py-20 bg-[#EDE5DC]/30 border-t border-[#24201D]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 sm:mb-12 pb-4 border-b border-[#24201D]/10">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#B98272] font-semibold block mb-1">
              OUR TEAM
            </span>
            <h2 className="font-serif font-normal text-3xl sm:text-5xl text-[#24201D] tracking-tight">
              MEET THE ARTISTS
            </h2>
          </div>
          <button
            onClick={onViewAllStylists}
            className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] font-medium text-[#24201D] hover:text-[#B98272] transition-colors mt-3 sm:mt-0 cursor-pointer"
          >
            <span>VIEW ALL STYLISTS</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* First 4 Stylists Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {homeStylists.map((stylist) => (
            <div
              key={stylist.id}
              className="group flex flex-col bg-white/60 p-4 border border-[#24201D]/10 hover:border-[#24201D]/30 transition-all duration-300"
            >
              {/* Portrait */}
              <div className="aspect-3/4 overflow-hidden bg-[#EDE5DC] mb-4">
                <img
                  src={stylist.portrait}
                  alt={`${stylist.name} - ${stylist.role}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover grayscale-25 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                />
              </div>

              {/* Info */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl text-[#24201D] tracking-tight group-hover:text-[#B98272] transition-colors">
                    {stylist.name}
                  </h3>
                  <p className="text-xs uppercase tracking-[0.16em] text-[#756B63] mt-1 font-medium">
                    {stylist.role}
                  </p>
                  <p className="text-xs text-[#756B63] mt-1.5 line-clamp-2 font-light">
                    {stylist.bio}
                  </p>
                </div>

                <div className="pt-4 mt-3 border-t border-[#24201D]/10">
                  <button
                    onClick={onViewAllStylists}
                    className="w-full py-2 text-center text-xs uppercase tracking-[0.18em] font-medium text-[#24201D] border border-[#24201D]/20 hover:border-[#24201D] hover:bg-[#24201D] hover:text-white transition-all cursor-pointer"
                  >
                    VIEW ALL STYLISTS →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

