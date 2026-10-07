import React from 'react';

export const WhyLume: React.FC = () => {
  const benefits = [
    {
      num: '01',
      title: 'PERSONALIZED',
      desc: 'Every appointment starts with an unhurried, intuitive consultation to understand your face shape, lifestyle, and hair goals.',
    },
    {
      num: '02',
      title: 'EXPERIENCED',
      desc: 'Our master artists bring over a decade of prestigious European training and editorial fashion backstage experience.',
    },
    {
      num: '03',
      title: 'QUALITY',
      desc: 'We use exclusively certified clean, low-ammonia formulas and organic botanical actives that nurture hair integrity.',
    },
    {
      num: '04',
      title: 'EFFORTLESS',
      desc: 'From frictionless online booking to your signature finish, we keep the entire experience calm, seamless, and transparent.',
    },
  ];

  return (
    <section className="py-14 sm:py-20 bg-[#F7F3EE] border-t border-[#24201D]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10 sm:mb-12">
          <span className="text-xs uppercase tracking-[0.25em] text-[#B98272] font-semibold block mb-1">
            THE LUMÉ DIFFERENCE
          </span>
          <h2 className="font-serif font-normal text-3xl sm:text-5xl text-[#24201D] tracking-tight">
            WHY LUMÉ?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((b) => (
            <div
              key={b.num}
              className="p-8 bg-white/70 border border-[#24201D]/10 relative group hover:border-[#24201D]/30 transition-colors"
            >
              <span className="font-mono text-xs text-[#B98272] tracking-widest block mb-4">
                {b.num}
              </span>
              <h3 className="font-serif text-xl sm:text-2xl text-[#24201D] mb-3 tracking-wide">
                {b.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#756B63] leading-relaxed font-light">
                {b.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

