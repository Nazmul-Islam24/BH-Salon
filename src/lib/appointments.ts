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

/**
 * Creates an appointment in Supabase PostgreSQL database with initial status = 'pending'.
 * Triggers transactional email notification via Supabase Edge Function asynchronously.
 */
export async function createAppointment(
  input: CreateAppointmentInput
): Promise<CreateAppointmentResult> {
  try {
    const appointmentId =
      typeof crypto !== 'undefined' && crypto.randomUUID
        ? crypto.randomUUID()
        : undefined;

    const bookingReference = generateBookingReference(input.appointmentDate);

    const recordToInsert: Record<string, unknown> = {
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

    if (appointmentId) {
      recordToInsert.id = appointmentId;
    }

    // Insert into Supabase appointments table WITHOUT .select()
    // In PostgreSQL RLS, calling .select() on an anonymous INSERT triggers the SELECT policy
    // which is restricted to authenticated admins, resulting in "violates row-level security policy".
    const { error } = await supabase
      .from('appointments')
      .insert([recordToInsert]);

    if (error) {
      console.error('[LUMÉ Appointments] Insert failed:', error);
      return {
        success: false,
        error: error.message || 'Database rejected the booking request. Please check inputs and retry.',
      };
    }

    const createdAppointment: Appointment = {
      id: appointmentId || '',
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

    // Asynchronously dispatch transactional emails via /api/send-email (Resend)
    sendBookingReceivedEmails(createdAppointment).catch((err) => {
      console.warn('[LUMÉ Email] Direct Resend dispatch caught:', err);
    });

    // Also trigger Edge Function as secondary fallback
    if (appointmentId) {
      triggerEmailNotification(appointmentId, 'booking_received').catch((err) => {
        console.warn('[LUMÉ Appointments] Email notification trigger caught:', err);
      });
    }

    return {
      success: true,
      reference: bookingReference,
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

    if (error) {
      console.error('[LUMÉ Admin] Failed to fetch appointments:', error);
      return { appointments: [], error: error.message };
    }

    return { appointments: (data as Appointment[]) || [] };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to retrieve appointments.';
    return { appointments: [], error: msg };
  }
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

    const { error } = await supabase
      .from('appointments')
      .update({
        status: newStatus,
        updated_at: new Date().toISOString(),
      })
      .eq('id', appointmentId);

    if (error) {
      console.error('[LUMÉ Admin] Status update error:', error);
      return { success: false, error: error.message };
    }

    // Trigger transactional email for confirmation or cancellation
    if (newStatus === 'confirmed') {
      supabase
        .from('appointments')
        .select('*')
        .eq('id', appointmentId)
        .maybeSingle()
        .then(({ data }) => {
          if (data) {
            sendBookingConfirmedEmail(data as Appointment).catch((err) =>
              console.warn('[LUMÉ Email] Direct Resend confirmation email error:', err)
            );
          }
        });

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

/**
 * Verifies if an authenticated user's ID exists in the admin_profiles table.
 */
export async function verifyIsAdmin(userId: string): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from('admin_profiles')
      .select('id')
      .eq('user_id', userId)
      .maybeSingle();

    if (error) {
      console.warn('[LUMÉ Auth] Admin verification query failed:', error.message);
      return false;
    }

    return !!data;
  } catch {
    return false;
  }
}

/**
 * Checks whether any salon administrator has already been registered.
 */
export async function checkHasAdmin(): Promise<boolean> {
  try {
    const { count, error } = await supabase
      .from('admin_profiles')
      .select('id', { count: 'exact', head: true });

    if (error) {
      console.warn('[LUMÉ Auth] Admin count check failed:', error.message);
      // If table query fails, try RPC or assume registered to protect against unauthorized signups
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
    // Sign up with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: email.trim().toLowerCase(),
      password,
    });

    if (authError) {
      return { success: false, error: authError.message };
    }

    if (!authData.user) {
      return { success: false, error: 'Registration failed to generate user account.' };
    }

    // Insert into admin_profiles so the user is recognized as authorized salon admin
    const { error: profileError } = await supabase
      .from('admin_profiles')
      .upsert([{ user_id: authData.user.id, email: email.trim().toLowerCase() }], {
        onConflict: 'user_id',
      });

    if (profileError) {
      console.warn('[LUMÉ Auth] Note: admin_profile upsert returned:', profileError.message);
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
    // Edge function may not have secrets configured yet; this is expected and logged safely.
    console.warn(`[LUMÉ Email] Edge function dispatch (${eventType}) note:`, err);
  }
}

