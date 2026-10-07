import React from 'react';
import { MapPin, Phone, Mail, Clock, Navigation, CheckCircle2 } from 'lucide-react';
import { SALON_INFO } from '../data/salonData';

export const LocationSection: React.FC = () => {
  return (
    <section className="py-14 sm:py-20 bg-[#F7F3EE] border-t border-[#24201D]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Studio Details & Explicit Day-by-Day Schedule */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-[#B98272] font-semibold block mb-2">
                LOCATION & HOURS
              </span>
              <h2 className="font-serif font-normal text-3xl sm:text-5xl text-[#24201D] tracking-tight">
                LUMÉ HAIR STUDIO
              </h2>
              <p className="text-sm text-[#756B63] mt-2 font-light">
                Nestled on historic cobblestone Mercer Street in SoHo. Concept studio location.
              </p>
            </div>

            <div className="space-y-4 pt-2 border-t border-[#24201D]/10">
              <div className="flex items-start space-x-3.5">
                <MapPin className="w-5 h-5 text-[#B98272] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-[#24201D]">
                    Address
                  </h4>
                  <p className="text-sm text-[#756B63] font-light">
                    {SALON_INFO.address}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <Phone className="w-5 h-5 text-[#B98272] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-[#24201D]">
                    Direct Telephone
                  </h4>
                  <a
                    href={`tel:${SALON_INFO.phone}`}
                    className="text-sm font-inter text-[#24201D] hover:text-[#B98272] transition-colors"
                  >
                    {SALON_INFO.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <Mail className="w-5 h-5 text-[#B98272] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-[#24201D]">
                    Email Inquiries
                  </h4>
                  <a
                    href={`mailto:${SALON_INFO.email}`}
                    className="text-sm text-[#24201D] hover:text-[#B98272] transition-colors"
                  >
                    {SALON_INFO.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Individual Day-by-Day Hours (Explicitly requested by user) */}
            <div className="pt-4 border-t border-[#24201D]/10">
              <div className="flex items-center space-x-2 mb-4">
                <Clock className="w-4 h-4 text-[#B98272]" />
                <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#24201D]">
                  Studio Hours · Individual Day Schedule
                </h4>
              </div>

              <div className="bg-white/80 border border-[#24201D]/15 divide-y divide-[#24201D]/10 text-xs">
                {SALON_INFO.schedule.map((slot) => (
                  <div
                    key={slot.day}
                    className="flex items-center justify-between px-4 py-2.5"
                  >
                    <span className="font-medium text-[#24201D]">{slot.day}</span>
                    {slot.hours === 'Closed' ? (
                      <span className="font-inter font-semibold text-[#B98272] uppercase tracking-wider text-[11px] bg-[#B98272]/10 px-2 py-0.5 rounded-xs">
                        Closed
                      </span>
                    ) : (
                      <span className="font-inter text-[#756B63] tabular-nums font-medium">
                        {slot.hours}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Interactive Map Layout (per PDF [MAP] container) */}
          <div className="lg:col-span-6">
            <div className="bg-[#EDE5DC] border border-[#24201D]/15 overflow-hidden shadow-xs relative">
              {/* Styled Editorial Map Canvas */}
              <div className="relative aspect-4/3 sm:aspect-16/11 bg-[#24201D]/5 flex items-center justify-center p-6 overflow-hidden">
                {/* Visual grid streets pattern */}
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                  <div className="w-full h-full" style={{
                    backgroundImage: 'linear-gradient(to right, #24201D 1px, transparent 1px), linear-gradient(to bottom, #24201D 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                  }} />
                </div>

                {/* Subtle map route indicator */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40" viewBox="0 0 400 300">
                  <path d="M 50 150 Q 150 120 200 150 T 350 140" fill="none" stroke="#B98272" strokeWidth="3" strokeDasharray="6 4" />
                </svg>

                {/* Map Pin Card */}
                <div className="relative z-10 bg-white p-5 border border-[#24201D]/20 shadow-lg text-center max-w-xs">
                  <div className="w-8 h-8 rounded-full bg-[#24201D] text-white flex items-center justify-center mx-auto mb-2 shadow-xs">
                    <MapPin className="w-4 h-4 text-[#EDE5DC]" />
                  </div>
                  <h4 className="font-serif text-lg text-[#24201D] font-semibold">
                    LUMÉ Hair Studio
                  </h4>
                  <p className="text-[11px] text-[#756B63] mt-1 font-light">
                    123 Mercer Street (between Prince & Spring)
                  </p>
                  <p className="text-[10px] text-[#B98272] mt-0.5 font-medium uppercase tracking-wider">
                    SoHo · New York, NY
                  </p>
                  <a
                    href="https://maps.google.com/?q=123+Mercer+Street+New+York+NY"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center space-x-1.5 px-4 py-1.5 bg-[#24201D] text-white text-[11px] uppercase tracking-wider font-medium hover:bg-[#38322E] transition-colors"
                  >
                    <Navigation className="w-3 h-3" />
                    <span>GET DIRECTIONS</span>
                  </a>
                </div>
              </div>

              {/* Transit & Arrival Guide */}
              <div className="p-6 bg-white border-t border-[#24201D]/10">
                <h4 className="text-xs uppercase tracking-[0.18em] font-semibold text-[#24201D] mb-2">
                  Subway & Parking Guide
                </h4>
                <div className="grid grid-cols-2 gap-4 text-xs text-[#756B63]">
                  <div>
                    <span className="font-medium text-[#24201D] block">Subway Transit:</span>
                    <span>N, R, W to Prince St (1 min walk) or B, D, F, M to Broadway-Lafayette.</span>
                  </div>
                  <div>
                    <span className="font-medium text-[#24201D] block">Valet & Garage:</span>
                    <span>Indoor municipal garage conveniently located across Mercer Street.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

