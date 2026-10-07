import React from 'react';
import { Award, Sparkles, Scissors, Star, Flower2 } from 'lucide-react';

export const TrustStrip: React.FC = () => {
  const metrics = [
    {
      icon: Award,
      value: '10+',
      label: 'Years of Experience',
      sub: 'Editorial & Salon Mastery',
      isNumeric: true,
    },
    {
      icon: Sparkles,
      value: '100%',
      label: 'Premium Products',
      sub: 'Clean & Cruelty-Free',
      isNumeric: true,
    },
    {
      icon: Scissors,
      value: '10+',
      label: 'Professional Stylists',
      sub: 'Master Colorists & Artists',
      isNumeric: true,
    },
    {
      icon: Star,
      value: '4.9 ★',
      label: 'Ratings on Google & Fresha',
      sub: 'Client Satisfaction',
      isNumeric: true,
    },
    {
      icon: Flower2,
      value: 'Luxury',
      label: 'Relaxing Environment',
      sub: 'Tranquil SoHo Sanctuary',
      isNumeric: false,
    },
  ];

  return (
    <section className="bg-[#EDE5DC] border-y border-[#24201D]/10 py-8 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 sm:gap-8 items-center text-center divide-y md:divide-y-0 md:divide-x divide-[#24201D]/10">
          {metrics.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div
                key={index}
                className={`flex flex-col items-center justify-center px-2 ${
                  index === 4 ? 'col-span-2 md:col-span-1 pt-6 md:pt-0' : index > 1 ? 'pt-4 sm:pt-0' : ''
                }`}
              >
                {/* Item header with stylish matching icon right before the value */}
                <div className="inline-flex items-center justify-center gap-2 mb-1.5">
                  <IconComponent
                    className={`w-4 h-4 sm:w-5 sm:h-5 text-[#B98272] shrink-0 ${
                      item.icon === Star ? 'fill-[#B98272]' : ''
                    }`}
                    strokeWidth={1.8}
                  />
                  <span
                    className={`text-2xl sm:text-3xl text-[#24201D] font-bold tracking-tight ${
                      item.isNumeric ? 'font-inter font-numeric' : 'font-serif font-medium'
                    }`}
                  >
                    {item.value}
                  </span>
                </div>

                <div className="text-xs uppercase tracking-[0.16em] text-[#24201D] font-semibold">
                  {item.label}
                </div>
                <div className="text-[11px] text-[#756B63] mt-0.5 font-light">
                  {item.sub}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

