import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Calendar, Phone, ChevronDown, ChevronRight, User, Layers } from 'lucide-react';
import { SALON_INFO, SALON_SECTIONS, STYLISTS } from '../data/salonData';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onOpenBooking: (serviceId?: string, stylistId?: string) => void;
  onNavigateToServicesSection?: (sectionId: string) => void;
  onSelectStylistProfile?: (stylistId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onOpenBooking,
  onNavigateToServicesSection,
  onSelectStylistProfile,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileStylistsOpen, setMobileStylistsOpen] = useState(false);

  // Desktop hover states with defensive debounce timeout
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [stylistsDropdownOpen, setStylistsDropdownOpen] = useState(false);
  const servicesTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const stylistsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { key: 'home', label: 'HOME' },
    { key: 'about', label: 'ABOUT' },
    { key: 'services', label: 'SERVICES', hasDropdown: true },
    { key: 'gallery', label: 'GALLERY' },
    { key: 'stylists', label: 'STYLISTS', hasDropdown: true },
    { key: 'pricing', label: 'PRICING' },
    { key: 'gift-cards', label: 'GIFT CARDS' },
    { key: 'contact', label: 'CONTACT' },
  ];

  const handleLinkClick = (key: string) => {
    onNavigate(key);
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
    setStylistsDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSectionClick = (secId: string) => {
    if (onNavigateToServicesSection) {
      onNavigateToServicesSection(secId);
    } else {
      onNavigate('services');
    }
    setServicesDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  const handleStylistClick = (stylistId: string) => {
    if (onSelectStylistProfile) {
      onSelectStylistProfile(stylistId);
    } else {
      onNavigate('stylists');
    }
    setStylistsDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  // Hover handlers for SERVICES
  const handleServicesMouseEnter = () => {
    if (servicesTimeoutRef.current) clearTimeout(servicesTimeoutRef.current);
    setServicesDropdownOpen(true);
  };
  const handleServicesMouseLeave = () => {
    servicesTimeoutRef.current = setTimeout(() => {
      setServicesDropdownOpen(false);
    }, 150);
  };

  // Hover handlers for STYLISTS
  const handleStylistsMouseEnter = () => {
    if (stylistsTimeoutRef.current) clearTimeout(stylistsTimeoutRef.current);
    setStylistsDropdownOpen(true);
  };
  const handleStylistsMouseLeave = () => {
    stylistsTimeoutRef.current = setTimeout(() => {
      setStylistsDropdownOpen(false);
    }, 150);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#F7F3EE]/95 backdrop-blur-md border-b border-[#24201D]/10 py-3 shadow-xs'
            : 'bg-transparent py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Zone 1: Single text element wordmark */}
            <button
              onClick={() => handleLinkClick('home')}
              className="group text-left cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-[#24201D]"
              aria-label="LUMÉ Hair Studio Home"
            >
              <span className="font-serif text-2xl sm:text-3xl tracking-[0.2em] font-normal text-[#24201D] transition-opacity group-hover:opacity-80">
                LUMÉ
              </span>
            </button>

            {/* Zone 2: UPPERCASE navigation links with dynamic hover dropdowns */}
            <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
              {navLinks.map((link) => {
                const isActive = currentPage === link.key;

                // SPECIAL CASE 1: SERVICES (shows all section names on hover)
                if (link.key === 'services') {
                  return (
                    <div
                      key={link.key}
                      className="relative py-2"
                      onMouseEnter={handleServicesMouseEnter}
                      onMouseLeave={handleServicesMouseLeave}
                    >
                      <button
                        type="button"
                        onClick={() => handleLinkClick('services')}
                        className={`text-xs uppercase tracking-[0.2em] transition-all relative py-1 cursor-pointer focus:outline-none flex items-center space-x-1 ${
                          isActive
                            ? 'text-[#24201D] font-semibold'
                            : 'text-[#756B63] hover:text-[#24201D] font-medium'
                        }`}
                      >
                        <span>{link.label}</span>
                        <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${servicesDropdownOpen ? 'rotate-180 text-[#B98272]' : ''}`} />
                        {isActive && (
                          <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#B98272]" />
                        )}
                      </button>

                      {/* Dropdown Menu: Pure Section Names (Dynamically from SALON_SECTIONS) */}
                      {servicesDropdownOpen && (
                        <div className="absolute top-full left-1/2 -translate-x-1/2 w-64 bg-white/98 backdrop-blur-md border border-[#24201D]/15 shadow-xl py-2 px-1 rounded-xs animate-fadeIn z-50">
                          <div className="px-3 py-1.5 border-b border-[#24201D]/10 flex items-center justify-between mb-1">
                            <span className="text-[10px] uppercase tracking-[0.2em] text-[#B98272] font-semibold flex items-center space-x-1">
                              <Layers className="w-3 h-3" />
                              <span>STUDIO SECTIONS</span>
                            </span>
                            <span className="text-[9px] uppercase font-inter text-[#756B63]">
                              {SALON_SECTIONS.length} Categories
                            </span>
                          </div>

                          <div className="max-h-80 overflow-y-auto no-scrollbar">
                            {SALON_SECTIONS.map((sec) => (
                              <button
                                key={sec.id}
                                type="button"
                                onClick={() => handleSectionClick(sec.id)}
                                className="w-full text-left px-3 py-2 text-xs font-serif text-[#24201D] hover:text-[#B98272] hover:bg-[#F7F3EE] rounded-xs transition-colors cursor-pointer flex items-center justify-between group/sec"
                              >
                                <span className="group-hover/sec:translate-x-1 transition-transform">
                                  {sec.name}
                                </span>
                                <ChevronRight className="w-3 h-3 text-[#24201D]/20 group-hover/sec:text-[#B98272] transition-colors" />
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }

                // SPECIAL CASE 2: STYLISTS (shows all stylists' names vertically stacked on hover)
                if (link.key === 'stylists') {
                  return (
                    <div
                      key={link.key}
                      className="relative py-2"
                      onMouseEnter={handleStylistsMouseEnter}
                      onMouseLeave={handleStylistsMouseLeave}
                    >
                      <button
                        type="button"
                        onClick={() => handleLinkClick('stylists')}
                        className={`text-xs uppercase tracking-[0.2em] transition-all relative py-1 cursor-pointer focus:outline-none flex items-center space-x-1 ${
                          isActive
                            ? 'text-[#24201D] font-semibold'
                            : 'text-[#756B63] hover:text-[#24201D] font-medium'
                        }`}
                      >
                        <span>{link.label}</span>
                        <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${stylistsDropdownOpen ? 'rotate-180 text-[#B98272]' : ''}`} />
                        {isActive && (
                          <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#B98272]" />
                        )}
                      </button>

                      {/* Dropdown Menu: Pure Stylists Names stacked vertically (Dynamically from STYLISTS) */}
                      {stylistsDropdownOpen && (
                        <div className="absolute top-full left-1/2 -translate-x-1/2 w-64 bg-white/98 backdrop-blur-md border border-[#24201D]/15 shadow-xl py-2 px-1 rounded-xs animate-fadeIn z-50">
                          <div className="px-3 py-1.5 border-b border-[#24201D]/10 flex items-center justify-between mb-1">
                            <span className="text-[10px] uppercase tracking-[0.2em] text-[#B98272] font-semibold flex items-center space-x-1">
                              <User className="w-3 h-3" />
                              <span>MASTER ARTISTS</span>
                            </span>
                            <span className="text-[9px] uppercase font-inter text-[#756B63]">
                              {STYLISTS.length} Stylists
                            </span>
                          </div>

                          <div className="max-h-80 overflow-y-auto no-scrollbar">
                            {STYLISTS.map((st) => (
                              <button
                                key={st.id}
                                type="button"
                                onClick={() => handleStylistClick(st.id)}
                                className="w-full text-left px-3 py-2 text-xs font-serif text-[#24201D] hover:text-[#B98272] hover:bg-[#F7F3EE] rounded-xs transition-colors cursor-pointer flex items-center justify-between group/st"
                              >
                                <span className="group-hover/st:translate-x-1 transition-transform">
                                  {st.name}
                                </span>
                                <span className="text-[10px] uppercase font-sans text-[#756B63] font-light">
                                  Profile →
                                </span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }

                // Standard Nav Links
                return (
                  <button
                    key={link.key}
                    onClick={() => handleLinkClick(link.key)}
                    className={`text-xs uppercase tracking-[0.2em] transition-all relative py-1 cursor-pointer focus:outline-none ${
                      isActive
                        ? 'text-[#24201D] font-semibold'
                        : 'text-[#756B63] hover:text-[#24201D] font-medium'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#B98272]" />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Zone 3: Primary action & mobile trigger */}
            <div className="flex items-center space-x-3 sm:space-x-4">
              <button
                onClick={() => onOpenBooking()}
                className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 text-xs uppercase tracking-[0.18em] font-medium text-white bg-[#24201D] hover:bg-[#38322E] rounded-none transition-all duration-200 cursor-pointer shadow-xs active:scale-[0.98]"
              >
                BOOK APPOINTMENT
              </button>

              {/* Mobile menu trigger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-[#24201D] focus:outline-none cursor-pointer"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-[#24201D]/50 backdrop-blur-xs md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="fixed top-0 right-0 w-4/5 max-w-sm h-full bg-[#F7F3EE] p-6 shadow-2xl flex flex-col justify-between overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex items-center justify-between pb-5 border-b border-[#24201D]/10">
                <span className="font-serif text-2xl tracking-[0.2em] text-[#24201D]">LUMÉ</span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 text-[#756B63] hover:text-[#24201D] cursor-pointer"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex flex-col space-y-2 py-6">
                {navLinks.map((link) => {
                  // Mobile SERVICES accordion
                  if (link.key === 'services') {
                    return (
                      <div key={link.key} className="border-b border-[#24201D]/5 pb-2">
                        <div className="flex items-center justify-between">
                          <button
                            onClick={() => handleLinkClick('services')}
                            className={`text-left text-xs uppercase tracking-[0.2em] py-2 transition-colors cursor-pointer ${
                              currentPage === 'services' ? 'text-[#24201D] font-bold' : 'text-[#756B63]'
                            }`}
                          >
                            {link.label}
                          </button>
                          <button
                            type="button"
                            onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                            className="p-2 text-[#756B63] cursor-pointer"
                            aria-label="Toggle services sections"
                          >
                            <ChevronDown className={`w-4 h-4 transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`} />
                          </button>
                        </div>

                        {mobileServicesOpen && (
                          <div className="pl-3 py-1 space-y-1.5 border-l-2 border-[#B98272]/30 mt-1">
                            {SALON_SECTIONS.map((sec) => (
                              <button
                                key={sec.id}
                                type="button"
                                onClick={() => handleSectionClick(sec.id)}
                                className="block w-full text-left py-1 text-xs text-[#24201D] hover:text-[#B98272] transition-colors"
                              >
                                · {sec.name}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  }

                  // Mobile STYLISTS accordion
                  if (link.key === 'stylists') {
                    return (
                      <div key={link.key} className="border-b border-[#24201D]/5 pb-2">
                        <div className="flex items-center justify-between">
                          <button
                            onClick={() => handleLinkClick('stylists')}
                            className={`text-left text-xs uppercase tracking-[0.2em] py-2 transition-colors cursor-pointer ${
                              currentPage === 'stylists' ? 'text-[#24201D] font-bold' : 'text-[#756B63]'
                            }`}
                          >
                            {link.label}
                          </button>
                          <button
                            type="button"
                            onClick={() => setMobileStylistsOpen(!mobileStylistsOpen)}
                            className="p-2 text-[#756B63] cursor-pointer"
                            aria-label="Toggle stylists"
                          >
                            <ChevronDown className={`w-4 h-4 transition-transform ${mobileStylistsOpen ? 'rotate-180' : ''}`} />
                          </button>
                        </div>

                        {mobileStylistsOpen && (
                          <div className="pl-3 py-1 space-y-1.5 border-l-2 border-[#B98272]/30 mt-1 max-h-48 overflow-y-auto">
                            {STYLISTS.map((st) => (
                              <button
                                key={st.id}
                                type="button"
                                onClick={() => handleStylistClick(st.id)}
                                className="block w-full text-left py-1 text-xs text-[#24201D] hover:text-[#B98272] transition-colors"
                              >
                                · {st.name}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  }

                  // Standard Links
                  return (
                    <button
                      key={link.key}
                      onClick={() => handleLinkClick(link.key)}
                      className={`text-left text-xs uppercase tracking-[0.2em] py-2 transition-colors cursor-pointer border-b border-[#24201D]/5 ${
                        currentPage === link.key
                          ? 'text-[#24201D] font-bold pl-2 border-l-2 border-[#B98272]'
                          : 'text-[#756B63] hover:text-[#24201D]'
                      }`}
                    >
                      {link.label}
                    </button>
                  );
                })}
              </div>

              {/* Mobile CTA */}
              <div className="pt-4">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenBooking();
                  }}
                  className="w-full py-3 bg-[#24201D] text-white text-xs uppercase tracking-[0.18em] font-semibold text-center shadow-xs cursor-pointer"
                >
                  BOOK APPOINTMENT
                </button>
              </div>
            </div>

            <div className="pt-6 border-t border-[#24201D]/10 text-[11px] text-[#756B63] space-y-1">
              <p>{SALON_INFO.address}</p>
              <p>{SALON_INFO.phone}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

