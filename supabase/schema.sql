-- ============================================================================
-- SALON MASTER DATABASE SETUP SCRIPT (FOR ANY NEW CLIENT)
-- Copy and paste this into Supabase SQL Editor and click RUN
-- ============================================================================

-- 1. Enable Crypto Extension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. Appointments Table
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

-- Indexing for high speed searching and monthly calendar queries
CREATE INDEX IF NOT EXISTS idx_appointments_status ON public.appointments(status);
CREATE INDEX IF NOT EXISTS idx_appointments_date ON public.appointments(appointment_date);
CREATE INDEX IF NOT EXISTS idx_appointments_ref ON public.appointments(booking_reference);
CREATE INDEX IF NOT EXISTS idx_appointments_email ON public.appointments(customer_email);
CREATE INDEX IF NOT EXISTS idx_appointments_created ON public.appointments(created_at DESC);

-- 3. Admin Profiles Table
CREATE TABLE IF NOT EXISTS public.admin_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_admin_profiles_user ON public.admin_profiles(user_id);

-- 4. Automatic Timestamp Trigger
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

-- 5. Helper Function: is_admin
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

-- 6. Row Level Security (RLS)
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_profiles ENABLE ROW LEVEL SECURITY;

-- Anyone (public guest) can insert a new booking
CREATE POLICY "Public guest can book appointments"
  ON public.appointments
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Authenticated admins can view all appointments
CREATE POLICY "Admin can view all appointments"
  ON public.appointments
  FOR SELECT
  TO authenticated
  USING (public.is_admin(auth.uid()));

-- Authenticated admins can update appointments (confirm, complete, cancel)
CREATE POLICY "Admin can update all appointments"
  ON public.appointments
  FOR UPDATE
  TO authenticated
  USING (public.is_admin(auth.uid()))
  WITH CHECK (public.is_admin(auth.uid()));

-- Authenticated admins can view admin profiles
CREATE POLICY "Admin can view admin profiles"
  ON public.admin_profiles
  FOR SELECT
  TO authenticated
  USING (public.is_admin(auth.uid()) OR auth.uid() = user_id);

-- Authenticated admins can insert admin profiles
CREATE POLICY "Authenticated users can self-register admin profile"
  ON public.admin_profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);
