import React from 'react';
import { SALON_INTERIOR, HERO_IMAGE, BALAYAGE_DETAIL, HAIR_TREATMENT_LOOK } from '../data/salonData';

export const StudioSection: React.FC = () => {
  const spaces = [
    {
      title: 'Waiting Lounge & Herbal Bar',
      desc: 'Sip house-blended organic botanical teas in quiet comfort before your session starts.',
      image: SALON_INTERIOR,
      tag: 'Waiting Area',
    },
    {
      title: 'Bespoke Styling Stations',
      desc: 'Ergonomic oak chairs paired with natural daylight illumination and Italian arch mirrors.',
      image: HERO_IMAGE,
      tag: 'Styling Area',
    },
    {
      title: 'Apothecary Color Studio',
      desc: 'Custom pigment blending counters featuring certified organic and low-ammonia formulas.',
      image: BALAYAGE_DETAIL,
      tag: 'Color Station',
    },
  ];

  return (
    <section className="py-14 sm:py-20 bg-[#EDE5DC]/40 border-t border-[#24201D]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Large Interior Banner Card */}
        <div className="relative aspect-16/9 sm:aspect-21/9 overflow-hidden bg-[#24201D] mb-8 sm:mb-10 shadow-md">
          <img
            src={SALON_INTERIOR}
            alt="LUMÉ Hair Studio spacious luxury interior"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#24201D]/90 via-[#24201D]/40 to-transparent flex flex-col justify-end p-6 sm:p-12 text-white">
            <span className="text-xs uppercase tracking-[0.3em] text-[#EDE5DC] mb-2 font-medium">
              THE PHYSICAL SANCTUARY
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight mb-2">
              YOUR TIME. YOUR SPACE.
            </h2>
            <p className="font-serif italic text-lg sm:text-2xl text-[#EDE5DC]/90 font-light">
              Designed to slow things down.
            </p>
          </div>
        </div>

        {/* 3 Spaces Grid below as required by PDF */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {spaces.map((space, idx) => (
            <div
              key={idx}
              className="bg-white/70 p-4 border border-[#24201D]/10 hover:border-[#24201D]/30 transition-all flex flex-col justify-between"
            >
              <div className="aspect-4/3 overflow-hidden bg-[#EDE5DC] mb-4">
                <img
                  src={space.image}
                  alt={space.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#B98272] font-semibold block mb-1">
                  [{space.tag}]
                </span>
                <h3 className="font-serif text-xl text-[#24201D] mb-1.5">
                  {space.title}
                </h3>
                <p className="text-xs text-[#756B63] leading-relaxed font-light">
                  {space.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

