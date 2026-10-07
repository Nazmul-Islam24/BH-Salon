import React, { useState } from 'react';
import {
  X,
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  FileText,
  CheckCircle2,
  XCircle,
  Sparkles,
  AlertTriangle,
  Scissors,
  Printer
} from 'lucide-react';
import { Appointment, BookingStatus } from '../types';

interface AdminBookingDetailsProps {
  appointment: Appointment | null;
  isOpen: boolean;
  onClose: () => void;
  onStatusChange: (id: string, newStatus: BookingStatus, prevStatus?: BookingStatus) => Promise<void>;
}

export const AdminBookingDetails: React.FC<AdminBookingDetailsProps> = ({
  appointment,
  isOpen,
  onClose,
  onStatusChange,
}) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [confirmCancelPrompt, setConfirmCancelPrompt] = useState(false);

  if (!isOpen || !appointment) return null;

  const handleAction = async (newStatus: BookingStatus) => {
    setIsUpdating(true);
    try {
      await onStatusChange(appointment.id, newStatus, appointment.status);
      setConfirmCancelPrompt(false);
    } finally {
      setIsUpdating(false);
    }
  };

  const getStatusBadge = (status: BookingStatus) => {
    switch (status) {
      case 'pending':
        return (
          <span className="px-3 py-1 bg-amber-50 text-amber-800 border border-amber-200 text-xs font-semibold uppercase tracking-wider rounded-full">
            Pending Confirmation
          </span>
        );
      case 'confirmed':
        return (
          <span className="px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold uppercase tracking-wider rounded-full">
            Confirmed
          </span>
        );
      case 'completed':
        return (
          <span className="px-3 py-1 bg-purple-50 text-purple-800 border border-purple-200 text-xs font-semibold uppercase tracking-wider rounded-full">
            Completed
          </span>
        );
      case 'cancelled':
        return (
          <span className="px-3 py-1 bg-rose-50 text-rose-800 border border-rose-200 text-xs font-semibold uppercase tracking-wider rounded-full">
            Cancelled
          </span>
        );
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[#24201D]/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-[#F7F3EE] max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-[#24201D]/20 text-[#24201D] relative max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 bg-white/80 hover:bg-white text-[#24201D] rounded-full flex items-center justify-center cursor-pointer shadow-xs transition-colors"
          aria-label="Close details"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="border-b border-[#24201D]/15 pb-4 mb-6">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#B98272] font-semibold block mb-1">
            APPOINTMENT SPECIFICATION
          </span>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h2 className="font-mono text-xl sm:text-2xl font-bold tracking-tight text-[#24201D]">
              {appointment.booking_reference}
            </h2>
            <div>{getStatusBadge(appointment.status)}</div>
          </div>
          <p className="text-[11px] text-[#756B63] mt-1">
            Submitted: {new Date(appointment.created_at).toLocaleString()}
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-6 text-xs sm:text-sm">
          {/* Guest Information */}
          <div className="bg-white p-4 border border-[#24201D]/10 space-y-2.5">
            <h4 className="font-serif text-sm font-semibold text-[#24201D] flex items-center gap-1.5 pb-2 border-b border-[#24201D]/10">
              <User className="w-4 h-4 text-[#B98272]" />
              <span>Guest Details</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div>
                <span className="text-[11px] text-[#756B63] block">Full Name:</span>
                <span className="font-medium text-[#24201D] text-sm">{appointment.customer_name}</span>
              </div>
              <div>
                <span className="text-[11px] text-[#756B63] block">Phone:</span>
                <a
                  href={`tel:${appointment.customer_phone}`}
                  className="font-inter font-medium text-[#24201D] hover:underline"
                >
                  {appointment.customer_phone}
                </a>
              </div>
              <div className="sm:col-span-2">
                <span className="text-[11px] text-[#756B63] block">Email:</span>
                <a
                  href={`mailto:${appointment.customer_email}`}
                  className="font-medium text-[#8A5243] hover:underline"
                >
                  {appointment.customer_email}
                </a>
              </div>
            </div>
          </div>

          {/* Appointment Schedule */}
          <div className="bg-white p-4 border border-[#24201D]/10 space-y-2.5">
            <h4 className="font-serif text-sm font-semibold text-[#24201D] flex items-center gap-1.5 pb-2 border-b border-[#24201D]/10">
              <Calendar className="w-4 h-4 text-[#B98272]" />
              <span>Schedule & Master Artist</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div>
                <span className="text-[11px] text-[#756B63] block">Date:</span>
                <span className="font-inter font-semibold text-[#24201D] text-sm">
                  {appointment.appointment_date}
                </span>
              </div>
              <div>
                <span className="text-[11px] text-[#756B63] block">Time Slot:</span>
                <span className="font-inter font-semibold text-[#24201D] text-sm">
                  {appointment.appointment_time}
                </span>
              </div>
              <div>
                <span className="text-[11px] text-[#756B63] block">Assigned Stylist:</span>
                <span className="font-medium text-[#24201D] text-sm">
                  {appointment.stylist_name || 'No Preference'}
                </span>
              </div>
            </div>
          </div>

          {/* Selected Services Snapshot */}
          <div className="bg-white p-4 border border-[#24201D]/10 space-y-2.5">
            <h4 className="font-serif text-sm font-semibold text-[#24201D] flex items-center justify-between pb-2 border-b border-[#24201D]/10">
              <span className="flex items-center gap-1.5">
                <Scissors className="w-4 h-4 text-[#B98272]" />
                <span>Selected Services ({appointment.selected_services.length})</span>
              </span>
              <span className="font-inter font-bold text-sm text-[#24201D]">
                Total: From ${appointment.total_price || 0}
              </span>
            </h4>
            <div className="space-y-2">
              {appointment.selected_services.map((srv, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between py-1.5 px-2 bg-[#F7F3EE] text-xs font-medium text-[#24201D]"
                >
                  <div>
                    <span>{srv.name}</span>
                    {srv.duration && (
                      <span className="text-[11px] text-[#756B63] ml-2">({srv.duration})</span>
                    )}
                  </div>
                  <span className="font-inter font-semibold text-[#24201D]">
                    {srv.price || `$${srv.priceNumber || 0}`}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Client Notes */}
          {appointment.notes && (
            <div className="bg-white p-4 border border-[#24201D]/10 space-y-1.5">
              <h4 className="font-serif text-sm font-semibold text-[#24201D] flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-[#B98272]" />
                <span>Client Notes & Requests</span>
              </h4>
              <p className="text-xs text-[#50463E] italic font-light bg-[#F7F3EE] p-3 leading-relaxed">
                “{appointment.notes}”
              </p>
            </div>
          )}
        </div>

        {/* Cancellation Confirmation Dialog */}
        {confirmCancelPrompt && (
          <div className="mt-6 p-4 bg-rose-50 border border-rose-300 space-y-3">
            <div className="flex items-center gap-2 text-rose-800 text-xs font-semibold">
              <AlertTriangle className="w-4 h-4" />
              <span>Confirm Appointment Cancellation</span>
            </div>
            <p className="text-xs text-rose-700 font-light">
              Are you sure you want to cancel this booking? This will update the status to Cancelled and dispatch a notification email to {appointment.customer_email}.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                disabled={isUpdating}
                onClick={() => handleAction('cancelled')}
                className="px-4 py-2 bg-rose-700 text-white text-xs uppercase font-semibold hover:bg-rose-800 transition-colors cursor-pointer"
              >
                Yes, Cancel Booking
              </button>
              <button
                type="button"
                onClick={() => setConfirmCancelPrompt(false)}
                className="px-4 py-2 border border-rose-300 text-rose-800 text-xs uppercase font-semibold hover:bg-rose-100 transition-colors cursor-pointer"
              >
                Go Back
              </button>
            </div>
          </div>
        )}

        {/* Status Transition Action Buttons */}
        {!confirmCancelPrompt && (
          <div className="mt-8 pt-4 border-t border-[#24201D]/15 flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs text-[#756B63]">
              Manage Status Workflow:
            </span>

            <div className="flex flex-wrap items-center gap-2">
              {appointment.status === 'pending' && (
                <button
                  type="button"
                  disabled={isUpdating}
                  onClick={() => handleAction('confirmed')}
                  className="px-4 py-2.5 bg-[#3F6647] hover:bg-[#2F4D35] text-white text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer shadow-xs flex items-center gap-1.5 disabled:opacity-50"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Confirm Appointment</span>
                </button>
              )}

              {(appointment.status === 'pending' || appointment.status === 'confirmed') && (
                <button
                  type="button"
                  disabled={isUpdating}
                  onClick={() => setConfirmCancelPrompt(true)}
                  className="px-4 py-2.5 border border-rose-300 text-rose-800 hover:bg-rose-50 text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
                >
                  <XCircle className="w-4 h-4" />
                  <span>Cancel Booking</span>
                </button>
              )}

              {appointment.status === 'confirmed' && (
                <button
                  type="button"
                  disabled={isUpdating}
                  onClick={() => handleAction('completed')}
                  className="px-4 py-2.5 bg-[#24201D] hover:bg-[#3D3732] text-white text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer shadow-xs flex items-center gap-1.5 disabled:opacity-50"
                >
                  <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                  <span>Mark Completed</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => window.print()}
                className="px-4 py-2.5 bg-white border border-[#24201D] text-[#24201D] text-xs uppercase tracking-wider font-semibold hover:bg-stone-50 transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs"
                title="Print or Save official receipt as PDF"
              >
                <Printer className="w-4 h-4 text-[#D4AF37]" />
                <span>Print Receipt</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 border border-[#24201D]/20 text-[#24201D] text-xs uppercase tracking-wider font-semibold hover:border-[#24201D] transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

