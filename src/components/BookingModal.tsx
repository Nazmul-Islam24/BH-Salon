import React, { useState, useEffect } from 'react';
import {
  X,
  Calendar as CalendarIcon,
  Clock,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  User,
  Sparkles,
  ExternalLink,
  ArrowRight,
  ShieldCheck,
  Building2,
  CalendarCheck,
  Check,
  Search,
  Layers,
  AlertCircle,
  Mail
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { SALON_SECTIONS, ALL_SUB_SERVICES, STYLISTS } from '../data/salonData';
import { createAppointment } from '../lib/appointments';

// Helper to calculate current date dynamically (YYYY-MM-DD)
const getTodayDate = (): string => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedServiceId?: string;
  preselectedStylistId?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preselectedServiceId,
  preselectedStylistId,
}) => {
  // Booking method choice: 'choose' (shows 2 options) | 'direct' (5-step in-house form)
  const [bookingMethod, setBookingMethod] = useState<'choose' | 'direct'>('choose');
  const [currentStep, setCurrentStep] = useState(1);

  // Multi-service selection: list of selected sub-service IDs (starts completely empty by default)
  const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>([]);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('all');
  const [mobileCategoryExpanded, setMobileCategoryExpanded] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectionError, setSelectionError] = useState<string | null>(null);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [stylistId, setStylistId] = useState(preselectedStylistId || 'no-preference');
  const [selectedDate, setSelectedDate] = useState<string>(getTodayDate);
  const [selectedTime, setSelectedTime] = useState('11:00 AM');
  const [bookingRef, setBookingRef] = useState('LUMÉ-8492');
  const [clientDetails, setClientDetails] = useState({
    name: '',
    email: '',
    phone: '',
    notes: '',
  });
  const [isConfirmed, setIsConfirmed] = useState(false);

  // Fresha direct partner booking URL
  const FRESHA_BOOKING_URL = 'https://www.fresha.com/a/lume-hair-studio-new-york-mercer-street';

  // Whenever modal opens, reset to 'choose' options and default state
  useEffect(() => {
    if (isOpen) {
      setBookingMethod('choose');
      setCurrentStep(1);
      setIsConfirmed(false);
      setSearchQuery('');
      setActiveCategoryFilter('all');
      setSelectionError(null);
      setSubmissionError(null);
      setIsSubmitting(false);
      setSelectedDate(getTodayDate());

      // Only select if explicitly preselected by clicking a specific service book button
      if (preselectedServiceId) {
        const exact = ALL_SUB_SERVICES.find((s) => s.id === preselectedServiceId);
        if (exact) {
          setSelectedServiceIds([exact.id]);
        } else {
          const matchingCardService = ALL_SUB_SERVICES.find(
            (s) => s.id.startsWith(preselectedServiceId) || s.cardName.toLowerCase().includes(preselectedServiceId.toLowerCase())
          );
          if (matchingCardService) {
            setSelectedServiceIds([matchingCardService.id]);
          } else {
            setSelectedServiceIds([]);
          }
        }
      } else {
        // Starts empty (no auto-selected service) as requested
        setSelectedServiceIds([]);
      }

      if (preselectedStylistId) {
        setStylistId(preselectedStylistId);
      }

      // Initial temporary display reference
      setBookingRef(`LUMÉ-${Math.floor(1000 + Math.random() * 9000)}`);
    }
  }, [isOpen, preselectedServiceId, preselectedStylistId]);

  if (!isOpen) return null;

  // Selected services objects
  const chosenServices = ALL_SUB_SERVICES.filter((s) =>
    selectedServiceIds.includes(s.id)
  );

  const totalPrice = chosenServices.reduce((sum, s) => sum + s.priceNumber, 0);
  const chosenStylist = STYLISTS.find((st) => st.id === stylistId);

  const timeSlots = [
    '09:30 AM', '11:00 AM', '01:30 PM', '03:00 PM', '04:30 PM', '06:00 PM'
  ];

  // Jori Chorano (Celebration Confetti) Animation Trigger
  const triggerJoriCelebration = () => {
    try {
      const count = 220;
      const defaults = {
        origin: { y: 0.65 },
        colors: ['#B98272', '#D4AF37', '#EDE5DC', '#24201D', '#F7F3EE', '#C59B89'],
      };

      const fire = (particleRatio: number, opts: confetti.Options) => {
        confetti({
          ...defaults,
          ...opts,
          particleCount: Math.floor(count * particleRatio),
        });
      };

      fire(0.25, {
        spread: 30,
        startVelocity: 55,
      });
      fire(0.2, {
        spread: 70,
      });
      fire(0.35, {
        spread: 110,
        decay: 0.92,
        scalar: 0.8,
      });
      fire(0.1, {
        spread: 130,
        startVelocity: 35,
        decay: 0.93,
        scalar: 1.2,
      });
      fire(0.1, {
        spread: 140,
        startVelocity: 45,
      });
    } catch {
      // Graceful fallback
    }
  };

  // Toggle selection: user can check or uncheck any item freely
  const toggleService = (id: string) => {
    setSelectionError(null);
    if (selectedServiceIds.includes(id)) {
      setSelectedServiceIds(selectedServiceIds.filter((item) => item !== id));
    } else {
      setSelectedServiceIds([...selectedServiceIds, id]);
    }
  };

  const handleNext = () => {
    setSelectionError(null);
    setSubmissionError(null);

    if (currentStep === 1) {
      if (selectedServiceIds.length === 0) {
        setSelectionError('Please click to select at least 1 service before continuing.');
        return;
      }
    }

    if (currentStep === 3) {
      if (!selectedDate) {
        setSelectionError('Please select a valid appointment date.');
        return;
      }
      if (!selectedTime) {
        setSelectionError('Please choose an available appointment time slot.');
        return;
      }
    }

    if (currentStep === 4) {
      if (!clientDetails.name.trim() || clientDetails.name.trim().length < 2) {
        setSelectionError('Please provide your full name.');
        return;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!clientDetails.email.trim() || !emailRegex.test(clientDetails.email.trim())) {
        setSelectionError('Please enter a valid email address for your confirmation.');
        return;
      }
      if (!clientDetails.phone.trim() || clientDetails.phone.trim().length < 7) {
        setSelectionError('Please enter a valid phone number for SMS and booking updates.');
        return;
      }
    }

    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    setSelectionError(null);
    setSubmissionError(null);
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleConfirm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (selectedServiceIds.length === 0) {
      setSelectionError('Please select at least 1 service.');
      setCurrentStep(1);
      return;
    }

    if (!clientDetails.name.trim() || !clientDetails.email.trim() || !clientDetails.phone.trim()) {
      setSelectionError('Please complete all required guest contact fields.');
      setCurrentStep(4);
      return;
    }

    setIsSubmitting(true);
    setSubmissionError(null);

    // Prepare immutable snapshots of chosen services
    const servicesSnapshot = chosenServices.map((s) => ({
      id: s.id,
      name: s.name,
      duration: s.duration,
      price: s.price,
      priceNumber: s.priceNumber,
      sectionName: s.sectionName,
    }));

    const result = await createAppointment({
      selectedServices: servicesSnapshot,
      stylistId: chosenStylist ? chosenStylist.id : null,
      stylistName: chosenStylist ? chosenStylist.name : 'No Preference',
      appointmentDate: selectedDate,
      appointmentTime: selectedTime,
      customerName: clientDetails.name,
      customerEmail: clientDetails.email,
      customerPhone: clientDetails.phone,
      notes: clientDetails.notes,
      totalPrice: totalPrice,
    });

    setIsSubmitting(false);

    if (result.success) {
      if (result.reference) {
        setBookingRef(result.reference);
      }
      setIsConfirmed(true);
      triggerJoriCelebration();
    } else {
      setSubmissionError(
        result.error ||
          'Something went wrong while submitting your appointment request. Please try again or call our concierge desk.'
      );
    }
  };

  // Close modal and completely reset for next booking attempt
  const handleFullClose = () => {
    setBookingMethod('choose');
    setCurrentStep(1);
    setIsConfirmed(false);
    setSelectedServiceIds([]);
    onClose();
  };

  const handleOpenFresha = () => {
    window.open(FRESHA_BOOKING_URL, '_blank', 'noopener,noreferrer');
  };

  // Filtered sub-services based on Category and Search
  const visibleServices = ALL_SUB_SERVICES.filter((item) => {
    const matchCat =
      activeCategoryFilter === 'all' || item.sectionId === activeCategoryFilter;
    const matchSearch =
      searchQuery.trim() === '' ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.cardName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sectionName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div
      className="fixed inset-0 z-50 bg-[#24201D]/80 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto"
      onClick={handleFullClose}
    >
      <div
        className="bg-[#F7F3EE] max-w-4xl w-full my-1 sm:my-6 p-3.5 sm:p-7 sm:p-9 shadow-2xl border border-[#24201D]/15 relative text-[#24201D] max-h-[96vh] sm:max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Close Button */}
        <button
          onClick={handleFullClose}
          className="absolute top-4 right-4 w-9 h-9 bg-white/80 hover:bg-white text-[#24201D] rounded-full flex items-center justify-center cursor-pointer shadow-xs transition-colors z-20"
          aria-label="Close booking modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* ============================================================== */}
        {/* VIEW 1: METHOD SELECTION (2 OPTIONS) */}
        {/* ============================================================== */}
        {bookingMethod === 'choose' && !isConfirmed && (
          <div className="py-2">
            <div className="text-center mb-8">
              <span className="text-xs uppercase tracking-[0.25em] text-[#B98272] font-semibold block mb-1">
                LUMÉ CONCIERGE
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#24201D] tracking-tight">
                BOOK YOUR APPOINTMENT
              </h2>
              <p className="text-xs sm:text-sm text-[#756B63] mt-2 max-w-md mx-auto font-light leading-relaxed">
                Choose your preferred reservation experience. Book directly with our studio concierge or schedule instantly via Fresha.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
              {/* Option 1: Fresha Platform Booking (Placed First as requested) */}
              <div
                onClick={handleOpenFresha}
                className="bg-white border-2 border-[#B98272]/40 hover:border-[#B98272] p-6 flex flex-col justify-between transition-all duration-200 cursor-pointer shadow-xs group hover:shadow-md relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 bg-[#B98272] text-white text-[9px] uppercase font-bold tracking-widest px-3 py-0.5">
                  Instant Confirmation
                </div>
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="bg-[#B98272]/15 text-[#8A5243] text-[10px] uppercase font-bold px-2.5 py-1 tracking-wider">
                      Fresha Partner Portal
                    </span>
                    <CalendarCheck className="w-5 h-5 text-[#B98272]" />
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl text-[#24201D] mb-3 group-hover:text-[#B98272] transition-colors">
                    <span className="font-semibold">Book on </span>
                    <span className="font-extrabold text-[#8A5243] group-hover:text-[#B98272]">Fresha</span>
                  </h3>
                </div>

                <div className="pt-4 border-t border-[#24201D]/10 flex items-center justify-between text-xs font-semibold text-[#8A5243] group-hover:text-[#24201D]">
                  <span className="flex items-center gap-1.5">
                    <span>LAUNCH FRESHA PORTAL</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>

              {/* Option 2: Direct Studio Booking */}
              <div
                onClick={() => setBookingMethod('direct')}
                className="bg-white border-2 border-[#24201D]/15 hover:border-[#24201D] p-6 flex flex-col justify-between transition-all duration-200 cursor-pointer shadow-xs group hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="bg-[#EDE5DC] text-[#24201D] text-[10px] uppercase font-semibold px-2.5 py-1 tracking-wider">
                      Multi-Service Selection
                    </span>
                    <Building2 className="w-5 h-5 text-[#B98272]" />
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#24201D] mb-3 group-hover:text-[#B98272] transition-colors">
                    Direct Studio Booking
                  </h3>
                </div>

                <div className="pt-4 border-t border-[#24201D]/10 flex items-center justify-between text-xs font-semibold text-[#24201D] group-hover:text-[#B98272]">
                  <span>CONTINUE DIRECT BOOKING</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>

            <p className="text-[11px] text-[#756B63] text-center italic font-light">
              Both booking options connect directly with our SoHo salon schedule. No deposit required for standard consultations.
            </p>
          </div>
        )}

        {/* ============================================================== */}
        {/* VIEW 2: CONFIRMED STATE WITH "JORI CHORANO" ANIMATION */}
        {/* ============================================================== */}
        {isConfirmed ? (
          <div className="py-6 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#6B8E72]/15 text-[#3F6647] flex items-center justify-center mx-auto mb-2 animate-bounce">
              <Sparkles className="w-8 h-8" />
            </div>

            <span className="text-xs uppercase tracking-[0.25em] text-[#B98272] font-semibold block">
              APPOINTMENT REQUEST RECEIVED · REFERENCE #{bookingRef}
            </span>

            <div className="inline-block px-3 py-1 bg-amber-500/10 text-amber-900 border border-amber-500/25 rounded-full text-[11px] font-semibold tracking-wider uppercase">
              Status: Pending Confirmation
            </div>

            <h3 className="font-serif text-3xl sm:text-4xl text-[#24201D]">
              Your Appointment Request Has Been Received
            </h3>

            <p className="text-xs sm:text-sm text-[#756B63] max-w-md mx-auto leading-relaxed font-light">
              Thank you for choosing LUMÉ Hair Studio. The request is currently pending confirmation. The salon will contact you / email you once your appointment is confirmed.
            </p>

            {/* Official Luxury Studio Booking Receipt Card (ডিজিটাল রসিদ) */}
            <div id="lume-booking-receipt" className="p-6 sm:p-7 bg-white border-2 border-[#D4AF37]/50 text-left max-w-lg mx-auto text-xs space-y-3.5 shadow-md relative overflow-hidden">
              {/* Gold Top Border & Ribbon */}
              <div className="flex items-center justify-between border-b border-[#24201D]/15 pb-3">
                <div>
                  <span className="font-serif text-2xl tracking-[0.2em] text-[#24201D] font-normal block">
                    LUMÉ
                  </span>
                  <span className="text-[10px] tracking-widest uppercase text-[#B98272] font-semibold">
                    HAIR ARTISTRY · SOHO NEW YORK
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[9px] uppercase tracking-wider text-[#756B63] block">
                    Official Receipt
                  </span>
                  <span className="font-mono font-bold text-xs text-[#24201D] bg-[#F7F3EE] px-2 py-0.5 border border-[#24201D]/15 inline-block">
                    {bookingRef}
                  </span>
                </div>
              </div>

              {/* Status & Date */}
              <div className="flex items-center justify-between bg-[#F7F3EE] p-2.5 border border-[#24201D]/10">
                <div>
                  <span className="text-[9px] text-[#756B63] uppercase tracking-wider block">Status</span>
                  <span className="font-semibold text-emerald-800 uppercase tracking-wider text-xs flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Pending Salon Confirmation
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[9px] text-[#756B63] uppercase tracking-wider block">Issued Date</span>
                  <span className="font-inter text-xs text-[#24201D] font-medium">
                    {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>
              </div>

              {/* Client & Artist Info */}
              <div className="grid grid-cols-2 gap-3 border-b border-[#24201D]/10 pb-3">
                <div>
                  <span className="text-[#756B63] text-[9px] uppercase tracking-wider block">Client Name</span>
                  <span className="font-medium text-[#24201D] text-xs">{clientDetails.name || 'Valued Guest'}</span>
                  <span className="text-[11px] text-[#756B63] block truncate">{clientDetails.email}</span>
                  <span className="text-[11px] text-[#756B63] block">{clientDetails.phone}</span>
                </div>
                <div className="text-right">
                  <span className="text-[#756B63] text-[9px] uppercase tracking-wider block">Master Stylist</span>
                  <span className="font-medium text-[#24201D] text-xs">
                    {chosenStylist ? chosenStylist.name : 'First Available Artist'}
                  </span>
                  <span className="text-[11px] text-[#B98272] block font-semibold mt-0.5">
                    {selectedDate} at {selectedTime}
                  </span>
                </div>
              </div>

              {/* Services Breakdown */}
              <div className="space-y-1.5 border-b border-[#24201D]/10 pb-3">
                <span className="text-[#756B63] text-[9px] uppercase tracking-wider block font-semibold">
                  Selected Services ({chosenServices.length})
                </span>
                {chosenServices.map((srv) => (
                  <div key={srv.id} className="flex justify-between items-center py-0.5">
                    <span className="text-[#24201D] font-medium">
                      {srv.name} <span className="text-[10px] text-[#756B63]">({srv.cardName})</span>
                    </span>
                    <span className="font-inter font-semibold text-[#24201D]">{srv.price}</span>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="flex justify-between items-center pt-1 font-bold text-xs text-[#24201D]">
                <span>Estimated Starting Total:</span>
                <span className="font-inter text-sm text-[#24201D]">From ${totalPrice}.00</span>
              </div>

              {/* Automated Email Dispatch Confirmation Banner */}
              <div className="bg-[#FAF7F2] border border-[#D4AF37]/50 p-4 rounded-xs text-left">
                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                    <Mail className="w-3.5 h-3.5 text-emerald-700" />
                  </div>
                  <div className="text-xs space-y-1">
                    <span className="font-semibold text-[#24201D] block">
                      Automatic Emails Successfully Dispatched:
                    </span>
                    <p className="text-[11px] text-[#756B63] leading-relaxed">
                      ✓ A complete digital booking receipt has been sent to client email: <strong className="text-[#24201D]">{clientDetails.email}</strong>
                    </p>
                    <p className="text-[11px] text-[#756B63] leading-relaxed">
                      ✓ New reservation request alert has been delivered to the salon concierge desk.
                    </p>
                  </div>
                </div>
              </div>

              {/* Studio Info Footnote */}
              <p className="text-[10px] text-[#756B63] text-center italic pt-2 border-t border-[#24201D]/10">
                LUMÉ Hair Studio · 123 Mercer Street, SoHo, New York · (555) 123-4567<br/>
                Saved directly to the studio schedule database.
              </p>
            </div>

            {/* Action Button: Return to Studio */}
            <div className="flex items-center justify-center pt-4">
              <button
                type="button"
                onClick={handleFullClose}
                className="w-full sm:w-auto px-10 py-3.5 bg-[#24201D] text-white hover:bg-[#38322E] text-xs uppercase tracking-[0.15em] font-semibold transition-all cursor-pointer shadow-md active:scale-95"
              >
                RETURN TO MAIN PAGE / STUDIO
              </button>
            </div>
          </div>
        ) : null}

        {/* ============================================================== */}
        {/* VIEW 3: DIRECT 5-STEP MULTI-SERVICE BOOKING FLOW */}
        {/* ============================================================== */}
        {bookingMethod === 'direct' && !isConfirmed && (
          <div>
            {/* Header & Step Tracker */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs uppercase tracking-[0.25em] text-[#B98272] font-semibold block">
                  DIRECT CONCIERGE
                </span>
                <button
                  type="button"
                  onClick={() => setBookingMethod('choose')}
                  className="text-[11px] uppercase tracking-wider text-[#756B63] hover:text-[#24201D] underline cursor-pointer"
                >
                  ← Switch Booking Method
                </button>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl text-[#24201D]">
                STUDIO RESERVATION
              </h2>

              {/* Mobile Step Indicator (<sm) */}
              <div className="sm:hidden mt-2 mb-2">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-inter font-bold text-[10px] uppercase tracking-wider text-[#B98272]">
                    STEP 0{currentStep} OF 05
                  </span>
                  <span className="font-serif font-medium text-[#24201D]">
                    {['Choose Services', 'Stylist', 'Date & Time', 'Guest Info', 'Review & Confirm'][currentStep - 1]}
                  </span>
                </div>
                <div className="w-full h-1 bg-[#EDE5DC] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#B98272] transition-all duration-300"
                    style={{ width: `${(currentStep / 5) * 100}%` }}
                  />
                </div>
              </div>

              {/* Desktop Step Indicator (sm+) */}
              <div className="hidden sm:flex items-center flex-wrap gap-2 mt-3 text-[11px] uppercase tracking-wider text-[#756B63]">
                {['Choose Services', 'Stylist', 'Date & Time', 'Details', 'Confirm'].map((stepName, i) => (
                  <div key={i} className="flex items-center space-x-1.5">
                    <span
                      className={`px-2 py-0.5 font-inter text-[10px] font-semibold ${
                        currentStep === i + 1
                          ? 'bg-[#24201D] text-white'
                          : currentStep > i + 1
                          ? 'text-[#24201D] font-bold'
                          : 'text-[#756B63]/60'
                      }`}
                    >
                      0{i + 1} {stepName}
                    </span>
                    {i < 4 && <span className="text-[#756B63]/30">/</span>}
                  </div>
                ))}
              </div>
            </div>

            {/* Step 01: Choose Services with Responsive Mobile Category Bar and Desktop Sidebar */}
            {currentStep === 1 && (
              <div className="space-y-3 sm:space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-2">
                  <div>
                    <h3 className="font-serif text-base sm:text-lg text-[#24201D] font-medium">
                      Step 01 · Select Services
                    </h3>
                    <p className="text-xs text-[#756B63] font-light">
                      Click to toggle any service. You can select or deselect any number of items.
                    </p>
                  </div>

                  {/* Selected count pill */}
                  <span className={`self-start sm:self-auto text-[10px] sm:text-[11px] uppercase font-inter font-semibold px-2 sm:px-2.5 py-0.5 sm:py-1 tracking-wider ${
                    selectedServiceIds.length > 0 ? 'bg-[#24201D] text-white' : 'bg-[#EDE5DC] text-[#756B63]'
                  }`}>
                    {selectedServiceIds.length} {selectedServiceIds.length === 1 ? 'Service' : 'Services'} Selected
                  </span>
                </div>

                {/* Error message if user tries to continue without choosing any service */}
                {selectionError && (
                  <div className="p-2.5 bg-amber-50 border border-amber-300 text-amber-900 text-xs flex items-center space-x-2 rounded-xs animate-shake">
                    <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
                    <span>{selectionError}</span>
                  </div>
                )}

                {/* Search Box */}
                <div className="relative">
                  <Search className="w-4 h-4 text-[#756B63] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search service (e.g. Eyebrows, Haircut, Balayage, Waxing)..."
                    className="w-full pl-9 pr-8 py-2 bg-white border border-[#24201D]/15 text-xs text-[#24201D] focus:outline-none focus:border-[#24201D]"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#756B63] hover:text-[#24201D]"
                    >
                      ✕
                    </button>
                  )}
                </div>

                {/* Mobile Category Navigator (<sm screens) - Responsive strip matching ServicesPage */}
                <div className="sm:hidden bg-white border border-[#24201D]/15 p-2 rounded-xs shadow-xs">
                  <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-[#24201D]/10 text-xs">
                    <span className="text-[10px] uppercase font-semibold text-[#B98272] flex items-center space-x-1">
                      <Layers className="w-3 h-3" />
                      <span className="truncate max-w-[170px]">
                        {activeCategoryFilter === 'all'
                          ? 'All Categories'
                          : SALON_SECTIONS.find((s) => s.id === activeCategoryFilter)?.name}
                      </span>
                    </span>
                    <button
                      type="button"
                      onClick={() => setMobileCategoryExpanded(!mobileCategoryExpanded)}
                      className="text-[10px] uppercase tracking-wider font-semibold text-[#24201D] underline cursor-pointer"
                    >
                      {mobileCategoryExpanded ? 'COLLAPSE' : 'ALL CATEGORIES'}
                    </button>
                  </div>

                  {mobileCategoryExpanded ? (
                    <div className="grid grid-cols-2 gap-1 max-h-48 overflow-y-auto pt-1 animate-fadeIn">
                      <button
                        type="button"
                        onClick={() => {
                          setActiveCategoryFilter('all');
                          setMobileCategoryExpanded(false);
                        }}
                        className={`text-left px-2 py-1.5 text-[11px] uppercase tracking-wider font-semibold rounded-xs transition-colors cursor-pointer ${
                          activeCategoryFilter === 'all'
                            ? 'bg-[#24201D] text-white'
                            : 'bg-[#F7F3EE] text-[#24201D] hover:bg-[#EDE5DC]'
                        }`}
                      >
                        All Categories
                      </button>
                      {SALON_SECTIONS.map((sec) => {
                        const count = sec.cards.reduce((sum, c) => sum + c.services.length, 0);
                        const isSel = activeCategoryFilter === sec.id;
                        return (
                          <button
                            key={sec.id}
                            type="button"
                            onClick={() => {
                              setActiveCategoryFilter(sec.id);
                              setMobileCategoryExpanded(false);
                            }}
                            className={`text-left px-2 py-1.5 text-[11px] uppercase tracking-wider font-semibold rounded-xs transition-colors cursor-pointer flex items-center justify-between ${
                              isSel
                                ? 'bg-[#24201D] text-white'
                                : 'bg-[#F7F3EE] text-[#24201D] hover:bg-[#EDE5DC]'
                            }`}
                          >
                            <span className="truncate pr-1">{sec.name}</span>
                            <span className={`text-[9px] font-inter px-1 rounded-full ${
                              isSel ? 'bg-[#B98272] text-white' : 'bg-white text-[#756B63]'
                            }`}>
                              {count}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar scroll-smooth py-0.5">
                      <button
                        type="button"
                        onClick={() => setActiveCategoryFilter('all')}
                        className={`shrink-0 px-2.5 py-1 text-[11px] uppercase tracking-wider font-semibold rounded-xs transition-colors cursor-pointer ${
                          activeCategoryFilter === 'all'
                            ? 'bg-[#24201D] text-white shadow-xs'
                            : 'bg-[#F7F3EE] text-[#24201D] hover:bg-[#EDE5DC]'
                        }`}
                      >
                        All Categories
                      </button>
                      {SALON_SECTIONS.map((sec) => {
                        const count = sec.cards.reduce((sum, c) => sum + c.services.length, 0);
                        const isSel = activeCategoryFilter === sec.id;
                        return (
                          <button
                            key={sec.id}
                            type="button"
                            onClick={() => setActiveCategoryFilter(sec.id)}
                            className={`shrink-0 px-2.5 py-1 text-[11px] uppercase tracking-wider font-semibold rounded-xs transition-colors cursor-pointer flex items-center space-x-1.5 ${
                              isSel
                                ? 'bg-[#24201D] text-white shadow-xs'
                                : 'bg-[#F7F3EE] text-[#24201D] hover:bg-[#EDE5DC]'
                            }`}
                          >
                            <span className="whitespace-nowrap">{sec.name}</span>
                            <span className={`text-[9px] font-inter px-1 rounded-full font-bold ${
                              isSel ? 'bg-[#B98272] text-white' : 'bg-white text-[#24201D]'
                            }`}>
                              {count}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Main 2-Column Split: Left Sticky Category Bar (sm+) + Services List */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 border border-[#24201D]/15 bg-white p-2.5 sm:p-3">
                  {/* Left-Side Category Navigation Sidebar on sm+ screens */}
                  <div className="hidden sm:block w-44 shrink-0 sm:border-r sm:border-[#24201D]/10 sm:pr-3">
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-[#B98272] block mb-2">
                      CATEGORIES
                    </span>

                    <div className="flex flex-col gap-1">
                      <button
                        type="button"
                        onClick={() => setActiveCategoryFilter('all')}
                        className={`w-full text-left px-2.5 py-1.5 text-xs uppercase tracking-wider font-semibold rounded-xs transition-colors whitespace-nowrap cursor-pointer ${
                          activeCategoryFilter === 'all'
                            ? 'bg-[#24201D] text-white'
                            : 'hover:bg-[#EDE5DC] text-[#756B63] hover:text-[#24201D]'
                        }`}
                      >
                        All Categories
                      </button>

                      {SALON_SECTIONS.map((sec) => (
                        <button
                          key={sec.id}
                          type="button"
                          onClick={() => setActiveCategoryFilter(sec.id)}
                          className={`w-full text-left px-2.5 py-1.5 text-xs uppercase tracking-wider font-semibold rounded-xs transition-colors whitespace-nowrap text-ellipsis overflow-hidden cursor-pointer ${
                            activeCategoryFilter === sec.id
                              ? 'bg-[#24201D] text-white'
                              : 'hover:bg-[#EDE5DC] text-[#756B63] hover:text-[#24201D]'
                          }`}
                          title={sec.name}
                        >
                          {sec.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Right Services List with Clean Checkboxes */}
                  <div className="flex-1 min-w-0 max-h-72 overflow-y-auto pr-1 space-y-2">
                    {visibleServices.length === 0 ? (
                      <div className="p-8 text-center text-xs text-[#756B63]">
                        No services match your search or filter.
                      </div>
                    ) : (
                      visibleServices.map((s) => {
                        const isChecked = selectedServiceIds.includes(s.id);

                        return (
                          <div
                            key={s.id}
                            onClick={() => toggleService(s.id)}
                            className={`p-2.5 sm:p-3 border flex items-center justify-between cursor-pointer transition-all ${
                              isChecked
                                ? 'bg-[#F7F3EE] border-[#24201D] shadow-xs'
                                : 'bg-white border-[#24201D]/10 hover:border-[#24201D]/30'
                            }`}
                          >
                            <div className="flex items-center space-x-3">
                              {/* Checkbox Icon */}
                              <div
                                className={`w-4 h-4 rounded-xs border flex items-center justify-center transition-colors shrink-0 ${
                                  isChecked
                                    ? 'bg-[#24201D] border-[#24201D] text-white'
                                    : 'border-[#24201D]/30 bg-white'
                                }`}
                              >
                                {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                              </div>

                              <div>
                                <div className="flex items-center space-x-2 flex-wrap">
                                  <span className="font-serif text-sm sm:text-base text-[#24201D] font-medium block">
                                    {s.name}
                                  </span>
                                  <span className="text-[9px] uppercase font-semibold text-[#756B63] bg-[#EDE5DC] px-1.5 py-0.2 rounded-xs">
                                    {s.cardName}
                                  </span>
                                </div>
                                <span className="text-[11px] font-inter text-[#756B63]">
                                  {s.duration}
                                </span>
                              </div>
                            </div>

                            <div className="text-right shrink-0 pl-3">
                              {s.originalPrice && (
                                <span className="line-through text-[10px] font-inter text-[#756B63]/60 block">
                                  {s.originalPrice}
                                </span>
                              )}
                              <span className="text-xs font-inter font-bold text-[#24201D] block price-number">
                                {s.price}
                              </span>
                              {s.discountBadge && (
                                <span className="text-[9px] font-inter uppercase font-semibold text-[#3F6647] bg-[#6B8E72]/15 px-1 py-0.2 rounded-xs">
                                  {s.discountBadge}
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>

                {/* Summary Strip of Selected Services */}
                <div className="p-3 bg-white border border-[#24201D]/15 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <div>
                    <span className="text-[#756B63] block text-[11px]">
                      Selected ({chosenServices.length}):
                    </span>
                    {chosenServices.length === 0 ? (
                      <span className="text-[#756B63]/70 italic text-[11px]">
                        No service selected yet. Click any service above to add it.
                      </span>
                    ) : (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {chosenServices.map((srv) => (
                          <span
                            key={srv.id}
                            className="inline-flex items-center space-x-1 bg-[#EDE5DC] text-[#24201D] px-2 py-0.5 text-[10px] font-medium"
                          >
                            <span>{srv.name}</span>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleService(srv.id);
                              }}
                              className="hover:text-red-600 font-bold ml-1 cursor-pointer"
                              title="Remove"
                            >
                              ✕
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-[11px] text-[#756B63] block">Starting Total</span>
                    <span className="font-inter font-bold text-base text-[#24201D] price-number">
                      From ${totalPrice}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Step 02: Choose Stylist */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <h3 className="font-serif text-lg text-[#24201D] font-medium">
                  Step 02 · Choose Your Stylist / Specialist
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-72 overflow-y-auto pr-1">
                  <label
                    onClick={() => setStylistId('no-preference')}
                    className={`p-3.5 border cursor-pointer transition-all flex items-center space-x-3 ${
                      stylistId === 'no-preference'
                        ? 'bg-white border-[#24201D] shadow-xs'
                        : 'bg-white/60 border-[#24201D]/15 hover:border-[#24201D]/40'
                    }`}
                  >
                    <input
                      type="radio"
                      name="stylist"
                      checked={stylistId === 'no-preference'}
                      onChange={() => setStylistId('no-preference')}
                      className="accent-[#24201D]"
                    />
                    <div>
                      <span className="font-serif text-base text-[#24201D] block">
                        No Preference
                      </span>
                      <span className="text-xs text-[#756B63] font-light">
                        First available master artist
                      </span>
                    </div>
                  </label>

                  {STYLISTS.map((st) => (
                    <label
                      key={st.id}
                      onClick={() => setStylistId(st.id)}
                      className={`p-3.5 border cursor-pointer transition-all flex items-center space-x-3 ${
                        stylistId === st.id
                          ? 'bg-white border-[#24201D] shadow-xs'
                          : 'bg-white/60 border-[#24201D]/15 hover:border-[#24201D]/40'
                      }`}
                    >
                      <input
                        type="radio"
                        name="stylist"
                        checked={stylistId === st.id}
                        onChange={() => setStylistId(st.id)}
                        className="accent-[#24201D]"
                      />
                      <div className="w-10 h-10 rounded-full overflow-hidden bg-[#EDE5DC] shrink-0">
                        <img
                          src={st.portrait}
                          alt={st.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <span className="font-serif text-base text-[#24201D] block">
                          {st.name}
                        </span>
                        <span className="text-[11px] text-[#756B63] font-light">
                          {st.role}
                        </span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Step 03: Date & Time */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <h3 className="font-serif text-lg text-[#24201D] font-medium">
                  Step 03 · Select Date & Time
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#24201D] mb-1.5">
                      Select Date
                    </label>
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      min={getTodayDate()}
                      className="w-full px-4 py-3 bg-white border border-[#24201D]/15 text-xs text-[#24201D] font-inter focus:outline-none focus:border-[#24201D]"
                    />
                    <p className="text-[11px] text-[#756B63] mt-1.5 font-light">
                      LUMÉ SoHo sanctuary is open Monday – Saturday (Closed Sundays).
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#24201D] mb-1.5">
                      Available Time Slots
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {timeSlots.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setSelectedTime(slot)}
                          className={`py-2 px-3 text-xs uppercase tracking-wider border font-inter font-medium transition-colors cursor-pointer ${
                            selectedTime === slot
                              ? 'bg-[#24201D] text-white border-[#24201D]'
                              : 'bg-white text-[#24201D] border-[#24201D]/15 hover:border-[#24201D]'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 04: Your Details */}
            {currentStep === 4 && (
              <div className="space-y-4">
                <h3 className="font-serif text-lg text-[#24201D] font-medium">
                  Step 04 · Guest Information
                </h3>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block uppercase tracking-wider font-semibold text-[#24201D] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={clientDetails.name}
                      onChange={(e) => setClientDetails({ ...clientDetails, name: e.target.value })}
                      placeholder="e.g. Victoria Sterling"
                      className="w-full px-4 py-2.5 bg-white border border-[#24201D]/15 focus:border-[#24201D] focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block uppercase tracking-wider font-semibold text-[#24201D] mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={clientDetails.email}
                        onChange={(e) => setClientDetails({ ...clientDetails, email: e.target.value })}
                        placeholder="victoria@example.com"
                        className="w-full px-4 py-2.5 bg-white border border-[#24201D]/15 focus:border-[#24201D] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block uppercase tracking-wider font-semibold text-[#24201D] mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={clientDetails.phone}
                        onChange={(e) => setClientDetails({ ...clientDetails, phone: e.target.value })}
                        placeholder="(555) 000-0000"
                        className="w-full px-4 py-2.5 bg-white border border-[#24201D]/15 focus:border-[#24201D] focus:outline-none font-inter"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block uppercase tracking-wider font-semibold text-[#24201D] mb-1">
                      Skin/Hair Notes or Specific Requests (Optional)
                    </label>
                    <textarea
                      rows={2}
                      value={clientDetails.notes}
                      onChange={(e) => setClientDetails({ ...clientDetails, notes: e.target.value })}
                      placeholder="Sensitivities, retinoid use, color history, hair length..."
                      className="w-full px-4 py-2 bg-white border border-[#24201D]/15 focus:border-[#24201D] focus:outline-none resize-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 05: Confirm Request */}
            {currentStep === 5 && (
              <div className="space-y-4">
                <h3 className="font-serif text-lg text-[#24201D] font-medium">
                  Step 05 · Review & Confirm
                </h3>

                <div className="bg-white p-5 border border-[#24201D]/15 divide-y divide-[#24201D]/10 text-xs space-y-2.5 shadow-xs">
                  <div className="pb-2">
                    <span className="text-[#756B63] block mb-1">Selected Services ({chosenServices.length}):</span>
                    <div className="space-y-1">
                      {chosenServices.map((srv) => (
                        <div key={srv.id} className="flex justify-between font-medium text-[#24201D]">
                          <span>{srv.name} <span className="text-[10px] text-[#756B63]">({srv.cardName})</span></span>
                          <span className="font-inter font-semibold">{srv.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between py-2">
                    <span className="text-[#756B63]">Master Artist:</span>
                    <span className="font-medium text-[#24201D]">
                      {chosenStylist ? chosenStylist.name : 'No Preference (First Available)'}
                    </span>
                  </div>

                  <div className="flex justify-between py-2">
                    <span className="text-[#756B63]">Date & Time:</span>
                    <span className="font-inter font-semibold text-[#24201D]">{selectedDate} at {selectedTime}</span>
                  </div>

                  <div className="flex justify-between py-2">
                    <span className="text-[#756B63]">Client Name:</span>
                    <span className="font-medium text-[#24201D]">{clientDetails.name || 'Not provided'}</span>
                  </div>

                  <div className="flex justify-between pt-2">
                    <span className="text-[#756B63]">Combined Starting Total:</span>
                    <span className="font-inter font-bold text-base text-[#24201D] price-number">From ${totalPrice}</span>
                  </div>
                </div>

                {submissionError && (
                  <div className="p-3 bg-rose-50 border border-rose-200 text-[#8A5243] text-xs flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 mt-0.5" />
                    <div>
                      <p className="font-semibold text-rose-900">Submission Notice</p>
                      <p className="font-light">{submissionError}</p>
                    </div>
                  </div>
                )}

                <p className="text-[11px] text-[#756B63] italic">
                  * Note: Submitting registers your request as Pending. Our concierge desk will review calendar availability and confirm your reservation via email.
                </p>
              </div>
            )}

            {/* Navigation Buttons between Steps */}
            <div className="mt-6 pt-3 border-t border-[#24201D]/10 flex items-center justify-between gap-3">
              {currentStep > 1 ? (
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={handlePrev}
                  className="flex-1 sm:flex-initial px-4 py-2.5 border border-[#24201D]/20 text-[#24201D] text-xs uppercase tracking-wider font-medium hover:border-[#24201D] cursor-pointer flex items-center justify-center space-x-1 disabled:opacity-50"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>BACK</span>
                </button>
              ) : (
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => setBookingMethod('choose')}
                  className="px-3 py-2 text-[#756B63] hover:text-[#24201D] text-xs uppercase tracking-wider font-medium cursor-pointer"
                >
                  ← METHOD
                </button>
              )}

              {currentStep < 5 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex-1 sm:flex-initial px-6 py-2.5 bg-[#24201D] text-white text-xs uppercase tracking-wider font-medium hover:bg-[#38322E] cursor-pointer flex items-center justify-center space-x-1"
                >
                  <span>CONTINUE</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={handleConfirm}
                  className="flex-1 sm:flex-initial px-6 py-2.5 bg-[#24201D] text-white text-xs uppercase tracking-wider font-semibold hover:bg-[#38322E] cursor-pointer shadow-md flex items-center justify-center space-x-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>SUBMITTING REQUEST...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-[#EDE5DC]" />
                      <span>CONFIRM REQUEST</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
