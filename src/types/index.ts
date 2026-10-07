export interface ServiceSubItem {
  id: string;
  name: string;
  duration: string;
  price: string;
  priceNumber: number;
  originalPrice?: string;
  discountBadge?: string;
  note?: string;
}

export interface ServiceCard {
  id: string;
  sectionId: string;
  sectionName: string;
  name: string;
  shortDesc: string;
  image: string;
  whatItIs: string;
  whoItsFor: string;
  services: ServiceSubItem[];
  popular?: boolean;
}

export interface SalonSection {
  id: string;
  name: string;
  tagline: string;
  cards: ServiceCard[];
}

// Maintained for backward-compatibility across Lookbook & Stylist references
export interface ServiceItem {
  id: string;
  name: string;
  category: string;
  shortDesc: string;
  priceFrom: string;
  duration: string;
  image: string;
  whatItIs: string;
  whoItsFor: string;
  ourApproach?: string;
  popular?: boolean;
}

export interface Stylist {
  id: string;
  name: string;
  role: string;
  bio: string;
  portrait: string;
  specialties: string[];
  signatureWork: string[];
  experienceYears: number;
}

export interface LookbookItem {
  id: string;
  title: string;
  category: string;
  image: string;
  serviceId: string;
  cardId?: string;
  stylistName: string;
  description: string;
  galleryImages?: string[];
  beforeImage?: string;
  afterImage?: string;
}

export interface ReviewItem {
  id: string;
  clientName: string;
  service: string;
  rating: number;
  date: string;
  comment: string;
  verifiedOnGoogle: boolean;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  readTime: string;
  date: string;
  author: string;
  excerpt: string;
  content: string[];
  image: string;
}

export interface BookingState {
  serviceIds: string[];
  stylistId: string;
  date: string;
  timeSlot: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  notes: string;
}

// ============================================================================
// SUPABASE APPOINTMENT & ADMIN MANAGEMENT TYPES
// ============================================================================
export type BookingStatus =
  | 'pending'
  | 'confirmed'
  | 'cancelled'
  | 'completed';

export interface BookingServiceSnapshot {
  id: string;
  name: string;
  duration?: string;
  price?: string;
  priceNumber?: number;
  sectionName?: string;
}

export interface Appointment {
  id: string;
  booking_reference: string;
  selected_services: BookingServiceSnapshot[];
  stylist_id: string | null;
  stylist_name: string | null;
  appointment_date: string;
  appointment_time: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  notes: string | null;
  status: BookingStatus;
  total_price?: number;
  created_at: string;
  updated_at: string;
}

export interface AdminProfile {
  id: string;
  user_id: string;
  email: string;
  created_at: string;
}


