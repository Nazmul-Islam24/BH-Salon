import React from 'react';
import { Appointment } from '../types';
import { Clock, User, Scissors, Calendar as CalendarIcon } from 'lucide-react';

interface MonthlyCalendarViewProps {
  year: number;
  month: number; // 1-indexed (1 = Jan, 10 = Oct)
  appointments: Appointment[];
  onSelectAppointment: (appointment: Appointment) => void;
  onDateClick?: (dateStr: string) => void;
}

export const MonthlyCalendarView: React.FC<MonthlyCalendarViewProps> = ({
  year,
  month,
  appointments,
  onSelectAppointment,
  onDateClick,
}) => {
  // Compute days in month and starting day of week
  const firstDayOfWeek = new Date(year, month - 1, 1).getDay(); // 0 = Sunday
  const daysInMonth = new Date(year, month, 0).getDate();
  const prevMonthDays = new Date(year, month - 1, 0).getDate();

  // Today in local format YYYY-MM-DD
  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(
    today.getDate()
  ).padStart(2, '0')}`;

  // Group appointments by date string YYYY-MM-DD
  const appointmentsByDate = React.useMemo(() => {
    const map = new Map<string, Appointment[]>();
    appointments.forEach((app) => {
      if (!app.appointment_date) return;
      const list = map.get(app.appointment_date) || [];
      list.push(app);
      map.set(app.appointment_date, list);
    });
    return map;
  }, [appointments]);

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Build grid cells
  const cells: {
    dayNumber: number;
    dateStr: string;
    isCurrentMonth: boolean;
    isToday: boolean;
    appointments: Appointment[];
  }[] = [];

  // 1. Previous month trailing days
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    const day = prevMonthDays - i;
    const prevMonth = month === 1 ? 12 : month - 1;
    const prevYear = month === 1 ? year - 1 : year;
    const dateStr = `${prevYear}-${String(prevMonth).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    cells.push({
      dayNumber: day,
      dateStr,
      isCurrentMonth: false,
      isToday: dateStr === todayStr,
      appointments: appointmentsByDate.get(dateStr) || [],
    });
  }

  // 2. Current month days
  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    cells.push({
      dayNumber: day,
      dateStr,
      isCurrentMonth: true,
      isToday: dateStr === todayStr,
      appointments: appointmentsByDate.get(dateStr) || [],
    });
  }

  // 3. Next month leading days to complete the 35 or 42 grid
  const remaining = (7 - (cells.length % 7)) % 7;
  for (let day = 1; day <= remaining; day++) {
    const nextMonth = month === 12 ? 1 : month + 1;
    const nextYear = month === 12 ? year + 1 : year;
    const dateStr = `${nextYear}-${String(nextMonth).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    cells.push({
      dayNumber: day,
      dateStr,
      isCurrentMonth: false,
      isToday: dateStr === todayStr,
      appointments: appointmentsByDate.get(dateStr) || [],
    });
  }

  const getStatusDotColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-emerald-500 border-emerald-600 text-emerald-900 bg-emerald-50';
      case 'pending':
        return 'bg-amber-500 border-amber-500 text-amber-900 bg-amber-50';
      case 'completed':
        return 'bg-slate-400 border-slate-500 text-slate-800 bg-slate-50';
      case 'cancelled':
        return 'bg-rose-400 border-rose-500 text-rose-800 bg-rose-50 line-through opacity-60';
      default:
        return 'bg-stone-400 border-stone-500 text-stone-800 bg-stone-50';
    }
  };

  return (
    <div className="bg-white border border-[#24201D]/15 shadow-sm overflow-hidden">
      {/* Calendar Weekday Headers */}
      <div className="grid grid-cols-7 bg-[#24201D] text-[#EDE5DC] text-center text-xs font-semibold py-2.5 tracking-wider uppercase border-b border-[#24201D]/20">
        {daysOfWeek.map((day) => (
          <div key={day} className="py-1">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Days Grid */}
      <div className="grid grid-cols-7 auto-rows-fr divide-x divide-y divide-[#24201D]/10 bg-[#F7F3EE]/40">
        {cells.map((cell, idx) => {
          const hasBookings = cell.appointments.length > 0;
          return (
            <div
              key={idx}
              onClick={() => onDateClick && onDateClick(cell.dateStr)}
              className={`min-h-[110px] sm:min-h-[125px] p-2 flex flex-col transition-colors ${
                cell.isCurrentMonth ? 'bg-white hover:bg-stone-50/80' : 'bg-[#EDE5DC]/25 text-stone-400'
              } ${cell.isToday ? 'ring-2 ring-inset ring-[#D4AF37] bg-amber-50/20' : ''}`}
            >
              {/* Day Header */}
              <div className="flex items-center justify-between mb-1.5">
                <span
                  className={`text-xs font-semibold ${
                    cell.isToday
                      ? 'w-6 h-6 rounded-full bg-[#24201D] text-[#D4AF37] flex items-center justify-center font-bold'
                      : cell.isCurrentMonth
                      ? 'text-[#24201D]'
                      : 'text-stone-400'
                  }`}
                >
                  {cell.dayNumber}
                </span>

                {hasBookings && (
                  <span className="text-[10px] font-semibold px-1.5 py-0.2 bg-[#EDE5DC] text-[#24201D] rounded-xs font-inter">
                    {cell.appointments.length} {cell.appointments.length === 1 ? 'app' : 'apps'}
                  </span>
                )}
              </div>

              {/* Day Bookings List */}
              <div className="flex-1 space-y-1 overflow-y-auto max-h-[85px] scrollbar-thin">
                {cell.appointments.map((app) => {
                  const statusStyle = getStatusDotColor(app.status);
                  return (
                    <button
                      key={app.id}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectAppointment(app);
                      }}
                      className={`w-full text-left p-1 border rounded-xs text-[11px] leading-tight block truncate cursor-pointer transition-transform hover:scale-[1.02] shadow-2xs ${statusStyle}`}
                      title={`${app.customer_name} · ${app.appointment_time} (${app.status})`}
                    >
                      <div className="flex items-center space-x-1 truncate font-medium">
                        <span className="shrink-0 text-[10px] font-mono font-semibold">
                          {app.appointment_time || 'TBD'}
                        </span>
                        <span className="truncate">· {app.customer_name}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
