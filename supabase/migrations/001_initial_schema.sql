-- ============================================================================
-- LUMÉ HAIR STUDIO — MASTER SUPABASE SETUP SCRIPT (ALL-IN-ONE)
-- Migration: 001_initial_schema.sql
-- Run this ONCE in Supabase SQL Editor to configure all tables, RLS policies,
-- and automatically provision your Admin Account without any email rate limits!
-- ============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. APPOINTMENTS TABLE
CREATE TABLE IF NOT EXISTS public.appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_reference TEXT UNIQUE NOT NULL,
  selected_services JSONB NOT NULL DEFAULT '[]'::jsonb,
  stylist_id TEXT,
  stylist_name TEXT,
  appointment_date DATE NOT NULL,
  appointment_time TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  notes TEXT,
  total_price NUMERIC(10, 2) DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexing for performance
CREATE INDEX IF NOT EXISTS idx_appointments_status ON public.appointments(status);
CREATE INDEX IF NOT EXISTS idx_appointments_date ON public.appointments(appointment_date);
CREATE INDEX IF NOT EXISTS idx_appointments_ref ON public.appointments(booking_reference);
CREATE INDEX IF NOT EXISTS idx_appointments_email ON public.appointments(customer_email);
CREATE INDEX IF NOT EXISTS idx_appointments_created ON public.appointments(created_at DESC);

-- 3. ADMIN PROFILES TABLE
CREATE TABLE IF NOT EXISTS public.admin_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_admin_profiles_user ON public.admin_profiles(user_id);

-- 4. EMAIL NOTIFICATIONS TABLE (Idempotency protection)
CREATE TABLE IF NOT EXISTS public.email_notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  appointment_id UUID NOT NULL REFERENCES public.appointments(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL CHECK (
    event_type IN (
      'booking_received_customer',
      'booking_received_owner',
      'booking_confirmed_customer',
      'booking_cancelled_customer',
      'booking_completed_customer'
    )
  ),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'failed')),
  sent_at TIMESTAMPTZ,
  error_message TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (appointment_id, event_type)
);

CREATE INDEX IF NOT EXISTS idx_email_notifications_app ON public.email_notifications(appointment_id);

-- 5. AUTOMATIC TIMESTAMP TRIGGER
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_appointments_updated_at ON public.appointments;
CREATE TRIGGER set_appointments_updated_at
  BEFORE UPDATE ON public.appointments
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- 6. SECURITY DEFINER HELPER: IS_ADMIN
CREATE OR REPLACE FUNCTION public.is_admin(check_uid UUID)
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_profiles WHERE user_id = check_uid
  );
$$;

-- 7. ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_notifications ENABLE ROW LEVEL SECURITY;

-- 7.1 APPOINTMENTS POLICIES
-- Allow any customer (anonymous or authenticated) to create appointments
DROP POLICY IF EXISTS "Public can create pending appointments" ON public.appointments;
CREATE POLICY "Public can create pending appointments"
  ON public.appointments
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Only salon administrators can view appointments
DROP POLICY IF EXISTS "Admins can view appointments" ON public.appointments;
CREATE POLICY "Admins can view appointments"
  ON public.appointments
  FOR SELECT
  TO authenticated
  USING (public.is_admin(auth.uid()));

-- Only salon administrators can update appointments (confirm, cancel, complete)
DROP POLICY IF EXISTS "Admins can update appointments" ON public.appointments;
CREATE POLICY "Admins can update appointments"
  ON public.appointments
  FOR UPDATE
  TO authenticated
  USING (public.is_admin(auth.uid()))
  WITH CHECK (public.is_admin(auth.uid()));

-- Only salon administrators can delete appointments
DROP POLICY IF EXISTS "Admins can delete appointments" ON public.appointments;
CREATE POLICY "Admins can delete appointments"
  ON public.appointments
  FOR DELETE
  TO authenticated
  USING (public.is_admin(auth.uid()));

-- 7.2 ADMIN PROFILES POLICIES
DROP POLICY IF EXISTS "Admins can view own admin profile" ON public.admin_profiles;
CREATE POLICY "Admins can view own admin profile"
  ON public.admin_profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Allow checking if admin exists" ON public.admin_profiles;
CREATE POLICY "Allow checking if admin exists"
  ON public.admin_profiles
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- 7.3 EMAIL NOTIFICATIONS POLICIES
DROP POLICY IF EXISTS "Admins can manage email logs" ON public.email_notifications;
CREATE POLICY "Admins can manage email logs"
  ON public.email_notifications
  FOR ALL
  TO authenticated
  USING (public.is_admin(auth.uid()));

-- ============================================================================
-- 8. AUTO-PROVISION YOUR ADMIN ACCOUNT (NO EMAIL LIMITS, INSTANT ACCESS!)
-- This creates your admin user and confirms it immediately in Supabase.
-- Email: nzlpatwary901@gmail.com
-- Default Password: Admin12345! (You can change it later)
-- ============================================================================

DO $$
DECLARE
  v_user_id UUID;
BEGIN
  -- Check if user already exists in auth.users
  SELECT id INTO v_user_id FROM auth.users WHERE email = 'nzlpatwary901@gmail.com';

  IF v_user_id IS NULL THEN
    v_user_id := gen_random_uuid();

    -- Insert confirmed admin user directly into auth.users
    INSERT INTO auth.users (
      instance_id,
      id,
      aud,
      role,
      email,
      encrypted_password,
      email_confirmed_at,
      raw_app_meta_data,
      raw_user_meta_data,
      created_at,
      updated_at
    ) VALUES (
      '00000000-0000-0000-0000-000000000000',
      v_user_id,
      'authenticated',
      'authenticated',
      'nzlpatwary901@gmail.com',
      crypt('Admin12345!', gen_salt('bf')),
      now(),
      '{"provider":"email","providers":["email"]}'::jsonb,
      '{"role":"admin"}'::jsonb,
      now(),
      now()
    );
  ELSE
    -- If user already exists, update password and ensure email is confirmed
    UPDATE auth.users
    SET encrypted_password = crypt('Admin12345!', gen_salt('bf')),
        email_confirmed_at = COALESCE(email_confirmed_at, now()),
        updated_at = now()
    WHERE id = v_user_id;
  END IF;

  -- Ensure profile exists in public.admin_profiles
  INSERT INTO public.admin_profiles (user_id, email)
  VALUES (v_user_id, 'nzlpatwary901@gmail.com')
  ON CONFLICT (user_id) DO NOTHING;

END $$;

-- ============================================================================
-- SETUP COMPLETE!
-- ============================================================================
