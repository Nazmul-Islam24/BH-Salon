import React, { useState } from 'react';
import { Star, ExternalLink, ShieldCheck } from 'lucide-react';
import { REVIEWS } from '../data/salonData';

export const ReviewsSection: React.FC = () => {
  const [isPaused, setIsPaused] = useState(false);

  // Official Google Reviews link
  const googleReviewsUrl = 'https://www.google.com/search?q=LUME+Hair+Studio+New+York+reviews';

  // Google SVG Icon for trust verification
  const GoogleIcon = () => (
    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
      />
    </svg>
  );

  return (
    <section className="py-14 sm:py-20 bg-[#EDE5DC]/50 border-t border-[#24201D]/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Lead */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <span className="text-xs uppercase tracking-[0.25em] text-[#B98272] font-semibold block mb-1">
            CLIENT REFLECTIONS
          </span>
          <h2 className="font-serif font-normal text-3xl sm:text-5xl text-[#24201D] tracking-tight">
            WHAT OUR CLIENTS SAY
          </h2>
          <div className="flex items-center justify-center space-x-2 mt-2">
            <span className="font-inter font-bold text-sm text-[#24201D]">4.9</span>
            <div className="flex text-[#B98272]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-[#B98272]" />
              ))}
            </div>
            <span className="text-xs text-[#756B63] font-light">
              · Verified feedback & client experiences (concept studio project)
            </span>
          </div>
        </div>

        {/* Featured Big Quote (per PDF page 8) */}
        <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-12 px-4">
          <div className="flex items-center justify-center space-x-1 text-[#B98272] mb-6">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-current" />
            ))}
          </div>
          <blockquote className="font-serif italic text-2xl sm:text-4xl text-[#24201D] leading-snug tracking-tight mb-6">
            “I walked in wanting a change and left feeling completely like myself again.”
          </blockquote>
          <div className="flex items-center justify-center space-x-2 text-xs uppercase tracking-[0.2em] text-[#756B63]">
            <span className="font-semibold text-[#24201D]">Emily R.</span>
            <span>·</span>
            <span>Bespoke Balayage & Cut</span>
            <GoogleIcon />
          </div>
        </div>

        {/* Infinite Looping Smooth Marquee (PDF page 8 & prompt requirements) */}
        <div className="relative w-full">
          {/* Edge blur gradients */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#EDE5DC]/90 to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#EDE5DC]/90 to-transparent z-10" />

          {/* Marquee Track */}
          <div
            className={`animate-marquee flex items-stretch space-x-6 ${
              isPaused ? 'is-paused' : ''
            }`}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
          >
            {/* Duplicated list to create infinite seamless loop */}
            {[...REVIEWS, ...REVIEWS].map((rev, index) => (
              <a
                key={`${rev.id}-${index}`}
                href={googleReviewsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-72 sm:w-80 shrink-0 bg-white p-6 border border-[#24201D]/10 flex flex-col justify-between shadow-xs hover:border-[#24201D]/40 hover:shadow-md transition-all cursor-pointer select-none"
                title="View verified review on Google"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-1 text-[#B98272]">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    {/* Google Icon next to stars for trust */}
                    <div className="flex items-center space-x-1 text-[11px] text-[#756B63]">
                      <GoogleIcon />
                      <span className="text-[10px] uppercase tracking-wider font-medium">Google</span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-[#24201D] font-light leading-relaxed mb-4 line-clamp-4">
                    “{rev.comment}”
                  </p>
                </div>

                <div className="pt-3 border-t border-[#24201D]/10 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-semibold text-[#24201D] block">
                      {rev.clientName}
                    </span>
                    <span className="text-[11px] text-[#756B63]">
                      {rev.service}
                    </span>
                  </div>
                  <span className="text-[10px] font-inter text-[#756B63]/80">
                    {rev.date}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Google Reviews Connection CTA Button linking directly to Google Reviews */}
        <div className="mt-12 text-center">
          <a
            href={googleReviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2.5 px-7 py-3.5 bg-white border border-[#24201D]/25 text-[#24201D] hover:bg-[#24201D] hover:text-white text-xs uppercase tracking-[0.2em] font-semibold transition-all cursor-pointer shadow-xs active:scale-[0.99] group"
          >
            <GoogleIcon />
            <span>READ VERIFIED GOOGLE REVIEWS</span>
            <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <p className="text-[11px] text-[#756B63] mt-2 font-light">
            Opens verified LUMÉ Google Reviews directly in a new tab
          </p>
        </div>
      </div>
    </section>
  );
};
