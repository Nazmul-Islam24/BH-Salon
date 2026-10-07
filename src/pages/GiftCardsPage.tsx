import React, { useState } from 'react';
import {
  Gift,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Heart,
  ChevronDown,
  ArrowRight,
  Phone,
  Mail,
  Send
} from 'lucide-react';
import { GiftCardCustomizer } from '../components/GiftCardCustomizer';
import { SALON_INFO } from '../data/salonData';

interface GiftCardsPageProps {
  onOpenBooking: () => void;
  onNavigateToContact: () => void;
}

export const GiftCardsPage: React.FC<GiftCardsPageProps> = ({
  onOpenBooking,
  onNavigateToContact,
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const curatedPackages = [
    {
      title: 'The Signature Balayage & Gloss',
      price: '$275',
      value: 275,
      desc: 'Bespoke hand-painted dimensional highlights, custom acidic toner gloss, bond-building mask, and tailored editorial blowout.',
      recommendedFor: 'Color transformations & seasonal radiance',
    },
    {
      title: 'The Botanical Scalp & Cut Ritual',
      price: '$150',
      value: 150,
      desc: 'Ayurvedic warm oil scalp massage, Japanese head spa basin treatment, precision architectural haircut, and blowout.',
      recommendedFor: 'Complete relaxation & hair rejuvenation',
    },
    {
      title: 'The Executive Editorial Blowout',
      price: '$85',
      value: 85,
      desc: 'Clarifying wash with organic French botanicals, tension-release scalp ritual, and red-carpet textured blow-dry.',
      recommendedFor: 'Celebrations, dates & special events',
    },
    {
      title: 'The Total Studio Sanctuary Pass',
      price: '$450',
      value: 450,
      desc: 'An unhurried half-day immersion: full head dimensional color, haircut, restorative basin treatment, and complete home care kit.',
      recommendedFor: 'The ultimate luxury gesture',
    },
  ];

  const steps = [
    {
      step: '01',
      title: 'Select Value & Personalize',
      desc: 'Choose any preset denomination from $50 to $500, or enter a custom amount. Add the recipient’s name and your heartfelt sentiment.',
    },
    {
      step: '02',
      title: 'Instant Delivery or Physical Box',
      desc: 'Receive an instant high-resolution digital pass via email and SMS. Printable presentation certificates are immediately ready to fold or frame.',
    },
    {
      step: '03',
      title: 'Private SoHo Reservation',
      desc: 'The recipient selects their preferred day and master artist online or via our studio concierge. The voucher balance is applied seamlessly.',
    },
  ];

  const faqs = [
    {
      q: 'Do LUMÉ gift cards expire?',
      a: 'Never. LUMÉ gift cards carry no expiration date and never lose value over time. They remain fully redeemable indefinitely.',
    },
    {
      q: 'Can the gift card be used across multiple visits?',
      a: 'Yes. Any unused balance remains safely stored under the recipient’s name and phone number on our salon system, ready to apply toward future appointments.',
    },
    {
      q: 'Can the voucher be redeemed for organic retail products?',
      a: 'Absolutely. LUMÉ gift cards are valid for both in-salon hair services (balayage, precision cuts, treatments, threading, facials) and our curated European botanical retail line.',
    },
    {
      q: 'Can I purchase physical luxury gift boxes for corporate or wedding gifts?',
      a: 'Yes! For physical embossed gift boxes tied with silk ribbon, please visit our Mercer Street studio or call our concierge desk directly at (555) 123-4567.',
    },
  ];

  return (
    <div className="pt-20 pb-20 bg-[#F7F3EE]">
      {/* ============================================================== */}
      {/* 01. EDITORIAL HERO - Beautiful Words & Thoughtful Storytelling */}
      {/* ============================================================== */}
      <section className="relative py-14 sm:py-20 bg-[#EDE5DC]/40 border-b border-[#24201D]/10 text-center overflow-hidden">
        {/* Background stylish hair & beautiful women image (If removed, underlying bg color displays seamlessly) */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <img
            src="./src/assets/images/cut-finish.avif"
            alt="LUMÉ luxury hair artistry gift cards"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center opacity-40 mix-blend-multiply scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#EDE5DC]/40 via-transparent to-[#EDE5DC]/80" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
          <div className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.25em] text-[#B98272] font-semibold mb-2">
            <Gift className="w-3.5 h-3.5" />
            <span>THE ART OF GIVING</span>
          </div>

          <h1 className="font-serif font-normal text-3xl sm:text-5xl lg:text-6xl text-[#24201D] tracking-tight mb-4">
            AN ELEVATED GESTURE.<br />
            <span className="italic font-normal">THE GIFT OF BESPOKE BEAUTY.</span>
          </h1>

          <p className="text-sm sm:text-base text-[#756B63] max-w-2xl mx-auto font-light leading-relaxed">
            Give the gift of pure presence, transformation, and unhurried luxury. A LUMÉ gift card is more than a salon voucher—it is an invitation to our tranquil SoHo sanctuary, where master colorists, precision cuts, and organic rituals await.
          </p>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 02. INTERACTIVE 3D GIFT CARD CUSTOMIZER SECTION */}
      {/* ============================================================== */}
      <section className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10 sm:mb-12">
          <span className="text-xs uppercase tracking-[0.25em] text-[#B98272] font-semibold block mb-1">
            CUSTOMIZE YOUR VOUCHER
          </span>
          <h2 className="font-serif font-normal text-3xl sm:text-5xl text-[#24201D] tracking-tight">
            FOR SOMEONE SPECIAL
          </h2>
          <p className="text-xs sm:text-sm text-[#756B63] mt-2 font-light">
            Select an amount, write a personal message, and see your digital voucher update in real-time.
          </p>
        </div>

        {/* Embedded 3D Customizer */}
        <GiftCardCustomizer showExploreButton={false} />
      </section>

      {/* ============================================================== */}
      {/* 03. POPULAR CURATED PACKAGES */}
      {/* ============================================================== */}
      <section className="py-14 sm:py-20 bg-[#EDE5DC]/40 border-y border-[#24201D]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-10 sm:mb-12">
            <span className="text-xs uppercase tracking-[0.25em] text-[#B98272] font-semibold block mb-1">
              INSPIRATION & EXPERIENCES
            </span>
            <h2 className="font-serif font-normal text-3xl sm:text-5xl text-[#24201D] tracking-tight">
              POPULAR GIFT PACKAGES
            </h2>
            <p className="text-xs sm:text-sm text-[#756B63] mt-2 font-light">
              Unsure what amount to give? Here are our clients’ most cherished ritual packages.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {curatedPackages.map((pkg, idx) => (
              <div
                key={idx}
                className="bg-white p-6 border border-[#24201D]/15 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] uppercase tracking-wider text-[#8A5243] font-semibold bg-[#B98272]/15 px-2 py-0.5">
                      Curated Package
                    </span>
                    <span className="font-inter font-bold text-xl text-[#24201D]">
                      {pkg.price}
                    </span>
                  </div>

                  <h3 className="font-serif font-normal text-xl text-[#24201D] group-hover:text-[#B98272] transition-colors mb-2 leading-snug">
                    {pkg.title}
                  </h3>

                  <p className="text-xs text-[#756B63] font-light leading-relaxed mb-4">
                    {pkg.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#24201D]/10">
                  <span className="text-[11px] text-[#8A5243] italic block mb-3">
                    Ideal for: {pkg.recommendedFor}
                  </span>
                  <a
                    href="https://www.fresha.com/a/lume-hair-studio-new-york-mercer-street"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 bg-[#F7F3EE] hover:bg-[#24201D] text-[#24201D] hover:text-[#EDE5DC] border border-[#24201D]/15 text-xs uppercase tracking-wider font-semibold transition-all flex items-center justify-center space-x-1.5"
                  >
                    <span>SELECT {pkg.price} VOUCHER</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 04. HOW IT WORKS - 3 SIMPLE STEPS */}
      {/* ============================================================== */}
      <section className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10 sm:mb-12">
          <span className="text-xs uppercase tracking-[0.25em] text-[#B98272] font-semibold block mb-1">
            EFFORTLESS PROCESS
          </span>
          <h2 className="font-serif font-normal text-3xl sm:text-5xl text-[#24201D] tracking-tight">
            HOW LUMÉ GIFTING WORKS
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((st, i) => (
            <div
              key={i}
              className="bg-white p-7 border border-[#24201D]/15 relative shadow-xs"
            >
              <span className="font-serif font-normal text-4xl text-[#B98272]/50 block mb-2">
                {st.step}
              </span>
              <h3 className="font-serif font-normal text-xl text-[#24201D] mb-2">
                {st.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#756B63] font-light leading-relaxed">
                {st.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================== */}
      {/* 05. GIFT CARD FAQ ACCORDION */}
      {/* ============================================================== */}
      <section className="py-14 sm:py-20 bg-[#EDE5DC]/40 border-t border-[#24201D]/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <span className="text-xs uppercase tracking-[0.25em] text-[#B98272] font-semibold block mb-1">
              FREQUENTLY ASKED
            </span>
            <h2 className="font-serif font-normal text-3xl sm:text-5xl text-[#24201D] tracking-tight">
              GIFT CARD QUESTIONS
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white border border-[#24201D]/15 overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-5 text-left flex items-center justify-between cursor-pointer group"
                  >
                    <span className="font-serif font-normal text-base sm:text-lg text-[#24201D] group-hover:text-[#B98272] transition-colors pr-4">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#756B63] shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-[#B98272]' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#756B63] font-light leading-relaxed border-t border-[#24201D]/5">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 06. CORPORATE & CONCIERGE ASSISTANCE CTA */}
      {/* ============================================================== */}
      <section className="py-16 sm:py-24 bg-[#24201D] text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <span className="text-xs uppercase tracking-[0.3em] text-[#EDE5DC]/70 block mb-2 font-medium">
            CORPORATE & BESPOKE GIFTING
          </span>
          <h2 className="font-serif font-normal text-3xl sm:text-5xl mb-4">
            Need Custom Packaging or Bulk Orders?
          </h2>
          <p className="text-xs sm:text-sm text-[#EDE5DC]/80 font-light mb-8 leading-relaxed">
            From wedding party packages to executive holiday gifts, our concierge can curate bespoke physical presentation boxes with wax-sealed envelopes and organic botanical gifts.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onNavigateToContact}
              className="px-8 py-3.5 bg-[#EDE5DC] hover:bg-white text-[#24201D] text-xs uppercase tracking-[0.2em] font-semibold transition-all cursor-pointer shadow-lg w-full sm:w-auto"
            >
              CONTACT CONCIERGE
            </button>
            <a
              href={`tel:${SALON_INFO.phone}`}
              className="px-8 py-3.5 border border-[#EDE5DC]/30 hover:border-[#EDE5DC] hover:bg-[#EDE5DC]/10 text-[#EDE5DC] text-xs uppercase tracking-[0.2em] font-medium transition-all cursor-pointer w-full sm:w-auto flex items-center justify-center space-x-2"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>CALL {SALON_INFO.phone}</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

