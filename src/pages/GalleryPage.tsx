import React, { useState } from 'react';
import { Eye, X, SlidersHorizontal, ChevronRight, ChevronLeft, Calendar, ArrowRight, Sparkles } from 'lucide-react';
import { LOOKBOOK } from '../data/salonData';
import { LookbookItem } from '../types';

interface GalleryPageProps {
  onOpenBooking: (serviceId?: string) => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({ onOpenBooking }) => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedItem, setSelectedItem] = useState<LookbookItem | null>(null);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);

  // Before/After slider state (0 to 100%)
  const [sliderPosition, setSliderPosition] = useState(50);

  const categories = [
    'All',
    'THREADING & BROWS',
    'HAIR',
    'COLOR',
    'FACIALS & SKINS',
    'WAXING',
    'MASSAGE & BODY',
    'LASER',
    'LASHES',
    'MAKE-UP & MEHNDY',
  ];

  const filteredItems = activeFilter === 'All'
    ? LOOKBOOK
    : LOOKBOOK.filter((item) => item.category === activeFilter);

  // An item with before/after comparison
  const transformationItem = LOOKBOOK.find((item) => item.beforeImage && item.afterImage) || LOOKBOOK[0];

  const handleOpenItem = (item: LookbookItem) => {
    setSelectedItem(item);
    setActiveGalleryIndex(0);
  };

  return (
    <div className="pt-20 pb-20 bg-[#F7F3EE]">
      {/* Page Hero - Featuring background stylish hair / beautiful women image over underlying bg-[#EDE5DC]/40 */}
      <section className="relative py-12 sm:py-16 bg-[#EDE5DC]/40 border-b border-[#24201D]/10 text-center overflow-hidden">
        {/* Background stylish hair & beautiful women image (If removed or commented out, underlying bg color displays seamlessly) */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <img
            src="./src/assets/images/gallery.avif"
            alt="LUMÉ visual portfolio and transformations"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center opacity-40 mix-blend-multiply scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#EDE5DC]/40 via-transparent to-[#EDE5DC]/80" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
          <span className="text-xs uppercase tracking-[0.25em] text-[#B98272] font-semibold block mb-1">
            PORTFOLIO ARCHIVE
          </span>
          <h1 className="font-serif font-normal text-3xl sm:text-5xl lg:text-6xl text-[#24201D] tracking-tight mb-2">
            THE GALLERY & LOOKBOOK
          </h1>
          <p className="text-xs sm:text-sm text-[#756B63] max-w-2xl mx-auto font-light leading-relaxed">
            Explore dedicated visual portfolios for each studio service. Click any showcase card to view the complete photo archive and transformations.
          </p>
        </div>
      </section>

      {/* Interactive Before / After Section */}
      <section className="py-14 sm:py-20 max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <span className="text-xs uppercase tracking-[0.2em] text-[#B98272] font-semibold block mb-1">
            INTERACTIVE TRANSFORMATION
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl text-[#24201D]">
            Before & After Comparison
          </h2>
          <p className="text-xs text-[#756B63] mt-1 font-light">
            Slide the divider to reveal the multidimensional French balayage transformation.
          </p>
        </div>

        <div className="relative aspect-16/10 sm:aspect-21/11 overflow-hidden bg-[#24201D] border border-[#24201D]/20 shadow-md select-none">
          {/* After Image (Background) */}
          <img
            src={transformationItem.afterImage || transformationItem.image}
            alt="After transformation"
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4 bg-[#24201D]/80 text-white text-[11px] uppercase tracking-widest px-3 py-1 font-medium z-10 pointer-events-none">
            After
          </div>

          {/* Before Image (Clipped Left Layer) */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ width: `${sliderPosition}%` }}
          >
            <img
              src={transformationItem.beforeImage || transformationItem.image}
              alt="Before transformation"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover max-w-none"
              style={{ width: '100%', minWidth: '100%' }}
            />
            <div className="absolute top-4 left-4 bg-[#24201D]/80 text-white text-[11px] uppercase tracking-widest px-3 py-1 font-medium z-10 pointer-events-none">
              Before
            </div>
          </div>

          {/* Draggable Divider Handle */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-20"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#24201D] text-white flex items-center justify-center shadow-lg border border-white">
              <SlidersHorizontal className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Range input overlay for smooth scrub */}
          <input
            type="range"
            min="0"
            max="100"
            value={sliderPosition}
            onChange={(e) => setSliderPosition(Number(e.target.value))}
            className="absolute inset-0 opacity-0 cursor-ew-resize z-30 w-full h-full"
            aria-label="Before after slider"
          />
        </div>
      </section>

      {/* Main Filterable Gallery Grid */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Filter Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mb-14">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer rounded-xs border ${
                activeFilter === cat
                  ? 'bg-[#24201D] text-white border-[#24201D] shadow-xs'
                  : 'bg-white/80 text-[#756B63] hover:text-[#24201D] hover:bg-white border-[#24201D]/15'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Cards Grid (One for every service card type as requested) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => handleOpenItem(item)}
              className="group relative bg-white border border-[#24201D]/15 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              {/* Image with dynamic hover overlay */}
              <div className="aspect-4/5 overflow-hidden bg-[#EDE5DC] relative">
                <img
                  src={item.image}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Subtle Category Pill on Image */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="bg-[#24201D]/80 backdrop-blur-xs text-white text-[10px] uppercase tracking-widest px-2.5 py-1 font-medium">
                    {item.category}
                  </span>
                </div>

                {/* Dark Hover Reveal Overlay */}
                <div className="absolute inset-0 bg-[#24201D]/85 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6 text-white z-20">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#B98272] font-semibold block mb-1">
                      {item.category}
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl text-white">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#EDE5DC]/80 font-light mt-2 line-clamp-3 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Prominent instruction text requested by user */}
                  <div className="border-t border-white/20 pt-4">
                    <span className="text-xs uppercase tracking-[0.16em] font-semibold text-[#EDE5DC] group-hover:text-white flex items-center justify-between">
                      <span>VIEW ALL GALLERY IN THIS SERVICE TYPE</span>
                      <ArrowRight className="w-4 h-4 text-[#B98272]" />
                    </span>
                    <span className="text-[10px] text-[#EDE5DC]/70 block mt-1 font-light">
                      Click to inspect multiple showcase photos & transformations
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Card Title and Action Bar (Always visible) */}
              <div className="p-5 border-t border-[#24201D]/10 bg-white flex items-center justify-between">
                <div>
                  <h4 className="font-serif text-xl text-[#24201D] group-hover:text-[#B98272] transition-colors">
                    {item.title}
                  </h4>
                  <span className="text-[11px] text-[#756B63] font-light">
                    Artist: {item.stylistName}
                  </span>
                </div>

                <div className="w-8 h-8 rounded-full border border-[#24201D]/20 flex items-center justify-center text-[#24201D] group-hover:bg-[#24201D] group-hover:text-white transition-all">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Nested Deep Gallery Modal (Opens on Click with multiple photos) */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 bg-[#24201D]/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="bg-[#F7F3EE] max-w-4xl w-full my-6 p-6 sm:p-8 shadow-2xl border border-[#24201D]/20 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Close Button */}
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 w-9 h-9 bg-white/90 hover:bg-white text-[#24201D] rounded-full flex items-center justify-center cursor-pointer shadow-xs z-20"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header info */}
            <div className="mb-6 pr-10">
              <span className="text-xs uppercase tracking-[0.25em] text-[#B98272] font-semibold block mb-1">
                {selectedItem.category} · PHOTO ARCHIVE
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#24201D]">
                {selectedItem.title} Showcase
              </h2>
              <p className="text-xs sm:text-sm text-[#756B63] font-light mt-1">
                {selectedItem.description}
              </p>
            </div>

            {/* Main Featured Photo Display with Slideshow Controls */}
            {(() => {
              const galleryList = selectedItem.galleryImages && selectedItem.galleryImages.length > 0
                ? selectedItem.galleryImages
                : [selectedItem.image];
              const currentPhoto = galleryList[activeGalleryIndex] || galleryList[0];

              return (
                <div className="space-y-4">
                  <div className="relative aspect-16/10 sm:aspect-16/9 bg-[#24201D] overflow-hidden shadow-md">
                    <img
                      src={currentPhoto}
                      alt={`${selectedItem.title} view ${activeGalleryIndex + 1}`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-all duration-300"
                    />

                    {/* Previous / Next Arrows */}
                    {galleryList.length > 1 && (
                      <>
                        <button
                          type="button"
                          onClick={() =>
                            setActiveGalleryIndex(
                              (activeGalleryIndex - 1 + galleryList.length) % galleryList.length
                            )
                          }
                          className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black text-white rounded-full flex items-center justify-center cursor-pointer transition-colors"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setActiveGalleryIndex((activeGalleryIndex + 1) % galleryList.length)
                          }
                          className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black text-white rounded-full flex items-center justify-center cursor-pointer transition-colors"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </>
                    )}

                    <div className="absolute bottom-3 right-3 bg-black/70 text-white text-[10px] font-inter px-2.5 py-1 tracking-wider">
                      {activeGalleryIndex + 1} of {galleryList.length} Photos
                    </div>
                  </div>

                  {/* Multi-Photo Thumbnails */}
                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                    {galleryList.map((thumbUrl, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setActiveGalleryIndex(idx)}
                        className={`aspect-4/3 overflow-hidden border-2 transition-all cursor-pointer ${
                          activeGalleryIndex === idx
                            ? 'border-[#24201D] ring-2 ring-[#B98272]/50'
                            : 'border-transparent opacity-70 hover:opacity-100'
                        }`}
                      >
                        <img
                          src={thumbUrl}
                          alt="Thumbnail"
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>

                  {/* Modal Action Footer */}
                  <div className="pt-4 border-t border-[#24201D]/15 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="text-xs text-[#756B63]">
                      <span>Crafted by <strong>{selectedItem.stylistName}</strong> at LUMÉ SoHo Studio</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        const sid = selectedItem.serviceId;
                        setSelectedItem(null);
                        onOpenBooking(sid);
                      }}
                      className="px-6 py-3 bg-[#24201D] text-white hover:bg-[#38322E] text-xs uppercase tracking-wider font-semibold transition-colors cursor-pointer flex items-center justify-center space-x-2"
                    >
                      <Calendar className="w-3.5 h-3.5 text-[#EDE5DC]" />
                      <span>BOOK THIS SERVICE TYPE</span>
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
};

