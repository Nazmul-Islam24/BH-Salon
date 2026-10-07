import React, { useEffect, useState } from 'react';
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Share2,
  Check,
  Sparkles,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Heart
} from 'lucide-react';
import { BlogPost } from '../types';
import { BLOG_POSTS, SALON_INFO } from '../data/salonData';

interface ArticleDetailPageProps {
  article: BlogPost;
  onBack: () => void;
  onSelectArticle: (article: BlogPost) => void;
  onOpenBooking: () => void;
}

export const ArticleDetailPage: React.FC<ArticleDetailPageProps> = ({
  article,
  onBack,
  onSelectArticle,
  onOpenBooking,
}) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [article.id]);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  // Find related articles (excluding the current one)
  const relatedArticles = BLOG_POSTS.filter((p) => p.id !== article.id).slice(0, 3);

  // Schema.org structured data for SEO
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.excerpt,
    image: [article.image],
    datePublished: '2026-03-01T09:00:00+00:00',
    dateModified: '2026-10-01T10:00:00+00:00',
    author: {
      '@type': 'Person',
      name: article.author,
      jobTitle: 'Master Stylist & Hair Artist',
      worksFor: {
        '@type': 'HairSalon',
        name: 'LUMÉ Hair Studio',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '123 Mercer Street',
          addressLocality: 'New York',
          addressRegion: 'NY',
          postalCode: '10012',
          addressCountry: 'US',
        },
      },
    },
    publisher: {
      '@type': 'Organization',
      name: 'LUMÉ Hair Studio',
      logo: {
        '@type': 'ImageObject',
        url: 'https://lumehairstudio.com/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': typeof window !== 'undefined' ? window.location.href : 'https://lumehairstudio.com/journal',
    },
    articleSection: article.category,
    wordCount: 750,
  };

  // Author details map
  const getAuthorRole = (authorName: string) => {
    switch (authorName) {
      case 'Emma Carter':
        return 'Creative Director & Founder';
      case 'Sophia Lee':
        return 'Senior Color Specialist & Balayage Director';
      case 'Zoe Chen':
        return 'Lash & Brow Architect';
      case 'Camille Dupont':
        return 'Dermal Therapist & Skin Specialist';
      case 'Amara Khan':
        return 'Holistic Scalp & Wellness Therapist';
      default:
        return 'LUMÉ Resident Hair Artist';
    }
  };

  return (
    <article
      itemScope
      itemType="https://schema.org/BlogPosting"
      className="pt-20 pb-20 bg-[#F7F3EE] min-h-screen text-[#24201D] animate-fadeIn"
    >
      {/* Schema.org Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* Top Breadcrumb & Return Bar */}
      <div className="bg-[#EDE5DC]/60 border-b border-[#24201D]/10 sticky top-16 sm:top-20 z-20 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <button
            onClick={onBack}
            className="inline-flex items-center space-x-2 text-xs uppercase tracking-wider font-semibold text-[#24201D] hover:text-[#B98272] transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>BACK TO ABOUT & JOURNAL</span>
          </button>

          <div className="flex items-center space-x-3">
            <nav aria-label="Breadcrumb" className="hidden sm:flex items-center space-x-2 text-xs text-[#756B63]">
              <span>About</span>
              <span>/</span>
              <span>The LUMÉ Journal</span>
              <span>/</span>
              <span className="text-[#24201D] font-medium truncate max-w-[160px]">{article.category}</span>
            </nav>

            <button
              onClick={handleShare}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-white border border-[#24201D]/15 text-xs text-[#24201D] hover:border-[#24201D] transition-colors cursor-pointer rounded-xs"
              title="Share article"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#B98272]" />
                  <span className="font-semibold text-[#B98272]">Link Copied</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-[#756B63]" />
                  <span>Share</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Article Header */}
      <header className="max-w-4xl mx-auto px-4 sm:px-6 pt-10 sm:pt-14 pb-8 sm:pb-12 text-center">
        {/* Category Pill */}
        <div className="inline-flex items-center space-x-2 mb-4">
          <span className="px-3 py-1 bg-[#B98272]/15 text-[#8A5243] text-xs uppercase font-semibold tracking-[0.2em] rounded-full">
            {article.category}
          </span>
          <span className="text-xs text-[#756B63]">·</span>
          <span className="text-xs text-[#756B63] uppercase tracking-wider flex items-center gap-1 font-mono">
            <Clock className="w-3.5 h-3.5" />
            {article.readTime}
          </span>
        </div>

        {/* Grand Article Headline (H1 with font-normal as requested) */}
        <h1
          itemProp="headline"
          className="font-serif font-normal text-3xl sm:text-5xl lg:text-6xl text-[#24201D] tracking-tight leading-[1.12] mb-6"
        >
          {article.title}
        </h1>

        {/* Excerpt / Lead Description */}
        <p
          itemProp="description"
          className="text-base sm:text-xl text-[#756B63] max-w-2xl mx-auto font-light leading-relaxed mb-8"
        >
          {article.excerpt}
        </p>

        {/* Author Meta Bar */}
        <div className="flex items-center justify-center space-x-4 pt-6 border-t border-[#24201D]/10">
          <div className="w-11 h-11 rounded-full bg-[#EDE5DC] border border-[#24201D]/15 overflow-hidden flex items-center justify-center shrink-0">
            <span className="font-serif font-semibold text-sm text-[#24201D]">
              {article.author.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div className="text-left">
            <span itemProp="author" className="text-xs uppercase tracking-wider font-semibold text-[#24201D] block">
              {article.author}
            </span>
            <span className="text-[11px] text-[#756B63] font-light">
              {getAuthorRole(article.author)} · {article.date}
            </span>
          </div>
        </div>
      </header>

      {/* Featured Hero Image */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 mb-12 sm:mb-16">
        <figure className="relative aspect-16/9 sm:aspect-21/9 overflow-hidden bg-[#24201D] shadow-md border border-[#24201D]/10">
          <img
            src={article.image}
            alt={article.title}
            itemProp="image"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <figcaption className="sr-only">{article.title}</figcaption>
        </figure>
      </div>

      {/* Main Editorial Content & Sidebar Layout */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Main Article Body (8 Cols) */}
          <main className="lg:col-span-8 space-y-8" itemProp="articleBody">
            {/* Key Takeaways Callout Card */}
            <div className="bg-[#EDE5DC]/45 border border-[#24201D]/15 p-6 sm:p-7 shadow-xs">
              <div className="flex items-center space-x-2 text-xs uppercase tracking-[0.2em] font-semibold text-[#B98272] mb-3">
                <Sparkles className="w-4 h-4" />
                <span>EDITORIAL KEY TAKEAWAYS</span>
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm text-[#24201D] font-light">
                <li className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#B98272] shrink-0 mt-0.5" />
                  <span>Intentional, gentle at-home care safeguards your in-salon transformation for months.</span>
                </li>
                <li className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#B98272] shrink-0 mt-0.5" />
                  <span>Never compromise hair fiber tensile strength; always prioritize restorative lipid and peptide bond treatments.</span>
                </li>
                <li className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#B98272] shrink-0 mt-0.5" />
                  <span>Schedule routine maintenance micro-appointments before split ends compromise length and dimension.</span>
                </li>
              </ul>
            </div>

            {/* In-depth Article Paragraphs */}
            <div className="space-y-6 text-sm sm:text-base text-[#24201D] leading-relaxed font-light">
              {article.content.map((paragraph, idx) => (
                <p key={idx} className="first-letter:font-serif first-letter:text-4xl first-letter:float-left first-letter:mr-2.5 first-letter:text-[#B98272] first-letter:font-normal">
                  {paragraph}
                </p>
              ))}

              <p>
                At LUMÉ Hair Studio, our holistic philosophy centers on the longevity of your look. Rather than aggressive treatments that offer short-lived cosmetic sheen at the expense of cuticle integrity, every formula and cut is engineered to grow out gracefully with your natural hair patterns.
              </p>
            </div>

            {/* Pull Quote Box (H2 with font-normal as requested) */}
            <blockquote className="my-10 p-6 sm:p-8 border-l-2 border-[#B98272] bg-white border-y border-r border-[#24201D]/10 shadow-xs">
              <h2 className="font-serif font-normal italic text-xl sm:text-2xl text-[#24201D] leading-snug mb-3">
                “True hair elegance should feel organic and effortless. It should move like silk, catch the natural light, and make you feel undeniably like your best self.”
              </h2>
              <cite className="not-italic text-xs uppercase tracking-wider font-semibold text-[#B98272] block">
                — {article.author}, {getAuthorRole(article.author)}
              </cite>
            </blockquote>

            {/* Pro Tips from the Chair Card */}
            <div className="p-6 bg-white border border-[#24201D]/15 space-y-3">
              <h3 className="font-serif font-medium text-xl text-[#24201D] flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-[#B98272]" />
                <span>Pro Tips from the Chair</span>
              </h3>
              <p className="text-xs sm:text-sm text-[#756B63] leading-relaxed font-light">
                When applying hair oils or leave-in conditioning creams, warm 2 to 3 drops between your palms and distribute solely from mid-lengths to ends. Avoid applying rich oils directly to your roots, allowing your scalp's natural sebum production to remain in physiological harmony.
              </p>
            </div>

            {/* Author Bio Box */}
            <div className="pt-8 border-t border-[#24201D]/15 flex flex-col sm:flex-row gap-5 items-start sm:items-center bg-[#EDE5DC]/30 p-6 border border-[#24201D]/10">
              <div className="w-16 h-16 rounded-full bg-[#24201D] text-[#EDE5DC] flex items-center justify-center font-serif text-xl shrink-0 font-medium">
                {article.author.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="space-y-1">
                <h4 className="font-serif text-lg font-medium text-[#24201D]">
                  Written by {article.author}
                </h4>
                <p className="text-xs text-[#756B63] font-light leading-relaxed">
                  {getAuthorRole(article.author)} at LUMÉ Hair Studio in SoHo, New York. Specializing in bespoke European styling, French balayage precision, and clean botanical hair restoration.
                </p>
                <div className="pt-2">
                  <button
                    onClick={onOpenBooking}
                    className="inline-flex items-center space-x-1.5 text-xs font-semibold text-[#8A5243] hover:text-[#24201D] uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    <span>RESERVE AN APPOINTMENT WITH {article.author.toUpperCase()}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </main>

          {/* Right Sidebar (4 Cols) */}
          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-36">
            {/* Quick Consultation Card */}
            <div className="bg-[#24201D] text-white p-6 sm:p-7 shadow-md">
              <span className="text-xs uppercase tracking-[0.25em] text-[#EDE5DC]/70 block mb-2 font-medium">
                PRIVATE RESERVATIONS
              </span>
              <h3 className="font-serif font-normal text-2xl text-white mb-3">
                Begin Your Hair Transformation
              </h3>
              <p className="text-xs text-[#EDE5DC]/80 font-light leading-relaxed mb-6">
                Ready to experience tailored artistry in our peaceful SoHo sanctuary? Consult directly with our master colorists and stylists.
              </p>
              <button
                onClick={onOpenBooking}
                className="w-full py-3 bg-[#EDE5DC] hover:bg-white text-[#24201D] text-xs uppercase tracking-[0.2em] font-semibold transition-all cursor-pointer text-center"
              >
                BOOK APPOINTMENT
              </button>
            </div>

            {/* Studio Information Quick Box */}
            <div className="bg-white border border-[#24201D]/15 p-6 space-y-3">
              <h4 className="font-serif text-base font-medium text-[#24201D]">
                LUMÉ Hair Studio SoHo
              </h4>
              <p className="text-xs text-[#756B63] font-light leading-relaxed">
                {SALON_INFO.address}<br />
                Concierge: {SALON_INFO.phone}
              </p>
              <div className="pt-2 border-t border-[#24201D]/10 text-xs text-[#756B63] space-y-1">
                <div className="flex justify-between">
                  <span>Mon – Wed:</span>
                  <span className="font-mono">9:00 AM – 7:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Thu – Fri:</span>
                  <span className="font-mono">9:00 AM – 8:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday:</span>
                  <span className="font-mono">9:00 AM – 7:00 PM</span>
                </div>
                <div className="flex justify-between text-[#8A5243] font-medium">
                  <span>Sunday:</span>
                  <span>Closed</span>
                </div>
              </div>
            </div>

            {/* Explore More Articles Widget */}
            <div className="bg-white border border-[#24201D]/15 p-6 space-y-4">
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#B98272] block border-b border-[#24201D]/10 pb-2">
                MORE FROM THE JOURNAL
              </span>
              <div className="space-y-4">
                {relatedArticles.map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => onSelectArticle(rel)}
                    className="group cursor-pointer flex gap-3 items-center"
                  >
                    <div className="w-16 h-16 shrink-0 bg-[#EDE5DC] overflow-hidden border border-[#24201D]/10">
                      <img
                        src={rel.image}
                        alt={rel.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-[#B98272] font-semibold uppercase tracking-wider block">
                        {rel.category}
                      </span>
                      <h5 className="font-serif text-xs font-normal text-[#24201D] group-hover:text-[#B98272] transition-colors line-clamp-2 leading-snug">
                        {rel.title}
                      </h5>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Bottom Related Articles Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 mt-16 pt-12 border-t border-[#24201D]/15">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-[#24201D]/10">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#B98272] font-semibold block mb-1">
              THE EDITORIAL ARCHIVE
            </span>
            <h2 className="font-serif font-normal text-2xl sm:text-3xl text-[#24201D]">
              Related Journal Entries
            </h2>
          </div>
          <button
            onClick={onBack}
            className="inline-flex items-center space-x-1.5 text-xs uppercase tracking-wider font-semibold text-[#24201D] hover:text-[#B98272] transition-colors mt-2 sm:mt-0 cursor-pointer"
          >
            <span>VIEW ALL IN ABOUT PAGE</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedArticles.map((rel) => (
            <article
              key={rel.id}
              onClick={() => onSelectArticle(rel)}
              className="bg-white p-4 sm:p-5 border border-[#24201D]/15 hover:border-[#24201D]/35 transition-all duration-300 flex flex-col justify-between cursor-pointer group shadow-xs hover:shadow-md"
            >
              <div>
                <div className="aspect-16/10 overflow-hidden bg-[#EDE5DC] mb-3">
                  <img
                    src={rel.image}
                    alt={rel.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="flex items-center space-x-2 text-xs text-[#756B63] uppercase tracking-[0.16em] mb-1">
                  <span className="font-semibold text-[#B98272]">{rel.category}</span>
                  <span>·</span>
                  <span>{rel.readTime}</span>
                </div>
                <h3 className="font-serif font-normal text-base sm:text-lg text-[#24201D] group-hover:text-[#B98272] transition-colors mb-2 leading-snug">
                  {rel.title}
                </h3>
                <p className="text-xs text-[#756B63] font-light leading-relaxed line-clamp-2">
                  {rel.excerpt}
                </p>
              </div>

              <div className="pt-3 border-t border-[#24201D]/10 flex items-center justify-between text-xs mt-3">
                <span className="text-[#756B63]">By {rel.author}</span>
                <span className="inline-flex items-center space-x-1 font-semibold text-[#24201D] group-hover:text-[#B98272]">
                  <span>READ ENTRY</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </article>
  );
};
