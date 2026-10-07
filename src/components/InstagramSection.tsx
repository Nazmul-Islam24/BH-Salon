import React from 'react';
import { Instagram, ExternalLink } from 'lucide-react';
import { HERO_IMAGE, SALON_INTERIOR, STYLIST_DIRECTOR, BALAYAGE_DETAIL, HAIR_TREATMENT_LOOK } from '../data/salonData';

export const InstagramSection: React.FC = () => {
  const feedImages = [
    { src: BALAYAGE_DETAIL, tag: '#LumeBalayage' },
    { src: HERO_IMAGE, tag: '#LumeCouture' },
    { src: SALON_INTERIOR, tag: '#LumeSanctuary' },
    { src: HAIR_TREATMENT_LOOK, tag: '#LumeGloss' },
    { src: STYLIST_DIRECTOR, tag: '#BehindTheChair' },
    { src: BALAYAGE_DETAIL, tag: '#FrenchTechnique' },
  ];

  return (
    <section className="py-14 sm:py-18 bg-[#F7F3EE] border-t border-[#24201D]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <span className="text-xs uppercase tracking-[0.25em] text-[#B98272] font-semibold block mb-1">
            EDITORIAL DIARY
          </span>
          <h2 className="font-serif font-normal text-3xl sm:text-4xl text-[#24201D] tracking-tight">
            FOLLOW THE LUMÉ LOOK
          </h2>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-1.5 text-xs text-[#756B63] hover:text-[#24201D] mt-2 font-mono tracking-wider transition-colors"
          >
            <span>@lumehairstudio</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* 6 Grid Images */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {feedImages.map((img, idx) => (
            <a
              key={idx}
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden bg-[#EDE5DC] shadow-xs block cursor-pointer"
            >
              <img
                src={img.src}
                alt={`LUMÉ Instagram Post ${idx + 1}`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-[#24201D]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-2 text-white text-center">
                <Instagram className="w-5 h-5 mb-1.5" />
                <span className="text-[10px] tracking-wider font-light">
                  {img.tag}
                </span>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 px-7 py-3 border border-[#24201D]/30 hover:border-[#24201D] hover:bg-[#24201D] hover:text-white text-xs uppercase tracking-[0.2em] font-medium transition-all text-[#24201D]"
          >
            <Instagram className="w-4 h-4" />
            <span>FOLLOW US</span>
          </a>
        </div>
      </div>
    </section>
  );
};
