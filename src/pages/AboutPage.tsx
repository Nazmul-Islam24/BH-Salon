import React, { useState } from 'react';
import { Plus, Minus, ArrowRight, ShieldCheck, Leaf, Sparkles, Heart, BookOpen } from 'lucide-react';
import { FAQS, BLOG_POSTS, SALON_INTERIOR, BALAYAGE_DETAIL, HAIR_TREATMENT_LOOK } from '../data/salonData';
import { BlogPost } from '../types';
import { ArticleDetailPage } from '../components/ArticleDetailPage';

interface AboutPageProps {
  onOpenBooking: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenBooking }) => {
  const [openFaq, setOpenFaq] = useState<string | null>('faq-1');
  const [selectedArticle, setSelectedArticle] = useState<BlogPost | null>(null);

  const toggleFaq = (id: string) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  // If user selected an article, open dedicated Article Page instead of a modal!
  if (selectedArticle) {
    return (
      <ArticleDetailPage
        article={selectedArticle}
        onBack={() => {
          setSelectedArticle(null);
          setTimeout(() => {
            const el = document.getElementById('journal-section');
            if (el) {
              el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }, 60);
        }}
        onSelectArticle={(art) => setSelectedArticle(art)}
        onOpenBooking={onOpenBooking}
      />
    );
  }

  const values = [
    {
      icon: Leaf,
      title: 'Conscious Purity',
      desc: 'Formulations strictly free from harmful ammonia, parabens, and sulfates, prioritizing both scalp and environmental health.',
    },
    {
      icon: Sparkles,
      title: 'Bespoke Individuality',
      desc: 'Zero templated hair. Every cut and color palette is sculpted specifically around your unique bone contours and skin undertone.',
    },
    {
      icon: Heart,
      title: 'Unhurried Sanctuary',
      desc: 'We never double-book appointments. Your time in our chair belongs entirely to your hair journey with our undivided attention.',
    },
    {
      icon: ShieldCheck,
      title: 'Integrity Above All',
      desc: 'If a requested chemical transformation compromises your hair fiber tensile health, we will guide you honestly toward safe alternatives.',
    },
  ];

  return (
    <div className="pt-20 pb-16 bg-[#F7F3EE]">
      {/* 01. About Hero - Featuring background stylish hair / beautiful women image over underlying bg-[#EDE5DC]/40 */}
      <section className="relative py-12 sm:py-16 bg-[#EDE5DC]/40 border-b border-[#24201D]/10 overflow-hidden">
        {/* Background stylish hair & beautiful women image (If removed or commented out, underlying bg color stays visible seamlessly) */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <img
            src="./src/assets/images/about.jpg"
            alt="LUMÉ bespoke editorial female hair aesthetic"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center opacity-40 mix-blend-multiply scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#EDE5DC]/40 via-transparent to-[#EDE5DC]/80" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <span className="text-xs uppercase tracking-[0.25em] text-[#B98272] font-semibold block mb-1">
            ABOUT LUMÉ HAIR STUDIO
          </span>
          <h1 className="font-serif font-normal text-3xl sm:text-5xl lg:text-6xl text-[#24201D] tracking-tight mb-3">
            NOT JUST A SALON.<br />
            <span className="italic font-normal">AN ARCHITECTURAL RETREAT.</span>
          </h1>
          <p className="text-sm sm:text-base text-[#756B63] max-w-2xl mx-auto font-light leading-relaxed">
            Founded in SoHo to restore calm, intentionality, and editorial-grade artistry to the salon experience.
          </p>
        </div>
      </section>

      {/* 02. Our Story */}
      <section className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs uppercase tracking-[0.22em] text-[#B98272] font-semibold">
              ORIGIN & PURPOSE
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#24201D]">
              Our Story
            </h2>
            <p className="text-sm text-[#756B63] leading-relaxed font-light">
              LUMÉ was conceived out of fatigue with the rushed, loud factory-style salons that dominate major cities. Our founder and creative directors envisioned a quiet haven where female hair artistry could be practiced with the same exacting precision as haute couture.
            </p>
            <p className="text-sm text-[#756B63] leading-relaxed font-light">
              We selected historic Mercer Street for its high ceilings, natural northern daylight, and peaceful cobblestone setting. Here, clients don’t simply receive a service—they step out of the daily rush and recharge.
            </p>
          </div>

          <div className="lg:col-span-6">
            <div className="aspect-4/3 overflow-hidden shadow-sm bg-[#EDE5DC]">
              <img
                src={SALON_INTERIOR}
                alt="LUMÉ Interior Story"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 03. Our Philosophy */}
      <section className="py-14 sm:py-18 bg-[#EDE5DC]/40 border-y border-[#24201D]/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-[#B98272] font-semibold">
            THE MANIFESTO
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#24201D]">
            Our Philosophy
          </h2>
          <blockquote className="font-serif italic text-xl sm:text-2xl text-[#24201D] leading-snug">
            “True hair elegance should feel organic and effortless. It should move like silk, catch the natural light, and make you feel undeniably like your best self.”
          </blockquote>
          <p className="text-xs sm:text-sm text-[#756B63] font-light max-w-2xl mx-auto">
            We avoid harsh chemicals and rigid trends in favor of French balayage painting, custom contour cuts, and holistic hair restorative remedies.
          </p>
        </div>
      </section>

      {/* 04. Our Space */}
      <section className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="aspect-16/11 overflow-hidden shadow-sm bg-[#EDE5DC]">
              <img
                src={BALAYAGE_DETAIL}
                alt="Our Space & Technique"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="lg:col-span-6 order-1 lg:order-2 space-y-3">
            <span className="text-xs uppercase tracking-[0.22em] text-[#B98272] font-semibold">
              ENVIRONMENT
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#24201D]">
              Our Space
            </h2>
            <p className="text-sm text-[#756B63] leading-relaxed font-light">
              Crafted from raw travertine stone, limewash plaster, warm brushed brass, and natural linen textiles, LUMÉ was intentionally designed as an architectural sensory pause.
            </p>
            <p className="text-sm text-[#756B63] leading-relaxed font-light">
              Acoustic baffles absorb dryer hum, soft ambient lighting prevents glare, and personalized workstation nooks give you complete personal privacy throughout your transformation.
            </p>
          </div>
        </div>
      </section>

      {/* 06. Our Products */}
      <section className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-6 space-y-3">
            <span className="text-xs uppercase tracking-[0.22em] text-[#B98272] font-semibold">
              BOTANICAL RIGOR
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#24201D]">
              Our Products
            </h2>
            <p className="text-sm text-[#756B63] leading-relaxed font-light">
              We reject mass-market commercial formulas laden with synthetic silicones that coat the hair in false shine while suffocating the cuticle.
            </p>
            <p className="text-sm text-[#756B63] leading-relaxed font-light">
              Instead, our apothecary uses cruelty-free European boutique brands enriched with bio-identical plant squalane, hydrolysed pea proteins, and antioxidant cold-pressed botanicals that genuinely heal and fortify hair.
            </p>
          </div>

          <div className="lg:col-span-6">
            <div className="aspect-4/3 overflow-hidden shadow-sm bg-[#EDE5DC]">
              <img
                src={HAIR_TREATMENT_LOOK}
                alt="Clean Botanical Products"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 07. Our Values */}
      <section className="py-14 sm:py-20 bg-[#EDE5DC]/40 border-t border-[#24201D]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-10 sm:mb-12">
            <span className="text-xs uppercase tracking-[0.25em] text-[#B98272] font-semibold block mb-1">
              GUIDING PRINCIPLES
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#24201D]">
              Our Values
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v, i) => (
              <div key={i} className="bg-white/80 p-5 border border-[#24201D]/10">
                <v.icon className="w-5 h-5 text-[#B98272] mb-2.5" />
                <h3 className="font-serif text-base sm:text-lg text-[#24201D] mb-1">{v.title}</h3>
                <p className="text-xs text-[#756B63] leading-relaxed font-light">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 08. FAQ SECTION */}
      <section className="py-14 sm:py-20 bg-[#F7F3EE] border-t border-[#24201D]/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12">
            <span className="text-xs uppercase tracking-[0.25em] text-[#B98272] font-semibold block mb-1">
              CLIENT QUESTIONS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#24201D] tracking-tight">
              FREQUENTLY ASKED QUESTIONS
            </h2>
            <p className="text-xs sm:text-sm text-[#756B63] mt-1 font-light">
              Everything you need to know prior to your visit.
            </p>
          </div>

          {/* Accordion */}
          <div className="divide-y divide-[#24201D]/15 border-y border-[#24201D]/15">
            {FAQS.map((faq) => {
              const isOpen = openFaq === faq.id;
              return (
                <div key={faq.id} className="py-4">
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full flex items-center justify-between text-left cursor-pointer group py-1"
                  >
                    <span className="font-serif text-base sm:text-xl text-[#24201D] group-hover:text-[#B98272] transition-colors pr-6">
                      {faq.question}
                    </span>
                    <div className="w-7 h-7 rounded-full border border-[#24201D]/20 flex items-center justify-center shrink-0 text-[#24201D] group-hover:border-[#24201D]">
                      {isOpen ? (
                        <Minus className="w-3.5 h-3.5 text-[#B98272]" />
                      ) : (
                        <Plus className="w-3.5 h-3.5" />
                      )}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="pt-3 pb-2 pr-10 animate-fadeIn">
                      <p className="text-xs sm:text-sm text-[#756B63] leading-relaxed font-light">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 09. BLOG SECTION */}
      <section id="journal-section" className="py-14 sm:py-20 bg-[#EDE5DC]/40 border-t border-[#24201D]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 sm:mb-12 pb-4 border-b border-[#24201D]/10">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-[#B98272] font-semibold block mb-1">
                FROM THE JOURNAL
              </span>
              <h2 className="font-serif font-normal text-3xl sm:text-5xl text-[#24201D] tracking-tight">
                THE LUMÉ JOURNAL
              </h2>
            </div>
            <p className="text-xs text-[#756B63] mt-1 sm:mt-0 font-light">
              Hair wisdom, color maintenance, and styling notes.
            </p>
          </div>

          {/* Blog Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {BLOG_POSTS.map((post) => (
              <article
                key={post.id}
                onClick={() => setSelectedArticle(post)}
                className="bg-white p-4 sm:p-5 border border-[#24201D]/10 hover:border-[#24201D]/30 transition-all duration-300 flex flex-col justify-between cursor-pointer group shadow-xs hover:shadow-md"
              >
                <div>
                  <div className="aspect-16/10 overflow-hidden bg-[#EDE5DC] mb-3">
                    <img
                      src={post.image}
                      alt={post.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="flex items-center space-x-2 text-xs text-[#756B63] uppercase tracking-[0.16em] mb-1">
                    <span className="font-semibold text-[#B98272]">{post.category}</span>
                    <span>·</span>
                    <span>{post.readTime}</span>
                  </div>

                  <h3 className="font-serif text-base sm:text-lg text-[#24201D] group-hover:text-[#B98272] transition-colors mb-1.5 leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-xs text-[#756B63] font-light leading-relaxed mb-3 line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-2.5 border-t border-[#24201D]/10 flex items-center justify-between text-xs">
                  <span className="text-[#756B63]">By {post.author}</span>
                  <span className="inline-flex items-center space-x-1 font-semibold text-[#24201D] group-hover:text-[#B98272]">
                    <span>READ ARTICLE</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Book Appointment CTA */}
      <section className="py-16 sm:py-24 bg-[#24201D] text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="font-serif font-normal text-3xl sm:text-4xl mb-3">
            Begin Your Hair Transformation
          </h2>
          <p className="text-xs sm:text-sm text-[#EDE5DC]/80 font-light mb-6">
            Appointments fill quickly. Reserve your private session in our SoHo studio today.
          </p>
          <button
            onClick={onOpenBooking}
            className="px-8 py-3.5 bg-[#EDE5DC] hover:bg-white text-[#24201D] text-xs uppercase tracking-[0.2em] font-semibold transition-all cursor-pointer shadow-lg"
          >
            BOOK APPOINTMENT
          </button>
        </div>
      </section>
    </div>
  );
};
