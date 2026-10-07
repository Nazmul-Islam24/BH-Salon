import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustStrip } from './components/TrustStrip';
import { Introduction } from './components/Introduction';
import { ServicesSection } from './components/ServicesSection';
import { SignatureLook } from './components/SignatureLook';
import { GallerySection } from './components/GallerySection';
import { StylistsSection } from './components/StylistsSection';
import { WhyLume } from './components/WhyLume';
import { ReviewsSection } from './components/ReviewsSection';
import { PricingSection } from './components/PricingSection';
import { GiftCardSection } from './components/GiftCardSection';
import { StudioSection } from './components/StudioSection';
import { InstagramSection } from './components/InstagramSection';
import { FinalCTA } from './components/FinalCTA';
import { LocationSection } from './components/LocationSection';
import { Footer } from './components/Footer';
import { MobileStickyBar } from './components/MobileStickyBar';
import { BookingModal } from './components/BookingModal';

// Dedicated Inner Pages
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { GalleryPage } from './pages/GalleryPage';
import { StylistsPage } from './pages/StylistsPage';
import { PricingPage } from './pages/PricingPage';
import { GiftCardsPage } from './pages/GiftCardsPage';
import { ContactPage } from './pages/ContactPage';

// Admin Portal Pages
import { AdminLoginPage } from './pages/AdminLoginPage';
import { AdminRegisterPage } from './pages/AdminRegisterPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';

import { ServiceItem, Stylist } from './types';

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [bookingOpen, setBookingOpen] = useState<boolean>(false);
  const [bookingServiceId, setBookingServiceId] = useState<string | undefined>();
  const [bookingStylistId, setBookingStylistId] = useState<string | undefined>();
  const [selectedStylistModalId, setSelectedStylistModalId] = useState<string | null>(null);
  const [selectedServicesSectionId, setSelectedServicesSectionId] = useState<string | null>(null);
  const [selectedPricingCard, setSelectedPricingCard] = useState<string | null>(null);

  // Check URL parameters for direct admin access (e.g. ?admin=login or ?admin=dashboard)
  React.useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const adminParam = params.get('admin');
      if (adminParam === 'login') {
        setCurrentPage('admin-login');
      } else if (adminParam === 'register') {
        setCurrentPage('admin-register');
      } else if (adminParam === 'dashboard') {
        setCurrentPage('admin-dashboard');
      }
    } catch {
      // Ignore URL parsing errors
    }
  }, []);

  const handleOpenBooking = (serviceId?: string, stylistId?: string) => {
    setBookingServiceId(serviceId);
    setBookingStylistId(stylistId);
    setBookingOpen(true);
  };

  const handleNavigate = (page: string) => {
    setSelectedStylistModalId(null);
    setSelectedServicesSectionId(null);
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToServicesSection = (sectionId: string) => {
    setSelectedServicesSectionId(sectionId);
    setCurrentPage('services');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectStylistProfileFromNav = (stylistId: string) => {
    setSelectedStylistModalId(stylistId);
    setCurrentPage('stylists');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToPricing = (cardId?: string) => {
    setSelectedPricingCard(cardId || null);
    setCurrentPage('pricing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectStylistFromAnywhere = (_stylist?: Stylist) => {
    setSelectedStylistModalId(null);
    setCurrentPage('stylists');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Dedicated Admin Portal Screens (Isolated from public customer navigation)
  if (currentPage === 'admin-login') {
    return (
      <AdminLoginPage
        onLoginSuccess={() => handleNavigate('admin-dashboard')}
        onNavigateRegister={() => handleNavigate('admin-register')}
        onNavigateHome={() => handleNavigate('home')}
      />
    );
  }

  if (currentPage === 'admin-register') {
    return (
      <AdminRegisterPage
        onRegisterSuccess={() => handleNavigate('admin-login')}
        onNavigateLogin={() => handleNavigate('admin-login')}
        onNavigateHome={() => handleNavigate('home')}
      />
    );
  }

  if (currentPage === 'admin-dashboard') {
    return (
      <AdminDashboardPage
        onLogout={() => handleNavigate('home')}
        onNavigateHome={() => handleNavigate('home')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F3EE] text-[#24201D] flex flex-col font-sans selection:bg-[#B98272]/20 selection:text-[#24201D]">
      {/* Top Navbar with UPPERCASE links */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenBooking={() => handleOpenBooking()}
        onNavigateToServicesSection={handleNavigateToServicesSection}
        onSelectStylistProfile={handleSelectStylistProfileFromNav}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <>
            {/* Section 02: HERO */}
            <Hero
              onOpenBooking={() => handleOpenBooking()}
              onExploreWork={() => handleNavigate('gallery')}
            />

            {/* Section 03: TRUST STRIP */}
            <TrustStrip />

            {/* Section 04: INTRODUCTION */}
            <Introduction onDiscoverLume={() => handleNavigate('about')} />

            {/* Section 05: SERVICES (Editorial numbered list with hover preview) */}
            <ServicesSection
              onViewAllServices={() => handleNavigate('services')}
              onSelectService={(srv: ServiceItem) => {
                handleOpenBooking(srv.id);
              }}
            />

            {/* Section 06: SIGNATURE LOOK */}
            <SignatureLook onExploreLookbook={() => handleNavigate('gallery')} />

            {/* Section 07: GALLERY (Filterable Lookbook) */}
            <GallerySection
              onViewAllLooks={() => handleNavigate('gallery')}
              onBookService={(sId) => handleOpenBooking(sId)}
            />

            {/* Section 08: OUR STYLISTS */}
            <StylistsSection
              onSelectStylist={(stylist) => handleSelectStylistFromAnywhere(stylist)}
              onViewAllStylists={() => handleNavigate('stylists')}
            />

            {/* Section 09: WHY LUMÉ? */}
            <WhyLume />

            {/* Section 10: TESTIMONIALS & REVIEWS (Marquee loop with Google stars) */}
            <ReviewsSection />

            {/* Section 11: PRICING GUIDE */}
            <PricingSection
              onViewFullPricing={() => handleNavigate('pricing')}
              onBookNow={() => handleOpenBooking()}
            />

            {/* Section 11B: GIFT CARDS INTERACTIVE SECTION */}
            <GiftCardSection
              onViewGiftCardsPage={() => handleNavigate('gift-cards')}
            />

            {/* Section 12: THE STUDIO */}
            <StudioSection />

            {/* Section 13: INSTAGRAM / SOCIAL */}
            <InstagramSection />

            {/* Section 16: FINAL CTA */}
            <FinalCTA onOpenBooking={() => handleOpenBooking()} />

            {/* Section 17: LOCATION & SCHEDULE (Day-by-Day Hours) */}
            <LocationSection />
          </>
        )}

        {currentPage === 'about' && (
          <AboutPage
            onOpenBooking={() => handleOpenBooking()}
          />
        )}

        {currentPage === 'services' && (
          <ServicesPage
            onOpenBooking={(sId) => handleOpenBooking(sId)}
            onNavigateToPricing={handleNavigateToPricing}
            initialSectionId={selectedServicesSectionId}
          />
        )}

        {currentPage === 'gallery' && (
          <GalleryPage onOpenBooking={(sId) => handleOpenBooking(sId)} />
        )}

        {currentPage === 'stylists' && (
          <StylistsPage
            onOpenBooking={(sId, stId) => handleOpenBooking(sId, stId)}
            targetStylistId={selectedStylistModalId}
          />
        )}

        {currentPage === 'pricing' && (
          <PricingPage
            onOpenBooking={(sId) => handleOpenBooking(sId)}
            targetCardId={selectedPricingCard}
          />
        )}

        {currentPage === 'gift-cards' && (
          <GiftCardsPage
            onOpenBooking={() => handleOpenBooking()}
            onNavigateToContact={() => handleNavigate('contact')}
          />
        )}

        {currentPage === 'contact' && <ContactPage />}
      </main>

      {/* Section 18: FOOTER */}
      <Footer onNavigate={handleNavigate} />

      {/* Mobile Sticky Bottom Action Bar per PDF */}
      <MobileStickyBar onOpenBooking={() => handleOpenBooking()} />

      {/* 5-Step Interactive Booking Modal */}
      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        preselectedServiceId={bookingServiceId}
        preselectedStylistId={bookingStylistId}
      />
    </div>
  );
}
