# LUMÉ Hair Studio & Salon Template — Client Setup & Deployment Guide
*(নতুন ক্লায়েন্ট / বিউটি সেলুন ওনারদের জন্য ওয়েবসাইট সেটআপ ও কাস্টমাইজেশন গাইড)*

এই গাইডটিতে সহজ ও পরিষ্কার ভাষায় ব্যাখ্যা করা হয়েছে কীভাবে আপনি এই একই প্রজেক্ট ব্যবহার করে যেকোনো নতুন বিউটি পার্লার, হেয়ার সেলুন বা স্পা ক্লায়েন্টের জন্য পুরো ওয়েবসাইটটি প্রস্তুত, ডেটা পরিবর্তন এবং ডেপ্লয় করবেন।

---

## ১. সিস্টেম আর্কিটেকচার (System Architecture)

```
[CUSTOMER / CLIENT]
       ↓
[BookingModal.tsx (৫-ধাপের বুকিং ফর্ম)]
       ↓ (Form Validation)
[Supabase Client (src/lib/supabase.ts)]
       ↓ (Row Level Security - Public Insert Allowed)
[PostgreSQL Database ('appointments' Table)]
       ↓ (Initial Status: 'pending')
[Supabase Edge Function ('send-booking-email')]
       ↓ (Server-side Secrets: RESEND_API_KEY)
[Resend API]
       ↓
[Customer Notification Email + Salon Owner Alert Email]

---------------------------------------------------------

[SALON OWNER / ADMIN]
       ↓
[Website Footer: "Owner Access" Discreet Link]
       ↓
[Admin Login (src/pages/AdminLoginPage.tsx)]
       ↓ (Supabase Auth Email/Password)
[Authorization Check ('admin_profiles' Table)]
       ↓ (If verified admin)
[Admin Dashboard (src/pages/AdminDashboardPage.tsx)]
       ↓ (View, Search, Filter, Status Change: pending → confirmed | cancelled | completed)
[Supabase Edge Function ('send-booking-email')]
       ↓
[Customer Receives Confirmation or Cancellation Email via Resend]
```

---

## ২. নতুন ক্লায়েন্টের জন্য Supabase সেটআপ (Step-by-Step)

নতুন কোনো বিউটি সেলুনের কাজ পেলে নিচের ধাপগুলো অনুসরণ করুন:

### ধাপ ১: ক্লায়েন্টের Supabase প্রজেক্ট তৈরি
1. [supabase.com](https://supabase.com)-এ গিয়ে একটি নতুন প্রজেক্ট তৈরি করুন (যেমন: `client-salon-booking`)।
2. প্রজেক্টের **Project Settings** $\rightarrow$ **API**-তে যান:
   - **Project URL** কপি করুন (যেমন: `https://your-project-id.supabase.co`)
   - **Project API Keys** থেকে `anon` / `publishable` কি-টি কপি করুন (যেমন: `sb_publishable_...`)

### ধাপ ২: ডাটাবেস টেবিল ও RLS তৈরি (SQL Migration)
1. Supabase ড্যাশবোর্ডের বাম পাশের মেনু থেকে **SQL Editor**-এ যান।
2. **`supabase/migrations/001_initial_schema.sql`** ফাইলের পুরো কোডটি কপি করে SQL Editor-এ পেস্ট করে **Run** চাপুন।
3. এর ফলে নিচের টেবিল ও সিকিউরিটি রুলস স্বয়ংক্রিয়ভাবে তৈরি হবে:
   - `appointments`: গ্রাহকের বুকিং সংরক্ষণের জন্য (Customer Name, Email, Phone, Services snapshot, Stylist, Date, Time, Status, Notes)।
   - `admin_profiles`: অনুমোদিত সেলুন ওনার বা এডমিনের তালিকা সংরক্ষণের জন্য।
   - `email_notifications`: ডুপ্লিকেট ইমেইল পাঠানো রোধ করার জন্য (Idempotent Notification Log)।
   - `RLS (Row Level Security)`: সাধারণ ভিজিটররা শুধু অ্যাপয়েন্টমেন্ট সাবমিট করতে পারবে (পেন্ডিং স্ট্যাটাসে), কিন্তু কোনো গ্রাহক অন্য কারো অ্যাপয়েন্টমেন্ট পড়তে, এডিট করতে বা মুছতে পারবে না। একমাত্র অথেনটিকেটেড সেলুন এডমিন ডাটা দেখতে এবং স্ট্যাটাস পরিবর্তন করতে পারবে।

### ধাপ ৩: Edge Functions ডেপ্লয় করা
প্রজেক্টের টার্মিনালে Supabase CLI দিয়ে Edge Functions ডেপ্লয় করুন:
```bash
# Supabase লগইন করুন
npx supabase login

# প্রজেক্ট লিংক করুন (Project ID দিয়ে)
npx supabase link --project-ref your-project-id

# Edge Functions ডেপ্লয় করুন
npx supabase functions deploy register-first-admin
npx supabase functions deploy send-booking-email
```

### ধাপ ৪: সার্ভার-সাইড সিক্রেটস কনফিগার করা
Supabase ড্যাশবোর্ডে যান $\rightarrow$ **Project Settings** $\rightarrow$ **Edge Functions** $\rightarrow$ **Secrets** (অথবা CLI দিয়ে):
```bash
npx supabase secrets set RESEND_API_KEY="re_your_actual_resend_key"
npx supabase secrets set RESEND_FROM_EMAIL="Your Salon <concierge@yourdomain.com>"
npx supabase secrets set OWNER_EMAIL="owner@yourdomain.com"
```
> **নিরাপত্তা সতর্কতা:** `RESEND_API_KEY` কখনো ফ্রন্টএন্ড কোডে বা `.env`-এ `VITE_` দিয়ে রাখবেন না! এটি শুধুমাত্র Supabase Edge Function-এর ভেতর সার্ভার-সাইড সিক্রেট হিসেবে থাকবে।

### ধাপ ৫: ফ্রন্টএন্ডের সাথে যুক্ত করা
ওয়েবসাইটের রুট ফোল্ডারে থাকা `.env` ফাইলে নতুন ক্লায়েন্টের পাবলিক তথ্য বসিয়ে দিন:
```env
VITE_SUPABASE_URL="https://your-project-id.supabase.co"
VITE_SUPABASE_PUBLISHABLE_KEY="sb_publishable_your_client_key"
```

---

## ৩. প্রথম এডমিন একাউন্ট তৈরি (First Admin Setup)

1. ওয়েবসাইটটি চালু করুন (`npm run dev`)।
2. ওয়েবসাইটের একদম নিচে ফুটারে যান (Footer)।
3. ডানপাশে Privacy Policy ও Terms of Service-এর পাশে একটি ছোট discreet লিঙ্ক দেখতে পাবেন: **`Owner Access`**।
4. সেখানে ক্লিক করলে ওনার লগইন পেজ খুলবে।
5. যেহেতু এটি নতুন প্রজেক্ট এবং এখনো কোনো এডমিন নেই, তাই ফর্মের নিচে একটি অপশন দেখতে পাবেন:
   **`Create Initial Admin Account →`**।
6. সেখানে ক্লিক করে সেলুন ওনারের অফিসিয়াল ইমেইল এবং অন্তত ৮ অক্ষরের একটি স্ট্রং পাসওয়ার্ড দিন।
7. সাবমিট করার সাথে সাথে ব্যাকএন্ডে প্রথম এডমিন তৈরি হয়ে যাবে।
8. **গুরুত্বপূর্ণ নিরাপত্তা বৈশিষ্ট্য:** প্রথম এডমিন তৈরি হওয়ার পর ব্যাকএন্ড এবং ডাটাবেস লেভেলে স্বয়ংক্রিয়ভাবে রেজিস্ট্রেশন চিরতরে লক হয়ে যাবে। অন্য কেউ পরবর্তীতে আর কোনো এডমিন একাউন্ট খুলতে পারবে না।

---

## ৪. নতুন ক্লায়েন্টের জন্য কোন ফাইলে কী পরিবর্তন করবেন? (Customization Checklist)

অন্য কোনো সেলুনের ক্লায়েন্টের জন্য কাজ ডেলিভারি দিতে চাইলে নিচের ফাইলগুলোতে শুধু তাদের তথ্য বসিয়ে দিন:

### ক. সেলুনের নাম, ঠিকানা, ফোন ও শিডিউল (Salon Identity)
* **ফাইল:** `src/data/salonData.ts`
* **কী পরিবর্তন করবেন:** ফাইলের ওপরের `SALON_INFO` অবজেক্টে:
  - `name`: নতুন সেলুনের নাম (যেমন: *Aura Beauty Lounge*)
  - `phone`: সেলুনের ফোন নম্বর
  - `email`: সেলুনের কনসিয়ার্জ ইমেইল
  - `address`: সেলুনের ঠিকানা
  - `schedule`: সোম থেকে রবিবারের সময়সূচী
  - `instagram`: ইনস্টাগ্রাম ইউজারনেম

### খ. সার্ভিস এবং মূল্য তালিকা (Services & Prices)
* **ফাইল:** `src/data/salonData.ts`
* **কী পরিবর্তন করবেন:** `SALON_SECTIONS` অ্যারের ভেতর:
  - ক্যাটাগরির নাম (যেমন: Haircuts, Facials, Makeup, Spa)
  - সার্ভিসের নাম, বর্ণনা, প্রয়োজনীয় সময় (যেমন: `duration: '45 min'`)
  - মূল্য (যেমন: `price: '$85'`, `priceNumber: 85`)
  - ছবি (`image`: ক্লায়েন্টের সার্ভিসের আনস্প্ল্যাশ বা ক্লাউডিনারি লিংক)

### গ. স্টাইলিস্ট ও স্টাফদের প্রোফাইল (Stylists / Team)
* **ফাইল:** `src/data/salonData.ts`
* **কী পরিবর্তন করবেন:** `STYLISTS` অ্যারেতে:
  - নাম, রোল (যেমন: *Senior Color Specialist*), বায়ো
  - ছবি (`portrait`), স্পেশালিটি ও কাজের অভিজ্ঞতা

### ঘ. লুকবুক ও গ্যালারির ছবি (Gallery / Portfolio)
* **ফাইল:** `src/data/salonData.ts`
* **কী পরিবর্তন করবেন:** `LOOKBOOK_GALLERY` অ্যারের ছবির লিঙ্কসমূহ।

### ঙ. কাস্টমার রিভিউ ও টেস্টমোনিয়াল (Reviews)
* **ফাইল:** `src/data/salonData.ts`
* **কী পরিবর্তন করবেন:** `REVIEWS` অ্যারের গ্রাহকের নাম, রিভিউ টেক্সট এবং রেটিং।

### চ. সোশ্যাল মিডিয়া ও এক্সটার্নাল বুকিং লিঙ্ক (Social Links & Fresha)
* **ফাইল:** `src/components/Footer.tsx` ও `src/components/BookingModal.tsx`
* **কী পরিবর্তন করবেন:**
  - `Footer.tsx`-এ `socialPlatforms` অ্যারের Instagram, Facebook, YouTube ইত্যাদি লিঙ্ক।
  - যদি ক্লায়েন্টের নিজস্ব Fresha প্রোফাইল থাকে, তবে `BookingModal.tsx`-এ `FRESHA_BOOKING_URL`-এ ক্লায়েন্টের লিঙ্কটি বসিয়ে দিন।

---

## ৫. নতুন ক্লায়েন্টের কাছ থেকে আপনার যা যা তথ্য নিতে হবে (Client Intake Checklist)

নতুন সেলুন ওনারের কাছ থেকে নিচের চেকলিস্ট অনুযায়ী তথ্য সংগ্রহ করুন:

1. **সাধারণ তথ্য (General Business Info):**
   - [ ] সেলুনের নাম (Business Name) ও ট্যাগলাইন
   - [ ] পূর্ণাঙ্গ ঠিকানা ও গুগল ম্যাপস লোকেশন
   - [ ] ফোন নম্বর ও অফিসিয়াল ইমেইল
   - [ ] খোলার ও বন্ধের সময়সূচী (সপ্তাহের কোন দিন কয়টা থেকে কয়টা)
2. **সার্ভিস ও প্রাইস তালিকা (Services & Menu):**
   - [ ] সার্ভিসের ক্যাটাগরি তালিকা
   - [ ] প্রতিটি সার্ভিসের নাম, বর্ণনা, সময় ও মূল্য
3. **স্টাফদের তথ্য (Team):**
   - [ ] স্টাইলিস্টদের নাম, পদবী, স্পেশালিটি ও পোর্ট্রেট ছবি
4. **ছবি ও মিডিয়া (Photos & Assets):**
   - [ ] সেলুনের লোগো (PNG / SVG)
   - [ ] সেলুনের ভেতরের পরিবেশের ২-৩টি সুন্দর ছবি
   - [ ] কাজের কিছু পোর্টফোলিও বা বিফোর/আফটার ছবি
5. **এডমিন ও ইমেইল (Admin & Contact):**
   - [ ] ওনারের এডমিন ইমেইল (যেখানে নতুন বুকিং নোটিফিকেশন যাবে)
   - [ ] সোস্যাল মিডিয়া লিঙ্ক (Instagram, Facebook, YouTube ইত্যাদি)

---

## ৬. টেস্ট ও ভেরিফিকেশন (Quality Checklist)

ডেপ্লয়মেন্টের পূর্বে নিচের বিষয়গুলো নিশ্চিত করুন:
- [x] **Public Booking Test:** ওয়েবসাইট থেকে একটি টেস্ট বুকিং দিন। দেখুন ডেটাবেসে `appointments` টেবিলে বুকিং জমা হয় এবং প্রাথমিক স্ট্যাটাস `pending` থাকে।
- [x] **Customer Confirmation Screen:** গ্রাহক যেন সরাসরি "Confirmed" না দেখে "Appointment Request Received (Pending Confirmation)" দেখে।
- [x] **Owner Access Link:** ফুটারের "Owner Access" ছাড়া অন্য কোথাও সাধারণ ভিজিটরদের সামনে এডমিন বাটন প্রদর্শিত হচ্ছে না।
- [x] **First Admin Lockdown:** প্রথম এডমিন তৈরি হওয়ার পর দ্বিতীয় কোনো এডমিন যেন ফর্ম থেকে রেজিস্ট্রেশন করতে না পারে।
- [x] **Admin Actions:** এডমিন ড্যাশবোর্ডে গিয়ে বুকিংটি `Confirm`, `Cancel` অথবা `Complete` করা যাচ্ছে কিনা তা নিশ্চিত করুন।
