import React, { useState } from 'react';
import { Eye, ArrowRight, X, Calendar } from 'lucide-react';
import { LOOKBOOK } from '../data/salonData';
import { LookbookItem } from '../types';

interface GallerySectionProps {
  onViewAllLooks: () => void;
  onBookService: (serviceId?: string) => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({
  onViewAllLooks,
  onBookService,
}) => {
  const [selectedLook, setSelectedLook] = useState<LookbookItem | null>(null);

  // Exactly 6 top essential, highly legible and regular salon transformations for Home page
  const homeGalleryItems = LOOKBOOK.slice(0, 6);

  return (
    <section className="py-14 sm:py-20 bg-[#F7F3EE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-5 border-b border-[#24201D]/10">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#B98272] font-semibold block mb-1">
              VISUAL PORTFOLIO
            </span>
            <h2 className="font-serif font-normal text-3xl sm:text-5xl text-[#24201D] tracking-tight">
              OUR GALLERY & STYLE
            </h2>
            <p className="text-sm text-[#756B63] mt-2 font-light">
              Signature client transformations crafted at our SoHo sanctuary.
            </p>
          </div>

          <button
            onClick={onViewAllLooks}
            className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] font-medium text-[#24201D] hover:text-[#B98272] transition-colors mt-4 sm:mt-0 cursor-pointer"
          >
            <span>EXPLORE FULL GALLERY ARCHIVE</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 6 Curated Showcase Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {homeGalleryItems.map((look) => (
            <div
              key={look.id}
              onClick={() => setSelectedLook(look)}
              className="group relative cursor-pointer overflow-hidden bg-[#EDE5DC] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div className="aspect-4/5 overflow-hidden relative">
                <img
                  src={look.image}
                  alt={look.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Category tag */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="bg-[#24201D]/80 backdrop-blur-xs text-white text-[10px] uppercase tracking-widest px-2.5 py-1 font-medium">
                    {look.category}
                  </span>
                </div>

                {/* Dark Hover Reveal Overlay */}
                <div className="absolute inset-0 bg-[#24201D]/80 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6 text-white z-20">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#B98272] font-semibold block mb-1">
                      {look.category}
                    </span>
                    <h3 className="font-serif text-2xl text-white">
                      {look.title}
                    </h3>
                    <p className="text-xs text-[#EDE5DC]/80 font-light mt-2 line-clamp-3 leading-relaxed">
                      {look.description}
                    </p>
                  </div>

                  <div className="border-t border-white/20 pt-4 flex items-center justify-between text-xs text-[#EDE5DC]">
                    <span className="uppercase tracking-wider font-semibold">VIEW GALLERY ARCHIVE</span>
                    <ArrowRight className="w-4 h-4 text-[#B98272]" />
                  </div>
                </div>
              </div>

              {/* Bottom Card Title and Artist */}
              <div className="p-4 bg-white border-t border-[#24201D]/10 flex items-center justify-between">
                <div>
                  <h4 className="font-serif text-lg text-[#24201D] group-hover:text-[#B98272] transition-colors">
                    {look.title}
                  </h4>
                  <span className="text-[11px] text-[#756B63] font-light">
                    Artist: {look.stylistName}
                  </span>
                </div>

                <div className="w-7 h-7 rounded-full border border-[#24201D]/20 flex items-center justify-center text-[#24201D] group-hover:bg-[#24201D] group-hover:text-white transition-colors">
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for Quick Look Detail */}
        {selectedLook && (
          <div
            className="fixed inset-0 z-50 bg-[#24201D]/80 backdrop-blur-xs flex items-center justify-center p-4"
            onClick={() => setSelectedLook(null)}
          >
            <div
              className="bg-[#F7F3EE] max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-[#24201D]/15 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedLook(null)}
                className="absolute top-4 right-4 w-9 h-9 bg-white/80 hover:bg-white text-[#24201D] rounded-full flex items-center justify-center cursor-pointer shadow-xs z-10"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="aspect-16/10 overflow-hidden bg-[#EDE5DC] mb-5">
                <img
                  src={selectedLook.image}
                  alt={selectedLook.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-4">
                <div>
                  <span className="text-xs uppercase tracking-[0.2em] text-[#B98272] font-semibold block mb-1">
                    {selectedLook.category}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#24201D]">
                    {selectedLook.title}
                  </h3>
                  <span className="text-xs text-[#756B63] block mt-1">
                    Crafted by {selectedLook.stylistName}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#756B63] font-light leading-relaxed">
                  {selectedLook.description}
                </p>

                <div className="pt-4 border-t border-[#24201D]/10 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => {
                      const sid = selectedLook.serviceId;
                      setSelectedLook(null);
                      onBookService(sid);
                    }}
                    className="flex-1 py-3 bg-[#24201D] text-white hover:bg-[#38322E] text-xs uppercase tracking-[0.2em] font-semibold transition-colors cursor-pointer text-center"
                  >
                    BOOK THIS SERVICE
                  </button>

                  <button
                    onClick={() => {
                      setSelectedLook(null);
                      onViewAllLooks();
                    }}
                    className="flex-1 py-3 border border-[#24201D] text-[#24201D] hover:bg-[#24201D] hover:text-white text-xs uppercase tracking-[0.2em] font-semibold transition-colors cursor-pointer text-center"
                  >
                    VIEW ALL GALLERY
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

