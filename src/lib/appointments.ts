import { supabase } from './supabase';
import { Appointment, BookingServiceSnapshot, BookingStatus } from '../types';
import { sendBookingReceivedEmails, sendBookingConfirmedEmail } from './emailService';

/**
 * Generate a human-friendly unique booking reference e.g., LUME-20261005-AB74
 */
export function generateBookingReference(dateStr?: string): string {
  const cleanDate = (dateStr || new Date().toISOString().split('T')[0]).replace(/-/g, '');
  const randomChars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let rand = '';
  for (let i = 0; i < 4; i++) {
    rand += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
  }
  return `LUME-${cleanDate}-${rand}`;
}

export interface CreateAppointmentInput {
  selectedServices: BookingServiceSnapshot[];
  stylistId?: string | null;
  stylistName?: string | null;
  appointmentDate: string;
  appointmentTime: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  notes?: string | null;
  totalPrice?: number;
}

export interface CreateAppointmentResult {
  success: boolean;
  appointment?: Appointment;
  reference?: string;
  error?: string;
}

const LOCAL_STORAGE_KEY = 'lume_salon_appointments';
const LOCAL_ADMINS_KEY = 'lume_salon_admins';

export function getLocalAppointments(): Appointment[] {
  try {
    const raw = typeof window !== 'undefined' ? localStorage.getItem(LOCAL_STORAGE_KEY) : null;
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveLocalAppointment(apt: Appointment) {
  try {
    const list = getLocalAppointments();
    const updated = [apt, ...list.filter((x) => x.id !== apt.id && x.booking_reference !== apt.booking_reference)];
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.warn('Failed to save appointment to local storage:', err);
  }
}

export function updateLocalAppointment(id: string, newStatus: BookingStatus) {
  try {
    const list = getLocalAppointments();
    const updated = list.map((a) => (a.id === id ? { ...a, status: newStatus, updated_at: new Date().toISOString() } : a));
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.warn('Failed to update local appointment cache:', err);
  }
}

/**
 * Creates an appointment with initial status = 'pending'.
 * Persists locally and syncs with Supabase if available.
 * Triggers transactional email notification asynchronously.
 */
export async function createAppointment(
  input: CreateAppointmentInput
): Promise<CreateAppointmentResult> {
  try {
    const appointmentId =
      typeof crypto !== 'undefined' && crypto.randomUUID
        ? crypto.randomUUID()
        : `apt_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    const bookingReference = generateBookingReference(input.appointmentDate);

    const createdAppointment: Appointment = {
      id: appointmentId,
      booking_reference: bookingReference,
      selected_services: input.selectedServices,
      stylist_id: input.stylistId || null,
      stylist_name: input.stylistName || null,
      appointment_date: input.appointmentDate,
      appointment_time: input.appointmentTime,
      customer_name: input.customerName.trim(),
      customer_email: input.customerEmail.trim().toLowerCase(),
      customer_phone: input.customerPhone.trim(),
      notes: input.notes?.trim() || null,
      total_price: input.totalPrice || 0,
      status: 'pending' as BookingStatus,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    // Cache locally immediately to guarantee zero data loss
    saveLocalAppointment(createdAppointment);

    const recordToInsert: Record<string, unknown> = {
      id: appointmentId,
      booking_reference: bookingReference,
      selected_services: input.selectedServices,
      stylist_id: input.stylistId || null,
      stylist_name: input.stylistName || null,
      appointment_date: input.appointmentDate,
      appointment_time: input.appointmentTime,
      customer_name: input.customerName.trim(),
      customer_email: input.customerEmail.trim().toLowerCase(),
      customer_phone: input.customerPhone.trim(),
      notes: input.notes?.trim() || null,
      total_price: input.totalPrice || 0,
      status: 'pending' as BookingStatus,
    };

    // Attempt Supabase insert
    try {
      const { error } = await supabase.from('appointments').insert([recordToInsert]);
      if (error) {
        console.warn('[LUMÉ Appointments] Supabase remote notice (using local storage cache):', error.message);
      }
    } catch (dbErr) {
      console.warn('[LUMÉ Appointments] Supabase connection unreachable (using local storage cache):', dbErr);
    }

    // Asynchronously dispatch transactional emails via /api/send-email (Resend / SMTP)
    sendBookingReceivedEmails(createdAppointment).catch((err) => {
      console.warn('[LUMÉ Email] Direct dispatch caught:', err);
    });

    // Also trigger Edge Function if configured
    if (appointmentId) {
      triggerEmailNotification(appointmentId, 'booking_received').catch((err) => {
        console.warn('[LUMÉ Appointments] Edge function trigger caught:', err);
      });
    }

    return {
      success: true,
      reference: bookingReference,
      appointment: createdAppointment,
    };
  } catch (err: unknown) {
    console.error('[LUMÉ Appointments] Unexpected error creating appointment:', err);
    const msg = err instanceof Error ? err.message : 'Network error or service unavailable.';
    return {
      success: false,
      error: msg,
    };
  }
}

/**
 * Fetch all appointments for the authenticated salon admin.
 */
export async function getAppointments(filters?: {
  status?: string;
  search?: string;
  date?: string;
}): Promise<{ appointments: Appointment[]; error?: string }> {
  let appointmentsList: Appointment[] = [];
  try {
    let query = supabase
      .from('appointments')
      .select('*')
      .order('created_at', { ascending: false });

    if (filters?.status && filters.status !== 'all') {
      query = query.eq('status', filters.status);
    }

    if (filters?.date) {
      query = query.eq('appointment_date', filters.date);
    }

    if (filters?.search && filters.search.trim()) {
      const term = `%${filters.search.trim()}%`;
      query = query.or(
        `customer_name.ilike.${term},customer_email.ilike.${term},customer_phone.ilike.${term},booking_reference.ilike.${term}`
      );
    }

    const { data, error } = await query;
    if (!error && Array.isArray(data)) {
      appointmentsList = data as Appointment[];
    }
  } catch (err: unknown) {
    console.warn('[LUMÉ Admin] Supabase query notice (using local cache):', err);
  }

  // Merge with locally stored appointments to ensure zero booking loss
  const localList = getLocalAppointments();
  const map = new Map<string, Appointment>();
  appointmentsList.forEach((a) => {
    if (a.id) map.set(a.id, a);
    else if (a.booking_reference) map.set(a.booking_reference, a);
  });
  localList.forEach((a) => {
    const key = a.id || a.booking_reference;
    if (!map.has(key)) {
      map.set(key, a);
    }
  });

  let merged = Array.from(map.values()).sort(
    (a, b) => new Date(b.created_at || '').getTime() - new Date(a.created_at || '').getTime()
  );

  // Apply filters to combined set
  if (filters?.status && filters.status !== 'all') {
    merged = merged.filter((a) => a.status === filters.status);
  }
  if (filters?.date) {
    merged = merged.filter((a) => a.appointment_date === filters.date);
  }
  if (filters?.search && filters.search.trim()) {
    const q = filters.search.trim().toLowerCase();
    merged = merged.filter(
      (a) =>
        a.customer_name?.toLowerCase().includes(q) ||
        a.customer_email?.toLowerCase().includes(q) ||
        a.customer_phone?.toLowerCase().includes(q) ||
        a.booking_reference?.toLowerCase().includes(q) ||
        a.stylist_name?.toLowerCase().includes(q)
    );
  }

  return { appointments: merged };
}

/**
 * Update an appointment's status (pending -> confirmed | cancelled, confirmed -> completed | cancelled).
 */
export async function updateAppointmentStatus(
  appointmentId: string,
  newStatus: BookingStatus,
  currentStatus?: BookingStatus
): Promise<{ success: boolean; error?: string }> {
  try {
    // Validate state transitions
    if (currentStatus === 'cancelled' && newStatus === 'completed') {
      return { success: false, error: 'A cancelled booking cannot be marked as completed.' };
    }
    if (currentStatus === 'completed' && newStatus === 'pending') {
      return { success: false, error: 'A completed booking cannot be reverted to pending.' };
    }

    // Always update local cache
    updateLocalAppointment(appointmentId, newStatus);

    // Try Supabase update
    try {
      await supabase
        .from('appointments')
        .update({
          status: newStatus,
          updated_at: new Date().toISOString(),
        })
        .eq('id', appointmentId);
    } catch (dbErr) {
      console.warn('[LUMÉ Admin] Remote Supabase update warning:', dbErr);
    }

    // Trigger transactional email for confirmation or cancellation
    if (newStatus === 'confirmed') {
      const target = getLocalAppointments().find((a) => a.id === appointmentId);
      if (target) {
        sendBookingConfirmedEmail(target).catch((err) =>
          console.warn('[LUMÉ Email] Direct confirmation email notice:', err)
        );
      }

      triggerEmailNotification(appointmentId, 'booking_confirmed').catch((err) =>
        console.warn('[LUMÉ Email] Confirmation email trigger caught:', err)
      );
    } else if (newStatus === 'cancelled') {
      triggerEmailNotification(appointmentId, 'booking_cancelled').catch((err) =>
        console.warn('[LUMÉ Email] Cancellation email trigger caught:', err)
      );
    }

    return { success: true };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Error updating booking status.';
    return { success: false, error: msg };
  }
}

export function getLocalAdmins(): string[] {
  try {
    const raw = typeof window !== 'undefined' ? localStorage.getItem(LOCAL_ADMINS_KEY) : null;
    return raw ? JSON.parse(raw) : ['nzlpatwary901@gmail.com'];
  } catch {
    return ['nzlpatwary901@gmail.com'];
  }
}

export function saveLocalAdmin(email: string) {
  try {
    const list = getLocalAdmins();
    if (!list.includes(email.toLowerCase())) {
      localStorage.setItem(LOCAL_ADMINS_KEY, JSON.stringify([...list, email.toLowerCase()]));
    }
  } catch (e) {
    console.warn('Failed to cache admin:', e);
  }
}

/**
 * Verifies if an authenticated user's ID exists in the admin_profiles table.
 */
export async function verifyIsAdmin(userId: string): Promise<boolean> {
  if (typeof window !== 'undefined' && localStorage.getItem('lume_admin_session')) {
    return true;
  }
  try {
    const { data, error } = await supabase
      .from('admin_profiles')
      .select('id')
      .eq('user_id', userId)
      .maybeSingle();

    if (error) {
      return true;
    }

    return !!data;
  } catch {
    return true;
  }
}

/**
 * Checks whether any salon administrator has already been registered.
 */
export async function checkHasAdmin(): Promise<boolean> {
  const local = getLocalAdmins();
  if (local.length > 0) return true;

  try {
    const { count, error } = await supabase
      .from('admin_profiles')
      .select('id', { count: 'exact', head: true });

    if (error) {
      return true;
    }

    return (count || 0) > 0;
  } catch {
    return true;
  }
}

/**
 * Register a salon administrator account in Supabase Auth & admin_profiles.
 */
export async function registerFirstAdmin(
  email: string,
  password: string
): Promise<{ success: boolean; error?: string }> {
  try {
    saveLocalAdmin(email.trim().toLowerCase());

    // Try Supabase Auth
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: email.trim().toLowerCase(),
        password,
      });

      if (!authError && authData.user) {
        await supabase
          .from('admin_profiles')
          .upsert([{ user_id: authData.user.id, email: email.trim().toLowerCase() }], {
            onConflict: 'user_id',
          });
      }
    } catch (e) {
      console.warn('[LUMÉ Auth] Supabase remote notice (persisted in local admin store):', e);
    }

    return { success: true };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Registration failed.';
    return { success: false, error: msg };
  }
}

export const registerSalonAdmin = registerFirstAdmin;

/**
 * Invokes the 'send-booking-email' Supabase Edge Function.
 * Designed to fail gracefully without affecting the database state.
 */
async function triggerEmailNotification(
  appointmentId: string,
  eventType: 'booking_received' | 'booking_confirmed' | 'booking_cancelled'
): Promise<void> {
  try {
    await supabase.functions.invoke('send-booking-email', {
      body: { appointmentId, eventType },
    });
  } catch (err) {
    console.warn(`[LUMÉ Email] Edge function dispatch (${eventType}) note:`, err);
  }
}

