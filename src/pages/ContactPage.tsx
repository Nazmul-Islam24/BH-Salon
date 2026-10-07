import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, Navigation } from 'lucide-react';
import { SALON_INFO, SALON_SECTIONS } from '../data/salonData';
import lumeSalon from '../assets/images/Lume-Salon.avif';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    serviceInterest: '', // Starts completely unselected as requested
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="pt-20 pb-20 bg-[#F7F3EE]">
      {/* Page Hero - Featuring background stylish hair / beautiful women image over underlying bg-[#EDE5DC]/40 */}
      <section className="relative py-12 sm:py-16 bg-[#EDE5DC]/40 border-b border-[#24201D]/10 text-center overflow-hidden">
        {/* Background stylish hair & beautiful women image (If removed or commented out, underlying bg color displays seamlessly) */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <img
            src={lumeSalon}
            alt="LUMÉ concierge and studio appointments"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center opacity-40 mix-blend-multiply scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#EDE5DC]/40 via-transparent to-[#EDE5DC]/80" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
          <span className="text-xs uppercase tracking-[0.25em] text-[#B98272] font-semibold block mb-1">
            CONCIERGE & STUDIO
          </span>
          <h1 className="font-serif font-normal text-3xl sm:text-5xl lg:text-6xl text-[#24201D] tracking-tight mb-2">
            CONNECT WITH LUMÉ
          </h1>
          <p className="text-xs sm:text-sm text-[#756B63] max-w-lg mx-auto font-light leading-relaxed">
            Have questions regarding custom treatments, styling, or scheduling? Our concierge team is here to assist.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Details Column with Daily Schedule */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#24201D] mb-2">
                SoHo Studio Location
              </h2>
              <p className="text-xs sm:text-sm text-[#756B63] font-light leading-relaxed">
                We are situated on historic Mercer Street in SoHo. Walk-ins are accommodated upon artist availability, though appointments are highly recommended.
              </p>
            </div>

            <div className="space-y-3.5 pt-3 border-t border-[#24201D]/10">
              <div className="flex items-start space-x-3.5">
                <MapPin className="w-4 h-4 text-[#B98272] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-[#24201D]">
                    Studio Address
                  </h4>
                  <p className="text-xs sm:text-sm text-[#756B63] font-light">
                    {SALON_INFO.address}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <Phone className="w-4 h-4 text-[#B98272] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-[#24201D]">
                    Direct Telephone
                  </h4>
                  <a
                    href={`tel:${SALON_INFO.phone}`}
                    className="text-xs sm:text-sm font-inter text-[#24201D] hover:text-[#B98272] transition-colors"
                  >
                    {SALON_INFO.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <Mail className="w-4 h-4 text-[#B98272] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-[#24201D]">
                    Email Inquiries
                  </h4>
                  <a
                    href={`mailto:${SALON_INFO.email}`}
                    className="text-xs sm:text-sm text-[#24201D] hover:text-[#B98272] transition-colors"
                  >
                    {SALON_INFO.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Daily Hours listed for every day (Prompt requirement) */}
            <div className="pt-4 border-t border-[#24201D]/10">
              <div className="flex items-center space-x-2 mb-3">
                <Clock className="w-4 h-4 text-[#B98272]" />
                <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#24201D]">
                  Daily Studio Schedule
                </h4>
              </div>

              <div className="bg-white/80 border border-[#24201D]/15 divide-y divide-[#24201D]/10 text-xs shadow-xs">
                {SALON_INFO.schedule.map((slot) => (
                  <div key={slot.day} className="flex items-center justify-between px-3.5 py-2">
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

          {/* Right Column: Inquiry Form */}
          <div className="lg:col-span-6 bg-white p-5 sm:p-8 border border-[#24201D]/15 shadow-xs">
            <h3 className="font-serif text-2xl sm:text-3xl text-[#24201D] mb-1.5">
              Send an Inquiry
            </h3>
            <p className="text-xs text-[#756B63] font-light mb-5">
              Our concierge team responds within 24 business hours.
            </p>

            {submitted ? (
              <div className="p-8 bg-[#EDE5DC]/40 border border-[#24201D]/10 text-center space-y-3">
                <CheckCircle className="w-8 h-8 text-[#6B8E72] mx-auto" />
                <h4 className="font-serif text-2xl text-[#24201D]">Thank You</h4>
                <p className="text-xs text-[#756B63] leading-relaxed">
                  Your message has been received. A LUMÉ hair concierge will contact you shortly to address your inquiry.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-5 py-2 border border-[#24201D] text-xs uppercase tracking-wider font-medium text-[#24201D] hover:bg-[#24201D] hover:text-white transition-colors cursor-pointer"
                >
                  SEND ANOTHER NOTE
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block uppercase tracking-wider font-semibold text-[#24201D] mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Charlotte Miller"
                    className="w-full px-3.5 py-2.5 bg-[#F7F3EE] border border-[#24201D]/15 focus:border-[#24201D] focus:outline-none transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block uppercase tracking-wider font-semibold text-[#24201D] mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="charlotte@example.com"
                      className="w-full px-3.5 py-2.5 bg-[#F7F3EE] border border-[#24201D]/15 focus:border-[#24201D] focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block uppercase tracking-wider font-semibold text-[#24201D] mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="(555) 000-0000"
                      className="w-full px-3.5 py-2.5 bg-[#F7F3EE] border border-[#24201D]/15 focus:border-[#24201D] focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Service of Interest field with 4-word placeholder and no preselection */}
                <div>
                  <label className="block uppercase tracking-wider font-semibold text-[#24201D] mb-1">
                    Service of Interest *
                  </label>
                  <select
                    required
                    value={formData.serviceInterest}
                    onChange={(e) => setFormData({ ...formData, serviceInterest: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#F7F3EE] border border-[#24201D]/15 focus:border-[#24201D] focus:outline-none transition-colors cursor-pointer text-xs"
                  >
                    {/* Exact 4-word descriptive placeholder as requested */}
                    <option value="" disabled>
                      Select your service interest
                    </option>

                    {/* Dynamically mapped from website sections and cards */}
                    {SALON_SECTIONS.map((sec) => (
                      <optgroup key={sec.id} label={sec.name}>
                        {sec.cards.map((card) => (
                          <option key={card.id} value={`${sec.name} · ${card.name}`}>
                            {card.name} ({card.services.length} services)
                          </option>
                        ))}
                      </optgroup>
                    ))}

                    <optgroup label="GENERAL & CONCIERGE">
                      <option value="General Consultation & Hair Assessment">
                        General Consultation & Hair Assessment
                      </option>
                      <option value="Bespoke Bridal or Group Inquiry">
                        Bespoke Bridal or Group Inquiry
                      </option>
                      <option value="Custom Treatment Package">
                        Custom Treatment Package
                      </option>
                    </optgroup>
                  </select>
                </div>

                <div>
                  <label className="block uppercase tracking-wider font-semibold text-[#24201D] mb-1">
                    Your Message
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your hair history, desired look, or questions..."
                    className="w-full px-3.5 py-2.5 bg-[#F7F3EE] border border-[#24201D]/15 focus:border-[#24201D] focus:outline-none transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#24201D] text-white hover:bg-[#38322E] text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-200 cursor-pointer shadow-xs"
                >
                  SUBMIT INQUIRY
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

