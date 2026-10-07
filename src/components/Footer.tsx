import React, { useState } from 'react';
import { SALON_INFO } from '../data/salonData';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [legalModal, setLegalModal] = useState<'privacy' | 'terms' | null>(null);

  const handleLink = (page: string) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Social & Directory Platforms requested:
  // Facebook, Instagram, TikTok, Twitter (X), Pinterest, LinkedIn, Fresha, Yelp (Yale)
  const socialPlatforms = [
    {
      name: 'Instagram',
      url: 'https://instagram.com/lumehairstudio',
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
      ),
    },
    {
      name: 'Facebook',
      url: 'https://facebook.com/lumehairstudio',
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      ),
    },
    {
      name: 'TikTok',
      url: 'https://tiktok.com/@lumehairstudio',
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-2.891 2.766 2.894 2.894 0 0 1-2.895-2.895 2.894 2.894 0 0 1 2.895-2.895c.29 0 .567.042.83.118v-3.52a6.376 6.376 0 0 0-.83-.056 6.34 6.34 0 0 0-6.338 6.353 6.34 6.34 0 0 0 6.338 6.352 6.34 6.34 0 0 0 6.338-6.352V8.583a8.167 8.167 0 0 0 4.673 1.458V6.686h-.905z" />
        </svg>
      ),
    },
    {
      name: 'Twitter (X)',
      url: 'https://x.com/lumehairstudio',
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      name: 'Pinterest',
      url: 'https://pinterest.com/lumehairstudio',
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.627-5.373-12-12-12z" />
        </svg>
      ),
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/company/lume-hair-studio',
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect width="4" height="12" x="2" y="9" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      ),
    },
    {
      name: 'Fresha',
      url: 'https://www.fresha.com/a/lume-hair-studio-new-york-mercer-street',
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          {/* Fresha official geometric brand mark */}
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      name: 'Yelp',
      url: 'https://www.yelp.com/biz/lume-hair-studio-new-york',
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          {/* Yelp burst petal emblem */}
          <path d="M12.18 10.29l3.52-5.58a1.27 1.27 0 0 1 1.74-.42 1.34 1.34 0 0 1 .45 1.76l-3.35 5.72a.37.37 0 0 1-.58.11l-1.63-1.25a.36.36 0 0 1-.15-.34zm-2.02.73l-6.17-2.3a1.32 1.32 0 0 1-.74-1.64 1.3 1.3 0 0 1 1.63-.77l6.23 2.15a.36.36 0 0 1 .21.55l-1.02 1.79a.36.36 0 0 1-.14.22zm-.11 2.21l-5.26 3.98a1.31 1.31 0 0 1-1.78-.29 1.31 1.31 0 0 1 .26-1.81l5.35-3.87a.36.36 0 0 1 .59.21l.36 2.03a.35.35 0 0 1-.07.25l-.45-.5zm2.34 1.13l1.83 6.34a1.31 1.31 0 0 1-.9 1.62 1.32 1.32 0 0 1-1.63-.88l-1.8-6.38a.36.36 0 0 1 .38-.45l2.06.4a.36.36 0 0 1 .06.02v.03zm1.88-2.09l6.39.8a1.31 1.31 0 0 1 1.14 1.46 1.31 1.31 0 0 1-1.46 1.14l-6.44-.73a.36.36 0 0 1-.3-.49l.92-1.85a.36.36 0 0 1 .27-.2l.48-.13z" />
        </svg>
      ),
    },
    {
      name: 'YouTube',
      url: 'https://youtube.com/@lumehairstudio',
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="bg-[#24201D] text-[#EDE5DC] pt-16 pb-24 md:pb-16 border-t border-[#EDE5DC]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center space-y-8">
          {/* Wordmark */}
          <button
            onClick={() => handleLink('home')}
            className="font-serif text-3xl sm:text-4xl tracking-[0.25em] text-[#F7F3EE] hover:opacity-80 transition-opacity cursor-pointer"
          >
            LUMÉ
          </button>

          {/* Navigation Links in UPPERCASE */}
          <nav className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs uppercase tracking-[0.2em] font-medium text-[#EDE5DC]/80">
            <button
              onClick={() => handleLink('services')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              SERVICES
            </button>
            <button
              onClick={() => handleLink('gallery')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              GALLERY
            </button>
            <button
              onClick={() => handleLink('stylists')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              STYLISTS
            </button>
            <button
              onClick={() => handleLink('about')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              ABOUT
            </button>
            <button
              onClick={() => handleLink('pricing')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              PRICING
            </button>
            <button
              onClick={() => handleLink('gift-cards')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              GIFT CARDS
            </button>
            <button
              onClick={() => handleLink('contact')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              CONTACT
            </button>
          </nav>

          {/* Social & Directory Platform Icons (Instagram, Facebook, TikTok, Twitter, Pinterest, LinkedIn, Fresha, Yelp) */}
          <div className="pt-2">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#EDE5DC]/50 block mb-3 font-medium">
              CONNECT & FOLLOW THE LUMÉ LOOK
            </span>
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              {socialPlatforms.map((platform) => (
                <a
                  key={platform.name}
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit LUMÉ on ${platform.name}`}
                  title={platform.name}
                  className="w-10 h-10 rounded-full border border-[#EDE5DC]/20 bg-[#EDE5DC]/5 hover:bg-[#B98272] hover:border-[#B98272] text-[#EDE5DC]/80 hover:text-white flex items-center justify-center transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg cursor-pointer group"
                >
                  <span className="transition-transform duration-300 group-hover:scale-110">
                    {platform.icon}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Address & Direct Contact */}
          <div className="text-xs text-[#EDE5DC]/60 space-y-1 font-light">
            <p>{SALON_INFO.address}</p>
            <p className="font-inter">
              Direct: <a href={`tel:${SALON_INFO.phone}`} className="hover:text-white transition-colors">{SALON_INFO.phone}</a> · Concierge: <a href={`mailto:${SALON_INFO.email}`} className="hover:text-white transition-colors">{SALON_INFO.email}</a>
            </p>
          </div>

          {/* Copyright & Legal */}
          <div className="pt-6 border-t border-[#EDE5DC]/10 w-full flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#EDE5DC]/50 gap-4">
            <p>© 2026 LUMÉ Hair Studio. All rights reserved.</p>
            <div className="flex items-center space-x-6">
              <button
                onClick={() => setLegalModal('privacy')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Privacy Policy
              </button>
              <button
                onClick={() => setLegalModal('terms')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Terms of Service
              </button>
              <button
                onClick={() => handleLink('admin-login')}
                className="hover:text-[#EDE5DC] text-[#EDE5DC]/35 transition-colors cursor-pointer"
                title="Salon Owner Administration Portal"
              >
                Owner Access
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Legal Information Modal */}
      {legalModal && (
        <div
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setLegalModal(null)}
        >
          <div
            className="bg-[#F7F3EE] text-[#24201D] max-w-lg w-full p-8 shadow-2xl border border-[#24201D]/20 text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-serif text-2xl mb-4">
              {legalModal === 'privacy' ? 'Privacy Policy' : 'Terms of Service'}
            </h3>
            <p className="text-xs text-[#756B63] leading-relaxed font-light mb-4">
              {legalModal === 'privacy'
                ? 'LUMÉ Hair Studio respects your personal confidentiality. Client records, appointment preferences, and color formulas remain strictly private and are never shared or sold to external third parties.'
                : 'Appointments require a 48-hour cancellation policy to accommodate other clients on our waitlist. Custom chemical and extension services require a prior patch test and consultation.'}
            </p>
            <div className="text-right">
              <button
                onClick={() => setLegalModal(null)}
                className="px-5 py-2 bg-[#24201D] text-white text-xs uppercase tracking-wider cursor-pointer"
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};

