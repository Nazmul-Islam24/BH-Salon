import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Calendar,
  Clock,
  Search,
  Filter,
  RefreshCw,
  LogOut,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Scissors,
  Users,
  Inbox,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  X,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  List,
  DollarSign
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { getAppointments, updateAppointmentStatus, verifyIsAdmin } from '../lib/appointments';
import { Appointment, BookingStatus } from '../types';
import { AdminBookingTable } from '../components/AdminBookingTable';
import { AdminBookingDetails } from '../components/AdminBookingDetails';
import { MonthlyCalendarView } from '../components/MonthlyCalendarView';

interface AdminDashboardPageProps {
  onLogout: () => void;
  onNavigateHome: () => void;
}

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({
  onLogout,
  onNavigateHome,
}) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [dateFilter, setDateFilter] = useState<string>('');
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [adminEmail, setAdminEmail] = useState<string>('Administrator');
  const [notificationMsg, setNotificationMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Auto-connect with device / browser calendar clock
  const getDeviceMonthString = () => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  };

  const deviceCurrentMonth = useMemo(() => getDeviceMonthString(), []);
  const [selectedMonth, setSelectedMonth] = useState<string>(getDeviceMonthString());
  const [viewMode, setViewMode] = useState<'table' | 'calendar'>('table');

  // Load appointments and verify current admin session
  const fetchAppointments = useCallback(async () => {
    setLoading(true);
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData.session?.user) {
        onLogout();
        return;
      }

      setAdminEmail(sessionData.session.user.email || 'Salon Owner');

      // Verify authorization against admin_profiles
      const isAdmin = await verifyIsAdmin(sessionData.session.user.id);
      if (!isAdmin) {
        await supabase.auth.signOut();
        onLogout();
        return;
      }

      const { appointments: data, error } = await getAppointments();
      if (error) {
        setNotificationMsg({ type: 'error', text: error });
      } else {
        setAppointments(data);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error fetching appointments';
      setNotificationMsg({ type: 'error', text: msg });
    } finally {
      setLoading(false);
    }
  }, [onLogout]);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  // Handle single status updates (from table or details modal)
  const handleStatusChange = async (
    appointmentId: string,
    newStatus: BookingStatus,
    prevStatus?: BookingStatus
  ) => {
    const result = await updateAppointmentStatus(appointmentId, newStatus, prevStatus);
    if (result.success) {
      setNotificationMsg({
        type: 'success',
        text: `Appointment status updated to ${newStatus.toUpperCase()}`,
      });
      setTimeout(() => setNotificationMsg(null), 4000);

      // Update local state
      setAppointments((prev) =>
        prev.map((item) =>
          item.id === appointmentId ? { ...item, status: newStatus, updated_at: new Date().toISOString() } : item
        )
      );

      // Update selected modal appointment if open
      if (selectedAppointment && selectedAppointment.id === appointmentId) {
        setSelectedAppointment((prev) => (prev ? { ...prev, status: newStatus } : null));
      }
    } else {
      setNotificationMsg({ type: 'error', text: result.error || 'Failed to update status' });
      setTimeout(() => setNotificationMsg(null), 5000);
    }
  };

  // Parse Year and Month from selectedMonth (e.g., "2026-10")
  const [selectedYear, selectedMonthNum] = useMemo(() => {
    if (selectedMonth === 'all') {
      const d = new Date();
      return [d.getFullYear(), d.getMonth() + 1];
    }
    const parts = selectedMonth.split('-');
    const y = parseInt(parts[0], 10) || new Date().getFullYear();
    const m = parseInt(parts[1], 10) || new Date().getMonth() + 1;
    return [y, m];
  }, [selectedMonth]);

  const monthNameFormatted = useMemo(() => {
    if (selectedMonth === 'all') return 'Lifetime (All Records)';
    const dateObj = new Date(selectedYear, selectedMonthNum - 1, 1);
    return dateObj.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  }, [selectedMonth, selectedYear, selectedMonthNum]);

  const handlePrevMonth = () => {
    if (selectedMonth === 'all') {
      setSelectedMonth(deviceCurrentMonth);
      return;
    }
    let y = selectedYear;
    let m = selectedMonthNum - 1;
    if (m < 1) {
      m = 12;
      y -= 1;
    }
    setSelectedMonth(`${y}-${String(m).padStart(2, '0')}`);
  };

  const handleNextMonth = () => {
    if (selectedMonth === 'all') {
      setSelectedMonth(deviceCurrentMonth);
      return;
    }
    let y = selectedYear;
    let m = selectedMonthNum + 1;
    if (m > 12) {
      m = 1;
      y += 1;
    }
    setSelectedMonth(`${y}-${String(m).padStart(2, '0')}`);
  };

  // Appointments for the selected month (or all)
  const monthlyAppointments = useMemo(() => {
    if (selectedMonth === 'all') return appointments;
    return appointments.filter((app) => app.appointment_date?.startsWith(selectedMonth));
  }, [appointments, selectedMonth]);

  // Monthly Metrics
  const monthlyMetrics = useMemo(() => {
    const total = monthlyAppointments.length;
    const pending = monthlyAppointments.filter((a) => a.status === 'pending').length;
    const confirmed = monthlyAppointments.filter((a) => a.status === 'confirmed').length;
    const completed = monthlyAppointments.filter((a) => a.status === 'completed').length;
    const cancelled = monthlyAppointments.filter((a) => a.status === 'cancelled').length;

    // Calculate revenue (from confirmed & completed appointments)
    const revenue = monthlyAppointments
      .filter((a) => a.status === 'confirmed' || a.status === 'completed')
      .reduce((sum, a) => sum + (Number(a.total_price) || 0), 0);

    return { total, pending, confirmed, completed, cancelled, revenue };
  }, [monthlyAppointments]);

  // Filtered appointments for table view
  const filteredAppointments = useMemo(() => {
    return monthlyAppointments.filter((item) => {
      // Status filter
      if (statusFilter !== 'all' && item.status !== statusFilter) {
        return false;
      }

      // Date filter
      if (dateFilter && item.appointment_date !== dateFilter) {
        return false;
      }

      // Search term
      if (searchQuery.trim()) {
        const query = searchQuery.trim().toLowerCase();
        const matchName = item.customer_name?.toLowerCase().includes(query);
        const matchEmail = item.customer_email?.toLowerCase().includes(query);
        const matchPhone = item.customer_phone?.toLowerCase().includes(query);
        const matchRef = item.booking_reference?.toLowerCase().includes(query);
        const matchStylist = item.stylist_name?.toLowerCase().includes(query);
        return matchName || matchEmail || matchPhone || matchRef || matchStylist;
      }

      return true;
    });
  }, [monthlyAppointments, statusFilter, dateFilter, searchQuery]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    onLogout();
  };

  return (
    <div className="min-h-screen bg-[#F7F3EE] text-[#24201D] pb-24">
      {/* Top Admin Navigation Bar */}
      <header className="bg-[#24201D] text-[#EDE5DC] border-b border-[#24201D]/20 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="font-serif text-2xl tracking-[0.2em] text-[#F7F3EE]">
              LUMÉ
            </span>
            <span className="hidden sm:inline-block px-2.5 py-0.5 bg-[#EDE5DC]/10 text-[#D4AF37] border border-[#D4AF37]/30 text-[10px] uppercase tracking-widest font-semibold rounded-xs">
              Salon Concierge Admin
            </span>
          </div>

          <div className="flex items-center space-x-3 sm:space-x-4">
            <span className="hidden md:inline-block text-xs text-[#EDE5DC]/70 truncate max-w-[200px]">
              {adminEmail}
            </span>

            <button
              type="button"
              onClick={onNavigateHome}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 border border-[#EDE5DC]/20 hover:border-[#EDE5DC] text-xs text-[#EDE5DC] hover:text-white transition-colors cursor-pointer rounded-xs"
            >
              <span>Public Site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={handleSignOut}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-[#EDE5DC]/10 hover:bg-rose-900/40 text-xs text-[#EDE5DC] hover:text-rose-200 transition-colors cursor-pointer rounded-xs"
              title="Sign Out of Dashboard"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Floating Notification */}
        {notificationMsg && (
          <div
            className={`mb-6 p-4 text-xs flex items-center justify-between border shadow-sm ${
              notificationMsg.type === 'success'
                ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                : 'bg-rose-50 border-rose-300 text-rose-900'
            }`}
          >
            <div className="flex items-center space-x-2">
              {notificationMsg.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              )}
              <span>{notificationMsg.text}</span>
            </div>
            <button
              onClick={() => setNotificationMsg(null)}
              className="text-[#756B63] hover:text-[#24201D] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Page Title & Refresh */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-[#24201D]/10 gap-3">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#B98272] font-semibold block mb-1">
              APPOINTMENT MANAGEMENT
            </span>
            <h1 className="font-serif font-normal text-3xl sm:text-4xl text-[#24201D]">
              Studio Reservations Desk
            </h1>
          </div>

          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={fetchAppointments}
              disabled={loading}
              className="inline-flex items-center space-x-1.5 px-4 py-2 bg-white border border-[#24201D]/15 hover:border-[#24201D] text-xs uppercase tracking-wider font-semibold text-[#24201D] transition-colors cursor-pointer shadow-xs disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh List</span>
            </button>
          </div>
        </div>

        {/* Month Explorer & Device Calendar Synchronizer Bar */}
        <div className="bg-[#24201D] text-[#EDE5DC] p-4 sm:p-5 shadow-sm mb-6 flex flex-col md:flex-row items-center justify-between gap-4 border border-[#24201D]">
          {/* Left: Month Navigator */}
          <div className="flex items-center space-x-3 w-full md:w-auto justify-between md:justify-start">
            <div className="flex items-center space-x-1">
              <button
                type="button"
                onClick={handlePrevMonth}
                disabled={selectedMonth === 'all'}
                className="p-2 bg-[#EDE5DC]/10 hover:bg-[#EDE5DC]/20 text-[#EDE5DC] rounded-xs disabled:opacity-30 cursor-pointer transition-colors"
                title="Previous Month"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="px-4 py-1 text-center min-w-[200px]">
                <span className="font-serif text-lg tracking-wide text-white block">
                  {monthNameFormatted}
                </span>
                {selectedMonth === deviceCurrentMonth ? (
                  <span className="inline-flex items-center gap-1 text-[10px] text-[#D4AF37] uppercase tracking-wider font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse"></span>
                    Current Device Month
                  </span>
                ) : selectedMonth === 'all' ? (
                  <span className="text-[10px] text-[#EDE5DC]/60 uppercase tracking-wider">
                    Lifetime Database View
                  </span>
                ) : (
                  <span className="text-[10px] text-[#EDE5DC]/60 uppercase tracking-wider">
                    Browsing Schedule
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={handleNextMonth}
                disabled={selectedMonth === 'all'}
                className="p-2 bg-[#EDE5DC]/10 hover:bg-[#EDE5DC]/20 text-[#EDE5DC] rounded-xs disabled:opacity-30 cursor-pointer transition-colors"
                title="Next Month"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Jump to Current Month button */}
            {selectedMonth !== deviceCurrentMonth && (
              <button
                type="button"
                onClick={() => setSelectedMonth(deviceCurrentMonth)}
                className="px-3 py-1.5 bg-[#D4AF37] hover:bg-[#B5952F] text-[#24201D] text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer rounded-xs"
              >
                Today's Month
              </button>
            )}
          </div>

          {/* Right: View Toggles & Select Mode */}
          <div className="flex items-center space-x-3 w-full md:w-auto justify-end">
            <button
              type="button"
              onClick={() => setSelectedMonth(selectedMonth === 'all' ? deviceCurrentMonth : 'all')}
              className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider border rounded-xs transition-colors cursor-pointer ${
                selectedMonth === 'all'
                  ? 'bg-white text-[#24201D] border-white'
                  : 'bg-transparent text-[#EDE5DC]/80 border-[#EDE5DC]/30 hover:border-white'
              }`}
            >
              {selectedMonth === 'all' ? 'Back to Month View' : 'All Months (Lifetime)'}
            </button>

            {/* View Mode Toggle: Table vs Calendar */}
            <div className="flex items-center bg-[#EDE5DC]/10 p-0.5 rounded-xs border border-[#EDE5DC]/20">
              <button
                type="button"
                onClick={() => setViewMode('table')}
                className={`inline-flex items-center space-x-1 px-3 py-1.5 text-xs font-medium rounded-xs transition-colors cursor-pointer ${
                  viewMode === 'table'
                    ? 'bg-white text-[#24201D] font-semibold shadow-xs'
                    : 'text-[#EDE5DC] hover:text-white'
                }`}
              >
                <List className="w-3.5 h-3.5" />
                <span>Table</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('calendar')}
                className={`inline-flex items-center space-x-1 px-3 py-1.5 text-xs font-medium rounded-xs transition-colors cursor-pointer ${
                  viewMode === 'calendar'
                    ? 'bg-white text-[#24201D] font-semibold shadow-xs'
                    : 'text-[#EDE5DC] hover:text-white'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Calendar</span>
              </button>
            </div>
          </div>
        </div>

        {/* 5 Monthly Financial & Operational Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mb-8">
          {/* Monthly Total */}
          <div className="bg-white p-4 border border-[#24201D]/15 shadow-xs">
            <span className="text-[10px] uppercase tracking-wider text-[#756B63] block mb-1">
              {selectedMonth === 'all' ? 'Lifetime Bookings' : `${monthNameFormatted.split(' ')[0]} Bookings`}
            </span>
            <div className="font-inter font-bold text-2xl text-[#24201D]">
              {monthlyMetrics.total}
            </div>
          </div>

          {/* Pending */}
          <div className="bg-amber-50/70 p-4 border border-amber-300 shadow-xs">
            <span className="text-[10px] uppercase tracking-wider text-amber-900 block mb-1 font-semibold">
              Pending Action
            </span>
            <div className="font-inter font-bold text-2xl text-amber-900">
              {monthlyMetrics.pending}
            </div>
          </div>

          {/* Confirmed */}
          <div className="bg-emerald-50/70 p-4 border border-emerald-300 shadow-xs">
            <span className="text-[10px] uppercase tracking-wider text-emerald-900 block mb-1 font-semibold">
              Confirmed
            </span>
            <div className="font-inter font-bold text-2xl text-emerald-900">
              {monthlyMetrics.confirmed}
            </div>
          </div>

          {/* Completed */}
          <div className="bg-purple-50/70 p-4 border border-purple-300 shadow-xs">
            <span className="text-[10px] uppercase tracking-wider text-purple-900 block mb-1 font-semibold">
              Completed
            </span>
            <div className="font-inter font-bold text-2xl text-purple-900">
              {monthlyMetrics.completed}
            </div>
          </div>

          {/* Estimated Monthly Revenue */}
          <div className="bg-[#24201D] text-white p-4 shadow-xs col-span-2 sm:col-span-1">
            <span className="text-[10px] uppercase tracking-wider text-[#D4AF37] block mb-1 font-semibold">
              Monthly Revenue
            </span>
            <div className="font-inter font-bold text-2xl text-white">
              ${monthlyMetrics.revenue.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}
            </div>
          </div>
        </div>

        {/* View Switch: Monthly Calendar View vs Table View */}
        {viewMode === 'calendar' ? (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-3 px-1">
              <span className="text-xs text-[#756B63]">
                Viewing monthly calendar for <strong>{monthNameFormatted}</strong> ({monthlyAppointments.length} total bookings)
              </span>
              <span className="text-[11px] text-[#756B63] italic">
                Click any appointment to view details or manage status
              </span>
            </div>

            <MonthlyCalendarView
              year={selectedYear}
              month={selectedMonthNum}
              appointments={monthlyAppointments}
              onSelectAppointment={(apt) => setSelectedAppointment(apt)}
              onDateClick={(dateStr) => {
                setDateFilter(dateStr);
                setViewMode('table');
              }}
            />
          </div>
        ) : (
          <div>
            {/* Filter and Search Bar Controls */}
            <div className="bg-white p-4 sm:p-5 border border-[#24201D]/15 shadow-xs mb-6 space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                {/* Search Input */}
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 text-[#756B63] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by client name, email, phone, reference..."
                    className="w-full pl-9 pr-3.5 py-2 text-xs bg-[#F7F3EE] border border-[#24201D]/15 focus:border-[#24201D] focus:bg-white text-[#24201D] focus:outline-none transition-colors"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-[#756B63] hover:text-[#24201D]"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Date Filter */}
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-[#756B63] whitespace-nowrap">Specific Day:</span>
                  <input
                    type="date"
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                    className="px-2.5 py-1.5 text-xs bg-[#F7F3EE] border border-[#24201D]/15 font-inter focus:border-[#24201D] focus:outline-none"
                  />
                  {dateFilter && (
                    <button
                      type="button"
                      onClick={() => setDateFilter('')}
                      className="text-xs text-[#8A5243] hover:underline"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>

              {/* Status Tabs */}
              <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-[#24201D]/10">
                <span className="text-[11px] uppercase tracking-wider text-[#756B63] font-semibold mr-2 flex items-center gap-1">
                  <Filter className="w-3 h-3 text-[#B98272]" />
                  <span>Status:</span>
                </span>

                {[
                  { key: 'all', label: `All (${monthlyMetrics.total})` },
                  { key: 'pending', label: `Pending (${monthlyMetrics.pending})` },
                  { key: 'confirmed', label: `Confirmed (${monthlyMetrics.confirmed})` },
                  { key: 'completed', label: `Completed (${monthlyMetrics.completed})` },
                  { key: 'cancelled', label: `Cancelled (${monthlyMetrics.cancelled})` },
                ].map((tab) => {
                  const isActive = statusFilter === tab.key;
                  return (
                    <button
                      key={tab.key}
                      type="button"
                      onClick={() => setStatusFilter(tab.key)}
                      className={`px-3 py-1.5 text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer rounded-xs border ${
                        isActive
                          ? 'bg-[#24201D] text-white border-[#24201D] shadow-xs'
                          : 'bg-white hover:bg-[#EDE5DC]/40 text-[#24201D] border-[#24201D]/15'
                      }`}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Appointments Table / Cards Component */}
            <div className="mb-12">
              <div className="flex items-center justify-between mb-3 px-1">
                <span className="text-xs text-[#756B63]">
                  Showing <strong>{filteredAppointments.length}</strong> of {monthlyAppointments.length} bookings for{' '}
                  <strong>{monthNameFormatted}</strong>
                </span>
              </div>

              <AdminBookingTable
                appointments={filteredAppointments}
                loading={loading}
                onSelectAppointment={(apt) => setSelectedAppointment(apt)}
                onQuickStatusUpdate={handleStatusChange}
              />
            </div>
          </div>
        )}
      </main>

      {/* Detailed Appointment Modal */}
      <AdminBookingDetails
        appointment={selectedAppointment}
        isOpen={!!selectedAppointment}
        onClose={() => setSelectedAppointment(null)}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
};

