import React from 'react';
import {
  Calendar,
  Clock,
  User,
  Phone,
  Eye,
  CheckCircle2,
  XCircle,
  Sparkles,
  Inbox
} from 'lucide-react';
import { Appointment, BookingStatus } from '../types';

interface AdminBookingTableProps {
  appointments: Appointment[];
  loading?: boolean;
  onSelectAppointment: (appointment: Appointment) => void;
  onQuickStatusUpdate: (id: string, newStatus: BookingStatus, prevStatus?: BookingStatus) => Promise<void>;
}

export const AdminBookingTable: React.FC<AdminBookingTableProps> = ({
  appointments,
  loading = false,
  onSelectAppointment,
  onQuickStatusUpdate,
}) => {
  const getStatusBadge = (status: BookingStatus) => {
    switch (status) {
      case 'pending':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wide bg-amber-50 text-amber-900 border border-amber-300">
            Pending
          </span>
        );
      case 'confirmed':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wide bg-emerald-50 text-emerald-900 border border-emerald-300">
            Confirmed
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wide bg-purple-50 text-purple-900 border border-purple-300">
            Completed
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wide bg-rose-50 text-rose-900 border border-rose-300">
            Cancelled
          </span>
        );
    }
  };

  if (loading) {
    return (
      <div className="py-16 text-center">
        <div className="w-8 h-8 border-2 border-[#B98272] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-xs uppercase tracking-wider text-[#756B63] font-medium">
          Loading Appointments...
        </p>
      </div>
    );
  }

  if (appointments.length === 0) {
    return (
      <div className="py-16 bg-white border border-[#24201D]/10 text-center px-4">
        <Inbox className="w-10 h-10 text-[#756B63]/40 mx-auto mb-3" />
        <h3 className="font-serif text-lg font-medium text-[#24201D] mb-1">
          No Bookings Found
        </h3>
        <p className="text-xs text-[#756B63] font-light max-w-sm mx-auto">
          No appointments currently match your search or filter parameters.
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Desktop Table View (>=md) */}
      <div className="hidden md:block overflow-x-auto bg-white border border-[#24201D]/15 shadow-xs">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-[#EDE5DC]/40 border-b border-[#24201D]/15 text-[#24201D] uppercase tracking-wider font-semibold text-[11px]">
              <th className="py-3 px-4">Reference</th>
              <th className="py-3 px-4">Guest</th>
              <th className="py-3 px-4">Services</th>
              <th className="py-3 px-4">Stylist</th>
              <th className="py-3 px-4">Date & Time</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#24201D]/10">
            {appointments.map((apt) => (
              <tr
                key={apt.id}
                className="hover:bg-[#F7F3EE]/60 transition-colors cursor-pointer group"
                onClick={() => onSelectAppointment(apt)}
              >
                {/* Reference */}
                <td className="py-3.5 px-4 font-mono font-semibold text-[#24201D]">
                  {apt.booking_reference}
                </td>

                {/* Guest */}
                <td className="py-3.5 px-4">
                  <div className="font-medium text-[#24201D]">{apt.customer_name}</div>
                  <div className="text-[11px] text-[#756B63] font-light">{apt.customer_phone}</div>
                </td>

                {/* Services */}
                <td className="py-3.5 px-4 max-w-[200px]">
                  <div className="font-medium text-[#24201D] truncate">
                    {apt.selected_services[0]?.name || 'Service'}
                  </div>
                  {apt.selected_services.length > 1 && (
                    <div className="text-[10px] text-[#B98272] font-semibold">
                      +{apt.selected_services.length - 1} more service{apt.selected_services.length > 2 ? 's' : ''}
                    </div>
                  )}
                  <div className="text-[11px] font-inter text-[#756B63]">
                    From ${apt.total_price || 0}
                  </div>
                </td>

                {/* Stylist */}
                <td className="py-3.5 px-4 text-[#50463E]">
                  {apt.stylist_name || 'No Preference'}
                </td>

                {/* Date & Time */}
                <td className="py-3.5 px-4">
                  <div className="font-inter font-medium text-[#24201D]">{apt.appointment_date}</div>
                  <div className="text-[11px] text-[#756B63]">{apt.appointment_time}</div>
                </td>

                {/* Status */}
                <td className="py-3.5 px-4">{getStatusBadge(apt.status)}</td>

                {/* Actions */}
                <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center justify-end gap-1.5">
                    <button
                      type="button"
                      onClick={() => onSelectAppointment(apt)}
                      className="p-1.5 bg-[#EDE5DC]/60 hover:bg-[#EDE5DC] text-[#24201D] rounded-xs transition-colors cursor-pointer"
                      title="View Details"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>

                    {apt.status === 'pending' && (
                      <button
                        type="button"
                        onClick={() => onQuickStatusUpdate(apt.id, 'confirmed', apt.status)}
                        className="p-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-xs transition-colors cursor-pointer"
                        title="Quick Confirm"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </button>
                    )}

                    {apt.status === 'confirmed' && (
                      <button
                        type="button"
                        onClick={() => onQuickStatusUpdate(apt.id, 'completed', apt.status)}
                        className="p-1.5 bg-purple-50 hover:bg-purple-100 text-purple-800 border border-purple-300 rounded-xs transition-colors cursor-pointer"
                        title="Mark Completed"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-purple-700" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card Stack (<md) */}
      <div className="md:hidden space-y-3">
        {appointments.map((apt) => (
          <div
            key={apt.id}
            onClick={() => onSelectAppointment(apt)}
            className="bg-white p-4 border border-[#24201D]/15 shadow-xs space-y-3 cursor-pointer"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="font-mono font-bold text-xs text-[#24201D] block">
                  {apt.booking_reference}
                </span>
                <span className="font-serif font-medium text-sm text-[#24201D] mt-0.5 block">
                  {apt.customer_name}
                </span>
              </div>
              <div>{getStatusBadge(apt.status)}</div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs py-2 border-y border-[#24201D]/10">
              <div>
                <span className="text-[10px] text-[#756B63] block uppercase tracking-wider">Date & Time</span>
                <span className="font-inter font-medium text-[#24201D]">{apt.appointment_date}</span>
                <span className="text-[11px] text-[#756B63] block">{apt.appointment_time}</span>
              </div>
              <div>
                <span className="text-[10px] text-[#756B63] block uppercase tracking-wider">Services ({apt.selected_services.length})</span>
                <span className="font-medium text-[#24201D] truncate block">
                  {apt.selected_services[0]?.name || 'Service'}
                </span>
                <span className="font-inter text-[11px] text-[#756B63] block">
                  From ${apt.total_price || 0}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <span className="text-[11px] text-[#756B63]">
                Artist: {apt.stylist_name || 'No Preference'}
              </span>
              <button
                type="button"
                className="text-xs uppercase font-semibold text-[#B98272] tracking-wider"
              >
                View Details →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

